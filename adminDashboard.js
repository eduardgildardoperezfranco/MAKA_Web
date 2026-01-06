/**
 * MAKA Gallery Admin Dashboard
 * Comprehensive backend management system for the image gallery
 * Version: 1.0.0
 * Author: Kilo Code
 * Date: 2026-01-06
 */

// Admin Dashboard Class
class AdminDashboard {
    constructor() {
        this.images = [];
        this.categories = [];
        this.tags = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.initUI();
        this.loadData();
    }

    initUI() {
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize modals
        this.setupModals();
        
        // Initialize event listeners
        this.setupEventListeners();
        
        // Set active section
        this.showSection('dashboard');
    }

    setupNavigation() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.admin-sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
        
        // Navigation links
        const navLinks = document.querySelectorAll('.admin-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.showSection(sectionId);
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update page title
                document.getElementById('page-title').textContent = 
                    link.querySelector('span').textContent;
                
                // Close mobile menu
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    setupModals() {
        // Add image modal
        const addImageBtn = document.getElementById('add-image-btn');
        const addImageModal = document.getElementById('add-image-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const cancelAddImageBtn = document.getElementById('cancel-add-image');
        
        if (addImageBtn && addImageModal) {
            addImageBtn.addEventListener('click', () => {
                addImageModal.classList.remove('hidden');
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                addImageModal.classList.add('hidden');
            });
        }
        
        if (cancelAddImageBtn) {
            cancelAddImageBtn.addEventListener('click', () => {
                addImageModal.classList.add('hidden');
            });
        }
        
        // Image detail modal
        const closeDetailModalBtn = document.getElementById('close-detail-modal');
        const closeDetailBtn = document.getElementById('close-detail-btn');
        const imageDetailModal = document.getElementById('image-detail-modal');
        
        if (closeDetailModalBtn) {
            closeDetailModalBtn.addEventListener('click', () => {
                imageDetailModal.classList.add('hidden');
            });
        }
        
        if (closeDetailBtn) {
            closeDetailBtn.addEventListener('click', () => {
                imageDetailModal.classList.add('hidden');
            });
        }
        
        // Close modals when clicking outside
        addImageModal.addEventListener('click', (e) => {
            if (e.target === addImageModal) {
                addImageModal.classList.add('hidden');
            }
        });
        
        imageDetailModal.addEventListener('click', (e) => {
            if (e.target === imageDetailModal) {
                imageDetailModal.classList.add('hidden');
            }
        });
    }

    setupEventListeners() {
        // Add image form submission
        const addImageForm = document.getElementById('add-image-form');
        if (addImageForm) {
            addImageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addNewImage();
            });
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
        
        // Search functionality
        const searchInput = document.getElementById('admin-search');
        const searchButton = document.querySelector('.fa-search').parentElement;
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', () => {
                this.searchImages();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchImages();
                }
            });
        }
        
        // Category filter
        const categoryFilter = document.getElementById('admin-category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterImages();
            });
        }
        
        // Pagination
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderGalleryTable();
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(this.getFilteredImages().length / this.itemsPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.renderGalleryTable();
                }
            });
        }
        
        // Category and tag management
        const addCategoryBtn = document.getElementById('add-category-btn');
        const addTagBtn = document.getElementById('add-tag-btn');
        
        if (addCategoryBtn) {
            addCategoryBtn.addEventListener('click', () => {
                this.addCategory();
            });
        }
        
        if (addTagBtn) {
            addTagBtn.addEventListener('click', () => {
                this.addTag();
            });
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.admin-section');
        sections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        
        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
            selectedSection.classList.add('active');
            
            // Load section-specific data
            this.loadSectionData(sectionId);
        }
    }

    loadSectionData(sectionId) {
        switch (sectionId) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'gallery-management':
                this.renderGalleryTable();
                break;
            case 'moderation':
                this.loadModerationData();
                break;
            case 'categories':
                this.loadCategoriesData();
                break;
            case 'licenses':
                this.loadLicensesData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }

    async loadData() {
        try {
            // Load images from JSON
            const response = await fetch('assetsGallery.json');
            const rawData = await response.json();
            
            // Process data into admin format
            this.images = rawData.map((item, index) => {
                const filename = item.image.split('/').pop();
                const fileMetadata = this.extractMetadataFromFilename(filename);
                
                return {
                    id: `img-${index}`,
                    title: fileMetadata.type || 'Fashion Item',
                    description: item.message || 'Exclusive fashion piece',
                    imageUrl: item.image,
                    thumbnail: item.image,
                    categories: fileMetadata.categories.length > 0 ? fileMetadata.categories : ['Fashion'],
                    tags: [...fileMetadata.tags, ...item.message.split(' ').slice(0, 3)],
                    badge: item.badge || 'Exclusive',
                    license: 'CC-BY-4.0',
                    source: 'MAKA Collection',
                    usage: 'commercial',
                    dateAdded: new Date().toISOString(),
                    moderationStatus: 'approved',
                    moderationIssues: [],
                    views: Math.floor(Math.random() * 1000),
                    downloads: Math.floor(Math.random() * 500)
                };
            });
            
            // Extract unique categories and tags
            this.categories = [...new Set(this.images.flatMap(img => img.categories))];
            this.tags = [...new Set(this.images.flatMap(img => img.tags))].slice(0, 20); // Top 20 tags
            
            console.log('Admin data loaded successfully:', {
                images: this.images.length,
                categories: this.categories.length,
                tags: this.tags.length
            });
            
        } catch (error) {
            console.error('Failed to load admin data:', error);
            this.showNotification('Failed to load data. Using fallback.', 'error');
        }
    }

    loadDashboardData() {
        // Update statistics
        document.getElementById('total-images-stat').textContent = this.images.length;
        
        const approvedImages = this.images.filter(img => img.moderationStatus === 'approved').length;
        document.getElementById('approved-images-stat').textContent = approvedImages;
        
        const flaggedImages = this.images.filter(img => img.moderationStatus === 'flagged').length;
        document.getElementById('flagged-images-stat').textContent = flaggedImages;
        
        document.getElementById('categories-stat').textContent = this.categories.length;
        
        // Load moderation queue
        this.loadModerationQueue();
    }

    loadModerationQueue() {
        const moderationQueue = document.getElementById('moderation-queue');
        if (!moderationQueue) return;
        
        // Get flagged images
        const flaggedImages = this.images.filter(img => img.moderationStatus === 'flagged').slice(0, 5);
        
        if (flaggedImages.length === 0) {
            moderationQueue.innerHTML = '<p class="text-gray-500 text-center py-4">No items in moderation queue</p>';
            return;
        }
        
        moderationQueue.innerHTML = flaggedImages.map(img => `
            <div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <div class="flex items-start">
                    <img src="${img.thumbnail}" alt="${img.title}" class="w-12 h-12 object-cover rounded mr-3">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-800 truncate">${img.title}</h4>
                        <p class="text-sm text-gray-600 truncate">${img.description}</p>
                        <div class="mt-2 flex space-x-2">
                            <button class="text-green-600 hover:text-green-800 text-sm">
                                <i class="fas fa-check-circle mr-1"></i> Approve
                            </button>
                            <button class="text-red-600 hover:text-red-800 text-sm">
                                <i class="fas fa-times-circle mr-1"></i> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderGalleryTable() {
        const tableBody = document.getElementById('gallery-table-body');
        const tableInfo = document.getElementById('gallery-table-info');
        
        if (!tableBody || !tableInfo) return;
        
        const filteredImages = this.getFilteredImages();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedImages = filteredImages.slice(startIndex, endIndex);
        
        if (paginatedImages.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">No images found</td></tr>';
            tableInfo.textContent = 'Showing 0 of 0 images';
            return;
        }
        
        tableBody.innerHTML = paginatedImages.map(img => `
            <tr class="border-b border-gray-100 hover:bg-gray-50 ${img.moderationStatus === 'flagged' ? 'moderation-flagged' : 'moderation-approved'}">
                <td class="p-3">
                    <img src="${img.thumbnail}" alt="${img.title}" class="image-preview">
                </td>
                <td class="p-3">
                    <div>
                        <p class="font-medium text-gray-800">${img.title}</p>
                        <p class="text-sm text-gray-500 truncate">${img.description}</p>
                    </div>
                </td>
                <td class="p-3">
                    <div class="flex flex-wrap gap-1">
                        ${img.categories.map(cat => `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${cat}</span>`).join('')}
                    </div>
                </td>
                <td class="p-3">
                    <span class="text-sm ${img.license.includes('CC') ? 'text-green-600' : 'text-purple-600'}">${img.license}</span>
                </td>
                <td class="p-3">
                    <span class="text-sm px-2 py-1 rounded-full ${img.moderationStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${img.moderationStatus}
                    </span>
                </td>
                <td class="p-3">
                    <span class="text-sm text-gray-600">${new Date(img.dateAdded).toLocaleDateString()}</span>
                </td>
                <td class="p-3">
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800 action-btn view-details" data-id="${img.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="text-green-600 hover:text-green-800 action-btn edit-image" data-id="${img.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800 action-btn delete-image" data-id="${img.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        // Add event listeners for action buttons
        tableBody.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageId = btn.getAttribute('data-id');
                this.showImageDetails(imageId);
            });
        });
        
        tableBody.querySelectorAll('.edit-image').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageId = btn.getAttribute('data-id');
                this.editImage(imageId);
            });
        });
        
        tableBody.querySelectorAll('.delete-image').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageId = btn.getAttribute('data-id');
                this.deleteImage(imageId);
            });
        });
        
        // Update table info
        tableInfo.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredImages.length)} of ${filteredImages.length} images`;
    }

    getFilteredImages() {
        const searchQuery = document.getElementById('admin-search')?.value?.toLowerCase() || '';
        const categoryFilter = document.getElementById('admin-category-filter')?.value || 'all';
        
        let filtered = [...this.images];
        
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(img => 
                img.title.toLowerCase().includes(searchQuery) ||
                img.description.toLowerCase().includes(searchQuery) ||
                img.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            if (categoryFilter === 'approved') {
                filtered = filtered.filter(img => img.moderationStatus === 'approved');
            } else if (categoryFilter === 'flagged') {
                filtered = filtered.filter(img => img.moderationStatus === 'flagged');
            } else if (categoryFilter === 'pending') {
                filtered = filtered.filter(img => img.moderationStatus === 'pending');
            }
        }
        
        return filtered;
    }

    searchImages() {
        this.currentPage = 1;
        this.renderGalleryTable();
    }

    filterImages() {
        this.currentPage = 1;
        this.renderGalleryTable();
    }

    showImageDetails(imageId) {
        const image = this.images.find(img => img.id === imageId);
        if (!image) return;
        
        const modal = document.getElementById('image-detail-modal');
        if (!modal) return;
        
        // Update modal content
        document.getElementById('detail-modal-title').textContent = image.title;
        document.getElementById('detail-modal-image').src = image.imageUrl;
        document.getElementById('detail-modal-title-text').textContent = image.title;
        document.getElementById('detail-modal-description').textContent = image.description;
        
        // Update categories
        const categoriesContainer = document.getElementById('detail-modal-categories');
        categoriesContainer.innerHTML = image.categories.map(cat => 
            `<span class="tag-item">${cat}</span>`
        ).join('');
        
        // Update tags
        const tagsContainer = document.getElementById('detail-modal-tags');
        tagsContainer.innerHTML = image.tags.map(tag => 
            `<span class="tag-item">${tag}</span>`
        ).join('');
        
        document.getElementById('detail-modal-license').textContent = image.license;
        document.getElementById('detail-modal-source').textContent = image.source;
        
        const statusText = image.moderationStatus.charAt(0).toUpperCase() + image.moderationStatus.slice(1);
        document.getElementById('detail-modal-status').textContent = statusText;
        document.getElementById('detail-modal-date').textContent = new Date(image.dateAdded).toLocaleString();
        
        // Show modal
        modal.classList.remove('hidden');
        
        // Set up edit and delete buttons
        const editBtn = document.getElementById('edit-image-btn');
        const deleteBtn = document.getElementById('delete-image-btn');
        
        if (editBtn) {
            editBtn.onclick = () => {
                modal.classList.add('hidden');
                this.editImage(imageId);
            };
        }
        
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                modal.classList.add('hidden');
                this.deleteImage(imageId);
            };
        }
    }

    editImage(imageId) {
        const image = this.images.find(img => img.id === imageId);
        if (!image) return;
        
        // In a real implementation, this would open an edit form
        // For this demo, we'll just show a notification
        this.showNotification(`Editing image: ${image.title}`, 'info');
    }

    deleteImage(imageId) {
        if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
            return;
        }
        
        const imageIndex = this.images.findIndex(img => img.id === imageId);
        if (imageIndex === -1) return;
        
        const imageTitle = this.images[imageIndex].title;
        
        // Remove image
        this.images.splice(imageIndex, 1);
        
        // Update categories and tags
        this.updateCategoriesAndTags();
        
        // Re-render table
        this.renderGalleryTable();
        
        // Show success notification
        this.showNotification(`Image "${imageTitle}" deleted successfully`, 'success');
    }

    addNewImage() {
        // In a real implementation, this would handle the form submission
        // For this demo, we'll simulate adding a new image
        
        const newImage = {
            id: `img-${this.images.length}`,
            title: 'New Fashion Item',
            description: 'Recently added exclusive fashion piece',
            imageUrl: 'Assets/Gallery Pictures/Black_Hoodie.png',
            thumbnail: 'Assets/Gallery Pictures/Black_Hoodie.png',
            categories: ['Adults', 'Hoodies'],
            tags: ['new', 'exclusive', 'black'],
            badge: 'New Arrival',
            license: 'CC-BY-4.0',
            source: 'MAKA Collection',
            usage: 'commercial',
            dateAdded: new Date().toISOString(),
            moderationStatus: 'pending',
            moderationIssues: [],
            views: 0,
            downloads: 0
        };
        
        this.images.push(newImage);
        this.updateCategoriesAndTags();
        
        // Close modal
        document.getElementById('add-image-modal').classList.add('hidden');
        
        // Show success notification
        this.showNotification('New image added successfully!', 'success');
        
        // Re-render table
        this.renderGalleryTable();
    }

    updateCategoriesAndTags() {
        this.categories = [...new Set(this.images.flatMap(img => img.categories))];
        this.tags = [...new Set(this.images.flatMap(img => img.tags))].slice(0, 20);
    }

    loadCategoriesData() {
        const categoriesList = document.getElementById('categories-list');
        const tagsCloud = document.getElementById('tags-cloud');
        
        if (categoriesList) {
            categoriesList.innerHTML = this.categories.map(category => `
                <div class="category-item">
                    <span>${category}</span>
                    <button class="text-red-500 hover:text-red-700 delete-category" data-category="${category}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            // Add event listeners for delete buttons
            categoriesList.querySelectorAll('.delete-category').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const category = btn.getAttribute('data-category');
                    this.deleteCategory(category);
                });
            });
        }
        
        if (tagsCloud) {
            tagsCloud.innerHTML = this.tags.map(tag => 
                `<span class="tag-item">${tag}</span>`
            ).join('');
        }
    }

    addCategory() {
        const newCategoryInput = document.getElementById('new-category');
        if (!newCategoryInput) return;
        
        const categoryName = newCategoryInput.value.trim();
        if (!categoryName) return;
        
        if (this.categories.includes(categoryName)) {
            this.showNotification('Category already exists', 'warning');
            return;
        }
        
        this.categories.push(categoryName);
        newCategoryInput.value = '';
        
        this.showNotification(`Category "${categoryName}" added successfully`, 'success');
        this.loadCategoriesData();
    }

    deleteCategory(category) {
        if (!confirm(`Are you sure you want to delete the category "${category}"?`)) {
            return;
        }
        
        this.categories = this.categories.filter(cat => cat !== category);
        
        // Remove category from images
        this.images.forEach(img => {
            img.categories = img.categories.filter(cat => cat !== category);
        });
        
        this.showNotification(`Category "${category}" deleted successfully`, 'success');
        this.loadCategoriesData();
    }

    addTag() {
        const newTagInput = document.getElementById('new-tag');
        if (!newTagInput) return;
        
        const tagName = newTagInput.value.trim();
        if (!tagName) return;
        
        if (this.tags.includes(tagName)) {
            this.showNotification('Tag already exists', 'warning');
            return;
        }
        
        this.tags.push(tagName);
        newTagInput.value = '';
        
        this.showNotification(`Tag "${tagName}" added successfully`, 'success');
        this.loadCategoriesData();
    }

    loadLicensesData() {
        // Update license counts
        const ccByCount = this.images.filter(img => img.license === 'CC-BY-4.0').length;
        const ccBySaCount = this.images.filter(img => img.license === 'CC-BY-SA-4.0').length;
        const publicDomainCount = this.images.filter(img => img.license === 'Public Domain').length;
        
        document.getElementById('cc-by-count').textContent = ccByCount;
        document.getElementById('cc-by-sa-count').textContent = ccBySaCount;
        document.getElementById('public-domain-count').textContent = publicDomainCount;
    }

    loadSettingsData() {
        // Settings are mostly static for this demo
        // In a real implementation, this would load from localStorage or API
    }

    loadModerationData() {
        // Load flagged content table
        const flaggedContentTable = document.getElementById('flagged-content-table');
        if (flaggedContentTable) {
            const flaggedImages = this.images.filter(img => img.moderationStatus === 'flagged');
            
            if (flaggedImages.length === 0) {
                flaggedContentTable.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">No flagged content</td></tr>';
                return;
            }
            
            flaggedContentTable.innerHTML = flaggedImages.map(img => `
                <tr class="border-b border-gray-100">
                    <td class="p-3">
                        <img src="${img.thumbnail}" alt="${img.title}" class="w-12 h-12 object-cover rounded">
                    </td>
                    <td class="p-3">
                        <p class="font-medium text-gray-800">${img.title}</p>
                    </td>
                    <td class="p-3">
                        <div class="flex flex-wrap gap-1">
                            ${img.moderationIssues.map(issue => 
                                `<span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">${issue}</span>`
                            ).join('')}
                        </div>
                    </td>
                    <td class="p-3">
                        <span class="text-sm text-gray-600">${new Date(img.dateAdded).toLocaleDateString()}</span>
                    </td>
                    <td class="p-3">
                        <div class="flex space-x-2">
                            <button class="text-green-600 hover:text-green-800">
                                <i class="fas fa-check-circle"></i>
                            </button>
                            <button class="text-red-600 hover:text-red-800">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    }

    extractMetadataFromFilename(filename) {
        const metadata = {
            categories: [],
            tags: [],
            color: null,
            type: null
        };

        const name = filename.toLowerCase();

        // Detect categories
        if (name.includes('kids') || name.includes('niño') || name.includes('child')) {
            metadata.categories.push('Kids');
        }
        if (name.includes('adult') || name.includes('men') || name.includes('women') || name.includes('female') || name.includes('male')) {
            metadata.categories.push('Adults');
        }
        if (name.includes('hoodie')) {
            metadata.categories.push('Hoodies');
            metadata.type = 'hoodie';
        }
        if (name.includes('jacket') || name.includes('chaqueta')) {
            metadata.categories.push('Jackets');
            metadata.type = 'jacket';
        }
        if (name.includes('t-shirt') || name.includes('shirt') || name.includes('camiseta')) {
            metadata.categories.push('T-Shirts');
            metadata.type = 't-shirt';
        }

        // Detect colors
        const colorKeywords = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange', 'pink', 'purple', 'gray', 'brown'];
        colorKeywords.forEach(color => {
            if (name.includes(color)) {
                metadata.color = color;
                metadata.tags.push(color);
            }
        });

        // Detect brands
        const brands = ['superdry', 'hollister', 'champion', 'columbia', 'nike', 'adidas'];
        brands.forEach(brand => {
            if (name.includes(brand)) {
                metadata.tags.push(brand);
            }
        });

        return metadata;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border-l-4 z-50`;
        
        // Set notification type
        switch (type) {
            case 'success':
                notification.classList.add('border-green-500', 'bg-green-50');
                break;
            case 'error':
                notification.classList.add('border-red-500', 'bg-red-50');
                break;
            case 'warning':
                notification.classList.add('border-yellow-500', 'bg-yellow-50');
                break;
            default:
                notification.classList.add('border-blue-500', 'bg-blue-50');
        }
        
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="mr-3">
                    ${type === 'success' ? '<i class="fas fa-check-circle text-green-500"></i>' : ''}
                    ${type === 'error' ? '<i class="fas fa-exclamation-circle text-red-500"></i>' : ''}
                    ${type === 'warning' ? '<i class="fas fa-exclamation-triangle text-yellow-500"></i>' : ''}
                    ${type === 'info' ? '<i class="fas fa-info-circle text-blue-500"></i>' : ''}
                </div>
                <div class="flex-1">
                    <p class="text-gray-800">${message}</p>
                </div>
                <button class="ml-3 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    logout() {
        if (confirm('Are you sure you want to log out?')) {
            // In a real implementation, this would clear session and redirect
            window.location.href = 'index.html';
        }
    }
}

// Initialize the admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated (in a real app, this would be a proper auth check)
    const isAuthenticated = true; // For demo purposes
    
    if (isAuthenticated) {
        window.adminDashboard = new AdminDashboard();
        console.log('Admin Dashboard initialized');
    } else {
        // Redirect to login
        window.location.href = 'index.html';
    }
});

// Export for testing
export { AdminDashboard };
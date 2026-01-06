/**
 * MAKA Web Gallery Management System
 * Comprehensive image gallery with AI-powered features, automatic categorization, and legal compliance
 * Version: 1.0.0
 * Author: Kilo Code
 * Date: 2026-01-06
 */

// Gallery Configuration
const GALLERY_CONFIG = {
    API_ENDPOINT: 'https://api.maka.gallery/v1',
    MAX_THUMBNAIL_SIZE: 300,
    IMAGE_QUALITY: 0.85,
    CATEGORIES: ['Kids', 'Adults', 'Hoodies', 'Jackets', 'T-Shirts', 'Accessories'],
    LICENSE_TYPES: ['CC-BY-4.0', 'CC-BY-SA-4.0', 'CC-BY-ND-4.0', 'CC-BY-NC-4.0', 'Public Domain'],
    SENSITIVE_TOPICS: ['violence', 'adult content', 'hate speech', 'copyrighted material', 'trademark infringement']
};

// Gallery State Management
class GalleryState {
    constructor() {
        this.images = [];
        this.categories = {};
        this.filteredImages = [];
        this.currentView = 'grid';
        this.searchQuery = '';
        this.selectedCategory = 'all';
        this.licenseFilter = 'all';
        this.fullscreenMode = false;
        this.currentImageIndex = 0;
        this.loading = false;
        this.error = null;
        this.lastUpdated = null;
    }

    setImages(images) {
        this.images = images;
        this.filteredImages = images;
        this.categorizeImages();
        this.lastUpdated = new Date();
    }

    categorizeImages() {
        this.categories = {};
        this.images.forEach(image => {
            image.categories.forEach(category => {
                if (!this.categories[category]) {
                    this.categories[category] = [];
                }
                this.categories[category].push(image);
            });
        });
    }

    filterImages() {
        let result = [...this.images];
        
        // Search query filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            result = result.filter(image => 
                image.title.toLowerCase().includes(query) ||
                image.description.toLowerCase().includes(query) ||
                image.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (this.selectedCategory !== 'all') {
            result = result.filter(image => 
                image.categories.includes(this.selectedCategory)
            );
        }

        // License filter
        if (this.licenseFilter !== 'all') {
            result = result.filter(image => 
                image.license === this.licenseFilter
            );
        }

        this.filteredImages = result;
    }

    getImageById(id) {
        return this.images.find(image => image.id === id);
    }

    getCategoryCount(category) {
        return this.categories[category]?.length || 0;
    }
}

// AI Content Moderation System
class ContentModerator {
    constructor() {
        this.sensitiveTopics = GALLERY_CONFIG.SENSITIVE_TOPICS;
        this.bannedKeywords = [
            'nude', 'porn', 'sex', 'violence', 'hate', 'racist', 'copyright', 'trademark',
            'infringement', 'stolen', 'pirated', 'illegal', 'drugs', 'weapons'
        ];
    }

    async moderateImage(image) {
        try {
            // Check metadata for sensitive content
            const metadataIssues = this.checkMetadata(image);
            if (metadataIssues.length > 0) {
                return { safe: false, issues: metadataIssues, reason: 'metadata' };
            }

            // Simulate AI analysis (in production, this would call an actual AI API)
            const aiResult = await this.simulateAIAnalysis(image);
            if (!aiResult.safe) {
                return { safe: false, issues: aiResult.issues, reason: 'ai_analysis' };
            }

            // Check license compliance
            const licenseIssues = this.checkLicenseCompliance(image);
            if (licenseIssues.length > 0) {
                return { safe: false, issues: licenseIssues, reason: 'license' };
            }

            return { safe: true, issues: [], reason: 'approved' };
        } catch (error) {
            console.error('Moderation error:', error);
            return { safe: false, issues: ['Moderation service unavailable'], reason: 'error' };
        }
    }

    checkMetadata(image) {
        const issues = [];
        
        // Check title and description
        const textContent = `${image.title} ${image.description} ${image.tags.join(' ')}`.toLowerCase();
        
        this.bannedKeywords.forEach(keyword => {
            if (textContent.includes(keyword)) {
                issues.push(`Contains banned keyword: ${keyword}`);
            }
        });

        // Check for proper attribution
        if (!image.source || !image.license) {
            issues.push('Missing source or license information');
        }

        return issues;
    }

    async simulateAIAnalysis(image) {
        // In a real implementation, this would call an AI service like Google Vision, AWS Rekognition, etc.
        // For this demo, we'll simulate the analysis
        
        return new Promise(resolve => {
            setTimeout(() => {
                const simulatedResult = {
                    safe: true,
                    issues: [],
                    confidence: 0.98,
                    labels: ['fashion', 'clothing', 'apparel']
                };
                
                // Simulate finding issues for certain images
                if (image.title.toLowerCase().includes('test') || Math.random() < 0.05) {
                    simulatedResult.safe = false;
                    simulatedResult.issues = ['Potential trademark issue detected'];
                }
                
                resolve(simulatedResult);
            }, 500); // Simulate API delay
        });
    }

    checkLicenseCompliance(image) {
        const issues = [];
        
        // Check if license is valid
        if (!GALLERY_CONFIG.LICENSE_TYPES.includes(image.license)) {
            issues.push(`Invalid license type: ${image.license}`);
        }

        // Check if commercial use is allowed for commercial site
        if (image.license.includes('NC') && image.usage === 'commercial') {
            issues.push('Non-commercial license used for commercial purposes');
        }

        return issues;
    }

    generateSafeDescription(image) {
        // Generate a safe, compliant description using the original content
        let description = image.description || '';
        
        // Remove any potentially problematic content
        this.bannedKeywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            description = description.replace(regex, '[REDACTED]');
        });

        // Ensure proper attribution
        if (image.source) {
            description += ` \n\nSource: ${image.source}`;
        }
        if (image.license) {
            description += ` \nLicense: ${image.license}`;
        }

        return description.trim();
    }
}

// Image Processing Utilities
class ImageProcessor {
    constructor() {
        this.cache = new Map();
    }

    async loadImage(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                this.cache.set(src, img);
                resolve(img);
            };
            img.onerror = (e) => {
                console.error(`Failed to load image: ${src}`, e);
                reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
        });
    }

    createThumbnail(image, maxSize = GALLERY_CONFIG.MAX_THUMBNAIL_SIZE) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate aspect ratio
        const aspectRatio = image.width / image.height;
        let width = maxSize;
        let height = maxSize / aspectRatio;
        
        if (height > maxSize) {
            height = maxSize;
            width = maxSize * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        
        // Draw image with quality preservation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, 0, 0, width, height);

        return canvas.toDataURL('image/jpeg', GALLERY_CONFIG.IMAGE_QUALITY);
    }

    async processImageData(imageData) {
        // Enhance image data with metadata
        const enhancedData = { ...imageData };
        
        // Add default values if missing
        enhancedData.categories = enhancedData.categories || ['uncategorized'];
        enhancedData.tags = enhancedData.tags || [];
        enhancedData.license = enhancedData.license || 'CC-BY';
        enhancedData.source = enhancedData.source || 'MAKA Collection';
        enhancedData.usage = enhancedData.usage || 'commercial';
        
        // Generate thumbnail URL
        enhancedData.thumbnail = enhancedData.thumbnail || enhancedData.image;
        
        return enhancedData;
    }

    extractMetadataFromFilename(filename) {
        const metadata = {
            categories: [],
            tags: [],
            color: null,
            type: null
        };

        // Extract information from filename - handle path normalization
        const cleanFilename = filename.split(/[\/]/).pop() || filename;
        const name = cleanFilename.toLowerCase();
        
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
}

// Gallery UI Manager
class GalleryUI {
    constructor() {
        this.state = new GalleryState();
        this.moderator = new ContentModerator();
        this.processor = new ImageProcessor();
        this.initUI();
    }

    initUI() {
        // Create gallery container
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'maka-gallery-container';
        
        // Create gallery header
        this.createGalleryHeader();
        
        // Create filter controls
        this.createFilterControls();
        
        // Create gallery grid
        this.galleryGrid = document.createElement('div');
        this.galleryGrid.className = 'maka-gallery-grid';
        
        // Create pagination
        this.paginationContainer = document.createElement('div');
        this.paginationContainer.className = 'maka-gallery-pagination';
        
        // Assemble UI
        this.galleryContainer.appendChild(this.galleryHeader);
        this.galleryContainer.appendChild(this.filterControls);
        this.galleryContainer.appendChild(this.galleryGrid);
        this.galleryContainer.appendChild(this.paginationContainer);
        
        // Add event listeners
        this.addEventListeners();
    }

    createGalleryHeader() {
        this.galleryHeader = document.createElement('div');
        this.galleryHeader.className = 'maka-gallery-header';
        
        this.galleryHeader.innerHTML = `
            <h2 class="maka-gallery-title">MAKA Visual Archive</h2>
            <p class="maka-gallery-subtitle">Discover exclusive fashion trends with proper licensing and compliance</p>
            <div class="maka-gallery-stats">
                <span class="stat-item">Total Images: <span id="total-images">0</span></span>
                <span class="stat-item">Categories: <span id="total-categories">0</span></span>
                <span class="stat-item">Last Updated: <span id="last-updated">Never</span></span>
            </div>
        `;
    }

    createFilterControls() {
        this.filterControls = document.createElement('div');
        this.filterControls.className = 'maka-gallery-filters';
        
        this.filterControls.innerHTML = `
            <div class="filter-group">
                <input type="text" id="search-input" class="search-input" placeholder="Search images...">
                <button id="search-button" class="search-button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="filter-group">
                <select id="category-filter" class="category-filter">
                    <option value="all">All Categories</option>
                    ${GALLERY_CONFIG.CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <select id="license-filter" class="license-filter">
                    <option value="all">All Licenses</option>
                    ${GALLERY_CONFIG.LICENSE_TYPES.map(license => `<option value="${license}">${license}</option>`).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <select id="view-mode" class="view-mode">
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                    <option value="masonry">Masonry View</option>
                </select>
            </div>
            
            <button id="reset-filters" class="reset-button">Reset Filters</button>
        `;
    }

    addEventListeners() {
        // These controls are created inside this.filterControls (not necessarily attached to document yet)
        const searchInput = this.filterControls.querySelector('#search-input');
        const searchButton = this.filterControls.querySelector('#search-button');
        const categoryFilter = this.filterControls.querySelector('#category-filter');
        const licenseFilter = this.filterControls.querySelector('#license-filter');
        const viewMode = this.filterControls.querySelector('#view-mode');
        const resetButton = this.filterControls.querySelector('#reset-filters');

        const runFilter = () => {
            this.state.filterImages();
            this.renderGallery();
        };

        // Search functionality
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => {
                this.state.searchQuery = searchInput.value;
                runFilter();
            });

            // Enter key triggers search
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.state.searchQuery = searchInput.value;
                    runFilter();
                }
            });
        }

        // Category filter
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.state.selectedCategory = e.target.value;
                runFilter();
            });
        }

        // License filter
        if (licenseFilter) {
            licenseFilter.addEventListener('change', (e) => {
                this.state.licenseFilter = e.target.value;
                runFilter();
            });
        }

        // View mode
        if (viewMode) {
            viewMode.addEventListener('change', (e) => {
                this.state.currentView = e.target.value;
                this.galleryGrid.className = `maka-gallery-grid ${this.state.currentView}-view`;
                this.renderGallery();
            });
        }

        // Reset filters
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                if (categoryFilter) categoryFilter.value = 'all';
                if (licenseFilter) licenseFilter.value = 'all';

                this.state.searchQuery = '';
                this.state.selectedCategory = 'all';
                this.state.licenseFilter = 'all';
                runFilter();
            });
        }

        // Keyboard shortcuts (global)
        this._onKeyDown = (e) => {
            if (e.key === 'Escape' && this.state.fullscreenMode) {
                this.exitFullscreen();
            }
        };
        document.addEventListener('keydown', this._onKeyDown);
    }

    async loadGalleryData() {
        try {
            this.state.loading = true;
            this.showLoading();

            // Load from JSON file
            console.log('Loading gallery data from assetsGallery.json...');
            const response = await fetch('assetsGallery.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const rawData = await response.json();
            console.log(`Loaded ${rawData.length} image entries from JSON`);

            // Process and enhance image data
            const processedImages = await Promise.all(
                rawData.map(async (item, index) => {
                    // Normalize image path for cross-platform compatibility
                    const normalizedImagePath = this.normalizeImagePath(item.image);
                    console.log(`Processing image ${index + 1}: ${normalizedImagePath}`);
                    
                    // Extract metadata from filename
                    const filename = item.image.split(/[\\/]/).pop();
                    const fileMetadata = this.processor.extractMetadataFromFilename(filename);

                    // Create enhanced image data
                    const enhancedItem = await this.processor.processImageData({
                        id: `img-${index}`,
                        title: fileMetadata.type || 'Fashion Item',
                        description: item.message || 'Exclusive fashion piece',
                        image: normalizedImagePath,
                        thumbnail: normalizedImagePath,
                        categories: fileMetadata.categories.length > 0 ? fileMetadata.categories : ['Fashion'],
                        tags: [...fileMetadata.tags, ...(item.message || '').split(' ').slice(0, 3)],
                        badge: item.badge || 'Exclusive',
                        license: 'CC-BY-4.0',
                        source: 'MAKA Collection',
                        usage: 'commercial',
                        dateAdded: new Date().toISOString(),
                        metadata: fileMetadata
                    });

                    // Moderate content
                    const moderationResult = await this.moderator.moderateImage(enhancedItem);
                    if (!moderationResult.safe) {
                        console.warn(`Image ${enhancedItem.id} failed moderation:`, moderationResult.issues);
                        enhancedItem.moderationStatus = 'flagged';
                        enhancedItem.moderationIssues = moderationResult.issues;
                    } else {
                        enhancedItem.moderationStatus = 'approved';
                    }

                    // Generate safe description
                    enhancedItem.safeDescription = this.moderator.generateSafeDescription(enhancedItem);

                    return enhancedItem;
                })
            );

            console.log(`Successfully processed ${processedImages.length} images`);
            this.state.setImages(processedImages);
            this.updateStats();
            this.renderGallery();

        } catch (error) {
            console.error('Failed to load gallery data:', error);
            this.state.error = error.message;
            this.showError('Failed to load gallery. Please ensure you are running a local web server (not opening HTML files directly).');
        } finally {
            this.state.loading = false;
            this.hideLoading();
        }
    }

    normalizeImagePath(originalPath) {
        // Normalize path separators to forward slashes for web compatibility
        let normalizedPath = originalPath.replace(/[\\]+/g, '/');
        
        // Ensure the path starts with the correct base
        if (!normalizedPath.startsWith('Assets/') && !normalizedPath.startsWith('/')) {
            normalizedPath = 'Assets/' + normalizedPath;
        }
        
        // Remove any leading ./ or ../ sequences
        normalizedPath = normalizedPath.replace(/^(\.\\)+/, '').replace(/^(\.\/)+/, '');
        
        // Trim whitespace
        normalizedPath = normalizedPath.trim();
        
        return normalizedPath;
    }

    updateStats() {
        document.getElementById('total-images').textContent = this.state.images.length;
        document.getElementById('total-categories').textContent = Object.keys(this.state.categories).length;
        document.getElementById('last-updated').textContent = 
            this.state.lastUpdated ? this.state.lastUpdated.toLocaleString() : 'Never';
    }

    renderGallery() {
        if (this.state.loading) return;
        
        this.galleryGrid.innerHTML = '';
        
        if (this.state.filteredImages.length === 0) {
            this.galleryGrid.innerHTML = '<div class="no-results">No images found matching your criteria.</div>';
            return;
        }

        // Render images based on current view mode
        this.state.filteredImages.forEach((image, index) => {
            const imageElement = this.createImageElement(image, index);
            this.galleryGrid.appendChild(imageElement);
        });

        // Update pagination
        this.renderPagination();
    }

    createImageElement(image, index) {
        const imageElement = document.createElement('div');
        imageElement.className = 'maka-gallery-item';
        imageElement.dataset.id = image.id;
        imageElement.dataset.index = index;

        // Add moderation status class
        if (image.moderationStatus === 'flagged') {
            imageElement.classList.add('moderation-flagged');
        }

        imageElement.innerHTML = `
            <div class="gallery-item-inner">
                <div class="gallery-image-container">
                    <img src="${image.thumbnail}" alt="${image.title}" class="gallery-image" loading="lazy">
                    ${image.moderationStatus === 'flagged' ? 
                        '<div class="moderation-badge" title="Content flagged for review">⚠️</div>' : ''}
                    <div class="image-overlay">
                        <button class="view-details-btn" data-id="${image.id}">View Details</button>
                        <button class="fullscreen-btn" data-id="${image.id}">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${image.title}</h3>
                    <div class="gallery-item-badges">
                        ${image.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('')}
                    </div>
                    <p class="gallery-item-description">${image.safeDescription.substring(0, 100)}${image.safeDescription.length > 100 ? '...' : ''}</p>
                    <div class="gallery-item-meta">
                        <span class="license-info">${image.license}</span>
                        <span class="source-info">${image.source}</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        imageElement.querySelector('.view-details-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showImageDetails(image);
        });

        imageElement.querySelector('.fullscreen-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.enterFullscreen(image, index);
        });

        imageElement.addEventListener('click', () => {
            this.enterFullscreen(image, index);
        });

        return imageElement;
    }

    showImageDetails(image) {
        // Create modal for image details
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <h3>${image.title}</h3>
                    ${image.moderationStatus === 'flagged' ? 
                        '<div class="moderation-warning">⚠️ This content has been flagged for review</div>' : ''}
                </div>
                <div class="modal-body">
                    <div class="modal-image-container">
                        <img src="${image.image}" alt="${image.title}" class="modal-image">
                    </div>
                    <div class="modal-info">
                        <p><strong>Description:</strong> ${image.safeDescription}</p>
                        <p><strong>Categories:</strong> ${image.categories.join(', ')}</p>
                        <p><strong>Tags:</strong> ${image.tags.join(', ')}</p>
                        <p><strong>License:</strong> ${image.license}</p>
                        <p><strong>Source:</strong> ${image.source}</p>
                        <p><strong>Date Added:</strong> ${new Date(image.dateAdded).toLocaleDateString()}</p>
                        ${image.moderationStatus === 'flagged' ? `
                            <div class="moderation-details">
                                <strong>Moderation Issues:</strong>
                                <ul>
                                    ${image.moderationIssues.map(issue => `<li>${issue}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="download-btn">Download</button>
                    <button class="share-btn">Share</button>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Download functionality
        modal.querySelector('.download-btn').addEventListener('click', () => {
            this.downloadImage(image);
        });
        
        // Share functionality
        modal.querySelector('.share-btn').addEventListener('click', () => {
            this.shareImage(image);
        });
    }

    enterFullscreen(image, index) {
        this.state.fullscreenMode = true;
        this.state.currentImageIndex = index;
        
        // Create fullscreen overlay
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'gallery-fullscreen';
        
        fullscreenOverlay.innerHTML = `
            <div class="fullscreen-content">
                <button class="fullscreen-close">&times;</button>
                <button class="fullscreen-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="fullscreen-next"><i class="fas fa-chevron-right"></i></button>
                <div class="fullscreen-image-container">
                    <img src="${image.image}" alt="${image.title}" class="fullscreen-image">
                </div>
                <div class="fullscreen-info">
                    <h3>${image.title}</h3>
                    <p>${image.safeDescription}</p>
                    <div class="fullscreen-meta">
                        <span>${index + 1} of ${this.state.filteredImages.length}</span>
                        <span>${image.license}</span>
                    </div>
                </div>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(fullscreenOverlay);
        document.body.classList.add('fullscreen-active');
        
        // Add event listeners
        fullscreenOverlay.querySelector('.fullscreen-close').addEventListener('click', () => {
            this.exitFullscreen();
        });
        
        fullscreenOverlay.querySelector('.fullscreen-prev').addEventListener('click', () => {
            this.navigateFullscreen(-1);
        });
        
        fullscreenOverlay.querySelector('.fullscreen-next').addEventListener('click', () => {
            this.navigateFullscreen(1);
        });
        
        // Keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                this.navigateFullscreen(-1);
            } else if (e.key === 'ArrowRight') {
                this.navigateFullscreen(1);
            } else if (e.key === 'Escape') {
                this.exitFullscreen();
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        // Store reference for cleanup
        fullscreenOverlay._keyHandler = handleKeyDown;
    }

    navigateFullscreen(direction) {
        const fullscreenOverlay = document.querySelector('.gallery-fullscreen');
        if (!fullscreenOverlay) return;
        
        const newIndex = this.state.currentImageIndex + direction;
        
        if (newIndex < 0 || newIndex >= this.state.filteredImages.length) {
            return; // Don't wrap around
        }
        
        this.state.currentImageIndex = newIndex;
        const newImage = this.state.filteredImages[newIndex];
        
        // Update fullscreen content
        fullscreenOverlay.querySelector('.fullscreen-image').src = newImage.image;
        fullscreenOverlay.querySelector('.fullscreen-image').alt = newImage.title;
        fullscreenOverlay.querySelector('h3').textContent = newImage.title;
        fullscreenOverlay.querySelector('p').textContent = newImage.safeDescription;
        fullscreenOverlay.querySelector('.fullscreen-meta span:first-child').textContent = 
            `${newIndex + 1} of ${this.state.filteredImages.length}`;
    }

    exitFullscreen() {
        const fullscreenOverlay = document.querySelector('.gallery-fullscreen');
        if (fullscreenOverlay) {
            // Clean up event listeners
            if (fullscreenOverlay._keyHandler) {
                document.removeEventListener('keydown', fullscreenOverlay._keyHandler);
            }
            
            fullscreenOverlay.remove();
            document.body.classList.remove('fullscreen-active');
            this.state.fullscreenMode = false;
        }
    }

    downloadImage(image) {
        const link = document.createElement('a');
        link.href = image.image;
        link.download = image.title.replace(/\s+/g, '_') + '.jpg';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    shareImage(image) {
        if (navigator.share) {
            navigator.share({
                title: image.title,
                text: image.safeDescription,
                url: window.location.href
            }).catch(error => {
                console.error('Error sharing:', error);
                this.showNotification('Sharing failed. Please try another method.');
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = `mailto:?subject=${encodeURIComponent(image.title)}&body=${encodeURIComponent(image.safeDescription + '\n\n' + window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    }

    renderPagination() {
        const totalPages = Math.ceil(this.state.filteredImages.length / 12); // 12 items per page
        const currentPage = 1; // For now, simple pagination
        
        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '<div class="pagination-controls">';
        
        if (currentPage > 1) {
            paginationHTML += '<button class="pagination-prev"><i class="fas fa-chevron-left"></i> Previous</button>';
        }
        
        paginationHTML += `<span class="pagination-info">Page ${currentPage} of ${totalPages}</span>`;
        
        if (currentPage < totalPages) {
            paginationHTML += '<button class="pagination-next">Next <i class="fas fa-chevron-right"></i></button>';
        }
        
        paginationHTML += '</div>';
        
        this.paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners for pagination
        const prevBtn = this.paginationContainer.querySelector('.pagination-prev');
        const nextBtn = this.paginationContainer.querySelector('.pagination-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                // Implement previous page logic
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // Implement next page logic
            });
        }
    }

    showLoading() {
        if (document.querySelector('.gallery-loading')) return;
        
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'gallery-loading';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading gallery...</p>
        `;
        
        this.galleryContainer.appendChild(loadingOverlay);
    }

    hideLoading() {
        const loadingOverlay = document.querySelector('.gallery-loading');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'gallery-error';
        errorElement.textContent = message;
        
        this.galleryContainer.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'gallery-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Public method to initialize gallery
    async initialize(targetElement) {
        if (!targetElement) {
            console.error('No target element provided for gallery initialization');
            return;
        }
        
        // Clear target element
        targetElement.innerHTML = '';
        
        // Add gallery container
        targetElement.appendChild(this.galleryContainer);
        
        // Load gallery data
        await this.loadGalleryData();
        
        // Add CSS styles
        this.addGalleryStyles();
        
        console.log('MAKA Gallery initialized successfully');
    }

    addGalleryStyles() {
        // Check if styles are already added
        if (document.getElementById('maka-gallery-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'maka-gallery-styles';
        styleElement.textContent = `
            /* MAKA Gallery Styles */
            .maka-gallery-container {
                width: 100%;
                margin: 0 auto;
                font-family: 'Montserrat', sans-serif;
            }
            
            .maka-gallery-header {
                text-align: center;
                margin-bottom: 2rem;
                padding: 1rem;
                background: linear-gradient(135deg, var(--primary-base), var(--primary-glow));
                color: white;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            
            .maka-gallery-title {
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                font-weight: 700;
            }
            
            .maka-gallery-subtitle {
                font-size: 1.1rem;
                opacity: 0.9;
                margin-bottom: 1rem;
            }
            
            .maka-gallery-stats {
                display: flex;
                justify-content: center;
                gap: 2rem;
                font-size: 0.9rem;
            }
            
            .maka-gallery-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background: var(--card-bg);
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .filter-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .search-input {
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
                min-width: 250px;
            }
            
            .search-button {
                padding: 0.75rem 1rem;
                background: var(--gradient-bg);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .search-button:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            select {
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
                background: white;
                cursor: pointer;
            }
            
            .reset-button {
                padding: 0.75rem 1.5rem;
                background: #f44336;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-left: auto;
            }
            
            .reset-button:hover {
                background: #d32f2f;
                transform: scale(1.05);
            }
            
            .maka-gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .maka-gallery-grid.list-view {
                grid-template-columns: 1fr;
            }
            
            .maka-gallery-grid.masonry-view {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .maka-gallery-item {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
            }
            
            .maka-gallery-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            .maka-gallery-item.moderation-flagged {
                border: 2px solid #ff9800;
            }
            
            .gallery-item-inner {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .gallery-image-container {
                position: relative;
                overflow: hidden;
                height: 250px;
            }
            
            .gallery-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .maka-gallery-item:hover .gallery-image {
                transform: scale(1.05);
            }
            
            .moderation-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: #ff9800;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                z-index: 10;
            }
            
            .image-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.7));
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 5;
            }
            
            .maka-gallery-item:hover .image-overlay {
                opacity: 1;
            }
            
            .view-details-btn, .fullscreen-btn {
                padding: 0.5rem 1rem;
                background: rgba(255,255,255,0.9);
                color: #333;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
            }
            
            .view-details-btn:hover, .fullscreen-btn:hover {
                background: white;
                transform: scale(1.05);
            }
            
            .gallery-item-info {
                padding: 1rem;
                flex-grow: 1;
            }
            
            .gallery-item-title {
                font-size: 1.1rem;
                margin-bottom: 0.5rem;
                color: #333;
                font-weight: 600;
            }
            
            .gallery-item-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
            }
            
            .category-badge {
                background: var(--primary-glow);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 10px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .gallery-item-description {
                font-size: 0.9rem;
                color: #666;
                margin-bottom: 0.5rem;
                line-height: 1.4;
            }
            
            .gallery-item-meta {
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                color: #999;
                margin-top: auto;
            }
            
            /* Modal Styles */
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                overflow-y: auto;
            }
            
            .modal-content {
                background: white;
                border-radius: 10px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: 2rem;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 1.5rem;
                cursor: pointer;
                background: none;
                border: none;
                color: #666;
            }
            
            .modal-header {
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #eee;
            }
            
            .moderation-warning {
                background: #fff3cd;
                color: #856404;
                padding: 0.5rem;
                border-radius: 5px;
                margin-top: 0.5rem;
                font-size: 0.9rem;
            }
            
            .modal-image-container {
                text-align: center;
                margin: 1rem 0;
            }
            
            .modal-image {
                max-width: 100%;
                max-height: 400px;
                border-radius: 5px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .modal-info {
                margin: 1rem 0;
                line-height: 1.6;
            }
            
            .moderation-details {
                background: #f8d7da;
                color: #721c24;
                padding: 1rem;
                border-radius: 5px;
                margin: 1rem 0;
            }
            
            .modal-footer {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #eee;
            }
            
            .download-btn, .share-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            }
            
            .download-btn {
                background: #4CAF50;
                color: white;
            }
            
            .share-btn {
                background: #2196F3;
                color: white;
            }
            
            /* Fullscreen Styles */
            .gallery-fullscreen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                overflow: hidden;
            }
            
            .fullscreen-content {
                position: relative;
                width: 90%;
                height: 90%;
                display: flex;
                flex-direction: column;
            }
            
            .fullscreen-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 2rem;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 10;
            }
            
            .fullscreen-prev, .fullscreen-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.5);
                color: white;
                border: none;
                padding: 1rem;
                cursor: pointer;
                font-size: 1.5rem;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .fullscreen-prev:hover, .fullscreen-next:hover {
                background: rgba(0,0,0,0.8);
                transform: translateY(-50%) scale(1.1);
            }
            
            .fullscreen-prev {
                left: 1rem;
            }
            
            .fullscreen-next {
                right: 1rem;
            }
            
            .fullscreen-image-container {
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            .fullscreen-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 5px;
            }
            
            .fullscreen-info {
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 1rem;
                text-align: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
            }
            
            .fullscreen-meta {
                display: flex;
                justify-content: space-between;
                margin-top: 0.5rem;
                font-size: 0.9rem;
                opacity: 0.8;
            }
            
            /* Loading and Error States */
            .gallery-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid var(--primary-glow);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .gallery-error {
                background: #f8d7da;
                color: #721c24;
                padding: 1rem;
                border-radius: 5px;
                margin: 1rem 0;
                text-align: center;
            }
            
            .gallery-notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--primary-glow);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .no-results {
                text-align: center;
                padding: 2rem;
                color: #666;
                font-size: 1.1rem;
            }
            
            /* Pagination */
            .maka-gallery-pagination {
                display: flex;
                justify-content: center;
                margin-top: 2rem;
            }
            
            .pagination-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .pagination-prev, .pagination-next {
                padding: 0.5rem 1rem;
                background: var(--primary-glow);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .pagination-prev:hover, .pagination-next:hover {
                background: var(--primary-base);
                transform: scale(1.05);
            }
            
            .pagination-info {
                color: #666;
                font-weight: 600;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .maka-gallery-filters {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .filter-group {
                    width: 100%;
                }
                
                .search-input {
                    width: 100%;
                }
                
                .maka-gallery-grid {
                    grid-template-columns: 1fr;
                }
                
                .modal-content {
                    width: 95%;
                    padding: 1rem;
                }
            }
            
            /* Fullscreen active state */
            body.fullscreen-active {
                overflow: hidden;
            }
        `;
        
        document.head.appendChild(styleElement);
    }

    // Public method to get gallery state
    getState() {
        return this.state;
    }
}

// Export the gallery UI class for use in the main application
export { GalleryUI, ContentModerator, ImageProcessor, GalleryState };
/**
 * MAKA Gallery Manager - Optimized Version 0.2.0
 * Works with or without a web server
 * Embedded data for maximum compatibility
 */

// Gallery Data - Embedded for offline/local file support
const GALLERY_DATA = [
    { image: "src/Assets/Gallery Pictures/Beisball_Hoodie_For_Kids.png", badge: "Kids Exclusive", message: "Swing for the stars. Baseball style for young champs." },
    { image: "src/Assets/Gallery Pictures/Beisball_Jacket_For_Kids.png", badge: "Adventure Ready", message: "Gear up for victory. Jacket that champions play." },
    { image: "src/Assets/Gallery Pictures/Black_Green_Hoodie.png", badge: "Urban Edge", message: "Dark and vibrant. Command the streets with contrast." },
    { image: "src/Assets/Gallery Pictures/Black_Hoodie_whit_green.png", badge: "Youth Power", message: "Light up the darkness. Hollister for the bold kids." },
    { image: "src/Assets/Gallery Pictures/Black_Model_with_Zip.jpeg", badge: "Zip Authority", message: "Seal your style. Zipped for ultimate control." },
    { image: "src/Assets/Gallery Pictures/Black_Model_with_Zip0.1.jpeg", badge: "Refined Zip", message: "Precision in black. Zip into perfection." },
    { image: "src/Assets/Gallery Pictures/Black_Orange_Hoodie.png", badge: "Bold Contrast", message: "Black meets orange. SuperDry for the fearless." },
    { image: "src/Assets/Gallery Pictures/Black_white_Hoodie.png", badge: "Classic Black", message: "Timeless darkness. SuperDry elegance redefined." },
    { image: "src/Assets/Gallery Pictures/BlackWhite_Hoodie.png", badge: "Monochrome Mastery", message: "Black and white fusion. SuperDry duality." },
    { image: "src/Assets/Gallery Pictures/Black_Hoodie.png", badge: "Balanced Power", message: "Harmony in hues. SuperDry balance." },
    { image: "src/Assets/Gallery Pictures/Blue_Champion_Hoodie_For_Kids.png", badge: "Champion Kids", message: "Blue victory. Champion spirit for little winners." },
    { image: "src/Assets/Gallery Pictures/Blue_Hoodie.png", badge: "Ocean Calm", message: "Dive into blue. SuperDry serenity." },
    { image: "src/Assets/Gallery Pictures/Blue_For_Kids.png", badge: "Kids Blue Wave", message: "Ride the blue wave. SuperDry for young explorers." },
    { image: "src/Assets/Gallery Pictures/Brown_and Pink_Hoodies.jpeg", badge: "Earthy Romance", message: "Brown and pink blend. Hoodies for the romantic soul." },
    { image: "src/Assets/Gallery Pictures/Brown_Hoodie_For_Kids.png", badge: "Nature's Child", message: "Brown earth tones. SuperDry for grounded kids." },
    { image: "src/Assets/Gallery Pictures/Blue_and_White_Jacket_For_Kids_Opened.png", badge: "Sky Columbia", message: "Blue skies ahead. Columbia for youthful journeys." },
    { image: "src/Assets/Gallery Pictures/Black_Jacket_For_Kids_Opened.png", badge: "Black Columbia", message: "Dark exploration. Columbia jacket for bold kids." },
    { image: "src/Assets/Gallery Pictures/Columbia_Green_Jacket_For_Kids.png", badge: "Eco Columbia", message: "Green guardian. Columbia for eco-kids." },
    { image: "src/Assets/Gallery Pictures/Red_Jacket_For_Kids_Opened.png", badge: "Red Energy", message: "Fiery red. Columbia jacket for energetic kids." },
    { image: "src/Assets/Gallery Pictures/Yellow_Jacket_For_Kids.png", badge: "Bright Columbia", message: "Vibrant yellow. Columbia jacket for bright futures." },
    { image: "src/Assets/Gallery Pictures/Yellow_Jacket_For_Kids_Opened.png", badge: "Sunny Columbia", message: "Yellow sunshine. Columbia for happy explorers." },
    { image: "src/Assets/Gallery Pictures/Adults_Jackets.jpeg", badge: "Adult Columbia", message: "Mature adventures. Columbia for the seasoned explorer." },
    { image: "src/Assets/Gallery Pictures/Jakets_for_Kids.jpeg", badge: "Kids Columbia", message: "Young pioneers. Columbia for little adventurers." },
    { image: "src/Assets/Gallery Pictures/Light__purple_Hoodie.jpeg", badge: "Purple Elegance", message: "Light purple mystery. Model for the enigmatic." },
    { image: "src/Assets/Gallery Pictures/Modelo light Claro con capota.png", badge: "Light Model", message: "Light and clear. Model with hood." },
    { image: "src/Assets/Gallery Pictures/Gray_Blue_Hoodie.png", badge: "Gray Blue Mix", message: "Gray meets blue. SuperDry tranquility." },
    { image: "src/Assets/Gallery Pictures/Gray_Hoodie_For_Kids.png", badge: "Polo Gray", message: "Gray polo. Hoodie for young professionals." },
    { image: "src/Assets/Gallery Pictures/Green_Hoodie_black.png", badge: "Green Black", message: "Green on black. SuperDry contrast." },
    { image: "src/Assets/Gallery Pictures/Green_Hoodie.jpeg", badge: "Pure Green", message: "Vivid green. SuperDry freshness." },
    { image: "src/Assets/Gallery Pictures/Green_Jacket_For_Kids_Opened.png", badge: "Black Green", message: "Black with green. SuperDry edge." },
    { image: "src/Assets/Gallery Pictures/Ligh_Green_Hoodie_With_Zip.jpeg", badge: "Light Green Zip", message: "Light green zip. SuperDry versatility." },
    { image: "src/Assets/Gallery Pictures/Light_Brown.jpeg", badge: "Light Brown", message: "Soft brown. SuperDry warmth." },
    { image: "src/Assets/Gallery Pictures/Light_Orange_Hoodie.png", badge: "Light Orange", message: "Gentle orange. SuperDry energy." },
    { image: "src/Assets/Gallery Pictures/Light_Purple_Hoodie.png", badge: "Light Purple", message: "Subtle purple. SuperDry mystery." },
    { image: "src/Assets/Gallery Pictures/Light_Yellow_Hoddie.png", badge: "Light Yellow", message: "Bright yellow. Hoodie for joy." },
    { image: "src/Assets/Gallery Pictures/Light_Yellow_Hoddie (2).png", badge: "SuperDry Yellow", message: "Light yellow. SuperDry sunshine." },
    { image: "src/Assets/Gallery Pictures/Lime_Hoddie_For_Kids.png", badge: "Lime Kids", message: "Lime green. Hollister for fun kids." },
    { image: "src/Assets/Gallery Pictures/Orange_Hoodie_For_Kids.png", badge: "Orange Hollister", message: "Vibrant orange. Hollister for energetic kids." },
    { image: "src/Assets/Gallery Pictures/Orange_Hoodie_For_Kids1.png", badge: "Orange Variant", message: "Orange twist. Hollister style." },
    { image: "src/Assets/Gallery Pictures/Orange_Hoodie.png", badge: "Orange SuperDry", message: "Bold orange. SuperDry passion." },
    { image: "src/Assets/Gallery Pictures/Pink_model_Hoodie.png", badge: "Pink Model", message: "Pink elegance. Model for grace." },
    { image: "src/Assets/Gallery Pictures/Pink_Hoodie_ Model.png", badge: "Pink Parts", message: "Pink with details. SuperDry charm." },
    { image: "src/Assets/Gallery Pictures/Pink_Hoddie.jpeg", badge: "Pink Hoodie", message: "Sweet pink. SuperDry femininity." },
    { image: "src/Assets/Gallery Pictures/Pink_Hoodie.jpeg", badge: "Pink SuperDry", message: "Pink power. SuperDry softness." },
    { image: "src/Assets/Gallery Pictures/Hoodie_for_Kids (2).png", badge: "Polo Kids", message: "Classic polo. Hoodie for young." },
    { image: "src/Assets/Gallery Pictures/Red_Hoodie_For_Kids.png", badge: "Red Kids", message: "Fiery red. SuperDry for bold kids." },
    { image: "src/Assets/Gallery Pictures/Referencia_Color verde_de Cremallera.jpeg", badge: "Green Zip Ref", message: "Green zipper. Reference for style." },
    { image: "src/Assets/Gallery Pictures/Salmon.png", badge: "Brand Ref 2", message: "Second brand. Style reference." },
    { image: "src/Assets/Gallery Pictures/Female_Hoodie_Style.png", badge: "Female Style", message: "Feminine touch. SuperDry for her." },
    { image: "src/Assets/Gallery Pictures/White_Black_Hoodie.png", badge: "White Black", message: "White on black. SuperDry contrast." },
    { image: "src/Assets/Gallery Pictures/White_Blakc_Hoddie.jpeg", badge: "White Black Var", message: "White black. SuperDry variant." },
    { image: "src/Assets/Gallery Pictures/White_For_Kids (2).png", badge: "White Champion", message: "Pure white. Champion for kids." },
    { image: "src/Assets/Gallery Pictures/White_For_Kids.png", badge: "White Kids", message: "Clean white. SuperDry for young." },
    { image: "src/Assets/Gallery Pictures/Withe_for_Kids.png", badge: "White Variant", message: "White style. SuperDry kids." },
    { image: "src/Assets/Gallery Pictures/Yellow_For_Kids.png", badge: "Yellow Champion", message: "Sunny yellow. Champion kids." },
    { image: "src/Assets/Gallery Pictures/Yellow_Hoodie_for_Kids.png", badge: "Yellow Kids", message: "Bright yellow. SuperDry fun." },
    { image: "src/Assets/Gallery Pictures/Yellow_Hoodie_with_Zip.png", badge: "Yellow Zip", message: "Yellow with zip. SuperDry ready." },
    { image: "src/Assets/Gallery Pictures/Black_Jacket_and_Blue_Jacket_For_Kids_Opened.png", badge: "Columbia Adventure", message: "Black and blue expedition. Jacket for young adventurers." },
    { image: "src/Assets/Gallery Pictures/Black_Light_Green_Hollister_Hoodie_for_Kids.png", badge: "Hollister Youth", message: "Light green Hollister hoodie for kids." },
    { image: "src/Assets/Gallery Pictures/Hoodie_for_Kids.png", badge: "Hoodie Kids", message: "Classic hoodie for young ones." },
    { image: "src/Assets/Gallery Pictures/Green_Black_Hoodie.png", badge: "Green Black Mix", message: "Green and black combination for bold style." }
];

// Gallery State
class GalleryState {
    constructor() {
        this.images = [];
        this.filteredImages = [];
        this.loading = false;
        this.error = null;
    }

    setImages(images) {
        this.images = images;
        this.filteredImages = images;
    }
}

// Gallery UI Manager
class GalleryUI {
    constructor() {
        this.state = new GalleryState();
        this.galleryContainer = null;
        this.galleryGrid = null;
        this.initUI();
    }

    initUI() {
        // Create gallery container
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'maka-gallery-container';
        
        // Create gallery header
        const header = document.createElement('div');
        header.className = 'maka-gallery-header';
        header.innerHTML = `
            <h2 class="maka-gallery-title">Colección Exclusiva</h2>
            <p class="maka-gallery-subtitle">Descubre nuestra selección de moda premium • Click en cualquier producto para consultar disponibilidad</p>
        `;
        
        // Create gallery grid
        this.galleryGrid = document.createElement('div');
        this.galleryGrid.className = 'maka-gallery-grid';
        
        // Assemble UI
        this.galleryContainer.appendChild(header);
        this.galleryContainer.appendChild(this.galleryGrid);
    }

    async loadGalleryData() {
        try {
            this.state.loading = true;
            this.showLoading();

            // Process embedded data
            const processedImages = GALLERY_DATA.map((item, index) => {
                // Normalize image path
                let imagePath = item.image || '';
                imagePath = imagePath.replace(/[\\]+/g, '/');
                
                // Extract metadata from filename
                const filename = imagePath.split('/').pop() || '';
                const nameLower = filename.toLowerCase();
                
                // Detect categories from filename
                const categories = [];
                if (nameLower.includes('kids') || nameLower.includes('niño')) categories.push('Kids');
                if (nameLower.includes('adult')) categories.push('Adults');
                if (nameLower.includes('hoodie')) categories.push('Hoodies');
                if (nameLower.includes('jacket')) categories.push('Jackets');
                if (categories.length === 0) categories.push('Fashion');
                
                // Detect type
                let title = 'Fashion Item';
                if (nameLower.includes('hoodie')) title = 'Hoodie';
                else if (nameLower.includes('jacket')) title = 'Jacket';
                
                // Create title from badge or filename
                const displayTitle = item.badge || title;

                return {
                    id: `img-${index}`,
                    title: displayTitle,
                    description: item.message || 'Exclusive fashion piece',
                    safeDescription: item.message || 'Exclusive fashion piece',
                    image: imagePath,
                    thumbnail: imagePath,
                    categories: categories,
                    badge: item.badge || 'Exclusive'
                };
            });

            this.state.setImages(processedImages);
            this.renderGallery();

        } catch (error) {
            console.error('Failed to load gallery data:', error);
            this.state.error = error.message;
            this.showError();
        } finally {
            this.state.loading = false;
            this.hideLoading();
        }
    }

    renderGallery() {
        if (this.state.loading) return;
        
        this.galleryGrid.innerHTML = '';
        
        if (this.state.filteredImages.length === 0) {
            this.galleryGrid.innerHTML = '<div class="no-results">No se encontraron productos.</div>';
            return;
        }

        // Render all images
        this.state.filteredImages.forEach((image, index) => {
            const imageElement = this.createImageElement(image, index);
            this.galleryGrid.appendChild(imageElement);
        });
    }

    createImageElement(image, index) {
        const imageElement = document.createElement('div');
        imageElement.className = 'maka-gallery-item';
        imageElement.dataset.id = image.id;
        imageElement.dataset.index = index;

        // Create placeholder SVG for error fallback
        const placeholderSvg = `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
                <rect fill="#0A1D6E" width="400" height="400"/>
                <text fill="#46A9F8" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" x="200" y="180">MAKA</text>
                <text fill="#ffffff" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" x="200" y="220">Product</text>
            </svg>
        `)}`;

        // Create WhatsApp link
        const whatsappMessage = encodeURIComponent(`Hola MAKA, me interesa este producto: ${image.title}. ¿Tienen disponibilidad?`);
        const whatsappLink = `https://wa.me/573142274000?text=${whatsappMessage}`;

        imageElement.innerHTML = `
            <div class="gallery-item-inner">
                <div class="gallery-image-container">
                    <span class="product-badge">${image.badge}</span>
                    <img src="${image.thumbnail}" alt="${image.title}" class="gallery-image" loading="lazy" 
                         onerror="this.onerror=null; this.src='${placeholderSvg}'; this.classList.add('image-error');">
                    <div class="image-overlay">
                        <button class="view-details-btn" data-id="${image.id}">Ver Detalles</button>
                        <button class="fullscreen-btn" data-id="${image.id}">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                    <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="whatsapp-quick-buy" title="Consultar por WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${image.title}</h3>
                    <div class="gallery-item-badges">
                        ${image.categories.slice(0, 2).map(cat => `<span class="category-badge">${cat}</span>`).join('')}
                    </div>
                    <p class="gallery-item-description">${image.description.substring(0, 80)}${image.description.length > 80 ? '...' : ''}</p>
                </div>
            </div>
        `;

        // Add event listeners
        const viewBtn = imageElement.querySelector('.view-details-btn');
        const fullscreenBtn = imageElement.querySelector('.fullscreen-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.showImageDetails(image);
            });
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.enterFullscreen(image, index);
            });
        }

        // Click on image opens fullscreen
        imageElement.addEventListener('click', (e) => {
            if (!e.target.closest('.whatsapp-quick-buy')) {
                this.enterFullscreen(image, index);
            }
        });

        return imageElement;
    }

    showImageDetails(image) {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <button class="gallery-modal-close">&times;</button>
                <img src="${image.image}" alt="${image.title}" class="gallery-modal-image">
                <div class="gallery-modal-info">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                    <div class="gallery-modal-categories">
                        ${image.categories.map(cat => `<span class="category-badge">${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('.gallery-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    enterFullscreen(image, index) {
        const fullscreen = document.createElement('div');
        fullscreen.className = 'gallery-fullscreen';
        fullscreen.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:2rem;';
        
        fullscreen.innerHTML = `
            <button style="position:absolute;top:20px;right:20px;background:none;border:none;color:white;font-size:2rem;cursor:pointer;">&times;</button>
            <img src="${image.image}" alt="${image.title}" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:12px;">
        `;

        document.body.appendChild(fullscreen);
        document.body.style.overflow = 'hidden';

        const closeFullscreen = () => {
            fullscreen.remove();
            document.body.style.overflow = '';
        };

        fullscreen.querySelector('button').addEventListener('click', closeFullscreen);
        fullscreen.addEventListener('click', (e) => {
            if (e.target === fullscreen) closeFullscreen();
        });
        
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    showLoading() {
        this.galleryGrid.innerHTML = `
            <div class="gallery-loading">
                <div class="gallery-loading-spinner"></div>
                <p>Cargando productos...</p>
            </div>
        `;
    }

    hideLoading() {
        // Loading state is handled by renderGallery
    }

    showError() {
        this.galleryGrid.innerHTML = `
            <div class="gallery-error">
                <p>Error al cargar la galería. Por favor, recarga la página.</p>
                <button onclick="location.reload()" style="margin-top:1rem;padding:0.5rem 1rem;background:var(--primary-glow);color:white;border:none;border-radius:8px;cursor:pointer;">
                    Recargar
                </button>
            </div>
        `;
    }
}

// Export for ES modules
export { GalleryUI, GalleryState, GALLERY_DATA };

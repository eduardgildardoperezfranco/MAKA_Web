/**
 * MAKA Gallery Preview - Index Page
 * Loads preview images for the gallery teaser card
 * Simplified version without full gallery functionality
 */

// Preview images configuration (8 sample products)
const PREVIEW_IMAGES = [
    { image: "src/Assets/Gallery Pictures/Black_Orange_Hoodie.png", badge: "Urban Edge" },
    { image: "src/Assets/Gallery Pictures/Blue_Champion_Hoodie_For_Kids.png", badge: "Kids" },
    { image: "src/Assets/Gallery Pictures/Pink_Hoodie.jpeg", badge: "Trending" },
    { image: "src/Assets/Gallery Pictures/Green_Hoodie.jpeg", badge: "Fresh" },
    { image: "src/Assets/Gallery Pictures/Yellow_Hoodie_for_Kids.png", badge: "Sunny" },
    { image: "src/Assets/Gallery Pictures/Black_Model_with_Zip.jpeg", badge: "Classic" },
    { image: "src/Assets/Gallery Pictures/Orange_Hoodie.png", badge: "Bold" },
    { image: "src/Assets/Gallery Pictures/White_Black_Hoodie.png", badge: "Minimal" }
];

/**
 * Initialize gallery preview on Index page
 */
function initGalleryPreview() {
    const previewGrid = document.getElementById('gallery-preview-grid');
    const countElement = document.getElementById('product-count-preview');
    
    if (!previewGrid) return;
    
    // Clear existing content
    previewGrid.innerHTML = '';
    
    // Load preview images
    PREVIEW_IMAGES.forEach((item, index) => {
        const previewItem = document.createElement('a');
        previewItem.href = 'gallery.html';
        previewItem.className = 'gallery-preview-item';
        previewItem.innerHTML = `
            <img src="${item.image}" alt="Product ${index + 1}" loading="lazy"
                 onerror="this.src='data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#0A1D6E" width="200" height="200"/><text fill="#46A9F8" font-family="Arial" font-size="14" text-anchor="middle" x="100" y="100">MAKA</text></svg>`)}'">
            <span class="preview-badge">${item.badge}</span>
        `;
        previewGrid.appendChild(previewItem);
    });
    
    // Update product count
    if (countElement) {
        // Fetch total count from JSON
        fetch('assetsGallery.json')
            .then(response => response.json())
            .then(data => {
                countElement.textContent = data.length + '+';
            })
            .catch(() => {
                countElement.textContent = '60+';
            });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryPreview);
} else {
    initGalleryPreview();
}

// Export for module usage
export { initGalleryPreview, PREVIEW_IMAGES };

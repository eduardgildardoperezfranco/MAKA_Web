/**
 * MAKA Web - Internationalization (i18n) Module
 * Handles multi-language support for the website
 * Compatible with Hostinger shared hosting
 */

// Language translations
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.store': 'Store',
        'nav.cart': 'Cart',
        'nav.offers': 'Offers',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',
        'nav.login': 'Login',
        
        // Hero Section
        'hero.dropLabel': '🔥 EXCLUSIVE DROP INCOMING',
        'hero.dropTitle': "Don't Miss Your Chance",
        'hero.dropSubtitle': 'Limited edition pieces dropping soon!',
        'hero.days': 'DAYS',
        'hero.hours': 'HOURS',
        'hero.mins': 'MINS',
        'hero.secs': 'SECS',
        'hero.liveStock': 'Live Stock:',
        'hero.items': 'items',
        'hero.ctaText': '🚀 Be the first to access exclusive drops!',
        'hero.emailPlaceholder': 'Enter your email',
        'hero.phonePlaceholder': 'WhatsApp (e.g., +57 314 227 4000)',
        'hero.joinWaitlist': 'Join Waitlist via WhatsApp',
        'hero.alreadyOnList': 'already on the list',
        'hero.weeklyDrop': 'The Weekly Drop',
        'hero.curatedGlobally': "Curated Globally. Once it's gone, it's gone.",
        
        // About Section
        'about.title': 'The MAKA Philosophy',
        'about.text': 'We do not merely sell garments; we engineer Identity. MAKA operates on the principles of Scarcity and Social Proof. You are not purchasing fabric; you are securing a position in a global aesthetic narrative. Our inventory is synchronized and finite—validated by the community, sealed by exclusivity.',
        
        // Features
        'features.premiumFabrics': 'Premium Fabrics',
        'features.softDurable': 'Soft & Durable',
        'features.uniqueDesigns': 'Unique Designs',
        'features.exclusiveStyles': 'Exclusive Styles',
        'features.fastShipping': 'Fast Shipping',
        'features.worldwideDelivery': 'Worldwide Delivery',
        'features.qualityAssured': 'Quality Assured',
        'features.satisfaction': '100% Satisfaction',
        
        // Testimonials
        'testimonials.title': 'From The Community',
        
        // How it Works
        'howItWorks.title': 'How it Works',
        'howItWorks.discover': 'Discover',
        'howItWorks.discoverText': 'Browse our curated global trends every Friday at 12 PM.',
        'howItWorks.secure': 'Secure',
        'howItWorks.secureText': "Once it's gone, it's gone. Grab your style before others do.",
        'howItWorks.stayAhead': 'Stay Ahead',
        'howItWorks.stayAheadText': 'Sold out? Notify me for the next drop and never miss an exclusive piece.',
        
        // Gallery
        'gallery.title': 'Visual Archive',
        'gallery.text': "Discover the hottest trends that are taking over the streets! Our exclusive collection features the most sought-after styles that everyone is talking about. Limited quantities available - once they're gone, they're gone! Get yours now before the next fashion wave hits. Your perfect look is just one click away!",
        
        // Despegue Digital
        'despegue.title': 'Digital Takeoff',
        'despegue.text': 'Discover the power of social media and take your digital presence to the next level! With our e-book "Digital Takeoff", you will learn to create attractive content, use WhatsApp and Instagram effectively, and grow on social media. This product includes two exclusive bonuses and five chapters full of practical strategies and useful tips.',
        'despegue.chapters': '5 Chapters',
        'despegue.chaptersText': 'Detailed strategies for digital success',
        'despegue.bonuses': '2 Exclusive Bonuses',
        'despegue.bonusesText': 'Additional content to boost your growth',
        'despegue.instagram': 'Instagram',
        'despegue.instagramText': 'Learn to use Instagram effectively',
        'despegue.whatsapp': 'WhatsApp',
        'despegue.whatsappText': 'Strategies to use WhatsApp in your business',
        'despegue.acquire': 'Acquire now!',
        
        // Contact
        'contact.title': 'Direct Connection',
        'contact.text': 'Frictionless Support Protocol: Our agents are ready to facilitate your acquisition. Connect instantly via the neural link below.',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.sendMessage': 'Send Message via WhatsApp',
        'contact.namePlaceholder': 'Your Name',
        'contact.phonePlaceholder': 'Your Phone Number',
        'contact.messagePlaceholder': 'Your Message',
        
        // Footer
        'footer.copyright': '© 2025 MAKA. Operating under Andean Decision 486.',
        'footer.legal': 'Legal & Terms',
        'footer.byAuthor': 'By Carolina Perez Franco',
        'footer.helpTooltip': 'I can help you, just ask me'
    },
    es: {
        // Navegación
        'nav.home': 'Inicio',
        'nav.about': 'Nosotros',
        'nav.store': 'Tienda',
        'nav.cart': 'Carrito',
        'nav.offers': 'Ofertas',
        'nav.gallery': 'Galería',
        'nav.contact': 'Contacto',
        'nav.login': 'Ingresar',
        
        // Sección Hero
        'hero.dropLabel': '🔥 LANZAMIENTO EXCLUSIVO PRÓXIMAMENTE',
        'hero.dropTitle': 'No Pierdas Tu Oportunidad',
        'hero.dropSubtitle': '¡Piezas de edición limitada próximamente!',
        'hero.days': 'DÍAS',
        'hero.hours': 'HORAS',
        'hero.mins': 'MINS',
        'hero.secs': 'SEGS',
        'hero.liveStock': 'Stock en Vivo:',
        'hero.items': 'artículos',
        'hero.ctaText': '🚀 ¡Sé el primero en acceder a lanzamientos exclusivos!',
        'hero.emailPlaceholder': 'Ingresa tu email',
        'hero.phonePlaceholder': 'WhatsApp (ej: +57 314 227 4000)',
        'hero.joinWaitlist': 'Unirse a Lista via WhatsApp',
        'hero.alreadyOnList': 'ya están en la lista',
        'hero.weeklyDrop': 'El Lanzamiento Semanal',
        'hero.curatedGlobally': 'Curado Globalmente. Cuando se agote, se agotó.',
        
        // Sección About
        'about.title': 'La Filosofía MAKA',
        'about.text': 'No simplemente vendemos prendas; ingeniamos Identidad. MAKA opera bajo los principios de Escasez y Prueba Social. No estás comprando tela; estás asegurando una posición en una narrativa estética global. Nuestro inventario está sincronizado y es finito—validado por la comunidad, sellado por la exclusividad.',
        
        // Características
        'features.premiumFabrics': 'Telas Premium',
        'features.softDurable': 'Suaves y Duraderas',
        'features.uniqueDesigns': 'Diseños Únicos',
        'features.exclusiveStyles': 'Estilos Exclusivos',
        'features.fastShipping': 'Envío Rápido',
        'features.worldwideDelivery': 'Entrega Mundial',
        'features.qualityAssured': 'Calidad Asegurada',
        'features.satisfaction': '100% Satisfacción',
        
        // Testimonios
        'testimonials.title': 'De La Comunidad',
        
        // Cómo Funciona
        'howItWorks.title': 'Cómo Funciona',
        'howItWorks.discover': 'Descubre',
        'howItWorks.discoverText': 'Explora nuestras tendencias globales curadas cada viernes a las 12 PM.',
        'howItWorks.secure': 'Asegura',
        'howItWorks.secureText': 'Cuando se agote, se agotó. Obtén tu estilo antes que otros.',
        'howItWorks.stayAhead': 'Mantente Adelante',
        'howItWorks.stayAheadText': '¿Agotado? Notifícame para el próximo lanzamiento y nunca pierdas una pieza exclusiva.',
        
        // Galería
        'gallery.title': 'Archivo Visual',
        'gallery.text': '¡Descubre las tendencias más calientes que están conquistando las calles! Nuestra colección exclusiva presenta los estilos más buscados de los que todos hablan. Cantidades limitadas disponibles - ¡cuando se agoten, se agotaron! Obtén el tuyo ahora antes de que llegue la próxima ola de moda. ¡Tu look perfecto está a solo un clic de distancia!',
        
        // Despegue Digital
        'despegue.title': 'Despegue Digital',
        'despegue.text': '¡Descubre el poder de las redes sociales y lleva tu presencia digital al siguiente nivel! Con nuestro e-book "Despegue Digital", aprenderás a crear contenido atractivo, usar WhatsApp e Instagram efectivamente, y crecer en redes sociales. Este producto incluye dos bonos exclusivos y cinco capítulos llenos de estrategias prácticas y consejos útiles.',
        'despegue.chapters': '5 Capítulos',
        'despegue.chaptersText': 'Estrategias detalladas para el éxito digital',
        'despegue.bonuses': '2 Bonos Exclusivos',
        'despegue.bonusesText': 'Contenido adicional para impulsar tu crecimiento',
        'despegue.instagram': 'Instagram',
        'despegue.instagramText': 'Aprende a usar Instagram efectivamente',
        'despegue.whatsapp': 'WhatsApp',
        'despegue.whatsappText': 'Estrategias para usar WhatsApp en tu negocio',
        'despegue.acquire': '¡Adquirir ahora!',
        
        // Contacto
        'contact.title': 'Conexión Directa',
        'contact.text': 'Protocolo de Soporte Sin Fricción: Nuestros agentes están listos para facilitar tu adquisición. Conecta instantáneamente a través del enlace neural abajo.',
        'contact.email': 'Correo',
        'contact.phone': 'Teléfono',
        'contact.address': 'Dirección',
        'contact.sendMessage': 'Enviar Mensaje via WhatsApp',
        'contact.namePlaceholder': 'Tu Nombre',
        'contact.phonePlaceholder': 'Tu Número de Teléfono',
        'contact.messagePlaceholder': 'Tu Mensaje',
        
        // Footer
        'footer.copyright': '© 2025 MAKA. Operando bajo Decisión Andina 486.',
        'footer.legal': 'Legal y Términos',
        'footer.byAuthor': 'Por Carolina Perez Franco',
        'footer.helpTooltip': 'Puedo ayudarte, solo pregúntame'
    }
};

// Current language
let currentLang = 'en';

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {string} lang - Language code (optional)
 * @returns {string} - Translated string
 */
function t(key, lang = currentLang) {
    const langTranslations = translations[lang] || translations.en;
    return langTranslations[key] || translations.en[key] || key;
}

/**
 * Set the current language
 * @param {string} lang - Language code
 */
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        updatePageTranslations();
        localStorage.setItem('maka-lang', lang);
    }
}

/**
 * Update all elements with data-i18n attribute
 */
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

/**
 * Initialize i18n module
 */
function initI18n() {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const savedLang = localStorage.getItem('maka-lang');
    
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else if (translations[browserLang]) {
        currentLang = browserLang;
    }
    
    updatePageTranslations();
}

// Export for ES modules
export { t, setLanguage, initI18n, translations };

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

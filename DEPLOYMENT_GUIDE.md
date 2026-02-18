# MAKA Web - Hostinger Deployment Guide

## 🎨 Gallery Design Psychology

### Why Direct Grid Layout?
The gallery uses a **direct grid layout** based on psychological principles:

1. **Immediate Visual Impact**: Users see products instantly without clicking through filters
2. **Reduced Cognitive Load**: No complex navigation - products are right there
3. **Conversion Optimization**: WhatsApp button on every product reduces friction
4. **Mobile-First Design**: Touch-friendly cards with visible CTAs

### Gallery Features
- ✅ All products visible immediately (no pagination)
- ✅ WhatsApp quick-buy button on hover
- ✅ Product badges for exclusivity messaging
- ✅ Responsive grid (4 columns → 2 columns on mobile)
- ✅ Lazy loading for performance

---

## 🚀 Pre-Deployment Checklist

### 1. File Naming Issues (Linux Case-Sensitivity)

**Problem:** Hostinger uses Linux servers which are case-sensitive. Files with spaces or inconsistent casing will cause 404 errors.

**Files to Rename Before Upload:**
| Current Name | Recommended Name |
|--------------|------------------|
| `Index.html` | `index.html` |
| `Script.JS` | `script.js` |
| `MAKA 3D.jpeg` | `maka-3d.jpeg` |
| `Paraiconos.jpg` | `paraiconos.jpg` |
| `src/Assets/Gallery Videos/` | `src/Assets/Gallery-Videos/` |

**Note:** All HTML references have been updated with URL-encoded spaces (`%20`) as a temporary fix. For best practice, rename files to use hyphens instead of spaces.

### 2. Required Files for Production

```
✅ index.html (rename from Index.html)
✅ Style.css
✅ script.js (rename from Script.JS)
✅ translations.js (CREATED)
✅ galleryManager.js
✅ assetsGallery.json
✅ carouselFiles.js
✅ terms.html
✅ .htaccess (UPDATED for production)
✅ MAKA 3D.jpeg
✅ Maka_Animated.mp4
✅ Paraiconos.jpg
✅ src/Assets/Gallery Pictures/ (all images)
✅ src/Assets/Gallery Videos/Despegue_Digital_ Oportunidad_Global.mp4
```

### 3. Files to EXCLUDE from Production

```
❌ .vscode/ (IDE settings)
❌ launch.json (IDE settings)
❌ settings.json (IDE settings)
❌ next.config (not used)
❌ next.config.js (not used)
❌ test_gallery.html (development only)
❌ test_navbar.html (development only)
❌ testImagePaths.html (development only)
❌ adminDashboard.html (if not needed)
❌ adminDashboard.js (if not needed)
❌ updateCarousel.ps1 (development script)
❌ Screenshot 2025-09-21 122312.png (screenshot)
❌ Structure with auth and other components.txt (notes)
```

---

## 📋 Hostinger-Specific Configuration

### 1. SSL Certificate
- Enable free SSL in Hostinger control panel
- SSL is forced in `.htaccess` (already configured)

### 2. Domain Configuration
- Primary domain: `maka.marketing`
- WWW redirect to non-WWW (configured in `.htaccess`)

### 3. PHP Settings (if needed)
The `.htaccess` includes PHP settings for upload limits:
- `upload_max_filesize = 50M`
- `post_max_size = 50M`
- `max_execution_time = 300`

### 4. Email Configuration
- Contact email: `carolinaperez@maka.marketing`
- Configure email in Hostinger control panel

---

## 🔒 Security Features Implemented

### .htaccess Security Headers
```apache
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Protected Files
- `.git`, `.env`, `.htpasswd`, `.ini`, `.log`, `.sh`, `.sql`
- Backup files (`.bak`, `.backup`, `.old`, etc.)
- Hidden files (starting with `.`)

### Hotlink Protection
- Allowed domains: maka.marketing, makahoodies.com, Google, Facebook, Instagram, WhatsApp

---

## ⚡ Performance Optimizations

### 1. Caching Strategy
| File Type | Cache Duration |
|-----------|----------------|
| Images (jpg, png, webp, svg) | 1 year |
| Videos (mp4, webm) | 1 year |
| Fonts (woff, woff2, ttf) | 1 year |
| CSS/JS | 1 week |
| JSON | 1 hour |

### 2. Compression
- GZIP compression enabled for text-based files
- Images and videos excluded from compression

### 3. CDN Resources
- Tailwind CSS: `https://cdn.tailwindcss.com`
- Font Awesome: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/`
- Three.js: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/`
- Google Fonts: `https://fonts.googleapis.com/`

---

## 📱 SEO Configuration

### Meta Tags (Already Configured)
- Title: "MAKA - Exclusive Fashion and Digital Growth"
- Description: Fashion trends and Despegue Digital e-book
- Keywords: MAKA, fashion, clothing, e-book, social media
- OG Tags for social sharing
- Twitter Card configuration

### robots.txt (Create this file)
```txt
User-agent: *
Allow: /
Disallow: /adminDashboard.html
Disallow: /test_*.html

Sitemap: https://maka.marketing/sitemap.xml
```

### sitemap.xml (Create this file)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://maka.marketing/</loc>
        <lastmod>2025-01-01</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://maka.marketing/terms.html</loc>
        <lastmod>2025-01-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>
```

---

## 🔄 Deployment Steps

### Step 1: Prepare Files
1. Rename files according to the naming convention
2. Update all file references in HTML/CSS/JS
3. Test locally

### Step 2: Upload to Hostinger
1. Connect via FTP or File Manager
2. Upload all production files to `public_html/`
3. Maintain folder structure for `src/Assets/`

### Step 3: Configure Domain
1. Enable SSL certificate
2. Verify HTTPS redirect works
3. Test all pages load correctly

### Step 4: Test Production
1. Clear browser cache
2. Test all pages: Home, Gallery, Contact, Terms
3. Test all videos load
4. Test all images load
5. Test WhatsApp links work
6. Test Google Translate integration
7. Test responsive design on mobile

### Step 5: Monitor
1. Check Hostinger error logs
2. Monitor page load times
3. Set up Google Analytics (optional)

---

## 🐛 Common Issues & Solutions

### Issue: 404 Errors on Images/Videos
**Solution:** Check file paths are case-sensitive and spaces are URL-encoded

### Issue: CSS Not Loading
**Solution:** Check `Style.css` is capitalized correctly, clear cache

### Issue: Videos Not Playing
**Solution:** Check MIME types in `.htaccess`, verify file permissions (644)

### Issue: Google Translate Not Working
**Solution:** Check `googleTranslateElementInit` function loads correctly

### Issue: WhatsApp Links Not Working
**Solution:** Verify phone number format: `573142274000`

---

## 📞 Support Contacts

- **Developer:** Carolina Perez Franco
- **Email:** carolinaperez@maka.marketing
- **WhatsApp:** +57 314 227 4000
- **Domain:** maka.marketing

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025 | Initial deployment preparation |
| 0.1.1 | 2025-02-18 | Hero section optimization, Hostinger compatibility fixes |

---

*Last updated: February 18, 2025*

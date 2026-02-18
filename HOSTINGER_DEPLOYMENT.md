# MAKA Web - Hostinger Deployment Solution

## 403 Forbidden Error - Root Cause Analysis

### Critical Issues Identified:

1. **File Naming Issues (Linux Case-Sensitivity)**
   - `Index.html` (capital I) - Linux servers expect `index.html` (lowercase)
   - `Script.JS` (capital S and JS) - Should be `script.js`
   - Files with spaces (`MAKA 3D.jpeg`) - Spaces cause URL encoding issues
   - Folder names with spaces (`Gallery Pictures`, `Gallery Videos`)

2. **.htaccess Configuration Issues**
   - Overly restrictive security rules blocking legitimate access
   - Line 153 blocked "admin" keyword, affecting `adminDashboard.html`
   - HTTPS redirect causing issues when SSL not yet configured
   - Missing `DirectoryIndex` directive

3. **Directory Index Problem**
   - No `index.html` (lowercase) file exists
   - `Options -Indexes` prevents directory listing
   - Result: 403 Forbidden on root URL

---

## Solution: Proper File Structure for Hostinger

### Required File Renames:

| Current Name | New Name (Hostinger Compatible) |
|--------------|--------------------------------|
| `Index.html` | `index.html` |
| `Script.JS` | `script.js` |
| `Style.css` | `style.css` (already lowercase) |
| `MAKA 3D.jpeg` | `maka-3d.jpeg` |
| `Paraiconos.jpg` | `paraiconos.jpg` |
| `Maka_Animated.mp4` | `maka-animated.mp4` |
| `src/Assets/Gallery Pictures/` | `src/assets/gallery-pictures/` |
| `src/Assets/Gallery Videos/` | `src/assets/gallery-videos/` |

### Deployment Folder Structure:

```
public_html/
|-- index.html                    (MAIN ENTRY POINT - lowercase!)
|-- gallery.html
|-- terms.html
|-- style.css
|-- script.js
|-- translations.js
|-- gallery-preview.js
|-- galleryManager.js
|-- assetsGallery.json
|-- carouselFiles.js
|-- .htaccess
|-- robots.txt
|-- sitemap.xml
|-- maka-3d.jpeg                  (favicon/logo)
|-- maka-animated.mp4             (brand video)
|-- paraiconos.jpg                (nav icons)
|-- src/
|   |-- assets/                   (lowercase folder name)
|       |-- gallery-pictures/     (hyphens instead of spaces)
|           |-- [all product images renamed to lowercase]
|       |-- gallery-videos/       (hyphens instead of spaces)
|           |-- despegue-digital-oportunidad-global.mp4
```

---

## Step-by-Step Deployment Instructions

### Step 1: Prepare Files Locally

1. Create a new folder called `deploy/`
2. Copy all production files to this folder
3. Rename files according to the table above
4. Update all file references in HTML/CSS/JS files

### Step 2: Upload to Hostinger

1. **Access File Manager** in Hostinger control panel
2. **Navigate to `public_html/`** folder
3. **Upload all files** maintaining the folder structure
4. **Set file permissions:**
   - Folders: 755
   - Files: 644

### Step 3: Configure SSL

1. Go to Hostinger Control Panel
2. Find **SSL** section
3. **Enable free SSL certificate**
4. Wait for activation (can take up to 24 hours)
5. **After SSL is active**, uncomment HTTPS redirect in .htaccess

### Step 4: Verify Deployment

1. Clear browser cache
2. Visit `https://maka.marketing`
3. Check all pages load correctly
4. Test all images load
5. Test videos play
6. Test WhatsApp links work

---

## Quick Fix for Immediate Access

If you need immediate access, upload this minimal .htaccess:

```apache
DirectoryIndex index.html index.htm Index.html
Options -Indexes
```

This tells the server:
1. Look for `index.html` first (lowercase)
2. Also check `index.htm` and `Index.html` as fallbacks
3. Prevent directory listing for security

---

## File Permissions Reference

| Type | Permission | Command (FTP/File Manager) |
|------|------------|----------------------------|
| Folders | 755 | `chmod 755 foldername` |
| HTML files | 644 | `chmod 644 *.html` |
| CSS files | 644 | `chmod 644 *.css` |
| JS files | 644 | `chmod 644 *.js` |
| Images | 644 | `chmod 644 *.jpg *.png *.jpeg` |
| Videos | 644 | `chmod 644 *.mp4` |
| .htaccess | 644 | `chmod 644 .htaccess` |

---

## Common Hostinger Issues & Solutions

### Issue: 403 Forbidden on Root
**Cause:** No `index.html` (lowercase) file
**Solution:** Rename `Index.html` to `index.html`

### Issue: 403 Forbidden on Subdirectories
**Cause:** `Options -Indexes` without index file
**Solution:** Add index.html to each subdirectory or enable indexes

### Issue: 404 on Images
**Cause:** Case-sensitive file paths
**Solution:** Use lowercase filenames and paths

### Issue: CSS/JS Not Loading
**Cause:** Incorrect file references
**Solution:** Update all references to lowercase paths

### Issue: Videos Not Playing
**Cause:** MIME type not configured
**Solution:** .htaccess includes proper MIME types

---

## Post-Deployment Checklist

- [ ] `index.html` exists (lowercase)
- [ ] All file references use lowercase paths
- [ ] SSL certificate is active
- [ ] HTTPS redirect enabled in .htaccess
- [ ] All images load correctly
- [ ] All videos play
- [ ] WhatsApp links work
- [ ] Google Translate loads
- [ ] Mobile responsive design works
- [ ] No console errors in browser

---

## Contact & Support

- **Developer:** Carolina Perez Franco
- **Email:** carolinaperez@maka.marketing
- **WhatsApp:** +57 314 227 4000
- **Domain:** maka.marketing

---

*Document created: February 18, 2026*
*Version: 1.0 - Hostinger Deployment Solution*
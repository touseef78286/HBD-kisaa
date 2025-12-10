# 🎨 Quick Customization Guide

## Essential Changes Before Launch

### 1. Update Bestie's Name
**File:** `index.html`

Find and replace:
- Line ~20: `Happy Birthday, <span class="highlight">Bestie</span>` → Replace "Bestie" with actual name
- Line ~60: `gold-foil-name` div → Update name
- Line ~70: Card signature → Update "Your Bestie" to your name

### 2. Add Hero Photo
**File:** `index.html`  
**Location:** Line ~15

Replace `assets/hero-photo.jpg` with your actual photo path.

**Recommended:** 
- Size: 400x500px (portrait orientation)
- Format: JPG or PNG
- Place in: `assets/photos/hero-photo.jpg`

### 3. Update Birthday Card Message
**File:** `index.html`  
**Location:** Lines ~65-75

Edit the card message in the `card-back` section to personalize it.

### 4. Add Gallery Photos
**File:** `index.html`  
**Location:** Gallery section (~line 100)

Replace the `gallery-placeholder` divs with actual images:
```html
<img src="assets/photos/photo1.jpg" alt="Memory 1" class="gallery-img">
```

### 5. Add Spotify Playlist
**File:** `index.html`  
**Location:** Playlist section (~line 200)

**Option A - Embed Code:**
Replace the placeholder with Spotify embed:
```html
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
```

**Option B - Link:**
Update the `playlist-link` href with your Spotify playlist URL.

### 6. Update About Us Story
**File:** `index.html`  
**Location:** About section (~line 45)

Replace the placeholder story with your actual "how we met" story.

### 7. Add Memory Photos
**File:** `index.html`  
**Location:** About section memory collage (~line 55)

Replace `memory-placeholder` divs with actual photos:
```html
<img src="assets/photos/memory1.jpg" alt="Memory">
```

## Optional Enhancements

### Add Stickers
1. Create or download sticker images (512x512px, PNG with transparent background)
2. Name them according to the sticker names in the code
3. Place in `assets/stickers/` folder
4. Stickers will automatically download when clicked

### Change Colors
**File:** `styles.css`  
**Location:** Top of file (`:root` variables)

Modify the color values:
```css
:root {
    --soft-lavender: #CFC1FF;  /* Change this */
    --neon-pink: #FF4D9E;      /* Change this */
    /* etc. */
}
```

### Update Party Details
**File:** `index.html`  
**Location:** Party section (~line 180)

Update date, time, and location information.

### Add More Sections
Follow the existing section structure:
```html
<section class="your-section" id="yourSection">
    <div class="container">
        <h2 class="section-title">Your Title</h2>
        <!-- Your content -->
    </div>
</section>
```

## Testing Checklist

Before going live:
- [ ] All names updated
- [ ] Hero photo added and displays correctly
- [ ] Card message personalized
- [ ] Gallery photos added (at least 3-6)
- [ ] Playlist added or link updated
- [ ] About story updated
- [ ] Tested on mobile device
- [ ] Tested card flip animation
- [ ] Tested sticker downloads (if stickers added)
- [ ] All links work
- [ ] Page loads quickly

## Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Your site will be live at `username.github.io/repo-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Site is live instantly!

### Vercel
1. Import project from GitHub
2. Deploy automatically

### Traditional Hosting
1. Upload all files via FTP
2. Ensure `index.html` is in root directory
3. Test all asset paths work correctly

## Quick Tips

- **Image Optimization:** Compress images before uploading (use TinyPNG or similar)
- **Mobile First:** Always test on mobile - that's where most people will view it
- **Loading Speed:** Keep images under 500KB each
- **Backup:** Keep a backup of your customized version
- **Test Links:** Make sure all external links open in new tabs (`target="_blank"`)

---

Need help? Check the main README.md for more details!







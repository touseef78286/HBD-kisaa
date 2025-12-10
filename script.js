// ============================================
// Gen-Z Birthday Website - Interactive Scripts
// ============================================

// Smooth scroll to card section
function scrollToCard() {
    document.getElementById('card').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Open birthday card with flip animation and confetti
function openCard() {
    const card = document.getElementById('birthdayCard');
    card.classList.add('flipped');
    
    // Create confetti burst
    createConfettiBurst();
    
    // Play sound effect (optional - can be added later)
    // playSound('confetti.mp3');
}

// Create confetti burst animation
function createConfettiBurst() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF4D9E', '#CFC1FF', '#7EF0D2', '#FFD700', '#FFFFFF'];
    const confettiCount = 100;
    
    // Clear existing confetti
    container.innerHTML = '';
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Sticker URL mapping - Free sticker resources from internet
// Using free PNG resources from various CDNs
const stickerUrls = {
    'bestie_ride_or_die': 'https://cdn-icons-png.flaticon.com/512/2583/2583789.png',
    'you_my_person': 'https://cdn-icons-png.flaticon.com/512/2583/2583788.png',
    'cake_chef_mood': 'https://cdn-icons-png.flaticon.com/512/2583/2583787.png',
    'balloon_pop_reaction': 'https://cdn-icons-png.flaticon.com/512/2583/2583786.png',
    'sassy_handshake': 'https://cdn-icons-png.flaticon.com/512/2583/2583785.png',
    'cry_laugh_face': 'https://cdn-icons-png.flaticon.com/512/2583/2583784.png',
    'confetti_burst': 'https://cdn-icons-png.flaticon.com/512/2583/2583783.png',
    'inside_joke': 'https://cdn-icons-png.flaticon.com/512/2583/2583782.png'
};

// Alternative sticker URLs (fallback) - using emoji-based stickers from free sources
const fallbackStickerUrls = {
    'bestie_ride_or_die': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/trophy_1f3c6.png',
    'you_my_person': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/sparkling-heart_1f496.png',
    'cake_chef_mood': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/birthday-cake_1f382.png',
    'balloon_pop_reaction': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/balloon_1f388.png',
    'sassy_handshake': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/handshake_1f91d.png',
    'cry_laugh_face': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/face-with-tears-of-joy_1f602.png',
    'confetti_burst': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/party-popper_1f389.png',
    'inside_joke': 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/smiling-face-with-sunglasses_1f60e.png'
};

// Download sticker function - downloads from internet URLs
function downloadSticker(stickerName, useFallback = false) {
    const stickerUrl = useFallback ? (fallbackStickerUrls[stickerName] || stickerUrls[stickerName]) : (stickerUrls[stickerName] || fallbackStickerUrls[stickerName]);
    
    if (!stickerUrl) {
        showToast('Sticker not found! 😅', 'error');
        return;
    }
    
    showToast('Downloading sticker... ⏳', 'info');
    
    // Fetch the image and download it
    fetch(stickerUrl, { mode: 'cors' })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch sticker');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${stickerName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            showToast('Downloaded — send to bestie ❤️', 'success');
        })
        .catch(error => {
            console.error('Error downloading sticker:', error);
            // Try fallback if not already using it
            if (!useFallback && fallbackStickerUrls[stickerName]) {
                downloadSticker(stickerName, true);
            } else {
                // Final fallback: open in new tab
                window.open(stickerUrl, '_blank');
                showToast('Opening sticker in new tab... 🔗', 'info');
            }
        });
}

// Download all stickers
function downloadAllStickers() {
    const stickers = [
        'bestie_ride_or_die',
        'you_my_person',
        'cake_chef_mood',
        'balloon_pop_reaction',
        'sassy_handshake',
        'cry_laugh_face',
        'confetti_burst',
        'inside_joke'
    ];
    
    showToast('Preparing sticker pack... 📦', 'info');
    
    // Download stickers with delay to avoid browser blocking multiple downloads
    stickers.forEach((sticker, index) => {
        setTimeout(() => {
            downloadSticker(sticker);
        }, index * 500); // Increased delay for better reliability
    });
    
    setTimeout(() => {
        showToast('All stickers downloading! Check your downloads folder 🎉', 'success');
    }, stickers.length * 500 + 1000);
}

// Download birthday card as PDF
function downloadCard() {
    showToast('Preparing your card... 📄', 'info');
    
    // In a real implementation, this would generate and download a PDF
    // For now, we'll create a canvas-based download
    const card = document.getElementById('birthdayCard');
    
    // Use html2canvas library if available, or show message
    if (typeof html2canvas !== 'undefined') {
        html2canvas(card).then(canvas => {
            const link = document.createElement('a');
            link.download = 'birthday-card.png';
            link.href = canvas.toDataURL();
            link.click();
            showToast('Card downloaded! ✨', 'success');
        });
    } else {
        showToast('PDF download coming soon! For now, take a screenshot 📸', 'info');
    }
}

// Share card via email
function shareCard() {
    const subject = encodeURIComponent('Your Birthday Card ✨');
    const body = encodeURIComponent('Check out your special birthday card!\n\n[Add your website URL here]');
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    showToast('Opening email client... 📧', 'info');
}

// RSVP functionality
function rsvp(response) {
    const messages = {
        'yes': 'Yay! Can\'t wait to celebrate with you! 🎉',
        'maybe': 'Hope you can make it! Let us know soon 💖',
        'no': 'We\'ll miss you! Sending love your way ❤️'
    };
    
    showToast(messages[response] || 'Thanks for your response!', 'success');
    
    // In a real implementation, this would send data to a server
    console.log(`RSVP: ${response}`);
}

// Download all assets
function downloadAllAssets() {
    showToast('Preparing all assets... This may take a moment ⏳', 'info');
    
    // In a real implementation, this would create a zip file with all assets
    setTimeout(() => {
        showToast('All assets ready! Check your downloads 📦', 'success');
    }, 2000);
}

// Share site
function shareSite() {
    const url = window.location.href;
    const text = 'Check out this amazing birthday website! 🎉';
    
    if (navigator.share) {
        navigator.share({
            title: 'Birthday Website',
            text: text,
            url: url
        }).then(() => {
            showToast('Shared successfully! 🎊', 'success');
        }).catch(() => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

// Social media share functions
function shareWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing birthday website! 🎉');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    showToast('Opening WhatsApp... 💬', 'info');
}

function shareInstagram() {
    // Instagram doesn't support direct URL sharing, so copy link
    const url = window.location.href;
    copyToClipboard(url);
    showToast('Link copied! Paste it in your Instagram story 📷', 'info');
    // Optionally open Instagram
    setTimeout(() => {
        window.open('https://www.instagram.com/', '_blank');
    }, 1500);
}

function shareFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    showToast('Opening Facebook... 👥', 'info');
}

function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing birthday website! 🎉');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
    showToast('Opening Twitter... 🐦', 'info');
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copied to clipboard! 📋', 'success');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Link copied to clipboard! 📋', 'success');
    }
}

// Toast notification system with types
function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Remove existing type classes
    toast.classList.remove('success', 'error', 'info', 'warning');
    
    // Add type class
    if (type !== 'default') {
        toast.classList.add(type);
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto-hide after delay
    const delay = type === 'error' ? 4000 : 3000;
    setTimeout(() => {
        toast.classList.remove('show');
    }, delay);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Set hero to visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Add click effect to CTA button
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            createConfettiBurst();
        });
    }
});

// Add hover sound effects (optional - can be enabled if audio files are added)
function playHoverSound() {
    // Placeholder for hover sound effect
    // const audio = new Audio('assets/sounds/hover.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {}); // Ignore errors
}

// Add click sound effects (optional)
function playClickSound() {
    // Placeholder for click sound effect
    // const audio = new Audio('assets/sounds/click.mp3');
    // audio.volume = 0.2;
    // audio.play().catch(() => {}); // Ignore errors
}

// Initialize background birthday music (auto-play with graceful fallback)
function initBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;

    audio.volume = 0.4;

    const tryPlay = () => {
        const playPromise = audio.play();
        if (playPromise) {
            playPromise.then(() => {
                document.removeEventListener('click', resumeOnInteraction);
                document.removeEventListener('touchstart', resumeOnInteraction);
            }).catch(() => {
                // Some browsers block autoplay; will retry on interaction
            });
        }
    };

    const resumeOnInteraction = () => {
        tryPlay();
    };

    // Attempt immediate play
    tryPlay();

    // Fallback: play on first user interaction if blocked
    document.addEventListener('click', resumeOnInteraction, { once: true });
    document.addEventListener('touchstart', resumeOnInteraction, { once: true });
}

// ============================================
// Cosmic Realm Functions
// ============================================

// Open cosmic realm - scroll to section
function openCosmicRealm() {
    const realm = document.getElementById('cosmicRealm');
    if (realm) {
        realm.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        // Add entrance animation
        setTimeout(() => {
            realm.classList.add('realm-active');
        }, 500);
    }
}

// Parallax effect for cosmic realm
function initCosmicParallax() {
    const realm = document.querySelector('.cosmic-realm');
    const planets = document.querySelectorAll('.planet');
    const starsLayers = document.querySelectorAll('.stars-layer');
    
    if (!realm) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const realmTop = realm.offsetTop;
        const realmHeight = realm.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when realm is in view
        if (scrolled + windowHeight > realmTop && scrolled < realmTop + realmHeight) {
            const progress = (scrolled - realmTop + windowHeight) / (realmHeight + windowHeight);
            
            // Parallax stars layers
            starsLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.5;
                layer.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
            
            // Parallax planets
            planets.forEach((planet, index) => {
                const speed = (index % 2 === 0 ? 1 : -1) * (0.3 + index * 0.1);
                const yOffset = Math.sin(progress * Math.PI * 2 + index) * 50;
                planet.style.transform = `translateY(${scrolled * speed * 0.05 + yOffset}px) rotate(${scrolled * 0.1}deg)`;
            });
        }
    });
}

// Initialize cosmic realm interactions
function initCosmicRealm() {
    initCosmicParallax();
    
    // Add click handlers to planets
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            // Add pulse effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Birthday website loaded!');
    
    // Initialize cosmic realm if it exists on the page
    const cosmicRealm = document.getElementById('cosmicRealm');
    if (cosmicRealm) {
        initCosmicRealm();
    }
    
    // Add any initialization code here
    // For example, loading animations, checking for saved preferences, etc.
});

// Global image error handler
function handleImageError(img) {
    // Add loading class
    img.classList.add('image-loading');
    
    // Replace broken images with placeholder gradient
    img.style.background = 'linear-gradient(135deg, #CFC1FF, #7EF0D2)';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.style.minHeight = '250px';
    img.style.borderRadius = '4px';
    
    // Add placeholder text
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder-text';
    placeholder.textContent = '📸';
    placeholder.style.fontSize = '3rem';
    placeholder.style.opacity = '0.5';
    
    // Clear image src to prevent retry
    img.src = '';
    img.alt = 'Image placeholder';
    
    // If no placeholder exists, add one
    if (!img.parentElement.querySelector('.image-placeholder-text')) {
        img.parentElement.appendChild(placeholder);
    }
}

// Handle image loading errors
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading state
        img.classList.add('image-loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('image-loading');
            this.classList.add('image-loaded');
        });
        
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
    
    // Start background music (with autoplay fallback)
    initBackgroundMusic();
    
    // Initialize Cake Celebration Room features
    initializeCakeRoom();
});

// ============================================
// Cake Celebration Room Functions
// ============================================

// Initialize Cake Room
function initializeCakeRoom() {
    // Start countdown timer
    startCountdown();
    
    // Create confetti for cake room hero
    createCakeRoomConfetti();
    
    // Load saved wishes
    loadWishes();
    
    // Load checklist progress
    loadChecklist();
}

// Countdown Timer
function startCountdown() {
    // Set target date: December 12, 2024 at 6 PM
    // Get current year and set to December 12 of current year
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`${currentYear}-12-12T18:00:00`).getTime();
    
    // Check if date has passed, if so, set to next year
    const now = new Date().getTime();
    let finalTargetDate = targetDate;
    if (targetDate < now) {
        finalTargetDate = new Date(`${currentYear + 1}-12-12T18:00:00`).getTime();
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = finalTargetDate - now;
        
        // Get countdown elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            return; // Elements not found yet
        }
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Cake Room Confetti
function createCakeRoomConfetti() {
    const container = document.getElementById('cakeRoomConfetti');
    if (!container) return;
    
    const colors = ['#FF4D9E', '#CFC1FF', '#7EF0D2', '#FFD700'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 100 + '%';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(confetti);
    }
}

// Cake Lightbox
let currentCakeImage = null;
let currentCakeTitle = null;

function openCakeLightbox(element) {
    const img = element.querySelector('.cake-showcase-img');
    const title = element.querySelector('.cake-showcase-overlay h4').textContent;
    
    currentCakeImage = img.src;
    currentCakeTitle = title;
    
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('cakeLightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCakeLightbox(event) {
    if (event.target.id === 'cakeLightbox' || event.target.classList.contains('lightbox-close')) {
        document.getElementById('cakeLightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function shareCakeImage() {
    if (navigator.share && currentCakeImage) {
        navigator.share({
            title: `Check out this cake: ${currentCakeTitle}`,
            text: `I found this amazing cake idea!`,
            url: currentCakeImage
        }).then(() => {
            showToast('Shared successfully! 🎊', 'success');
        }).catch(() => {
            copyToClipboard(currentCakeImage);
        });
    } else {
        copyToClipboard(currentCakeImage);
    }
}

function downloadCakeImage() {
    if (!currentCakeImage) return;
    
    fetch(currentCakeImage)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `cake-${currentCakeTitle.toLowerCase().replace(/\s+/g, '-')}.jpg`;
            link.click();
            window.URL.revokeObjectURL(url);
            showToast('Cake image downloaded! 🎂', 'success');
        })
        .catch(() => {
            window.open(currentCakeImage, '_blank');
            showToast('Opening image in new tab... 🔗', 'info');
        });
}

// Toggle Favorite
function toggleFavorite(button) {
    button.classList.toggle('favorited');
    const isFavorited = button.classList.contains('favorited');
    button.textContent = isFavorited ? '❤️' : '🤍';
    
    showToast(isFavorited ? 'Added to favorites! ❤️' : 'Removed from favorites', isFavorited ? 'success' : 'info');
}

// Wish Wall
function submitWish() {
    const message = document.getElementById('wishMessage').value.trim();
    const name = document.getElementById('wishName').value.trim() || 'Anonymous';
    
    if (!message) {
        showToast('Please write a wish! 💖', 'warning');
        return;
    }
    
    const wish = {
        message: message,
        name: name,
        date: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    const wishes = JSON.parse(localStorage.getItem('cakeWishes') || '[]');
    wishes.push(wish);
    localStorage.setItem('cakeWishes', JSON.stringify(wishes));
    
    // Display wish
    displayWish(wish);
    
    // Clear form
    document.getElementById('wishMessage').value = '';
    document.getElementById('wishName').value = '';
    
    showToast('Wish sent! ✨', 'success');
}

function displayWish(wish) {
    const container = document.getElementById('wishesDisplay');
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.innerHTML = `
        <p>${wish.message}</p>
        <span class="wish-author">— ${wish.name} • ${wish.date}</span>
    `;
    container.appendChild(wishCard);
}

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('cakeWishes') || '[]');
    wishes.forEach(wish => displayWish(wish));
}

// Cake Quiz
let quizAnswers = [];
let currentQuestion = 0;

const quizQuestions = [
    {
        question: "What's your ideal birthday vibe?",
        options: ["✨ Glam & Sparkly", "🌸 Soft & Dreamy", "🎨 Bold & Colorful", "🍫 Classic & Rich"]
    },
    {
        question: "Pick a flavor!",
        options: ["🍓 Fruity & Fresh", "🍰 Vanilla & Sweet", "🍫 Chocolate & Rich", "🌿 Unique & Exotic"]
    },
    {
        question: "How do you celebrate?",
        options: ["🎉 Big Party", "💖 Intimate Gathering", "🎨 Creative & Fun", "🌟 Elegant & Classy"]
    }
];

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizContainer')) {
        const firstQuestion = quizQuestions[0];
        document.querySelector('#quizQuestion p').textContent = firstQuestion.question;
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = firstQuestion.options[index];
        });
    }
});

const quizResults = {
    sparkly: {
        title: "You're a Mirror Glaze Ombré Cake! ✨",
        text: "Shiny, glamorous, and absolutely stunning! You love the spotlight and everything sparkly. Your birthday cake should be as dazzling as you are!"
    },
    dreamy: {
        title: "You're a Semi-Naked Lavender Cake! 🌸",
        text: "Soft, dreamy, and effortlessly beautiful. You appreciate the simple things and have a gentle, calming presence. Perfect for a cozy celebration!"
    },
    colorful: {
        title: "You're a Rainbow Magic Cake! 🎨",
        text: "Bold, vibrant, and full of life! You're not afraid to stand out and bring color to everyone's world. Your energy is infectious!"
    },
    classic: {
        title: "You're a Classic Chocolate Cake! 🍫",
        text: "Timeless, rich, and always satisfying. You're reliable, comforting, and everyone's favorite. Classic never goes out of style!"
    }
};

function answerQuiz(answer) {
    quizAnswers.push(answer);
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showNextQuestion();
    } else {
        showQuizResult();
    }
}

function showNextQuestion() {
    const question = quizQuestions[currentQuestion];
    document.querySelector('#quizQuestion p').textContent = question.question;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.textContent = question.options[index];
    });
}

function showQuizResult() {
    // Determine result based on answers
    const avgAnswer = quizAnswers.reduce((a, b) => a + b, 0) / quizAnswers.length;
    let resultKey = 'dreamy';
    
    if (avgAnswer <= 1.5) resultKey = 'sparkly';
    else if (avgAnswer <= 2.5) resultKey = 'dreamy';
    else if (avgAnswer <= 3.5) resultKey = 'colorful';
    else resultKey = 'classic';
    
    const result = quizResults[resultKey];
    
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizResultTitle').textContent = result.title;
    document.getElementById('quizResultText').textContent = result.text;
}

function resetQuiz() {
    quizAnswers = [];
    currentQuestion = 0;
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    showNextQuestion();
}

// Cake Customization
function updateCakePreview() {
    const color = document.getElementById('cakeColor').value;
    document.getElementById('colorDisplay').textContent = color;
    document.getElementById('previewCake').style.filter = `hue-rotate(${getHueFromColor(color)}deg)`;
}

function getHueFromColor(color) {
    // Simple hue calculation (approximate)
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue = 0;
    
    if (max === min) hue = 0;
    else if (max === r) hue = ((g - b) / (max - min)) % 6;
    else if (max === g) hue = (b - r) / (max - min) + 2;
    else hue = (r - g) / (max - min) + 4;
    
    return Math.round(hue * 60);
}

function addDecoration(type) {
    const decorations = {
        stars: '✨',
        hearts: '💖',
        flowers: '🌸',
        confetti: '🎉'
    };
    
    const container = document.getElementById('previewDecorations');
    const decoration = document.createElement('div');
    decoration.textContent = decorations[type];
    decoration.style.position = 'absolute';
    decoration.style.left = Math.random() * 80 + 10 + '%';
    decoration.style.top = Math.random() * 80 + 10 + '%';
    decoration.style.fontSize = '2rem';
    decoration.style.animation = 'float 2s ease-in-out infinite';
    decoration.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(decoration);
    
    // Highlight button
    event.target.classList.add('active');
    setTimeout(() => {
        event.target.classList.remove('active');
    }, 300);
    
    showToast(`Added ${type}! ✨`, 'success');
}

// Party Checklist
function updateChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    
    localStorage.setItem('checklistProgress', JSON.stringify({
        checked: checked,
        total: total
    }));
    
    if (checked === total) {
        showToast('All tasks completed! Party ready! 🎉', 'success');
    }
}

function loadChecklist() {
    const saved = JSON.parse(localStorage.getItem('checklistProgress') || '{}');
    // Could restore checked state if needed
}


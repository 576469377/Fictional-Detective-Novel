// The Crimson Cipher - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeInterface();
    initializeReadingProgress();
    initializeBookmarks();
});

function initializeInterface() {
    // Add fade-in animation to main content
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-in');
    }

    // Add hover effects to character cards
    addCharacterCardEffects();
    
    // Initialize progress tracking
    updateProgressBars();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Initialize language preference saving
    initializeLanguagePreferences();
    
    // Add reading time estimates
    addReadingTimeEstimates();
    
    // Initialize theme switching
    initializeThemeSwitch();
    
    // Add accessibility enhancements
    enhanceAccessibility();
}

// Enhanced reading progress tracking
function initializeReadingProgress() {
    // Track reading progress on chapter pages
    if (isChapterPage()) {
        trackScrollProgress();
        displayReadingStats();
    }
}

function isChapterPage() {
    return window.location.pathname.includes('/chapters/') || 
           document.querySelector('.chapter-content') !== null;
}

function trackScrollProgress() {
    let lastScrollPosition = 0;
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        // Update visual progress bar
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        
        // Save reading position every 10% progress
        if (Math.floor(scrollPercent / 10) > Math.floor(lastScrollPosition / 10)) {
            saveReadingPosition(scrollPercent);
        }
        
        lastScrollPosition = scrollPercent;
    });
}

function createProgressBar() {
    const existingBar = document.getElementById('reading-progress-bar');
    if (existingBar) return existingBar.querySelector('.progress-fill');
    
    const progressContainer = document.createElement('div');
    progressContainer.id = 'reading-progress-bar';
    progressContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255,255,255,0.2);
        z-index: 1000;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #8B0000, #DC143C);
        width: 0%;
        transition: width 0.3s ease;
    `;
    
    progressContainer.appendChild(progressFill);
    document.body.appendChild(progressContainer);
    
    return progressFill;
}

function saveReadingPosition(percent) {
    const chapterPath = window.location.pathname;
    const readingData = {
        position: percent,
        timestamp: new Date().toISOString(),
        chapter: chapterPath
    };
    
    localStorage.setItem(`crimson-cipher-progress-${chapterPath}`, JSON.stringify(readingData));
    
    // Update overall reading statistics
    updateOverallProgress();
}

function updateOverallProgress() {
    const chapters = ['chapter01', 'chapter02', 'chapter03', 'chapter04'];
    let totalProgress = 0;
    let chaptersStarted = 0;
    
    chapters.forEach(chapter => {
        const saved = localStorage.getItem(`crimson-cipher-progress-/en/chapters/${chapter}.md`);
        if (saved) {
            const data = JSON.parse(saved);
            totalProgress += data.position;
            chaptersStarted++;
        }
    });
    
    const overallProgress = chaptersStarted > 0 ? totalProgress / chapters.length : 0;
    localStorage.setItem('crimson-cipher-overall-progress', overallProgress.toFixed(1));
}

function displayReadingStats() {
    const statsContainer = createStatsContainer();
    const chapterPath = window.location.pathname;
    const saved = localStorage.getItem(`crimson-cipher-progress-${chapterPath}`);
    
    if (saved) {
        const data = JSON.parse(saved);
        const lastRead = new Date(data.timestamp);
        const timeAgo = getTimeAgo(lastRead);
        
        statsContainer.innerHTML = `
            <div class="reading-stats">
                <span>📖 Progress: ${data.position.toFixed(0)}%</span>
                <span>🕒 Last read: ${timeAgo}</span>
            </div>
        `;
    }
}

function createStatsContainer() {
    let container = document.getElementById('reading-stats-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'reading-stats-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
    }
    return container;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return 'Recently';
}

// Bookmark functionality
function initializeBookmarks() {
    addBookmarkButton();
    displayBookmarkStatus();
}

function addBookmarkButton() {
    if (!isChapterPage()) return;
    
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.id = 'bookmark-button';
    bookmarkBtn.innerHTML = '🔖';
    bookmarkBtn.title = 'Bookmark this chapter';
    bookmarkBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #8B0000, #DC143C);
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: transform 0.2s ease;
    `;
    
    bookmarkBtn.addEventListener('click', toggleBookmark);
    bookmarkBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    bookmarkBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(bookmarkBtn);
}

function toggleBookmark() {
    const chapterPath = window.location.pathname;
    const bookmarks = JSON.parse(localStorage.getItem('crimson-cipher-bookmarks') || '[]');
    
    const existingIndex = bookmarks.findIndex(b => b.path === chapterPath);
    
    if (existingIndex > -1) {
        bookmarks.splice(existingIndex, 1);
        showNotification('Bookmark removed');
    } else {
        const bookmark = {
            path: chapterPath,
            title: document.title,
            timestamp: new Date().toISOString()
        };
        bookmarks.push(bookmark);
        showNotification('Chapter bookmarked');
    }
    
    localStorage.setItem('crimson-cipher-bookmarks', JSON.stringify(bookmarks));
    displayBookmarkStatus();
}

function displayBookmarkStatus() {
    const bookmarkBtn = document.getElementById('bookmark-button');
    if (!bookmarkBtn) return;
    
    const chapterPath = window.location.pathname;
    const bookmarks = JSON.parse(localStorage.getItem('crimson-cipher-bookmarks') || '[]');
    const isBookmarked = bookmarks.some(b => b.path === chapterPath);
    
    bookmarkBtn.innerHTML = isBookmarked ? '🔖' : '📖';
    bookmarkBtn.title = isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function addCharacterCardEffects() {
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        character.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
}

function updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-progress') || '0';
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 500);
    });
}

function addKeyboardNavigation() {
    // Enable keyboard navigation for language buttons
    const langButtons = document.querySelectorAll('.lang-button');
    langButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % langButtons.length;
                langButtons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (index - 1 + langButtons.length) % langButtons.length;
                langButtons[prevIndex].focus();
            }
        });
    });
}

function initializeLanguagePreferences() {
    // Save and restore language preferences
    const langButtons = document.querySelectorAll('.lang-button');
    const savedLang = localStorage.getItem('crimson-cipher-lang');
    
    if (savedLang) {
        document.body.setAttribute('data-preferred-lang', savedLang);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.href.includes('/en/') ? 'en' : 'zh';
            localStorage.setItem('crimson-cipher-lang', lang);
        });
    });
}

function addReadingTimeEstimates() {
    // Add reading time estimates based on word count
    const readingSpeed = 200; // words per minute
    const chapters = [
        { number: 1, words: 1200, status: 'complete' },
        { number: 2, words: 2100, status: 'complete' },
        { number: 3, words: 2200, status: 'complete' },
        { number: 4, words: 0, status: 'planned' },
        // Add more chapters as needed
    ];
    
    let totalWords = chapters.reduce((sum, chapter) => 
        chapter.status === 'complete' ? sum + chapter.words : sum, 0
    );
    
    const totalMinutes = Math.ceil(totalWords / readingSpeed);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const readingTimeElement = document.getElementById('reading-time');
    if (readingTimeElement) {
        const timeString = hours > 0 ? 
            `${hours}h ${minutes}m` : 
            `${minutes} minutes`;
        readingTimeElement.textContent = `Estimated reading time: ${timeString}`;
    }
}

// Cipher-related interactive functions
function initializeCipherDemo() {
    // Simple Caesar cipher demonstration
    const demoElement = document.getElementById('cipher-demo');
    if (!demoElement) return;
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shift = 3;
    
    function caesarCipher(text, shift) {
        return text.toUpperCase().split('').map(char => {
            const index = alphabet.indexOf(char);
            if (index === -1) return char;
            const newIndex = (index + shift) % alphabet.length;
            return alphabet[newIndex];
        }).join('');
    }
    
    const inputElement = demoElement.querySelector('#cipher-input');
    const outputElement = demoElement.querySelector('#cipher-output');
    
    if (inputElement && outputElement) {
        inputElement.addEventListener('input', function() {
            const encoded = caesarCipher(this.value, shift);
            outputElement.textContent = encoded;
        });
    }
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels and descriptions
    const langButtons = document.querySelectorAll('.lang-button');
    langButtons.forEach(button => {
        const isEnglish = button.href.includes('/en/');
        const lang = isEnglish ? 'English' : 'Chinese';
        const description = isEnglish ? 
            'Read the novel in English' : 
            'Read the novel in Chinese';
        
        button.setAttribute('aria-label', description);
        button.setAttribute('title', description);
    });
    
    // Add skip navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.addEventListener('focus', function() {
        this.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', function() {
        this.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Theme switching functionality
function initializeThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('crimson-cipher-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('crimson-cipher-theme', newTheme);
        
        // Update button text
        this.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
}

// Search functionality for chapters
function initializeSearch() {
    const searchInput = document.getElementById('chapter-search');
    if (!searchInput) return;
    
    const chapters = document.querySelectorAll('.chapter-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        chapters.forEach(chapter => {
            const title = chapter.querySelector('.chapter-title')?.textContent.toLowerCase() || '';
            const description = chapter.querySelector('.chapter-description')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            chapter.style.display = matches ? 'block' : 'none';
        });
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function() {
    initializeInterface();
    initializeCipherDemo();
    enhanceAccessibility();
    initializeThemeSwitch();
    initializeSearch();
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeInterface,
        addCharacterCardEffects,
        updateProgressBars,
        addKeyboardNavigation,
        initializeLanguagePreferences,
        addReadingTimeEstimates
    };
}
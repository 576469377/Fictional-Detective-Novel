// The Crimson Cipher - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeInterface();
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
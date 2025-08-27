// Performance Monitoring for The Crimson Cipher
// Tracks reading patterns and user engagement

class CrimsonCipherAnalytics {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            pageViews: [],
            interactions: [],
            readingProgress: {},
            achievements: []
        };
        
        this.initialize();
    }
    
    initialize() {
        // Track page load performance
        this.trackPageLoad();
        
        // Monitor reading behavior
        this.trackReadingBehavior();
        
        // Track user interactions
        this.trackInteractions();
        
        // Send periodic updates
        this.startPeriodicReporting();
    }
    
    trackPageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                this.logEvent('page_load', {
                    loadTime: perfData.loadEventEnd - perfData.fetchStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                    firstPaint: this.getFirstPaint(),
                    url: window.location.pathname
                });
            }
        });
    }
    
    trackReadingBehavior() {
        // Track time spent on page
        let timeOnPage = 0;
        const startTime = Date.now();
        
        // Track scroll behavior for reading progress
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset + window.innerHeight) / document.documentElement.scrollHeight * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            this.sessionData.readingProgress[window.location.pathname] = {
                maxScroll: maxScroll,
                currentTime: Date.now() - startTime
            };
        });
        
        // Track when user leaves page
        window.addEventListener('beforeunload', () => {
            timeOnPage = Date.now() - startTime;
            this.logEvent('reading_session', {
                timeOnPage: timeOnPage,
                maxScroll: maxScroll,
                url: window.location.pathname,
                completed: maxScroll > 90
            });
        });
    }
    
    trackInteractions() {
        // Track cryptography demo usage
        document.addEventListener('click', (e) => {
            if (e.target.matches('#caesar-encrypt, #caesar-decrypt')) {
                this.logEvent('crypto_demo_use', {
                    type: 'caesar_cipher',
                    action: e.target.id,
                    timestamp: Date.now()
                });
            }
            
            if (e.target.matches('#analyze-frequency')) {
                this.logEvent('crypto_demo_use', {
                    type: 'frequency_analysis',
                    timestamp: Date.now()
                });
            }
            
            if (e.target.matches('[onclick*="checkChallenge"]')) {
                this.logEvent('crypto_challenge', {
                    challengeId: e.target.onclick.toString().match(/\d+/)[0],
                    timestamp: Date.now()
                });
            }
            
            // Track bookmark usage
            if (e.target.matches('#bookmark-button')) {
                this.logEvent('bookmark_interaction', {
                    url: window.location.pathname,
                    timestamp: Date.now()
                });
            }
        });
        
        // Track language switching
        document.addEventListener('click', (e) => {
            if (e.target.matches('.lang-button')) {
                this.logEvent('language_switch', {
                    from: document.documentElement.lang || 'unknown',
                    to: e.target.href.includes('/zh/') ? 'zh' : 'en',
                    timestamp: Date.now()
                });
            }
        });
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return firstPaint ? firstPaint.startTime : null;
    }
    
    logEvent(eventType, data) {
        const event = {
            type: eventType,
            timestamp: Date.now(),
            url: window.location.pathname,
            userAgent: navigator.userAgent,
            data: data
        };
        
        this.sessionData.interactions.push(event);
        
        // Store in localStorage for persistence
        const events = JSON.parse(localStorage.getItem('crimson-cipher-analytics') || '[]');
        events.push(event);
        
        // Keep only last 100 events to prevent storage bloat
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('crimson-cipher-analytics', JSON.stringify(events));
    }
    
    startPeriodicReporting() {
        // Send summary every 5 minutes if user is active
        setInterval(() => {
            if (document.hasFocus()) {
                this.sendSummaryReport();
            }
        }, 5 * 60 * 1000);
    }
    
    sendSummaryReport() {
        const summary = this.generateSummary();
        
        // In a real implementation, this would send to analytics service
        console.log('Crimson Cipher Analytics Summary:', summary);
        
        // Store summary for potential export
        localStorage.setItem('crimson-cipher-analytics-summary', JSON.stringify(summary));
    }
    
    generateSummary() {
        const events = JSON.parse(localStorage.getItem('crimson-cipher-analytics') || '[]');
        
        return {
            sessionDuration: Date.now() - this.sessionData.startTime,
            totalEvents: events.length,
            pageViews: [...new Set(events.map(e => e.url))].length,
            cryptoDemoUsage: events.filter(e => e.type === 'crypto_demo_use').length,
            challengeAttempts: events.filter(e => e.type === 'crypto_challenge').length,
            languageSwitches: events.filter(e => e.type === 'language_switch').length,
            readingProgress: this.sessionData.readingProgress,
            averageTimePerPage: this.calculateAverageTimePerPage(events),
            completedPages: Object.values(this.sessionData.readingProgress).filter(p => p.maxScroll > 90).length
        };
    }
    
    calculateAverageTimePerPage(events) {
        const readingSessions = events.filter(e => e.type === 'reading_session');
        if (readingSessions.length === 0) return 0;
        
        const totalTime = readingSessions.reduce((sum, session) => sum + session.data.timeOnPage, 0);
        return totalTime / readingSessions.length;
    }
    
    // Export data for analysis
    exportData() {
        const allData = {
            events: JSON.parse(localStorage.getItem('crimson-cipher-analytics') || '[]'),
            summary: JSON.parse(localStorage.getItem('crimson-cipher-analytics-summary') || '{}'),
            achievements: JSON.parse(localStorage.getItem('crimson-cipher-achievements') || '[]'),
            bookmarks: JSON.parse(localStorage.getItem('crimson-cipher-bookmarks') || '[]'),
            overallProgress: localStorage.getItem('crimson-cipher-overall-progress') || '0'
        };
        
        return allData;
    }
}

// Initialize analytics if not in development mode
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    window.crimsonCipherAnalytics = new CrimsonCipherAnalytics();
}

// Expose utility function for data export
window.exportCrimsonCipherData = function() {
    if (window.crimsonCipherAnalytics) {
        const data = window.crimsonCipherAnalytics.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `crimson-cipher-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
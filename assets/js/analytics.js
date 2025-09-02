// Performance Monitoring for The Crimson Cipher
// Tracks reading patterns and user engagement with privacy-focused approach

class CrimsonCipherAnalytics {
    constructor() {
        this.sessionData = {
            startTime: Date.now(),
            pageViews: [],
            interactions: [],
            readingProgress: {},
            achievements: [],
            preferences: this.loadPreferences()
        };
        
        this.privacyMode = this.sessionData.preferences.privacy || 'minimal';
        this.initialize();
    }
    
    initialize() {
        // Respect user privacy preferences
        if (this.privacyMode === 'none') {
            console.log('Analytics disabled by user preference');
            return;
        }
        
        // Track page load performance
        this.trackPageLoad();
        
        // Monitor reading behavior
        this.trackReadingBehavior();
        
        // Track user interactions
        this.trackInteractions();
        
        // Track educational progress
        this.trackEducationalProgress();
        
        // Send periodic updates (local storage only)
        this.startPeriodicReporting();
        
        // Initialize reading statistics
        this.initializeReadingStats();
    }
    
    trackPageLoad() {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                this.logEvent('page_load', {
                    loadTime: perfData.loadEventEnd - perfData.fetchStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
                    firstPaint: this.getFirstPaint(),
                    url: this.anonymizeUrl(window.location.pathname),
                    timestamp: Date.now()
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
    
    // Additional tracking methods
    trackEducationalEngagement() {
        // Track crypto demo usage
        document.addEventListener('click', (e) => {
            if (e.target.matches('.crypto-demo button, .challenge button')) {
                this.logEvent('crypto_demo_use', {
                    element: e.target.textContent,
                    timestamp: Date.now(),
                    page: this.anonymizeUrl(window.location.pathname)
                });
            }
        });
        
        // Track search usage
        document.addEventListener('input', (e) => {
            if (e.target.matches('#main-search, #pattern-input')) {
                this.logEvent('search_usage', {
                    searchType: e.target.id,
                    timestamp: Date.now()
                });
            }
        });
    }
    
    trackReadingMilestones() {
        const checkMilestones = () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            const currentPage = this.anonymizeUrl(window.location.pathname);
            
            if (!this.sessionData.readingProgress[currentPage]) {
                this.sessionData.readingProgress[currentPage] = { maxScroll: 0, milestones: [] };
            }
            
            const pageProgress = this.sessionData.readingProgress[currentPage];
            pageProgress.maxScroll = Math.max(pageProgress.maxScroll, scrollPercent);
            
            // Track reading milestones (25%, 50%, 75%, 100%)
            const milestones = [25, 50, 75, 100];
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !pageProgress.milestones.includes(milestone)) {
                    pageProgress.milestones.push(milestone);
                    this.logEvent('reading_milestone', {
                        milestone: milestone,
                        page: currentPage,
                        timestamp: Date.now()
                    });
                    
                    if (milestone === 100) {
                        this.checkAchievements('page_complete', currentPage);
                    }
                }
            });
        };
        
        window.addEventListener('scroll', checkMilestones, { passive: true });
    }
    
    trackEducationalProgress() {
        // Track cryptography challenge completions
        const originalCheckChallenge = window.checkChallenge;
        if (typeof originalCheckChallenge === 'function') {
            window.checkChallenge = (challengeNumber) => {
                const result = originalCheckChallenge(challengeNumber);
                this.logEvent('crypto_challenge', {
                    challenge: challengeNumber,
                    timestamp: Date.now(),
                    page: this.anonymizeUrl(window.location.pathname)
                });
                return result;
            };
        }
    }
    
    checkAchievements(type, data) {
        const achievements = {
            'page_complete': `Completed reading: ${data}`,
            'first_chapter': 'Read your first chapter',
            'crypto_explorer': 'Used cryptography demonstrations',
            'pattern_master': 'Completed all challenges',
            'language_learner': 'Switched between languages'
        };
        
        if (achievements[type] && !this.sessionData.achievements.includes(type)) {
            this.sessionData.achievements.push(type);
            this.logEvent('achievement_unlocked', {
                achievement: type,
                description: achievements[type],
                timestamp: Date.now()
            });
            
            // Save achievements persistently
            const savedAchievements = JSON.parse(localStorage.getItem('crimson-cipher-achievements') || '[]');
            if (!savedAchievements.includes(type)) {
                savedAchievements.push(type);
                localStorage.setItem('crimson-cipher-achievements', JSON.stringify(savedAchievements));
            }
        }
    }
    
    initializeReadingStats() {
        // Load saved reading progress
        const savedProgress = localStorage.getItem('crimson-cipher-reading-progress');
        if (savedProgress) {
            this.sessionData.readingProgress = JSON.parse(savedProgress);
        }
        
        // Save progress periodically
        setInterval(() => {
            localStorage.setItem('crimson-cipher-reading-progress', JSON.stringify(this.sessionData.readingProgress));
        }, 30000); // Save every 30 seconds
    }
    
    loadPreferences() {
        return JSON.parse(localStorage.getItem('crimson-cipher-preferences') || '{"privacy": "minimal"}');
    }
    
    anonymizeUrl(url) {
        // Remove any potentially identifying information from URLs
        return url.replace(/\/[^\/]*$/, '/page').replace(/\d+/g, 'N');
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
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
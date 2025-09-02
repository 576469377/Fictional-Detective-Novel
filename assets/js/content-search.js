// Advanced Content Search System
// For The Crimson Cipher project

document.addEventListener('DOMContentLoaded', function() {
    initializeContentSearch();
});

// Main search initialization
function initializeContentSearch() {
    // Initialize search interface
    setupSearchInterface();
    
    // Initialize content indexing
    initializeContentIndex();
    
    // Initialize quick navigation
    setupQuickNavigation();
    
    // Initialize random discovery
    setupRandomDiscovery();
    
    // Initialize search suggestions
    setupSearchSuggestions();
    
    // Initialize search analytics
    initializeSearchAnalytics();
}

// Content index for fast searching
let contentIndex = {};
let searchHistory = [];

function initializeContentIndex() {
    // Define content structure for indexing
    contentIndex = {
        chapters: {
            en: [
                { id: 'ch1-en', title: 'The First Message', path: '../en/chapters/chapter01.md', content: 'Detective Sarah Chen receives her first cryptographic challenge when Emma Rodriguez disappears...' },
                { id: 'ch2-en', title: 'Shadows in the Rain', path: '../en/chapters/chapter02.md', content: 'The investigation deepens as patterns emerge from the coded messages...' },
                { id: 'ch3-en', title: 'The Pattern Emerges', path: '../en/chapters/chapter03.md', content: 'Historical connections to 1847 case revealed through university research...' },
                { id: 'ch4-en', title: 'Deeper Into Darkness', path: '../en/chapters/chapter04.md', content: 'Steganography challenge leads to courthouse basement discovery...' },
                { id: 'ch5-en', title: 'The Final Revelation', path: '../en/chapters/chapter05.md', content: 'Underground network exposed, conspiracy reaches higher levels...' },
                { id: 'ch6-en', title: 'Echoes of the Past', path: '../en/chapters/chapter06.md', content: 'Family connections and historical patterns converge...' },
                { id: 'ch7-en', title: 'The Cryptographer\'s Legacy', path: '../en/chapters/chapter07.md', content: 'Academic research reveals deeper conspiracy connections...' },
                { id: 'ch8-en', title: 'Betrayal and Truth', path: '../en/chapters/chapter08.md', content: 'Personal stakes rise as betrayals are revealed...' },
                { id: 'ch9-en', title: 'The Underground Network', path: '../en/chapters/chapter09.md', content: 'Multi-generational conspiracy exposed in full scope...' },
                { id: 'ch10-en', title: 'Race Against Time', path: '../en/chapters/chapter10.md', content: 'Final phase prevention becomes critical mission...' },
                { id: 'ch11-en', title: 'The Master\'s Gambit', path: '../en/chapters/chapter11.md', content: 'Cipher Master\'s ultimate plan revealed and countered...' },
                { id: 'ch12-en', title: 'Crimson Dawn', path: '../en/chapters/chapter12.md', content: 'Resolution of both contemporary and historical mysteries...' }
            ],
            zh: [
                { id: 'ch1-zh', title: '第一条信息', path: '../zh/chapters/chapter01.md', content: '陈莎拉警探收到她的第一个密码挑战，当艾玛·罗德里格斯失踪时...' },
                { id: 'ch2-zh', title: '雨中阴影', path: '../zh/chapters/chapter02.md', content: '随着编码信息中模式的出现，调查加深...' },
                // Additional Chinese chapters would be indexed here
            ]
        },
        characters: [
            { id: 'sarah-chen', title: 'Detective Sarah Chen', content: 'Lead investigator specializing in cryptography and pattern analysis...' },
            { id: 'emma-rodriguez', title: 'Emma Rodriguez', content: 'Missing graphic designer, catalyst for the investigation...' },
            { id: 'marcus-webb', title: 'Dr. Marcus Webb', content: 'Forensic expert in digital forensics and medicine...' },
            { id: 'cipher-master', title: 'The Cipher Master', content: 'Antagonist with advanced cryptographic knowledge...' }
        ],
        documentation: [
            { id: 'crypto-guide', title: 'Cryptography Guide', content: 'Understanding codes and ciphers used in the novel...' },
            { id: 'timeline', title: 'Timeline', content: 'Historical events and investigation chronology...' },
            { id: 'readers-guide', title: 'Reader\'s Guide', content: 'Discussion questions and literary analysis...' }
        ],
        cryptography: [
            { id: 'caesar-cipher', title: 'Caesar Cipher', content: 'Ancient substitution cipher used by Julius Caesar...' },
            { id: 'frequency-analysis', title: 'Frequency Analysis', content: 'Statistical method for breaking substitution ciphers...' },
            { id: 'steganography', title: 'Steganography', content: 'Art of hiding messages in plain sight...' }
        ]
    };
    
    // Load additional content from localStorage if available
    const savedContent = localStorage.getItem('crimson-cipher-search-index');
    if (savedContent) {
        try {
            const parsed = JSON.parse(savedContent);
            contentIndex = { ...contentIndex, ...parsed };
        } catch (e) {
            console.log('Could not load saved search index');
        }
    }
    
    // Build full-text search index
    buildSearchIndex();
}

function buildSearchIndex() {
    // Create searchable text index for fast querying
    const allContent = [];
    
    // Index all content types
    Object.keys(contentIndex).forEach(category => {
        if (Array.isArray(contentIndex[category])) {
            contentIndex[category].forEach(item => {
                allContent.push({
                    ...item,
                    category: category,
                    searchText: `${item.title} ${item.content}`.toLowerCase()
                });
            });
        } else {
            // Handle nested categories (like chapters.en, chapters.zh)
            Object.keys(contentIndex[category]).forEach(subCategory => {
                contentIndex[category][subCategory].forEach(item => {
                    allContent.push({
                        ...item,
                        category: category,
                        subCategory: subCategory,
                        searchText: `${item.title} ${item.content}`.toLowerCase()
                    });
                });
            });
        }
    });
    
    contentIndex.searchableContent = allContent;
}

function setupSearchInterface() {
    const searchInput = document.getElementById('main-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return; // Not on search page
    
    // Real-time search as user types
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
    
    // Search on button click
    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    // Setup filter change handlers
    const filterInputs = document.querySelectorAll('.filter-option input');
    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (searchInput.value.trim()) {
                performSearch(searchInput.value);
            }
        });
    });
}

function performSearch(query) {
    if (!query.trim()) {
        showSearchPlaceholder();
        return;
    }
    
    // Track search
    trackSearch(query);
    
    // Get active filters
    const filters = getActiveFilters();
    
    // Perform search
    const results = searchContent(query, filters);
    
    // Display results
    displaySearchResults(query, results);
    
    // Update statistics
    updateSearchStatistics(query, results);
}

function searchContent(query, filters) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    const results = [];
    
    if (!contentIndex.searchableContent) return results;
    
    contentIndex.searchableContent.forEach(item => {
        // Apply category filters
        if (!filters.contentTypes.includes(item.category)) return;
        
        // Apply language filters
        if (filters.language !== 'all') {
            if (item.subCategory && item.subCategory !== filters.language) return;
        }
        
        // Calculate relevance score
        let score = 0;
        let matches = [];
        
        searchTerms.forEach(term => {
            // Title matches are weighted higher
            if (item.title.toLowerCase().includes(term)) {
                score += 10;
                matches.push({ type: 'title', term: term });
            }
            
            // Content matches
            if (item.content.toLowerCase().includes(term)) {
                score += 5;
                matches.push({ type: 'content', term: term });
            }
            
            // Exact phrase bonus
            if (item.searchText.includes(query.toLowerCase())) {
                score += 15;
                matches.push({ type: 'exact', term: query });
            }
        });
        
        if (score > 0) {
            results.push({
                ...item,
                score: score,
                matches: matches,
                relevance: calculateRelevance(item, query, matches)
            });
        }
    });
    
    // Sort by relevance score
    return results.sort((a, b) => b.score - a.score);
}

function calculateRelevance(item, query, matches) {
    // Calculate how well the item matches the search query
    let relevance = 0;
    
    // Title exact match bonus
    if (item.title.toLowerCase() === query.toLowerCase()) {
        relevance += 50;
    }
    
    // Title partial match
    if (item.title.toLowerCase().includes(query.toLowerCase())) {
        relevance += 25;
    }
    
    // Number of matching terms
    relevance += matches.length * 5;
    
    // Content length factor (prefer shorter, more focused content)
    if (item.content.length < 200) {
        relevance += 10;
    }
    
    return relevance;
}

function getActiveFilters() {
    const contentTypes = [];
    const contentFilters = document.querySelectorAll('input[type="checkbox"]:checked');
    contentFilters.forEach(input => {
        contentTypes.push(input.value);
    });
    
    const languageFilter = document.querySelector('input[name="language"]:checked');
    const language = languageFilter ? languageFilter.value : 'all';
    
    return {
        contentTypes: contentTypes,
        language: language
    };
}

function displaySearchResults(query, results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h4>No results found</h4>
                <p>No content found for "${query}". Try different search terms or check your filters.</p>
                <div class="search-suggestions-container">
                    <h5>Suggestions:</h5>
                    <ul>
                        <li>Check your spelling</li>
                        <li>Try broader search terms</li>
                        <li>Remove some filters</li>
                        <li>Search for character names or cryptography terms</li>
                    </ul>
                </div>
            </div>
        `;
        return;
    }
    
    let resultsHTML = `
        <div class="results-header">
            <h4>Search Results</h4>
            <div class="results-summary">
                Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
            </div>
        </div>
        <div class="results-list">
    `;
    
    results.forEach((result, index) => {
        const snippet = createSearchSnippet(result, query);
        const category = getCategoryLabel(result.category);
        const language = result.subCategory ? ` (${result.subCategory.toUpperCase()})` : '';
        
        resultsHTML += `
            <div class="search-result" data-category="${result.category}" data-score="${result.score}">
                <div class="result-header">
                    <h5 class="result-title">
                        <a href="${result.path}" target="_blank">${highlightSearchTerms(result.title, query)}</a>
                    </h5>
                    <div class="result-meta">
                        <span class="result-category">${category}${language}</span>
                        <span class="result-relevance" title="Relevance score: ${result.score}">${result.relevance}% match</span>
                    </div>
                </div>
                <div class="result-content">
                    <p>${snippet}</p>
                </div>
                <div class="result-actions">
                    <a href="${result.path}" class="result-link">Read More →</a>
                    <button class="bookmark-result" data-id="${result.id}" title="Bookmark this result">⭐</button>
                </div>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    resultsContainer.innerHTML = resultsHTML;
    
    // Add bookmark functionality
    setupResultBookmarks();
}

function createSearchSnippet(result, query) {
    const content = result.content;
    const queryTerms = query.toLowerCase().split(' ');
    
    // Find the best snippet around the search terms
    let bestSnippet = '';
    let bestScore = 0;
    
    queryTerms.forEach(term => {
        const index = content.toLowerCase().indexOf(term);
        if (index !== -1) {
            const start = Math.max(0, index - 50);
            const end = Math.min(content.length, index + term.length + 50);
            const snippet = content.substring(start, end);
            
            // Score snippet based on number of query terms it contains
            let score = 0;
            queryTerms.forEach(t => {
                if (snippet.toLowerCase().includes(t)) score++;
            });
            
            if (score > bestScore) {
                bestScore = score;
                bestSnippet = snippet;
            }
        }
    });
    
    if (!bestSnippet) {
        bestSnippet = content.substring(0, 150);
    }
    
    // Add ellipsis if needed
    const prefix = bestSnippet !== content.substring(0, bestSnippet.length) ? '...' : '';
    const suffix = bestSnippet.length < content.length ? '...' : '';
    
    return prefix + highlightSearchTerms(bestSnippet, query) + suffix;
}

function highlightSearchTerms(text, query) {
    const terms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlighted = text;
    
    terms.forEach(term => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    
    return highlighted;
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getCategoryLabel(category) {
    const labels = {
        'chapters': 'Chapter',
        'characters': 'Character',
        'documentation': 'Documentation',
        'cryptography': 'Cryptography'
    };
    return labels[category] || category;
}

function showSearchPlaceholder() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = `
        <div class="search-placeholder">
            <div class="placeholder-icon">📚</div>
            <h4>Ready to Search</h4>
            <p>Enter a search term above to find content across the entire novel project</p>
        </div>
    `;
}

function setupQuickNavigation() {
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const searchInput = document.getElementById('main-search');
            
            if (searchInput) {
                searchInput.value = category;
                performSearch(category);
                searchInput.focus();
            }
        });
    });
}

function setupRandomDiscovery() {
    const randomButtons = {
        'random-chapter': () => getRandomContent('chapters'),
        'random-character': () => getRandomContent('characters'),
        'random-crypto': () => getRandomContent('cryptography'),
        'random-timeline': () => getRandomTimelineEvent()
    };
    
    Object.keys(randomButtons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                const result = randomButtons[buttonId]();
                displayRandomDiscovery(result);
            });
        }
    });
}

function getRandomContent(category) {
    const items = contentIndex[category];
    if (!items) return null;
    
    if (Array.isArray(items)) {
        return items[Math.floor(Math.random() * items.length)];
    } else {
        // Handle nested categories
        const subCategories = Object.keys(items);
        const randomSub = subCategories[Math.floor(Math.random() * subCategories.length)];
        const subItems = items[randomSub];
        return subItems[Math.floor(Math.random() * subItems.length)];
    }
}

function getRandomTimelineEvent() {
    const timelineEvents = [
        { title: 'March 1847: Original Cipher Master Crimes Begin', content: 'First coded messages appear in London\'s East End...' },
        { title: 'November 15, 2023: Emma Rodriguez Disappears', content: 'The investigation begins with the first cryptographic challenge...' },
        { title: 'November 17: University Discovery', content: 'Historical connections revealed through academic research...' }
    ];
    
    return timelineEvents[Math.floor(Math.random() * timelineEvents.length)];
}

function displayRandomDiscovery(content) {
    const resultContainer = document.getElementById('discovery-result');
    
    if (!content) {
        resultContainer.innerHTML = '<p>No content available for discovery.</p>';
        return;
    }
    
    resultContainer.innerHTML = `
        <div class="discovery-item">
            <h4>${content.title}</h4>
            <p>${content.content}</p>
            ${content.path ? `<a href="${content.path}" class="discovery-link">Read More →</a>` : ''}
        </div>
    `;
}

function setupSearchSuggestions() {
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.dataset.search;
            const searchInput = document.getElementById('main-search');
            
            if (searchInput) {
                searchInput.value = searchTerm;
                performSearch(searchTerm);
            }
        });
    });
}

function setupResultBookmarks() {
    const bookmarkButtons = document.querySelectorAll('.bookmark-result');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resultId = this.dataset.id;
            toggleBookmark(resultId, this);
        });
    });
    
    // Load existing bookmarks
    loadBookmarkStates();
}

function toggleBookmark(resultId, button) {
    const bookmarks = JSON.parse(localStorage.getItem('crimson-cipher-bookmarks') || '[]');
    
    if (bookmarks.includes(resultId)) {
        // Remove bookmark
        const index = bookmarks.indexOf(resultId);
        bookmarks.splice(index, 1);
        button.textContent = '⭐';
        button.classList.remove('bookmarked');
    } else {
        // Add bookmark
        bookmarks.push(resultId);
        button.textContent = '🌟';
        button.classList.add('bookmarked');
    }
    
    localStorage.setItem('crimson-cipher-bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarkStates() {
    const bookmarks = JSON.parse(localStorage.getItem('crimson-cipher-bookmarks') || '[]');
    
    bookmarks.forEach(bookmarkId => {
        const button = document.querySelector(`[data-id="${bookmarkId}"]`);
        if (button) {
            button.textContent = '🌟';
            button.classList.add('bookmarked');
        }
    });
}

function trackSearch(query) {
    // Add to search history
    searchHistory.unshift({
        query: query,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 50 searches
    searchHistory = searchHistory.slice(0, 50);
    
    // Save to localStorage
    localStorage.setItem('crimson-cipher-search-history', JSON.stringify(searchHistory));
}

function initializeSearchAnalytics() {
    // Load search history
    const savedHistory = localStorage.getItem('crimson-cipher-search-history');
    if (savedHistory) {
        try {
            searchHistory = JSON.parse(savedHistory);
        } catch (e) {
            searchHistory = [];
        }
    }
    
    // Update search suggestions based on history
    updateSearchSuggestionsFromHistory();
}

function updateSearchSuggestionsFromHistory() {
    if (searchHistory.length === 0) return;
    
    // Get most common search terms
    const termFrequency = {};
    searchHistory.forEach(search => {
        const terms = search.query.toLowerCase().split(' ');
        terms.forEach(term => {
            if (term.length > 2) {
                termFrequency[term] = (termFrequency[term] || 0) + 1;
            }
        });
    });
    
    // Sort by frequency
    const popularTerms = Object.keys(termFrequency)
        .sort((a, b) => termFrequency[b] - termFrequency[a])
        .slice(0, 5);
    
    // Add to suggestions if not already there
    const suggestionsContainer = document.querySelector('.suggestion-tags');
    if (suggestionsContainer && popularTerms.length > 0) {
        popularTerms.forEach(term => {
            if (!document.querySelector(`[data-search="${term}"]`)) {
                const tag = document.createElement('span');
                tag.className = 'suggestion-tag';
                tag.dataset.search = term;
                tag.textContent = term;
                tag.addEventListener('click', function() {
                    const searchInput = document.getElementById('main-search');
                    if (searchInput) {
                        searchInput.value = term;
                        performSearch(term);
                    }
                });
                suggestionsContainer.appendChild(tag);
            }
        });
    }
}

function updateSearchStatistics(query, results) {
    const statsContainer = document.getElementById('search-statistics');
    if (!statsContainer) return;
    
    const totalContent = contentIndex.searchableContent ? contentIndex.searchableContent.length : 0;
    const coverage = totalContent > 0 ? Math.round((results.length / totalContent) * 100) : 0;
    
    statsContainer.innerHTML = `
        <div class="search-stats-content">
            <div class="stat-item">
                <span class="stat-label">Search Results:</span>
                <span class="stat-value">${results.length}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Coverage:</span>
                <span class="stat-value">${coverage}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Query:</span>
                <span class="stat-value">"${query}"</span>
            </div>
        </div>
    `;
}
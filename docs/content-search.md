# Content Search
## Find Anything in The Crimson Cipher

[← Back to Main](../README.md)

---

## 🔍 Advanced Search

<div id="search-interface" class="search-container">
    <div class="search-header">
        <h3>Search Across All Content</h3>
        <p>Search through chapters, character profiles, documentation, and more</p>
    </div>
    
    <div class="search-controls">
        <div class="search-input-group">
            <input type="text" id="main-search" placeholder="Search for anything..." autocomplete="off">
            <button id="search-button" class="search-btn">
                <span class="search-icon">🔍</span>
                Search
            </button>
        </div>
        
        <div class="search-filters">
            <div class="filter-group">
                <label>Content Type:</label>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="checkbox" value="chapters" checked> Chapters
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="characters" checked> Character Profiles
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="documentation" checked> Documentation
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="cryptography" checked> Cryptography
                    </label>
                </div>
            </div>
            
            <div class="filter-group">
                <label>Language:</label>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="radio" name="language" value="all" checked> Both Languages
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="language" value="en"> English Only
                    </label>
                    <label class="filter-option">
                        <input type="radio" name="language" value="zh"> Chinese Only
                    </label>
                </div>
            </div>
        </div>
        
        <div class="search-suggestions" id="search-suggestions">
            <h4>Popular Searches:</h4>
            <div class="suggestion-tags">
                <span class="suggestion-tag" data-search="Sarah Chen">Sarah Chen</span>
                <span class="suggestion-tag" data-search="cipher wheel">Cipher Wheel</span>
                <span class="suggestion-tag" data-search="Emma Rodriguez">Emma Rodriguez</span>
                <span class="suggestion-tag" data-search="cryptography">Cryptography</span>
                <span class="suggestion-tag" data-search="1847">1847 Case</span>
                <span class="suggestion-tag" data-search="frequency analysis">Frequency Analysis</span>
                <span class="suggestion-tag" data-search="investigation">Investigation</span>
                <span class="suggestion-tag" data-search="timeline">Timeline</span>
            </div>
        </div>
    </div>
    
    <div id="search-results" class="search-results">
        <div class="search-placeholder">
            <div class="placeholder-icon">📚</div>
            <h4>Ready to Search</h4>
            <p>Enter a search term above to find content across the entire novel project</p>
        </div>
    </div>
    
    <div id="search-statistics" class="search-stats"></div>
</div>

---

## 🎯 Quick Navigation

<div class="quick-nav-section">
    <h3>Browse by Category</h3>
    
    <div class="nav-grid">
        <div class="nav-card" data-category="story">
            <div class="nav-icon">📖</div>
            <h4>Story Content</h4>
            <p>All 12 chapters in English and Chinese</p>
            <div class="nav-links">
                <a href="../en/index.md">English Chapters</a>
                <a href="../zh/index.md">Chinese Chapters</a>
            </div>
        </div>
        
        <div class="nav-card" data-category="characters">
            <div class="nav-icon">👥</div>
            <h4>Characters</h4>
            <p>Detailed profiles and development</p>
            <div class="nav-links">
                <a href="character-profiles-en.md">Character Profiles</a>
                <a href="character-profiles-zh.md">角色档案</a>
            </div>
        </div>
        
        <div class="nav-card" data-category="cryptography">
            <div class="nav-icon">🔐</div>
            <h4>Cryptography</h4>
            <p>Educational content and interactive demos</p>
            <div class="nav-links">
                <a href="cryptography-guide-en.md">Crypto Guide</a>
                <a href="cryptography-interactive.md">Interactive Demos</a>
            </div>
        </div>
        
        <div class="nav-card" data-category="timeline">
            <div class="nav-icon">📅</div>
            <h4>Timeline</h4>
            <p>Historical events and investigation chronology</p>
            <div class="nav-links">
                <a href="timeline-en.md">Timeline</a>
                <a href="timeline-interactive.md">Interactive Timeline</a>
            </div>
        </div>
        
        <div class="nav-card" data-category="guides">
            <div class="nav-icon">📚</div>
            <h4>Reader's Guides</h4>
            <p>Discussion questions and analysis</p>
            <div class="nav-links">
                <a href="readers-guide-en.md">Reader's Guide</a>
                <a href="readers-guide-zh.md">阅读指南</a>
            </div>
        </div>
        
        <div class="nav-card" data-category="project">
            <div class="nav-icon">⚙️</div>
            <h4>Project Info</h4>
            <p>Documentation and contribution guides</p>
            <div class="nav-links">
                <a href="../CONTRIBUTING.md">Contributing</a>
                <a href="project-documentation.md">Documentation</a>
            </div>
        </div>
    </div>
</div>

---

## 🔍 Advanced Search Features

### Search Syntax Guide

Use these advanced search operators to find exactly what you're looking for:

<div class="search-syntax">
    <div class="syntax-section">
        <h4>🎯 Exact Phrases</h4>
        <code>"cipher wheel"</code> - Find exact phrase matches
        <p><em>Example: "temporal anomaly" finds documents containing this exact phrase</em></p>
    </div>
    
    <div class="syntax-section">
        <h4>🔗 Boolean Operators</h4>
        <code>sarah AND marcus</code> - Find documents containing both terms<br>
        <code>cipher OR cryptography</code> - Find documents containing either term<br>
        <code>mystery NOT historical</code> - Find documents with first term but not second
        <p><em>Example: "cryptography AND education" finds educational cryptographic content</em></p>
    </div>
    
    <div class="syntax-section">
        <h4>🎭 Character Searches</h4>
        <code>character:sarah</code> - Find content related to specific character<br>
        <code>character:marcus</code> - Focus on Dr. Marcus Webb content<br>
        <code>character:emma</code> - Emma Rodriguez related content
        <p><em>Example: "character:hartwell quantum" finds Dr. Hartwell's quantum research</em></p>
    </div>
    
    <div class="syntax-section">
        <h4>📖 Chapter-Specific</h4>
        <code>chapter:03</code> - Search within specific chapter<br>
        <code>chapter:07-09</code> - Search chapter range<br>
        <code>chapter:finale</code> - Search concluding chapters
        <p><em>Example: "chapter:05 conspiracy" finds conspiracy content in Chapter 5</em></p>
    </div>
    
    <div class="syntax-section">
        <h4>🌐 Language Filtering</h4>
        <code>lang:en</code> - English content only<br>
        <code>lang:zh</code> - Chinese content only<br>
        <code>lang:both</code> - Show both language versions
        <p><em>Example: "caesar cipher lang:zh" finds Chinese cryptography content</em></p>
    </div>
</div>

### Smart Search Suggestions

The search system provides intelligent suggestions based on content analysis:

<div class="smart-suggestions">
    <h4>📊 Popular Search Terms</h4>
    <div class="suggestion-tags" id="popular-tags">
        <span class="suggestion-tag" data-search="cipher wheel">cipher wheel</span>
        <span class="suggestion-tag" data-search="sarah chen">sarah chen</span>
        <span class="suggestion-tag" data-search="temporal anomaly">temporal anomaly</span>
        <span class="suggestion-tag" data-search="frequency analysis">frequency analysis</span>
        <span class="suggestion-tag" data-search="1847 case">1847 case</span>
        <span class="suggestion-tag" data-search="marcus webb">marcus webb</span>
        <span class="suggestion-tag" data-search="cryptography">cryptography</span>
        <span class="suggestion-tag" data-search="investigation">investigation</span>
    </div>
    
    <h4>🔗 Related Topics</h4>
    <div class="related-topics" id="related-topics">
        <div class="topic-group">
            <strong>Cryptographic Methods:</strong>
            <span class="topic-tag">caesar cipher</span>
            <span class="topic-tag">substitution cipher</span>
            <span class="topic-tag">vigenere cipher</span>
            <span class="topic-tag">steganography</span>
        </div>
        
        <div class="topic-group">
            <strong>Investigation Elements:</strong>
            <span class="topic-tag">crime scene</span>
            <span class="topic-tag">evidence analysis</span>
            <span class="topic-tag">pattern recognition</span>
            <span class="topic-tag">psychological profile</span>
        </div>
        
        <div class="topic-group">
            <strong>Historical Context:</strong>
            <span class="topic-tag">1847 mystery</span>
            <span class="topic-tag">preservation society</span>
            <span class="topic-tag">temporal research</span>
            <span class="topic-tag">document analysis</span>
        </div>
    </div>
</div>

---

## 📈 Search Analytics

Track your reading progress and popular content:

<div id="search-analytics" class="analytics-section">
    <h3>📊 Content Statistics</h3>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Complete Chapters</div>
            <div class="stat-detail">Available in English & Chinese</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-number">26,000+</div>
            <div class="stat-label">Total Words</div>
            <div class="stat-detail">Across both languages</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-number">15+</div>
            <div class="stat-label">Documentation Files</div>
            <div class="stat-detail">Guides, profiles, references</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Interactive Elements</div>
            <div class="stat-detail">Demos, challenges, tools</div>
        </div>
    </div>
    
    <div class="reading-progress">
        <h4>📖 Your Reading Progress</h4>
        <div class="progress-track">
            <div class="progress-section">
                <span class="progress-label">Chapters Read:</span>
                <div class="progress-bar">
                    <div id="chapter-progress" class="progress-fill" style="width: 0%"></div>
                </div>
                <span id="chapter-count">0 of 12</span>
            </div>
            
            <div class="progress-section">
                <span class="progress-label">Documentation Explored:</span>
                <div class="progress-bar">
                    <div id="docs-progress" class="progress-fill" style="width: 0%"></div>
                </div>
                <span id="docs-count">0 of 15</span>
            </div>
        </div>
    </div>
</div>

---

## 🔧 Search Customization

Personalize your search experience:

<div id="search-preferences" class="preferences-section">
    <h3>⚙️ Search Preferences</h3>
    
    <div class="preference-group">
        <label class="preference-label">
            <input type="checkbox" id="pref-auto-complete" checked>
            Enable Auto-complete Suggestions
        </label>
        <p class="preference-description">Show search suggestions as you type</p>
    </div>
    
    <div class="preference-group">
        <label class="preference-label">
            <input type="checkbox" id="pref-search-history" checked>
            Save Search History
        </label>
        <p class="preference-description">Remember your recent searches for quick access</p>
    </div>
    
    <div class="preference-group">
        <label class="preference-label">
            <input type="checkbox" id="pref-reading-progress">
            Track Reading Progress
        </label>
        <p class="preference-description">Monitor which chapters and documents you've read</p>
    </div>
    
    <div class="preference-group">
        <label class="preference-label">Default Language:</label>
        <select id="pref-default-language">
            <option value="both">Both Languages</option>
            <option value="en">English Only</option>
            <option value="zh">Chinese Only</option>
        </select>
        <p class="preference-description">Choose your preferred language for search results</p>
    </div>
    
    <div class="preference-group">
        <label class="preference-label">Results Per Page:</label>
        <select id="pref-results-count">
            <option value="10">10 Results</option>
            <option value="20" selected>20 Results</option>
            <option value="50">50 Results</option>
        </select>
        <p class="preference-description">Number of search results to display per page</p>
    </div>
    
    <button id="save-preferences" class="preference-button">Save Preferences</button>
    <button id="reset-preferences" class="preference-button secondary">Reset to Defaults</button>
</div>

<script src="../assets/js/content-search.js"></script>
<link rel="stylesheet" href="../assets/css/content-search.css">

[← Back to Main](../README.md) | [Project Documentation →](project-documentation.md)
            </div>
        </div>
    </div>
</div>

---

## 📊 Content Statistics

<div id="content-statistics" class="content-stats">
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Complete Chapters</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">26,000+</div>
            <div class="stat-label">Total Words</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Languages</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">43</div>
            <div class="stat-label">Content Files</div>
        </div>
    </div>
</div>

---

## 🎲 Random Discovery

<div class="random-discovery">
    <h3>Discover Something New</h3>
    <p>Explore random content from across the project</p>
    
    <div class="discovery-buttons">
        <button id="random-chapter" class="discovery-btn">
            📖 Random Chapter
        </button>
        <button id="random-character" class="discovery-btn">
            👤 Random Character
        </button>
        <button id="random-crypto" class="discovery-btn">
            🔐 Random Crypto Fact
        </button>
        <button id="random-timeline" class="discovery-btn">
            📅 Random Event
        </button>
    </div>
    
    <div id="discovery-result" class="discovery-result"></div>
</div>

---

<script src="../assets/js/content-search.js"></script>
<link rel="stylesheet" href="../assets/css/content-search.css">

[← Back to Main](../README.md) | [Timeline →](timeline-interactive.md)
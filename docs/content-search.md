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
# Interactive Cryptography Demonstrations

[← Back to Main](../README.md)

---

## 🔐 Caesar Cipher Interactive Demo

The Caesar cipher is one of the simplest and most well-known encryption techniques, used throughout "The Crimson Cipher" novel.

<div id="caesar-cipher-demo" class="crypto-demo">
    <h3>Try it yourself:</h3>
    
    <div class="demo-controls">
        <label for="caesar-input">Enter your message:</label>
        <textarea id="caesar-input" placeholder="Type your secret message here..." rows="3"></textarea>
        
        <label for="caesar-shift">Shift amount (1-25):</label>
        <input type="range" id="caesar-shift" min="1" max="25" value="3">
        <span id="shift-display">3</span>
        
        <button id="caesar-encrypt">Encrypt</button>
        <button id="caesar-decrypt">Decrypt</button>
    </div>
    
    <div class="demo-output">
        <h4>Result:</h4>
        <div id="caesar-output" class="cipher-output"></div>
    </div>
</div>

---

## 🎯 Frequency Analysis Tool

Learn how Detective Sarah Chen breaks substitution ciphers using frequency analysis.

<div id="frequency-analysis-demo" class="crypto-demo">
    <h3>Analyze cipher text:</h3>
    
    <div class="demo-controls">
        <label for="frequency-input">Enter cipher text:</label>
        <textarea id="frequency-input" placeholder="Paste encrypted text here..." rows="4"></textarea>
        
        <button id="analyze-frequency">Analyze Frequency</button>
    </div>
    
    <div class="demo-output">
        <div id="frequency-chart"></div>
        <div id="frequency-suggestions"></div>
    </div>
</div>

---

## 🔄 Cipher Wheel Simulator

Experience the Jefferson Disk cipher wheel featured in Chapter 3.

<div id="cipher-wheel-demo" class="crypto-demo">
    <h3>Virtual Cipher Wheel:</h3>
    
    <div class="cipher-wheel-container">
        <div id="cipher-wheel" class="wheel">
            <div class="wheel-ring outer-ring"></div>
            <div class="wheel-ring inner-ring"></div>
        </div>
        
        <div class="wheel-controls">
            <label for="wheel-rotation">Rotation:</label>
            <input type="range" id="wheel-rotation" min="0" max="25" value="0">
            <span id="rotation-display">0</span>
            
            <input type="text" id="wheel-input" placeholder="Enter text to encode">
            <button id="wheel-encode">Encode</button>
        </div>
        
        <div id="wheel-output" class="cipher-output"></div>
    </div>
</div>

---

## 📚 Educational Context

These cryptographic techniques appear throughout "The Crimson Cipher" story:

### Chapter Connections
- **Chapter 1**: Introduction to basic substitution ciphers
- **Chapter 2**: Historical cipher techniques and the 1847 connection
- **Chapter 3**: Jefferson Disk and frequency analysis in practice
- **Chapter 4**: Advanced steganography and hidden messages
- **Chapter 5**: Polyalphabetic ciphers and Vigenère technique
- **Chapter 6**: Modern cryptographic applications
- **Chapter 7**: Digital age encryption methods
- **Chapter 8**: Cryptanalysis and pattern recognition

### Historical Accuracy
All cipher methods demonstrated here are based on real historical techniques:
- **Caesar Cipher**: Used by Julius Caesar (1st century BC) - Simple shift substitution
- **Frequency Analysis**: Developed by Al-Kindi (9th century) - Statistical cryptanalysis
- **Jefferson Disk**: Invented by Thomas Jefferson (1795) - Cylindrical cipher device
- **Vigenère Cipher**: Described by Johannes Trithemius (1518) - Polyalphabetic substitution
- **Telegraph Codes**: 19th century commercial encryption (1840s-1900s)

### Modern Relevance
These historical techniques form the foundation of modern cryptography:
- **Pattern Recognition**: Essential for AI and machine learning
- **Statistical Analysis**: Core component of data science
- **Information Security**: Basis for modern encryption standards
- **Digital Privacy**: Understanding encryption helps protect personal data

---

## 🎮 Interactive Challenges

Test your cryptography skills with these puzzles from the novel:

<div id="crypto-challenges" class="crypto-demo">
    <h3>Solve the Detective's Puzzles:</h3>
    
    <div class="challenge" id="challenge-1">
        <h4>Challenge 1: The First Message</h4>
        <p><em>From Chapter 1 - Decrypt Sarah's first cipher (Caesar cipher with shift 3):</em></p>
        <code>WKLV LV D WHVW PHVVDJH</code>
        <div class="hint">💡 Hint: Each letter is shifted 3 positions forward in the alphabet</div>
        
        <input type="text" id="challenge1-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(1)">Check Answer</button>
        <div id="challenge1-result" class="challenge-result"></div>
    </div>
    
    <div class="challenge" id="challenge-2">
        <h4>Challenge 2: Frequency Analysis</h4>
        <p><em>From Chapter 3 - Use frequency analysis (Simple substitution):</em></p>
        <code>LZWQ XSZQ ZF FZGKQ EQGFQ</code>
        <div class="hint">💡 Hint: Look for common English letter patterns (E, T, A, O, I, N)</div>
        
        <input type="text" id="challenge2-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(2)">Check Answer</button>
        <div id="challenge2-result" class="challenge-result"></div>
    </div>
    
    <div class="challenge" id="challenge-3">
        <h4>Challenge 3: The 1847 Historical Cipher</h4>
        <p><em>From Chapter 6 - Decode the historical message:</em></p>
        <code>GUVF PVCURE QNGRF ONPX GB RVTUGRA SBEGL FRIRA</code>
        <div class="hint">💡 Hint: This is a ROT13 cipher - each letter is shifted 13 positions</div>
        
        <input type="text" id="challenge3-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(3)">Check Answer</button>
        <div id="challenge3-result" class="challenge-result"></div>
    </div>
    
    <div class="challenge" id="challenge-4">
        <h4>Challenge 4: Advanced Pattern Recognition</h4>
        <p><em>From Chapter 9 - Find the hidden message in this text:</em></p>
        <code>Many Organizations Require Students To Understand Real Encryption</code>
        <div class="hint">💡 Hint: Look at the first letter of each word</div>
        
        <input type="text" id="challenge4-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(4)">Check Answer</button>
        <div id="challenge4-result" class="challenge-result"></div>
    </div>
    
    <div class="challenge-progress">
        <h4>Your Progress:</h4>
        <div id="progress-bar">
            <div id="progress-fill" style="width: 0%"></div>
        </div>
        <p id="progress-text">0 of 4 challenges completed</p>
    </div>
</div>

## 🔬 Advanced Cryptanalysis Techniques

For readers interested in deeper cryptographic analysis:

### Pattern Recognition Methods
<div id="pattern-analysis" class="crypto-demo">
    <h3>Advanced Pattern Detection:</h3>
    
    <div class="demo-controls">
        <label for="pattern-input">Enter text to analyze:</label>
        <textarea id="pattern-input" placeholder="Paste any text here for pattern analysis..." rows="4"></textarea>
        
        <button id="analyze-patterns">Analyze Patterns</button>
    </div>
    
    <div class="demo-output">
        <div id="pattern-results">
            <div id="letter-frequency" class="analysis-section">
                <h4>Letter Frequency</h4>
                <div id="frequency-visualization"></div>
            </div>
            
            <div id="bigram-analysis" class="analysis-section">
                <h4>Common Letter Pairs</h4>
                <div id="bigram-results"></div>
            </div>
            
            <div id="word-patterns" class="analysis-section">
                <h4>Word Length Patterns</h4>
                <div id="word-pattern-results"></div>
            </div>
        </div>
    </div>
</div>

### Cipher Identification Guide
<div class="cipher-guide">
    <h3>How to Identify Different Cipher Types:</h3>
    
    <div class="guide-section">
        <h4>🔍 Visual Clues</h4>
        <ul>
            <li><strong>Even letter distribution</strong> → Likely substitution cipher</li>
            <li><strong>Repetitive patterns</strong> → May be Vigenère or keyword cipher</li>
            <li><strong>Numbers mixed with letters</strong> → Could be book cipher or coordinates</li>
            <li><strong>Very short repeated segments</strong> → Possibly Caesar or ROT cipher</li>
        </ul>
    </div>
    
    <div class="guide-section">
        <h4>📊 Statistical Indicators</h4>
        <ul>
            <li><strong>Index of Coincidence ≈ 0.067</strong> → English plaintext</li>
            <li><strong>Index of Coincidence ≈ 0.038</strong> → Random or polyalphabetic</li>
            <li><strong>High 'E' frequency (12-13%)</strong> → Simple substitution preserved</li>
            <li><strong>Flat letter distribution</strong> → Strong encryption or random text</li>
        </ul>
    </div>
</div>

<script src="../assets/js/cryptography-demo.js"></script>
<link rel="stylesheet" href="../assets/css/cryptography-demo.css">

---

[← Back to Main](../README.md) | [Character Profiles →](character-profiles-en.md)
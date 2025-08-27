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
- **Chapter 2**: Historical cipher techniques
- **Chapter 3**: Jefferson Disk and frequency analysis
- **Chapter 4**: Advanced steganography concepts

### Historical Accuracy
All cipher methods demonstrated here are based on real historical techniques:
- **Caesar Cipher**: Used by Julius Caesar (1st century BC)
- **Frequency Analysis**: Developed by Al-Kindi (9th century)
- **Jefferson Disk**: Invented by Thomas Jefferson (1795)

---

## 🎮 Interactive Challenges

Test your cryptography skills with these puzzles from the novel:

<div id="crypto-challenges" class="crypto-demo">
    <h3>Solve the Detective's Puzzles:</h3>
    
    <div class="challenge" id="challenge-1">
        <h4>Challenge 1: The First Message</h4>
        <p><em>From Chapter 1 - Decrypt Sarah's first cipher:</em></p>
        <code>WKLV LV D WHVW PHVVDJH</code>
        
        <input type="text" id="challenge1-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(1)">Check Answer</button>
        <div id="challenge1-result" class="challenge-result"></div>
    </div>
    
    <div class="challenge" id="challenge-2">
        <h4>Challenge 2: Frequency Analysis</h4>
        <p><em>From Chapter 3 - Use frequency analysis:</em></p>
        <code>LZWQ XSZQ ZF FZGKQ EQGFQ</code>
        
        <input type="text" id="challenge2-answer" placeholder="Enter your solution">
        <button onclick="checkChallenge(2)">Check Answer</button>
        <div id="challenge2-result" class="challenge-result"></div>
    </div>
</div>

<script src="../assets/js/cryptography-demo.js"></script>
<link rel="stylesheet" href="../assets/css/cryptography-demo.css">

---

[← Back to Main](../README.md) | [Character Profiles →](character-profiles-en.md)
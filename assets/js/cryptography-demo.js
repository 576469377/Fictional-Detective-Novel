// Interactive Cryptography Demonstrations
// For The Crimson Cipher educational content

document.addEventListener('DOMContentLoaded', function() {
    initializeCryptographyDemos();
});

function initializeCryptographyDemos() {
    // Initialize Caesar Cipher Demo
    initializeCaesarCipher();
    
    // Initialize Frequency Analysis
    initializeFrequencyAnalysis();
    
    // Initialize Cipher Wheel
    initializeCipherWheel();
    
    // Show educational tips
    showCryptographyTips();
}

// Caesar Cipher Implementation
function initializeCaesarCipher() {
    const shiftSlider = document.getElementById('caesar-shift');
    const shiftDisplay = document.getElementById('shift-display');
    const encryptBtn = document.getElementById('caesar-encrypt');
    const decryptBtn = document.getElementById('caesar-decrypt');
    
    if (!shiftSlider) return; // Not on cryptography page
    
    shiftSlider.addEventListener('input', function() {
        shiftDisplay.textContent = this.value;
    });
    
    encryptBtn.addEventListener('click', function() {
        performCaesarCipher(true);
    });
    
    decryptBtn.addEventListener('click', function() {
        performCaesarCipher(false);
    });
}

function performCaesarCipher(encrypt) {
    const input = document.getElementById('caesar-input').value.toUpperCase();
    const shift = parseInt(document.getElementById('caesar-shift').value);
    const output = document.getElementById('caesar-output');
    
    if (!input.trim()) {
        output.innerHTML = '<span style="color: #dc3545;">Please enter a message to encrypt/decrypt.</span>';
        return;
    }
    
    const effectiveShift = encrypt ? shift : -shift;
    const result = caesarTransform(input, effectiveShift);
    
    output.innerHTML = `
        <div class="cipher-result">
            <strong>${encrypt ? 'Encrypted' : 'Decrypted'} message:</strong><br>
            <code>${result}</code>
            <div class="cipher-explanation">
                <small>Each letter shifted by ${Math.abs(effectiveShift)} positions ${effectiveShift > 0 ? 'forward' : 'backward'} in the alphabet.</small>
            </div>
        </div>
    `;
}

function caesarTransform(text, shift) {
    return text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
            const charCode = char.charCodeAt(0) - 65;
            const shifted = (charCode + shift + 26) % 26;
            return String.fromCharCode(shifted + 65);
        }
        return char;
    }).join('');
}

// Frequency Analysis Implementation
function initializeFrequencyAnalysis() {
    const analyzeBtn = document.getElementById('analyze-frequency');
    
    if (!analyzeBtn) return;
    
    analyzeBtn.addEventListener('click', performFrequencyAnalysis);
}

function performFrequencyAnalysis() {
    const input = document.getElementById('frequency-input').value.toUpperCase();
    const chartContainer = document.getElementById('frequency-chart');
    const suggestionsContainer = document.getElementById('frequency-suggestions');
    
    if (!input.trim()) {
        chartContainer.innerHTML = '<span style="color: #dc3545;">Please enter cipher text to analyze.</span>';
        return;
    }
    
    const frequencies = calculateFrequencies(input);
    displayFrequencyChart(frequencies, chartContainer);
    displayDecryptionSuggestions(frequencies, suggestionsContainer);
}

function calculateFrequencies(text) {
    const letterCount = {};
    const totalLetters = text.replace(/[^A-Z]/g, '').length;
    
    // Initialize all letters to 0
    for (let i = 65; i <= 90; i++) {
        letterCount[String.fromCharCode(i)] = 0;
    }
    
    // Count occurrences
    for (const char of text) {
        if (char >= 'A' && char <= 'Z') {
            letterCount[char]++;
        }
    }
    
    // Convert to percentages
    const frequencies = {};
    for (const letter in letterCount) {
        frequencies[letter] = totalLetters > 0 ? (letterCount[letter] / totalLetters * 100) : 0;
    }
    
    return frequencies;
}

function displayFrequencyChart(frequencies, container) {
    // Expected English letter frequencies
    const englishFreq = {
        'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0, 'N': 6.7,
        'S': 6.3, 'H': 6.1, 'R': 6.0, 'D': 4.3, 'L': 4.0, 'C': 2.8,
        'U': 2.8, 'M': 2.4, 'W': 2.4, 'F': 2.2, 'G': 2.0, 'Y': 2.0,
        'P': 1.9, 'B': 1.3, 'V': 1.0, 'K': 0.8, 'J': 0.15, 'X': 0.15,
        'Q': 0.10, 'Z': 0.07
    };
    
    const sortedLetters = Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a]);
    
    let chartHTML = '<div class="frequency-chart"><h4>Letter Frequency Analysis</h4>';
    chartHTML += '<div class="chart-legend"><span class="cipher-bar">Cipher Text</span> <span class="english-bar">Expected English</span></div>';
    
    for (const letter of sortedLetters.slice(0, 10)) { // Show top 10
        const cipherFreq = frequencies[letter];
        const expectedFreq = englishFreq[letter] || 0;
        const maxFreq = Math.max(cipherFreq, expectedFreq);
        
        if (cipherFreq > 0) {
            chartHTML += `
                <div class="frequency-row">
                    <span class="letter">${letter}</span>
                    <div class="frequency-bars">
                        <div class="bar cipher-freq" style="width: ${(cipherFreq / 15) * 100}%">${cipherFreq.toFixed(1)}%</div>
                        <div class="bar english-freq" style="width: ${(expectedFreq / 15) * 100}%">${expectedFreq.toFixed(1)}%</div>
                    </div>
                </div>
            `;
        }
    }
    chartHTML += '</div>';
    
    container.innerHTML = chartHTML;
}

function displayDecryptionSuggestions(frequencies, container) {
    const sortedByCipher = Object.keys(frequencies).sort((a, b) => frequencies[b] - frequencies[a]);
    const topCipherLetters = sortedByCipher.slice(0, 3).filter(letter => frequencies[letter] > 0);
    
    let suggestions = '<div class="decryption-suggestions"><h4>Decryption Hints</h4>';
    
    if (topCipherLetters.length > 0) {
        suggestions += '<p>Most frequent letters in your cipher:</p><ul>';
        
        topCipherLetters.forEach((letter, index) => {
            const commonEnglish = ['E', 'T', 'A'][index];
            suggestions += `
                <li><strong>${letter}</strong> (${frequencies[letter].toFixed(1)}%) might represent <strong>${commonEnglish}</strong></li>
            `;
        });
        
        suggestions += '</ul>';
        suggestions += '<p><em>Try substituting these letters to see if recognizable words emerge!</em></p>';
    } else {
        suggestions += '<p>No letters found to analyze. Please enter cipher text containing letters A-Z.</p>';
    }
    
    suggestions += '</div>';
    container.innerHTML = suggestions;
}

// Cipher Wheel Implementation
function initializeCipherWheel() {
    const rotationSlider = document.getElementById('wheel-rotation');
    const rotationDisplay = document.getElementById('rotation-display');
    const encodeBtn = document.getElementById('wheel-encode');
    
    if (!rotationSlider) return;
    
    // Create visual cipher wheel
    createCipherWheelVisual();
    
    rotationSlider.addEventListener('input', function() {
        rotationDisplay.textContent = this.value;
        updateCipherWheelVisual(parseInt(this.value));
    });
    
    encodeBtn.addEventListener('click', encodeCipherWheel);
}

function createCipherWheelVisual() {
    const wheel = document.getElementById('cipher-wheel');
    if (!wheel) return;
    
    const outerRing = wheel.querySelector('.outer-ring');
    const innerRing = wheel.querySelector('.inner-ring');
    
    // Create alphabet rings
    for (let i = 0; i < 26; i++) {
        const outerLetter = document.createElement('div');
        outerLetter.className = 'wheel-letter outer';
        outerLetter.textContent = String.fromCharCode(65 + i);
        outerLetter.style.transform = `rotate(${i * 360 / 26}deg) translateY(-80px)`;
        outerRing.appendChild(outerLetter);
        
        const innerLetter = document.createElement('div');
        innerLetter.className = 'wheel-letter inner';
        innerLetter.textContent = String.fromCharCode(65 + i);
        innerLetter.style.transform = `rotate(${i * 360 / 26}deg) translateY(-60px)`;
        innerRing.appendChild(innerLetter);
    }
}

function updateCipherWheelVisual(rotation) {
    const innerRing = document.querySelector('.inner-ring');
    if (innerRing) {
        innerRing.style.transform = `rotate(${rotation * 360 / 26}deg)`;
    }
}

function encodeCipherWheel() {
    const input = document.getElementById('wheel-input').value.toUpperCase();
    const rotation = parseInt(document.getElementById('wheel-rotation').value);
    const output = document.getElementById('wheel-output');
    
    if (!input.trim()) {
        output.innerHTML = '<span style="color: #dc3545;">Please enter text to encode.</span>';
        return;
    }
    
    const encoded = caesarTransform(input, rotation);
    
    output.innerHTML = `
        <div class="cipher-result">
            <strong>Encoded with ${rotation}-position rotation:</strong><br>
            <code>${encoded}</code>
            <div class="cipher-explanation">
                <small>Jefferson Disk simulation - Inner wheel rotated ${rotation} positions.</small>
            </div>
        </div>
    `;
}

// Interactive Challenges
function checkChallenge(challengeNumber) {
    const solutions = {
        1: 'THIS IS A TEST MESSAGE', // Caesar cipher with shift 3
        2: 'MEET HERE IN THREE HOURS' // Frequency analysis example
    };
    
    const answer = document.getElementById(`challenge${challengeNumber}-answer`).value.toUpperCase().trim();
    const result = document.getElementById(`challenge${challengeNumber}-result`);
    
    if (answer === solutions[challengeNumber]) {
        result.innerHTML = '<span style="color: #28a745;">✓ Correct! Excellent cryptographic skills!</span>';
        
        // Add achievement tracking
        const achievements = JSON.parse(localStorage.getItem('crimson-cipher-achievements') || '[]');
        const achievement = `challenge-${challengeNumber}`;
        if (!achievements.includes(achievement)) {
            achievements.push(achievement);
            localStorage.setItem('crimson-cipher-achievements', JSON.stringify(achievements));
            showAchievementNotification(`Challenge ${challengeNumber} Complete!`);
        }
    } else {
        result.innerHTML = '<span style="color: #dc3545;">✗ Not quite right. Try again! Hint: Consider the cipher techniques from the chapters.</span>';
    }
}

function showAchievementNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `🏆 ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Educational Tips
function showCryptographyTips() {
    const tips = [
        "💡 The Caesar cipher is easily broken by trying all 25 possible shifts!",
        "🔍 Frequency analysis works best with longer texts (100+ characters).",
        "📚 Real cryptographers often combine multiple cipher techniques for security.",
        "🎯 Pattern recognition is key - look for repeated letter combinations."
    ];
    
    // Show a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    setTimeout(() => {
        const tipContainer = document.createElement('div');
        tipContainer.className = 'crypto-tip';
        tipContainer.innerHTML = randomTip;
        tipContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(139, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            max-width: 300px;
            font-size: 14px;
            z-index: 1000;
        `;
        
        document.body.appendChild(tipContainer);
        
        setTimeout(() => {
            tipContainer.remove();
        }, 8000);
    }, 2000);
}

// Challenge System
let challengeProgress = JSON.parse(localStorage.getItem('crimsonCipherProgress') || '{}');

function checkChallenge(challengeNumber) {
    const answers = {
        1: "THIS IS A TEST MESSAGE",
        2: "COME BACK AT EIGHT THIRTY", 
        3: "THIS CIPHER DATES BACK TO EIGHTEEN FORTY SEVEN",
        4: "MORSTURE"
    };
    
    const inputId = `challenge${challengeNumber}-answer`;
    const resultId = `challenge${challengeNumber}-result`;
    const userAnswer = document.getElementById(inputId).value.toUpperCase().trim();
    const resultDiv = document.getElementById(resultId);
    
    if (userAnswer === answers[challengeNumber]) {
        resultDiv.innerHTML = '<span style="color: #28a745;">✅ Correct! Excellent cryptographic skills!</span>';
        challengeProgress[challengeNumber] = true;
        updateChallengeProgress();
        showCryptographyNotification(`Challenge ${challengeNumber} completed! 🎉`);
    } else {
        resultDiv.innerHTML = '<span style="color: #dc3545;">❌ Not quite right. Try again!</span>';
    }
    
    localStorage.setItem('crimsonCipherProgress', JSON.stringify(challengeProgress));
}

function updateChallengeProgress() {
    const completed = Object.keys(challengeProgress).filter(key => challengeProgress[key]).length;
    const total = 4;
    const percentage = (completed / total) * 100;
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completed} of ${total} challenges completed`;
    }
    
    // Show special message when all challenges are complete
    if (completed === total && !challengeProgress.allComplete) {
        showCryptographyNotification('🏆 Congratulations! You\'ve mastered all the cryptographic challenges!');
        challengeProgress.allComplete = true;
        localStorage.setItem('crimsonCipherProgress', JSON.stringify(challengeProgress));
    }
}

// Advanced Pattern Analysis
function initializePatternAnalysis() {
    const analyzeBtn = document.getElementById('analyze-patterns');
    if (!analyzeBtn) return;
    
    analyzeBtn.addEventListener('click', performPatternAnalysis);
}

function performPatternAnalysis() {
    const input = document.getElementById('pattern-input').value.toUpperCase();
    const resultsContainer = document.getElementById('pattern-results');
    
    if (!input.trim()) {
        resultsContainer.innerHTML = '<p style="color: #dc3545;">Please enter text to analyze.</p>';
        return;
    }
    
    // Analyze letter frequency
    const letterFreq = analyzeLetterFrequency(input);
    displayLetterFrequencyChart(letterFreq, document.getElementById('frequency-visualization'));
    
    // Analyze bigrams
    const bigrams = analyzeBigrams(input);
    displayBigramAnalysis(bigrams, document.getElementById('bigram-results'));
    
    // Analyze word patterns
    const wordPatterns = analyzeWordPatterns(input);
    displayWordPatterns(wordPatterns, document.getElementById('word-pattern-results'));
}

function analyzeLetterFrequency(text) {
    const frequencies = {};
    const letters = text.replace(/[^A-Z]/g, '');
    
    // Initialize all letters
    for (let i = 0; i < 26; i++) {
        frequencies[String.fromCharCode(65 + i)] = 0;
    }
    
    // Count frequencies
    for (let char of letters) {
        if (frequencies[char] !== undefined) {
            frequencies[char]++;
        }
    }
    
    // Convert to percentages
    const total = letters.length;
    for (let letter in frequencies) {
        frequencies[letter] = (frequencies[letter] / total) * 100;
    }
    
    return frequencies;
}

function analyzeBigrams(text) {
    const bigrams = {};
    const cleanText = text.replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < cleanText.length - 1; i++) {
        const bigram = cleanText.substr(i, 2);
        bigrams[bigram] = (bigrams[bigram] || 0) + 1;
    }
    
    // Return top 10 bigrams
    return Object.entries(bigrams)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
}

function analyzeWordPatterns(text) {
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const patterns = {};
    
    words.forEach(word => {
        const length = word.length;
        patterns[length] = (patterns[length] || 0) + 1;
    });
    
    const totalWords = words.length;
    const avgLength = words.reduce((sum, word) => sum + word.length, 0) / totalWords;
    
    return { patterns, totalWords, avgLength };
}

function displayLetterFrequencyChart(frequencies, container) {
    const englishFreq = {
        'A': 8.12, 'B': 1.49, 'C': 2.78, 'D': 4.25, 'E': 12.02, 'F': 2.23,
        'G': 2.02, 'H': 6.09, 'I': 6.97, 'J': 0.15, 'K': 0.77, 'L': 4.03,
        'M': 2.41, 'N': 6.75, 'O': 7.51, 'P': 1.93, 'Q': 0.10, 'R': 5.99,
        'S': 6.33, 'T': 9.06, 'U': 2.76, 'V': 0.98, 'W': 2.36, 'X': 0.15,
        'Y': 1.97, 'Z': 0.07
    };
    
    let chartHTML = '<div class="frequency-chart-container">';
    chartHTML += '<div class="chart-legend"><span class="cipher-legend">Your Text</span><span class="english-legend">English</span></div>';
    
    for (let letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        const cipherFreq = frequencies[letter] || 0;
        const expectedFreq = englishFreq[letter];
        
        chartHTML += `
            <div class="frequency-comparison">
                <span class="letter-label">${letter}</span>
                <div class="frequency-bars">
                    <div class="bar cipher-bar" style="height: ${Math.max(cipherFreq * 8, 2)}px" title="${letter}: ${cipherFreq.toFixed(1)}%"></div>
                    <div class="bar english-bar" style="height: ${Math.max(expectedFreq * 8, 2)}px" title="English ${letter}: ${expectedFreq.toFixed(1)}%"></div>
                </div>
            </div>
        `;
    }
    
    chartHTML += '</div>';
    container.innerHTML = chartHTML;
}

function displayBigramAnalysis(bigrams, container) {
    let html = '<div class="bigram-analysis"><h5>Most Common Letter Pairs:</h5>';
    
    if (bigrams.length === 0) {
        html += '<p>No letter pairs found. Text may be too short for meaningful analysis.</p>';
    } else {
        html += '<div class="bigram-list">';
        bigrams.forEach(([bigram, count], index) => {
            html += `<span class="bigram-item" style="background-color: hsl(${index * 30}, 70%, 85%)">${bigram} (${count})</span>`;
        });
        html += '</div>';
        html += '<p class="analysis-note">Common English bigrams: TH, HE, IN, ER, AN, RE, ED, ND, ON, EN</p>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function displayWordPatterns(data, container) {
    const { patterns, totalWords, avgLength } = data;
    
    let html = '<div class="word-pattern-analysis">';
    html += `<p><strong>Total Words:</strong> ${totalWords}</p>`;
    html += `<p><strong>Average Word Length:</strong> ${avgLength.toFixed(1)} letters</p>`;
    html += '<h5>Word Length Distribution:</h5>';
    html += '<div class="word-length-chart">';
    
    const maxCount = Math.max(...Object.values(patterns));
    
    for (let length = 1; length <= Math.max(...Object.keys(patterns).map(Number)); length++) {
        const count = patterns[length] || 0;
        const percentage = (count / totalWords) * 100;
        const barHeight = (count / maxCount) * 100;
        
        if (count > 0) {
            html += `
                <div class="word-length-bar">
                    <div class="bar" style="height: ${barHeight}%" title="${count} words of length ${length} (${percentage.toFixed(1)}%)"></div>
                    <span class="length-label">${length}</span>
                </div>
            `;
        }
    }
    
    html += '</div>';
    html += '<p class="analysis-note">English text typically has average word length of 4-5 letters</p>';
    html += '</div>';
    
    container.innerHTML = html;
}

// Initialize new features when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCryptographyDemos();
    initializePatternAnalysis();
    updateChallengeProgress(); // Load saved progress
});
// Romantic Birthday Website JavaScript - Fixed Version

// Global variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let isDrawing = false;
let canvas, ctx;
let youtubePlayer;
let musicPlaying = false;

// Quiz data
const quizQuestions = [
    {
        question: "What did your boyfriend accidentally turn your proposal into?",
        options: ["A presentation", "An interview", "A lecture", "A debate"],
        correct: 1,
        explanation: "Even in love, his studious nature shined through! 😄"
    },
    {
        question: "Complete the equation: Study + Love = ?",
        options: ["Stress", "You!", "Confusion", "Sleepless nights"],
        correct: 1,
        explanation: "The most beautiful solution to any equation! 💚"
    },
    {
        question: "What did people think about him before you discovered his romantic side?",
        options: ["Too funny", "Too romantic", "Unromantic and logical", "Too talkative"],
        correct: 2,
        explanation: "Little did they know about the heart behind the brain! ❤️"
    },
    {
        question: "What's the distance formula for your love?",
        options: ["Distance² + Time²", "Love grows with distance", "Distance = 0 in heart", "All of the above"],
        correct: 3,
        explanation: "Love transcends all mathematical limitations! 🌟"
    }
];

// Romantic calculator responses
const loveResponses = [
    "= You (the most beautiful answer) 💚",
    "= Infinite Love ∞",
    "= Our Perfect Future Together ✨",
    "= The Solution to My Heart 💕",
    "= Forever and Always 💖",
    "= The Best Equation Ever! 🌟",
    "= Pure Magic ✨",
    "= Love Beyond Numbers 💚"
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    initializeCountdown();
    initializeQuiz();
    initializeDrawingCanvas();
    initializeLoveChart();
    initializeYouTubePlayer();
    setupEventListeners();
    
    // Show first section
    showSection('landing');
});

// Setup all event listeners
function setupEventListeners() {
    // Navigation button event listeners
    const beginJourneyBtn = document.querySelector('button[onclick="showSection(\'timeline\')"]');
    if (beginJourneyBtn) {
        beginJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('timeline');
        });
    }

    // Setup all navigation buttons
    setupNavigationButtons();
    
    // Music toggle
    const musicBtn = document.getElementById('toggle-music');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
    
    // Calculator enter key
    const calcInput = document.getElementById('calc-input');
    if (calcInput) {
        calcInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateLove();
            }
        });
    }
}

// Setup all navigation buttons
function setupNavigationButtons() {
    // Get all buttons with onclick attributes and add proper event listeners
    const navButtons = document.querySelectorAll('button[onclick]');
    navButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes('showSection')) {
            const sectionMatch = onclickAttr.match(/showSection\('([^']+)'\)/);
            if (sectionMatch) {
                const targetSection = sectionMatch[1];
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    showSection(targetSection);
                });
            }
        }
    });
}

// YouTube Player Integration
function initializeYouTubePlayer() {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// YouTube API ready callback
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'S82bAkqqwX4',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'S82bAkqqwX4'
        },
        events: {
            'onReady': function(event) {
                console.log('YouTube player ready');
            }
        }
    });
}

// Toggle background music
function toggleMusic() {
    const musicBtn = document.getElementById('toggle-music');
    if (youtubePlayer && youtubePlayer.playVideo) {
        if (musicPlaying) {
            youtubePlayer.pauseVideo();
            musicBtn.innerHTML = '🎵 Play Our Song';
            musicPlaying = false;
        } else {
            youtubePlayer.playVideo();
            musicBtn.innerHTML = '🎵 Pause Song';
            musicPlaying = true;
        }
    } else {
        // Fallback if YouTube player isn't ready
        console.log('YouTube player not ready yet');
    }
}

// Section Navigation - Fixed version
function showSection(sectionId) {
    console.log('Navigating to section:', sectionId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        // Initialize section-specific functionality
        if (sectionId === 'quiz') {
            initializeQuiz();
        } else if (sectionId === 'gallery') {
            setTimeout(() => {
                initializeDrawingCanvas();
            }, 100);
        } else if (sectionId === 'math') {
            setTimeout(() => {
                initializeLoveChart();
            }, 100);
        }
    } else {
        console.error('Section not found:', sectionId);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date('2025-09-04T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (distance > 0 && daysEl && hoursEl && minutesEl && secondsEl) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        } else {
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.innerHTML = '<h2>🎉 Happy Birthday! 🎉</h2>';
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Quiz Functionality - Fixed version
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    const questionContainer = document.getElementById('question-container');
    const quizResult = document.getElementById('quiz-result');
    
    if (questionContainer) {
        questionContainer.classList.remove('hidden');
        questionContainer.style.display = 'block';
    }
    if (quizResult) {
        quizResult.classList.add('hidden');
        quizResult.style.display = 'none';
    }
    
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        const questionTextEl = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const submitBtn = document.getElementById('submit-answer');
        
        if (questionTextEl) {
            questionTextEl.textContent = question.question;
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.textContent = option;
                optionDiv.addEventListener('click', () => selectAnswer(index));
                optionsContainer.appendChild(optionDiv);
            });
        }
        
        selectedAnswer = null;
        if (submitBtn) {
            submitBtn.style.display = 'block';
            submitBtn.onclick = submitAnswer;
        }
    }
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    
    // Remove previous selections
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Highlight selected option
    const options = document.querySelectorAll('.quiz-option');
    if (options[answerIndex]) {
        options[answerIndex].classList.add('selected');
    }
}

function submitAnswer() {
    if (selectedAnswer === null) {
        alert('Please select an answer!');
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Show explanation
    alert(question.explanation);
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const questionContainer = document.getElementById('question-container');
    const quizResult = document.getElementById('quiz-result');
    
    if (questionContainer) {
        questionContainer.classList.add('hidden');
        questionContainer.style.display = 'none';
    }
    if (quizResult) {
        quizResult.classList.remove('hidden');
        quizResult.style.display = 'block';
    }
    
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = `Perfect score! ${score}/${quizQuestions.length} 🎉`;
    } else if (percentage >= 75) {
        message = `Excellent! ${score}/${quizQuestions.length} ⭐`;
    } else if (percentage >= 50) {
        message = `Good job! ${score}/${quizQuestions.length} 👍`;
    } else {
        message = `You'll learn more about me! ${score}/${quizQuestions.length} 😊`;
    }
    
    const finalScoreEl = document.getElementById('final-score');
    if (finalScoreEl) {
        finalScoreEl.textContent = message;
    }
}

// Drawing Canvas - Fixed version
function initializeDrawingCanvas() {
    canvas = document.getElementById('drawing-canvas');
    if (!canvas) {
        console.log('Canvas not found');
        return;
    }
    
    ctx = canvas.getContext('2d');
    
    // Set initial drawing style
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2d5a3d';
    
    // Clear any existing event listeners
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Color picker
    const colorPicker = document.getElementById('color-picker');
    if (colorPicker) {
        colorPicker.addEventListener('change', function() {
            ctx.strokeStyle = this.value;
        });
    }
    
    // Brush size
    const brushSize = document.getElementById('brush-size');
    if (brushSize) {
        brushSize.addEventListener('input', function() {
            ctx.lineWidth = this.value;
        });
    }
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function clearCanvas() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Shayari functionality
function saveShayari() {
    const shayariInput = document.getElementById('shayari-input');
    const savedContainer = document.getElementById('saved-shayari');
    
    if (!shayariInput || !savedContainer) return;
    
    const shayariText = shayariInput.value.trim();
    if (shayariText) {
        const shayariDiv = document.createElement('div');
        shayariDiv.style.cssText = `
            background: rgba(255, 215, 0, 0.1);
            border-left: 4px solid #ffd700;
            padding: 15px;
            margin: 15px 0;
            border-radius: 8px;
            font-style: italic;
            line-height: 1.6;
        `;
        shayariDiv.textContent = shayariText;
        savedContainer.appendChild(shayariDiv);
        
        shayariInput.value = '';
        alert('Your beautiful shayari has been saved! 💚');
    }
}

// Love Calculator
function calculateLove() {
    const input = document.getElementById('calc-input');
    const result = document.getElementById('calc-result');
    
    if (!input || !result) return;
    
    if (input.value.trim()) {
        const randomResponse = loveResponses[Math.floor(Math.random() * loveResponses.length)];
        result.innerHTML = `<strong>${input.value} ${randomResponse}</strong>`;
        
        // Add some sparkle effect
        setTimeout(() => {
            result.style.animation = 'glow 1s ease-in-out';
        }, 100);
    }
}

// Love Chart - Fixed version
function initializeLoveChart() {
    const chartCanvas = document.getElementById('love-chart');
    if (!chartCanvas) {
        console.log('Chart canvas not found');
        return;
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // Generate exponential love growth data
    const months = ['Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025'];
    const loveData = [10, 25, 45, 70, 85, 92, 96, 98, 99, 100]; // Exponential growth
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Love Level (%)',
                data: loveData,
                borderColor: '#ffd700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffd700',
                pointBorderColor: '#2d5a3d',
                pointBorderWidth: 3,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Gift opening animation
function openGift(giftElement) {
    const description = giftElement.querySelector('.gift-description');
    if (description && description.classList.contains('hidden')) {
        // Opening gift animation
        giftElement.style.transform = 'scale(1.1)';
        giftElement.style.background = 'rgba(255, 215, 0, 0.2)';
        
        setTimeout(() => {
            description.classList.remove('hidden');
            description.style.display = 'block';
            giftElement.style.transform = 'scale(1)';
            
            // Add sparkle effect
            createSparkles(giftElement);
        }, 300);
        
        // Celebration message
        setTimeout(() => {
            alert('🎁 Gift opened! Hope you love it! 💚');
        }, 600);
    }
}

// Create sparkle effect
function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 1s ease-out forwards;
            top: 50%;
            left: 50%;
        `;
        
        // Random positions around the gift
        const angle = (i / 5) * 360;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        
        sparkle.style.setProperty('--end-x', x + 'px');
        sparkle.style.setProperty('--end-y', y + 'px');
        
        element.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(var(--end-x), var(--end-y)) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--end-x), var(--end-y)) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add some interactive heart clicking
document.addEventListener('click', function(e) {
    // Create floating heart on click
    const heart = document.createElement('div');
    heart.innerHTML = '💚';
    heart.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        animation: floatUp 2s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
});

// Float up animation for clicked hearts
const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Add some romantic messages that appear randomly
const romanticMessages = [
    "Distance means nothing when someone means everything 💚",
    "You've turned my logical mind into a romantic heart ❤️",
    "Every equation leads back to you 📐💕",
    "From village to heart - you're my everything 🌟",
    "Your art colors my world in the most beautiful ways 🎨"
];

// Show random romantic message occasionally
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every 30 seconds
        const message = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        showFloatingMessage(message);
    }
}, 30000);

function showFloatingMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(45, 90, 61, 0.9);
        color: #ffd700;
        padding: 15px 25px;
        border-radius: 25px;
        border: 2px solid #ffd700;
        font-size: 1.1rem;
        z-index: 1000;
        max-width: 80%;
        text-align: center;
        animation: fadeInOut 4s ease-in-out forwards;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

// Fade in and out animation for messages
const fadeInOutStyle = document.createElement('style');
fadeInOutStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(fadeInOutStyle);

// Global functions for HTML onclick attributes (fallback)
window.showSection = showSection;
window.submitAnswer = submitAnswer;
window.clearCanvas = clearCanvas;
window.saveShayari = saveShayari;
window.calculateLove = calculateLove;
window.openGift = openGift;
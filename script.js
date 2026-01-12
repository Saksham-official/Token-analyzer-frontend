// Configuration
const API_URL = 'https://token-cost-analyzer.onrender.com/analyze';

// DOM Elements
const promptInput = document.getElementById('prompt-input');
const charCounter = document.getElementById('char-counter');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const results = document.getElementById('results');

// Result Elements
const inputTokens = document.getElementById('input-tokens');
const outputTokens = document.getElementById('output-tokens');
const totalTokens = document.getElementById('total-tokens');
const inputCost = document.getElementById('input-cost');
const outputCost = document.getElementById('output-cost');
const totalCost = document.getElementById('total-cost');
const insightsList = document.getElementById('insights-list');
const responseText = document.getElementById('response-text');

// Character Counter
promptInput.addEventListener('input', () => {
    const length = promptInput.value.length;
    charCounter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
});

// Analyze Button Click
analyzeBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (!prompt) {
        showError('Please enter a prompt to analyze.');
        return;
    }

    try {
        // Show loading state
        showLoading();

        // Make API request
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to analyze prompt');
        }

        const data = await response.json();

        // Display results
        displayResults(data);

    } catch (err) {
        console.error('Error:', err);
        showError(err.message || 'An error occurred while analyzing your prompt.');
    }
});

// Enter key to analyze
promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        analyzeBtn.click();
    }
});

function showLoading() {
    analyzeBtn.disabled = true;
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    results.classList.add('hidden');
}

function showError(message) {
    analyzeBtn.disabled = false;
    loading.classList.add('hidden');
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    results.classList.add('hidden');
}

function displayResults(data) {
    analyzeBtn.disabled = false;
    loading.classList.add('hidden');
    error.classList.add('hidden');

    // Populate token metrics
    inputTokens.textContent = formatNumber(data.input_tokens || 0);
    outputTokens.textContent = formatNumber(data.output_tokens || 0);
    totalTokens.textContent = formatNumber(data.total_tokens || 0);

    // Populate costs
    inputCost.textContent = `$${(data.input_cost || 0).toFixed(6)}`;
    outputCost.textContent = `$${(data.output_cost || 0).toFixed(6)}`;
    totalCost.textContent = `$${(data.total_cost || 0).toFixed(6)}`;

    // Populate insights
    insightsList.innerHTML = '';
    if (data.analysis && Array.isArray(data.analysis)) {
        data.analysis.forEach((insight, index) => {
            const li = document.createElement('li');
            li.textContent = insight;
            li.style.animationDelay = `${index * 0.1}s`;
            insightsList.appendChild(li);
        });
    }

    // Populate response (parse markdown to HTML)
    const markdownText = data.response_text || 'No response generated.';
    responseText.innerHTML = marked.parse(markdownText);

    // Show results with animation
    results.classList.remove('hidden');
    results.style.animation = 'slideIn 0.5s ease';
}

function formatNumber(num) {
    return num.toLocaleString();
}

// Add subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card, .metric-card');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const speed = (index % 3 + 1) * 0.5;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;

        card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

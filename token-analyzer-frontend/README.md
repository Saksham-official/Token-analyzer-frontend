# Token Analyzer Frontend

A premium dark-themed frontend for the Token Cost Analyzer API.

## Features
- 🎨 Clean, dark theme with glassmorphism effects
- ⚡ Real-time token and cost analysis
- 💡 Efficiency insights display
- 📱 Fully responsive design
- ✨ Smooth animations and transitions

## Deployment

### Vercel
1. Push this folder to a GitHub repository
2. Connect to Vercel
3. Deploy (no build commands needed - it's pure HTML/CSS/JS)

### Netlify
1. Drag and drop this folder to Netlify
2. Or connect via Git and deploy

### Local Testing
Simply open `index.html` in your browser or use a local server:

```bash
# Python
python -m http.server 3000

# Node.js
npx serve
```

## API Configuration
The API URL is configured in `script.js`:
```javascript
const API_URL = 'https://token-cost-analyzer.onrender.com/analyze';
```

## Usage
1. Enter your prompt in the textarea
2. Click "Analyze" or press Ctrl+Enter
3. View token metrics, costs, insights, and generated response

## Tech Stack
- Pure HTML5
- CSS3 with custom properties
- Vanilla JavaScript
- Inter font from Google Fonts

# VARA AI Assistant - Detailed Setup Guide

This guide will walk you through setting up your own VARA AI Assistant powered by Google's Gemini API.

## 📋 Prerequisites

- GitHub account
- Google account (for Gemini API access)
- Basic understanding of web development (optional)

## 🚀 Step-by-Step Setup

### Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create New API Key**
   ```
   1. Click "Create API key"
   2. Select "Create API key in new project" or choose existing project
   3. Copy the generated API key
   4. Store it securely (you'll need it later)
   ```

3. **API Key Security**
   - ⚠️ Never share your API key publicly
   - ⚠️ Don't commit it to public repositories
   - ✅ Store it securely in your browser's localStorage

### Step 2: Set Up GitHub Repository

1. **Create New Repository**
   ```bash
   # Option 1: Fork this repository (recommended)
   1. Go to the original repository
   2. Click "Fork" in the top right
   3. Choose your GitHub account
   
   # Option 2: Create from scratch
   1. Go to github.com
   2. Click "New repository"
   3. Name it "vara-ai-assistant"
   4. Make it public (required for GitHub Pages)
   ```

2. **Upload Files**
   ```bash
   # If creating from scratch, upload these files:
   - vara_ai_assistant.html (rename to index.html)
   - deloitte_vara_faq.html
   - audit_visual_clean.html
   - README.md
   ```

3. **Repository Structure**
   ```
   your-username/vara-ai-assistant/
   ├── index.html              # Main AI assistant (renamed from vara_ai_assistant.html)
   ├── deloitte_vara_faq.html  # FAQ guide
   ├── audit_visual_clean.html # Presentation deck
   ├── README.md              # Documentation
   └── assets/                # Images (if any)
   ```

### Step 3: Enable GitHub Pages

1. **Go to Repository Settings**
   ```
   1. Navigate to your repository on GitHub
   2. Click "Settings" tab (top menu)
   3. Scroll down to "Pages" section (left sidebar)
   ```

2. **Configure GitHub Pages**
   ```
   Source: "Deploy from a branch"
   Branch: "main" (or "master")
   Folder: "/ (root)"
   
   Click "Save"
   ```

3. **Wait for Deployment**
   ```
   - GitHub will show a green checkmark when ready
   - Usually takes 5-10 minutes for first deployment
   - Your site will be available at:
     https://your-username.github.io/vara-ai-assistant/
   ```

### Step 4: Test Your Deployment

1. **Visit Your Site**
   ```
   URL: https://your-username.github.io/vara-ai-assistant/
   ```

2. **Enter API Key**
   ```
   - The site will prompt for your Gemini API key
   - Paste the key you generated in Step 1
   - Click OK or press Enter
   ```

3. **Test Functionality**
   ```
   - Try asking: "What is VARA?"
   - Use quick action buttons
   - Verify responses are generated
   ```

## 🔧 Advanced Configuration

### Custom Domain (Optional)

1. **Purchase Domain**
   ```
   Examples:
   - vara-assistant.your-company.com
   - digital-assets-ai.deloitte-example.com
   ```

2. **Configure DNS**
   ```
   Create CNAME record:
   Type: CNAME
   Name: vara-assistant (or subdomain of choice)
   Value: your-username.github.io
   ```

3. **Update GitHub Pages**
   ```
   1. Go to repository Settings > Pages
   2. Enter custom domain: vara-assistant.your-domain.com
   3. Enable "Enforce HTTPS"
   ```

### Environment Variables (Advanced)

For production use, consider server-side API key management:

```javascript
// Instead of client-side API key
const response = await fetch('/api/gemini-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userQuestion })
});
```

### Analytics Integration

Add Google Analytics to track usage:

```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Customization Options

### Branding Updates

1. **Color Scheme**
   ```css
   :root {
       --deloitte-green: #86c232;  /* Change to your brand color */
       --deloitte-dark: #0f172a;   /* Your dark color */
   }
   ```

2. **Logo/Icon**
   ```html
   <!-- Replace AI icon -->
   <div class="ai-icon">🤖</div>
   <!-- With your logo -->
   <img src="assets/your-logo.png" class="ai-icon" alt="Logo">
   ```

3. **Company Name**
   ```html
   <!-- Update header -->
   <h1>Your Company VARA Assistant</h1>
   ```

### Content Customization

1. **Welcome Message**
   ```javascript
   // In vara_ai_assistant.html, update welcome message
   <div class="message assistant">
       <strong>👋 Welcome to Your Custom VARA Assistant!</strong><br><br>
       Custom welcome message here...
   </div>
   ```

2. **Quick Questions**
   ```javascript
   // Add new quick actions
   <div class="quick-action" onclick="askQuestion('Your custom question?')">
       <h4>📊 Custom Topic</h4>
       <p>Description of your custom topic</p>
   </div>
   ```

### AI Training Customization

1. **Enhanced Context**
   ```javascript
   // In loadVARAContext() method
   this.varaContext = `
   Your enhanced context here...
   
   Additional training data:
   - Specific procedures for your organization
   - Internal guidelines and interpretations
   - Custom compliance requirements
   `;
   ```

## 🔍 Troubleshooting

### Common Issues

1. **API Key Not Working**
   ```
   Symptoms: "Connection failed" or error messages
   Solutions:
   - Verify API key is correct (no extra spaces)
   - Check if Gemini API is enabled in Google Cloud Console
   - Ensure billing is set up (free tier has limits)
   ```

2. **GitHub Pages Not Loading**
   ```
   Symptoms: 404 error or site not accessible
   Solutions:
   - Verify main file is named "index.html"
   - Check repository is public
   - Wait 10-15 minutes after enabling Pages
   - Check GitHub status page for outages
   ```

3. **CORS Errors**
   ```
   Symptoms: Browser console shows CORS errors
   Solutions:
   - Ensure using HTTPS (not HTTP)
   - Check API endpoint URLs are correct
   - Verify Gemini API allows browser requests
   ```

### Debug Mode

Enable detailed logging:

```javascript
// Add to beginning of VARAAssistant class
constructor() {
    this.debug = true; // Enable debug mode
    // ... rest of constructor
}

// Add debug logging throughout
if (this.debug) {
    console.log('API Response:', response);
}
```

### Performance Optimization

1. **Reduce Bundle Size**
   ```html
   <!-- Minimize CSS -->
   <!-- Remove unused styles -->
   <!-- Optimize images -->
   ```

2. **API Rate Limiting**
   ```javascript
   // Add request throttling
   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
   await delay(1000); // Wait 1 second between requests
   ```

## 📊 Monitoring & Analytics

### GitHub Pages Analytics

View built-in analytics:
```
Repository → Insights → Traffic
- Page views
- Unique visitors
- Referring sites
```

### Custom Event Tracking

```javascript
// Track question categories
function trackQuestion(category) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'question_asked', {
            'category': category,
            'timestamp': new Date().toISOString()
        });
    }
}
```

### Error Monitoring

```javascript
// Add global error handler
window.addEventListener('error', (event) => {
    console.error('Global Error:', event.error);
    // Send to monitoring service
});
```

## 🔒 Security Best Practices

### API Key Management

1. **Development**
   - Use environment variables
   - Never commit keys to version control
   - Rotate keys regularly

2. **Production**
   - Implement server-side proxy
   - Use authentication tokens
   - Monitor API usage

### Content Security Policy

```html
<!-- Add to <head> for enhanced security -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://generativelanguage.googleapis.com;">
```

## 🚀 Going Live Checklist

- [ ] ✅ API key working and secure
- [ ] ✅ GitHub Pages deployment successful
- [ ] ✅ All links working correctly
- [ ] ✅ Mobile responsiveness tested
- [ ] ✅ Browser compatibility verified
- [ ] ✅ Analytics configured (if needed)
- [ ] ✅ Custom domain configured (if applicable)
- [ ] ✅ SSL certificate active (HTTPS)
- [ ] ✅ Error handling working
- [ ] ✅ Performance acceptable
- [ ] ✅ Content reviewed and approved

## 📞 Support Resources

### Technical Support
- **GitHub Issues**: Report bugs and request features
- **Google AI Studio**: API documentation and support
- **GitHub Pages Docs**: Deployment help

### Internal Support (for Deloitte)
- **Digital Assets Team**: Internal Slack channel
- **Knowledge Base**: Internal wiki and documentation

---

**🎉 Congratulations! Your VARA AI Assistant is now live and ready to help with regulatory questions.**
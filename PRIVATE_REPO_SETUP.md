# bKash Payment API Server
# This should be in a PRIVATE repository

## Setup Instructions

### 1. Create Private Repository
```bash
git clone https://github.com/yourusername/aiba-marathon-payment-api.git
cd aiba-marathon-payment-api
npm init -y
npm install express cors dotenv
```

### 2. Environment Configuration
Create `.env` file:
```env
BKASH_BASE_URL=https://tokenized.pay.bka.sh/v1.2.0-beta
BKASH_APP_KEY=your_actual_app_key
BKASH_APP_SECRET=your_actual_app_secret
BKASH_USERNAME=your_actual_username
BKASH_PASSWORD=your_actual_password
PORT=3000
```

### 3. Server Code (server.js)
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// bKash API endpoints
app.post('/api/bkash/token', async (req, res) => {
    // Token generation logic
});

app.post('/api/bkash/create-payment', async (req, res) => {
    // Create payment logic
});

app.post('/api/bkash/execute-payment', async (req, res) => {
    // Execute payment logic
});

app.listen(process.env.PORT, () => {
    console.log(`Payment API server running on port ${process.env.PORT}`);
});
```

### 4. Deploy to Secure Platform
- **Vercel**: Free tier with environment variables
- **Netlify**: Serverless functions
- **Heroku**: Container deployment
- **Railway**: Modern deployment platform

### 5. Update Frontend
Update `pgw.html` to call your private API:
```javascript
const bKashConfig = {
    apiBaseURL: 'https://your-payment-api.vercel.app/api',
    // No sensitive credentials in frontend
};
```

## Deployment Options

### Option A: Vercel (Recommended)
1. Create private repo with payment API
2. Deploy to Vercel
3. Add environment variables in Vercel dashboard
4. Update frontend to use Vercel API URLs

### Option B: Node.js Backend
1. Create Express.js server
2. Handle bKash API calls server-side
3. Deploy to any cloud platform
4. Frontend calls your backend API

### Option C: Serverless Functions
1. Use Vercel/Netlify functions
2. Each bKash operation as separate function
3. Environment variables for credentials
4. CORS enabled for frontend access

## Security Best Practices

### ✅ DO:
- Use environment variables
- Deploy API to private repository
- Enable CORS only for your domain
- Use HTTPS everywhere
- Validate all API requests
- Log API calls for monitoring

### ❌ DON'T:
- Commit credentials to git
- Use credentials in frontend code
- Share API URLs publicly
- Skip input validation
- Ignore error handling

## Frontend Integration

Update your `pgw.html` to use the secure API:

```javascript
// Remove all sensitive credentials from frontend
const bKashConfig = {
    apiBaseURL: 'https://your-secure-api.vercel.app/api',
    callbackURL: window.location.origin + '/pgw.html'
};

// Call your secure API instead of bKash directly
async function getBkashToken() {
    const response = await fetch(`${bKashConfig.apiBaseURL}/bkash/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
}
```

## Repository Structure

```
aiba-marathon/ (PUBLIC)
├── index.html
├── pgw.html (no credentials)
├── styles.css
├── photos/
└── README.md

aiba-marathon-payment-api/ (PRIVATE)
├── .env (gitignored)
├── server.js
├── package.json
├── vercel.json
└── api/
    ├── bkash/
    │   ├── token.js
    │   ├── create-payment.js
    │   └── execute-payment.js
```

This way:
- ✅ Public repo has no sensitive data
- ✅ Private repo handles all payments
- ✅ Credentials are secure
- ✅ Easy to maintain
- ✅ Scalable architecture

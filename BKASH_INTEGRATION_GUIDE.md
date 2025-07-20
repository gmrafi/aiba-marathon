# bKash Payment Gateway Integration Guide

## Overview
এই গাইডটি Justice Half Marathon 2025 এর জন্য official bKash Payment Gateway API integration এর সম্পূর্ণ setup process দেখায়।

## bKash Developer Documentation
- **Official Documentation**: https://developer.bka.sh/docs/product-overview
- **API Reference**: https://developer.bka.sh/reference
- **Merchant Portal**: https://merchant.bkash.com/

## Prerequisites

### 1. bKash Merchant Account
- bKash merchant account থাকতে হবে
- Merchant onboarding process complete করতে হবে
- Production credentials পেতে হবে bKash থেকে

### 2. Required Credentials
আপনার bKash merchant portal থেকে এই credentials গুলো collect করুন:
- **App Key** (X-App-Key)
- **App Secret**
- **Username** (Merchant Username)
- **Password** (Merchant Password)

## Configuration Steps

### Step 1: Secure Configuration Setup

**⚠️ SECURITY WARNING**: bKash credentials are highly sensitive and should NEVER be stored in public repositories.

#### Option A: Environment Variables (Recommended)
```bash
# Create .env file (this will be gitignored)
cp .env.example .env

# Add your actual credentials to .env file
BKASH_APP_KEY=your_actual_app_key
BKASH_APP_SECRET=your_actual_app_secret
BKASH_USERNAME=your_actual_username
BKASH_PASSWORD=your_actual_password
```

#### Option B: Private Repository
Create a separate private repository for payment processing:
- See `PRIVATE_REPO_SETUP.md` for detailed instructions
- Deploy payment API to secure platform (Vercel/Netlify)
- Frontend calls your secure API instead of bKash directly

#### Option C: Configuration File (Development Only)
```bash
# Copy template and add real credentials
cp config.template.js config.js

# Edit config.js with your actual credentials
# Make sure config.js is in .gitignore
```

### Step 2: Update API Configuration
DO NOT put real credentials directly in `pgw.html`. Instead:

```javascript
// PUBLIC REPOSITORY VERSION (pgw.html)
const bKashConfig = {
    // Environment (sandbox for testing, production for live)
    baseURL: 'https://tokenized.pay.bka.sh/v1.2.0-beta', // Production
    // baseURL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta', // Sandbox
    
    // DO NOT PUT REAL CREDENTIALS HERE IN PUBLIC REPO
    appKey: '', // Keep empty - use environment variables or private API
    appSecret: '', // Keep empty
    username: '', // Keep empty
    password: '', // Keep empty
    
    // Alternative: Use your secure API endpoint
    apiBaseURL: 'https://your-payment-api.vercel.app/api',
    
    // Callback URL (automatic)
    callbackURL: window.location.origin + '/pgw.html'
};
```

### Secure Deployment Options

#### Option A: Use Private API
```javascript
// Call your secure API instead of bKash directly
async function getBkashToken() {
    const response = await fetch(`${bKashConfig.apiBaseURL}/bkash/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
}
```

#### Option B: Environment Variables (Server-side)
```javascript
// This code should be in your private backend
const bKashConfig = {
    baseURL: process.env.BKASH_BASE_URL,
    appKey: process.env.BKASH_APP_KEY,
    appSecret: process.env.BKASH_APP_SECRET,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD
};
```

### Step 2: Environment Setup

#### For Testing (Sandbox)
```javascript
baseURL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
```
- Use sandbox credentials
- No real money transactions
- Free testing environment

#### For Production (Live)
```javascript
baseURL: 'https://tokenized.pay.bka.sh/v1.2.0-beta'
```
- Use production credentials
- Real money transactions
- Requires completed merchant onboarding

## API Integration Flow

### 1. Token Management
```
GET TOKEN → CREATE PAYMENT → REDIRECT TO BKASH → EXECUTE PAYMENT
```

### 2. Payment Process
1. **Grant Token**: Get authorization token from bKash
2. **Create Payment**: Create payment request with amount and callback
3. **Customer Redirect**: Redirect customer to bKash payment page
4. **Payment Processing**: Customer completes payment on bKash
5. **Callback Handling**: bKash redirects back with payment status
6. **Execute Payment**: Finalize payment transaction
7. **Confirmation**: Show success/failure to customer

## API Endpoints

### Token Management
- **Grant Token**: `POST /tokenized/checkout/token/grant`
- **Refresh Token**: `POST /tokenized/checkout/token/refresh`

### Payment Operations
- **Create Payment**: `POST /tokenized/checkout/create`
- **Execute Payment**: `POST /tokenized/checkout/execute`
- **Query Payment**: `POST /tokenized/checkout/payment/status`

## Request/Response Examples

### Create Payment Request
```json
{
    "mode": "0011",
    "payerReference": "01XXXXXXXXX",
    "callbackURL": "https://yourdomain.com/pgw.html",
    "amount": "1250",
    "currency": "BDT",
    "intent": "sale",
    "merchantInvoiceNumber": "JHM123456789"
}
```

### Create Payment Response
```json
{
    "paymentID": "TR0011dQPHnuY1720518383420",
    "bkashURL": "https://payment.bkash.com/?paymentId=...",
    "successCallbackURL": "https://yourdomain.com/pgw.html?status=success&paymentID=...",
    "failureCallbackURL": "https://yourdomain.com/pgw.html?status=failure&paymentID=...",
    "amount": "1250",
    "transactionStatus": "Initiated",
    "statusCode": "0000",
    "statusMessage": "Successful"
}
```

## Error Handling

### Common Error Codes
- **2001**: Token expired
- **2002**: Invalid token
- **2003**: Payment failed
- **2004**: Payment cancelled
- **2005**: Insufficient balance

### Fallback Strategy
যদি API integration fail করে, system automatically manual payment verification এ switch হয়ে যাবে।

## Testing

### Sandbox Testing
1. Use sandbox URL এবং sandbox credentials
2. Test করুন সব payment scenarios
3. Verify callback handling
4. Check error conditions

### Production Testing
1. Small amount দিয়ে test করুন
2. Complete payment flow verify করুন
3. Refund process test করুন

## Security Considerations

### 🔒 Critical Security Rules

1. **NEVER commit credentials to public repositories**
2. **Use environment variables for sensitive data**
3. **Create private repository for payment processing**
4. **Deploy secure API to trusted platforms**
5. **Enable CORS only for your domain**

### Data Protection
- Credentials কখনো client-side এ expose করবেন না
- Use HTTPS everywhere (frontend + backend)
- Environment variables for all sensitive data
- Private repository for payment API
- Secure deployment platforms (Vercel, Netlify, Heroku)

### Repository Security
```bash
# Add these to .gitignore
.env
.env.local
.env.production
config.js
credentials.js
bkash-config.js
```

### Secure Architecture
```
Frontend (Public Repo)     →     Backend (Private Repo)     →     bKash API
pgw.html                   →     Payment API Server         →     Official API
No credentials             →     Environment variables      →     Secure calls
```

### Validation
- Amount validation
- User input sanitization
- Payment status verification

## Troubleshooting

### Common Issues

1. **Token Expired**
   - Solution: Automatic token refresh implemented

2. **Invalid Credentials**
   - Check merchant portal for correct credentials
   - Verify environment (sandbox vs production)

3. **Callback Issues**
   - Ensure callback URL is accessible
   - Check URL parameters handling

4. **Payment Execution Failed**
   - Verify payment ID validity
   - Check payment timeout (24 hours)

### Debugging
- Check browser console for API errors
- Monitor network requests
- Verify Google Sheets integration

## Support

### bKash Support
- **Merchant Support**: merchant@bkash.com
- **Technical Support**: https://developer.bka.sh/discuss
- **Documentation**: https://developer.bka.sh/docs

### Implementation Support
- Check console warnings for configuration issues
- Verify all credentials are correctly set
- Test in sandbox before going live

## Features Implemented

### ✅ Completed Features
- Official bKash API integration
- Token management with auto-refresh
- Create and execute payment flow
- Callback URL handling
- Manual payment fallback
- Error handling and retry logic
- Google Sheets integration
- BIB card generation and printing

### 🔄 Automatic Fallbacks
- API failure → Manual payment verification
- Token expiry → Automatic refresh
- Network issues → Retry mechanism
- Configuration missing → Manual flow

## Notes

1. **Production Ready**: This implementation follows bKash official documentation
2. **Secure**: Proper error handling and validation implemented
3. **User Friendly**: Clear messages and fallback options
4. **Maintainable**: Well documented and structured code

## Quick Setup Checklist

- [ ] Get bKash merchant account
- [ ] Obtain API credentials
- [ ] Update `bKashConfig` in `pgw.html`
- [ ] Test in sandbox environment
- [ ] Switch to production URL
- [ ] Test with small amount
- [ ] Go live

---

**Last Updated**: July 2025  
**API Version**: v1.2.0-beta  
**Documentation**: Based on official bKash Developer Portal

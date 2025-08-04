# Justice Half Marathon 2025 - Complete Deployment Guide

## System Status
✅ Google Apps Script code ready and FIXED
✅ Frontend HTML with mobile number validation
✅ All debugging tools implemented
🔄 **NEXT: Deploy and configure URL**

## Step 1: Deploy Google Apps Script

### 1.1 Open Google Apps Script
1. Go to https://script.google.com/
2. Click "New Project"
3. Delete the default code
4. Copy and paste the ENTIRE content of `FIXED_GOOGLE_APPS_SCRIPT.js`

### 1.2 Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone" 
5. Click "Deploy"
6. **COPY THE WEB APP URL** (looks like: https://script.google.com/macros/s/[LONG_ID]/exec)

## Step 2: Update Frontend Configuration

### 2.1 Replace URL in confirmation.html
1. Find this line in `confirmation.html`:
```javascript
const API_URL = 'YOUR_NEW_DEPLOYMENT_URL';
```

2. Replace `YOUR_NEW_DEPLOYMENT_URL` with your actual deployment URL:
```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
```

## Step 3: Test the System

### 3.1 Test Data Available in Sheet
- Mobile: `01611741684` - Should find registration
- Mobile: `01732684197` - Should find registration  
- Transaction: Search by transaction ID should also work

### 3.2 Testing Steps
1. Open `confirmation.html` in browser
2. Enter mobile number: `01611741684`
3. Click "Search" - should show registration details
4. Test with invalid number - should show "not found"

## System Features

### ✅ What's Working
- Mobile number validation (01xxxxxxxxx format)
- Transaction ID search
- Bengali/English bilingual interface
- Comprehensive error handling
- Mobile-responsive design
- Real-time search feedback

### 🔧 What's Fixed
- ❌ ContentService.setHeaders() error - REMOVED (not supported)
- ❌ CORS issues - FIXED with proper response creation
- ❌ Mobile number detection - IMPROVED with regex
- ❌ Excessive logging - LIMITED to prevent timeouts

## Troubleshooting

### If "Registration Not Found" appears for valid numbers:
1. Check browser console (F12) for errors
2. Verify URL is correctly replaced in confirmation.html
3. Test Google Apps Script directly in script.google.com

### If CORS errors appear:
- The FIXED script no longer uses setHeaders()
- Redeploy the Google Apps Script with new version

### If no response at all:
- Check Google Apps Script execution log
- Verify web app permissions are set to "Anyone"

## Security Notes
- This system has read-only access to registration data
- No sensitive information is exposed beyond what's necessary
- Bangladesh mobile number format validation prevents invalid searches

## Success Confirmation
When working correctly, you should see:
1. Valid mobile numbers return registration details
2. Invalid numbers show Bengali/English "not found" message
3. Console logs show search process (can be viewed with F12)
4. Responsive design works on mobile devices

---
**Ready for deployment! Just follow the 3 steps above.**

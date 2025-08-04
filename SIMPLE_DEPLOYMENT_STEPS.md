# 🚀 SIMPLE DEPLOYMENT STEPS

## Step 1: Deploy Google Apps Script

1. **Open your browser** and go to: https://script.google.com/
2. **Click "New Project"**
3. **Delete everything** in the editor
4. **Copy and paste** the entire content from `FIXED_GOOGLE_APPS_SCRIPT.js`
5. **Click "Save"** (give it a name like "Marathon Confirmation")
6. **Click "Deploy"** → **"New deployment"**
7. **Choose type**: Web app
8. **Execute as**: Me
9. **Who has access**: Anyone
10. **Click "Deploy"**
11. **COPY THE URL** you get (it looks like: `https://script.google.com/macros/s/[LONG_ID]/exec`)

## Step 2: Update Your HTML File

1. **Open** `confirmation.html` in your editor
2. **Find this line** (around line 171):
   ```javascript
   API_URL: 'https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_URL/exec',
   ```
3. **Replace** `YOUR_NEW_DEPLOYMENT_URL` with the actual ID from your deployment URL
4. **Save** the file

## Step 3: Test

1. **Open** `confirmation.html` in your browser
2. **Try searching** with: `01611741684`
3. **It should work!**

---

## If It Still Doesn't Work:

### Check 1: Browser Console
1. Press `F12` in your browser
2. Go to "Console" tab
3. Try searching again
4. Look for error messages

### Check 2: Google Apps Script Logs
1. Go back to script.google.com
2. Click "Executions" on the left
3. Look for any error messages

### Check 3: Test the Script Directly
1. In Google Apps Script, click "Run" → "testConnection"
2. Check if it shows your sheet data

---

## Common Issues:

**Issue**: "Registration Not Found" for valid numbers
**Solution**: Check if the Google Apps Script URL is correctly updated in HTML

**Issue**: "CORS Error" 
**Solution**: Make sure the Google Apps Script is deployed as "Web app" with "Anyone" access

**Issue**: No response at all
**Solution**: Check if Google Apps Script permissions are granted

---

## Need Help?
If you're still having issues, send me:
1. The exact error message from browser console (F12)
2. The Google Apps Script execution log
3. Screenshot of the deployment settings

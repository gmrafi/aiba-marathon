# Google Apps Script Deployment Guide
# Justice Half Marathon 2025 - Confirmation System Setup

## Quick Setup Steps

### 1. Create Google Apps Script Project
1. Go to https://script.google.com/
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script-confirmation-updated.js`

### 2. Configure the Script
Update the CONFIG object in the script:

```javascript
const CONFIG = {
  // Replace with your actual Google Sheets ID
  MAIN_SHEET_ID: 'YOUR_MAIN_REGISTRATION_SHEET_ID_HERE',
  
  // Sheet names within the main spreadsheet
  CONFIRMATION_SHEET_NAME: 'Form Responses 1', // Your main registration data sheet
  
  // Admin email for notifications
  ADMIN_EMAIL: 'marathon@aiba.edu.bd',
};
```

### 3. Get Your Google Sheets ID
1. Open your registration Google Sheet
2. Copy the ID from the URL: 
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Replace `YOUR_MAIN_REGISTRATION_SHEET_ID_HERE` with this ID

### 4. Deploy as Web App
1. In Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone"
5. Click "Deploy"
6. Copy the Web App URL (it looks like: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

### 5. Update Frontend Configuration
1. Open `confirmation.html`
2. Find this line: `GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',`
3. Replace `YOUR_SCRIPT_ID` with your actual deployment URL

### 6. Test the System
1. Open `confirmation.html` in browser
2. Try searching with a mobile number or transaction ID
3. If you see "Configuration Required" message, the URL is not updated correctly

## Expected Sheet Structure

Your Google Sheet should have these columns (in order):
- A: Timestamp
- B: Full Name  
- C: Email
- D: Phone number (primary search field)
- E: Alternative Phone number (backup search field)
- F: Date of Birth
- G: Address
- H: Gender
- I: T-Shirt Size
- J: Accommodation needs
- K: Category
- L: Payment number used
- M: Send Money from (payment method)
- N: Transaction ID (primary search field)
- O-Q: Other columns
- R: Student ID
- S: Payment Verified (Yes/No)
- T: Serial Number
- U: Correction Status
- V: Comments

## Testing Commands

After deployment, you can test in Apps Script:

```javascript
// Test search by mobile
function testSearchByMobile() {
  const testData = {
    action: 'searchRegistration',
    searchType: 'mobile',
    searchValue: '01712345678'
  };
  
  const result = handleSearchRegistration(testData);
  console.log('Test Result:', result.getContent());
}

// Test search by transaction
function testSearchByTransaction() {
  const testData = {
    action: 'searchRegistration',
    searchType: 'transaction',
    searchValue: 'TXN123456789'
  };
  
  const result = handleSearchRegistration(testData);
  console.log('Test Result:', result.getContent());
}
```

## Troubleshooting

### "Registration Not Found" Issues:
1. Check if your sheet has data
2. Verify column positions match the CONFIG
3. Ensure search values match exactly (no extra spaces)
4. Run `debugSheetData()` function in Apps Script to see actual data

### "System Error" Issues:
1. Check Apps Script permissions
2. Verify Google Sheets ID is correct
3. Make sure sheet is accessible to the script
4. Check execution logs in Apps Script

### "Configuration Required" Issues:
1. Verify the deployment URL is correct in `confirmation.html`
2. Make sure script is deployed as "Web app" not "Executable API"
3. Check access permissions are set to "Anyone"

## Security Notes
- The script uses POST requests for searches
- Personal data is only returned for exact matches
- Admin email receives notifications for all requests
- All requests are logged in Apps Script

## Support
If you need help:
1. Check the Apps Script execution logs
2. Run the test functions to verify data access
3. Use `debugSheetData()` to see sheet structure
4. Contact: marathon@aiba.edu.bd

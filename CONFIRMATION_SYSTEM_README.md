# Justice Half Marathon 2025 - Registration Confirmation System

A comprehensive confirmation system for the Justice Half Marathon 2025 website that allows registered runners to verify their registration details and submit correction requests.

## 🎯 Overview

The confirmation system consists of:

1. **Main Confirmation Page** (`confirmation.html`) - Search and display registration details
2. **Correction Request Form** (`correction.html`) - For name/T-shirt size corrections
3. **Missing Data Report Form** (`missing-data.html`) - For adding missing registrations
4. **General Query Form** (`general-query.html`) - For other support requests
5. **Google Apps Script Backend** (`google-apps-script-confirmation.js`) - Server-side logic

## 🚀 Features

### Confirmation Page
- Search by mobile number or transaction ID
- Display masked email for privacy
- Show payment status, correction status, and comments
- Responsive design with fade-in animations
- Error handling for not found registrations

### Correction Forms
- **Data Correction**: Name and T-shirt size updates
- **Missing Data**: Report and verify missing registrations
- **General Queries**: Support for various issues with priority levels

### Backend Integration
- Google Sheets integration for data storage
- Email notifications for new submissions
- Automatic status tracking
- Data validation and error handling

## 📋 Setup Instructions

### 1. Google Sheets Setup

Create the following Google Sheets:

#### A. Confirmation Sheet (Second Sheet)
This is the main data source with columns:
- Full Name
- Serial Number  
- Mobile Number
- Email
- T-shirt Size
- Payment Status
- Transaction ID
- Race Category
- Amount Paid
- Payment Date
- Correction Status (default: "No Change Request")
- Comment (default: "No comments")
- Registration Date

#### B. Form Submission Sheets
Create separate sheets for:
- **Correction Requests**: Stores correction form submissions
- **Missing Data Reports**: Stores missing registration reports  
- **General Queries**: Stores support queries

### 2. Google Apps Script Setup

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with `google-apps-script-confirmation.js`
4. Update the `CONFIG` object with your Sheet IDs:

```javascript
const CONFIG = {
  MAIN_SHEET_ID: 'your_main_registration_sheet_id',
  CONFIRMATION_SHEET_ID: 'your_confirmation_sheet_id',
  CORRECTION_SHEET_ID: 'your_correction_requests_sheet_id',
  MISSING_DATA_SHEET_ID: 'your_missing_data_sheet_id',
  QUERY_SHEET_ID: 'your_general_queries_sheet_id',
  ADMIN_EMAIL: 'marathon@aiba.edu.bd'
};
```

5. Deploy as a web app:
   - Click "Deploy" > "New deployment"
   - Type: Web app
   - Execute as: Me
   - Access: Anyone
   - Copy the web app URL

### 3. Frontend Setup

1. Update the `GOOGLE_SHEETS_URL` in each HTML file:

```javascript
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

2. Test the search functionality with sample data
3. Customize branding and colors as needed

### 4. Initialize Data

Run the `initializeSheets()` function in Apps Script to set up headers:

```javascript
function initializeSheets() {
  // This will create headers for all sheets
}
```

Add sample data using `addSampleConfirmationData()` for testing.

## 🎨 Customization

### Branding
- Update logo path: `photos/logo3.png`
- Modify color scheme in Tailwind config
- Change organization details in headers/footers

### Styling
- All pages use Tailwind CSS for consistent styling
- Custom animations and transitions included
- Mobile-responsive design

### Content
- Update contact information
- Modify form fields as needed
- Customize error messages and help text

## 📱 Usage Flow

### For Runners:
1. **Search Registration**: Visit `/confirmation.html` after August 11, 2025
2. **Enter Details**: Mobile number or transaction ID
3. **View Results**: See registration details with status
4. **Submit Corrections**: Use appropriate forms if needed

### For Administrators:
1. **Monitor Sheets**: Check form submissions in Google Sheets
2. **Process Requests**: Review and update correction status
3. **Update Comments**: Add notes for processed requests
4. **Email Responses**: Respond to queries as needed

## 🔒 Security & Privacy

- Email addresses are masked in search results
- No sensitive payment information displayed
- Input validation on all forms
- Secure Google Apps Script backend

## 📊 Data Structure

### Correction Status Values:
- `No Change Request` (default)
- `Corrected` (after processing corrections)
- `Updated` (after adding missing data)

### Priority Levels:
- **High**: 4-6 hours response
- **Medium**: 24 hours response  
- **Low**: 2-3 business days response

## 🛠️ Maintenance

### Regular Tasks:
1. Monitor form submissions daily
2. Process correction requests within SLA
3. Update confirmation sheet with changes
4. Backup data regularly

### Updates:
- Modify deadlines and dates as needed
- Update contact information
- Add new query types or categories

## 🐛 Troubleshooting

### Common Issues:

**Search not working:**
- Check Google Apps Script URL is correct
- Verify sheet permissions
- Test with sample data

**Forms not submitting:**
- Check network connectivity
- Verify Apps Script deployment
- Review browser console for errors

**Data not displaying:**
- Confirm sheet structure matches expected columns
- Check for typos in mobile numbers/transaction IDs
- Verify data format consistency

## 📞 Support

For technical issues or questions:
- Email: marathon@aiba.edu.bd
- WhatsApp: +880-1700-123456
- Phone: +880-821-123456

## 📄 License

© 2025 Army Institute of Business Administration - Hiking & Trekking Club. All rights reserved.

Design and developed by **MD Golam Mubasshir Rafi**.

---

## 🎯 Timeline

- **August 10, 2025**: Registration closes
- **August 11, 2025**: Confirmation system goes live
- **August 15, 2025**: Correction deadline
- **September 26, 2025**: Event date

Make sure to communicate this timeline to all participants via email and website announcements.

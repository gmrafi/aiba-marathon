/**
 * Justice Half Marathon 2025 - Registration Confirmation System
 * Google Apps Script for confirmation.html
 * 
 * Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace Code.gs content with this code
 * 4. Save the project
 * 5. Click Deploy > New Deployment
 * 6. Choose "Web app" type
 * 7. Set Execute as: Me
 * 8. Set Access: Anyone
 * 9. Deploy and copy the Web App URL
 * 10. Update confirmation.html with the new URL
 */

// Configuration - Update with your Google Sheets ID
const CONFIG = {
  MAIN_SHEET_ID: '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg',
  SHEET_NAME: 'Form Responses 1' // Change if your sheet name is different
};

// Column mapping based on your actual sheet structure
const COLUMNS = {
  TIMESTAMP: 0,        // A: Timestamp
  FULL_NAME: 1,        // B: Full Name
  EMAIL: 2,            // C: Email
  PHONE: 3,            // D: Phone number
  ALT_PHONE: 4,        // E: Alternative Phone number
  DOB: 5,              // F: Date of Birth
  ADDRESS: 6,          // G: Address
  GENDER: 7,           // H: Gender
  TSHIRT_SIZE: 8,      // I: T-Shirt Size
  ACCOMMODATION: 9,    // J: Do you need accommodation facilities?
  CATEGORY: 10,        // K: Category
  PAYMENT_NUMBER: 11,  // L: Your BKash / Nagad number
  SEND_FROM: 12,       // M: Send Money from
  TRANSACTION_ID: 13,  // N: bKash / Nagad Transaction ID
  COLUMN_13: 14,       // O: Column 13
  S: 15,               // P: S
  COLUMN_15: 16,       // Q: Column 15
  STUDENT_ID: 17,      // R: Student ID
  PAYMENT_VERIFIED: 18, // S: Payment Verified
  SERIAL_NUMBER: 19,   // T: Serial Number
  CORRECTION_STATUS: 20, // U: Correction Status
  COMMENTS: 21         // V: Comments
};

/**
 * Main function to handle all HTTP POST requests
 */
function doPost(e) {
  try {
    // Set CORS headers
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    };

    // Parse request data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('Error parsing request data:', parseError);
      return createResponse({
        success: false,
        message: 'Invalid request format'
      });
    }

    console.log('Received request:', data);

    // Handle different actions
    switch (data.action) {
      case 'test':
        return handleTestConnection();
      
      case 'searchRegistration':
        return handleSearchRegistration(data.searchType, data.searchValue);
      
      case 'submitCorrection':
        return handleCorrectionSubmission(data);
      
      default:
        return createResponse({
          success: false,
          message: 'Unknown action: ' + data.action
        });
    }

  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({
      success: false,
      message: 'Server error: ' + error.toString()
    });
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Test connection function
 */
function handleTestConnection() {
  try {
    // Try to access the sheet
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    return createResponse({
      success: true,
      message: 'Connection successful',
      data: {
        sheetId: CONFIG.MAIN_SHEET_ID,
        sheetName: CONFIG.SHEET_NAME,
        totalRows: lastRow,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Test connection failed:', error);
    return createResponse({
      success: false,
      message: 'Connection failed: ' + error.toString()
    });
  }
}

/**
 * Search for registration by mobile number or transaction ID
 */
function handleSearchRegistration(searchType, searchValue) {
  try {
    console.log('Searching for:', searchType, searchValue);
    
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return createResponse({
        success: false,
        message: 'No registration data found in the sheet'
      });
    }
    
    // Get all data from the sheet
    const range = sheet.getRange(2, 1, lastRow - 1, Object.keys(COLUMNS).length);
    const values = range.getValues();
    
    console.log('Total rows to search:', values.length);
    
    // Search logic
    let foundRow = null;
    
    for (let i = 0; i < values.length; i++) {
      const row = values[i];
      
      if (searchType === 'mobile') {
        // Search in phone number (column D) and alternative phone (column E)
        const phone = row[COLUMNS.PHONE] ? row[COLUMNS.PHONE].toString().trim() : '';
        const altPhone = row[COLUMNS.ALT_PHONE] ? row[COLUMNS.ALT_PHONE].toString().trim() : '';
        
        if (phone === searchValue || altPhone === searchValue) {
          foundRow = row;
          break;
        }
      } else if (searchType === 'transaction') {
        // Search in transaction ID (column N)
        const transactionId = row[COLUMNS.TRANSACTION_ID] ? row[COLUMNS.TRANSACTION_ID].toString().trim() : '';
        
        if (transactionId === searchValue) {
          foundRow = row;
          break;
        }
      }
    }
    
    if (foundRow) {
      // Format and return the found data
      const registrationData = {
        name: foundRow[COLUMNS.FULL_NAME] || '',
        email: foundRow[COLUMNS.EMAIL] || '',
        mobile: foundRow[COLUMNS.PHONE] || '',
        altMobile: foundRow[COLUMNS.ALT_PHONE] || '',
        tshirtSize: foundRow[COLUMNS.TSHIRT_SIZE] || '',
        category: foundRow[COLUMNS.CATEGORY] || '',
        paymentStatus: foundRow[COLUMNS.PAYMENT_VERIFIED] || 'Pending',
        serialNumber: foundRow[COLUMNS.SERIAL_NUMBER] || '',
        correctionStatus: foundRow[COLUMNS.CORRECTION_STATUS] || 'No Change Request',
        comment: foundRow[COLUMNS.COMMENTS] || 'No comments',
        transactionId: foundRow[COLUMNS.TRANSACTION_ID] || '',
        timestamp: foundRow[COLUMNS.TIMESTAMP] || ''
      };
      
      console.log('Found registration:', registrationData);
      
      return createResponse({
        success: true,
        message: 'Registration found',
        data: registrationData
      });
      
    } else {
      console.log('No registration found for:', searchType, searchValue);
      return createResponse({
        success: false,
        message: 'প্রদত্ত তথ্যের জন্য কোনো নিবন্ধন পাওয়া যায়নি | No registration found for the provided information'
      });
    }
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse({
      success: false,
      message: 'Search failed: ' + error.toString()
    });
  }
}

/**
 * Handle correction submission (for future use)
 */
function handleCorrectionSubmission(data) {
  try {
    // This function can be used to handle correction requests
    // For now, just return success
    return createResponse({
      success: true,
      message: 'Correction request received'
    });
  } catch (error) {
    console.error('Correction submission error:', error);
    return createResponse({
      success: false,
      message: 'Failed to submit correction: ' + error.toString()
    });
  }
}

/**
 * Create standardized response
 */
function createResponse(responseData) {
  return ContentService
    .createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Test function to check sheet access
 */
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    const headers = sheet.getRange(1, 1, 1, Object.keys(COLUMNS).length).getValues()[0];
    
    console.log('Sheet access test successful');
    console.log('Total rows:', lastRow);
    console.log('Headers:', headers);
    
    // Get first few rows of data for testing
    if (lastRow > 1) {
      const sampleData = sheet.getRange(2, 1, Math.min(3, lastRow - 1), Object.keys(COLUMNS).length).getValues();
      console.log('Sample data:', sampleData);
    }
    
    return {
      success: true,
      totalRows: lastRow,
      headers: headers
    };
  } catch (error) {
    console.error('Sheet access test failed:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Search by mobile number (for testing)
 */
function testSearchByMobile(mobileNumber) {
  return handleSearchRegistration('mobile', mobileNumber);
}

/**
 * Search by transaction ID (for testing)
 */
function testSearchByTransaction(transactionId) {
  return handleSearchRegistration('transaction', transactionId);
}

/**
 * Get all registrations (for debugging - limit to first 10)
 */
function getAllRegistrations() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { success: false, message: 'No data found' };
    }
    
    // Get first 10 rows
    const range = sheet.getRange(2, 1, Math.min(10, lastRow - 1), Object.keys(COLUMNS).length);
    const values = range.getValues();
    
    const registrations = values.map(row => ({
      name: row[COLUMNS.FULL_NAME] || '',
      mobile: row[COLUMNS.PHONE] || '',
      email: row[COLUMNS.EMAIL] || '',
      transactionId: row[COLUMNS.TRANSACTION_ID] || '',
      paymentStatus: row[COLUMNS.PAYMENT_VERIFIED] || '',
      serialNumber: row[COLUMNS.SERIAL_NUMBER] || ''
    }));
    
    return {
      success: true,
      total: lastRow - 1,
      showing: registrations.length,
      registrations: registrations
    };
  } catch (error) {
    console.error('Get all registrations error:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

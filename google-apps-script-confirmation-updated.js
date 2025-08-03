/**
 * Justice Half Marathon 2025 - Registration Confirmation System
 * Google Apps Script Backend for Registration Verification
 * 
 * This script handles:
 * 1. Registration search by mobile/transaction ID
 * 2. Form submissions for corrections, missing data, and queries
 * 3. Email notifications
 * 4. Data validation and processing
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Replace with your actual Google Sheets IDs
  MAIN_SHEET_ID: '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg',
  
  // Sheet names within the main spreadsheet
  CONFIRMATION_SHEET_NAME: 'Form Responses 1', // Your main registration data sheet
  CORRECTION_SHEET_NAME: 'Correction Requests',
  MISSING_DATA_SHEET_NAME: 'Missing Data Reports', 
  QUERY_SHEET_NAME: 'General Queries',
  
  // Admin email for notifications
  ADMIN_EMAIL: 'marathon@aiba.edu.bd',
  
  // Column mapping for your current sheet structure
  COLUMNS: {
    TIMESTAMP: 'A',           // Timestamp
    FULL_NAME: 'B',          // Full Name
    EMAIL: 'C',              // Email
    PHONE: 'D',              // Phone number
    ALT_PHONE: 'E',          // Alternative Phone number
    DOB: 'F',                // Date of Birth
    ADDRESS: 'G',            // Address
    GENDER: 'H',             // Gender
    TSHIRT_SIZE: 'I',        // T-Shirt Size
    ACCOMMODATION: 'J',      // Do you need accommodation facilities?
    CATEGORY: 'K',           // Category
    PAYMENT_NUMBER: 'L',     // Your BKash / Nagad number (used to send payment)
    SEND_FROM: 'M',          // Send Money from
    TRANSACTION_ID: 'N',     // bKash / Nagad Transaction ID
    COLUMN_13: 'O',          // Column 13
    S: 'P',                  // S
    COLUMN_15: 'Q',          // Column 15
    STUDENT_ID: 'R',         // Student ID
    PAYMENT_VERIFIED: 'S',   // Payment Verified
    SERIAL_NUMBER: 'T',      // Serial Number
    CORRECTION_STATUS: 'U',  // Correction Status
    COMMENTS: 'V'            // Comments
  }
};

// ==================== MAIN ENTRY POINT ====================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    switch (data.action) {
      case 'test':
        return handleTestConnection();
      case 'searchRegistration':
        return handleSearchRegistration(data);
      case 'submitCorrection':
        return handleCorrectionSubmission(data);
      case 'submitMissingData':
        return handleMissingDataSubmission(data);
      case 'submitGeneralQuery':
        return handleGeneralQuerySubmission(data);
      default:
        return createResponse(false, 'Invalid action: ' + data.action);
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse(false, 'Server error: ' + error.message);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Justice Half Marathon 2025 - Confirmation System API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ==================== TEST CONNECTION ====================
function handleTestConnection() {
  try {
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    const lastRow = sheet.getLastRow();
    const headers = sheet.getRange(1, 1, 1, 22).getValues()[0];
    
    return createResponse(true, 'Connection successful', {
      sheetId: CONFIG.MAIN_SHEET_ID,
      sheetName: CONFIG.CONFIRMATION_SHEET_NAME,
      totalRows: lastRow,
      headers: headers,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test connection failed:', error);
    return createResponse(false, 'Connection failed: ' + error.toString());
  }
}

// ==================== SEARCH FUNCTIONALITY ====================
function handleSearchRegistration(data) {
  try {
    const { searchType, searchValue } = data;
    
    console.log('Received search request:', searchType, searchValue);
    
    if (!searchValue) {
      return createResponse(false, 'Search value is required');
    }
    
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    console.log('Total rows in sheet:', values.length);
    console.log('Headers:', values[0]);
    
    // Skip header row (index 0)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let match = false;
      
      console.log(`Checking row ${i + 1}:`, row[1], row[3], row[4], row[13]); // Name, Phone, Alt Phone, Transaction
      
      if (searchType === 'mobile') {
        // Search in Phone number (column D) and Alternative Phone number (column E)
        const phone = String(row[3] || '').trim(); // Column D (index 3)
        const altPhone = String(row[4] || '').trim(); // Column E (index 4)
        
        console.log(`Comparing mobile: "${phone}" or "${altPhone}" with "${searchValue}"`);
        match = phone === searchValue || altPhone === searchValue;
      } else if (searchType === 'transaction') {
        // Search in Transaction ID (column N)
        const transactionId = String(row[13] || '').trim(); // Column N (index 13)
        
        console.log(`Comparing transaction: "${transactionId}" with "${searchValue}"`);
        match = transactionId === searchValue;
      }
      
      if (match) {
        console.log('Match found in row:', i + 1);
        
        const registrationData = {
          name: row[1] || '', // Full Name (column B, index 1)
          serialNumber: row[19] || '', // Serial Number (column T, index 19)
          mobile: row[3] || '', // Phone number (column D, index 3)
          email: row[2] || '', // Email (column C, index 2)
          tshirtSize: row[8] || '', // T-Shirt Size (column I, index 8)
          paymentStatus: (row[18] === 'Yes' || row[18] === 'TRUE' || row[18] === true) ? 'Confirmed' : 'Pending', // Payment Verified (column S, index 18)
          correctionStatus: row[20] || 'No Change Request', // Correction Status (column U, index 20)
          comment: row[21] || 'No comments', // Comments (column V, index 21)
          category: row[10] || '', // Category (column K, index 10)
          transactionId: row[13] || '', // Transaction ID (column N, index 13)
          paymentMethod: row[12] || '' // Send Money from (column M, index 12)
        };
        
        console.log('Returning registration data:', registrationData);
        return createResponse(true, 'Registration found', registrationData);
      }
    }
    
    console.log('No match found for search value:', searchValue);
    return createResponse(false, 'প্রদত্ত তথ্যের জন্য কোনো নিবন্ধন পাওয়া যায়নি | No registration found for the provided information');
    
  } catch (error) {
    console.error('Error in handleSearchRegistration:', error);
    return createResponse(false, 'Error searching registration: ' + error.message);
  }
}

// ==================== FORM SUBMISSION HANDLERS ====================
function handleCorrectionSubmission(data) {
  try {
    const {
      searchBy, searchValue, currentName, requestedName,
      currentTshirt, requestedTshirt, reason, additionalComments
    } = data;
    
    // Validate required fields
    if (!searchBy || !searchValue || !currentName) {
      return createResponse(false, 'Required fields are missing');
    }
    
    const sheet = getSheet(CONFIG.CORRECTION_SHEET_NAME);
    const timestamp = new Date();
    
    // Add data to correction sheet
    sheet.appendRow([
      timestamp,
      searchBy,
      searchValue,
      currentName,
      requestedName || '',
      currentTshirt || '',
      requestedTshirt || '',
      reason || '',
      additionalComments || '',
      'Pending Review'
    ]);
    
    // Send notification email
    sendNotificationEmail(
      'New Correction Request',
      `
      A new correction request has been submitted:
      
      Search By: ${searchBy}
      Search Value: ${searchValue}
      Current Name: ${currentName}
      Requested Name: ${requestedName || 'No change'}
      Current T-shirt: ${currentTshirt || 'No change'}
      Requested T-shirt: ${requestedTshirt || 'No change'}
      Reason: ${reason || 'No reason provided'}
      
      Please review and process this request.
      `
    );
    
    return createResponse(true, 'Correction request submitted successfully');
    
  } catch (error) {
    console.error('Error in handleCorrectionSubmission:', error);
    return createResponse(false, 'Error submitting correction: ' + error.message);
  }
}

function handleMissingDataSubmission(data) {
  try {
    const {
      fullName, mobileNumber, email, transactionId, paymentMethod,
      amount, paymentDate, tshirtSize, category, additionalInfo
    } = data;
    
    // Validate required fields
    if (!fullName || !mobileNumber || !transactionId) {
      return createResponse(false, 'Required fields are missing');
    }
    
    const sheet = getSheet(CONFIG.MISSING_DATA_SHEET_NAME);
    const timestamp = new Date();
    
    // Add data to missing data sheet
    sheet.appendRow([
      timestamp,
      fullName,
      mobileNumber,
      email || '',
      transactionId,
      paymentMethod || '',
      amount || '',
      paymentDate || '',
      tshirtSize || '',
      category || '',
      additionalInfo || '',
      'Under Verification'
    ]);
    
    // Send notification email
    sendNotificationEmail(
      'New Missing Registration Report',
      `
      A new missing registration has been reported:
      
      Full Name: ${fullName}
      Mobile Number: ${mobileNumber}
      Email: ${email || 'Not provided'}
      Transaction ID: ${transactionId}
      Payment Method: ${paymentMethod || 'Not specified'}
      Amount: ${amount || 'Not specified'}
      
      Please verify and add to the main registration list.
      `
    );
    
    return createResponse(true, 'Missing data report submitted successfully');
    
  } catch (error) {
    console.error('Error in handleMissingDataSubmission:', error);
    return createResponse(false, 'Error submitting missing data: ' + error.message);
  }
}

function handleGeneralQuerySubmission(data) {
  try {
    const {
      name, contactMethod, contactValue, queryType,
      priority, subject, message
    } = data;
    
    // Validate required fields
    if (!name || !contactValue || !subject || !message) {
      return createResponse(false, 'Required fields are missing');
    }
    
    const sheet = getSheet(CONFIG.QUERY_SHEET_NAME);
    const timestamp = new Date();
    
    // Add data to general queries sheet
    sheet.appendRow([
      timestamp,
      name,
      contactMethod || 'Email',
      contactValue,
      queryType || 'General',
      priority || 'Medium',
      subject,
      message,
      'New'
    ]);
    
    // Send notification email
    sendNotificationEmail(
      `New ${priority || 'Medium'} Priority Query: ${subject}`,
      `
      A new query has been submitted:
      
      Name: ${name}
      Contact: ${contactValue} (${contactMethod || 'Email'})
      Query Type: ${queryType || 'General'}
      Priority: ${priority || 'Medium'}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Please respond according to the priority level.
      `
    );
    
    return createResponse(true, 'Query submitted successfully');
    
  } catch (error) {
    console.error('Error in handleGeneralQuerySubmission:', error);
    return createResponse(false, 'Error submitting query: ' + error.message);
  }
}

// ==================== UTILITY FUNCTIONS ====================
function getSheet(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      initializeSheet(sheet, sheetName);
    }
    
    return sheet;
  } catch (error) {
    console.error('Error getting sheet:', error);
    throw new Error('Cannot access sheet: ' + sheetName);
  }
}

function initializeSheet(sheet, sheetName) {
  let headers = [];
  
  switch (sheetName) {
    case CONFIG.CORRECTION_SHEET_NAME:
      headers = [
        'Timestamp', 'Search By', 'Search Value', 'Current Name', 
        'Requested Name', 'Current T-shirt', 'Requested T-shirt', 
        'Reason', 'Additional Comments', 'Status'
      ];
      break;
      
    case CONFIG.MISSING_DATA_SHEET_NAME:
      headers = [
        'Timestamp', 'Full Name', 'Mobile Number', 'Email', 
        'Transaction ID', 'Payment Method', 'Amount', 'Payment Date',
        'T-shirt Size', 'Category', 'Additional Info', 'Status'
      ];
      break;
      
    case CONFIG.QUERY_SHEET_NAME:
      headers = [
        'Timestamp', 'Name', 'Contact Method', 'Contact Value',
        'Query Type', 'Priority', 'Subject', 'Message', 'Status'
      ];
      break;
  }
  
  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function sendNotificationEmail(subject, body) {
  try {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: `[Marathon Confirmation] ${subject}`,
      body: body
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// ==================== INITIALIZATION FUNCTIONS ====================
function initializeAllSheets() {
  try {
    // Initialize correction requests sheet
    const correctionSheet = getSheet(CONFIG.CORRECTION_SHEET_NAME);
    console.log('Correction sheet initialized');
    
    // Initialize missing data reports sheet
    const missingDataSheet = getSheet(CONFIG.MISSING_DATA_SHEET_NAME);
    console.log('Missing data sheet initialized');
    
    // Initialize general queries sheet
    const querySheet = getSheet(CONFIG.QUERY_SHEET_NAME);
    console.log('General queries sheet initialized');
    
    console.log('All sheets initialized successfully');
    
  } catch (error) {
    console.error('Error initializing sheets:', error);
  }
}

function addSampleData() {
  try {
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    
    // Check if sample data already exists
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length > 1) {
      console.log('Data already exists in the sheet');
      return;
    }
    
    // Add headers if they don't exist
    const headers = [
      'Timestamp', 'Full Name', 'Email', 'Phone number', 'Alternative Phone number',
      'Date of Birth', 'Address', 'Gender', 'T-Shirt Size', 
      'Do you need accommodation facilities?', 'Category', 
      'Your BKash / Nagad number (used to send payment)', 'Send Money from',
      'bKash / Nagad Transaction ID', 'Column 13', 'S', 'Column 15',
      'Student ID', 'Payment Verified', 'Serial Number', 'Correction Status', 'Comments'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    
    // Add sample data
    const sampleData = [
      [
        new Date(), 'John Doe', 'john.doe@gmail.com', '01712345678', '01812345678',
        '1990-01-01', 'Dhaka, Bangladesh', 'Male', 'L', 'No', '21.1 KM',
        '01712345678', 'bKash', 'TXN123456789', '', '', '', 'STU001',
        'Yes', 'HM1001', 'No Change Request', 'No comments'
      ],
      [
        new Date(), 'Jane Smith', 'jane.smith@gmail.com', '01812345679', '01912345679',
        '1992-05-15', 'Chittagong, Bangladesh', 'Female', 'M', 'Yes', '10 KM',
        '01812345679', 'Nagad', 'NGD987654321', '', '', '', 'STU002',
        'Yes', 'HM1002', 'Corrected', 'T-shirt size updated to M'
      ]
    ];
    
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    
    console.log('Sample data added successfully');
    
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

// ==================== TESTING FUNCTIONS ====================
function testSearchByMobile() {
  const testData = {
    action: 'searchRegistration',
    searchType: 'mobile',
    searchValue: '01712345678'
  };
  
  const result = handleSearchRegistration(testData);
  console.log('Test Result:', result.getContent());
}

function testSearchByTransaction() {
  const testData = {
    action: 'searchRegistration',
    searchType: 'transaction',
    searchValue: 'TXN123456789'
  };
  
  const result = handleSearchRegistration(testData);
  console.log('Test Result:', result.getContent());
}

function debugSheetData() {
  try {
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    console.log('=== SHEET DEBUG INFO ===');
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    
    // Show first 3 data rows
    for (let i = 1; i <= Math.min(3, values.length - 1); i++) {
      console.log(`Row ${i + 1}:`, values[i]);
    }
    
    return {
      totalRows: values.length,
      headers: values[0],
      sampleData: values.slice(1, 4)
    };
  } catch (error) {
    console.error('Error in debugSheetData:', error);
    return null;
  }
}

// ==================== ADMIN FUNCTIONS ====================
function updateCorrectionStatus(rowNumber, newStatus, comments) {
  try {
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    
    // Update Correction Status (column U)
    sheet.getRange(rowNumber, 21).setValue(newStatus);
    
    // Update Comments (column V)
    if (comments) {
      sheet.getRange(rowNumber, 22).setValue(comments);
    }
    
    console.log(`Updated row ${rowNumber}: Status = ${newStatus}, Comments = ${comments}`);
    
  } catch (error) {
    console.error('Error updating correction status:', error);
  }
}

function getRegistrationStats() {
  try {
    const sheet = getSheet(CONFIG.CONFIRMATION_SHEET_NAME);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    let totalRegistrations = values.length - 1; // Exclude header
    let verifiedPayments = 0;
    let correctionRequests = 0;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      // Count verified payments (column S)
      if (row[18] === 'Yes' || row[18] === 'TRUE') {
        verifiedPayments++;
      }
      
      // Count correction requests (column U)
      if (row[20] && row[20] !== 'No Change Request') {
        correctionRequests++;
      }
    }
    
    console.log(`
    Registration Statistics:
    - Total Registrations: ${totalRegistrations}
    - Verified Payments: ${verifiedPayments}
    - Correction Requests: ${correctionRequests}
    - Payment Verification Rate: ${((verifiedPayments/totalRegistrations)*100).toFixed(1)}%
    `);
    
    return {
      totalRegistrations,
      verifiedPayments,
      correctionRequests,
      verificationRate: ((verifiedPayments/totalRegistrations)*100).toFixed(1)
    };
    
  } catch (error) {
    console.error('Error getting registration stats:', error);
  }
}

// ==================== SETUP INSTRUCTIONS ====================
/*
SETUP INSTRUCTIONS:

1. Update CONFIG object:
   - Replace 'your_main_registration_sheet_id_here' with your actual Google Sheets ID
   - Update CONFIG.ADMIN_EMAIL with your admin email

2. Deploy as Web App:
   - Click "Deploy" > "New deployment"
   - Type: Web app
   - Execute as: Me
   - Access: Anyone
   - Copy the web app URL

3. Update frontend files:
   - Replace GOOGLE_SHEETS_URL in confirmation.html with your web app URL

4. Initialize sheets:
   - Run initializeAllSheets() function once
   - Run addSampleData() function for testing (optional)

5. Test the system:
   - Run testSearchByMobile() and testSearchByTransaction() functions
   - Verify results in console

Your current sheet structure is supported with these column mappings:
- Phone Search: Columns D (Phone number) and E (Alternative Phone number)  
- Transaction Search: Column N (bKash / Nagad Transaction ID)
- Payment Status: Column S (Payment Verified)
- Correction Status: Column U (Correction Status)
- Comments: Column V (Comments)
*/

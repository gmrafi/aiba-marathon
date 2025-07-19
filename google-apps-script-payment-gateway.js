/**
 * Google Apps Script for Justice Half Marathon 2025 Payment Gateway
 * This script handles registration data and payment verification
 */

// স্প্রেডশীট ID (আপনার Google Sheets এর ID দিয়ে replace করবেন)
const SPREADSHEET_ID = '1eEKzXACdhNw4-gmwqW4nQUReRyDu9gtGxodiCp3c2aw';

// Sheet names
const REGISTRATION_SHEET = 'Registration Data';
const PAYMENT_LOG_SHEET = 'Payment Log';

/**
 * Web App এর main function - HTTP requests handle করে
 */
function doPost(e) {
  try {
    let data = {};
    
    // Check if e exists and has the expected structure
    if (!e) {
      throw new Error('Event parameter is missing');
    }
    
    // Check if data comes from form or JSON
    if (e.postData && e.postData.contents) {
      // Try to parse JSON first
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Parsed JSON data:', data);
      } catch (jsonError) {
        console.log('JSON parsing failed, trying form data');
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      // Form data
      data = e.parameter;
      console.log('Using parameter data:', data);
    } else {
      throw new Error('No data received in request');
    }
    
    console.log('Final processed data:', data);
    
    if (data.action === 'updatePayment') {
      return updatePaymentStatus(data);
    } else {
      return handleRegistration(data);
    }
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Server error occurred: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET requests handle করার জন্য
 */
function doGet(e) {
  const action = e.parameter.action;
  const txn = e.parameter.txn;
  
  if (action === 'verify' && txn) {
    return verifyPayment(txn);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Invalid request'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Registration data Google Sheets এ save করে
 */
function handleRegistration(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(REGISTRATION_SHEET);
    
    // যদি sheet না থাকে তাহলে create করে
    if (!sheet) {
      sheet = spreadsheet.insertSheet(REGISTRATION_SHEET);
      
      // Header row add করে
      const headers = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone number',
        'Alternative Phone number',
        'Date of Birth',
        'Address',
        'Gender',
        'T-Shirt Size',
        'Do you need accommodation facilities?',
        'Category',
        'Amount',
        'Student ID',
        'Payment Status',
        'Transaction ID',
        'Payment Timestamp',
        'BIB Number',
        'Registration ID'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Header formatting
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#005840')
        .setFontColor('white')
        .setFontWeight('bold');
    }
    
    // Registration ID generate করে
    const registrationId = 'JHM2025-' + Date.now().toString(36).toUpperCase();
    
    // BIB Number generate করে category অনুযায়ী
    const bibNumber = generateBibNumber(data.category, sheet);
    
    // Data row prepare করে
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.altPhone || '',
      data.dob || '',
      data.address || '',
      data.gender || '',
      data.tshirtSize || '',
      data.accommodation || 'No',
      data.category || '',
      data.amount || 0,
      data.studentId || '',
      data.paymentStatus || 'Pending',
      data.transactionId || '',
      data.paymentTimestamp || '',
      bibNumber,
      registrationId
    ];
    
    // Sheet এ append করে
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Log the registration
    logActivity('Registration', {
      registrationId: registrationId,
      name: data.fullName,
      email: data.email,
      category: data.category,
      amount: data.amount
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registration submitted successfully',
        registrationId: registrationId,
        bibNumber: bibNumber
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in handleRegistration:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to save registration: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Payment status update করে
 */
function updatePaymentStatus(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(REGISTRATION_SHEET);
    
    if (!sheet) {
      throw new Error('Registration sheet not found');
    }
    
    // Email অথবা phone দিয়ে participant খুঁজে
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    let targetRow = -1;
    
    for (let i = 1; i < values.length; i++) {
      const rowEmail = values[i][2]; // Email column
      const rowPhone = values[i][3]; // Phone column
      
      if (rowEmail === data.email || rowPhone === data.phone) {
        targetRow = i + 1; // Sheet rows are 1-indexed
        break;
      }
    }
    
    if (targetRow === -1) {
      throw new Error('Participant not found');
    }
    
    // Payment information update করে
    const paymentStatusCol = 14; // Payment Status column
    const transactionIdCol = 15; // Transaction ID column
    const paymentTimestampCol = 16; // Payment Timestamp column
    
    sheet.getRange(targetRow, paymentStatusCol).setValue(data.paymentStatus);
    sheet.getRange(targetRow, transactionIdCol).setValue(data.transactionId);
    sheet.getRange(targetRow, paymentTimestampCol).setValue(data.paymentTimestamp);
    
    // Payment verified হলে row highlight করে
    if (data.paymentStatus === 'Verified') {
      sheet.getRange(targetRow, 1, 1, sheet.getLastColumn())
        .setBackground('#E8F5E8'); // Light green background
    }
    
    // Log the payment
    logActivity('Payment Update', {
      email: data.email,
      phone: data.phone,
      transactionId: data.transactionId,
      paymentStatus: data.paymentStatus
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Payment status updated successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in updatePaymentStatus:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to update payment status: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Payment verification করে phone number দিয়ে
 */
function verifyPayment(phone) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(REGISTRATION_SHEET);
    
    if (!sheet) {
      throw new Error('Registration sheet not found');
    }
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Phone number দিয়ে participant খুঁজে
    for (let i = 1; i < values.length; i++) {
      const rowPhone = values[i][3]; // Phone column
      
      if (rowPhone === phone) {
        const participant = {
          name: values[i][1],
          email: values[i][2],
          category: values[i][10],
          amount: values[i][11],
          paymentStatus: values[i][13],
          transactionId: values[i][14] || '',
          bibNumber: values[i][16] || ''
        };
        
        let status = 'not_found';
        if (participant.paymentStatus === 'Verified') {
          status = 'verified';
        } else if (participant.paymentStatus === 'Pending') {
          status = 'pending';
        }
        
        return ContentService
          .createTextOutput(JSON.stringify({
            status: status,
            name: participant.name,
            category: participant.category,
            amount: participant.amount,
            transactionId: participant.transactionId,
            bibNumber: participant.bibNumber
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Participant not found
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'not_found',
        message: 'No registration found with this phone number'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Verification failed: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * BIB number generate করে category অনুযায়ী
 */
function generateBibNumber(category, sheet) {
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  // Category prefix mapping
  const categoryPrefixes = {
    '21KM Half Marathon': 'AIBA-0',
    '10KM Long Run': 'AIBA-1',
    'Student Run': 'AIBA-2',
    'Kids Run': 'AIBA-3'
  };
  
  const prefix = categoryPrefixes[category] || 'AIBA-9';
  
  // Same category তে কতজন আছে count করে
  let categoryCount = 0;
  for (let i = 1; i < values.length; i++) {
    if (values[i][10] === category) { // Category column
      categoryCount++;
    }
  }
  
  // Next BIB number generate করে
  const bibNumber = prefix + String(categoryCount + 1).padStart(2, '0');
  
  return bibNumber;
}

/**
 * Activity log করার জন্য
 */
function logActivity(action, details) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let logSheet = spreadsheet.getSheetByName(PAYMENT_LOG_SHEET);
    
    // Log sheet না থাকলে create করে
    if (!logSheet) {
      logSheet = spreadsheet.insertSheet(PAYMENT_LOG_SHEET);
      
      // Headers
      const headers = ['Timestamp', 'Action', 'Details'];
      logSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      logSheet.getRange(1, 1, 1, headers.length)
        .setBackground('#005840')
        .setFontColor('white')
        .setFontWeight('bold');
    }
    
    // Log entry
    const logData = [
      new Date().toISOString(),
      action,
      JSON.stringify(details)
    ];
    
    logSheet.appendRow(logData);
    logSheet.autoResizeColumns(1, 3);
    
  } catch (error) {
    console.error('Error in logActivity:', error);
  }
}

/**
 * Manual testing function
 */
function testRegistration() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '01712345678',
    altPhone: '01812345678',
    dob: '1990-01-01',
    address: 'Test Address, Sylhet',
    gender: 'Male',
    tshirtSize: 'L',
    accommodation: 'No',
    category: '21KM Half Marathon',
    amount: 1250,
    studentId: '',
    paymentStatus: 'Pending'
  };
  
  // Direct call to handleRegistration instead of doPost
  const result = handleRegistration(testData);
  console.log('Test result:', result.getContent());
  
  // Also test the doPost function with proper parameter structure
  const mockEvent = {
    parameter: testData,
    postData: null
  };
  
  const doPostResult = doPost(mockEvent);
  console.log('doPost test result:', doPostResult.getContent());
}

/**
 * Manual payment update test
 */
function testPaymentUpdate() {
  const testData = {
    action: 'updatePayment',
    email: 'test@example.com',
    phone: '01712345678',
    transactionId: 'TXN123456789',
    paymentStatus: 'Verified',
    paymentTimestamp: new Date().toISOString()
  };
  
  const result = updatePaymentStatus(testData);
  console.log('Payment update result:', result.getContent());
}

/**
 * Get registration statistics
 */
function getRegistrationStats() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(REGISTRATION_SHEET);
    
    if (!sheet) {
      return { error: 'Sheet not found' };
    }
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    let stats = {
      total: 0,
      verified: 0,
      pending: 0,
      categories: {
        '21KM Half Marathon': 0,
        '10KM Long Run': 0,
        'Student Run': 0,
        'Kids Run': 0
      },
      revenue: {
        total: 0,
        collected: 0,
        pending: 0
      }
    };
    
    for (let i = 1; i < values.length; i++) {
      const category = values[i][10];
      const amount = values[i][11];
      const paymentStatus = values[i][13];
      
      stats.total++;
      
      if (category && stats.categories.hasOwnProperty(category)) {
        stats.categories[category]++;
      }
      
      if (amount) {
        stats.revenue.total += amount;
        
        if (paymentStatus === 'Verified') {
          stats.verified++;
          stats.revenue.collected += amount;
        } else {
          stats.pending++;
          stats.revenue.pending += amount;
        }
      }
    }
    
    return stats;
  } catch (error) {
    console.error('Error getting stats:', error);
    return { error: error.message };
  }
}

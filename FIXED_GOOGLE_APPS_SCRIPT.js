/**
 * Justice Half Marathon 2025 - FIXED Registration Search System
 * Copy-paste this entire code into Google Apps Script
 */

// Configuration - UPDATE THIS WITH YOUR SHEET ID
const SHEET_ID = '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg';
const SHEET_NAME = 'Form Responses 1';

// Main POST handler
function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Full request object:', e);
    console.log('Request body:', e ? e.postData : 'No postData');
    console.log('Request parameters:', e ? e.parameter : 'No parameters');
    
    // Handle case where data comes in parameters instead of postData
    let data;
    
    if (e && e.postData && e.postData.contents) {
      // Standard POST with JSON body
      data = JSON.parse(e.postData.contents);
      console.log('Using postData contents');
    } else if (e && e.parameter) {
      // Data came as parameters
      data = e.parameter;
      console.log('Using parameters');
    } else {
      console.error('No valid data found in request');
      return createResponse(false, 'Invalid POST request: No data found');
    }

    console.log('Parsed data:', data);

    if (data.action === 'searchRegistration') {
      return searchRegistration(data.searchType, data.searchValue);
    }

    return createResponse(false, 'Invalid action: ' + (data.action || 'undefined'));
    
  } catch (error) {
    console.error('doPost Error:', error);
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

// Handle GET requests (for testing and alternative method)
function doGet(e) {
  console.log('Received GET request');
  console.log('Parameters:', e ? e.parameter : 'No parameters');
  
  // If parameters are provided, treat as search request
  if (e && e.parameter && e.parameter.action === 'searchRegistration') {
    return searchRegistration(e.parameter.searchType, e.parameter.searchValue);
  }
  
  return createResponse(true, 'Justice Half Marathon 2025 - Registration Search API is running. Send POST requests to search.');
}

// Main search function
function searchRegistration(searchType, searchValue) {
  try {
    console.log('Starting search:', searchType, searchValue);
    
    // Validate inputs
    if (!searchType || !searchValue) {
      return createResponse(false, 'Search type and value are required');
    }
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      console.error('Sheet not found:', SHEET_NAME);
      return createResponse(false, 'Sheet not found: ' + SHEET_NAME);
    }
    
    const values = sheet.getDataRange().getValues();
    console.log('Total rows in sheet:', values.length);
    console.log('Headers:', values[0]);
    
    if (values.length <= 1) {
      console.log('No data found in sheet');
      return createResponse(false, 'No registration data found in sheet');
    }

    // Search through data (skip header row)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let found = false;

      if (searchType === 'mobile') {
        // Check Phone number (Column D, index 3) and Alternative Phone (Column E, index 4)
        const phone1 = String(row[3] || '').trim();
        const phone2 = String(row[4] || '').trim();
        found = phone1 === searchValue || phone2 === searchValue;
        
        // Log only first 10 rows to avoid too much logging
        if (i <= 10) {
          console.log(`Row ${i}: Phone1="${phone1}", Phone2="${phone2}", Match=${found}`);
        }
      } 
      else if (searchType === 'transaction') {
        // Check Transaction ID (Column N, index 13)
        const transactionId = String(row[13] || '').trim();
        found = transactionId === searchValue;
        
        // Log only first 10 rows to avoid too much logging
        if (i <= 10) {
          console.log(`Row ${i}: TransactionID="${transactionId}", Match=${found}`);
        }
      }

      if (found) {
        console.log('Match found at row:', i + 1);
        
        // Build result object with all available data
        const result = {
          name: row[1] || '',                    // Column B - Full Name
          email: row[2] || '',                   // Column C - Email
          mobile: row[3] || '',                  // Column D - Phone number
          altMobile: row[4] || '',               // Column E - Alternative Phone number
          dateOfBirth: row[5] || '',             // Column F - Date of Birth
          address: row[6] || '',                 // Column G - Address
          gender: row[7] || '',                  // Column H - Gender
          tshirtSize: row[8] || '',              // Column I - T-Shirt Size
          accommodation: row[9] || '',           // Column J - Accommodation
          category: row[10] || '',               // Column K - Category
          paymentNumber: row[11] || '',          // Column L - Payment number
          paymentMethod: row[12] || '',          // Column M - Send Money from
          transactionId: row[13] || '',          // Column N - Transaction ID
          studentId: row[17] || '',              // Column R - Student ID
          serialNumber: row[19] || '',           // Column T - Serial Number
          paymentStatus: getPaymentStatus(row[18]), // Column S - Payment Verified (FIXED)
          correctionStatus: row[20] || 'No Change Request', // Column U - Correction Status
          comment: row[21] || 'No comments',     // Column V - Comments
          registrationDate: formatDate(row[0]),  // Column A - Timestamp
          rowNumber: i + 1,                      // For reference
          rawPaymentValue: row[18]               // For debugging
        };

        console.log('Payment column value:', row[18], 'Type:', typeof row[18]);
        console.log('Processed payment status:', result.paymentStatus);
        console.log('Returning result:', result);
        return createResponse(true, 'Registration found', result);
      }
    }

    console.log('No match found for search value:', searchValue);
    return createResponse(false, 'নিবন্ধন পাওয়া যায়নি | Registration not found for the provided information');
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse(false, 'Search failed: ' + error.toString());
  }
}

// FIXED: Create response without setHeaders (not supported in Apps Script)
function createResponse(success, message, data = null) {
  const response = { 
    success: success, 
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }

  // Use only setMimeType - setHeaders is not supported
  const output = ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
}

// Utility function to format date
function formatDate(dateValue) {
  if (!dateValue) return '';
  
  try {
    if (dateValue instanceof Date) {
      return dateValue.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return String(dateValue);
  } catch (error) {
    return String(dateValue);
  }
}

// FIXED: Payment status checker function - Shows exactly what's written
function getPaymentStatus(paymentValue) {
  if (!paymentValue) return 'Pending';
  
  const value = String(paymentValue).trim();
  
  // If the value is "Confirm" (exactly as you write it), show as "Confirmed"
  if (value.toLowerCase() === 'confirm') {
    return 'Confirmed';
  }
  
  // For any other text, show it exactly as written
  if (value.length > 0) {
    return value; // Show exactly what's written in the sheet
  }
  
  return 'Pending';
}

// Test functions - Run these to test your setup
function testConnection() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('✅ Connection successful!');
    console.log('Sheet ID:', SHEET_ID);
    console.log('Sheet Name:', SHEET_NAME);
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    
    if (values.length > 1) {
      console.log('Sample row 1:', values[1]);
      console.log('Phone1:', values[1][3]);
      console.log('Phone2:', values[1][4]);
      console.log('Transaction ID:', values[1][13]);
    }
    
    return {
      success: true,
      totalRows: values.length,
      headers: values[0],
      sampleData: values.slice(1, 3)
    };
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

function testSearchByMobile() {
  // Use an actual mobile number from your sheet - from the log, I can see 01611741684 exists
  const result = searchRegistration('mobile', '01611741684');
  console.log('Mobile search test result:', JSON.parse(result.getContent()));
  return result;
}

function testSearchByTransaction() {
  // You'll need to check your sheet for an actual transaction ID
  const result = searchRegistration('transaction', 'YOUR_ACTUAL_TRANSACTION_ID');
  console.log('Transaction search test result:', JSON.parse(result.getContent()));
  return result;
}

function debugFirstFewRows() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('=== FIRST 5 ROWS DEBUG ===');
    console.log('Headers:', values[0]);
    
    // Show first 5 data rows
    for (let i = 1; i <= Math.min(5, values.length - 1); i++) {
      const row = values[i];
      console.log(`\nRow ${i + 1}:`);
      console.log(`  Name: "${row[1]}"`);
      console.log(`  Phone1: "${row[3]}"`);
      console.log(`  Phone2: "${row[4]}"`);
      console.log(`  Transaction ID: "${row[13]}"`);
      console.log(`  Payment Status: "${row[18]}"`);
    }
    
    return true;
  } catch (error) {
    console.error('Error in debugFirstFewRows:', error);
    return false;
  }
}

function testWithRealData() {
  // Test with the first mobile number from your sheet
  console.log('Testing with 01611741684...');
  const result1 = searchRegistration('mobile', '01611741684');
  console.log('Result 1:', JSON.parse(result1.getContent()));
  
  console.log('Testing with 01732684197...');
  const result2 = searchRegistration('mobile', '01732684197');
  console.log('Result 2:', JSON.parse(result2.getContent()));
  
  return 'Tests completed - check logs for results';
}

// Get statistics about registrations
function getStats() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    let totalRegistrations = values.length - 1; // Exclude header
    let verifiedPayments = 0;
    let correctionRequests = 0;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      // Count verified payments (column S, index 18)
      if (row[18] === 'Yes' || row[18] === 'TRUE' || row[18] === true) {
        verifiedPayments++;
      }
      
      // Count correction requests (column U, index 20)
      if (row[20] && row[20] !== 'No Change Request') {
        correctionRequests++;
      }
    }
    
    const stats = {
      totalRegistrations,
      verifiedPayments,
      correctionRequests,
      verificationRate: ((verifiedPayments/totalRegistrations)*100).toFixed(1) + '%'
    };
    
    console.log('📊 Registration Statistics:', stats);
    return stats;
    
  } catch (error) {
    console.error('Error getting stats:', error);
    return { error: error.toString() };
  }
}

/*
====================================
SETUP INSTRUCTIONS:
====================================

1. ✅ Copy this FIXED code and paste it into Google Apps Script (script.google.com)

2. ✅ The SHEET_ID is already set to your sheet: '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg'

3. ✅ Deploy as Web App:
   - Click "Deploy" > "New deployment"
   - Type: Web app
   - Execute as: Me (your email)
   - Who has access: Anyone
   - Click "Deploy"
   - Copy the Web App URL

4. ✅ Test the setup:
   - Run testConnection() function to verify sheet access
   - Run debugFirstFewRows() to see your actual data
   - Run testWithRealData() to test with actual mobile numbers from your sheet

5. ✅ Update your frontend:
   - Replace GOOGLE_SHEETS_URL in confirmation.html with your new Web App URL

====================================
WHAT WAS FIXED:
====================================

❌ BEFORE: ContentService.createTextOutput().setMimeType().setHeaders() - setHeaders() not supported
✅ AFTER: ContentService.createTextOutput().setMimeType() - only supported methods

❌ BEFORE: Too much logging causing timeouts
✅ AFTER: Limited logging to first 10 rows only

❌ BEFORE: Missing CORS handling
✅ AFTER: Apps Script automatically handles CORS for Web Apps

====================================
*/

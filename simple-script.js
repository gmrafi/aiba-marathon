/**
 * Justice Half Marathon 2025 - Simple Confirmation Script
 * শুধুমাত্র search এর জন্য
 */

// Configuration
const CONFIG = {
  MAIN_SHEET_ID: '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg',
  SHEET_NAME: 'Form Responses 1'
};

// Main function
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'test') {
      return testConnection();
    }
    
    if (data.action === 'searchRegistration') {
      return searchRegistration(data.searchType, data.searchValue);
    }
    
    return createResponse(false, 'Invalid action');
    
  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'Server error: ' + error.message);
  }
}

// Test connection
function testConnection() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    return createResponse(true, 'Connection successful', {
      totalRows: lastRow,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return createResponse(false, 'Connection failed: ' + error.toString());
  }
}

// Search registration
function searchRegistration(searchType, searchValue) {
  try {
    console.log('Searching:', searchType, searchValue);
    
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('Total rows:', values.length);
    
    // Search through data (skip header row)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let match = false;
      
      if (searchType === 'mobile') {
        // Column D (index 3) and E (index 4)
        const phone = String(row[3] || '').trim();
        const altPhone = String(row[4] || '').trim();
        match = phone === searchValue || altPhone === searchValue;
        console.log(`Row ${i}: Phone="${phone}", AltPhone="${altPhone}"`);
      } else if (searchType === 'transaction') {
        // Column N (index 13)
        const transactionId = String(row[13] || '').trim();
        match = transactionId === searchValue;
        console.log(`Row ${i}: Transaction="${transactionId}"`);
      }
      
      if (match) {
        console.log('Match found!');
        const data = {
          name: row[1] || '',              // Column B
          mobile: row[3] || '',            // Column D
          email: row[2] || '',             // Column C
          tshirtSize: row[8] || '',        // Column I
          serialNumber: row[19] || '',     // Column T
          paymentStatus: (row[18] === 'Yes' || row[18] === 'TRUE') ? 'Confirmed' : 'Pending', // Column S
          correctionStatus: row[20] || 'No Change Request', // Column U
          comment: row[21] || 'No comments' // Column V
        };
        
        return createResponse(true, 'Registration found', data);
      }
    }
    
    return createResponse(false, 'প্রদত্ত তথ্যের জন্য কোনো নিবন্ধন পাওয়া যায়নি');
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse(false, 'Search failed: ' + error.message);
  }
}

// Create response
function createResponse(success, message, data = null) {
  const response = { success, message };
  if (data) response.data = data;
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

// Test functions
function testMobile() {
  const result = searchRegistration('mobile', '01712345678');
  console.log(result.getContent());
}

function testTransaction() {
  const result = searchRegistration('transaction', 'TXN123456789');
  console.log(result.getContent());
}

function checkSheet() {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.MAIN_SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('Headers:', values[0]);
    console.log('Sample data:', values[1]);
    console.log('Total rows:', values.length);
  } catch (error) {
    console.error('Error:', error);
  }
}

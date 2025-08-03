/**
 * Justice Half Marathon 2025 - Extreme Simple Script
 * Just search and return raw data - no fancy stuff
 */

const SHEET_ID = '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg';
const SHEET_NAME = 'Form Responses 1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'searchRegistration') {
      return searchRegistration(data.searchType, data.searchValue);
    }
    
    return createResponse(false, 'Invalid request');
    
  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'System error: ' + error.toString());
  }
}

function searchRegistration(searchType, searchValue) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    console.log('Searching for:', searchType, searchValue);
    
    // Search through data (skip header row)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let found = false;
      
      if (searchType === 'mobile') {
        // Check all possible phone columns - be more flexible
        for (let j = 0; j < row.length; j++) {
          const cellValue = String(row[j] || '').trim();
          if (cellValue === searchValue) {
            // Check if this column might be a phone column based on header
            const header = String(values[0][j] || '').toLowerCase();
            if (header.includes('phone') || header.includes('mobile') || j === 3 || j === 4) {
              found = true;
              break;
            }
          }
        }
      } 
      else if (searchType === 'transaction') {
        // Check all possible transaction columns
        for (let j = 0; j < row.length; j++) {
          const cellValue = String(row[j] || '').trim();
          if (cellValue === searchValue) {
            // Check if this column might be a transaction column
            const header = String(values[0][j] || '').toLowerCase();
            if (header.includes('transaction') || header.includes('id') || j === 13) {
              found = true;
              break;
            }
          }
        }
      }
      
      if (found) {
        console.log('Match found at row:', i);
        console.log('Row data:', row);
        
        // Return ALL the data - no assumptions about columns
        const result = {
          name: row[1] || '',                    // Column B - Full Name
          mobile: row[3] || '',                  // Column D - Phone number  
          email: row[2] || '',                   // Column C - Email
          tshirtSize: row[8] || '',              // Column I - T-Shirt Size
          serialNumber: row[19] || '',           // Column T - Serial Number
          paymentStatus: row[18] || '',          // Column S - Payment Verified
          correctionStatus: row[20] || '',       // Column U - Correction Status
          comment: row[21] || '',                // Column V - Comments
          
          // Also include some debug info
          rowNumber: i,
          fullRow: row,
          headers: values[0]
        };
        
        console.log('Returning result:', result);
        return createResponse(true, 'Registration found', result);
      }
    }
    
    console.log('No match found for:', searchValue);
    return createResponse(false, 'নিবন্ধন পাওয়া যায়নি');
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse(false, 'Search failed: ' + error.toString());
  }
}

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

// Test function to check what's in the sheet
function debugSheet() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    console.log('=== DEBUG SHEET ===');
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    
    if (values.length > 1) {
      console.log('First data row:', values[1]);
      console.log('Phone column (D, index 3):', values[1][3]);
      console.log('Alt phone column (E, index 4):', values[1][4]);
      console.log('Transaction column (N, index 13):', values[1][13]);
    }
    
    // Show first few phone numbers for testing
    for (let i = 1; i < Math.min(6, values.length); i++) {
      console.log(`Row ${i} - Phone: "${values[i][3]}", Alt: "${values[i][4]}", Transaction: "${values[i][13]}"`);
    }
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

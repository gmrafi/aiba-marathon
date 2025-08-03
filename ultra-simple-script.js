/**
 * Justice Half Marathon 2025 - Ultra Simple Script
 * Just pull data, no hiding, no processing
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
    return createResponse(false, 'System error');
  }
}

function searchRegistration(searchType, searchValue) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();
    
    // Search through data (skip header row)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let found = false;
      
      if (searchType === 'mobile') {
        // Check Phone number (Column D) and Alternative Phone (Column E)
        const phone1 = String(row[3] || '');
        const phone2 = String(row[4] || '');
        found = phone1 === searchValue || phone2 === searchValue;
      } 
      else if (searchType === 'transaction') {
        // Check Transaction ID (Column N)
        const transactionId = String(row[13] || '');
        found = transactionId === searchValue;
      }
      
      if (found) {
        // Just return the raw data, no processing
        const result = {
          name: row[1],                    // Full Name
          mobile: row[3],                  // Phone number  
          email: row[2],                   // Email
          tshirtSize: row[8],              // T-Shirt Size
          serialNumber: row[19],           // Serial Number
          paymentStatus: row[18],          // Payment Verified (raw value)
          correctionStatus: row[20],       // Correction Status
          comment: row[21]                 // Comments
        };
        
        return createResponse(true, 'Registration found', result);
      }
    }
    
    return createResponse(false, 'নিবন্ধন পাওয়া যায়নি');
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse(false, 'Search failed');
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

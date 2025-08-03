/**
 * Justice Half Marathon 2025 - Final Simple Script
 * শুধুমাত্র mobile এবং transaction search
 */

// Configuration
const SHEET_ID = '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg';
const SHEET_NAME = 'Form Responses 1';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      console.error('Invalid POST request: Missing postData');
      return createResponse(false, 'Invalid POST request: Missing postData');
    }

    const data = JSON.parse(e.postData.contents);
    console.log('Received request:', data);

    if (data.action === 'searchRegistration') {
      return searchRegistration(data.searchType, data.searchValue);
    }

    return createResponse(false, 'Invalid action');
  } catch (error) {
    console.error('doPost Error:', error);
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

function searchRegistration(searchType, searchValue) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    console.log('Sample row:', values[1]);
    console.log('Searching for:', searchType, searchValue);

    // Search through data (skip header row)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let found = false;

      if (searchType === 'mobile') {
        // Check Phone number (Column D, index 3) and Alternative Phone (Column E, index 4)
        const phone1 = String(row[3] || '').trim();
        const phone2 = String(row[4] || '').trim();
        found = phone1 === searchValue || phone2 === searchValue;
        console.log(`Row ${i}: Phone1="${phone1}", Phone2="${phone2}", Match=${found}`);
      } 
      else if (searchType === 'transaction') {
        // Check Transaction ID (Column N, index 13)
        const transactionId = String(row[13] || '').trim();
        found = transactionId === searchValue;
        console.log(`Row ${i}: TransactionID="${transactionId}", Match=${found}`);
      }

      if (found) {
        console.log('Match found at row:', i);
        const result = {
          name: row[1] || '',                    // Column B - Full Name
          mobile: row[3] || '',                  // Column D - Phone number
          email: row[2] || '',                   // Column C - Email
          tshirtSize: row[8] || '',              // Column I - T-Shirt Size
          serialNumber: row[19] || '',           // Column T - Serial Number
          paymentStatus: (row[18] === 'Yes' || row[18] === 'TRUE' || row[18] === true) ? 'Confirmed' : 'Pending', // Column S - Payment Verified
          correctionStatus: row[20] || 'No Change Request', // Column U - Correction Status
          comment: row[21] || 'No comments'      // Column V - Comments
        };

        console.log('Result:', result);
        return createResponse(true, 'Registration found', result);
      }
    }

    console.log('No match found');
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

// Test functions for debugging
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    console.log('Sheet access successful');
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);

    if (values.length > 1) {
      console.log('First data row:', values[1]);
      console.log('Phone column (D):', values[1][3]);
      console.log('Alt phone column (E):', values[1][4]);
      console.log('Transaction column (N):', values[1][13]);
    }

    return 'Success';
  } catch (error) {
    console.error('Error:', error);
    return 'Error: ' + error.toString();
  }
}

function testSearch() {
  // Test with the first mobile number found in the sheet
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const values = sheet.getDataRange().getValues();

    if (values.length > 1) {
      const firstPhone = values[1][3]; // Column D
      console.log('Testing with phone:', firstPhone);

      const result = searchRegistration('mobile', String(firstPhone));
      console.log('Test result:', result.getContent());
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

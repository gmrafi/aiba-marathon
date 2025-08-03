/**
 * Justice Half Marathon 2025 - FINAL WORKING SCRIPT
 * Created from Google Sheets - Automatically Connected
 */

// Since this script is created from the sheet, we can use SpreadsheetApp.getActiveSpreadsheet()
// But keeping the manual ID as backup
const SHEET_ID = '1RzeV7PVFBypkAd6msV7kXA9qWzlm4MGS5XM6xvZYVcg';
const SHEET_NAME = 'Form Responses 1';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({success: true, message: 'Marathon Registration API Active'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
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
    console.log('=== SEARCH START ===');
    console.log('Search Type:', searchType);
    console.log('Search Value:', searchValue);
    
    // Try to get the active spreadsheet first (since script is created from sheet)
    let sheet;
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    } catch (e) {
      // Fallback to manual ID
      sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    }
    
    const values = sheet.getDataRange().getValues();
    
    console.log('Total rows in sheet:', values.length);
    console.log('Headers:', values[0]);
    
    if (values.length <= 1) {
      console.log('No data rows found');
      return createResponse(false, 'No data in sheet');
    }
    
    // Search every row and every column
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      for (let j = 0; j < row.length; j++) {
        const cellValue = String(row[j] || '').trim();
        
        // If cell value matches search value
        if (cellValue === searchValue) {
          console.log(`MATCH FOUND! Row ${i}, Column ${j}`);
          console.log('Cell value:', cellValue);
          console.log('Header:', values[0][j]);
          console.log('Full row:', row);
          
          // Check if this could be the right type of column
          const header = String(values[0][j] || '').toLowerCase();
          let isValidMatch = false;
          
          if (searchType === 'mobile') {
            // For mobile, check if column header contains phone/mobile or is in typical phone columns
            isValidMatch = header.includes('phone') || header.includes('mobile') || j === 3 || j === 4;
          } else if (searchType === 'transaction') {
            // For transaction, check if header contains transaction/id or is in typical transaction columns
            isValidMatch = header.includes('transaction') || header.includes('id') || j === 13;
          }
          
          if (isValidMatch) {
            console.log('Valid match confirmed!');
            
            // Return the data - use exact column indexes
            const result = {
              name: row[1] || '',                    // Column B (index 1)
              mobile: row[3] || '',                  // Column D (index 3)
              email: row[2] || '',                   // Column C (index 2)
              tshirtSize: row[8] || '',              // Column I (index 8)
              serialNumber: row[19] || '',           // Column T (index 19)
              paymentStatus: row[18] || '',          // Column S (index 18)
              correctionStatus: row[20] || '',       // Column U (index 20)
              comment: row[21] || '',                // Column V (index 21)
              
              // Debug info
              foundInColumn: j,
              foundInRow: i,
              columnHeader: values[0][j],
              searchedValue: searchValue
            };
            
            console.log('Returning result:', result);
            return createResponse(true, 'Registration found', result);
          } else {
            console.log('Match found but not in valid column for search type');
          }
        }
      }
    }
    
    console.log('No match found anywhere');
    return createResponse(false, 'নিবন্ধন পাওয়া যায়নি');
    
  } catch (error) {
    console.error('Search error:', error);
    return createResponse(false, 'Search failed: ' + error.toString());
  }
}

function createResponse(success, message, data = null) {
  const response = { success, message };
  if (data) response.data = data;
  
  console.log('Creating response:', response);
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this first to check data
function testData() {
  try {
    // Try active spreadsheet first
    let sheet;
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      console.log('✅ Using active spreadsheet (sheet-connected script)');
    } catch (e) {
      sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
      console.log('✅ Using manual sheet ID');
    }
    
    const values = sheet.getDataRange().getValues();
    
    console.log('=== SHEET DATA TEST ===');
    console.log('Total rows:', values.length);
    console.log('Headers:', values[0]);
    
    // Show first 3 data rows
    for (let i = 1; i <= Math.min(3, values.length - 1); i++) {
      console.log(`Row ${i}:`, values[i]);
      console.log(`  Name (B): ${values[i][1]}`);
      console.log(`  Email (C): ${values[i][2]}`);
      console.log(`  Phone (D): ${values[i][3]}`);
      console.log(`  Alt Phone (E): ${values[i][4]}`);
      console.log(`  Transaction (N): ${values[i][13]}`);
    }
    
    console.log('✅ Data test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Simple test search with real data
function testSearch() {
  console.log('=== TESTING WITH REAL DATA ===');
  
  // Test with actual phone number from the data
  console.log('Testing with phone: 01611741684');
  const result1 = searchRegistration('mobile', '01611741684');
  console.log('Mobile search result:', result1.getContent());
  
  // Test with actual transaction ID
  console.log('Testing with transaction: CGB2KOYULI');
  const result2 = searchRegistration('transaction', 'CGB2KOYULI');
  console.log('Transaction search result:', result2.getContent());
}

/**
 * Test Google Apps Script Web App
 */

// Test the doGet function
function testDoGet() {
  const testEvent = {
    parameter: {
      action: 'verify',
      txn: '01712345678'
    }
  };
  
  const result = doGet(testEvent);
  console.log('doGet test result:', result.getContent());
}

// Test the doPost function with form data
function testDoPostWithFormData() {
  const testEvent = {
    parameter: {
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
      amount: '1250',
      studentId: '',
      transactionId: 'TXN123456789',
      paymentStatus: 'Pending',
      timestamp: new Date().toISOString()
    },
    postData: null
  };
  
  const result = doPost(testEvent);
  console.log('doPost form data test result:', result.getContent());
}

// Test the web app URL directly
function testWebAppURL() {
  const url = 'https://script.google.com/macros/s/AKfycbzjhwUsSIT46HLiXktpKQLY1KGqhDII4Cf05ng8KSrrS7D_MezYpSQm3uiZUHWgYo1XKg/exec';
  
  const formData = {
    'fullName': 'Test User',
    'email': 'test@example.com',
    'phone': '01712345678',
    'category': '21KM Half Marathon',
    'amount': '1250',
    'transactionId': 'TXN123456789'
  };
  
  const options = {
    'method': 'POST',
    'payload': formData
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    console.log('Web App URL test response:', responseText);
  } catch (error) {
    console.error('Web App URL test error:', error);
  }
}

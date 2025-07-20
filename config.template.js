// bKash Configuration Template
// IMPORTANT: This file should be in .gitignore
// Copy this to config.js and add your real credentials

const bKashConfig = {
    // Environment Settings
    baseURL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta', // Sandbox
    // baseURL: 'https://tokenized.pay.bka.sh/v1.2.0-beta', // Production
    
    // Merchant Credentials - ADD YOUR REAL VALUES HERE
    appKey: 'YOUR_ACTUAL_APP_KEY',
    appSecret: 'YOUR_ACTUAL_APP_SECRET', 
    username: 'YOUR_ACTUAL_USERNAME',
    password: 'YOUR_ACTUAL_PASSWORD',
    
    // Callback Configuration
    callbackURL: window.location.origin + '/pgw.html',
    
    // Additional Settings
    timeout: 30000,
    maxRetries: 2
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bKashConfig;
}

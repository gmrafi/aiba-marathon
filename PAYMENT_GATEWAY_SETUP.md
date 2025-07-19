# Payment Gateway Setup Guide (সহজ বাংলায়)
**Justice Half Marathon 2025 - স্টেপ বাই স্টেপ গাইড**

## 🎯 কি পাবেন?
এই payment gateway দিয়ে:
- ✅ Registration form ভরলেই Google Sheets এ data চলে যাবে
- ✅ bKash payment করার পর automatically confirmed হয়ে যাবে
- ✅ BIB number, Registration ID সব auto generate হবে
- ✅ Admin dashboard থেকে সব data manage করতে পারবেন

---

## 🚀 **মাত্র ৫টি স্টেপ!**

### 📊 **স্টেপ ১: Google Sheets তৈরি করুন (৫ মিনিট)**

**কি করবেন:**
1. **Google Drive খুলুন** → drive.google.com
2. **New ক্লিক করুন** → Google Sheets
3. **Sheets এর নাম দিন:** "Justice Half Marathon 2025 Registration"
4. **নিচের Sheet1 এ right click** → Rename → "Registration Data" নাম দিন
5. **URL থেকে ID copy করুন:**
   ```
   https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789/edit
                                      ↑
                              এই অংশটুকু copy করুন
   ```

**✅ এই স্টেপ শেষ!** আপনার Google Sheets তৈরি হয়ে গেছে।

---

### ⚙️ **স্টেপ ২: Google Apps Script Setup (১০ মিনিট)**

**কি করবেন:**
1. **script.google.com এ যান**
2. **New project ক্লিক করুন**
3. **Project name দিন:** "Marathon Payment Gateway"

4. **Code.gs file এ যান** এবং সব delete করে দিন
5. **আমার দেওয়া `google-apps-script-payment-gateway.js` file খুলুন**
6. **পুরো code copy করে Code.gs এ paste করুন**

7. **সবচেয়ে গুরুত্বপূর্ণ:** Line 8 এ এই code টি দেখবেন:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEETS_ID_HERE';
   ```
   **এখানে আপনার Google Sheets ID বসান:**
   ```javascript
   const SPREADSHEET_ID = '1ABC123DEF456GHI789'; // আপনার ID
   ```

8. **Save করুন** (Ctrl+S)
9. **Test করুন:** Run → testRegistration (Permission দিন যদি চায়)
10. **Deploy করুন:**
    - Deploy → New deployment
    - Type: Web app
    - Execute as: Me  
    - Who has access: Anyone
    - **Deploy ক্লিক করুন**
    - **Web App URL copy করুন** (এটা খুবই গুরুত্বপূর্ণ!)

**✅ এই স্টেপ শেষ!** আপনার backend তৈরি হয়ে গেছে।

---

### 🌐 **স্টেপ ৩: Payment Gateway Page Setup (৫ মিনিট)**

**কি করবেন:**
1. **pgw.html file খুলুন** (VS Code বা যেকোনো editor দিয়ে)
2. **Line 277 খুঁজুন** এবং এই line টি দেখবেন:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
   ```
3. **স্টেপ ২ এ যে Web App URL পেয়েছিলেন সেটা এখানে বসান:**
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXXXXXXXXXXXX/exec';
   ```

4. **Line 302 খুঁজুন** এবং এখানেও same URL বসান:
   ```javascript
   const UPDATE_PAYMENT_URL = 'https://script.google.com/macros/s/AKfycbwXXXXXXXXXXXX/exec';
   ```

5. **Save করুন**

**✅ এই স্টেপ শেষ!** আপনার payment gateway page ready!

---

### 🧪 **স্টেপ ৪: Test করুন (৫ মিনিট)**

**কি করবেন:**
1. **pgw.html file browser এ open করুন**
2. **যেকোনো একটা category select করুন** (21KM, 10KM, Student, Kids)
3. **Form ভরুন** (fake data দিয়েও পারেন test এর জন্য)
4. **"Proceed to Payment" ক্লিক করুন**
5. **"Pay with bKash" ক্লিক করুন** (3 seconds loading হবে, তারপর success!)
6. **Google Sheets check করুন** → আপনার data এসেছে কিনা দেখুন

**✅ যদি Google Sheets এ data এসে থাকে = সব কাজ হয়ে গেছে!**

---

### 💳 **স্টেপ ৫: Real bKash Integration (Optional - পরে করতে পারেন)**

**এখন যা হচ্ছে:** Payment simulation (fake payment for testing)
**Real payment এর জন্য:** আপনার bKash merchant account credentials লাগবে

**এটা পরে করতে পারেন যখন আপনার merchant account ready হবে।**

---

## 🎉 **সব শেষ! এখন কি পাবেন?**

### ✅ **কাজ করছে:**
- Registration form → Google Sheets এ auto data entry
- Payment simulation → Success confirmation
- BIB number generation (AIBA-001, AIBA-101 etc.)
- Registration ID generation
- Mobile responsive design

### 📊 **Google Sheets এ যা পাবেন:**
- Participant এর সব details
- Payment status
- Auto-generated BIB numbers
- Registration timestamp
- Transaction IDs

---

## 🆘 **সমস্যা হলে কি করবেন?**

### ❌ **Form submit হচ্ছে না:**
- Google Apps Script URL সঠিক দিয়েছেন কিনা check করুন
- Browser console (F12) এ error দেখুন

### ❌ **Google Sheets এ data আসছে না:**
- Apps Script permissions দিয়েছেন কিনা check করুন  
- SPREADSHEET_ID সঠিক আছে কিনা verify করুন

### ❌ **Payment simulation কাজ করছে না:**
- JavaScript console error check করুন
- Internet connection check করুন

---

## 📝 **Quick Checklist:**

- [ ] Google Sheets তৈরি করেছি ✓
- [ ] Sheets ID copy করেছি ✓  
- [ ] Apps Script project তৈরি করেছি ✓
- [ ] Code paste করে SPREADSHEET_ID update করেছি ✓
- [ ] Web App deploy করে URL নিয়েছি ✓
- [ ] pgw.html এ URLs update করেছি ✓
- [ ] Test করে দেখেছি যে data Google Sheets এ আসছে ✓

**সব tick থাকলে আপনার payment gateway ready! 🎉**

---

## 🤔 **এখনও বুঝতে সমস্যা?**

**প্রতিটা step এ exact কি করতে হবে screenshot সহ বলে দিতে পারি। কোন step এ আটকে আছেন বলুন!**
   - URL থেকে ID copy করুন: `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit`

### Step 2: Google Apps Script Setup

1. **Apps Script project তৈরি করুন:**
   - script.google.com এ যান
   - New Project ক্লিক করুন
   - Project এর নাম দিন: "Marathon Payment Gateway"

2. **Code.gs file এ script paste করুন:**
   - `google-apps-script-payment-gateway.js` এর পুরো code copy করুন
   - Code.gs file এ paste করুন
   - `SPREADSHEET_ID` variable এ আপনার Google Sheets ID দিন

3. **Permissions দিন:**
   - Run → testRegistration
   - Permissions authorize করুন

4. **Web App deploy করুন:**
   - Deploy → New deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Deploy ক্লিক করুন
   - **Web App URL copy করুন** (এটা প্রয়োজন হবে)

### Step 3: Payment Gateway HTML Setup

1. **pgw.html file এ script URLs update করুন:**
   ```javascript
   // Line 358 এ আপনার Apps Script URL দিন
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   
   // Line 404 এ payment update URL দিন
   const UPDATE_PAYMENT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```

### Step 4: bKash Merchant Account Integration

#### Development/Testing এর জন্য:
- বর্তমানে simulation mode এ কাজ করবে
- Real payment test করার জন্য আপনার bKash merchant account প্রয়োজন

#### Production এর জন্য:
1. **bKash Merchant Account থেকে credentials নিন:**
   - App Key
   - App Secret  
   - Username
   - Password
   - Base URL

2. **Backend server setup করুন:**
   - bKash API integration এর জন্য একটা backend server লাগবে
   - Node.js/PHP/Python যেকোনো technology ব্যবহার করতে পারেন

3. **pgw.html এ real bKash integration enable করুন:**
   - Line 491-550 এ commented code uncomment করুন
   - paymentConfig URLs আপনার backend server URL দিন

### Step 5: Testing

1. **Registration form test:**
   - pgw.html open করুন
   - একটা category select করুন
   - Form fill করুন
   - Submit করুন

2. **Google Sheets check করুন:**
   - "Registration Data" sheet এ data আসছে কিনা দেখুন
   - Auto-generated BIB numbers check করুন

3. **Payment simulation test:**
   - Payment step এ গিয়ে "Pay with bKash" ক্লিক করুন
   - 3 seconds পর automatic success হবে
   - Confirmation page দেখুন

## 🔧 File Structure

```
aiba-marathon/
├── pgw.html                                   # Main payment gateway page
├── google-apps-script-payment-gateway.js     # Google Apps Script code
└── PAYMENT_GATEWAY_SETUP.md                  # This setup guide
```

## 📊 Google Sheets Structure

### Registration Data Sheet:
| Column | Field Name | Description |
|--------|------------|-------------|
| A | Timestamp | Registration timestamp |
| B | Full Name | Participant's full name |
| C | Email | Email address |
| D | Phone number | Primary phone |
| E | Alternative Phone number | Secondary phone |
| F | Date of Birth | DOB |
| G | Address | Full address |
| H | Gender | Male/Female/Other |
| I | T-Shirt Size | XS to XXL |
| J | Do you need accommodation facilities? | Yes/No |
| K | Category | Marathon category |
| L | Amount | Registration fee |
| M | Student ID | For student category |
| N | Payment Status | Pending/Verified |
| O | Transaction ID | bKash transaction ID |
| P | Payment Timestamp | Payment completion time |
| Q | BIB Number | Auto-generated BIB |
| R | Registration ID | Unique registration ID |

## 🎨 Features

### ✅ Completed Features:
- Multi-step registration form
- Category-wise pricing
- Real-time form validation
- Google Sheets integration
- Payment simulation
- BIB number generation
- Registration ID generation
- Payment verification system
- Mobile responsive design
- Progress indicators

### 🚀 Next Steps for Production:
1. bKash merchant account integration
2. Backend server setup for payment APIs
3. Email notification system
4. SMS notification system
5. Admin dashboard integration

## 🔐 Security Notes

1. **Google Apps Script permissions:**
   - Script শুধুমাত্র আপনার account access করতে পারবে
   - Web app deployment "Anyone" access দিয়েছি data receive করার জন্য

2. **Data protection:**
   - Google Sheets private রাখুন
   - Sensitive data encrypt করুন যদি প্রয়োজন হয়

3. **bKash integration:**
   - Production এ merchant credentials secure রাখুন
   - HTTPS ব্যবহার করুন
   - API keys environment variables এ রাখুন

## 📱 Testing URLs

- **Payment Gateway:** `pgw.html`
- **Apps Script Web App:** `YOUR_DEPLOYED_WEB_APP_URL`
- **Google Sheets:** `YOUR_GOOGLE_SHEETS_URL`

## 🆘 Troubleshooting

### Common Issues:

1. **Form submission not working:**
   - Apps Script URL সঠিক আছে কিনা check করুন
   - CORS policy issues থাকলে Apps Script deployment settings check করুন

2. **Google Sheets এ data আসছে না:**
   - Apps Script permissions authorize করেছেন কিনা check করুন
   - SPREADSHEET_ID সঠিক আছে কিনা verify করুন

3. **Payment simulation কাজ করছে না:**
   - JavaScript console check করুন error messages এর জন্য
   - Browser network tab check করুন API calls এর জন্য

### Debug করার জন্য:
1. Browser Developer Tools (F12) open করুন
2. Console tab এ error messages দেখুন
3. Network tab এ API requests monitor করুন

## 📞 Support

আরও help প্রয়োজন হলে:
1. Google Apps Script documentation পড়ুন
2. bKash merchant API documentation check করুন
3. JavaScript console errors analyze করুন

---

**Note:** এই system production-ready করার জন্য actual bKash merchant account এবং proper backend server setup করতে হবে। বর্তমানে testing/demo mode এ কাজ করছে।

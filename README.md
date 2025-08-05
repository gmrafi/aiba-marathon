# Justice Half Marathon 2025 🏃‍♂️

**Official Website for Justice Half Marathon 2025**  
*Organized by Army IBA Hiking & Trekking Club, Sylhet*

[![Website](https://img.shields.io/website?url=https%3A//justicehalfmarathon.com)](https://justicehalfmarathon.com)
[![License](https://img.shields.io/badge/License-Copyright%202025-red)](LICENSE.md)
[![Event Date](https://img.shields.io/badge/Event%20Date-26%20September%202025-green)](https://justicehalfmarathon.com)
[![Version](https://img.shields.io/badge/Version-v3.0.0-blue)](https://github.com/gmrafi/aiba-marathon/releases)

## 🚀 Latest Release - v3.0.0

**Major Feature Release** - The Justice Half Marathon website now includes comprehensive confirmation system, data correction features, and enhanced multi-platform deployment:

### 🌐 Access Points:
- **Main Website**: [justicehalfmarathon.com](https://www.justicehalfmarathon.com/)
- **Alternative Domains**: 
  - [jhm25.onrender.com](https://jhm25.onrender.com/) - Render hosting (**NEW**)
  - [web.justicehalfmarathon.com](http://web.justicehalfmarathon.com/) - Netlify hosting (**NEW**)
  - [aiba-marathon.vercel.app](https://aiba-marathon.vercel.app) - Vercel hosting
  - [aiba-marathon.gmrafi.com](https://aiba-marathon.gmrafi.com/) - Custom subdomain
  - [marathon.gmrafi.com](https://marathon.gmrafi.com/) - Alternative subdomain
- **GitHub Repository**: [github.com/gmrafi/aiba-marathon](https://github.com/gmrafi/aiba-marathon)
- **GitHub Pages**: [gmrafi.github.io/aiba-marathon](https://gmrafi.github.io/aiba-marathon)

### 🏃‍♂️ About Justice Half Marathon 2025
Organized by the Army IBA Hiking and Trekking Club, Sylhet, the Justice Half Marathon 2025 is an **on-ground event only**, bringing together runners from all over Bangladesh. Join us for a scenic run, professional organization, and a host of facilities and rewards!

## 🎯 About the Project

Justice Half Marathon 2025 is a comprehensive web-based platform for Bangladesh's premier running event organized by Army Institute of Business Administration - Hiking & Trekking Club, Sylhet. This platform handles everything from event promotion to registration, payment processing, and participant management.

### 🏫 About Army Institute of Business Administration (AIBA), Sylhet

Army Institute of Business Administration (AIBA), Sylhet is a prestigious educational institution affiliated with Bangladesh University of Professionals (BUP). Established as part of Bangladesh's defense education system, AIBA Sylhet offers high-quality business education with a focus on leadership development, strategic thinking, and professional excellence.

**Key Features of AIBA Sylhet:**
- **Affiliation**: Bangladesh University of Professionals (BUP)
- **Location**: Jalalabad Cantonment, Sylhet
- **Programs**: Bachelor of Business Administration (BBA) and related business programs
- **Focus**: Leadership development, business ethics, and professional competency
- **Environment**: Disciplined academic atmosphere with military precision
- **Student Activities**: Active clubs including Hiking & Trekking Club, ICT Club, Business Club, Debate Club, and Sports AIBA

**🌐 Live Website**: [justicehalfmarathon.com](https://justicehalfmarathon.com)  
**📅 Event Date**: 26th September, 2025  
**📍 Location**: Army IBA Sylhet, Sylhet Cantonment, Sylhet

## 🏃‍♀️ Event Categories

| Category | Distance | Price | Participants | Age Group |
|----------|----------|-------|--------------|-----------|
| **Half Marathon** | 21 KM | ৳1,250 | 400 | Open for All |
| **10KM Open Run** | 10 KM | ৳1,050 | 400 | 60+ Included |
| **10KM Student Run** | 10 KM | ৳800 | 300 | Students Only |
| **Kids Fun Run** | 1 KM | ৳600 | 100 | Ages 6-12 |

## ✨ Key Features

### 🎨 Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive UI**: Smooth animations and modern design
- **Multi-language Support**: Bangla and English content
- **SEO Optimized**: Complete meta tags and structured data
- **Performance Optimized**: Lazy loading, compressed assets
- **Progressive Web App**: Works offline with service worker

### 🔧 Registration System
- **Multi-step Registration**: User-friendly form with validation
- **Category Selection**: Dynamic pricing and participant limits
- **Student Verification**: Special pricing for students with ID
- **Real-time Validation**: Email, phone, and form validation
- **BIB Number Generation**: Automatic BIB assignment by category

### 💳 Payment Integration
- **bKash Payment Gateway**: Secure digital payment processing
- **Payment Verification**: Real-time transaction verification
- **Manual Payment Option**: Alternative payment methods supported
- **Receipt Generation**: Digital receipts and invoices
- **Payment Status Tracking**: Real-time payment status updates

### 📊 Backend System
- **Google Apps Script**: Serverless backend architecture
- **Google Sheets Integration**: Real-time data storage and management
- **Email Notifications**: Automated confirmation emails
- **Data Validation**: Server-side validation and sanitization
- **Activity Logging**: Comprehensive audit trail

### 🔍 Confirmation System
- **Registration Search**: Search by mobile number or transaction ID
- **Correction Requests**: Name and T-shirt size corrections
- **Missing Data Reports**: Handle incomplete registrations
- **General Query System**: Support request management
- **Privacy Protection**: Masked email display for security

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Tailwind CSS framework for responsive design
- **JavaScript**: Vanilla JS with modern ES6+ features
- **PWA**: Service worker for offline functionality

### Backend Infrastructure
- **Google Apps Script**: Serverless execution environment
- **Google Sheets**: Database for registration data
- **Google Drive**: File storage for assets and backups
- **Gmail API**: Email notification system

### Payment Processing
- **bKash API**: Primary payment gateway integration
- **Manual Verification**: Backup payment verification system
- **Transaction Logging**: Complete payment audit trail
- **Refund Management**: Payment reversal capabilities

### Deployment & Hosting
- **Vercel**: Primary hosting platform
- **Render**: Backup hosting platform
- **Netlify**: Secondary backup hosting
- **GitHub Pages**: Development and backup hosting
- **Custom Domain**: justicehalfmarathon.com
- **Alternative Subdomains**: aiba-marathon.gmrafi.com, marathon.gmrafi.com
- **Cloudflare**: CDN and security services
- **SSL**: Automatic HTTPS certificate

## 📁 Project Structure

```
aiba-marathon/
├── 📄 index.html              # Main homepage
├── 📄 registration.html       # Registration form (Google Forms embed)
├── 📄 pgw.html                # Payment gateway integration
├── 📄 team.html               # Organizing team page
├── 📄 confirmation.html       # Registration confirmation system
├── 📄 correction.html         # Data correction form
├── 📄 missing-data.html       # Missing registration reports
├── 📄 general-query.html      # Support query system
├── 📄 payment-verification.html # Manual payment verification
├── 📄 race-day.html           # Race day information
├── 📄 notices.html            # Important notices
├── 📄 org.html                # Admin dashboard
├── 📄 bib.html                # BIB number display
├── 📄 styles.css              # Custom stylesheet
├── 📁 photos/                 # Image assets
│   ├── 📁 team/               # Team member photos
│   ├── 📁 pacer/              # Pacer photos
│   └── 📁 partner/            # Sponsor/partner logos
├── 📄 final-working-script.js # Main Google Apps Script
├── 📄 google-apps-script-*.js # Backend scripts
├── 📄 vercel.json             # Deployment configuration
├── 📄 sitemap.xml             # SEO sitemap
├── 📄 robots.txt              # Search engine directives
├── 📄 CNAME                   # Custom domain configuration
└── 📄 LICENSE.md              # Copyright information
```

## 🚀 Registration Process

### For Participants:
1. **Visit Website**: Go to [justicehalfmarathon.com](https://justicehalfmarathon.com)
2. **Choose Category**: Select from 4 available race categories
3. **Fill Registration**: Complete the registration form
4. **Make Payment**: Pay via bKash or manual methods
5. **Get Confirmation**: Receive BIB number and confirmation
6. **Race Day**: Participate in the marathon event

### Payment Methods:
- **bKash**: Automated digital payment processing
- **Manual Payment**: Bank transfer, cash, or other methods
- **Student Discount**: Special pricing for valid students

## 🔧 Development Setup

### Prerequisites
- Modern web browser
- Google Account for Apps Script
- bKash Merchant Account (for payment)
- Vercel Account (for deployment)

### Local Development
```bash
# Clone the repository
git clone https://github.com/gmrafi/aiba-marathon.git

# Navigate to project directory
cd aiba-marathon

# Open in browser
# Simply open index.html in your browser
# Or use a local server like Live Server extension
```

### Google Apps Script Setup
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Copy code from `final-working-script.js`
4. Update `SHEET_ID` with your Google Sheets ID
5. Deploy as web app
6. Update URLs in HTML files

### Configuration Files
- `config.template.js`: Template for configuration
- `vercel.json`: Deployment settings
- `.env.example`: Environment variables template

## 📊 Features Breakdown

### Homepage (`index.html`)
- **Hero Section**: Event branding and countdown timer
- **Video Promo**: Embedded YouTube promotional video
- **Event Categories**: Detailed pricing and category information
- **Pacers Section**: Professional race pacers showcase
- **Sponsors**: Partner and sponsor recognition
- **Contact Information**: Event organizer details

### Registration System
- **Multi-step Form**: Progressive registration process
- **Dynamic Pricing**: Category-based fee calculation
- **Student Verification**: ID validation for student pricing
- **Payment Integration**: Secure bKash payment processing
- **Confirmation**: Automated BIB number generation

### Confirmation System
- **Search by Mobile**: Find registration by phone number
- **Search by Transaction**: Lookup using transaction ID
- **Data Correction**: Request name/size corrections
- **Missing Data**: Report incomplete registrations
- **Support Queries**: General support request system

## 🎨 Design & Branding

### Color Scheme
- **Primary Green**: #005840 (Army IBA brand color)
- **Accent Colors**: Blue (#3B82F6), Yellow (#FEF3C7)
- **Text**: Dark gray (#2D3748) for readability
- **Background**: Light blue-gray (#F0F4F8)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Languages**: Support for Bangla and English text

### Visual Elements
- **Logo**: Army IBA and event branding
- **Icons**: Custom SVG icons and emojis
- **Images**: High-quality photos of team and partners
- **Animations**: Smooth CSS transitions and hover effects

## 🔒 Security & Privacy

### Data Protection
- **Email Masking**: Partial email display for privacy
- **Secure Transmission**: HTTPS encryption for all data
- **Input Validation**: Server and client-side validation
- **Access Control**: Admin dashboard password protection

### Payment Security
- **bKash Integration**: Official API with secure tokens
- **Transaction Logging**: Complete audit trail
- **Error Handling**: Graceful failure management
- **Refund Support**: Payment reversal capabilities

## 📈 Analytics & Monitoring

### Performance Tracking
- **Google Analytics**: Visitor behavior and conversion tracking
- **GTM Integration**: Google Tag Manager for event tracking
- **Hotjar**: User interaction heatmaps and recordings
- **Core Web Vitals**: Performance optimization metrics

### Registration Analytics
- **Real-time Statistics**: Live registration counts
- **Payment Tracking**: Transaction success rates
- **Category Distribution**: Registration by race category
- **Revenue Monitoring**: Financial performance tracking

## 🌐 SEO & Marketing

### Search Engine Optimization
- **Structured Data**: Schema markup for events
- **Meta Tags**: Complete Open Graph and Twitter cards
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling directives

### Social Media Integration
- **Facebook**: Event page and social sharing
- **Share Buttons**: Easy social media sharing
- **Open Graph**: Rich social media previews
- **WhatsApp**: Direct contact integration

## 🚀 Deployment

### Production Hosting
- **Primary**: Vercel with custom domain
- **Backup**: GitHub Pages
- **CDN**: Global content delivery
- **SSL**: Automatic HTTPS certificate

### CI/CD Pipeline
- **Git Integration**: Automatic deployment from GitHub
- **Branch Protection**: Main branch deployment only
- **Environment Variables**: Secure configuration management
- **Rollback**: Easy version rollback capabilities

## 🎯 Race Day Features

### Participant Experience
- **BIB Number**: Unique identifier for each participant
- **Race Instructions**: Detailed race day guidelines
- **Route Information**: Interactive Google Maps integration
- **Timing System**: Professional race timing
- **Awards Ceremony**: Winner recognition system

### Organizer Tools
- **Check-in System**: Participant verification
- **Real-time Tracking**: Race progress monitoring
- **Communication**: Emergency contact system
- **Results Management**: Time recording and ranking

## 🤝 Sponsors & Partners

### Event Sponsors
- **Sena Kalyan Sangstha**: Main sponsor
- **FUEL Hydration Powder**: Hydration partner
- **Sena Drinking Water**: Refreshment partner

### Media Partners
- **The Business Standard**: English media partner
- **Shomoyer Alo**: Media partner
- **Jago FM 94.4**: Radio partner

## 📞 Support & Contact

### Event Organizers
- **President**: Hasib Hasan Moon - 01568-082587
- **Vice President**: Muftasim Fuad Zim - 01316891926
- **Visuals & Editing**: Ahmed Hamim Enan - 01757763615

### Official Channels
- **Email**: info@aibasylhet.edu.bd
- **Website**: aibasylhet.edu.bd
- **Address**: Army Institute of Business Administration, Sylhet

### Technical Support
- **Developer**: MD Golam Mubasshir Rafi
- **Position**: 2nd Year BBA Student
- **Institution**: Army Institute of Business Administration, Sylhet

- **Email**: gmrafi365@gmail.com, rafi@gmrafi.com
- **Website**: [gmrafi.com](https://gmrafi.com)
- **GitHub**: [github.com/gmrafi](https://github.com/gmrafi)
- **LinkedIn**: [linkedin.com/in/gmrafi](https://linkedin.com/in/gmrafi)
- **Specialization**: Business Research, Open-source Contribution, Web Development

## 📅 Important Dates

| Date | Event |
|------|-------|
| **August 10, 2025** | Registration deadline |
| **August 11, 2025** | Confirmation system goes live |
| **August 15, 2025** | Correction deadline |
| **September 26, 2025** | Race day |

## 🔄 System Integration

### Google Services
- **Google Sheets**: Primary database
- **Google Apps Script**: Backend processing
- **Gmail**: Email notifications
- **Google Drive**: File storage and backups

### Third-party Services
- **bKash**: Payment processing
- **Vercel**: Primary hosting platform
- **Render**: Backup hosting platform
- **Netlify**: Secondary backup hosting
- **GitHub Pages**: Development hosting
- **Cloudflare**: CDN and security services
- **Google Analytics**: Usage tracking
- **Hotjar**: User experience monitoring

## 🏆 Recognition

This project represents a comprehensive digital solution for marathon event management in Bangladesh, combining modern web technologies with local payment systems and organizational needs.

### Awards & Recognition
- Complete digital transformation of traditional marathon registration
- Integration of local payment systems (bKash) with international standards
- Multilingual support for diverse participant base
- Professional race management system

## 📄 Copyright & License

**© 2025 MD Golam Mubasshir Rafi. All Rights Reserved.**

This project is the intellectual property of MD Golam Mubasshir Rafi. The website and all associated systems are designed and developed exclusively for Justice Half Marathon 2025.

### Permitted Uses
- **Educational**: Code review and learning purposes
- **Personal**: Non-commercial personal projects
- **Reference**: Technical implementation study

### Restricted Uses
- **Commercial Use**: Prohibited without written permission
- **Public Distribution**: No public sharing or redistribution
- **Sub-licensing**: Cannot grant licenses to third parties

For licensing inquiries or permission requests, contact: **gmrafi365@gmail.com**

---

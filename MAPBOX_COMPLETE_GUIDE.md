# 🗺️ SIMPLE MAPBOX TUTORIAL - Create & Embed Map

## 🎯 **EXACTLY What You Need:**
1. Create map in Mapbox Studio
2. Upload your data (addresses)
3. Get embed URL
4. Put in iframe

---

## 📋 **Step 1: Create Mapbox Account**
1. Go to: **https://studio.mapbox.com/**
2. Click **"Sign up"** (FREE)
3. Use your email

---

## 📊 **Step 2: Prepare Your Data**

### Your Excel/CSV should look like this:
```
address
ধানমন্ডি, ঢাকা
চট্টগ্রাম
সিলেট সদর, সিলেট
রাজশাহী
খুলনা সদর, খুলনা
```

**Just ONE column with addresses!**

---

## 🚀 **Step 3: Create Map in Mapbox Studio**

### 3.1 Create New Style
1. In Mapbox Studio, click **"New style"**
2. Choose **"Streets"** template
3. Click **"Customize Streets"**

### 3.2 Add Your Data
1. Click **"Layers"** (left sidebar)
2. Click **"+ Add layer"**
3. Click **"Upload data"**
4. Upload your CSV file
5. Mapbox will **automatically** find coordinates for your addresses

### 3.3 Style Your Data
1. After upload, choose **"Circles"** or **"Heatmap"**
2. Set **Size** based on count
3. Set **Color** based on density
4. Adjust **Opacity** to 0.7

### 3.4 Publish Map
1. Click **"Publish"** (top right)
2. Confirm publish

---

## � **Step 4: Get Embed URL**

### 4.1 Share Map
1. Click **"Share"** button
2. Choose **"Third party"**
3. Copy the **iframe URL** (not the full iframe code, just the URL part)

### 4.2 Example URL:
```
https://api.mapbox.com/styles/v1/your-username/your-map-id.html?title=false&access_token=your-token
```

---

## � **Step 5: Add to Your Website**

1. Open `simple-map.html`
2. Replace `YOUR_MAPBOX_SHARE_URL` with your actual URL
3. Done!

---

## 🎉 **That's It!**

### ✅ **Result:**
- ✅ Professional map
- ✅ No coding required
- ✅ Automatic geocoding
- ✅ Embed anywhere
- ✅ No personal data shown

### 📞 **If You Get Stuck:**
1. **Address not found?** → Make sure district name is in Bangla
2. **Map not showing?** → Check if URL is correct
3. **Styling issues?** → Use Mapbox Studio's style editor

---

## 🔥 **Pro Tips:**
1. **Data Limit:** Free plan = 50,000 requests/month (more than enough)
2. **Privacy:** Only show district counts, no personal info
3. **Updates:** Re-upload CSV to update data anytime

**Total Time: 10-15 minutes max!** 🚀

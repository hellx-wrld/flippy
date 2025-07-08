# 📋 BACKUP CHECKLIST - SEBELUM GANTI LAPTOP

## 🎯 **YANG HARUS DI-BACKUP (PRIORITAS TINGGI)**

### **1. Environment Variables (.env file)**
```env
DISCORD_TOKEN=your_bot_token_here
MONGODB_URI=your_mongodb_connection_string
PREFIX=$
BOT_OWNER_ID=your_discord_id
# ... other configs
```
**📁 Location**: `c:\Users\ADMIN\Desktop\Flippy Flip\.env`
**💾 Action**: Copy file atau screenshot isinya

### **2. Discord Bot Token**
- **Location**: Discord Developer Portal
- **URL**: https://discord.com/developers/applications
- **Action**: Screenshot atau save token di password manager

### **3. MongoDB Connection String**
- **Location**: MongoDB Atlas dashboard
- **URL**: https://cloud.mongodb.com/
- **Action**: Copy connection string, save cluster info

### **4. GitHub Repository (PALING PENTING)**
- **URL**: https://github.com/elingap666/flippy.github.io
- **Status**: ✅ Sudah aman di cloud
- **Action**: Pastikan semua changes sudah di-push

---

## 📂 **FILES YANG PERLU DI-COPY**

### **Essential Files**
```
c:\Users\ADMIN\Desktop\Flippy Flip\
├── .env                    ← WAJIB backup!
├── package.json           ← Dependencies list
├── src/config.js          ← Bot configuration  
├── docs/                  ← Web dashboard files
└── README.md              ← Project documentation
```

### **Optional Files (Bisa di-regenerate)**
```
├── node_modules/          ← Skip (npm install ulang)
├── assets/generated/      ← Profile images (bisa generate ulang)
├── src/logs/             ← Log files (tidak penting)
└── package-lock.json     ← Auto-generated
```

---

## 💾 **CARA BACKUP**

### **Metode 1: GitHub (Recommended)**
```bash
1. Pastikan semua changes sudah di-commit
2. Push ke GitHub: git push origin master
3. Backup .env file secara terpisah (jangan push!)
```

### **Metode 2: External Drive**
```bash
1. Copy entire project folder ke USB/external drive
2. Include .env file
3. Save di cloud storage (Google Drive, OneDrive)
```

### **Metode 3: Cloud Backup**
```bash
1. Zip entire project folder
2. Upload ke Google Drive / OneDrive / Dropbox
3. Share link ke email pribadi
```

---

## 🌐 **DASHBOARD STATUS**

### **GitHub Pages**
- ✅ **Safe**: Hosted di GitHub, tidak tergantung laptop lokal
- ✅ **URL**: https://elingap666.github.io/flippy.github.io
- ✅ **Auto-backup**: Setiap push otomatis update

### **Database**
- ✅ **Safe**: MongoDB Atlas cloud-hosted
- ✅ **Data**: User profiles, inventory, achievements aman
- ✅ **Access**: Gunakan connection string yang sama

---

## 🚀 **SETUP DI LAPTOP BARU (RINGKAS)**

### **Quick Setup (15 menit)**
```bash
1. Install Node.js + GitHub Desktop
2. Clone: https://github.com/elingap666/flippy.github.io
3. npm install
4. Create .env dengan saved tokens
5. npm start
```

### **Verification**
```bash
✅ Bot online di Discord
✅ Commands respond properly  
✅ Database connection works
✅ Web dashboard accessible
✅ All features operational
```

---

## 🔐 **SECURITY NOTES**

### **Token Management**
- ✅ Save Discord bot token securely
- ✅ Save MongoDB credentials
- ✅ Don't share tokens publicly
- ✅ Use password manager for storage

### **GitHub Repository**
- ✅ Set repository to private (if needed)
- ✅ Never commit .env files
- ✅ Use .gitignore properly
- ✅ Regular commits untuk backup

**Project Anda 100% portable dan aman!** 🛡️

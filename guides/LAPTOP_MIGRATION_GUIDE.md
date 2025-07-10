# 💻 PANDUAN GANTI LAPTOP - FLIPPY FLIP PROJECT

## 🔄 **SCENARIO: PINDAH KE LAPTOP BARU**

### **📥 BACKUP YANG PERLU DISIMPAN**

#### **1. Source Code (Yang Paling Penting)**
- ✅ **GitHub Repository**: https://github.com/hellx-wrld/flippy.git
- ✅ **Full Project Folder**: `c:\Users\ADMIN\Desktop\Flippy Flip\`
- ✅ **Database Connection String**: File `.env` atau `config.js`
- ✅ **Bot Token**: Discord bot token dari Developer Portal

#### **2. Files Konfigurasi**
- ✅ `package.json` - Dependencies list
- ✅ `.env.example` - Environment variables template
- ✅ `src/config.js` - Bot configuration
- ✅ Documentation files (README, guides, etc.)

#### **3. Database & Assets**
- ✅ **MongoDB**: Data tersimpan di cloud (aman)
- ✅ **Profile images**: Generated images di folder `assets/generated/`
- ✅ **Custom backgrounds**: Jika ada custom images

---

## 🚀 **SETUP DI LAPTOP BARU**

### **Metode 1: GitHub Clone (Recommended)**

#### **Step 1: Install Prerequisites**
```bash
1. Install Node.js: https://nodejs.org/
2. Install GitHub Desktop: https://desktop.github.com/
3. Install VS Code: https://code.visualstudio.com/ (optional)
```

#### **Step 2: Clone Project**
```bash
1. Buka GitHub Desktop
2. File → Clone repository
3. URL: https://github.com/hellx-wrld/flippy.git
4. Local path: C:\Users\[USER]\Projects\flippy-flip\
```

#### **Step 3: Setup Environment**
```bash
1. Buka terminal/command prompt
2. cd ke folder project
3. npm install                    # Install dependencies
4. copy .env.example .env         # Create environment file
5. Edit .env dengan bot token dan database URL
```

#### **Step 4: Test & Run**
```bash
npm test                          # Run tests
npm start                         # Start bot
```

### **Metode 2: Manual Backup/Restore**

#### **Backup di Laptop Lama**
```bash
1. Copy entire project folder ke external drive/cloud
2. Export .env file (dengan token & database URL)
3. Backup folder node_modules (optional - bisa re-install)
```

#### **Restore di Laptop Baru**
```bash
1. Copy project folder ke laptop baru
2. Install Node.js
3. npm install                    # Re-install dependencies
4. Restore .env file
5. npm start                      # Test run
```

---

## 🌐 **WEB DASHBOARD**

### **GitHub Pages (Sudah Aman)**
- ✅ **URL tetap sama**: https://elingap666.github.io/flippy.github.io
- ✅ **Auto-hosted**: Tidak perlu setup ulang
- ✅ **Update**: Clone repo → edit → push → auto-update

### **Local Dashboard Development**
```bash
1. Clone repository
2. Edit files di docs/ folder
3. Test lokal: open docs/index.html di browser
4. Push changes → GitHub Pages auto-update
```

---

## 💾 **DATABASE (MongoDB Cloud)**

### **Keamanan Data**
- ✅ **Data tetap aman**: MongoDB Atlas cloud-hosted
- ✅ **No data loss**: Database tidak tergantung laptop lokal
- ✅ **Access**: Gunakan connection string yang sama

### **Setup di Laptop Baru**
```bash
1. Gunakan MONGODB_URI yang sama di .env
2. Test connection: npm run test
3. Data user, inventory, achievements tetap utuh
```

---

## 🔐 **DISCORD BOT TOKEN**

### **Backup Token**
```bash
1. Simpan token di password manager (1Password, Bitwarden)
2. Atau screenshot Discord Developer Portal
3. Atau simpan di .env backup file
```

### **Setup di Laptop Baru**
```bash
1. Copy token ke .env file baru
2. Bot akan langsung connect dengan data yang sama
3. Tidak perlu re-invite bot ke server
```

---

## 📦 **DEPENDENCIES**

### **Auto-Install**
```bash
npm install                       # Install semua dari package.json
```

### **Global Packages (Optional)**
```bash
npm install -g nodemon           # Development auto-restart
npm install -g prettier          # Code formatting
```

---

## 🔧 **DEVELOPMENT TOOLS**

### **Recommended Setup**
```bash
1. VS Code + Extensions:
   - Node.js Extension Pack
   - Prettier Code Formatter
   - Discord.js Snippets
   - MongoDB for VS Code

2. GitHub Desktop
3. Node.js LTS version
4. MongoDB Compass (database GUI - optional)
```

---

## ✅ **QUICK SETUP CHECKLIST**

- [ ] Node.js installed
- [ ] GitHub Desktop installed
- [ ] Repository cloned
- [ ] `npm install` completed
- [ ] `.env` file configured with tokens
- [ ] `npm test` passed
- [ ] `npm start` successful
- [ ] Bot online di Discord
- [ ] Web dashboard accessible
- [ ] Database connected

---

## 🆘 **TROUBLESHOOTING**

### **Common Issues**

**Bot tidak connect:**
- Check Discord bot token di .env
- Verify internet connection
- Check bot permissions di Discord server

**Database error:**
- Verify MONGODB_URI di .env
- Check IP whitelist di MongoDB Atlas
- Test connection dengan MongoDB Compass

**Dependencies error:**
- Delete node_modules folder
- Delete package-lock.json
- Run `npm install` again

**Web dashboard tidak update:**
- Check GitHub repository
- Verify GitHub Pages settings
- Clear browser cache

---

## 💡 **BEST PRACTICES**

### **Regular Backups**
- ✅ Push code ke GitHub regularly
- ✅ Export database backup monthly (optional)
- ✅ Save environment variables securely
- ✅ Document custom configurations

### **Version Control**
- ✅ Commit changes dengan descriptive messages
- ✅ Use branches untuk experimental features
- ✅ Tag major versions (v1.0, v2.0, etc.)

### **Security**
- ✅ Never commit .env file ke GitHub
- ✅ Use environment variables untuk sensitive data
- ✅ Regular token rotation (quarterly)
- ✅ Monitor bot activity logs

**Project Anda fully portable dan aman untuk laptop baru!** 🎉

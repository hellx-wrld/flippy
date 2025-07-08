# 🚀 QUICK START - GITHUB DESKTOP

## ⚡ **LANGKAH CEPAT (5 MENIT)**

### **1. Clone Repository**
- Buka **GitHub Desktop**
- **File** → **Clone repository** → **URL**
- URL: `https://github.com/elingap666/flippy.github.io`
- Local path: `C:\Users\ADMIN\GitHub\flippy.github.io` (atau pilih sendiri)
- **Clone**

### **2. Copy Dashboard Files**
- Buka folder: `c:\Users\ADMIN\Desktop\Flippy Flip\docs\`
- **Select All** (Ctrl+A) semua files
- **Copy** (Ctrl+C)
- Buka folder repository yang baru di-clone
- **Paste** (Ctrl+V) di ROOT folder (bukan dalam folder docs)

### **3. Deploy ke GitHub**
- Kembali ke **GitHub Desktop**
- Akan muncul **5 changed files** di sidebar
- **Summary**: "Add GitHub Pages dashboard"
- **Commit to master**
- **Push origin**

### **4. Enable GitHub Pages**
- Browser: https://github.com/elingap666/flippy.github.io
- **Settings** → **Pages**
- **Branch**: master, **Folder**: / (root)
- **Save**

### **5. Live Dashboard**
- URL: https://elingap666.github.io/flippy.github.io
- Ready in 2-5 minutes! 🎉

---

## 📁 **FILE STRUCTURE FINAL**

```
flippy.github.io/           ← Repository root
├── index.html              ← Dashboard utama
├── _config.yml             ← Jekyll config
├── robots.txt              ← SEO
├── sitemap.xml             ← Sitemap
└── GITHUB_PAGES.md         ← Docs
```

## ✅ **CHECKLIST**

- [ ] GitHub Desktop installed & logged in
- [ ] Repository cloned to local computer  
- [ ] Dashboard files copied to repository root
- [ ] Changes committed and pushed
- [ ] GitHub Pages enabled (Settings → Pages)
- [ ] Dashboard live and accessible

**Total time: ~5 minutes** ⏱️

---

## 💻 **GANTI LAPTOP?**

### **✅ Yang Sudah Aman**
- **GitHub Repository**: Code tersimpan di cloud
- **MongoDB Database**: Data user di cloud (MongoDB Atlas)
- **Web Dashboard**: Auto-hosted di GitHub Pages

### **📋 Yang Perlu Di-Backup**
- **Bot Token**: Discord Developer Portal
- **Database URI**: MongoDB connection string
- **Environment file**: `.env` dengan semua tokens

### **🚀 Setup di Laptop Baru**
1. Install Node.js + GitHub Desktop
2. Clone repository: `https://github.com/elingap666/flippy.github.io`
3. `npm install`
4. Create `.env` dengan saved tokens
5. `npm start`

**Total setup time: ~15 menit** ⏱️

📖 **Detail**: See `LAPTOP_MIGRATION_GUIDE.md` & `BACKUP_CHECKLIST.md`

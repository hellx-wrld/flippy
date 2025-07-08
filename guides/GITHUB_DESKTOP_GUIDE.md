# 🖥️ PANDUAN GITHUB DESKTOP - FLIPPY FLIP

## 🚀 **SETUP REPOSITORY DENGAN GITHUB DESKTOP**

### **Langkah 1: Clone Repository**
1. **Buka GitHub Desktop**
2. **File** → **Clone repository**
3. **URL tab**
4. **Repository URL**: `https://github.com/elingap666/flippy.github.io`
5. **Local path**: Pilih folder yang mudah diakses (contoh: `C:\Users\ADMIN\GitHub\flippy.github.io`)
6. **Clone**

### **Langkah 2: Copy Dashboard Files**
1. **Buka Windows Explorer**
2. **Source**: `c:\Users\ADMIN\Desktop\Flippy Flip\docs\`
3. **Destination**: Folder repository yang baru di-clone
4. **Copy semua file** dari folder `docs/` ke dalam folder repository
5. **Struktur akhir**:
   ```
   C:\Users\ADMIN\GitHub\flippy.github.io\
   ├── index.html
   ├── _config.yml
   ├── robots.txt
   ├── sitemap.xml
   └── GITHUB_PAGES.md
   ```

### **Langkah 3: Commit dan Push**
1. **Kembali ke GitHub Desktop**
2. **Akan muncul changes** di sidebar kiri
3. **Summary**: Tulis "Add GitHub Pages dashboard"
4. **Description** (optional): "Premium dashboard with glassmorphism design"
5. **Commit to master** (atau main)
6. **Push origin**

## 📁 **STRUKTUR FOLDER YANG BENAR**

**❌ SALAH**: Jangan buat folder `docs/` di dalam repository
```
flippy.github.io/
└── docs/
    ├── index.html
    └── ...
```

**✅ BENAR**: File langsung di root repository
```
flippy.github.io/
├── index.html
├── _config.yml
├── robots.txt
└── ...
```

## ⚙️ **ENABLE GITHUB PAGES**

1. **Buka browser**: https://github.com/elingap666/flippy.github.io
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: master (atau main)
5. **Folder**: **/ (root)** ← PENTING: Bukan /docs
6. **Save**

## 🌐 **HASIL AKHIR**

- **URL Dashboard**: https://elingap666.github.io/flippy.github.io
- **Deployment time**: 2-5 menit setelah push
- **Auto-update**: Setiap kali push changes

## 🔄 **UPDATE DASHBOARD DI MASA DEPAN**

1. **Edit file** di folder local repository
2. **GitHub Desktop** akan detect changes
3. **Commit** dengan message yang jelas
4. **Push** ke GitHub
5. **GitHub Pages** akan auto-update

## 🎯 **TIPS GITHUB DESKTOP**

- **Sync regularly**: Klik Fetch origin untuk update
- **Branch protection**: Selalu bekerja di branch utama
- **Commit messages**: Tulis pesan yang jelas dan deskriptif
- **History**: Lihat commit history di tab History
- **Diff viewer**: Review changes sebelum commit

## 🚨 **TROUBLESHOOTING**

### **Jika Push Gagal**
- Check internet connection
- Pastikan login ke GitHub account yang benar
- Try: Repository → Repository settings → Reset to default

### **Jika Pages Tidak Muncul**
- Pastikan file `index.html` ada di root folder
- Check GitHub Pages settings (folder harus / root)
- Tunggu 10 menit untuk propagasi

### **Jika Dashboard Tidak Load**
- Check browser console (F12)
- Verify semua file ter-upload
- Clear browser cache (Ctrl+F5)

**Dashboard premium siap dengan GitHub Desktop!** 🎉

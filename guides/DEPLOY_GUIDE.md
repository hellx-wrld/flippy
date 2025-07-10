# 🚀 PANDUAN DEPLOY KE GITHUB PAGES

## 📁 Repository: https://github.com/hellx-wrld/flippy.git

### 🎯 **LANGKAH-LANGKAH DEPLOY**

#### 1. **Persiapan Files**
Pastikan semua file dalam folder `docs/` sudah siap:
- ✅ `docs/index.html` - Dashboard utama
- ✅ `docs/_config.yml` - Konfigurasi Jekyll
- ✅ `docs/GITHUB_PAGES.md` - Dokumentasi

#### 2. **Upload ke GitHub**
```bash
# Di dalam folder project
git add .
git commit -m "Add premium dashboard for GitHub Pages"

# Push ke branch yang sesuai (biasanya master atau main)
git push origin master
# atau jika menggunakan main:
# git push origin main
```

#### 3. **Enable GitHub Pages**
1. Buka repository: https://github.com/elingap666/flippy.github.io
2. Klik **Settings** (tab di atas)
3. Scroll ke bagian **Pages** (sidebar kiri)
4. Pada **Source**, pilih **Deploy from a branch**
5. **Branch**: pilih **master** (atau **main** jika tersedia)
6. **Folder**: pilih **/ docs**
7. Klik **Save**

#### 4. **Verifikasi Deployment**
- GitHub akan process deployment (2-5 menit)
- Dashboard akan tersedia di: **https://elingap666.github.io/flippy.github.io**
- Check status di Actions tab untuk melihat progress

### 🌐 **URL FINAL**
```
https://elingap666.github.io/flippy.github.io
```

### ⚡ **FITUR DASHBOARD**
- 📊 **Real-time statistics** (mock data)
- 🏆 **Interactive leaderboards**
- 🎨 **8 premium themes showcase**
- 📱 **Mobile responsive design**
- 🌙 **Dark mode dengan glassmorphism**
- 📚 **API documentation**

### 🔧 **UPDATE DASHBOARD**
Untuk update dashboard di masa depan:
1. Edit file di folder `docs/`
2. Commit dan push ke GitHub
3. GitHub Pages akan auto-update

### 🎨 **CUSTOMIZATION**
Edit `docs/index.html` untuk:
- Mengubah warna tema
- Menambah section baru
- Update mock data
- Menambah fitur interaktif

### 📊 **ANALYTICS INTEGRATION**
Untuk menambah Google Analytics:
```html
<!-- Di dalam <head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### 🔗 **CUSTOM DOMAIN (Opsional)**
Untuk menggunakan domain sendiri:
1. Beli domain (contoh: flippyflip.com)
2. Setting DNS CNAME ke `elingap666.github.io`
3. Tambah file `CNAME` di folder `docs/` dengan isi domain Anda
4. Update di GitHub Pages settings

**Dashboard premium siap go live!** 🎉

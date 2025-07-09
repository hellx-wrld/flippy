# 💻 Developer Commands Documentation

Dokumen ini menjelaskan semua command khusus developer yang tersedia di bot Flippy Flip.

## 🔒 Akses & Keamanan

Semua command developer hanya dapat digunakan oleh user ID yang terdaftar di:
- **Environment Variable:** `DEVELOPER_IDS` di file `.env`
- **Default Developer:** `445052615152238594`
- **Tambah Developer:** Edit `.env` dengan format: `DEVELOPER_IDS=id1,id2,id3`

---

## 📋 Daftar Command Developer

### 🔴 HIGH PRIORITY (Sudah Diimplementasi)

#### 1. `..dev stats` / `..stats`
**Deskripsi:** Menampilkan statistik performa bot real-time
**Usage:** `..stats`
**Fitur:**
- Memory usage (RSS, Heap)
- CPU load dan system info
- Bot uptime (days, hours, minutes)
- Jumlah guilds dan users
- Database connection status
- Discord API ping

#### 2. `..dev logs [jumlah] [level]` / `..logs`
**Deskripsi:** Menampilkan log bot terbaru
**Usage:** `..logs [number] [level]`
**Parameter:**
- `number`: Jumlah log (max 50, default 10)
- `level`: Filter level (all/error/warn/info, default all)
**Fitur:**
- Membaca dari file `bot.log` dan `error.log`
- Filter berdasarkan level
- Tampilan rapi dalam embed

#### 3. `..dev userinfo <@user|userID>` / `..userinfo`
**Deskripsi:** Menampilkan data lengkap user dari database
**Usage:** `..userinfo <@user|userID>`
**Fitur:**
- Balance, total earned/spent
- Level, XP, daily streak
- Status premium & tanggal berakhir
- Gaming statistics (games played/won, win rate)
- Tournament wins/losses
- Anti-cheat flags
- Inventory items (top 10)
- Achievements (top 5)
- Guild info jika ada

#### 4. `..dev maintenance [on/off] [reason]` / `..maintenance`
**Deskripsi:** Toggle mode maintenance bot
**Usage:** `..maintenance [on/off] [reason]`
**Fitur:**
- Mode ON: Bot hanya respon developer
- Mode OFF: Bot normal untuk semua user
- Custom reason untuk maintenance
- Status check tanpa parameter
- Terintegrasi dengan messageCreate event

---

### 🟡 MEDIUM PRIORITY (Sudah Diimplementasi)

#### 5. `..dev broadcast <pesan>` / `..broadcast`
**Deskripsi:** Kirim pengumuman ke semua server
**Usage:** `..broadcast <message>`
**Fitur:**
- Konfirmasi dengan button sebelum kirim
- Targeting channel otomatis (general, announcements, dll)
- Progress tracking dan error reporting
- Success rate statistics
- Safety timeout 30 detik untuk konfirmasi

#### 6. `..dev test [feature]` / `..test`
**Deskripsi:** Menjalankan system tests
**Usage:** `..test [feature]`
**Parameter:** `all|database|discord|commands|utils|memory`
**Fitur:**
- Test database connection & queries
- Test Discord API (ping, guilds, users)
- Test commands loading
- Test utility functions
- Test memory usage
- Overall pass/fail status

---

### 🔧 UTILITY COMMANDS (Sudah Diimplementasi)

#### 7. `..dev setcoin <@user|userID> <amount>` / `..setcoin`
**Deskripsi:** Set balance user langsung
**Usage:** `..setcoin <@user|userID> <amount>`
**Aliases:** `setbalance`, `devsetcoin`
**Fitur:**
- Set balance ke nilai tertentu
- Validasi amount (0-999,999,999)
- Tampilkan old balance vs new balance
- Auto-create user jika belum terdaftar
- Log aktivitas developer

#### 8. `..dev addachievement <@user|userID> <item> [type]` / `..addachievement`
**Deskripsi:** Tambah achievement atau badge ke user
**Usage:** `..addachievement <@user|userID> <achievement|badge> [type]`
**Aliases:** `giveachievement`, `devaddach`
**Fitur:**
- Auto-detect type jika tidak disebutkan
- Daftar achievements: `first_flip`, `millionaire`, `big_winner`, `veteran`, dll
- Daftar badges: `developer`, `moderator`, `vip`, `beta_tester`, dll
- Validasi duplikasi
- Help command dengan daftar lengkap

#### 9. `..dev resetuser <@user|userID> [type]` / `..resetuser`
**Deskripsi:** Reset data user dengan konfirmasi
**Usage:** `..resetuser <@user|userID> [type]`
**Aliases:** `clearuser`, `usereset`
**Fitur:**
- Reset types: all, economy, progress, inventory, achievements, premium, stats, guild, anticheat
- Konfirmasi wajib dengan button
- Preview data yang akan direset
- Warning untuk reset berbahaya
- Irreversible action dengan timeout

#### 9. `..dev eval <code>` / `..eval` (Sudah Ada)
**Deskripsi:** Execute JavaScript code langsung
**Usage:** `..eval <code>`
**⚠️ DANGER:** Command ini sangat berbahaya, gunakan dengan hati-hati!

#### 10. `..dev reload [command|all]` / `..reload` (Sudah Ada)
**Deskripsi:** Reload command tanpa restart bot
**Usage:** `..reload [command|all]`
**Fitur:**
- Reload specific command
- Reload all commands
- Hot reload untuk development

---

## 🎯 Command yang Akan Datang (Belum Diimplementasi)

### 🔵 PLANNED FEATURES

#### 11. `..dev guildinfo [guildID]`
**Deskripsi:** Info lengkap server
**Fitur akan datang:**
- Member count dan bot statistics
- Command usage di server
- Premium users count
- Server settings/config

#### 12. `..dev db query <collection> <filter>`
**Deskripsi:** Query database MongoDB langsung
**⚠️ Fitur akan datang:** Read-only queries untuk keamanan

#### 13. `..dev backup`
**Deskripsi:** Database backup utilities
**Fitur akan datang:**
- Export user data
- Guild data backup
- Configuration backup

---

## 🔥 Quick Commands Cheatsheet

```bash
# Monitoring
..stats                           # Bot performance
..logs 20 error                   # Last 20 error logs
..userinfo @user                  # User database info

# Control
..maintenance on "System update"  # Enable maintenance
..maintenance off                 # Disable maintenance
..test database                   # Test specific feature
..test all                        # Run all tests

# User Management
..setcoin @user 50000            # Set user balance
..addachievement @user millionaire # Give achievement
..addachievement @user developer badge # Give badge
..resetuser @user economy        # Reset user economy data
..clearuser @user all           # Complete user reset (DANGER)

# Communication
..broadcast "New feature released!" # Announce to all servers

# Development
..eval client.guilds.cache.size  # Execute JS code
..reload help                    # Reload specific command
..reload all                     # Reload all commands
```

---

## 🛡️ Security Features

1. **Access Control:** Semua command cek `developers.includes(message.author.id)`
2. **Logging:** Semua aktivitas developer dicatat ke console dan log files
3. **Confirmation:** Command berbahaya (broadcast) memerlukan konfirmasi
4. **Validation:** Input validation untuk semua parameter
5. **Error Handling:** Try-catch wrapper untuk semua command
6. **Maintenance Mode:** Bot dapat di-maintenance tanpa mengganggu developer

---

## 📊 Status Implementasi

| Command | Status | Priority | Notes |
|---------|--------|----------|--------|
| stats | ✅ Selesai | HIGH | Monitoring performa |
| logs | ✅ Selesai | HIGH | Debug & troubleshooting |
| userinfo | ✅ Selesai | HIGH | Support user |
| maintenance | ✅ Selesai | HIGH | Bot control |
| broadcast | ✅ Selesai | MEDIUM | Komunikasi mass |
| test | ✅ Selesai | MEDIUM | Quality assurance |
| setcoin | ✅ Selesai | UTILITY | User management |
| addachievement | ✅ Selesai | UTILITY | User rewards |
| eval | ✅ Ada | EXISTING | Development |
| reload | ✅ Ada | EXISTING | Development |
| guildinfo | ⏳ Planned | LOW | Server analytics |
| db query | ⏳ Planned | LOW | Database management |
| backup | ⏳ Planned | LOW | Data protection |

---

## 🚀 Cara Penggunaan

1. **Setup Developer ID** di `.env`:
   ```bash
   DEVELOPER_IDS=445052615152238594
   ```

2. **Restart bot** untuk load command baru

3. **Test akses** dengan `..stats`

4. **Mulai gunakan** command sesuai kebutuhan

Semua command developer sudah siap digunakan dan terintegrasi dengan sistem keamanan bot! 🎉

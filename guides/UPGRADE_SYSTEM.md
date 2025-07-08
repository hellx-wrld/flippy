# 🔧 Sistem Upgrade Flippy Flip Bot

## Gambaran Umum

Sistem upgrade memungkinkan pemain untuk meningkatkan kemampuan mereka dalam menghasilkan Flippy Coins. Ada 4 jenis upgrade utama yang dapat ditingkatkan:

## 💰 Jenis-jenis Upgrade

### 1. Flip Income Multiplier
- **Deskripsi**: Meningkatkan pendapatan dari command `..flip`
- **Level Maksimum**: 50
- **Biaya Awal**: 1,000 coins
- **Peningkatan per Level**: +10% income
- **Multiplier Biaya**: 1.5x per level

**Contoh:**
- Level 0: Income 100% (normal)
- Level 5: Income 150% (+50% boost)
- Level 10: Income 200% (+100% boost)

### 2. Autoflip Enhancement  
- **Deskripsi**: Meningkatkan efisiensi autoflip (passive income)
- **Level Maksimum**: 25
- **Biaya Awal**: 5,000 coins
- **Peningkatan per Level**: 
  - Cooldown reduction: +30 detik
  - Capacity increase: +2 coins/hour
- **Multiplier Biaya**: 2.0x per level

**Contoh:**
- Level 0: Base rate normal
- Level 3: +90s efficiency, +6 coins/hour
- Level 5: +150s efficiency, +10 coins/hour

### 3. Luck Boost
- **Deskripsi**: Meningkatkan chance jackpot dan outcome yang lebih baik
- **Level Maksimum**: 20
- **Biaya Awal**: 10,000 coins
- **Peningkatan per Level**: +5% luck
- **Multiplier Biaya**: 2.5x per level

**Contoh:**
- Level 0: Jackpot chance 1%
- Level 2: Jackpot chance 11% (+10% luck)
- Level 5: Jackpot chance 26% (+25% luck)

### 4. Work Efficiency
- **Deskripsi**: Mengurangi cooldown command `..flip`
- **Level Maksimum**: 10
- **Biaya Awal**: 15,000 coins
- **Peningkatan per Level**: -1 detik cooldown
- **Multiplier Biaya**: 3.0x per level

**Contoh:**
- Level 0: Cooldown 10 detik
- Level 1: Cooldown 9 detik
- Level 3: Cooldown 7 detik (minimum 3 detik)

## 🎮 Cara Menggunakan

### Melihat Status Upgrade
```
..upgrade
..upgrade list
..upgrade show
```

### Melakukan Upgrade
```
..upgrade flip 1          # Upgrade flip 1 level
..upgrade autoflip 3      # Upgrade autoflip 3 level
..upgrade luck 1          # Upgrade luck 1 level
..upgrade efficiency 2    # Upgrade efficiency 2 level
```

### Aliases Command
```
..up flip 1       # Sama dengan upgrade
..enhance luck    # Alias untuk upgrade
```

## 💡 Strategi Upgrade yang Disarankan

### Pemula (0-50k coins)
1. **Flip Level 1-3** - ROI terbaik untuk income boost
2. **Efficiency Level 1** - Mengurangi cooldown untuk work lebih cepat

### Menengah (50k-500k coins)
1. **Flip Level 5-10** - Maksimum income boost
2. **Autoflip Level 3-5** - Passive income yang stabil
3. **Luck Level 2-3** - Better jackpot chances

### Lanjutan (500k+ coins)
1. **Maximalkan semua upgrade** secara bertahap
2. **Focus Autoflip** untuk passive income optimization  
3. **Efficiency** untuk rapid work completion

## 📊 Return on Investment (ROI)

**Flip Upgrade** (24 flips/hari, 500 coins rata-rata):
- Level 1: +1,200 coins/hari, Break-even dalam 1 hari
- Level 2: +1,200 coins/hari, Break-even dalam 2 hari  
- Level 3: +1,200 coins/hari, Break-even dalam 2 hari
- Level 5: +1,200 coins/hari, Break-even dalam 5 hari

## 🔄 Integrasi dengan Sistem Lain

### Command Flip
- Menggunakan flip upgrade untuk income multiplier
- Menggunakan luck upgrade untuk jackpot chance  
- Menggunakan efficiency upgrade untuk cooldown reduction

### Command Autoflip
- Menggunakan autoflip upgrade untuk enhanced hourly rate
- Menampilkan benefit upgrade dalam status

### Database User Model
```javascript
upgrades: {
    flip: { type: Number, default: 0 },
    autoflip: { type: Number, default: 0 },
    luck: { type: Number, default: 0 },
    efficiency: { type: Number, default: 0 }
}
```

## 🛡️ Validasi dan Keamanan

1. **Minimum Balance Check**: Memastikan user memiliki cukup coins
2. **Maximum Level Limit**: Mencegah upgrade melebihi level maksimum
3. **Batch Upgrade Limit**: Maksimum 10 level per command
4. **Cost Validation**: Menghitung total biaya dengan akurat

## 🎯 Tips untuk Player

1. **Prioritas Flip Upgrade** di awal untuk income boost cepat
2. **Investasi Autoflip** untuk passive income jangka panjang
3. **Luck Upgrade** efektif setelah flip rate tinggi
4. **Efficiency Upgrade** untuk player yang sangat aktif
5. **Balance antara semua upgrade** untuk optimasi maksimum

## 🚀 Pengembangan Lanjutan

Sistem ini dapat diperluas dengan:
- Upgrade untuk command lain (blackjack, slots, dll)
- Temporary boost upgrades
- Guild-wide upgrade benefits
- Achievement rewards untuk upgrade milestones
- Premium subscription upgrade bonuses

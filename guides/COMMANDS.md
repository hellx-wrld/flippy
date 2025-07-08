# 📋 Flippy Flip Bot - Complete Command List

## 🎮 General Commands

### Basic Information
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `help` | Show all available commands and bot information | `..help [command]` | 3s |
| `register` | Register your account to start playing | `..register` | - |
| `profile [@user]` | View your or another user's profile card | `..profile [@user]` | 5s |
| `stats [@user]` | View detailed statistics and achievements | `..stats [@user]` | 5s |

## 💰 Economy Commands

### Balance & Transactions
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `balance [@user]` | Check your or another user's balance | `..balance [@user]` | 3s |
| `daily` | Claim your daily reward (streak bonuses) | `..daily` | 24h |
| `topup` | View top-up packages and payment info | `..topup` | 5s |
| `pay <@user> <amount>` | Transfer coins to another user | `..pay @user 1000` | 5s |

### Work & Income
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `flip [amount]` | Flip a coin to earn money | `..flip 100` | 3s |
| `autoflip` | Check and claim your passive income | `..autoflip` | 5s |

## 🎯 Game Commands

### Casino Games
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `blackjack <bet>` | Play blackjack against the dealer | `..blackjack 500` | 10s |
| `slots <bet>` | Play the slot machine | `..slots 250` | 5s |
| `roulette <bet> <choice>` | Bet on roulette (red/black/green/number) | `..roulette 100 red` | 8s |
| `lottery [tickets]` | Buy lottery tickets for weekly drawing | `..lottery 5` | 30s |

### Skill Games
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `higherlower <bet>` | Guess if next number is higher or lower | `..higherlower 200` | 5s |
| `coinbattle <@user> <bet>` | Challenge another user to coin flip duel | `..coinbattle @user 500` | 15s |
| `numberbattle <@user> <bet>` | Number guessing duel with another user | `..numberbattle @user 300` | 15s |

## 🛍️ Shop & Items

### Shopping
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `shop [category]` | Browse available items in the shop | `..shop [tools/premium/consumables]` | 5s |
| `buy <item> [quantity]` | Purchase items from the shop | `..buy lucky_charm 1` | 3s |
| `inventory` | View your items and inventory | `..inventory` | 5s |
| `use <item>` | Use a consumable item from inventory | `..use energy_drink` | 5s |

### Item Categories
- **🔧 Tools**: Productivity boosters and utility items
- **⭐ Premium**: Exclusive items for premium subscribers
- **🍭 Consumables**: Single-use items with temporary effects
- **🎁 Special**: Event items and limited collectibles

## 🏆 Progression & Achievements

### Leveling System
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `level [@user]` | Check your or another user's level and XP | `..level [@user]` | 5s |
| `xp [@user]` | View detailed XP breakdown and sources | `..xp [@user]` | 5s |
| `leaderboard [type]` | View leaderboards (coins/level/streak) | `..leaderboard coins` | 10s |

### Achievements & Badges
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `achievements [@user]` | View unlocked achievements | `..achievements [@user]` | 5s |
| `badges [@user]` | Display earned badges and progress | `..badges [@user]` | 5s |

## 🔧 Upgrade System

### Character Progression
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `upgrade [type] [amount]` | Upgrade your abilities | `..upgrade flip 5` | 3s |
| `upgrade list` | View all available upgrades | `..upgrade list` | 5s |

### Upgrade Types
- **💰 Flip**: Increases flip command earnings (Max: 50 levels)
- **⚡ Autoflip**: Reduces cooldown and increases capacity (Max: 25 levels)
- **🍀 Luck**: Improves jackpot chances and outcomes (Max: 20 levels)
- **⚙️ Efficiency**: Reduces command cooldowns (Max: 10 levels)

## 🎨 Customization Commands

### Profile Customization
| Command | Description | Usage | Cooldown | Premium |
|---------|-------------|-------|----------|---------|
| `customize theme <theme>` | Change your profile theme | `..customize theme neon` | 5s | ⭐ |
| `customize color <hex>` | Set your accent color | `..customize color #ff6b6b` | 5s | ⭐ |
| `customize background <url>` | Set custom background image | `..customize background <url>` | 10s | ⭐ |
| `themes` | View all available profile themes | `..themes` | 5s | - |

### Available Themes
- **Default**: Classic blue gradient theme
- **Dark**: Sleek dark mode design
- **Neon**: Cyberpunk-inspired neon colors
- **Ocean**: Calm blue ocean waves
- **Sunset**: Warm orange and pink gradient
- **Forest**: Natural green forest theme
- **Gaming**: RGB gaming aesthetic
- **Minimal**: Clean minimalist design

## 📊 Premium Features

### Premium Commands
| Command | Description | Usage | Premium |
|---------|-------------|-------|---------|
| `premium` | View premium benefits and subscription info | `..premium` | - |
| `redeem <code>` | Redeem premium subscription code | `..redeem ABC123` | ⭐ |

### Premium Benefits
- **2x XP Multiplier**: Level up twice as fast
- **1.5x Coin Multiplier**: Earn 50% more coins
- **2x Max Bet Limit**: Bet up to 20,000 coins
- **Custom Profile Themes**: Access to exclusive themes
- **Custom Background Images**: Upload personal backgrounds
- **Priority Support**: Faster command processing
- **Exclusive Items**: Access to premium-only shop items
- **Advanced Analytics**: Detailed progress tracking

## ⚔️ PVP & Tournaments

### Player vs Player
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `duel <@user> <bet>` | Challenge another user to a duel | `..duel @user 1000` | 20s |
| `tournament` | View current tournament information | `..tournament` | 10s |
| `tournament join` | Join the current tournament | `..tournament join` | - |

## 🏛️ Guild System

### Guild Management
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `guild info` | View your guild information | `..guild info` | 5s |
| `guild create <name>` | Create a new guild | `..guild create "My Guild"` | - |
| `guild join <guild_id>` | Join an existing guild | `..guild join 123456` | - |
| `guild leave` | Leave your current guild | `..guild leave` | - |
| `guild bank [deposit/withdraw] <amount>` | Manage guild bank | `..guild bank deposit 5000` | 10s |

## 🔍 Information Commands

### Bot Information
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `ping` | Check bot latency and response time | `..ping` | 3s |
| `uptime` | View bot uptime and system info | `..uptime` | 5s |
| `invite` | Get bot invite link and support server | `..invite` | 5s |

### User Analytics
| Command | Description | Usage | Cooldown |
|---------|-------------|-------|----------|
| `analytics` | View your detailed usage statistics | `..analytics` | 10s |
| `activity [@user]` | Check user activity and last seen | `..activity [@user]` | 5s |

## 👑 Developer Commands

### Admin Only (Restricted Access)
| Command | Description | Usage |
|---------|-------------|-------|
| `givesub <@user> <duration>` | Grant premium subscription | `..givesub @user 30d` |
| `givetopup <@user> <amount>` | Add coins to user balance | `..givetopup @user 10000` |
| `eval <code>` | Execute JavaScript code | `..eval console.log('test')` |
| `reload <command>` | Reload a specific command | `..reload balance` |
| `moderation <action> <@user>` | User moderation actions | `..moderation ban @user` |

## 🎯 Command Usage Tips

### General Tips
- Use `..help <command>` for detailed command information
- Commands are case-insensitive
- Most commands have aliases for convenience
- Premium users have reduced cooldowns

### Common Aliases
- `bal` → `balance`
- `inv` → `inventory`
- `lb` → `leaderboard`
- `prof` → `profile`
- `ach` → `achievements`

### Command Examples
```
# Check your balance
..balance

# Flip a coin with 500 coins
..flip 500

# Buy a lucky charm
..buy lucky_charm

# View coin leaderboard
..leaderboard coins

# Customize profile theme (Premium)
..customize theme neon

# Challenge someone to a duel
..duel @friend 1000
```

## ⚠️ Important Notes

### Cooldowns
- Cooldowns prevent spam and ensure fair gameplay
- Premium users enjoy reduced cooldowns
- Some commands have global cooldowns

### Betting Limits
- Regular users: Max 10,000 coins per bet
- Premium users: Max 20,000 coins per bet
- Minimum bet: Usually 1-100 coins depending on game

### Premium Features
- Many customization features require premium subscription
- Premium benefits include multipliers and exclusive content
- Subscription can be purchased through admin or developers

### Support
- Use `..help` for command assistance
- Join our support server for additional help
- Report bugs to administrators

---

*Last updated: July 2025 | For the latest features and updates, check the bot's help system*

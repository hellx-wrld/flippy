# 📁 Flippy Flip Bot - Project Structure

## 🏗️ Architecture Overview

This project follows a modular architecture with clear separation of concerns:

- **Commands**: Organized by access level (public/developer) and functionality
- **Database**: Mongoose models with schema validation
- **Events**: Discord.js event handlers
- **Utils**: Reusable utility functions and canvas operations
- **Web**: Express.js dashboard with premium design
- **Tests**: Comprehensive testing suite for all systems

## 📂 Directory Structure

```
Flippy Flip/
├── 📄 .env                          # Environment configuration
├── 📄 .gitignore                    # Git ignore rules
├── 📄 package.json                  # NPM configuration and scripts
├── 📄 README.md                     # Main project documentation
├── 📄 PROJECT_STRUCTURE.md          # This file
│
├── 📁 scripts/                      # Database management utilities
│   ├── 📄 reset-database.js         # Interactive database reset tool
│   └── 📄 reset-database-simple.js  # Quick reset with sample data
│
├── 📁 src/                          # Main source code
│   ├── 📄 bot.js                    # Discord bot entry point
│   ├── 📄 config.js                 # Configuration management
│   │
│   ├── 📁 commands/                 # Bot command implementations
│   │   ├── 📁 developer/            # Admin-only commands
│   │   │   ├── 📄 eval.js           # Code execution (dangerous)
│   │   │   ├── 📄 givesub.js        # Grant premium subscriptions
│   │   │   ├── 📄 givetopup.js      # Add topup credits
│   │   │   ├── 📄 moderation.js     # User moderation tools
│   │   │   └── 📄 reload.js         # Hot-reload commands
│   │   │
│   │   └── 📁 public/               # User-accessible commands
│   │       ├── 📄 achievement.js    # Achievement system
│   │       ├── 📄 analytics.js      # User analytics
│   │       ├── 📄 badge.js          # Badge management
│   │       ├── 📄 customize.js      # Profile customization
│   │       ├── 📄 guild.js          # Guild/clan management
│   │       ├── 📄 help.js           # Command help system
│   │       ├── 📄 leaderboard.js    # Rankings and leaderboards
│   │       ├── 📄 level.js          # Leveling system
│   │       ├── 📄 ping.js           # Bot latency check
│   │       ├── 📄 profile.js        # User profile with canvas
│   │       ├── 📄 tournament.js     # Tournament system
│   │       ├── 📄 upgrade.js        # Upgrade system
│   │       ├── 📄 xp.js             # XP management
│   │       │
│   │       ├── 📁 economy/          # Economy-related commands
│   │       │   ├── 📄 balance.js    # Check user balance
│   │       │   ├── 📄 bank.js       # Banking system
│   │       │   ├── 📄 buy.js        # Item purchasing
│   │       │   ├── 📄 collect.js    # AutoFlip collection
│   │       │   ├── 📄 daily.js      # Daily rewards
│   │       │   ├── 📄 flip.js       # Coin flip game
│   │       │   ├── 📄 gacha.js      # Gacha box system
│   │       │   ├── 📄 inventory.js  # Item inventory
│   │       │   ├── 📄 pay.js        # Transfer coins
│   │       │   ├── 📄 shop.js       # Item shop
│   │       │   ├── 📄 subscription.js # Premium subscriptions
│   │       │   ├── 📄 topup.js      # Topup credits
│   │       │   ├── 📄 trade.js      # Player trading
│   │       │   └── 📄 use.js        # Use items
│   │       │
│   │       └── 📁 games/            # Game commands
│   │           ├── 📄 blackjack.js  # Card game
│   │           ├── 📄 coinbattle.js # PVP coin battle
│   │           ├── 📄 guess.js      # Number guessing
│   │           ├── 📄 higherlower.js # Higher/lower game
│   │           ├── 📄 lottery.js    # Lottery system
│   │           ├── 📄 numberbattle.js # PVP number battle
│   │           ├── 📄 race.js       # Racing game
│   │           ├── 📄 roulette.js   # Casino roulette
│   │           ├── 📄 rps.js        # Rock paper scissors
│   │           └── 📄 slots.js      # Slot machine
│   │
│   ├── 📁 database/                 # Database layer
│   │   ├── 📄 connect.js            # MongoDB connection setup
│   │   └── 📁 models/               # Mongoose schemas
│   │       ├── 📄 guild-clan.js     # Guild/clan data model
│   │       ├── 📄 guild.js          # Discord guild settings
│   │       ├── 📄 marketplace.js    # Marketplace listings
│   │       ├── 📄 tournament.js     # Tournament data
│   │       └── 📄 user.js           # User profile and stats
│   │
│   ├── 📁 events/                   # Discord.js event handlers
│   │   ├── 📄 messageCreate.js      # Message processing
│   │   └── 📄 ready.js              # Bot startup event
│   │
│   ├── 📁 handlers/                 # Core system handlers
│   │   ├── 📄 commandHandler.js     # Command loading and execution
│   │   └── 📄 eventHandler.js       # Event system management
│   │
│   ├── 📁 logs/                     # Application logs
│   │   └── 📁 analytics/            # Analytics data files
│   │       ├── 📄 activity_*.json   # Daily activity logs
│   │       └── 📄 sessions_*.json   # User session data
│   │
│   ├── 📁 utils/                    # Utility functions
│   │   ├── 📄 canvasUtils.js        # Profile card generation
│   │   ├── 📄 functions.js          # Helper functions
│   │   ├── 📄 logger.js             # Logging utilities
│   │   └── 📄 userTracker.js        # User activity tracking
│   │
│   └── 📁 web/                      # Web dashboard
│       └── 📄 dashboard.js          # Express server with premium UI
│
├── 📁 tests/                        # Testing suite
│   ├── 📄 test-all-systems.js       # Comprehensive system test
│   ├── 📄 test-advanced-items.js    # Advanced item functionality
│   ├── 📄 test-new-items.js         # New item system test
│   ├── 📄 test-premium-benefits.js  # Premium feature testing
│   ├── 📄 test-premium-logic.js     # Premium logic validation
│   ├── 📄 test-profile-canvas.js    # Canvas rendering tests
│   ├── 📄 test-profile-customization.js # Profile customization
│   ├── 📄 test-upgrade-system.js    # Upgrade system testing
│   ├── 📄 test-user-tracking.js     # User tracking validation
│   ├── 📁 integration/              # Integration tests
│   └── 📁 unit/                     # Unit tests
│
├── 📁 docs/                         # Documentation
│   ├── 📄 UPGRADE_SYSTEM.md         # Upgrade system documentation
│   └── 📁 features/                 # Feature documentation
│       ├── 📄 ADVANCED_ITEMS_REPORT.md      # Advanced items guide
│       ├── 📄 NEW_ITEMS_REPORT.md           # New items documentation
│       ├── 📄 PREMIUM_BENEFITS_REPORT.md    # Premium benefits guide
│       ├── 📄 PROFILE_CANVAS_DOCS.md        # Profile canvas documentation
│       ├── 📄 PROFILE_CUSTOMIZATION_DOCS.md # Customization guide
│       └── 📄 WEB_DASHBOARD_DOCS.md         # Dashboard documentation
│
├── 📁 demos/                        # Demo and example files
│   ├── 📄 demo-profile-customization.js    # Profile customization demo
│   ├── 📄 demo-topup-subscription-v2.js    # Enhanced subscription demo
│   ├── 📄 demo-topup-subscription.js       # Basic subscription demo
│   ├── 📄 demo-upgrade-system.js           # Upgrade system demo
│   └── 📁 visual/                   # Visual demonstration images
│       ├── 📄 demo-*.png            # Various feature screenshots
│       └── 📄 test-profile-*.png    # Profile theme examples
│
└── 📁 assets/                       # Static assets
    ├── 📁 demo-images/              # Demo image files
    ├── 📁 generated/                # Generated profile images
    │   └── 📄 test-profile-*.png    # Generated profile examples
    └── 📁 test-images/              # Test image assets
```

## 🔧 Key Components

### **Bot Core (`src/bot.js`)**
- Main Discord client initialization
- Event and command handler setup
- Database connection management
- Error handling and logging

### **Command System (`src/commands/`)**
- **Developer Commands**: Administrative tools with restricted access
- **Public Commands**: User-accessible features organized by category
- **Economy Commands**: Financial system, items, and transactions
- **Game Commands**: Entertainment and gambling features

### **Database Layer (`src/database/`)**
- **Models**: Mongoose schemas for data validation
- **Connection**: MongoDB setup with error handling
- **User Model**: Comprehensive user data with premium features
- **Guild/Tournament Models**: Social and competitive features

### **Utility Systems (`src/utils/`)**
- **Canvas Utils**: Profile card generation with @napi-rs/canvas
- **Functions**: Helper functions for calculations and formatting
- **User Tracker**: Activity monitoring and analytics
- **Logger**: Structured logging for debugging and monitoring

### **Web Dashboard (`src/web/`)**
- **Premium UI**: Dark mode with glassmorphism design
- **Real-time Analytics**: Live statistics and user tracking
- **Responsive Design**: Mobile-friendly interface
- **RESTful API**: JSON endpoints for data access

### **Testing Suite (`tests/`)**
- **System Tests**: End-to-end functionality validation
- **Feature Tests**: Individual component testing
- **Canvas Tests**: Image generation verification
- **Premium Tests**: Subscription and benefit validation

## 🚀 Development Workflow

### **1. Local Development**
```bash
npm run dev          # Start bot with auto-reload
npm run dashboard:dev # Start dashboard with auto-reload
```

### **2. Testing**
```bash
npm run test         # Run all tests
npm run test:profile # Test specific features
```

### **3. Database Management**
```bash
npm run reset-db     # Quick reset with sample data
npm run reset-db:full # Interactive reset options
```

### **4. Production Deployment**
```bash
npm start           # Start production bot
npm run dashboard   # Start production dashboard
```

## 📊 Data Flow

1. **User Input** → Discord Message
2. **Command Handler** → Parse and validate
3. **Database Layer** → Read/write user data
4. **Business Logic** → Apply game rules and premium benefits
5. **Response Generation** → Create embeds, canvas images
6. **Discord API** → Send response to user

## 🔒 Security Features

- **Rate Limiting**: Prevent spam and abuse
- **Input Validation**: Sanitize all user inputs
- **Premium Verification**: Secure subscription validation
- **Database Indexing**: Optimized queries and performance
- **Error Handling**: Graceful failure management

## 🎨 Customization Points

- **Themes**: Add new profile themes in `canvasUtils.js`
- **Items**: Define new items in the shop and use commands
- **Games**: Create new games in the `games/` directory
- **Premium Benefits**: Extend premium features in relevant commands
- **Dashboard**: Customize UI in `dashboard.js` template

## 📈 Performance Considerations

- **Canvas Caching**: Profile images cached for performance
- **Database Indexing**: Optimized queries on userId fields
- **Memory Management**: Proper cleanup of resources
- **Rate Limiting**: API and command cooldowns
- **Lazy Loading**: Load resources only when needed

This structure ensures maintainability, scalability, and clear separation of concerns for the Flippy Flip Bot project.

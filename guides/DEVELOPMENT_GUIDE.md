# 🛠️ Development Guide - Flippy Flip Bot

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Testing](#testing)
5. [Database Management](#database-management)
6. [Adding New Features](#adding-new-features)
7. [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB running (local or cloud)
- Discord Bot Token

### Initial Setup
```bash
# Clone and setup
git clone <repository-url>
cd flippy-flip
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Validate setup
npm run setup-check

# Initialize database
npm run reset-db

# Start development
npm run dev
```

## 🏗️ Project Structure

```
src/
├── bot.js              # Main entry point
├── config.js           # Configuration management
├── commands/           # Command implementations
│   ├── developer/      # Admin commands
│   └── public/         # User commands
├── database/           # Database models and connection
├── events/             # Discord.js events
├── handlers/           # Core system handlers
├── utils/              # Utility functions
└── web/               # Web dashboard
```

## 🔄 Development Workflow

### 1. Starting Development
```bash
# Start bot with auto-reload
npm run dev

# Start dashboard with auto-reload
npm run dashboard:dev

# Run in separate terminals for full development
```

### 2. Making Changes
- Edit files in `src/`
- Bot automatically restarts on changes (nodemon)
- Test changes with Discord commands
- Use `npm run test` to validate functionality

### 3. Database Changes
```bash
# Reset database during development
npm run reset-db

# Use interactive reset for advanced options
npm run reset-db:full
```

## 🧪 Testing

### Available Test Scripts
```bash
npm run test                # Run all tests
npm run test:profile        # Test profile system
npm run test:premium        # Test premium features
npm run test:items          # Test item system
```

### Test Categories
- **System Tests**: End-to-end functionality
- **Feature Tests**: Individual component testing
- **Canvas Tests**: Profile card generation
- **Premium Tests**: Subscription validation

### Adding New Tests
1. Create test file in `tests/`
2. Follow existing test patterns
3. Include in `test-all-systems.js`
4. Add npm script if needed

## 🗄️ Database Management

### Models
- **User**: Complete user profile with premium features
- **Guild**: Server settings and guild system
- **Tournament**: Competition management
- **GuildClan**: Clan/guild social features

### Schema Updates
1. Edit model in `src/database/models/`
2. Update related commands
3. Test with sample data
4. Run migration if needed

### Sample Data
- Created automatically with `npm run reset-db`
- Includes users with different premium statuses
- Test guild and tournament data
- Useful for development and testing

## ✨ Adding New Features

### New Command Structure
```javascript
// src/commands/public/example.js
module.exports = {
    name: 'example',
    description: 'Example command description',
    category: 'utility',
    usage: '..example [options]',
    cooldown: 5,
    execute: async (message, args) => {
        // Command logic here
    }
};
```

### New Premium Feature
1. Add benefit to user model
2. Update premium commands (givesub.js, etc.)
3. Apply benefit in relevant commands
4. Update documentation
5. Test with premium users

### New Canvas Theme
1. Add theme to `src/utils/canvasUtils.js`
2. Update `customize.js` command
3. Test with `npm run test:profile`
4. Add to theme documentation

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check MongoDB is running
# Verify MONGODB_URI in .env
# Test connection with reset-db script
```

**Discord Bot Token Error**
```bash
# Verify DISCORD_TOKEN in .env
# Check bot permissions in Discord
# Ensure bot is invited to test server
```

**Canvas Errors**
```bash
# Check @napi-rs/canvas installation
# Verify profile customization data
# Test with npm run test:profile
```

**Premium Features Not Working**
```bash
# Check user premium status in database
# Verify subscription logic
# Test with npm run test:premium
```

### Debug Mode
```bash
# Enable debug logging
LOG_LEVEL=debug npm run dev

# Check logs directory
ls src/logs/debug/
```

### Performance Issues
- Monitor memory usage during development
- Use `npm run test` to check for memory leaks
- Check database query performance
- Profile canvas generation times

## 📊 Monitoring

### Web Dashboard
- Real-time statistics: `http://localhost:3000`
- User analytics: `http://localhost:3000/analytics`
- System health monitoring

### Log Files
- Error logs: `src/logs/error/`
- Debug logs: `src/logs/debug/`
- Analytics: `src/logs/analytics/`

## 🚀 Deployment

### Production Setup
1. Configure production environment variables
2. Set up MongoDB Atlas or production database
3. Configure Discord bot for production
4. Set up process manager (PM2)
5. Configure reverse proxy (nginx)

### Environment Variables
```env
# Production settings
NODE_ENV=production
LOG_LEVEL=info
ANALYTICS_ENABLED=true

# Security
JWT_SECRET=strong_random_secret
CORS_ENABLED=true
```

## 📚 Additional Resources

- **Discord.js Documentation**: https://discord.js.org/
- **MongoDB Documentation**: https://docs.mongodb.com/
- **Canvas API**: https://github.com/napi-rs/canvas
- **Project Documentation**: `docs/features/`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Add tests for new features
5. Update documentation
6. Submit pull request

## 💡 Tips for Development

- Use `npm run setup-check` to validate environment
- Test with different user types (premium, non-premium)
- Monitor performance with web dashboard
- Keep documentation updated
- Use meaningful commit messages
- Test thoroughly before deployment

Happy coding! 🎉

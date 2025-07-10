# Troubleshooting Guide
## Flippy Flip Discord Bot - Common Issues & Solutions

### 🚨 Critical Issues

#### Bot Won't Start

**Symptoms:**
- Bot crashes immediately on startup
- No "Bot is now online!" message
- Process exits with error code

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # Verify .env file exists and contains required variables
   ls -la .env
   cat .env.template  # Compare with your .env
   ```
   
   Required variables:
   - `BOT_TOKEN` - Valid Discord bot token
   - `MONGODB_URI` - MongoDB connection string
   - `BOT_OWNER_ID` - Your Discord user ID
   - `DEVELOPER_IDS` - Comma-separated developer IDs

2. **Validate Bot Token**
   ```javascript
   // Test token validity
   const { Client } = require('discord.js');
   const client = new Client({ intents: ['Guilds', 'GuildMessages'] });
   client.login('YOUR_BOT_TOKEN').catch(console.error);
   ```

3. **Check Node.js Version**
   ```bash
   node --version  # Should be 16.x or higher
   npm --version
   ```

#### Database Connection Issues

**Symptoms:**
- MongoDB connection timeout
- "Operation buffering timed out" errors
- Analytics/backup failures

**Solutions:**

1. **Check MongoDB URI**
   ```bash
   # Test connection manually
   mongosh "YOUR_MONGODB_URI"
   ```

2. **Network/Firewall Issues**
   ```bash
   # Test network connectivity
   ping cluster0.ybhtwnj.mongodb.net
   telnet cluster0.ybhtwnj.mongodb.net 27017
   ```

3. **Connection String Format**
   ```
   # Correct format:
   mongodb+srv://username:password@cluster.xyz.mongodb.net/database?retryWrites=true&w=majority
   
   # Common mistakes:
   - Missing password encoding for special characters
   - Wrong database name
   - Missing connection options
   ```

4. **Atlas Configuration**
   - Verify IP whitelist includes your server IP
   - Check user permissions
   - Verify cluster is running

#### Commands Not Loading

**Symptoms:**
- "Loaded 0 commands" message
- Commands don't respond
- Handler errors

**Solutions:**

1. **Check File Structure**
   ```bash
   # Verify command files exist
   ls -la src/commands/public/
   ls -la src/commands/developer/
   ```

2. **Validate Command Syntax**
   ```bash
   # Run command audit
   node scripts/audit-public-commands.js
   ```

3. **Check File Permissions**
   ```bash
   # Ensure files are readable
   chmod +r src/commands/**/*.js
   ```

### ⚠️ Warning Issues

#### Port 3000 Already in Use

**Symptoms:**
- "EADDRINUSE: address already in use :::3000"
- Dashboard won't start

**Solutions:**

1. **Find Process Using Port**
   ```powershell
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill
   ```

2. **Change Dashboard Port**
   ```javascript
   // In src/web/dashboard.js
   const PORT = process.env.DASHBOARD_PORT || 3001;
   ```

3. **Disable Dashboard (if not needed)**
   ```javascript
   // In src/bot.js
   // Comment out dashboard startup
   // await startDashboard();
   ```

#### Rate Limiting Issues

**Symptoms:**
- Users getting blocked unexpectedly
- "Rate limit exceeded" messages
- Commands not responding

**Solutions:**

1. **Check Rate Limit Configuration**
   ```javascript
   // In src/utils/rateLimiter.js
   // Adjust limits if too restrictive
   this.limits = {
       default: { requests: 10, window: 60000 }, // 10 requests per minute
       premium: { requests: 20, window: 60000 }  // 20 requests per minute
   };
   ```

2. **Clear Rate Limit Cache**
   ```javascript
   // Reset specific user
   rateLimiter.clearLimits('USER_ID');
   
   // Reset all limits
   rateLimiter.clearAllLimits();
   ```

#### Analytics Not Working

**Symptoms:**
- No analytics data
- "Failed to flush analytics batch" errors
- Empty analytics logs

**Solutions:**

1. **Check MongoDB Connection**
   - Verify database connection is stable
   - Check analytics collection permissions

2. **Review Analytics Configuration**
   ```javascript
   // In src/utils/analyticsTracker.js
   // Ensure buffer settings are appropriate
   this.bufferSize = 100;
   this.flushInterval = 30000; // 30 seconds
   ```

3. **Manual Analytics Test**
   ```javascript
   // Test analytics manually
   const analytics = require('./src/utils/analyticsTracker');
   await analytics.trackCommand('test', 'USER_ID', 'GUILD_ID');
   ```

### 🔧 Performance Issues

#### High Memory Usage

**Symptoms:**
- Bot using excessive RAM
- Gradual memory increase over time
- Out of memory errors

**Solutions:**

1. **Monitor Memory Usage**
   ```bash
   # Use production monitor
   node scripts/monitor-production.js
   ```

2. **Check for Memory Leaks**
   ```javascript
   // Add memory monitoring
   setInterval(() => {
       const usage = process.memoryUsage();
       console.log('Memory:', Math.round(usage.heapUsed / 1024 / 1024), 'MB');
   }, 300000); // Every 5 minutes
   ```

3. **Optimize Database Queries**
   - Use lean() for read-only queries
   - Implement pagination for large datasets
   - Close database connections properly

#### Slow Command Response

**Symptoms:**
- Commands take long to respond
- Discord interaction timeouts
- Users report lag

**Solutions:**

1. **Enable Performance Tracking**
   ```javascript
   // Use analytics performance tracking
   const startTime = Date.now();
   // ... command execution ...
   analyticsTracker.trackPerformance('commandName', Date.now() - startTime);
   ```

2. **Database Optimization**
   ```javascript
   // Add database indexes
   await db.collection('users').createIndex({ userId: 1 });
   await db.collection('guilds').createIndex({ guildId: 1 });
   ```

3. **Implement Caching**
   ```javascript
   // Cache frequently accessed data
   const cache = new Map();
   const getCachedData = (key) => {
       if (cache.has(key)) return cache.get(key);
       // Fetch from database
       const data = await fetchFromDB(key);
       cache.set(key, data);
       return data;
   };
   ```

### 🐛 Debugging Tools

#### Enable Debug Mode

```bash
# Add to .env
DEBUG=true
LOG_LEVEL=debug

# Or run with debug flag
NODE_ENV=development node src/bot.js
```

#### Log Analysis

```bash
# Monitor logs in real-time
tail -f src/logs/combined.log

# Search for specific errors
grep -i "error" src/logs/*.log

# Count error frequency
grep -c "error" src/logs/combined.log
```

#### Database Debugging

```javascript
// Enable mongoose debugging
mongoose.set('debug', true);

// Monitor database operations
const originalSend = mongoose.Query.prototype.exec;
mongoose.Query.prototype.exec = function() {
    console.log('Query:', this.getQuery());
    return originalSend.apply(this, arguments);
};
```

### 📞 Getting Help

#### Before Reporting Issues

1. **Check Logs**
   - Review error logs for stack traces
   - Check timing of errors
   - Look for patterns

2. **Test in Isolation**
   - Try individual commands
   - Test with minimal setup
   - Use test environment

3. **Gather Information**
   - Node.js version
   - Operating system
   - Discord.js version
   - Error messages with full stack trace

#### Emergency Procedures

1. **Bot Completely Down**
   ```bash
   # Enable maintenance mode
   node -e "
   const config = require('./src/config');
   config.maintenanceMode = true;
   console.log('Maintenance mode enabled');
   "
   ```

2. **Database Issues**
   ```bash
   # Create emergency backup
   node scripts/emergency-backup.js
   
   # Switch to backup database
   # Update MONGODB_URI in .env to backup instance
   ```

3. **Critical Security Issue**
   ```bash
   # Immediately rotate bot token
   # 1. Generate new token in Discord Developer Portal
   # 2. Update BOT_TOKEN in .env
   # 3. Restart bot
   ```

### 📋 Regular Maintenance

#### Daily Checks
- [ ] Bot uptime and responsiveness
- [ ] Error log review
- [ ] Backup verification
- [ ] Performance metrics

#### Weekly Maintenance
- [ ] Database optimization
- [ ] Log cleanup and archival
- [ ] Dependency updates
- [ ] Security audit

#### Monthly Tasks
- [ ] Full backup verification
- [ ] Performance analysis
- [ ] Feature usage review
- [ ] Documentation updates

---

## 🆘 Quick Reference

### Essential Commands
```bash
# Start bot
node src/bot.js

# Monitor production
node scripts/monitor-production.js

# Run tests
node tests/system/test-integration.js

# Audit commands
node scripts/audit-public-commands.js

# Check setup
node scripts/setup-check.js
```

### Important File Locations
- Logs: `src/logs/`
- Backups: `backups/`
- Config: `src/config.js`
- Environment: `.env`

### Emergency Contacts
- Use developer commands: `f!devstats`, `f!logs`, `f!maintenance`
- Check production monitor for alerts
- Review this troubleshooting guide

**Last Updated:** January 9, 2025

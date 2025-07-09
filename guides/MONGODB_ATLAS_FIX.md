# 🔧 MongoDB Atlas Connection Fix Guide

## ❌ Error: "Could not connect to any servers in your MongoDB Atlas cluster"

Even with IP whitelist set to `0.0.0.0/0`, this error can occur. Here are the **most common fixes**:

## 🚀 Quick Fixes (Try These First)

### 1. **Re-create IP Whitelist Entry**
Sometimes the `0.0.0.0/0` entry gets corrupted:
```
Atlas Dashboard → Security → Network Access
→ Delete existing 0.0.0.0/0 entry
→ Add IP Address → Allow access from anywhere (0.0.0.0/0)
→ Confirm
```

### 2. **Check Database User (Not Atlas Account)**
The credentials in your URI must be for a **database user**, not your Atlas account:
```
Atlas Dashboard → Security → Database Access
→ Ensure user exists with "Read and write to any database" role
→ Note: This is different from your Atlas login
```

### 3. **URL-Encode Password Special Characters**
If your password contains special characters, encode them:
```
@ = %40    # = %23    $ = %24    % = %25
: = %3A    / = %2F    ? = %3F    & = %26

Example:
Password: myp@ssw0rd!
Encoded:  myp%40ssw0rd!
```

## 🔍 Diagnostic Commands

Run these to identify the exact issue:

```bash
# Full connection diagnostic
npm run db:test

# Check all configurations
npm run setup-check

# Test with verbose logging
DEBUG=* npm start
```

## 📋 Step-by-Step Atlas Setup

### 1. **Create Database User**
```
Atlas Dashboard → Security → Database Access
→ Add New Database User
→ Username: flippy_user
→ Password: Generate secure password
→ Database User Privileges: Read and write to any database
→ Add User
```

### 2. **Configure Network Access**
```
Atlas Dashboard → Security → Network Access
→ Add IP Address
→ Allow access from anywhere: 0.0.0.0/0
→ Confirm
```

### 3. **Get Connection String**
```
Atlas Dashboard → Clusters → Connect
→ Connect your application
→ Node.js
→ Copy connection string
→ Replace <username>, <password>, <database>
```

### 4. **Format Your .env**
```bash
MONGODB_URI=mongodb+srv://flippy_user:your_password@cluster0.abc123.mongodb.net/flippy-flip?retryWrites=true&w=majority
```

## 🌐 Network Troubleshooting

### Test Internet Connectivity
```bash
# Test DNS resolution
nslookup cluster0.abc123.mongodb.net

# Test HTTPS connectivity
curl -I https://www.mongodb.com

# Test with different network
# Try mobile hotspot vs WiFi
```

### Common Network Issues
- **Firewall/Antivirus:** Add exception for Node.js
- **ISP Blocking:** Some ISPs block MongoDB ports (27017)
- **VPN/Proxy:** Try disabling temporarily
- **Corporate Network:** May block external database connections

## 🔧 Advanced Fixes

### 1. **Cluster Status**
```
Atlas Dashboard → Clusters
→ Check if cluster shows "Paused" or maintenance
→ Resume if paused
```

### 2. **Connection String Variants**
Try these alternative formats:

```bash
# Standard format
mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority

# With additional options
mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority&connectTimeoutMS=10000&socketTimeoutMS=45000

# Force IPv4
mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority&family=4
```

### 3. **Regional Issues**
- Try creating cluster in different region
- Some regions have connectivity issues from certain locations

## 🆘 Still Not Working?

### Contact Information
1. **Discord Support:** Join our support server
2. **MongoDB Atlas Support:** Check Atlas status page
3. **ISP Issues:** Contact your internet provider

### Create Support Ticket With:
```bash
# Run diagnostic and share output
npm run db:test > mongodb-diagnostic.txt

# Include:
- Your region/country
- ISP provider
- Atlas cluster region
- Error messages
- Diagnostic output
```

## ✅ Success Verification

When working correctly, you should see:
```
🔌 Connecting to MongoDB...
📍 Target: mongodb+srv://***:***@cluster0.abc123.mongodb.net/flippy-flip
✅ MongoDB Connected: cluster0-shard-00-02.abc123.mongodb.net:27017/flippy-flip
```

---

💡 **Pro Tip:** After fixing, the bot should connect within 10 seconds. If it takes longer, there may still be network issues.

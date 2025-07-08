# 📡 API Documentation - Flippy Flip Bot

## 🌐 Web Dashboard API

The Flippy Flip Bot includes a RESTful API through its web dashboard for accessing bot data and statistics.

### 🔗 Base URL
```
http://localhost:3000
```

## 📊 Available Endpoints

### **📈 Analytics Endpoints**

#### `GET /analytics`
**Description**: Comprehensive analytics dashboard
**Access**: Public
**Response**: HTML page with analytics data

#### `GET /api/analytics/summary`
**Description**: Analytics summary data
**Access**: Public
**Response**:
```json
{
  "totalUsers": 150,
  "activeUsers": 45,
  "totalCommands": 12500,
  "popularCommands": ["flip", "profile", "daily"],
  "economyStats": {
    "totalBalance": 2500000,
    "averageBalance": 16666,
    "totalTransactions": 8500
  },
  "premiumStats": {
    "totalSubscribers": 25,
    "conversionRate": 16.7,
    "revenue": 1250
  }
}
```

#### `GET /api/analytics/activity`
**Description**: User activity data
**Parameters**: 
- `days` (optional) - Number of days to include (default: 7)
**Response**:
```json
{
  "period": "7 days",
  "dailyActivity": [
    {
      "date": "2025-07-08",
      "commands": 245,
      "uniqueUsers": 32,
      "peakHour": 14
    }
  ],
  "commandDistribution": {
    "flip": 35,
    "profile": 20,
    "daily": 15,
    "shop": 10
  }
}
```

### **🏆 Leaderboard Endpoints**

#### `GET /leaderboard`
**Description**: Leaderboard dashboard
**Access**: Public
**Response**: HTML page with leaderboards

#### `GET /api/leaderboard/balance`
**Description**: Top users by balance
**Parameters**:
- `limit` (optional) - Number of users to return (default: 10)
**Response**:
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "123456789012345678",
      "username": "TopPlayer",
      "balance": 50000,
      "level": 25,
      "premium": true
    }
  ],
  "lastUpdated": "2025-07-08T15:30:00Z"
}
```

#### `GET /api/leaderboard/level`
**Description**: Top users by level
**Response**: Similar to balance leaderboard

#### `GET /api/leaderboard/games`
**Description**: Game-specific leaderboards
**Parameters**:
- `game` - Game type (flip, blackjack, slots, etc.)
**Response**:
```json
{
  "game": "blackjack",
  "leaderboard": [
    {
      "rank": 1,
      "userId": "123456789012345678",
      "wins": 125,
      "profit": 15000,
      "winRate": 68.5
    }
  ]
}
```

### **🏰 Guild Endpoints**

#### `GET /guilds`
**Description**: Guild statistics dashboard
**Access**: Public
**Response**: HTML page with guild data

#### `GET /api/guilds`
**Description**: All guild data
**Response**:
```json
{
  "guilds": [
    {
      "guildId": "123456789012345678",
      "name": "Elite Warriors",
      "level": 15,
      "memberCount": 18,
      "guildBank": 75000,
      "leader": "987654321098765432"
    }
  ],
  "totalGuilds": 25
}
```

#### `GET /api/guilds/:guildId`
**Description**: Specific guild information
**Response**:
```json
{
  "guildId": "123456789012345678",
  "name": "Elite Warriors",
  "description": "Top competitive guild",
  "level": 15,
  "xp": 12500,
  "guildBank": 75000,
  "leader": "987654321098765432",
  "officers": ["111111111111111111"],
  "members": ["222222222222222222", "333333333333333333"],
  "memberLimit": 20,
  "settings": {
    "publicJoin": true,
    "minLevelJoin": 5,
    "taxRate": 0.05
  },
  "createdAt": "2025-06-01T00:00:00Z"
}
```

### **🏅 Tournament Endpoints**

#### `GET /tournaments`
**Description**: Tournament dashboard
**Access**: Public
**Response**: HTML page with tournament information

#### `GET /api/tournaments`
**Description**: All tournament data
**Response**:
```json
{
  "tournaments": [
    {
      "tournamentId": "tournament_001",
      "name": "Weekly Flip Championship",
      "type": "flip",
      "status": "active",
      "participantCount": 32,
      "maxParticipants": 50,
      "prizePool": 25000,
      "entryFee": 500,
      "startDate": "2025-07-08T18:00:00Z",
      "endDate": "2025-07-15T18:00:00Z"
    }
  ]
}
```

#### `GET /api/tournaments/:tournamentId`
**Description**: Specific tournament details
**Response**:
```json
{
  "tournamentId": "tournament_001",
  "name": "Weekly Flip Championship",
  "type": "flip",
  "status": "active",
  "participants": ["123456789012345678", "987654321098765432"],
  "brackets": [],
  "prizePool": 25000,
  "entryFee": 500,
  "winner": null,
  "rules": "Standard flip tournament rules",
  "createdBy": "111111111111111111",
  "createdAt": "2025-07-01T00:00:00Z"
}
```

### **👤 User Endpoints**

#### `GET /api/users/:userId`
**Description**: Public user profile data
**Response**:
```json
{
  "userId": "123456789012345678",
  "level": 25,
  "xp": 12500,
  "subscribed": true,
  "guildId": "guild_001",
  "achievements": ["first_flip", "level_10", "premium_user"],
  "badges": ["early_adopter", "top_player"],
  "publicStats": {
    "gamesPlayed": 500,
    "gamesWon": 275,
    "winRate": 55,
    "favoriteGame": "blackjack"
  },
  "profileCustomization": {
    "theme": "neon",
    "accentColor": "#ff00ff"
  }
}
```

### **💰 Economy Endpoints**

#### `GET /api/economy/stats`
**Description**: Overall economy statistics
**Response**:
```json
{
  "totalCirculation": 5000000,
  "averageBalance": 12500,
  "inflation": 2.5,
  "transactionVolume": 125000,
  "itemStats": {
    "totalItems": 25,
    "mostPopular": "Lucky Charm",
    "averagePrice": 150
  },
  "premiumStats": {
    "subscribers": 45,
    "conversionRate": 18.2
  }
}
```

## 🔐 Authentication

### **API Keys** (Future Implementation)
```javascript
// Request headers
{
  "Authorization": "Bearer your_api_key_here",
  "Content-Type": "application/json"
}
```

### **Rate Limiting**
- **Public Endpoints**: 100 requests per minute per IP
- **Authenticated Endpoints**: 1000 requests per minute per key

## 📝 Request/Response Format

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-07-08T15:30:00Z"
}
```

### **Error Response**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "details": "User ID 123456789012345678 does not exist"
  },
  "timestamp": "2025-07-08T15:30:00Z"
}
```

## 🔍 Query Parameters

### **Common Parameters**
- `limit` - Number of results to return (default: 10, max: 100)
- `offset` - Number of results to skip (default: 0)
- `sort` - Sort field (e.g., 'balance', 'level', 'date')
- `order` - Sort order ('asc' or 'desc', default: 'desc')

### **Filter Parameters**
- `premium` - Filter by premium status (true/false)
- `active` - Filter by active users only
- `guild` - Filter by guild membership
- `level_min` - Minimum level filter
- `level_max` - Maximum level filter

## 📊 WebSocket Events (Future Implementation)

### **Real-time Updates**
```javascript
// Connect to WebSocket
const socket = io('http://localhost:3000');

// Listen for events
socket.on('userUpdate', (data) => {
  console.log('User updated:', data);
});

socket.on('newTransaction', (data) => {
  console.log('New transaction:', data);
});

socket.on('leaderboardUpdate', (data) => {
  console.log('Leaderboard changed:', data);
});
```

## 🛠️ Development Tools

### **API Testing**
```bash
# Test analytics endpoint
curl http://localhost:3000/api/analytics/summary

# Test leaderboard
curl http://localhost:3000/api/leaderboard/balance?limit=5

# Test specific user
curl http://localhost:3000/api/users/123456789012345678
```

### **Response Caching**
- **Analytics Data**: 5 minutes
- **Leaderboards**: 2 minutes
- **User Profiles**: 30 seconds
- **Tournament Data**: 1 minute

## 🚀 Performance Optimization

### **Database Optimization**
- Indexed queries for fast data retrieval
- Aggregation pipelines for complex statistics
- Connection pooling for concurrent requests

### **Caching Strategy**
- Redis cache for frequently accessed data
- In-memory caching for real-time statistics
- CDN for static assets

### **Response Compression**
- Gzip compression for JSON responses
- Image optimization for profile pictures
- Minified JavaScript and CSS

This API provides comprehensive access to bot data while maintaining performance and security standards.

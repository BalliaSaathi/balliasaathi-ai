# Ballia Saathi - Hostinger Deployment Guide

## 🌐 Deploy on Hostinger (balliasaathi.shop)

### Prerequisites
- Hostinger Account with Node.js support
- MongoDB Atlas account (free tier)
- Razorpay merchant account
- Domain: balliasaathi.shop

### Step 1: Prepare Backend for Hostinger

1. Create `backend/ecosystem.config.js` (PM2 config):
```javascript
module.exports = {
  apps: [{
    name: 'ballia-saathi-api',
    script: './src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

2. Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "echo 'No build needed'"
  }
}
```

### Step 2: Build Frontend

```bash
cd frontend
npm run build
```

This creates `frontend/build/` folder.

### Step 3: Upload to Hostinger

1. Connect via FTP/SFTP
   - Use Hostinger File Manager or FileZilla
   - Upload `backend` folder
   - Upload `frontend/build` contents to public_html

2. Directory structure on Hostinger:
```
public_html/
├── index.html (from frontend/build)
├── static/
├── backend/
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   └── .env
```

### Step 4: Environment Variables

Create `.env` in backend folder:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
API_URL=https://balliasaathi.shop
FRONTEND_URL=https://balliasaathi.shop
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Step 5: Install Dependencies

Via SSH (if available):
```bash
cd backend
npm install --production
```

### Step 6: Setup Reverse Proxy

Create `.htaccess` in `public_html`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Step 7: Configure Domain

1. Point DNS to Hostinger nameservers
2. Enable SSL certificate (free on Hostinger)
3. Setup redirects: http → https

### Step 8: Start Backend

Via Hostinger Control Panel:
1. Go to Node.js Applications
2. Create new application
3. Set entry point: `backend/src/index.js`
4. Set domain: balliasaathi.shop/api
5. Start application

### Step 9: Update API URLs

In `frontend/.env.production`:
```
REACT_APP_API_URL=https://balliasaathi.shop/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Step 10: SSL & HTTPS

- Hostinger provides free SSL
- Enable automatic HTTPS redirect
- Update all API calls to use HTTPS

## 🔧 Troubleshooting

### Port Issues
- Hostinger assigns ports dynamically
- Don't hardcode port, use `process.env.PORT`

### CORS Issues
```javascript
// In backend/src/index.js
const cors = require('cors');
app.use(cors({
  origin: 'https://balliasaathi.shop',
  credentials: true
}));
```

### MongoDB Connection
- Use MongoDB Atlas (cloud)
- Whitelist Hostinger IPs in MongoDB Atlas
- Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/ballia`

### Static Files
- Frontend build files go to `public_html`
- Backend API runs on separate process
- Configure reverse proxy to route `/api` to Node.js

## 📊 Monitoring

- Use PM2 for process management
- Enable logs: `pm2 logs`
- Monitor CPU/Memory: `pm2 monit`

## 🚀 Live URL

https://balliasaathi.shop

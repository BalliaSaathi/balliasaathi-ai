# Ballia Saathi - Grocery Delivery Platform

A complete grocery delivery ecosystem with Customer, Vendor, Rider, and Admin portals.

## 🌟 Features

### Customer Portal
- Browse products by category
- Real-time search and filters
- Shopping cart management
- Secure checkout with Razorpay
- Order tracking with real-time GPS
- Order history and reviews

### Vendor Portal
- Receive and manage orders
- Inventory management
- Sales analytics
- Payout management
- Store settings

### Rider Portal
- Accept delivery orders
- Real-time GPS tracking
- Delivery status updates
- Earnings dashboard
- Support chat

### Admin Dashboard
- User management (Customers, Vendors, Riders)
- Order monitoring
- Payment tracking
- Analytics and reports
- System settings

## 🛠️ Tech Stack

### Frontend
- React 18+
- Tailwind CSS
- Redux Toolkit
- React Router v6
- Axios
- Google Maps API

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Razorpay Integration
- Socket.io (Real-time updates)
- Nodemailer (Email notifications)

## 📦 Project Structure

```
ballia-saathi/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── config/
│   ├── package.json
│   └── .env.example
├── deployment.md
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB Account (MongoDB Atlas)
- Razorpay Account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/BalliaSaathi/balliasaathi-ai.git
cd balliasaathi-ai
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. Setup Frontend
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with API endpoint
npm start
```

## 🌐 Deployment on Hostinger

See `deployment.md` for detailed Hostinger deployment guide.

## 📝 License

Copyright © 2024 Ballia Saathi. All rights reserved.

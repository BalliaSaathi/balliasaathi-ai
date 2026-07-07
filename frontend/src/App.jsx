import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/customer/Home';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';
import CustomerOrders from './pages/customer/Orders';

import VendorDashboard from './pages/vendor/Dashboard';
import VendorOrders from './pages/vendor/Orders';
import VendorProducts from './pages/vendor/Products';
import VendorSettings from './pages/vendor/Settings';

import RiderDashboard from './pages/rider/Dashboard';
import RiderOrders from './pages/rider/AvailableOrders';
import RiderActiveOrders from './pages/rider/ActiveOrders';

import AdminDashboard from './pages/admin/Dashboard';
import AdminVendors from './pages/admin/Vendors';
import AdminRiders from './pages/admin/Riders';
import AdminOrders from './pages/admin/Orders';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer Routes */}
          <Route path="/" element={<CustomerHome />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/track/:orderId" element={<OrderTracking />} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/settings" element={<VendorSettings />} />

          {/* Rider Routes */}
          <Route path="/rider/dashboard" element={<RiderDashboard />} />
          <Route path="/rider/available-orders" element={<RiderOrders />} />
          <Route path="/rider/active-orders" element={<RiderActiveOrders />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/riders" element={<AdminRiders />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

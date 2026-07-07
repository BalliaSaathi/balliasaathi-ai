import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/authSlice';
import api from '../utils/api';
import { FaGoogle, FaPhone } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
      
      if (data.user.role === 'vendor') navigate('/vendor/dashboard');
      else if (data.user.role === 'rider') navigate('/rider/dashboard');
      else if (data.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">🛒 Ballia Saathi</h1>
          <p className="text-gray-600 mt-2">Grocery Delivery</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="rider">Rider</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex gap-4">
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <FaGoogle /> Google
          </button>
          <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <FaPhone /> Phone
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <a href="/register" className="text-green-600 font-semibold hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

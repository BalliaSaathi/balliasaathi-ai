import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import api from '../../utils/api';

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Snacks', 'Beverages'];

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      
      const { data } = await api.get(`/products?${params}`);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-green-600">🛒 Ballia Saathi</h1>
            
            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for groceries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="text-gray-600 text-2xl hover:text-green-600">
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Location */}
      <div className="bg-white border-b py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt className="text-green-600" />
          <span>Delivering to: Ballia, Uttar Pradesh</span>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? '' : cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                category === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 my-2">
                    <span className="flex items-center text-yellow-500 text-sm">
                      <FaStar /> {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">({product.reviews?.length || 0})</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-xs text-gray-500">{product.unit}</span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No products found</div>
        )}
      </div>
    </div>
  );
};

export default CustomerHome;

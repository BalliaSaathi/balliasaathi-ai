import React from 'react';

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

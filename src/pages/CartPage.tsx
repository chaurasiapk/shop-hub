import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

import { useCart } from "../context";

export const CartPage = () => {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCart();

  // --- If cart is empty ---
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingBag size={20} className="mr-2" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shopping Cart ({itemCount} items)
            </h1>
          </div>

          {/* Clear cart button */}
          <button
            onClick={clearCart}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Cart Items --- */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info and Controls */}
                  <div className="flex-1 space-y-4">
                    {/* Title & Category */}
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-600 capitalize mt-1">
                        {item.category}
                      </p>
                    </div>

                    {/* Quantity, Price & Remove Button */}
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price Summary */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>

                      {/* Remove Item */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>

              {/* Policy Note */}
              <div className="text-center text-sm text-gray-600">
                <p>Free shipping on orders over $50</p>
                <p className="mt-1">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

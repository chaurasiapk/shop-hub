import { Product } from "../types";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";

import { fetchProductById } from "../services/api";
import { useCart } from "../context";

export const ProductDetailPage = () => {
  // Get product ID from URL
  const { id } = useParams<{ id: string }>();

  // Local state
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  // Fetch product by ID
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await fetchProductById(Number(id));
        setProduct(productData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Add product to cart `quantity` times
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  // Render rating stars
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));

  // Show loader while fetching
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-blue-600 border-b-blue-600 border-l-blue-600 bg-white-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Show error or fallback
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">
            {error || "Product not found"}
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Category */}
              <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full capitalize">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-lg text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>

              {/* Extra Features */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Features
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    High-quality materials and construction
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Fast and reliable shipping
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    30-day return policy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Customer satisfaction guaranteed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Product } from "../types";

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

import { useCart } from "../context";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list"; // Optional prop to support grid or list view
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
}) => {
  const { addItem } = useCart();

  // Determine if the current view is list mode
  const isListView = useMemo(() => viewMode === "list", [viewMode]);

  // Add item to cart (prevents navigation on click)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Render star rating based on the product rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div
        className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 ${
          isListView ? "flex" : ""
        }`}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 ${
              isListView ? "max-w-[300px]" : ""
            }`}
          />

          {/* Floating Add to Cart (hover action) */}
          {/* <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-700 transform hover:scale-110"
          >
            <ShoppingCart size={16} />
          </button> */}
        </div>

        {/* Product Details */}
        <div className={`p-6 ${isListView ? "w-full" : ""}`}>
          {/* Category Label */}
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3 capitalize">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating Display */}
          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating.rate)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.count})
            </span>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex gap-4 items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>

            {/* Show shopping cart button for list view on mobile, Add to Cart button otherwise */}
            {isListView ? (
              <button
                onClick={handleAddToCart}
                className="md:hidden p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
              >
                <ShoppingCart size={16} />
              </button>
            ) : null}
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium text-sm ${
                isListView ? "hidden md:block" : ""
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

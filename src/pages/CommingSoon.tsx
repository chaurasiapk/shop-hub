import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * ComingSoon Component
 * Displays a full-screen message for upcoming features.
 */
export const CommingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icon */}
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            Our awesome new feature is coming soon. Stay tuned!
          </p>

          {/* Back to shop button */}
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingBag size={20} className="mr-2" />
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

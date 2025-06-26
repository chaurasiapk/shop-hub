import { ShoppingBag, Star, Truck, Shield, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

// Key homepage features with icons and descriptions
const features = [
  {
    icon: <Truck className="w-8 h-8 text-blue-600" />,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: <Headphones className="w-8 h-8 text-purple-600" />,
    title: "24/7 Support",
    description: "Round-the-clock customer support",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-600" />,
    title: "Quality Products",
    description: "Carefully curated high-quality items",
  },
];

// Main HomePage component
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* -------------------- Hero Section -------------------- */}
      <section className="relative bg-blue-600 text-white">
        {/* Overlay for darkening */}
        <div className="absolute inset-0 bg-black opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Hero Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Shop the latest trends and discover unique products from top
              brands around the world
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <ShoppingBag className="mr-2" size={20} />
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- Features Section -------------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

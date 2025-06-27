import { Routes, Route } from "react-router-dom";

// Importing all the route pages
import {
  CartPage,
  CommingSoon,
  HomePage,
  ProductDetailPage,
  ProductsPage,
} from "../pages";

// Main routing configuration component
export const AllRoutes = () => {
  return (
    // Wrapper div with minimum height to maintain layout consistency
    <div className="min-h-[92vh]">
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Product listing page */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Product details page (dynamic route based on product ID) */}
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Cart page */}
        <Route path="/cart" element={<CartPage />} />

        {/* Placeholder "Coming Soon" pages for other sections */}
        <Route path="/categories" element={<CommingSoon />} />
        <Route path="/about" element={<CommingSoon />} />
        <Route path="/contact" element={<CommingSoon />} />

        {/* Fallback route: redirect unknown paths to home */}
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </div>
  );
};

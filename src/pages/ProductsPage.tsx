import { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import { Product, FilterState } from "../types";
import { FilterSidebar, Pagination, ProductCard } from "../components";
import { fetchCategories, fetchProducts } from "../services";

export const ProductsPage = () => {
  // State to store the complete list of products
  const [products, setProducts] = useState<Product[]>([]);
  // State to store product categories
  const [categories, setCategories] = useState<string[]>([]);
  // State to store products after applying filters
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // Loading and error state for async operations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filter sidebar toggle for mobile view
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Toggle view mode between grid and list
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Current active pagination page
  const [currentPage, setCurrentPage] = useState(1);
  // Filters: category, price range, sorting
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "name",
  });

  const productsPerPage = 12;

  // Fetch product and category data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters and sorting whenever product list or filters change
  useEffect(() => {
    let filtered = [...products];

    // Filter by selected category
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Sort the filtered products
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    // Update filtered products and reset to first page
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-blue-600 border-b-blue-600 border-l-blue-600 bg-white-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of amazing products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar (Collapsible in mobile) */}
          <div className="lg:w-60 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              categories={categories}
              onFilterChange={setFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Product Content */}
          <div className="flex-1">
            {/* Toolbar with view mode and filter toggle */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4">
                {/* Filter toggle button (only visible on small screens) */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </button>

                {/* Product count */}
                <span className="text-gray-600">
                  Showing {startIndex + 1}-
                  {Math.min(
                    startIndex + productsPerPage,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </span>
              </div>

              {/* Toggle view mode: grid / list */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Product List or Grid */}
            {currentProducts.length > 0 ? (
              <>
                {/* Product display: Grid or List based on viewMode */}
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination control */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              // No products match the filters
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <p className="text-gray-500">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

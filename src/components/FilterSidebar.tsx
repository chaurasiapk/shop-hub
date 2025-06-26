import { FilterState } from "../types";

import React from "react";
import { X, Filter } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const sortOption = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ]

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  categories,
  onFilterChange,
  isOpen,
  onClose,
}) => {
  // Handler to update selected category
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  // Handler to update min or max price
  const handlePriceChange = (field: "minPrice" | "maxPrice", value: number) => {
    onFilterChange({ ...filters, [field]: value });
  };

  // Handler to update sortBy field
  const handleSortChange = (sortBy: FilterState["sortBy"]) => {
    onFilterChange({ ...filters, sortBy });
  };

  // Resets all filters to default values
  const clearFilters = () => {
    onFilterChange({
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      sortBy: "name",
    });
  };

  return (
    <>
      {/* Mobile dark background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container (mobile + desktop) */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-60 bg-white shadow-xl lg:shadow-none border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Clear All Filters */}
          <button
            onClick={clearFilters}
            className="w-full mb-6 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Clear All Filters
          </button>

          {/* Sort Options */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sort By
            </h3>
            <div className="space-y-2">
              {sortOption.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={() =>
                      handleSortChange(option.value as FilterState["sortBy"])
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {/* All Categories option */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ""}
                  onChange={() => handleCategoryChange("")}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">All Categories</span>
              </label>

              {/* Individual category options */}
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Sliders */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price: ${filters.minPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handlePriceChange("minPrice", Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handlePriceChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Interface representing a product from the store.
 */
export interface Product {
    id: number; // Unique identifier for the product
    title: string; // Product name/title
    price: number; // Product price
    description: string; // Detailed description of the product
    category: string; // Category to which the product belongs
    image: string; // URL to the product image
    rating: {
      rate: number; // Average rating of the product
      count: number; // Total number of ratings
    };
  }
  
  /**
   * Represents a product added to the cart with quantity.
   * Extends the Product interface by adding quantity field.
   */
  export interface CartItem extends Product {
    quantity: number; // Number of units added to the cart
  }
  
  /**
   * Represents the current filter state used for product filtering.
   */
  export interface FilterState {
    category: string; // Selected category filter
    minPrice: number; // Minimum price filter
    maxPrice: number; // Maximum price filter
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name'; // Sorting criteria
  }
  
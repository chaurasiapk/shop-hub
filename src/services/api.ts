import { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the Fake Store API.
 * @returns A promise resolving to an array of products.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    // Check for HTTP error status
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param id - The ID of the product to fetch.
 * @returns A promise resolving to the product data.
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    // Check for HTTP error status
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Fetches all product categories.
 * @returns A promise resolving to an array of category names (strings).
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    // Check for HTTP error status
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

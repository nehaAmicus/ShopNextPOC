export const ProductApi = {
  async getProducts() {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  async getProductById(id: number) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    return response.json();
  },
};

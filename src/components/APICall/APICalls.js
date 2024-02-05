// apiCalls.js

const BASE_URL = 'https://fakestoreapi.com';
const methods={
    getMethod:{
        method: 'GET'
    },
    deleteMethod:{ method: 'DELETE' },
    putMethod: {
        method: 'PUT'
    }
}

const headers={
    
}

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, methods.getMethod);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, { method: 'DELETE' });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`, { method: 'GET' });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

  export const updateProduct= async (productId,productData)=>{
    try{
        const response=await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const updatedProduct = await response.json();
          return updatedProduct;
        } catch (error) {
          console.error('Error updating product details:', error);
          throw error; // Re-throw the error to handle it in the calling component
        }
      };


      export const getProductDetById = async (productId) => {
        try {
          const response = await fetch(`${BASE_URL}/products/${productId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const productDetails = await response.json();
          return productDetails;
        } catch (error) {
          console.error('Error fetching product details:', error);
          throw error;
        }
      };

      export const getProdByCategory = async (category) => {
        try {
          const response = await fetch(`${BASE_URL}/products/category/${category}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching products by category:', error);
          throw error;
        }
      };




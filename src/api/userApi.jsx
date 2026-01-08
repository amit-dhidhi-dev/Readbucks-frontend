import axios from "axios";
import { SiAnsys } from "react-icons/si";

// ✅ Create a reusable userAPI object
export const userApi = {
  getCurrentUser: async (token) => {
    return axios.get(`${import.meta.env.VITE_API_BASE_URL}/getCurrentUser`, {
      params: { token: token }
    });
  },

  addBookToUserLibrary: async (token, libraryData) => {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/library`,
      libraryData,
      {
        params: { token: token }
      }
    );
  },

  addPurchaseHistory: async (token, history) => {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/purchase-history`,
      history,
      {
        params: { token: token }
      }
    )
  },

  // get user library
  getUserLibrary: async (userId) => {
    return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-library`, {
      params: { userId: userId }
    });
  },

removeBookFromUserLibrary: async (userId, bookId) => {
  if (!userId || !bookId) {
    console.error("Missing userId or bookId for removal");
    return;
  }
  return await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/user-library/remove-book`,
    {
      params: { userId, bookId } // Shorthand for { userId: userId, bookId: bookId }
    }
  );
},


};

// ✅ Axios interceptor to automatically attach token to every request
axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

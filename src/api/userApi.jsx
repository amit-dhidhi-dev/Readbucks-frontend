import axios from "axios";

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

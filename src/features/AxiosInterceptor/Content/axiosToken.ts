import axios from 'axios';
import { User } from '../../../models/User';

const axiosToken = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

axiosToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleUnauthorized = () => {
  console.error("Unauthorized, redirecting to login...");
  User.clearUserData();
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  window.location.href = '/login';
};

axiosToken.interceptors.response.use(
  (response) => {
    if (response.data === undefined) {
      console.error("Received undefined response from API");
      return Promise.reject(new Error("API returned undefined"));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        handleUnauthorized();
      } else {
        console.error("API error:", error.response.status, error.response.data);
      }
    } else {
      console.error("Network or other error", error);
    }
    return Promise.reject(error);
  }
);

// POST request
const postRequest = async (linkUrl: string, data: any) => {
  try {
    const response = await axiosToken.post(linkUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET request
const getRequest = async (linkUrl: string, params?: any) => {
  try {
    const response = await axiosToken.get(linkUrl, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
const putRequest = async (linkUrl: string, data: any) => {
  try {
    const response = await axiosToken.put(linkUrl, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
const deleteRequest = async (linkUrl: string) => {
  try {
    const response = await axiosToken.delete(linkUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { axiosToken, postRequest, getRequest, putRequest, deleteRequest };

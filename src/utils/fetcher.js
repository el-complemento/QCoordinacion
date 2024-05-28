// src/utils/fetcher.js
import { API_GATEWAY_URL } from "@/config-global";

const fetcher = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const finalOptions = {
    ...options,
    mode: 'no-cors',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_GATEWAY_URL}/${url}`, finalOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetcher;
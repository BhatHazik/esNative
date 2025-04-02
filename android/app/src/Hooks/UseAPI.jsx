import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/url.config';

const UseAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestAPI = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url: `${BASE_URL}${endpoint}`,
        data,
      });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.log("USE API",errorMessage);
      return { error: errorMessage }; // Return error directly
    } finally {
      setLoading(false);
    }
  };
  

  return { requestAPI, loading, error };
};

export default UseAPI;

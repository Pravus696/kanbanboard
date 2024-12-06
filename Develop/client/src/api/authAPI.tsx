import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin): Promise<any> => {
  try {
    // Send a POST request to '/auth/login' with user login information in JSON format
    const response = await axios.post('/auth/login', userInfo, {
      headers: { 'Content-Type': 'application/json' }
    });

    // If the response is successful, return the data directly (axios handles JSON parsing)
    return response.data;
  } catch (error: any) {
    // Check if the error is a server response (error.response)
    if (error.response) {
      // Log and throw the server-provided error message if it exists
      const errorMessage = error.response.data.message || 'Login failed';
      console.log('Error from server:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle network or other errors
      console.log('Network or unexpected error:', error.message || 'An error occurred');
      throw new Error('Could not connect to the server');
    }
  }
};

export { login };
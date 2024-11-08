import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // TODO: make a POST request to the login route

  // if the user exists and the password is correct, return a JWT token
  try {
  const response = await axios.post("/api/auth/login", userInfo);
  console.log(response);

  // get the token from the response
  const token = response.data.token;
  // if the token exists, store it in local storage
  if (token) {
    localStorage.setItem("token", token);
    console.log("token", token);
    // get the user from the response
    const user = response.data.user;
    console.log("user", user);
    localStorage.setItem("user", JSON.stringify(user));
    setError('');
    alert("You have successfully logged in!");
    
    // navigate to the tickets page
    navigate("/tickets");
  }

  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      setError('Invalid credentials');
    } else {
      setError('An error occurred. Please try again.');
    }
  }
console.log(error);

}



export { login };

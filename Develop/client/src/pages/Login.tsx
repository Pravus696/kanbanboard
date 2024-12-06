import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
// import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    if (!loginData.username || !loginData.password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    try {
      const data = await login(loginData);
      Auth.login(data.token);
      console.log('data:', data);
  
    } catch (err: any) {
      setError("Failed to login. Please check your username and password.");
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && (
          <p className="error-message" aria-live="assertive">
            {error}
          </p>
        )}

        <label htmlFor="username">Username</label>
        <input 
          type='text'
          name='username'
          id='username'
          value={loginData.username}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          type='password'
          name='password'
          id='password'
          value={loginData.password}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <button type='submit' disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
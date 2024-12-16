import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        toast.success("Login Successful!"); // Success toast
        navigate('/feed');
      }
    } catch (error) {
      // Check if the error response exists and set the error message
      if (error.response && error.response.data) {
        toast.error(error.response.data); // Error toast
      } else {
        toast.error("An unexpected error occurred."); // General error toast
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cyan-400 bg-opacity-40 p-6 rounded shadow-md w-[32vw]"
    >
      <h2 className="text-5xl font-extrabold mb-6 text-center dancingScript">Login</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-sm py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Enter your email address"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full text-sm py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-700 mt-4 font-semibold text-white p-2 rounded hover:bg-cyan-800 transition"
      >
        Login
      </button>
      <p className="mt-4 text-center text-xs">
        Don&apos;t have an account?{' '}
        <button onClick={onToggle} className="text-cyan-900 hover:underline">
          CREATE NEW ACCOUNT
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
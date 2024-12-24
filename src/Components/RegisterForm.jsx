import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import PropTypes from 'prop-types'; 

const RegisterForm = ({ onToggle }) => {
  RegisterForm.propTypes = {
    onToggle: PropTypes.func.isRequired,
  }; 

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreement) {
      toast.error('Please agree to the terms and conditions'); 
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); 
      return;
    }

    try {
      const response = await axios.post('/register', {
        fullname,
        email,
        username,
        password,
      });

      if (response.status === 200) {
        toast.success("Registration Successful!"); 
        navigate('/feed');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data); 
      } else {
        toast.error("An unexpected error occurred."); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cyan-400 bg-opacity-40 p-6 rounded shadow-md w-[32vw] mobile:w-[90vw] tablet:w-[70vw] laptop:w-[32vw]">
      <h2 className="text-5xl font-extrabold mb-6 text-center dancingScript mobile:text-4xl tablet:text-5xl laptop:text-5xl">Register</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="fullname">
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
          className="w-full text-sm py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Enter your full name"
        />
      </div>
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
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full text-sm py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Choose a username"
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
      <div className="mb-4">
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full text-sm py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Confirm your password"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="agreement"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          required
          className={`mr-2 text-sm ${!agreement ? 'outline-red-500 border-red-500' : ''}`} 
        />
        <label htmlFor="agreement" className="text-xs cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-700 font-semibold text-white p-2 rounded hover:bg-cyan-800 transition"
      >
        Register
      </button>
      <p className="mt-4 text-center text-xs mobile:text-xs tablet:text-xs laptop:text-xs">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-cyan-900 hover:underline text-xs mobile:text-xs tablet:text-xs laptop:text-xs">
          LOGIN
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
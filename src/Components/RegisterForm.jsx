import { useState } from 'react';

const RegisterForm = ({ onToggle }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Agreement:', agreement);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cyan-400 bg-opacity-40 p-6 rounded shadow-md w-[32vw]"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm cursor-pointer" htmlFor="fullName">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
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
          className="w-full py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
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
          className="w-full py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
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
          className="w-full py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
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
          className="w-full py-2 px-4 outline-cyan-700 rounded bg-cyan-100"
          placeholder="Confirm your password"
        />
      </div>
      <div className="mb- 4 flex items-center">
        <input
          type="checkbox"
          id="agreement"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          required
          className="mr-2"
        />
        <label htmlFor="agreement" className="text-sm cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-700 mt-4 font-medium text-white p-2 rounded hover:bg-cyan-800 transition"
      >
        Register
      </button>
      <p className="mt-4 text-center text-xs">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-cyan-900 hover:underline">
          LOGIN
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-50 text-cyan-800 poppins">
      {isLogin ? (
        <LoginForm onToggle={toggleForm} />
      ) : (
        <RegisterForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default LoginPage;
"use client"

import { useState } from "react";
import Modal from "./Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const LoginButton = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState(true); // Control which form to show

  const switchToRegister = () => setIsLoginForm(false);
  const switchToLogin = () => setIsLoginForm(true);

  const onButtonClick = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
      <button 
        onClick={onButtonClick} 
        className="font-medium text-white "
      >
          Login
      </button>

      {showLoginForm && (
        <Modal closeForm={onButtonClick}>
          {isLoginForm ? (
            <LoginForm onSwitchToRegister={switchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          )}
        </Modal>
      )}
    </>
  );
};

export default LoginButton;

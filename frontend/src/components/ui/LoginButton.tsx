"use client";

import { useState } from "react";
import Modal from "./Modal"; // Make sure to import the correct Modal component
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
    <div>
      <button onClick={onButtonClick}>Login</button>

      {showLoginForm && (
        <Modal closeForm={onButtonClick}>
          {isLoginForm ? (
            <LoginForm onSwitchToRegister={switchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default LoginButton;

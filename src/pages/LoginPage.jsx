import React from "react";
import LoginForm from "../components/Header/LoginForm";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-163 bg-gradient-to-tr from-gray-100 to-gray-300 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;

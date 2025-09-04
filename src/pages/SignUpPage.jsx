import React from "react";
import SignUpForm from "../components/Header/SignUpForm";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-195 bg-gradient-to-tr from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;

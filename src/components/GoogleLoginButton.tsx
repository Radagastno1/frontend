// src/GoogleLoginButton.tsx
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response: CredentialResponse) => {
    console.log("Login Success:", response);
    navigate("/todo");
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

// src/GoogleLoginButton.tsx
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, addUserAsync } from "../slices/userSlice";
import { useAppDispatch } from "../slices/store";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    console.log("Login Success:", response);

    if (response.credential) {
      // Verify token using Google's tokeninfo endpoint
      const userInfo = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${response.credential}`
      ).then((res) => res.json());

      if (userInfo.error) {
        console.error("Error verifying token: ", userInfo.error_description);
        return;
      }

      // Spara användarens information i Firestore
      const accountId = userInfo.sub;
      console.log("USER INFO : ", userInfo);
      const user: User = {
        accountId: accountId,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      };
      dispatch(addUserAsync(user));

      // Navigera till todo-sidan
      navigate("/todo");
    }
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

import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useAppDispatch } from "../slices/store";
import { clearUser } from "../slices/userSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GoogleLogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("activeUser");
    localStorage.removeItem("todos");
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logga ut
    </Button>
  );
};

export default GoogleLogoutButton;

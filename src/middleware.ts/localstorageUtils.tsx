import { User } from "../slices/userSlice";

export const loadUserFromLocalStorage = (): User | undefined => {
  const userData = localStorage.getItem("activeUser");
  return userData ? JSON.parse(userData) : undefined;
};

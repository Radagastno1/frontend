import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Login";
import Todo from "./Todo";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LogIn />} />
      <Route path="todo" element={<Todo />} />
    </Routes>
  );
};

export default Navigation;

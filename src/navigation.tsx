import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import LogIn from "./Login";
import TodoPage from "./Todo";

const Navigation = () => {
  return (
    <Routes>
      <Route index element={<LogIn />} />
      <Route path="todo" element={<TodoPage />} />
      <Route path="addtodo" element={<Add />} />
    </Routes>
  );
};

export default Navigation;

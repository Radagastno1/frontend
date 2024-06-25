import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import LogIn from "./Login";
import Todo from "./Todo";

const Navigation = () => {
  return (
    <Routes>
      <Route index element={<LogIn />} />
      <Route path="todo" element={<Todo />} />
      <Route path="addtodo" element={<Add />} />
    </Routes>
  );
};

export default Navigation;

import { Route, Routes } from "react-router-dom";
import Add from "./Add";
import LogIn from "./Login";
import RootLayout from "./Rootlayout";
import TodoPage from "./Todo";

const Navigation = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<LogIn />} />
        <Route path="todo" element={<TodoPage />} />
        <Route path="addtodo" element={<Add />} />
      </Route>
    </Routes>
  );
};

export default Navigation;

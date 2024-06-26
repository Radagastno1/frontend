import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogoutButton from "./components/GoogleLogoutButton";
import { useAppDispatch, useAppSelector } from "./slices/store";
import { Todo, editTodoAsync, fetchTodos } from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);
  const todos = useAppSelector((state) => state.todoSlice.todos);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);
  const [currentStartDate, setCurrentStartDate] = useState<Date>(() =>
    getStartOfWeek(new Date())
  );
  const [currentEndDate, setCurrentEndDate] = useState<Date>(() =>
    getEndOfWeek(new Date())
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
    const startDate = getStartOfWeek(new Date());
    setCurrentStartDate(startDate);
    setCurrentEndDate(getEndOfWeek(startDate));
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (activeUser) {
      dispatch(fetchTodos(activeUser.accountId));
    }
  }, [activeUser]);

  useEffect(() => {
    if (todos) {
      console.log("Startdatum:", currentStartDate);
      console.log("Slutdatum:", currentEndDate);

      const filteredTodos = todos.filter((todo) => {
        const todoDate = new Date(todo.date);
        const endDateAdjusted = new Date(currentEndDate);
        endDateAdjusted.setHours(23, 59, 59, 999);
        return todoDate >= currentStartDate && todoDate <= endDateAdjusted;
      });
      setFilteredTodos(filteredTodos);
      console.log("FILTRERADE: ", filteredTodos);
    }
  }, [todos, currentStartDate, currentEndDate]);

  const handleTodoToggle = (id: string) => {
    const todoToggled = todos.find((t) => t.id === id);
    if (todoToggled) {
      const updatedTodo = {
        ...todoToggled,
        isDone: !todoToggled.isDone,
      };
      dispatch(editTodoAsync(updatedTodo));
    }
  };

  const updateWeekForward = () => {
    const updatedStartDate = new Date(currentStartDate);
    updatedStartDate.setDate(updatedStartDate.getDate() + 7);
    setCurrentStartDate(updatedStartDate);
    setCurrentEndDate(getEndOfWeek(updatedStartDate));
  };

  const updateWeekBackwards = () => {
    const updatedStartDate = new Date(currentStartDate);
    updatedStartDate.setDate(updatedStartDate.getDate() - 7);
    setCurrentStartDate(updatedStartDate);
    setCurrentEndDate(getEndOfWeek(updatedStartDate));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>Inloggad som {activeUser?.name}</Typography>
        <GoogleLogoutButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <IconButton onClick={updateWeekBackwards}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h4">
          Vecka {getWeekNumber(currentStartDate)} (
          {formatDate(currentStartDate)} - {formatDate(currentEndDate)})
        </Typography>
        <IconButton onClick={updateWeekForward}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box sx={{ backgroundColor: "pink" }}>
        <Button variant="contained" onClick={() => navigate("/addtodo")}>
          Lägg till
        </Button>
      </Box>

      {/* Todos */}
      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        {filteredTodos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              textDecoration: todo.isDone ? "line-through" : "none",
            }}
          >
            <Checkbox
              checked={todo.isDone}
              onChange={() => handleTodoToggle(todo.id)}
              sx={{ marginRight: "10px" }}
            />
            <Typography sx={{ flexGrow: 1 }}>{todo.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Funktion för att få veckonumret
const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Funktion för att formatera datum
const formatDate = (date: Date) => {
  return date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
  });
};

// Funktion för att få startdatumet för en vecka (måndag)
const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Justera om söndag
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0); // Nollställ tid för konsistens
  return startOfWeek;
};

// Funktion för att få slutdatumet för en vecka (söndag)
const getEndOfWeek = (date: Date) => {
  const endOfWeek = new Date(getStartOfWeek(date));
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Sätt tid till slutet av dagen för konsistens
  return endOfWeek;
};

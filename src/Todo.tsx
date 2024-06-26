import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogoutButton from "./components/GoogleLogoutButton";
import { useAppDispatch, useAppSelector } from "./slices/store";
import {
  Todo,
  deleteTodoAsync,
  editTodoAsync,
  fetchTodos,
} from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);
  const todos = useAppSelector((state) => state.todoSlice.todos);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
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
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      dispatch(fetchTodos(activeUser.accountId));
    }
  }, [activeUser, dispatch]);

  useEffect(() => {
    if (todos) {
      filterTodosByDateRange(todos, currentStartDate, currentEndDate);
    }
  }, [todos, currentStartDate, currentEndDate]);

  const filterTodosByDateRange = (
    todos: Todo[],
    startDate: Date,
    endDate: Date
  ) => {
    const filtered = todos.filter((todo) => {
      const todoDate = new Date(todo.date);
      return todoDate >= startDate && todoDate <= endDate;
    });
    setFilteredTodos(filtered);
  };

  const handleTodoToggle = (id: string) => {
    const todoToggled = todos.find((t) => t.id === id);
    if (todoToggled) {
      const updatedTodo = { ...todoToggled, isDone: !todoToggled.isDone };
      dispatch(editTodoAsync(updatedTodo));
    }
  };

  const handleSetEditMode = (todo: Todo) => {
    setEditedTodo(todo);
    setIsEditMode(true);
  };

  const handleEditTodo = () => {
    if (editedTodo) {
      const updatedTodo: Todo = {
        ...editedTodo,
        title: editedTodo.title,
        date: new Date(editedTodo.date),
      };
      dispatch(editTodoAsync(updatedTodo));
      setIsEditMode(false);
      setEditedTodo(null);
    }
  };

  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find((t) => t.id === id);
    if (todoToDelete) {
      dispatch(deleteTodoAsync(todoToDelete.id));
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

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedTodo(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Inloggad som {activeUser?.name}</Typography>
        <GoogleLogoutButton />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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

      <Button
        variant="contained"
        onClick={() => navigate("/addtodo")}
        sx={{ marginBottom: "10px" }}
      >
        Lägg till
      </Button>

      <Grid container spacing={2} justifyContent="center">
        {filteredTodos.map((todo) => (
          <Grid item xs={12} key={todo.id}>
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Checkbox
                checked={todo.isDone}
                onChange={() => handleTodoToggle(todo.id)}
                sx={{ marginRight: "10px" }}
              />

              {!isEditMode || editedTodo?.id !== todo.id ? (
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </Typography>
                  <Typography variant="caption">
                    Datum: {formatDate(new Date(todo.date))}
                  </Typography>
                </Box>
              ) : (
                <>
                  <TextField
                    variant="outlined"
                    type="text"
                    value={editedTodo?.title}
                    onChange={(e) =>
                      setEditedTodo({ ...editedTodo, title: e.target.value })
                    }
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "grey",
                        },
                        "&:hover fieldset": {
                          borderColor: "grey",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "grey",
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Datum"
                    type="datetime-local"
                    value={editedTodo.date}
                    onChange={(e) =>
                      setEditedTodo({
                        ...editedTodo,
                        date: new Date(e.target.value),
                      })
                    }
                    variant="outlined"
                    sx={{
                      width: "250px",
                      marginTop: 2,
                      "& label": {
                        color: "transparent",
                      },
                      "&:focus label": {
                        color: "initial",
                      },
                    }}
                  />
                </>
              )}

              {!isEditMode || editedTodo?.id !== todo.id ? (
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <IconButton onClick={() => handleSetEditMode(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={handleEditTodo}
                    sx={{ marginRight: "10px" }}
                  >
                    Uppdatera
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancelEdit}
                    sx={{ color: "red" }}
                  >
                    Avbryt
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

const getEndOfWeek = (date: Date) => {
  const endOfWeek = new Date(getStartOfWeek(date));
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
};

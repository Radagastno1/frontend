import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./slices/store";
import { Todo, addTodoAsync } from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

const Add = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const addTodo = () => {
    if (title !== "" && date !== "" && activeUser) {
      const todo: Todo = {
        id: "undefined",
        title: title,
        description: description,
        date: new Date(date),
        isDone: false,
        accountId: activeUser.accountId,
      };
      dispatch(addTodoAsync(todo));
      navigate("/todo");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "40px",

        }}
      >
        <Typography variant="h4">Lägg till ny todo</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "8px",
          border: "2px solid rgba(0.3, 0.5, 0, 0.7)",
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          maxHeight: "600px",
          boxShadow: "4"
          

        }}
      >
        <TextField
          label="Vad ska du göra?"
          variant="outlined"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          sx={{
            marginBottom: "15px",
          }}
        />
        <TextField
          label="Beskriv mer"
          variant="outlined"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          sx={{
            marginBottom: "15px",
          }}
        />
        <TextField
          label=""
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "15px",
          }}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => addTodo()}
        >
          Lägg till
        </Button>
      </Box>
    </Box>
  );
};

export default Add;

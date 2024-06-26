import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
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
        backgroundColor: "#f0f0f0",
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">Lägg till ny todo</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
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
          color="primary"
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

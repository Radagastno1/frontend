import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./slices/store";
import { Todo, addTodoAsync } from "./slices/todoSlice";
import { loadUser } from "./slices/userSlice";

export default function Add() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");
  const [date, setDate] = useState("");
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const addTodo = () => {
    if (title != "" && date != "" && activeUser) {
      const todo: Todo = {
        id: "undefined",
        title: title,
        description: desciption,
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
      <Box sx={{ backgroundColor: "grey", padding: 5 }}>
        <TextField
          label="Vad ska du göra?"
          variant="outlined"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
          label="Beskriv mer"
          variant="outlined"
          type="text"
          value={desciption}
          onChange={(event) => setDescription(event.target.value)}
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
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <Button variant="contained" onClick={() => addTodo()}>
          Lägg till
        </Button>
      </Box>
    </Box>
  );
}

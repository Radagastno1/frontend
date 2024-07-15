import "firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Todo } from "../slices/todoSlice";
import { db } from "./config";

export const addTodoToDB = async (todo: Todo) => {
  try {
    const todoCollectionRef = collection(db, "todos");

    const docRef = await addDoc(todoCollectionRef, {});

    todo.id = docRef.id;

    await updateDoc(docRef, todo as Partial<Todo>);

    const todoDoc = await getDoc(docRef);
    if (todoDoc.exists()) {
      const todoData = todoDoc.data();
      return todoData as Todo;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error adding todo: ", error);
    throw new Error("Failed to add todo");
  }
};

export const editTodoInDB = async (todo: Todo) => {
  try {
    const todoCollectionRef = collection(db, "todos");

    const todoRef = doc(todoCollectionRef, todo.id);

    const updatedTodoData = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      date: todo.date,
      isDone: todo.isDone,
    };

    await updateDoc(todoRef, updatedTodoData);

    return todo;
  } catch (error) {
    console.error("Error editing todo: ", error);
    throw new Error("Failed to edit todo");
  }
};

export const getTodosFromDB = async (accountId: string) => {
  try {
    const todoCollectionRef = collection(db, "todos");

    const q = query(todoCollectionRef, where("accountId", "==", accountId));

    const querySnapshot = await getDocs(q);

    const todos: Todo[] = [];

    querySnapshot.forEach((doc) => {
      const todoData = doc.data();
      todos.push(todoData as Todo);
    });

    return todos;
  } catch (error) {
    console.error("Error getting todos: ", error);
    throw new Error("Failed to get todos");
  }
};

export const deleteTodoFromDB = async (todoId: string) => {
  try {
    const todoDocRef = doc(db, "todos", todoId);
    await deleteDoc(todoDocRef);
  } catch (error) {
    console.error("Error deleting todo: ", error);
    throw new Error("Failed to delete todo");
  }
};

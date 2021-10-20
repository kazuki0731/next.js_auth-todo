import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  getDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../src/firebase";

export const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const getAllTodos = async () => {
    const data = [];
    try {
      const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        data.push({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          status: doc.data().status,
        });
      });
      setTodos(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addTodos = async (data) => {
    await addDoc(collection(db, "todos"), {
      title: data.title,
      text: data.text,
      status: "未着手",
      createdAt: new Date(),
    });
    getAllTodos();
  };

  const getTodo = async (id) => {
    const docSnap = await getDoc(doc(db, "todos", id));
    return docSnap.data();
  };

  const changeTodo = async ({ title, text, status }, id) => {
    await updateDoc(doc(db, "todos", id), {
      title,
      text,
      status,
    });
    getAllTodos();
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const value = {
    todos,
    setTodos,
    addTodos,
    getTodo,
    changeTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosProvider;

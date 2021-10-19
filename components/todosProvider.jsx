import { collection, query, getDocs, addDoc, orderBy } from "@firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../src/firebase";

export const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const getAllTodos = async () => {
    const data = [];
    try {
      const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
      // orderBy("createdAt")
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
      status: "未完了",
      createdAt: new Date(),
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
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosProvider;

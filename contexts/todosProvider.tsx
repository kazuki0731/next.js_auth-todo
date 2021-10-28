import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { createContext, useState, VFC } from "react";
import { Props } from "../models";
import { db } from "../src/firebase";

interface AddData {
  title: string;
  text: string;
}

interface ChangeData {
  title: string;
  text: string;
  status: string;
}

export const TodosContext = createContext(null);

const TodosProvider: VFC<Props> = ({ children }) => {
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

  const addTodos = async (data: AddData) => {
    await addDoc(collection(db, "todos"), {
      title: data.title,
      text: data.text,
      status: "未着手",
      createdAt: new Date(),
    });
    getAllTodos();
  };

  const getTodo = async (id: string) => {
    const docSnap = await getDoc(doc(db, "todos", id));

    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  };

  const changeTodo = async (data: ChangeData, id: string) => {
    const { title, text, status } = data;
    await updateDoc(doc(db, "todos", id), {
      title,
      text,
      status,
    });
    getAllTodos();
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
    getAllTodos();
  };

  const value = {
    todos,
    getAllTodos,
    setTodos,
    addTodos,
    getTodo,
    changeTodo,
    deleteTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export default TodosProvider;

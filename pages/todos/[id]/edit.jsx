import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TodosContext } from "../../../components/TodosProvider";
import Header from "../../../components/header";

const Todo = () => {
  const { getTodo, changeTodo } = useContext(TodosContext);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const todoId = router.query.todo;
  const { register, handleSubmit, reset } = useForm();

  const getTodoDetail = async () => {
    const res = await getTodo(todoId);
    reset(res);
  };

  const changeData = async (data) => {
    await changeTodo(data, todoId);
    setMsg("変更しました");
  };

  useEffect(() => {
    getTodoDetail();
  }, []);

  return (
    <div>
      <Header />
      <h1>Todos</h1>
      <form onSubmit={handleSubmit(changeData)}>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" required {...register("title")} />
        <br />
        <label htmlFor="text">内容</label>
        <textarea id="text" rows="8" required {...register("text")}></textarea>
        <br />
        <select {...register("status")}>
          <option value="未着手">未着手</option>
          <option value="着手">着手</option>
          <option value="完了">完了</option>
        </select>
        <input type="submit" value="変更を保存する" />
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Todo;

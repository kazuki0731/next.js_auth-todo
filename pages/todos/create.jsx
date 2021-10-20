import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { TodosContext } from "../../components/TodosProvider";
import styles from "../../styles/Home.module.css";

const Create = () => {
  const { addTodos } = useContext(TodosContext);
  const [msg, setMsg] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const submitData = (data) => {
    addTodos(data);
    setMsg("作成しました");
    reset();
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1>Create</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" required {...register("title")} />
        <br />
        <label htmlFor="text">内容</label>
        <textarea id="text" rows="8" required {...register("text")}></textarea>
        <br />
        <input type="submit" value="送信" />
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Create;

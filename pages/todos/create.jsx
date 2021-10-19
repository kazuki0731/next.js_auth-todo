import { async } from "@firebase/util";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { TodosContext } from "../../components/TodosProvider";
import { db } from "../../src/firebase";
import styles from "../../styles/Home.module.css";

const Create = () => {
  const { register, handleSubmit, reset } = useForm();
  const { addTodos } = useContext(TodosContext);

  const submitData = (data) => {
    addTodos(data);
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
    </div>
  );
};

export default Create;

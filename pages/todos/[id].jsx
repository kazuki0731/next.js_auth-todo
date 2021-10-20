import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { TodosContext } from "../../components/TodosProvider";

const Todo = () => {
  const { getTodo } = useContext(TodosContext);
  const [data, setData] = useState({});
  const router = useRouter();
  const todoId = router.query.todo;

  const getTodoDetail = async () => {
    const res = await getTodo(todoId);
    setData(res);
  };

  useEffect(() => {
    getTodoDetail();
  }, []);

  return (
    <div>
      <Header />
      <h1>Todos</h1>
      <ul>
        <li>
          タイトル: <strong>{data.title}</strong>
        </li>
        <li>
          内容: <strong>{data.text}</strong>
        </li>
        <li>
          進捗: <strong>{data.status}</strong>
        </li>
      </ul>

      <Link
        href={{
          pathname: "/todos/[id]/edit",
          query: { todo: todoId },
        }}
        as={`/todos/${router.query.id}/edit`}
        passHref
      >
        <button>編集</button>
      </Link>
      <button>削除</button>
    </div>
  );
};

export default Todo;

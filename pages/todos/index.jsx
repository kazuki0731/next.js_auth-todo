import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/authProvider";
import Header from "../../components/header";
import { TodosContext } from "../../components/TodosProvider";
import styles from "../../styles/Home.module.css";

const Index = () => {
  const { todos } = useContext(TodosContext);
  console.log(todos);
  const [isLogin, setIsLogin] = useState(false);
  const { currentUser, signout, isGetAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (isGetAuth) {
      if (!currentUser) {
        router.push("/signin");
        return;
      } else {
        setIsLogin(true);
      }
    }
  }, [isGetAuth]);

  const clickSignOut = () => {
    signout();
  };

  return (
    isLogin && (
      <div className={styles.container}>
        <Header home />
        <h1>Todos</h1>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <Link href="/todos/[id]" as={`/todos/${todo.title}`}>
                <a>
                  <h3>{todo.title}</h3>
                </a>
              </Link>
              <span>{todo.status}</span>
            </li>
          ))}
        </ul>
        <button onClick={clickSignOut}>ログアウト</button>
      </div>
    )
  );
};

export default Index;

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../components/authProvider";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <Link href={currentUser ? "/todos" : "/signin"}>
        <a>todoページへ</a>
      </Link>
      <h1>ようこそ</h1>
    </div>
  );
}

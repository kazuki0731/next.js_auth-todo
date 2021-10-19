import Link from "next/link";
import styles from "../styles/Home.module.css";


const Header = ({ home }) => {
  return (
    <div>
      {home ? (
        <Link href="/todos/create">
          <a>作成</a>
        </Link>
      ) : (
        <Link href="/todos">
          <a>一覧</a>
        </Link>
      )}
    </div>
  );
};

export default Header;

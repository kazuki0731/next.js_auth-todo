import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "./authProvider";

const Header = ({ home }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h2>ようこそ {currentUser.displayName} さん</h2>
      {home ? (
        <Link href="/todos/create">
          <a>作成</a>
        </Link>
      ) : (
        <Link href="/todos">
          <a>一覧</a>
        </Link>
      )}
      <br />
      <Link href="/mypage">
        <a>マイページ</a>
      </Link>
    </div>
  );
};

export default Header;

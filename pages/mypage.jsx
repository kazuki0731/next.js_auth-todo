import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/authProvider";

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { currentUser, isGetAuth } = useContext(AuthContext);
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

  return (
    isLogin && (
      <div>
        <h1>マイページ</h1>
        <ul>
          <li>
            ユーザー名: <strong>{currentUser.displayName}</strong>
          </li>
          <li>
            メールアドレス: <strong>{currentUser.email}</strong>
          </li>
          <li>
            id: <strong>{currentUser.uid}</strong>
          </li>
        </ul>
        <button onClick={() => router.back()}>戻る</button>
      </div>
    )
  );
};

export default Mypage;

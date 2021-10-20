import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";
import Link from "next/link";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signup } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data) => {
    await signup(data.email, data.password, data.name);
    setMsg("登録できました");
    reset();
  };
  return (
    <div>
      <h1>登録フォーム</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="name">ユーザー名</label>
        <input type="text" id="name" required {...register("name")} />
        <label htmlFor="email">メールアドレス</label>
        <input type="email" id="email" required {...register("email")} />
        <br />
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          id="password"
          required
          {...register("password")}
        />
        <br />
        <input type="submit" value="送信" />
      </form>
      {msg && (
        <div>
          <p>{msg}</p>
          <Link href="/todos">
            <a>Todo一覧へ</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signup;

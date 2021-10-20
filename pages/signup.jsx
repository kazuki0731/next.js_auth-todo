import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";
import Link from "next/link";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { signup } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data) => {
    const error = await signup(data.email, data.password, data.name);
    if (error) {
      switch (error) {
        case "auth/email-already-in-use":
          setMsg("メールアドレスはすでに使われています");
          break;
        case "auth/weak-password":
          setMsg("パスワードをもっと複雑にしてください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
    } else {
      setMsg("登録できました");
      reset();
    }
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
          {...register("password", {
            minLength: {
              value: 6,
              message: "6文字以上にしてください",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <input type="submit" value="送信" />
      </form>
      {msg === "登録できました" ? (
        <div>
          <p>{msg}</p>
          <Link href="/todos">
            <a>Todo一覧へ</a>
          </Link>
        </div>
      ): (
        <Link href="/signin">
            <a>ログインへ</a>
          </Link>
      ) }
    </div>
  );
};

export default Signup;

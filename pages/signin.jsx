import { useContext } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const submitData = (data) => {
    login(data.email, data.password);
  };
  return (
    <div>
      <h1>ログインフォーム</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <label htmlFor="email">メールアドレス</label>
        <input type="text" id="email" required {...register("email")} />
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
        <Link href="/signup">
          <a>登録する</a>
        </Link>
    </div>
  );
};

export default Signin;

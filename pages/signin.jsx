import { useContext, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";
import { useRouter } from "next/router";

const Signin = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [msg, setMsg] = useState("");
  const submitData = async (data) => {
    const error = await login(data.email, data.password);
    if (error) {
      switch (error) {
        case "auth/wrong-password":
          setMsg("パスワードが間違っています");
          break;
        case "auth/user-not-found":
          setMsg("ユーザーが見つかりません");
          break;
        case "auth/too-many-requests":
          setMsg("５回間違えたのでしばらく待ってください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
    } else {
      router.push("/todos");
    }
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
      <p>{msg && <p>{msg}</p>}</p>
      <Link href="/signup">
        <a>登録する</a>
      </Link>
    </div>
  );
};

export default Signin;

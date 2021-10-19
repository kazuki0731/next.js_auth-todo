import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";

const Signin = () => {
  const { register, handleSubmit, reset } = useForm();
  const { login } = useContext(AuthContext);
  const submitData = (data) => {
    login(data.email, data.password);
  };
  return (
    <div>
      <h1>ログイン</h1>
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
    </div>
  );
};

export default Signin;

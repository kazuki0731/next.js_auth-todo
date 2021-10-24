import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/authProvider";
import { useRouter } from "next/router";
import TitleText from "../components/titleText";
import TodosContainer from "../components/todosContainer";
import { VStack, Text, Box } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import PageLink from "../components/pageLink";

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
    <>
      <TitleText>ログイン</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(submitData)}>
          <VStack w="70%" m="0 auto" spacing={6}>
            <FormControl id="email">
              <FormLabel>メールアドレス:</FormLabel>
              <Input
                type="email"
                {...register("email")}
                bg="white"
                placeholder="メールアドレスを入力"
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>パスワード:</FormLabel>
              <Input
                type="password"
                {...register("password")}
                bg="white"
                placeholder="パスワードを入力"
                required
              />
            </FormControl>
            <Button type="submit">ログイン</Button>
          </VStack>
        </form>
        <Box mt={3}>
          <PageLink href="/signup">新規登録する</PageLink>
          {msg && <Text>{msg}</Text>}
        </Box>
      </TodosContainer>
    </>
  );
};

export default Signin;

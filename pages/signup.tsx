import React, { useContext, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/authProvider";
import TitleText from "../components/titleText";
import TodosContainer from "../components/todosContainer";
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/layout";
import PageLink from "../components/pageLink";
import { Props } from "../models";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const Signup: VFC<Props> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { signup } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data: FormData) => {
    const error = await signup(data.email, data.password, data.name);
    if (error) {
      switch (error) {
        case "auth/email-already-in-use":
          setMsg("メールアドレスはすでに使われています");
          break;
        case "auth/weak-password":
          setMsg("パスワードを複雑にしてください");
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
    <>
      <TitleText>新規登録</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(submitData)}>
          <VStack w="70%" m="0 auto" spacing={6}>
            <FormControl id="name">
              <FormLabel>ユーザー名:</FormLabel>
              <Input
                type="name"
                {...register("name")}
                bg="white"
                placeholder="ユーザー名を入力"
                required
              />
            </FormControl>
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
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "6文字以上にしてください",
                  },
                })}
                bg="white"
                placeholder="パスワードを入力してください"
                required
              />
            </FormControl>
            {errors.password && <Text>{errors.password.message}</Text>}
            <Button type="submit">登録</Button>
          </VStack>
        </form>
        <Box mt={5}>
          {msg === "登録できました" ? (
            <>
              <Text>{msg}</Text>
              <PageLink href="/todos">Todo一覧へ</PageLink>
            </>
          ) : (
            <>
              <Text color="red.400">{msg}</Text>
              <PageLink href="/signin">ログインへ</PageLink>
            </>
          )}
        </Box>
      </TodosContainer>
    </>
  );
};

export default Signup;

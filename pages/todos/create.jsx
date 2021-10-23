import { Input, FormControl, Textarea, Button } from "@chakra-ui/react";

import { VStack } from "@chakra-ui/layout";
import Head from "next/head";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { TodosContext } from "../../components/TodosProvider";
import TodosContainer from "../../components/todosContainer";
import TitleText from "../../components/titleText";

const Create = () => {
  const { addTodos } = useContext(TodosContext);
  const [msg, setMsg] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const submitData = (data) => {
    addTodos(data);
    setMsg("作成しました");
    reset();
  };

  return (
    <div>
      <Head>
        <title>作成</title>
      </Head>
      <Header />
      <TitleText>Create</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(submitData)}>
          <FormControl>
            <VStack justify="center" spacing={7}>
              <Input
                id="title"
                bg="white"
                w="70%"
                variant="outline"
                placeholder="タイトルを入力してください"
                required
                {...register("title")}
              />
              <Textarea
                id="text"
                bg="white"
                w="70%"
                h="300px"
                placeholder="本文を入力してください"
                required
                {...register("text")}
              />
              <Button type="submit">作成</Button>
            </VStack>
          </FormControl>
        </form>
        {msg && <p>{msg}</p>}
      </TodosContainer>
    </div>
  );
};

export default Create;

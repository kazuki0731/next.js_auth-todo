import { Input, FormControl, Textarea, Button } from "@chakra-ui/react";

import { VStack } from "@chakra-ui/layout";
import Head from "next/head";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header";
import { TodosContext } from "../../components/todosProvider";
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
    <>
      <Head>
        <title>作成</title>
      </Head>
      <Header />
      <TitleText>Create</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(submitData)}>
          <VStack w="70%" m="0 auto" spacing={7}>
            <FormControl>
              <Input
                id="title"
                bg="white"
                variant="outline"
                placeholder="タイトルを入力"
                required
                {...register("title")}
              />
            </FormControl>
            <FormControl>
              <Textarea
                id="text"
                bg="white"
                h="300px"
                placeholder="本文を入力"
                required
                {...register("text")}
              />
            </FormControl>
            <Button type="submit">作成</Button>
          </VStack>
        </form>
        {msg && <p>{msg}</p>}
      </TodosContainer>
    </>
  );
};

export default Create;

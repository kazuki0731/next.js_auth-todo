import Head from "next/head";
import React, { useContext, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TodosContext } from "../../../contexts/todosProvider";
import Header from "../../../components/header";
import { FormControl } from "@chakra-ui/form-control";
import TodosContainer from "../../../components/todosContainer";
import TitleText from "../../../components/titleText";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { VStack, Text } from "@chakra-ui/layout";
import { Props } from "../../../models";

interface FormData {
  title: string;
  text: string;
  status: string;
}

const Todo: VFC<Props> = () => {
  const { getTodo, changeTodo } = useContext(TodosContext);

  const [msg, setMsg] = useState("");
  const router = useRouter();
  const todoId = router.query.todo;
  const { register, handleSubmit, reset } = useForm<FormData>();

  const changeData = async (data: FormData) => {
    await changeTodo(data, todoId);
    setMsg("変更しました");
  };

  useEffect(() => {
    const getTodoDetail = async () => {
      const res = await getTodo(todoId);
      reset(res);
    };
    getTodoDetail();
  }, [getTodo, todoId, reset]);

  return (
    <>
      <Head>
        <title>編集</title>
      </Head>
      <Header />
      <TitleText>Edit</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(changeData)}>
          <VStack w="70%" m="0 auto" justifyContent="center">
            <FormControl id="title">
              <Input bg="white" required {...register("title")} />
            </FormControl>
            <FormControl id="text">
              <Textarea bg="white" h="300px" required {...register("text")} />
            </FormControl>
            <FormControl w="60%">
              <Select bg="white" {...register("status")}>
                <option value="未着手">未着手</option>
                <option value="着手">着手</option>
                <option value="完了">完了</option>
              </Select>
            </FormControl>
            <Button type="submit">変更する</Button>
          </VStack>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </TodosContainer>
    </>
  );
};

export default Todo;

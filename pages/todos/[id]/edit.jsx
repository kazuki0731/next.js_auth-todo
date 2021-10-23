import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { TodosContext } from "../../../components/TodosProvider";
import Header from "../../../components/header";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import TodosContainer from "../../../components/todosContainer";
import TitleText from "../../../components/titleText";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { VStack, Text } from "@chakra-ui/layout";

const Todo = () => {
  const { getTodo, changeTodo } = useContext(TodosContext);

  const [msg, setMsg] = useState("");
  const router = useRouter();
  const todoId = router.query.todo;
  const { register, handleSubmit, reset } = useForm();

  const changeData = async (data) => {
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
    <div>
      <Head>
        <title>編集</title>
      </Head>
      <Header />
      <TitleText>Edit</TitleText>
      <TodosContainer>
        <form onSubmit={handleSubmit(changeData)}>
          <FormControl>
            <VStack>
              <Input
                id="title"
                bg="white"
                w="70%"
                required
                {...register("title")}
              />
              <Textarea
                id="text"
                bg="white"
                w="70%"
                h="300px"
                required
                {...register("text")}
              />
              <Select bg="white" w="50%" {...register("status")}>
                <option value="未着手">未着手</option>
                <option value="着手">着手</option>
                <option value="完了">完了</option>
              </Select>
              <Button type="submit">変更を保存する</Button>
            </VStack>
          </FormControl>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </TodosContainer>
    </div>
  );
};

export default Todo;

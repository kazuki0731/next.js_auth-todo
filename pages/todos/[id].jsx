import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { TodosContext } from "../../contexts/todosProvider";
import TitleText from "../../components/titleText";
import TodosContainer from "../../components/todosContainer";
import { ListItem, UnorderedList, Text, HStack, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import PageLink from "../../components/pageLink";

const Todo = () => {
  const { getTodo, deleteTodo } = useContext(TodosContext);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({});
  const router = useRouter();
  const todoId = router.query.todo;

  const clickDelete = (id) => {
    deleteTodo(id);
    setMsg("削除しました");
  };

  useEffect(() => {
    const getTodoDetail = async () => {
      const res = await getTodo(todoId);
      setData(res);
    };
    getTodoDetail();
  }, [todoId, getTodo]);

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Header />
      <TitleText>詳細</TitleText>

      {msg ? (
        <p>{msg}</p>
      ) : (
        <TodosContainer>
          <UnorderedList m={0} listStyleType="none">
            <hr />
            <ListItem>
              タイトル: <Text>{data.title}</Text>
            </ListItem>
            <hr />
            <ListItem>
              内容: <Text>{data.text}</Text>
            </ListItem>
            <hr />
            <ListItem>
              進捗:
              <Text color={data.status === "完了" ? "green" : "red"}>
                {data.status}
              </Text>
            </ListItem>
            <hr />
          </UnorderedList>
          <HStack justify="center" mt={2}>
            <PageLink
              href={{
                pathname: "/todos/[id]/edit",
                query: { todo: todoId },
              }}
              url={`/todos/${router.query.id}/edit`}
            >
              <Button color="blackAlpha.800">編集</Button>
            </PageLink>
            <Box>
              <Button onClick={() => clickDelete(data.id)}>削除</Button>
            </Box>
          </HStack>
        </TodosContainer>
      )}
    </>
  );
};

export default Todo;

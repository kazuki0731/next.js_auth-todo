import { Box, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/authProvider";
import Header from "../../components/header";
import PageLink from "../../components/pageLink";
import TitleText from "../../components/titleText";
import TodosContainer from "../../components/todosContainer";
import { TodosContext } from "../../components/TodosProvider";

const Index = () => {
  const { todos } = useContext(TodosContext);
  const [isLogin, setIsLogin] = useState(false);
  const { currentUser, isGetAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (isGetAuth) {
      if (!currentUser) {
        router.push("/signin");
        return;
      } else {
        setIsLogin(true);
      }
    }
  }, [isGetAuth, currentUser, router]);

  return (
    isLogin && (
      <Box>
        <Head>
          <title>一覧</title>
        </Head>
        <Header />
        <TitleText>Todos</TitleText>
        <TodosContainer>
          <UnorderedList m="0 auto">
            <hr />
            {todos.map((todo) => (
              <ListItem listStyleType="none" key={todo.id}>
                <Flex>
                  <Box m="0 auto">
                    <PageLink
                      href={{
                        pathname: "/todos/[id]",
                        query: { todo: todo.id },
                      }}
                      url={`/todos/${todo.title}`}
                    >
                      <Text fontWeight="semibold">{todo.title}</Text>
                    </PageLink>
                  </Box>
                  <Box w="100px">
                    <Text color={todo.status === "完了" ? "green" : "red"}>
                      {todo.status}
                    </Text>
                  </Box>
                </Flex>
                <hr />
              </ListItem>
            ))}
          </UnorderedList>
        </TodosContainer>
      </Box>
    )
  );
};

export default Index;

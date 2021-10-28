import { Box, Flex, Button, Text } from "@chakra-ui/react";
import React, { useContext, VFC } from "react";
import { AuthContext } from "../contexts/authProvider";
import { TodosContext } from "../contexts/todosProvider";
import PageLink from "./pageLink";

const Header: VFC = () => {
  const { currentUser, signout } = useContext(AuthContext);
  const { setTodos } = useContext(TodosContext);

  const clickSignout = () => {
    signout();
    setTodos([]);
  };

  return (
    <>
      <Box bg="tomato" p={1}>
        <Flex justify="space-between" alignItems="center" w="95%" m="0 auto">
          <Box>
            <PageLink mr={8} href="/todos">
              一覧
            </PageLink>
            <PageLink mr={8} href="/todos/create">
              作成
            </PageLink>
            <PageLink href="/mypage">マイページ</PageLink>
          </Box>
          {currentUser && (
            <Box>
              <Text fontWeight="semibold" display="inline" mr={6}>
                {currentUser.displayName} さん
              </Text>
              <Button mb={1} onClick={clickSignout}>
                ログアウト
              </Button>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Header;

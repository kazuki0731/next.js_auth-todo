import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/authProvider";
import { TodosContext } from "../contexts/todosProvider";
import PageLink from "./pageLink";

const Header = ({ children }) => {
  const { currentUser, signout } = useContext(AuthContext);
  const { setTodos } = useContext(TodosContext);

  const clickSignout = () => {
    signout();
    setTodos([]);
  };

  return (
    <div>
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
          {children}
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
    </div>
  );
};

export default Header;

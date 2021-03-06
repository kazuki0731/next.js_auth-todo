import PageLink from "../components/pageLink";
import { useContext, VFC } from "react";
import { AuthContext } from "../contexts/authProvider";
import Head from "next/head";
import { Box, Heading } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";

const Home: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Todoリスト</title>
      </Head>
      <Box bg="tomato" p="2">
        <PageLink href={currentUser ? "/todos" : "/signin"}>
          Todoページへ
        </PageLink>
      </Box>
      <Heading as="h2" size="3xl" mt={5}>
        Topページ
      </Heading>
    </>
  );
};

export default Home;

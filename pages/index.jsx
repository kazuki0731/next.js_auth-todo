import PageLink from "../components/pageLink";
import { useContext } from "react";
import { AuthContext } from "../components/authProvider";
import Head from "next/head";
import { Box, Heading } from "@chakra-ui/layout";

export default function Home() {
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
}

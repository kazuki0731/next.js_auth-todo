import { Button } from "@chakra-ui/button";
import { ListItem, UnorderedList } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/authProvider";
import Header from "../components/header";
import TitleText from "../components/titleText";
import TodosContainer from "../components/todosContainer";

const Mypage = () => {
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
  }, [isGetAuth]);

  return (
    <>
      <Header />
      {isLogin && (
        <>
          <TitleText>マイページ</TitleText>
          <TodosContainer>
            <UnorderedList spacing={7} listStyleType="none">
              <ListItem>
                ユーザー名: <strong>{currentUser.displayName}</strong>
              </ListItem>
              <ListItem>
                メールアドレス: <strong>{currentUser.email}</strong>
              </ListItem>
              <ListItem>
                id: <strong>{currentUser.uid}</strong>
              </ListItem>
              <Button onClick={() => router.back()}>戻る</Button>
            </UnorderedList>
          </TodosContainer>
        </>
      )}
    </>
  );
};

export default Mypage;

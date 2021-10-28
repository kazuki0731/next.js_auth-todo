import { Text } from "@chakra-ui/layout";
import { VFC } from "react";
import { Props } from "../models";

const TitleText: VFC<Props> = ({ children }) => {
  return (
    <Text as="h1" fontSize="4xl" m={1}>
      {children}
    </Text>
  );
};

export default TitleText;

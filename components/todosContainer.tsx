import { Box } from "@chakra-ui/layout";
import { VFC } from "react";
import { Props } from "../models";

const TodosContainer: VFC<Props> = ({ children }) => {
  return (
    <Box bg="blackAlpha.300" w="70%" m="0 auto" padding="20px" minH="70vh" borderRadius={10}>
      {children}
    </Box>
  );
};

export default TodosContainer;

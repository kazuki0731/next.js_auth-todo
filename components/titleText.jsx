import { Text } from "@chakra-ui/layout";

const TitleText = ({ children }) => {
  return (
    <Text as="h1" fontSize="4xl" m={1}>
      {children}
    </Text>
  );
};
export default TitleText;

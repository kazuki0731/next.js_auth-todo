import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../contexts/authProvider";
import TodosProvider from "../contexts/todosProvider";
import { theme } from "../styles/theme";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;

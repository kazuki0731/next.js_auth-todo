import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../contexts/authProvider";
import TodosProvider from "../contexts/todosProvider";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TodosProvider>
          <Component {...pageProps} />
        </TodosProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

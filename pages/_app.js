import AuthProvider from "../components/authProvider";
import TodosProvider from "../components/TodosProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </AuthProvider>
  );
}

export default MyApp;

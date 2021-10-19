import { createContext, useEffect, useState } from "react";
import { auth } from "../src/firebase";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isGetAuth, setIsGetAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsGetAuth(true);
    });
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/todos");
    } catch (e) {
      console.log(e);
    }
  };

  const signout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signout,
    isGetAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

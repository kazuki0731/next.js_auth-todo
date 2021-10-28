import { createContext, useEffect, useState, VFC } from "react";
import { auth } from "../src/firebase";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { Props } from "../models";

export const AuthContext = createContext(null);

const AuthProvider: VFC<Props> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | {}>(null);
  const [isGetAuth, setIsGetAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsGetAuth(true);
    });
  }, []);
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return e.code;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (e) {
      console.log(e.code);
      return e.code;
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
    signup,
    signout,
    isGetAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

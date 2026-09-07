"use client";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = app;
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const syncUserToken = async (email) => {
    if (!email) return null;
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL 
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`
      : "/api/auth/sign-in";

    try {
      const res = await axios.post(apiUrl, { email }, { withCredentials: true });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        return res.data.token;
      }
    } catch (err) {
      console.warn("Token sync failed:", err?.response?.data || err.message);
    }
    return null;
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result?.user?.email) {
        await syncUserToken(result.user.email);
        setUser(result.user);
      }
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
    } catch (e) {
      console.warn("Logout API error:", e);
    }
    setLoading(false);
    return signOut(auth);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user?.email) {
        await syncUserToken(result.user.email);
        setUser(result.user);
      }
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await syncUserToken(currentUser.email);
      } else {
        localStorage.removeItem("token");
        try {
          await axios.post("/api/logout", {}, { withCredentials: true });
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

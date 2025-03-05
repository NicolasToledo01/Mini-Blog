import { db, auth } from "../firebase/config"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  //clenup
  // deal with memory leak - para nao vazar memoria 

  const [cancelled, setCancelled] = useState(false)


  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      await updateProfile(user, {
        displayName: data.displayName
      });

      setLoading(false);

      return user;

    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      let systemErrorMessage;

      if (error.message.includes("password")) {
        systemErrorMessage = "as senhas precisam ter 6 caracteres  ";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "email já cadastrado";
      } else {
        systemErrorMessage = "ocorreu um erro, por favor tente mais tarde";
      }

      setLoading(false);

      setError(systemErrorMessage)
    }

  };

  //login sign in 

  // login - sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      systemErrorMessage = "Senha ou E-mail incorretos.";

      setError(systemErrorMessage);
      setLoading(false);
    }
  };


  //logout sign out

  const logout = () => {
    checkIfIsCancelled()

    signOut(auth)
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };

};
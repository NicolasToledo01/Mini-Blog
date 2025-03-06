import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";


const initializeState = {
  loading: null,
  error: null
}

const insertReducer = (state, action) => {

  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }

}

export const UseInsertDocument = (docCollection) => {

  const [response, dispatch] = useReducer(insertReducer, initializeState)

  // deal with memory leak
  const [cancelled, setCanselled] = useState(false);

  const checkCancelBeforeDispath = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  }

  const insertDocument = async (document) => {

    checkCancelBeforeDispath({
      type: "LOADING",
    })

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() }

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancelBeforeDispath({
        type: "INSERTED_DOC",
        payload: insertedDocument
      })

    } catch (error) {

      checkCancelBeforeDispath({
        type: "ERROR",
        payload: Error.message,
      })

    }
  };

  useEffect(() => {
    return () => setCanselled(true)
  }, [])

  return { insertDocument, response }
}

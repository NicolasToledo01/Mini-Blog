import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, } from "firebase/firestore";

export const UseFetchDocuments = (docCollection, search = null, uid = null) => {

  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  // deal with memory leak
  const [cancelled, setCanselled] = useState(false);

  useEffect(() => {

    async function loadData() {
      if (cancelled) return

      setLoading(true)

      const collectionRef = await collection(db, docCollection)

      try {

        let q
        //busca 
        //dashboard

        q = await query(collectionRef, orderBy("createAt", " desc "));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    }
    loadData();
  }, [docCollection, search, uid, cancelled])

  console.log(documents);

  useEffect(() => {
    return () => setCanselled(true)
  }, []);

  return { documents, loading, error };
};
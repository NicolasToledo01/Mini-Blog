import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const UseFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);


      const collectionRef = collection(db, docCollection);

      let q;

      if (search) {
        q = await query(
          collectionRef,
          where("tags", "array-contains", search),
          orderBy("createdAt", "desc")
        );
      } else if (uid) {
        q = await query(
          collectionRef,
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        );
      } else {
        q = await query(collectionRef, orderBy("createdAt", "desc"));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Loaded documents:", docs); // Log dos documentos carregados
        if (!cancelled) {
          setDocuments(docs);
        }
        setLoading(false);
      }, (error) => {
        if (!cancelled) {
          console.error("Error fetching documents:", error);
          setError(error.message);
          setLoading(false);
        }
      });

      return () => {
        // Limpa a assinatura quando o componente é desmontado
        unsubscribe();
        setCancelled(true);
      };
    };

    loadData();
  }, [docCollection, cancelled, search, uid]);

  return { documents, loading, error };
};
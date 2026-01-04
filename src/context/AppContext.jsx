import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user: currentUser } = useAuth();

  const [tab, setTab] = useState("home");
  const [uploading, setUploading] = useState(false);

  // NEW: State to hold the live data
  const [transactions, setTransactions] = useState([]);

  // NEW: Fetch Data Logic (Real-time)
  useEffect(() => {
    if (!currentUser) {
      setTransactions([]); // Clear data if logged out
      return;
    }

    // 1. Create a query to get ONLY this user's data
    const q = query(
      collection(db, "transactions"), // Make sure this matches your collection name
      where("userId", "==", currentUser.uid)
      // orderBy("date", "desc") // <--- Uncomment this later once you create an Index (I'll explain below)
    );

    // 2. Set up the listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Transactions:", liveData); // Debugging
      setTransactions(liveData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [currentUser]); // Re-run if user changes

  // ... (Your existing uploadFileToStorage function stays here) ...
  const uploadFileToStorage = async (file) => {
    if (!file) return null;
    const fileName = `${new Date().getTime()}_${file.name}`;
    const imageRef = ref(
      storage,
      `users/${currentUser.uid}/expenses/${fileName}`
    );
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  // ... (Your existing uploadNewExpense function stays here) ...
  const uploadNewExpense = async (payloadObject) => {
    if (!currentUser) return null;
    setUploading(true);
    let image_URLs = [];

    try {
      if (payloadObject.image1) {
        const url1 = await uploadFileToStorage(payloadObject.image1);
        if (url1) image_URLs.push(url1);
      }
      if (payloadObject.image2) {
        const url2 = await uploadFileToStorage(payloadObject.image2);
        if (url2) image_URLs.push(url2);
      }

      const expenseData = {
        ...payloadObject,
        image1: null,
        image2: null,
        imageURLs: image_URLs,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "transactions"), expenseData);
      return docRef.id;
    } catch (error) {
      console.error(error);
      alert(error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    // NEW: Pass 'transactions' to the provider so the UI can read it
    <AppContext.Provider
      value={{ tab, setTab, uploadNewExpense, uploading, transactions }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

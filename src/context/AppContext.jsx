import { createContext, useContext, useEffect, useState } from "react";
// FIX 1: Added serverTimestamp to imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // removed 'auth' since you use AuthContext
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user: currentUser } = useAuth();

  const [tab, setTab] = useState("home");
  // This state controls the loading spinner
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    console.log("This is the current tab", tab);
  }, [tab]);

  // Helper function to handle image upload
  const uploadFileToStorage = async (file) => {
    if (!file) return null;

    // Create a unique path (e.g., "users/{userId}/expenses/image_name")
    const fileName = `${new Date().getTime()}_${file.name}`;

    // Security: We save it under the specific user's folder
    const imageRef = ref(
      storage,
      `users/${currentUser.uid}/expenses/${fileName}`
    );

    // Upload the image
    await uploadBytes(imageRef, file);

    // Get its URL
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const uploadNewExpense = async (payloadObject) => {
    if (!currentUser) {
      alert("You must be logged in");
      return null;
    }

    setUploading(true); // Start loading
    let image_URLs = [];

    try {
      // 1. Upload Image 1
      if (payloadObject.image1) {
        const url1 = await uploadFileToStorage(payloadObject.image1);
        if (url1) image_URLs.push(url1);
      }

      // 2. Upload Image 2
      if (payloadObject.image2) {
        const url2 = await uploadFileToStorage(payloadObject.image2);
        if (url2) image_URLs.push(url2);
      }

      // 3. Prepare data for Firestore
      const expenseData = {
        ...payloadObject,
        image1: null, // Don't save raw file objects to DB
        image2: null,
        imageURLs: image_URLs, // Save the array of links
        userId: currentUser.uid,
        createdAt: serverTimestamp(), // Uses server time
      };

      // 4. Save to 'transactions' collection (Matching your likely read logic)
      // I changed this from 'expenses' to 'transactions' to match your earlier setup,
      // but you can change it back if you prefer 'expenses'.
      const docRef = await addDoc(collection(db, "transactions"), expenseData);

      alert("Expense successfully recorded!");
      return docRef.id;
    } catch (error) {
      console.error("Failed to process expense upload:", error);
      alert(error.message);
      return null;
    } finally {
      setUploading(false); // Stop loading regardless of success/fail
    }
  };

  return (
    // FIX 2: Passed 'uploading' to the value so the UI can use it
    <AppContext.Provider value={{ tab, setTab, uploadNewExpense, uploading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

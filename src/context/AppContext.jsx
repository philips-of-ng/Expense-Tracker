import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// NOTE: We removed 'storage', 'ref', 'uploadBytes' imports
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

// ==========================================
// 👇 PASTE YOUR CLOUDINARY DETAILS HERE 👇
// ==========================================
const CLOUD_NAME = "dak5lgud6"; // e.g. "demo"
const UPLOAD_PRESET = "phintrackr_upload"; // e.g. "phintrackr_upload"

export const AppProvider = ({ children }) => {
  const { user: currentUser } = useAuth();

  const [tab, setTab] = useState("home");
  const [uploading, setUploading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      return;
    }

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(liveData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 2. NEW: Cloudinary Upload Function
  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    // Optional: Organize files in a specific Cloudinary folder
    formData.append("folder", `users/${currentUser.uid}`);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await response.json();
      console.log("Image uploaded to:", data.secure_url);
      return data.secure_url; // This is the public link
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  // 3. Main Upload Logic (Updated)
  const uploadNewExpense = async (payloadObject) => {
    if (!currentUser) {
      alert("Please log in first.");
      return null;
    }

    setUploading(true);
    let image_URLs = [];

    try {
      // Upload Image 1 to Cloudinary
      if (payloadObject.image1) {
        const url1 = await uploadToCloudinary(payloadObject.image1);
        if (url1) image_URLs.push(url1);
      }

      // Upload Image 2 to Cloudinary
      if (payloadObject.image2) {
        const url2 = await uploadToCloudinary(payloadObject.image2);
        if (url2) image_URLs.push(url2);
      }

      // Prepare data for Firestore
      const expenseData = {
        ...payloadObject,
        image1: null, // Don't save raw file
        image2: null,
        imageURLs: image_URLs, // Save the Cloudinary links
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      };

      // Save to Firestore (Stays the same)
      const docRef = await addDoc(collection(db, "transactions"), expenseData);

      alert("Successfully saved!");
      return docRef.id;
    } catch (error) {
      console.error(error);
      alert("Error saving transaction: " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ tab, setTab, uploadNewExpense, uploading, transactions }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

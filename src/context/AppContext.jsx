import { createContext, useContext, useEffect, useState } from 'react';
// import { uploadImage } from 'firebase/firestore'

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const AppContext = createContext();


export const AppProvider = ({ children }) => {

  const [tab, setTab] = useState('home');

  useEffect(() => {
    console.log('This is the currrent tab', tab);
  }, [tab])

  //IMAGE UPLOAD SETUP

  const uploadImage = async (file, userId) => {
    if (!file) return null;

    // Create a unique path (e.g., "users/{userId}/profile.jpg")
    const imageRef = ref(storage, `users/${userId}/${file.name}`);

    // Upload the image
    await uploadBytes(imageRef, file);

    // Get its URL
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  };


  const [uploading, setUploading] = useState(false)

  const handleUpload = async (file) => {
    if (!file) return alert("No file or user!");
    setUploading(true);

    try {
      const imageUrl = await uploadImage(file, currentUser.uid);
      setUrl(imageUrl);
      alert("Upload successful!");
      return imageUrl
    } catch (error) {
      console.error("Upload failed:", error);
      return null
    } finally {
      setUploading(false);
    }
  };

  const uploadNewExpense = async (payLoadObjact) => {
    console.log('I GOT THE PAYLOAD', payLoadObjact);

    let image_URLs = []

    if (!payLoadObjact.image1 == null || !payLoadObjact.image2 == null) {
      const image1_url = await handleUpload(payLoadObjact.image1)
      const image2_url = await handleUpload(payLoadObjact.image2)

      image_URLs.push(image1_url)
      image_URLs.push(image2_url)
    }

    try {

    } catch (error) {

    }

  }

  return (
    <AppContext.Provider value={{ tab, setTab, uploadNewExpense }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

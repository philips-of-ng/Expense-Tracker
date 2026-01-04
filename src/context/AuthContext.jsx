import { createContext, useState, useContext, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  
  // 🔹 SIGN UP FUNCTION
  const signUp = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;

      // Update Firebase profile
      await updateProfile(createdUser, { displayName: name });

      // Save user data in Firestore
      await setDoc(doc(db, "users", createdUser.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully!");
      setUser(createdUser);
      return createdUser;
    } catch (error) {
      console.error("Signup error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        case "auth/weak-password":
          toast.error("Password must be at least 6 characters.");
          break;
        case "auth/missing-email":
          toast.error("Email field is required.");
          break;
        default:
          toast.error("Signup failed. Please try again.");
      }
    }
  };

  // 🔹 LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      setUser(loggedInUser);
      toast.success("Logged in successfully!");
      return loggedInUser;
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":
          toast.error("Invalid email or password.");
          break;
        default:
          toast.error("Login failed. Try again.");
      }
    }
  };

  // 🔹 LOGOUT FUNCTION
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      toast.info("Logged out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  // 🔹 TRACK AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);

        // Listen for real-time updates
        const unsubUser = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setUserData(snap.data());
            console.log("✅ User data synced:", snap.data());
          } else {
            console.log("⚠️ No Firestore record found for this user");
          }
        });

        return unsubUser;
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

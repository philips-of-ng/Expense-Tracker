import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState()

  const login_AC = (userInfo) => {
    localStorage.setItem('userInfo', userInfo)
    setUser(userInfo)

    console.log('User info saved', userInfo);    
  }

  const logout_AC = () => {
    localStorage.removeItem('userInfo')
  }

  useEffect(() => {
    console.log('AUTH CONTEXT IS WORKING');
  }, [])


  return (
    <AuthContext.Provider value={{ login_AC, logout_AC, user }}>
      { children }
    </AuthContext.Provider>
  )
}







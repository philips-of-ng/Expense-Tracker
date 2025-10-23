import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

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

  const value = { user, setUser, login_AC, logout_AC }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider


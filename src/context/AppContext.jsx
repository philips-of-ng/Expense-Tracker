import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();


export const AppProvider = ({ children }) => {

  const [tab, setTab] = useState('home');

    useEffect(() => {
    console.log('This is the currrent tab', tab);
  }, [tab])

  
  return (
    <AppContext.Provider value={{ tab, setTab }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

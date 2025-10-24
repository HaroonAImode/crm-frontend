// src/context/AppContextValue.jsx
import { createContext, useContext } from 'react';

// Context object and a small hook live in this file so Fast Refresh only sees
// non-component exports here (keeps eslint react-refresh happy).
export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export default AppContext;

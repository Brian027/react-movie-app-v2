import React, { createContext, useContext } from 'react'
import { RenderNavigation } from './RenderNavigation';
import Navbar from '../components/navbar/Navbar';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  return (
    <AuthContext.Provider value={{}}>
        <Navbar />
        <RenderNavigation />
    </AuthContext.Provider>
  )
}

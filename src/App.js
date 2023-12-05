import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './config/AuthWrapper';


function App() {
  return (
    <BrowserRouter>
      <AuthWrapper />
    </BrowserRouter>
  )
}
export default App;

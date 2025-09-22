// In src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header'; 

const App = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
      <Header /> 
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
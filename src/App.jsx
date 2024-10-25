import React from 'react';
import Header from './components/Header';
import MainRoutes from './routes/MainRoutes';
import Footer from './components/Footer';
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <MainRoutes />
      <Footer />  

      
     
    </div>
  );
};

export default App;




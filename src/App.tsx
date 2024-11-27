import './App.css';
import React, { useEffect, useState } from 'react';
import LoginPanel from './components/LoginPanel';
import RegisterPanel from './components/RegisterPanel';
import ConfirmEmailPanel from './components/ConfirmEmailPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PopupProvider } from './context/PopupContext';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './components/AuthComponents/PublicRoute';
import ProtectedRoute from './components/AuthComponents/ProtectedRoute';
import DashboardPanel from './components/DashboardPanel';

const App: React.FC = () => {

  const [popupMessage, setPopupMessage] = useState('');
  const [popupDisplay, setPopupDisplay] = useState(false);

  useEffect( () => {
    if(!popupDisplay)
      return;
  }, [popupDisplay])

  const showMessage = (message : string) => {
    setPopupMessage(message);
    setPopupDisplay(true);
  }

  return (
    <>

      <PopupProvider>
      <AuthProvider>
        <Router>
            <Routes>
                {/* Páginas independentes */}
                {/* <Route path="/" element={<Home />} /> */}
                
                {/* Rotas públicas */}
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPanel />} />
                  <Route path="/register" element={<RegisterPanel />} />
                  <Route path="/confirm-email" element={<ConfirmEmailPanel showMessage={showMessage} />} />
                </Route>

                {/* Rotas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPanel />} />
                </Route>                
                <Route path="/login" element={<LoginPanel />} />


            </Routes>
        </Router>            
      </AuthProvider>
      </PopupProvider>

    </>


  );
};

export default App;

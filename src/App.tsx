import './App.css';
import React from 'react';
import LoginPanel from './components/LoginPanel';
import RegisterPanel from './components/RegisterPanel';
import ConfirmEmailPanel from './components/ConfirmEmailPanel';

const App: React.FC = () => {
  return (
    <>
      {/* <LoginPanel />
      <RegisterPanel /> */}
      <ConfirmEmailPanel/>
    </>
  );
};

export default App;

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { WarningOutlined } from '@ant-design/icons';
// Define a interface do contexto
interface PopupContextType {
    isVisible: boolean;
    message: string;
    showPopup: (message : string) => void;
}

// Cria o contexto com um valor padrão
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Cria o provedor do contexto
const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setNewMessage] = useState('');


    const showPopup = (message : string) => 
    {
        setNewMessage(message);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 6000);
    }

    return (
        <PopupContext.Provider value={{ isVisible, message, showPopup }}>
            {children}
                <div className={`popup ${isVisible? "visible":"invisible"}`}>
                    <div className='popup-icon'>
                        <WarningOutlined></WarningOutlined>
                    </div>
                    {message}
                </div>            
        </PopupContext.Provider>
    );
};

// Hook para usar o contexto de tema
const usePopupContext = () => {
    const context = useContext(PopupContext);
    if (!context) {
      throw new Error("PopupContext deve ser usado dentro de um ThemeProvider");
    }
    return context;
  };

export { usePopupContext, PopupProvider };

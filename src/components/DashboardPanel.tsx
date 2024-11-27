import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopupContext } from '../context/PopupContext';
import { useAuthContext } from '../context/AuthContext';



const DashboardPanel: React.FC = () => {

    const { logout } = useAuthContext();
    const { showPopup } = usePopupContext();
    const navigate = useNavigate();

    return(
        <>
            Você está logado!
        </>   
    );
}

export default DashboardPanel;

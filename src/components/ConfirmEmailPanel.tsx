import '../style/ConfirmEmailPanel.css';
import React, {useEffect, useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import { LoginResponse } from '../models/LoginResponse';
import { useNavigate } from 'react-router-dom';
import { ResendConfirmationCodeRequest } from '../models/ResendConfirmationCodeRequest';
import { resendCode, confirmUser } from '../api/userService';
import { ConfirmUserRequest } from '../models/ConfirmUserRequest';

interface ConfirmEmailPanelProps { showMessage: (message: string) => void;
}

type FormData = {
    code: string;
}

const schema = Yup.object().shape({
    code: Yup.string().required("Insira o código enviado para o seu e-mail"),
  });

const RegisterPanel: React.FC<ConfirmEmailPanelProps> = ({ showMessage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state as LoginResponse | undefined;
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!data) {
            navigate("/login");
        }
      }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
      });
    
      const onSubmit: SubmitHandler<FormData> = async form => {
        let request = new ConfirmUserRequest(form.code, data?.username!)
        let response = await confirmUser(request);

        if(response.ok)
        {
            navigate("/login");
        }
        else if(response.message)
        {
            setErrorMsg(response.message!);
        }
        else
        {
            setErrorMsg("Falha ao comunicar com o servidor.");
        }
        
      };

      const onResendCode = async () =>{
        let request = new ResendConfirmationCodeRequest(data?.username);
        var response = await resendCode(request);
        if(response.value)
        {
            console.log("teste");
            showMessage("Dados reenviandos");
            return;
        }
        showMessage("Falha ao reenviar código: " + response.message);
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='background'>
                <div className='centered-panel'>
                    <div className='confirm-logo'>
                        <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`}/>
                        OURPLANS
                    </div>
                    <div className='confirm-panel'>
                        <img className='confirm-img' src={`${process.env.PUBLIC_URL}/images/confirm_email.png`}/>
                        <h3>Verifique o seu E-mail</h3>
                        <span>Bem vindo, 'Nome', um código de segurança foi enviado para o seu e-mail, insira no campo abaixo para confirmar o registro. </span>
                        <input className='code-input' maxLength={6} {...register("code")} />
                        <p>{errors.code?.message}</p>
                        <button type="submit">Confirmar</button>
                        <p>{errorMsg}</p>
                        <div className='resend'>
                            <span>Não recebeu o e-mail?   </span>
                            <a href='#' onClick={onResendCode}>Enviar novamente</a>
                        </div>
                    </div>
                </div>
            </div>               
        </form>        
    );
}

export default RegisterPanel;

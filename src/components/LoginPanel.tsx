import '../style/LoginPanel.css';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {loginUser} from '../api/userService'
import {LoginRequest} from '../models/LoginRequest'
import { useNavigate } from 'react-router-dom';
import { usePopupContext } from '../context/PopupContext';
import { useAuthContext } from '../context/AuthContext';

type FormData = {
    email: string;
    password: string;
}

const schema = Yup.object().shape({
    email: Yup.string().required("Insira o email"),//email("E-mail inválido")
    password: Yup.string().required("Insira a senha"),
  });

const LoginPanel: React.FC = () => {

    const { login } = useAuthContext();
    const { showPopup } = usePopupContext();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
      });
    
      const onSubmit: SubmitHandler<FormData> = async data => {
        let request = new LoginRequest(data.email, data.password);
        var response = await loginUser(request);
        if(response.value != null)
        {
            if(response.value.needsConfirmation)
            {
                navigate("/confirm-email", { state: response.value });
            }
            else
            {
                login();
                navigate("/dashboard");
            }
        }
      };
    
      const Testar = () => {
          showPopup("Este é um teste de popup, pode ser que tenha dado algum erro...");
      }
      

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='page'></div>
            <div className="internal-painel">
                <div className='left-panel'>
                    <img className='logo-info' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo"/>
                    <div className='logo-name'>
                        <span className='logo-title'>OUR PLANS</span>
                        <div className='logo-description'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown.
                        </div>
                    </div>
                </div>
                <div className="login-panel">
                    <div className='login-panel-content'>
                        <img className='logo-mobile' src={`${process.env.PUBLIC_URL}/images/logo_invertido.png`} alt="Logo Mobile"/>                        
                        <h3>Bem Vindo</h3> 
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown.</p>
                        <div className='login-form'>
                            <div className="form-group">
                                <input {...register("email")} placeholder='Email' autoComplete='section-login login currentEmail'/>
                                <p>{errors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <input type='password' {...register("password")} placeholder='Senha' autoComplete='section-login login currentPassword'/>
                                <p>{errors.password?.message}</p>
                            </div>
                            <div className='form-button-remember'>
                                <input type='checkbox'/> 
                                <span>Lembrar-me</span>
                                <div className='forgot-password'>
                                    <span>Esqueci minha senha</span>
                                </div>
                            </div>
                            <div className='button-separation'>
                                <button type="submit">Log in</button>
                                <p>ou</p>
                                <button onClick={Testar} type='button'>Registrar</button>                            
                            </div>                     
                        </div>
                    </div>
                    
                </div>
            </div>    
        </form>        
    );
}

export default LoginPanel;

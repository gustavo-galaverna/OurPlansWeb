import '../style/ConfirmEmailPanel.css';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type FormData = {
    code: string;
}

const schema = Yup.object().shape({
    code: Yup.string().required("Insira o código enviado para o seu e-mail"),
  });

const RegisterPanel: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
      });
    
      const onSubmit: SubmitHandler<FormData> = data => {
        console.log("Dados enviados:", data);
      };

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
                        <input className='code-input' maxLength={10} {...register("code")} />
                        <button type="submit">Confirmar</button>
                        <div className='resend'>
                            <span>Não recebeu o e-mail?   </span>
                            <a href='#'>Enviar novamente</a>
                        </div>
                    </div>
                </div>
            </div>               
        </form>        
    );
}

export default RegisterPanel;

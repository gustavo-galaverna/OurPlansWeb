import '../style/RegisterPanel.css';
import '../style/InputWithLabel.css';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


type FormData = {
    name: string;
    lastname: string;
    birthdate: Date;
    email: string;
    password: string;
    passwordConfirm : string;
    agreeTerms: boolean;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    lastname: Yup.string().required("Sobrenome é obrigatório"),
    birthdate: Yup.date() .transform((value, originalValue) => originalValue === "" ? null : value) .nullable().required("Data de nascimento é obrigatória"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "A senha deve ter entre 8 e 10 caracteres e incluir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial").required("Senha é obrigatória"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], "As senhas precisam ser iguais").required("Confirmação de senha é obrigatória"),
    agreeTerms: Yup.boolean() .oneOf([true], "Você deve aceitar os termos de serviço") .required("Aceitação dos termos é obrigatória"),
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
            <div className='container'>
                <div className='register-panel'>
                    <div className='left-img-menu'></div>
                    <div className='right-register-menu'>                         
                        <div className='right-register-top'>
                            <div className='logo-panel'>
                                <div className='logo-register'>
                                    <img className='logo-register-img' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo"/>
                                </div>
                            </div>                              
                            <div className='register-top-text'>
                                <h5>Registrar</h5>
                                <p>Registre sua conta e comece agora</p>
                            </div>
                        </div>
                        <div className='right-register-form'>
                            <div className='register-form-content'>
                                <div className='input-container small'>
                                    <label>Nome</label>
                                    <input {...register("name")} />
                                    <p>{errors.name?.message}</p>
                                </div>    
                                <div className='input-container small'>
                                    <label>Sobrenome</label>
                                    <input {...register("lastname")} />
                                    <p>{errors.lastname?.message}</p>
                                </div>                                     
                                <div className='input-container small'>
                                    <label>Data de Nascimento</label>
                                    <input {...register("birthdate")} />
                                    <p>{errors.birthdate?.message}</p>
                                </div>     
                                <div className='input-container small'>
                                    <label>Email</label>
                                    <input {...register("email")} />
                                    <p>{errors.email?.message}</p>
                                </div>     
                                <div className='input-container small'>
                                    <label>Senha</label>
                                    <input {...register("password")} />
                                    <p>{errors.password?.message}</p>
                                </div>       
                                <div className='input-container small'>
                                    <label>Confirmação de Senha</label>
                                    <input {...register("passwordConfirm")} />
                                    <p>{errors.passwordConfirm?.message}</p>
                                </div>                                                                                                                         
                                <div className='agree-div'>
                                    <input type='checkbox' {...register("agreeTerms")} />
                                    <span>Eu concordo com os </span>
                                    <a href='#'>termos de serviço.</a>
                                    <p>{errors.agreeTerms?.message}</p>
                                </div>
                                <button type="submit">Registrar</button>
                                <div className='login-panel-redirect'>
                                    Já possui cadastro? <a href='#'>Efetue login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </form>
    );
}

export default RegisterPanel;

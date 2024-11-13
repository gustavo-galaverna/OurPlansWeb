import '../style/LoginPanel.css';
import React from 'react';

const LoginPanel: React.FC = () => {


    return(
        <div>
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
                        <form>
                            <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                placeholder='Email'
                                required
                            />
                            </div>
                            <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                placeholder='Senha'
                                required
                            />
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
                                <button type="submit">Registrar</button>                            
                            </div>
                        </form>                        
                        </div>
                    </div>
                    
                </div>
            </div>    
        </div>        
    );
}

export default LoginPanel;

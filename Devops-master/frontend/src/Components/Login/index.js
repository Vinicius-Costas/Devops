import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';
import styles from './login.module.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await login(email, password);
            if (success) {
                setTimeout(() => {
                    navigate('/annotations'); // Redirecionar para a página após o login
                }, 200);
            } else {
                setError('Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            setError('Email ou senha inválidos');
        }
    };

    // Manipulador de eventos para limpar a mensagem de erro ao começar a digitar
    const handleInputChange = () => {
        setError('');
    };

    return (
        <div className={styles['position-container']}>
            <div className={styles['login-container']}>
                <h2 className={styles['login-title']}>Login</h2>
                <p className={`${styles['error-message']} ${error ? styles['visible'] : ''}`}>
                    {error && error}
                </p>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleInputChange(); // Limpar a mensagem de erro
                            }}
                            className={styles['login-input']}
                        />
                    </label>
                    <label>
                        Senha:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleInputChange(); // Limpar a mensagem de erro
                            }}
                            className={styles['login-input']}
                        />
                    </label>
                    <button type="submit" className={styles['login-button']}>
                        Login
                    </button>
                </form>
                <button onClick={() => navigate('/register')} className={styles['login-register-button']}>
                    Não é cadastrado? Clique aqui
                </button>
            </div>
        </div>
    );
}

export default Login;

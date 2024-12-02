// Register.js

import styles from './register.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Limpar o estado de erro antes de tentar o registro novamente
            setError(null);

            // Verificar se os campos obrigatórios estão preenchidos
            if (!name || !email || !password) {
                setError('Todos os campos são obrigatórios');
                return;
            }

            // Verificar se a senha atende aos critérios
            if (password.length < 6) {
                setError('A senha deve ter pelo menos 6 caracteres');
                return;
            }

            // Chamar a função de registro
            const response = await register(name, email, password);

            if (response.error) {
                setError(response.error);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Erro durante o registro:', error);

            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Email já cadastrado. Por favor, tente novamente com um email diferente');
            }
        }
    };

    // Manipulador de eventos para limpar a mensagem de erro ao começar a digitar
    const handleInputChange = () => {
        setError(null);
    };

    return (
        <div className={styles['position-container']}>
            <div className={styles['register-container']}>
                <h2 className={styles['register-title']}>Cadastre-se</h2>
                {error && <p className={styles['register-error']}>{error}</p>}
                <form onSubmit={handleRegister}>
                    <label className={styles['register-label']}>
                        Nome:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                handleInputChange(); // Limpar a mensagem de erro
                            }}
                            className={styles['register-input']}
                        />
                    </label>
                    <label className={styles['register-label']}>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleInputChange(); // Limpar a mensagem de erro
                            }}
                            className={styles['register-input']}
                        />
                    </label>
                    <label className={styles['register-label']}>
                        Senha:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleInputChange(); // Limpar a mensagem de erro
                            }}
                            className={styles['register-input']}
                        />
                    </label>
                    <button type="submit" className={styles['register-button']}>
                        Registrar
                    </button>
                </form>
                <button onClick={() => navigate('/login')} className={styles['register-login-button']}>
                    Já é cadastrado? Clique aqui
                </button>
            </div>
        </div>
    );
}

export default Register;

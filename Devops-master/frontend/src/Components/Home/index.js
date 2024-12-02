// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Bem-vindo ao Bloco de Notas</h1>
            <p>Comece a escrever suas notas agora!</p>
            <button className="cadastre-se" onClick={() => navigate('/register')}>
                Cadastre-se aqui
            </button>
        </div>
    );
};

export default Home;

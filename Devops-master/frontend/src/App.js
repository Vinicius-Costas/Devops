// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Services/AuthContext';
import Header from './Components/Header'; // Importe o componente de cabeçalho
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Annotations from './Pages/Annotations';
import Footer from './Components/Footer'; // Importe o componente de rodapé

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header /> {/* Adicione o cabeçalho ao início do aplicativo */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/annotations" element={<Annotations />} />
        </Routes>
        <Footer /> {/* Adicione o rodapé ao final do aplicativo */}
      </AuthProvider>
    </Router>
  );
}

export default App;

const validator = require('validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.registerNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação de dados obrigatórios
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios para o registro." });
    }

    // Validação de formato de e-mail
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "O e-mail fornecido não é válido." });
    }

    // Verificar se o e-mail já está cadastrado
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({ error: "Este e-mail já possui registro!" });
    }

    // Criar novo usuário
    const newUser = new User({
      name,
      email,
      password,
    });

    // Gerar Token
    const token = newUser.generateAuthToken();

    // Salvar usuário no banco de dados
    await newUser.save();


    return res.status(201).json({
      message: "Usuário(a) criado(a) com sucesso!",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro durante o registro. Por favor, tente novamente." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação de E-mail
    if (!password || !validator.isEmail(email)) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    // Encontrar usuário
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Erro ao fazer login! Verifique suas credenciais de autenticação.",
      });
    }

    // Comparar Senhas
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Senha incorreta. Tente novamente." });
    }

    // Gerar Token
    const token = await user.generateAuthToken();


    // Salvar usuário no banco de dados
    await user.save();

    return res.status(200).json({
      message: "Usuário(a) logado(a) com sucesso!",
      user,
      token
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Erro durante o login. Por favor, tente novamente." });
  }
};


exports.logoutUser = async (req, res) => {
  try {
    // Remove o token atual da lista de tokens do usuário
    const tokenToRemove = req.token;
    const userTokens = req.user.tokens;

    if (!tokenToRemove || !userTokens.some(token => token.token === tokenToRemove)) {
      return res.status(401).json({ error: 'Token inválido ou não encontrado.' });
    }
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);



    // Salve as alterações no banco de dados
    await req.user.save();
    const savedUser = await User.findById(req.user._id);

    if (!savedUser) {
      return res.status(500).json({ error: 'Erro ao salvar as alterações do usuário.' });
    }


    return res.status(200).json({ message: 'Logout realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro durante o logout. Por favor, tente novamente.' });
  }
};



exports.returnUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar o perfil do usuário. Por favor, tente novamente." });
  }
};

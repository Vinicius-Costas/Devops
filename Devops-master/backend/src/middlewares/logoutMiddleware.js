const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

async function logoutMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401).json({ error: 'Token não encontrado' });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Falha na verificação do token' });
    }
}

module.exports = logoutMiddleware;

const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const logoutMiddleware = require('../middlewares/logoutMiddleware');



// ==> Rota responsável por Criar um novo 'User': (POST): localhost:3000/api/v1/register
router.post("/register", userController.registerNewUser);

// ==> Rota responsável por realizar um novo login 'User': (POST): localhost:3000/api/v1/login
router.post("/login", userController.loginUser);

// ==> Rota responsável por retornar o perfil/profile do 'User': (GET): localhost:3000/api/v1/userProfile
router.get("/userProfile/:id", auth, userController.returnUserProfile);

// ==> Rota responsável por realizar o logout do 'User': (POST): localhost:3000/api/v1/logout
router.post("/logout", logoutMiddleware, userController.logoutUser);
module.exports = router;

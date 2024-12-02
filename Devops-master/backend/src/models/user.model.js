const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, maxlength: 100, required: true },
    email: { type: String, maxlength: 100, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Middleware para hash da senha antes de salvar
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Método para gerar token de autenticação
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET || 'secret'
  );
  user.tokens = user.tokens.concat({ token });
  return token;
};

// Método para encontrar usuário por credenciais
userSchema.statics.findByCredentials = async function (email, password) {
  if (!password) {
    throw new Error("Senha não fornecida!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Senha incorreta!");
  }

  return user;
};


const User = mongoose.model("User", userSchema);

module.exports = User;

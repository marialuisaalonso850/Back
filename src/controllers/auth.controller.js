const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/Role");
const { TOKEN_EXPIRATION, JWT_SECRET } = require("../../src/controllers/config");

const signupHandler = async (req, res, next) => {
  try {
    const { username, gmail, password, rol } = req.body;

    const newUser = new User({
      username,
      gmail,
      password,
    });

    // Verificar roles
    if (rol) {
      const foundRoles = await Role.find({ name: { $in: rol } });
      newUser.rol = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      newUser.rol = [defaultRole._id];
    }

    // Guardar el objeto de usuario en MongoDB
    const savedUser = await newUser.save();

    // Crear un token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({ token });
  } catch (error) {
    // Manejar casos de error específicos
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    } else if (error.code === 11000) { 
      return res.status(400).json({ message: 'El correo electrónico o el nombre de usuario ya existe' });
    } else {
      next(error);
    }
  }
};

const signinHandler = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ gmail: req.body.gmail }).populate("rol");

    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Contraseña inválida",
      });
    }

    const token = jwt.sign({ id: userFound._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupHandler,
  signinHandler,
};

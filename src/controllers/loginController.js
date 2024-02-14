const { jsonResponse } = require('./jsonResponse');
const User = require('../models/user');
const getUserInfo = require('../models/getUserInfo');

exports.authenticateUser = async (req, res) => {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
        return res.status(400).json(jsonResponse(400, { error: 'Nombre de usuario y contraseña son requeridos.' }));
    }

    try {
        const user = await User.findOne({ gmail });

        if (user) {
            const correctPassword = await user.comparePassword(password, user.password);

            if (correctPassword) {
                // Verifica si el rol es 1 (usuario) o 2 (cliente)
                if (user.rol === 1) {
                    // Es un usuario
                    // Realizar acciones específicas para usuarios si es necesario
                } else if (user.rol === 2) {
                    // Es un cliente
                    // Realizar acciones específicas para clientes si es necesario
                }

                const accessToken = user.createAccessToken();
                const refreshToken = await user.createRefreshToken();

                res.status(200).json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
            } else {
                res.status(400).json(jsonResponse(400, { error: 'Usuario o contraseña incorrectos.' }));
            }
        } else {
            res.status(400).json(jsonResponse(400, { error: 'Usuario no encontrado.' }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error interno del servidor.' }));
    }
};


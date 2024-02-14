const User = require('../models/user');
const { jsonResponse } = require('./jsonResponse');
const sendConfirmationEmail = require('../routes/correos');

exports.createUser = async (req, res) => {
    const { username, gmail, password, rol } = req.body;

    // Verificar que el correo sea válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
        return res.status(400).json(jsonResponse(400, { error: 'Correo inválido.' }));
    }

    // Verificar que la contraseña tenga al menos 8 caracteres, un número y una mayúscula
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json(jsonResponse(400, { error: 'La contraseña debe tener al menos 8 caracteres, un número y una mayúscula.' }));
    }

    try {
        const exists = await User.findOne({ gmail });

        if (exists) {
            return res.status(400).json(jsonResponse(400, { error: 'El correo ya existe.' }));
        }

        const newUser = new User({ username, gmail, password, rol: rol || 1 }); // Si no se proporciona rol, se asigna '1' (usuario)
        await newUser.save();
        sendConfirmationEmail(gmail);

        res.status(200).json(jsonResponse(200, { message: 'Usuario creado.', rol: newUser.rol }));
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error al crear un usuario.' }));
    }
};

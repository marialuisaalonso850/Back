const express = require('express');
const router = express.Router();
const ParqueaderoExistente = require('../models/parqueaderoExistente');

// Obtener todos los parqueaderos existentes
router.get('/', async (req, res) => {
  try {
    const parqueaderos = await ParqueaderoExistente.find();
    res.json(parqueaderos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo parqueadero existente
router.post('/', async (req, res) => {
  const parqueadero = new ParqueaderoExistente({
    name: req.body.name,
    longitud: req.body.longitud,
    latitud: req.body.latitud
  });

  try {
    const nuevoParqueadero = await parqueadero.save();
    res.status(201).json(nuevoParqueadero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener un parqueadero existente por su ID
router.get('/:id', getParqueaderoExistente, (req, res) => {
  res.json(res.parqueadero);
});

// Middleware para buscar un parqueadero existente por su ID
async function getParqueaderoExistente(req, res, next) {
  let parqueadero;
  try {
    parqueadero = await ParqueaderoExistente.findById(req.params.id);
    if (parqueadero == null) {
      return res.status(404).json({ message: 'Parqueadero no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.parqueadero = parqueadero;
  next();
}

module.exports = router;

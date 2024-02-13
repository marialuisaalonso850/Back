const mongoose = require('mongoose');

const parqueaderoExistenteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  longitud: { type: Number, required: true },
  latitud: { type: Number, required: true }
});

const ParqueaderoExistente = mongoose.model('ParqueaderoExistente', parqueaderoExistenteSchema);

module.exports = ParqueaderoExistente;

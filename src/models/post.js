
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  longitud: { 
    type: Number,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  },
  puestos: {
    type: Number,
    required: true,
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rol',
  },
});



const Post = mongoose.model("Post", postSchema);
module.exports = Post;



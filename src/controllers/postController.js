const Post = require('../models/post.js');
const ParqueaderoExistente = require('../models/parqueaderoExistente.js');
const gmail = require('../models/gmailuser.js')

async function createPost(req, res) {
  try {
    // Verificar si ya existe un parqueadero con los mismos datos
    const parqueaderoExistente = await ParqueaderoExistente.findOne({
      name: req.body.name,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
    });

    const gmail = await user.findOne({
      gmail: req.body.gmail
    });

    if (parqueaderoExistente) {
      // Si existe un parqueadero con los mismos datos, crear el post
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        puestos: req.body.puestos,
      });
      await post.save();

      res.send(post);
      res.send(gmail);
    } else {
      // Si no se encuentra un parqueadero existente, registrar un mensaje de log
      console.log('No se encontró un parqueadero existente para los datos proporcionados.');

      // Responder con un error indicando que no se puede crear el post
      res.status(400).send("No se puede crear el post. Los datos del parqueadero no coinciden.");
    }
  
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.send(posts);  
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title, 
        content: req.body.content,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        puestos: req.body.puestos,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  getPostById,
  deletePost
};

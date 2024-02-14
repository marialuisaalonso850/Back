const Post = require('../models/post.js');
const User = require('../models/user.js');

async function createPost(req, res) {
  try {
    // Crea el post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
      puestos: req.body.puestos,
    });
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function insetUserRol(req, res){
  try {
    const user = new User({
      rol: req.body.rol
    });
     
     user.findOne(user._id,{rol:1})
  } catch (error) {
    console.error({message:'error 400'})
  }

}
async function createParqueadero(req, res) {
  try {
    // Busca al usuario que está realizando la acción (asumiendo que está disponible en req.user)
    const user = req.body.rol;

    // Si se encuentra al usuario, actualiza su rol a '2' (cliente)
    if (user) {
      // Suponiendo que User es el modelo de mongoose
      await User.findByIdAndUpdate(User._id, {rol: 2} );
      console.log("actulizacion rol "+User.username);
    } else {
      insetUserRol()
      return res.status(400).send({ message: 'no actualizado' });
    }

    res.status(200).send({ message: 'Rol del usuario actualizado a cliente.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al actualizar el rol del usuario.' });
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
  createParqueadero,
  getAllPosts,
  updatePost,
  getPostById,
  deletePost
};

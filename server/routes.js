// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

const mensajes=[
{
  _id: 'xxxx',
  user:'chavo',
  mensaje:'torta'
},
{
  _id: 'xxxx',
  user:'kiko',
  mensaje:'chavo chavito'
},
{
  _id: 'xxxx',
  user:'chilindrina',
  mensaje:'vamos a juegar'
}

];


// Get mensajes
router.get('/', function (req, res) {
  //res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensajes
router.post('/', function (req, res) {

    const mensaje={
      mensaje:req.body.mensaje,
      user: req.body.user
    };
    mensajes.push(mensaje);

    console.log(mensajes);

    res.json({
      ok:true,
      mensaje
    });

});

//almacenar la suscripcion
router.post('/suscribe',(req, res)=>{
  const suscripion=req.body;
  push.addSubscription( suscripion);
  
  res.json('suscribe')
});

//obtener la key usuario (respuesta)
router.get('/key',(req, res)=>{
  const key = push.getKey();

  res.send(key)
});
//NOSOTROS enviar la notificacion a los usuarios activos 
//REST

router.post('/push',(req,res)=>{

  const post= {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };



  push.sendPush(post);
  res.json(post)
});




module.exports = router;
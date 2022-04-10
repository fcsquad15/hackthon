const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');
const forum = require('./controladores/forum');



const rotas = express();

//rotas para manuseio do usuário
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);//id do usuario
rotas.post('/usuarios/', usuarios.cadastrarUsuario);
rotas.put('/usuarios/:id', usuarios.atualizarUsuario);//id do usuario
rotas.delete('/usuarios/:id', usuarios.deletarUsuario);//id do usuario
rotas.post('/usuarios/habilidades/:id', usuarios.addHabilidade); //id do usuario
rotas.get('/usuarios/habilidades/:id', usuarios.listarHabilidades);//id do usuario
rotas.post('/', usuarios.login);

// rotas para utilidades que não vamos usar no front, usei para testar a conexão com o banco de dados
rotas.post('/habilidades', utilitarios.cadastrarHabilidade);
rotas.post('/horarios', utilitarios.cadastrarHorario);


// rotas para o forum
rotas.get('/forum', forum.listarPerguntas);
rotas.get('/forum/filtro', forum.listarPerguntasFiltroHabilidade);
rotas.get('/forum/:postagem_id', forum.listarComentarios); // id da postagem
rotas.post('/forum/', forum.criarPergunta);
rotas.post('/forum/:postagem_id', forum.comentarPergunta); // id da postagem


module.exports = rotas
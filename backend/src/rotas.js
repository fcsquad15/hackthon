const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');
const forum = require('./controladores/forum');



const rotas = express();

//rotas para manuseio do usuário
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);
rotas.post('/usuarios/', usuarios.cadastrarUsuario);
rotas.put('/usuarios/:id', usuarios.atualizarUsuario);
rotas.delete('/usuarios/:id', usuarios.deletarUsuario);
rotas.post('/usuarios/habilidades/:id', usuarios.addHabilidade);
rotas.get('/usuarios/habilidades/:id', usuarios.listarHabilidades);

// rotas para utilidades que não vamos usar no front, usei para testar a conexão com o banco de dados
rotas.post('/habilidades', utilitarios.cadastrarHabilidade);


// rotas para o forum
rotas.get('/forum', forum.listarPerguntas);
rotas.get('/forum', forum.listarPerguntasFiltroHabilidade);
rotas.get('/forum/:id', forum.listarComentarios);
rotas.post('/forum/', forum.criarPergunta); // id do usuário
rotas.post('/forum/forum/:id', forum.comentarPergunta); // id do usuário


module.exports = rotas
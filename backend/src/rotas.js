const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');
const forum = require('./controladores/forum');
const verificarLogin = require('./intermediarios/verificarlogin');



const rotas = express();

//rotas sem autenticação
rotas.post('/', usuarios.login);
rotas.post('/usuarios/', usuarios.cadastrarUsuario);

// Autenticação
// rotas.use(verificarLogin)

//rotas para manuseio do usuário
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);//id do usuario
rotas.put('/usuarios/', usuarios.atualizarUsuario);//id do usuario
rotas.delete('/usuarios/:id', usuarios.deletarUsuario);//id do usuario
rotas.post('/usuarios/habilidades', usuarios.addHabilidadeUsuario);
rotas.get('/usuarios/habilidades/:id', usuarios.listarHabilidadesUsuario);//id do usuario

// rotas para utilidades que não vamos usar no front, usei para testar a conexão com o banco de dados
rotas.post('/habilidades', utilitarios.cadastrarHabilidade);
rotas.get('/habilidades', utilitarios.listarHabilidade);
rotas.post('/horarios', utilitarios.cadastrarHorario);
rotas.get('/horarios', utilitarios.listarHorario);


// rotas para o forum
rotas.get('/forum', forum.listarPerguntas);
rotas.get('/forum/filtro', forum.listarPerguntasFiltroHabilidade);
rotas.get('/forum/:postagem_id', forum.listarComentarios); // id da postagem
rotas.post('/forum/', forum.criarPergunta);
rotas.post('/forum/:postagem_id', forum.comentarPergunta); // id da postagem


module.exports = rotas
const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');
const forum = require('./controladores/forum');
const mentorias = require('./controladores/mentorias');
const notificacao = require('./controladores/notificacoes');
const verificarLogin = require('./intermediarios/verificarlogin');



const rotas = express();

rotas.post('/', usuarios.login);
rotas.post('/usuarios/', usuarios.cadastrarUsuario);

rotas.post('/habilidades', utilitarios.cadastrarHabilidade);
rotas.get('/habilidades', utilitarios.listarHabilidade);
rotas.post('/horarios', utilitarios.cadastrarHorario);
rotas.get('/horarios', utilitarios.listarHorario);
rotas.post('/areas', utilitarios.cadastrarAreas);
rotas.get('/areas', utilitarios.listarAreas);

// Autenticação
// rotas.use(verificarLogin)

rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);
// rotas.put('/usuarios/', usuarios.atualizarUsuario); //com autenticação
rotas.put('/usuarios/:id', usuarios.atualizarUsuario);
// rotas.delete('/usuarios/', usuarios.deletarUsuario);  // com autenticação
rotas.delete('/usuarios/:id', usuarios.deletarUsuario);
rotas.post('/usuarios/habilidades', usuarios.addHabilidadeUsuario);
rotas.get('/usuarios/habilidades/:id', usuarios.listarHabilidadesUsuario);
rotas.post('/usuarios/areas', usuarios.addAreaUsuario);
rotas.get('/usuarios/areas/:id', usuarios.listarAreaUsuario);

rotas.get('/notificacoes', notificacao.listarNotificacoes);
rotas.post('/notificacoes', notificacao.visualizarTodasNotificacoes);
rotas.post('/notificacoes', notificacao.visualizarTodasNotificacoes);

rotas.get('/forum', forum.listarPerguntas);
rotas.get('/forum/filtro', forum.listarPerguntasFiltroHabilidade);
rotas.get('/forum/:postagem_id', forum.listarComentarios);
rotas.post('/forum/', forum.criarPergunta);
rotas.post('/forum/:postagem_id', forum.comentarPergunta);


rotas.get('/mentorias', mentorias.listarMentores);
rotas.get('/mentorias/filtroHab', mentorias.filtrarMentorTema);
rotas.get('/mentorias/filtroArea', mentorias.filtrarMentorArea);
rotas.get('/mentor', mentorias.listarDias);
rotas.get('/mentor/dias', mentorias.listarDiasEHora);
rotas.get('/mentor/horarios', mentorias.listarHorarios);
rotas.post('/usuarios/mentorias', mentorias.disponibilizarHorario);
rotas.post('/mentorias/marcar', mentorias.marcarMentoria)
rotas.get('/mentorias/marcadas', mentorias.listarMentoriasMarcadas)

module.exports = rotas
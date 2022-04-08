const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');



const rotas = express();

rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);
rotas.post('/usuarios/:id', usuarios.addHabilidade);
rotas.post('/usuarios/horario/:id', usuarios.addHorario);
rotas.put('/usuarios/:id', usuarios.marcarMentoria);

rotas.post('/habilidades', utilitarios.cadastrarHabilidade);

module.exports = rotas
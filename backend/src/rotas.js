const express = require('express');
const usuarios = require('./controladores/usuarios');
const utilitarios = require('./controladores/utilitarios');



const rotas = express();

//rotas para manuseio do usuário
rotas.get('/usuarios', usuarios.listarUsuarios);
rotas.get('/usuarios/:id', usuarios.obterUsuario);
rotas.post('/usuarios/habilidades/:id', usuarios.addHabilidade);
rotas.get('/usuarios/habilidades/:id', usuarios.listarHabilidades);

// rotas para utilidades que não vamos usar no front, usei para testar a conexão com o banco de dados
rotas.post('/habilidades', utilitarios.cadastrarHabilidade);

module.exports = rotas
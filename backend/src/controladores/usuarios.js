const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');

//TESTADO E RODANDO
const listarUsuarios = async (req, res) => {

    try {
        const usuarios = await conexao.query('SELECT id,nome,email,bio,area FROM usuarios');

        if (usuarios.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Não foi possível encontrar usuários' })
        }

        res.status(200).send(usuarios.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//TESTADO E RODANDO
const obterUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await conexao.query('SELECT id,nome,email,bio,area FROM usuarios WHERE id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar o usuário')
        }

        res.status(200).send(usuario.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const addHabilidade = (req, res) => {

    return res.status(201).json()
}

const listarHabilidades = (req, res) => {
    return res.status(200).json()
}

//TESTADO E RODANDO
const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ "mensagem": "O email e a senha são obrigatórios" });
    }

    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await conexao.query(query, [email]);
        const usuarioEncontrado = rows[0];

        if (!usuarioEncontrado) {
            return res.status(400).json({ "mensagem": "Email ou senha inválidos" });
        }

        const senhaVerificada = await bcrypt.compare(String(senha), usuarioEncontrado.senha);

        if (!senhaVerificada) {
            return res.status(400).json({ "mensagem": "Email ou senha inválidos" });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, segredo, { expiresIn: '2h' });

        return res.status(200).json(token);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Ocorreu um erro desconhecido. - ' + error.message });
    }
}

//TESTADO E RODANDO
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, bio, avatar, area } = req.body;

    if (!nome || !email || !senha || !area) {
        return res.status(404).json({ "mensagem": 'Dados obrigatórios não informados.' })
    }

    try {
        const { rowCount: buscarUsuario } = await conexao.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (buscarUsuario > 0) {
            return res.status(400).json({ "mensagem": "Já existe usuário cadastrado para o e-mail fornecido." });
        }
        const senhaEncriptada = await bcrypt.hash(String(senha), 10);


        const novoUsuario = await conexao.query('INSERT INTO usuarios (nome, email, senha, bio, avatar, area) VALUES ( $1, $2, $3, $4, $5, $6 )',
            [nome, email, senhaEncriptada, bio, avatar, area]);

        if (novoUsuario.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Não foi possível inserir o usuário' })
        }

        res.status(201).json({ 'mensagem': 'Usuário Cadastrado' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//TESTADO ALTERADO E RODANDO
const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, bio, avatar, area } = req.body;

    try {
        const localizarUsuário = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (localizarUsuário.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar o usuário')
        }

        const novaSenha = (senha ?
            await bcrypt.hash(String(senha), 10) :
            localizarUsuário.rows[0].senha);

        const novoNome = (nome ? nome : localizarUsuário.rows[0].nome);
        const novoEmail = (email ? email : localizarUsuário.rows[0].email);
        const novaBio = (bio ? bio : localizarUsuário.rows[0].bio);
        const novoAvatar = (avatar ? avatar : localizarUsuário.rows[0].avatar);
        const novaArea = (area ? area : localizarUsuário.rows[0].area);

        const resposta = await conexao.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3, bio = $4, avatar = $5, area = $6 WHERE id = $7',
            [novoNome, novoEmail, novaSenha, novaBio, novoAvatar, novaArea, id]);

        if (resposta.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Não foi possível atualizar o usuário' })
        }

        res.status(200).json({ 'mensagem': 'Usuário atualizado com sucesso' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await conexao.query('DELETE FROM usuarios WHERE id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Não foi possível excluir o usuário' })
        }

        res.status(200).json({ 'mensagem': 'Usuário excluido com sucesso' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    listarUsuarios, obterUsuario, addHabilidade, listarHabilidades, login, cadastrarUsuario, atualizarUsuario, deletarUsuario
}
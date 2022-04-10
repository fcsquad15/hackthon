const conexao = require('../conexao');

const listarUsuarios = async (req, res) => {

    try {
        const usuarios = await conexao.query('SELECT * FROM usuarios');

        if (usuarios.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar usuários')
        }

        res.status(200).send(usuarios.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const obterUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (usuario.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar o usuário')
        }

        res.status(200).send(usuario.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//Fazer
const addHabilidade = (req, res) => {

    return res.status(201).json()
}

const listarHabilidades = (req, res) => {
    return res.status(200).json()
}

const login = (req, res) => {
    return res.status(200).json()
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, bio, avatar, area } = req.body;

    if (!nome || !email || !senha || !area) {
        return res.status(404).json('Dados obrigatórios não informados.')
    }

    try {
        const novoUsuario = await conexao.query('INSERT INTO usuarios (nome, email, senha, bio, avatar, area) VALUES ( $1, $2, $3, $4, $5, $6 )',
            [nome, email, senha, bio, avatar, area]);

        if (novoUsuario.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir o usuário')
        }

        res.status(201).json({ 'mensagem': 'Usuário Cadastrado' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, bio, avatar, area } = req.body;

    try {
        const resposta = await conexao.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3, bio = $4, avatar = $5, area = $6 WHERE id = $7',
            [nome, email, senha, bio, avatar, area, id]);

        if (resposta.rowCount === 0) {
            return res.status(400).json('Não foi possível atualizar o usuário')
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
            return res.status(400).json('Não foi possível excluir o usuário')
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
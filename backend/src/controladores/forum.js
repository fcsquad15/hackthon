const conexao = require('../conexao');


const criarPergunta = async (req, res) => {
    const { usuario_id, pergunta, habilidade_id } = req.body;

    if (!pergunta) {
        return res.status(404).json('Dados obrigatórios não informados.')
    }

    try {
        const novoPost = await conexao.query('INSERT INTO postagem (usuario_id, pergunta, horario, habilidade_id) VALUES ( $1, $2, current_timestamp, $3)',
            [usuario_id, pergunta, habilidade_id]);

        if (novoPost.rowCount === 0) {
            return res.status(400).json('Não foi possível cadastrar a pergunta')
        }

        res.status(201).json({ 'mensagem': 'Post cadastrado' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const comentarPergunta = async (req, res) => {

    let { pergunta_id } = req.params;
    const { usuario_id, comentario } = req.body;

    if (!comentario) {
        return res.status(404).json('Dados obrigatórios não informados.')
    }

    try {
        const novoComentario = await conexao.query('INSERT INTO comentarios (usuario_id, pergunta_id, comentario, horario) VALUES ( $1, $2, $3, current_timestamp)',
            [usuario_id, pergunta_id, comentario]);

        if (novoComentario.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir o comentário')
        }

        res.status(201).json({ 'mensagem': 'Comentário cadastrado' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const listarPerguntas = async (req, res) => {

    try {
        const perguntas = await conexao.query('SELECT * FROM postagem');

        if (perguntas.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar perguntas')
        }

        res.status(200).send(perguntas.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const listarPerguntasFiltroHabilidade = async (req, res) => {
    const { habilidade_id } = req.body

    try {
        const perguntas = await conexao.query('SELECT * FROM postagem WHERE habilidade_id=$1', [habilidade_id]);

        if (perguntas.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar perguntas')
        }

        res.status(200).send(perguntas.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

const listarComentarios = async (req, res) => {
    let { pergunta_id } = req.params;

    try {
        const comentarios = await conexao.query('SELECT * FROM comentarios WHERE pergunta_id = $1', [pergunta_id]);

        if (comentarios.rowCount === 0) {
            return res.status(400).json('Não foi possível encontrar comentarios')
        }

        res.status(200).send(comentarios.rows);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

module.exports = {
    criarPergunta, comentarPergunta, listarPerguntas, listarComentarios, listarPerguntasFiltroHabilidade
}
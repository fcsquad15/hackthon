const conexao = require('../conexao');


const criarPergunta = async (req, res) => {
    let {id} = req.params;
    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(404).json('Dados obrigatórios não informados.')
    }

    try {
        const novoPost = await conexao.query('INSERT INTO postagem (usuario_id, pergunta, horario) VALUES ( $1, $2, current_timestamp)', 
                                [id, pergunta]);

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

    let {id} = req.params;
    const { pergunta_id, comentario } = req.body;

    if (!pergunta_id || !comentario) {
        return res.status(404).json('Dados obrigatórios não informados.')
    }

    try {
        const novoComentario = await conexao.query('INSERT INTO comentarios (usuario_id, pergunta_id, comentario, horario) VALUES ( $1, $2, $3, current_timestamp)', 
                                [id, pergunta_id, comentario]);

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

const listarComentarios = async (req, res) => {
    try {
        const comentarios = await conexao.query('SELECT * FROM comentarios');

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
    criarPergunta, comentarPergunta, listarPerguntas, listarComentarios
}
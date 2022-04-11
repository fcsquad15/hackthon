const conexao = require('../conexao')

//TESTADO E RODANDO
const cadastrarHabilidade = async (req, res) => {
    const { habilidade } = req.body;

    if (!habilidade) {
        return res.status(404).json({ 'mensagem': 'Obrigatório informar habilidade' })
    }

    try {
        const novaHabilidade = await conexao.query('INSERT INTO habilidades (habilidade) VALUES ( $1 )', [habilidade]);

        if (novaHabilidade.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir a habilidade')
        }

        res.status(201).json({ 'mensagem': 'Habilidade Cadastrada' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//TESTADO E RODANDO
const listarHabilidade = async (req, res) => {
    try {
        const habilidades = await conexao.query('SELECT * FROM habilidades');

        if (habilidades.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir a habilidade')
        }

        res.status(201).json(habilidades.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//TESTADO E RODANDO
const cadastrarHorario = async (req, res) => {
    const { hora } = req.body;

    if (!hora) {
        return res.status(404).json({ 'mensagem': 'Obrigatório informar hora' })
    }

    try {
        const novaHabilidade = await conexao.query('INSERT INTO horarios (hora) VALUES ( $1 )', [hora]);

        if (novaHabilidade.rowCount === 0) {
            return res.status(400).json('Não foi possível inserir a hora')
        }

        res.status(201).json({ 'mensagem': 'Hora Cadastrada' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//TESTADO E RODANDO
const listarHorario = async (req, res) => {
    try {
        const horarios = await conexao.query('SELECT * FROM horarios');

        if (horarios.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Nenhum horarios encontrado' })
        }

        res.status(201).json(horarios.rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    cadastrarHabilidade, listarHabilidade, cadastrarHorario, listarHorario
}
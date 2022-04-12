const { query } = require('express');
const conexao = require('../conexao');

//TESTADO E RODANDO
const disponibilizarHorario = async (req, res) => {
    // const {id:usuario_id} = req.usuario
    // const {dia,hora_id}=req.body
    const { usuario_id, dia, hora_id } = req.body

    if (!usuario_id || !dia || !hora_id) {
        return res.status(404).json({ "mensagem": 'Dados obrigatórios não informados.' })
    }

    try {
        const { rowCount: buscarUsuario } = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [usuario_id]);

        if (buscarUsuario === 0) {
            return res.status(400).json({ "mensagem": "Usuário não encontrado" });
        }

        const { rowCount: horarioExistente } = await conexao.query('SELECT * FROM agenda WHERE usuario_id=$1 AND dia=$2 AND hora_id=$3', [usuario_id, dia, hora_id])

        if (horarioExistente > 0) {
            return res.status(400).json({ "mensagem": "Essa horário já está disponibilizado" })
        }

        const novoHorario = await conexao.query('INSERT INTO agenda (usuario_id,dia,hora_id) VALUES ( $1,$2,$3)',
            [usuario_id, dia, hora_id]);

        if (novoHorario.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Não foi possível inserir o horário.' })
        }

        res.status(201).json({ 'mensagem': 'Horário inserido com sucesso' })
    } catch (error) {
        return res.status(400).json(error)
    }
}

//TESTADO E RODANDO
const listarMentores = async (req, res) => {
    try {
        const mentores = await conexao.query('SELECT usuarios.id,usuarios.nome,usuarios.bio,usuarios.area FROM agenda LEFT JOIN usuarios ON agenda.usuario_id = usuarios.id GROUP BY usuarios.id');

        if (mentores.rowCount === 0) {
            return res.status(400).json('Não foi possível listar as mentorias')
        }

        res.status(201).json(mentores.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
}

//TESTADO E RODANDO
const filtrarMentorTema = async (req, res) => {
    const { habilidade } = req.query

    if (!habilidade) {
        return res.status(404).json({ "mensagem": 'É necessário informar o tema' })
    }

    try {
        const mentores = await conexao.query('SELECT usuarios.id,usuarios.nome,usuarios.bio,usuarios.area FROM agenda LEFT JOIN usuarios ON agenda.usuario_id = usuarios.id LEFT JOIN habilidadeusuarios ON usuarios.id = habilidadeusuarios.usuario_id WHERE habilidadeusuarios.habilidade_id =$1 GROUP BY usuarios.id ', [habilidade]);

        if (mentores.rowCount === 0) {
            return res.status(400).json('Nenhum usuário encontradado para o tema')
        }

        res.status(201).json(mentores.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
}

//FAZER
const filtrarMentorArea = async (req, res) => {
    const { habilidade } = req.query

    if (!habilidade) {
        return res.status(404).json({ "mensagem": 'É necessário informar o tema' })
    }

    try {
        const mentores = await conexao.query('SELECT usuarios.id,usuarios.nome,usuarios.bio,usuarios.area FROM agenda LEFT JOIN usuarios ON agenda.usuario_id = usuarios.id LEFT JOIN habilidadeusuarios ON usuarios.id = habilidadeusuarios.usuario_id WHERE habilidadeusuarios.habilidade_id =$1 GROUP BY usuarios.id ', [habilidade]);

        if (mentores.rowCount === 0) {
            return res.status(400).json('Nenhum usuário encontradado para o tema')
        }

        res.status(201).json(mentores.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
}


//TESTADO E RODANDO
const listarDias = async (req, res) => {
    const { mentor } = req.query

    if (!mentor) {
        return res.status(404).json({ "mensagem": 'É necessário informar o id do mentor' })
    }

    try {
        const { rowCount: buscarUsuario } = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [mentor]);

        if (buscarUsuario === 0) {
            return res.status(400).json({ "mensagem": "Mentor não encontrado" });
        }

        const dias = await conexao.query('SELECT dia FROM agenda WHERE usuario_id =$1 GROUP BY dia', [mentor]);

        if (dias.rowCount === 0) {
            return res.status(400).json('Nenhum dia disponível')
        }

        res.status(200).json(dias.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
}

const listarDiasEHora = async (req, res) => {
    const { mentor } = req.query

    if (!mentor) {
        return res.status(404).json({ "mensagem": 'É necessário informar o id do mentor' })
    }

    try {
        const { rowCount: buscarUsuario } = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [mentor]);

        if (buscarUsuario === 0) {
            return res.status(400).json({ "mensagem": "Mentor não encontrado" });
        }

        const dias = await conexao.query('SELECT agenda.id, agenda.dia, horarios.hora FROM agenda LEFT JOIN horarios ON horarios.id=agenda.hora_id WHERE usuario_id =$1 ORDER BY agenda.dia, horarios.hora', [mentor]);

        if (dias.rowCount === 0) {
            return res.status(400).json('Nenhum dia disponível')
        }

        res.status(200).json(dias.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
}

//TESTADO E RODANDO
const listarHorarios = async (req, res) => {
    const { mentor } = req.query
    const { dia } = req.body

    if (!mentor || !dia) {
        return res.status(404).json({ "mensagem": 'É necessário informar o id do mentor' })
    }

    try {
        const { rowCount: buscarUsuario } = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [mentor]);

        if (buscarUsuario === 0) {
            return res.status(400).json({ "mensagem": "Mentor não encontrado" });
        }

        const horarios = await conexao.query('SELECT  agenda.id AS agenda_id, horarios.id AS horario_id,horarios.hora FROM agenda LEFT JOIN horarios ON horarios.id=agenda.hora_id WHERE agenda.usuario_id =$1 AND agenda.dia=$2', [mentor, dia]);

        if (horarios.rowCount === 0) {
            return res.status(400).json({ "mensagem": 'Nenhum dia disponível' })
        }

        res.status(200).json(horarios.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.mensage)
    }
    return res.status(200).json()
}


//Fazer
const marcarMentoria = async (req, res) => {
    return res.status(200).json()
}

//Fazer
const listarMentoriasMarcadas = async (req, res) => {
    return res.status(200).json()
}



module.exports = {
    disponibilizarHorario, listarMentores, filtrarMentorTema, filtrarMentorArea, listarMentoriasMarcadas, listarDias, listarHorarios, marcarMentoria, listarDiasEHora
}
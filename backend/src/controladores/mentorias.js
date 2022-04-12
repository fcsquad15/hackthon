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
    const { area } = req.query

    if (!area) {
        return res.status(404).json({ "mensagem": 'É necessário informar a área desejada.' })
    }

    try {
        const mentores = await conexao.query('SELECT usuarios.id,usuarios.nome,usuarios.bio FROM agenda LEFT JOIN usuarios ON agenda.usuario_id = usuarios.id LEFT JOIN areausuarios ON usuarios.id = areausuarios.usuario_id WHERE areausuarios.area_id =$1 GROUP BY usuarios.id', [area]);

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


//Falta Testar
const marcarMentoria = async (req, res) => {
    // const { usuario_id } = req.usuario // para usar com Autenticaçaõ
    // const { agenda_id } = req.body;
    const { usuario_id, agenda_id } = req.body;

    if (!usuario_id || !agenda_id) {
        return res.status(400).json({ 'mensagem': 'Usuário ou Agenda id não informado' })
    }

    try {
        const novaMentoria = await conexao.query('INSERT INTO mentorias (usuario_id,agenda_id) VALUES ($1,$2)', [usuario_id, agenda_id]);

        if (novaMentoria.rowCount === 0) {
            return res.status(400).json({ 'mensagem': 'Não foi possível agendar sua mentoria' })
        }

        const { rowCount: mentoriaMarcada } = await conexao.query('UPDATE agenda SET disponivel=false WHERE id=$1', [agenda_id]);

        if (mentoriaMarcada === 0) {
            return res.status(400).json({ 'mensagem': 'Não foi possível agendar sua mentoria' })
        }

        const { rows: buscarMentorado } = await conexao.query('SELECT * FROM usuarios WHERE id = $1', [usuario_id]);

        const { rows: buscarMentor } = await conexao.query('SELECT usuarios.id AS userId usuarios.nome,agenda.data,horarios.hora FROM agenda LEFT JOIN usuarios ON agenda.usuario_id=usuarios.id  LEFT JOIN horarios ON agenda.hora_id=horario.id WHERE agenda.id = $1', [agenda_id]);


        const mensagemMentorado = `Mentoria com ${buscarMentor[0].nome} (${buscarMentor[0].data[0]} às ${buscarMentor.hora}) agendada com sucesso. Você receberá uma notificação 15 minutos antes dela começar e um chat entre vocês será aberto automaticamente.`

        const mensagemMentor = `Sua mentoria ${buscarMentor[0].data[0]} às ${buscarMentor.hora}) foi agendada por ${buscarMentorado[0].nome} . Você receberá uma notificação 15 minutos antes dela começar e um chat entre vocês será aberto automaticamente.`

        try {
            const notificaoMentorado = await conexao.query('INSERT INTO notificao (usuario_id,mensagem VALUES ($1,$2)', [usuario_id, mensagemMentorado])

            if (notificaoMentorado.rowCount === 0) {
                return res.status(400).json({ 'mensagem': 'Não foi possível criar a notificação.' })
            }

            const notificaoMentor = await conexao.query('INSERT INTO notificao (usuario_id,mensagem VALUES ($1,$2)', [buscarMentor[0].userId, mensagemMentor])

            if (notificaoMentor.rowCount === 0) {
                return res.status(400).json({ 'mensagem': 'Não foi possível criar a notificação.' })
            }

        } catch (error) {
            return res.status(500).json(error)
        }

    } catch (error) {
        return res.status(400).json(error)

    }

}

//Fazer
const listarMentoriasMarcadas = async (req, res) => {
    return res.status(200).json()
}



module.exports = {
    disponibilizarHorario, listarMentores, filtrarMentorTema, filtrarMentorArea, listarMentoriasMarcadas, listarDias, listarHorarios, marcarMentoria, listarDiasEHora
}
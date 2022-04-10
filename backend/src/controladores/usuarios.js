const listarUsuarios = (req, res) => {

    return res.status(200).json()
}

const obterUsuario = (req, res) => {

    return res.status(200).json()
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

const cadastrarUsuario = (req, res) => {
    return res.status(200).json()
}

//Só se sobrar tempo
const atualizarUsuario = (req, res) => {
    return res.status(200).json()
}

//Só se sobrar tempo
const deletarUsuario = (req, res) => {
    return res.status(200).json()
}

module.exports = {
    listarUsuarios, obterUsuario, addHabilidade, listarHabilidades, login, cadastrarUsuario, atualizarUsuario, deletarUsuario
}
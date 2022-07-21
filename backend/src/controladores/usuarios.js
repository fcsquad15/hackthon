const bcrypt = require("bcrypt");
const conexao = require("../Server/conexao");

const usersModel = require("../Models/usersModel");
const noAuthModel = require("../Models/noAuthModel");

const usersSchema = require("../Validações/usersSchema");

const messageError = require("../Mensagens/errorToast");
const messageSuccess = require("../Mensagens/successToast");

//ok
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usersModel.listUsers();

    if (!usuarios) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível encontrar usuários" });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//ok
const obterUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addHabilidadeUsuario = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  const { habilidade_id } = req.body;

  if (!usuario_id || !habilidade_id) {
    return res
      .status(404)
      .json({ mensagem: "Dados obrigatórios não informados." });
  }

  try {
    const { rowCount: habilidadeExistente } = await conexao.query(
      "SELECT * FROM habilidadeusuarios WHERE usuario_id=$1 AND habilidade_id=$2",
      [usuario_id, habilidade_id]
    );

    if (habilidadeExistente > 0) {
      return res.status(400).json({ mensagem: "Habilidade já cadastrada" });
    }

    const novaHabilidade = await conexao.query(
      "INSERT INTO habilidadeusuarios (usuario_id,habilidade_id) VALUES ( $1, $2)",
      [usuario_id, habilidade_id]
    );

    if (novaHabilidade.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível inserir a habilidade" });
    }

    res.status(201).json({ mensagem: "Habilidade inserida com sucesso" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const listarHabilidadesUsuario = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(404)
      .json({ mensagem: "Dados obrigatórios não informados." });
  }

  try {
    const habilidadesUsuario = await conexao.query(
      "SELECT habilidades.id, habilidades.habilidade        FROM habilidadeusuarios        LEFT JOIN usuarios ON usuarios.id= habilidadeusuarios.usuario_id        LEFT JOIN habilidades ON habilidades.id = habilidadeusuarios.habilidade_id  WHERE usuarios.id=$1     ",
      [id]
    );

    if (habilidadesUsuario.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível encontrar usuários" });
    }
    res.status(200).json(habilidadesUsuario.rows);
  } catch (error) {
    res.status(400).json(error);
  }

  return res.status(200).json();
};

const addAreaUsuario = async (req, res) => {
  // const { id: usuario_id } = req.usuario // para usar com Autenticaçaõ
  // const { area_id } = req.body;
  const { usuario_id, area_id } = req.body;

  if (!usuario_id || !area_id) {
    return res
      .status(404)
      .json({ mensagem: "Dados obrigatórios não informados." });
  }

  try {
    const { rowCount: buscarUsuario } = await conexao.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [usuario_id]
    );

    if (buscarUsuario === 0) {
      return res.status(400).json({ mensagem: "Usuário não encontrado" });
    }

    const { rowCount: areaExistente } = await conexao.query(
      "SELECT * FROM areausuarios WHERE usuario_id=$1 AND area_id=$2",
      [usuario_id, area_id]
    );

    if (areaExistente > 0) {
      return res.status(400).json({ mensagem: "Área já cadastrada" });
    }

    const novaArea = await conexao.query(
      "INSERT INTO areausuarios (usuario_id,area_id) VALUES ( $1, $2)",
      [usuario_id, area_id]
    );

    if (novaArea.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível inserir a nova área." });
    }

    res.status(201).json({ mensagem: "Área inserida com sucesso" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const listarAreaUsuario = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(404)
      .json({ mensagem: "Dados obrigatórios não informados." });
  }

  try {
    const areaUsuario = await conexao.query(
      "SELECT area.id, area.area        FROM areausuarios        LEFT JOIN usuarios ON usuarios.id= areausuarios.usuario_id        LEFT JOIN area ON area.id = areausuarios.area_id  WHERE usuarios.id=$1     ",
      [id]
    );

    if (areaUsuario.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível encontrar usuários" });
    }
    res.status(200).json(areaUsuario.rows);
  } catch (error) {
    res.status(400).json(error);
  }

  return res.status(200).json();
};

//ok
const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  let { nome, email, senha, bio, avatar, area } = req.body;

  if (!nome & !email & !senha & !bio & !avatar & !area) {
    return res.status(400).json(messageError.mandatoryInfo);
  }

  try {
    await usersSchema.updateUser.validate(req.body);

    if (email && email !== req.usuario.email) {
      const verificarEmail = await noAuthModel.emailExists(email);

      if (verificarEmail) {
        return res.status(400).json(messageError.userExists);
      }
    }

    if (senha) {
      await bcrypt.hash(senha.trim(), 10);
    }

    const userUpdated = await usersModel.updateUser(
      id,
      nome,
      email,
      senha,
      bio,
      avatar,
      area
    );

    if (!userUpdated) {
      return res.status(400).json(messageError.userUpdate);
    }

    res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.usuario;

  try {
    const usuario = await conexao.query("DELETE FROM usuarios WHERE id = $1", [
      id,
    ]);

    if (usuario.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível excluir o usuário" });
    }

    res.status(200).json({ mensagem: "Usuário excluido com sucesso" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  listarUsuarios,
  obterUsuario,
  addHabilidadeUsuario,
  listarHabilidadesUsuario,
  atualizarUsuario,
  deletarUsuario,
  addAreaUsuario,
  listarAreaUsuario,
};

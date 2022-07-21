const knex = require("../Server/conexao");

const listNotification = async (id) => {
  const list = await knex("notificacao")
    .where("usuario_id", id)
    .orderBy("data_time", "desc")
    .returning("*");
  return list;
};

const readAllNotification = async (id) => {
  const notification = await knex("notificacao")
    .where("usuario_id", id)
    .update({ lida: true })
    .returning("*");
  return notification;
};

module.exports = {
  listNotification,
  readAllNotification,
};

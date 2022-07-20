const knex = require("../Server/conexao");

const getSkills = async () => {
  const list = await knex("habilidades").orderBy("habilidade");
  return list;
};

const skillsExists = async (habilidade) => {
  const skill = await knex("habilidades").where({ habilidade }).first();
  return skill;
};

const insertSkill = async (habilidade) => {
  habilidade = habilidade.trim();
  const newAbility = await knex("habilidades")
    .insert({ habilidade })
    .returning("*");
  return newAbility;
};

module.exports = {
  getSkills,
  skillsExists,
  insertSkill,
};

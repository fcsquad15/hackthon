const yup = require("./config");

const newSkill = yup.object().shape({
  habilidade: yup.string().trim().required(),
});

module.exports = {
  newSkill,
};

const yup = require("./config");

const newSkill = yup.object().shape({
  habilidade: yup.string().trim().required("Habilidade não informada"),
});

module.exports = {
  newSkill,
};

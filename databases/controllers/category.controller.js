const { _getCategoryByName } = require("../models/category.model");

const getCategoryByName = async (category_name) =>
  await _getCategoryByName(category_name);

module.exports = {
  getCategoryByName,
};

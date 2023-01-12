const categorySchema = require("../schemas/category.schema");

const _getCategoryByName = async (category_name) =>
  await categorySchema.findOne({ name: category_name });

module.exports = {
  _getCategoryByName,
};

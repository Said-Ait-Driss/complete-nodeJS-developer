// u must to remember that :
// schema refer to collection in database
const productSchema = require("../schemas/product.schema");

const _getAllProducts = async () => await productSchema.find({});

const _insertProduct = async (product) => {
  return await productSchema.create(product);
  // best to use :    productSchema.updateOne({id:product.id},product,{upsert:true}) => if product exist then update it else insert it
  //                               .findOneAndUpdate
};
const _cleanProductColl = async () => await productSchema.deleteMany({});

// by adding - before sorting criteria => meant sorting descending way
const _getLastProductNumber = async () => {
  const product = await productSchema.findOne().sort("-number");
  return product.number || 0;
};

module.exports = {
  _getAllProducts,
  _insertProduct,
  _cleanProductColl,
  _getLastProductNumber,
};

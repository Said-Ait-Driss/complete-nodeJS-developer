const ProductModule = require("./product.model");

module.exports = {
  Query: {
    Products: (parent, args, context, infos) => {
      return ProductModule.getAllProducts();
    },
    Product: (_, args) => {
      return ProductModule.getProductById(args.id);
    },
  },
  Mutation: {
    AddNewProduct: (_, args) => {
      return ProductModule.addNewProduct(args.description, args.price);
    },
  },
};

const {
  _getAllProducts,
  _insertProduct,
  _cleanProductColl,
  _getLastProductNumber,
} = require("../models/product.model");

const { getCategoryByName } = require("./category.controller");

const fs = require("fs");

const getAllProducts = async (req, res) => res.send(await _getAllProducts());

const insertProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    brand,
    rating_value,
    rating_count,
    category_name,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !brand ||
    !rating_count ||
    !rating_value ||
    !category_name
  )
    return res.send({ message: "all inputs are required " });

  // check if category exist (in references table ) : replace reference integrity in SQL
  const category = await getCategoryByName(category_name);
  const productNumber = await _getLastProductNumber();
  if (!category) return res.send({ message: "category name not exists !" });
  const product = {
    number: productNumber + 1,
    name,
    description,
    offers: {
      price: parseFloat(price),
      availability: "InStock",
    },
    brand: {
      name: brand,
    },
    image: "default-product-image.jpg",
    rating: {
      value: parseFloat(rating_value || 0),
      count: parseInt(rating_count || 0),
    },
    category: category_name,
  };

  await _insertProduct(product);
  return res.send(await _getAllProducts());
};

const cleanProductColl = async (req, res) => {
  await _cleanProductColl();
  return res.send(await _getAllProducts());
};

const serveInsertPage = (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("./databases/render-files/insert.html").pipe(res);
};

module.exports = {
  getAllProducts,
  cleanProductColl,
  insertProduct,
  serveInsertPage,
};

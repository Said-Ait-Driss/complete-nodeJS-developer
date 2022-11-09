const Products = [
    {
      id: "t-short121",
      description: "some description here",
      price: 321,
    },
    {
      id: "black-pijama323",
      description: "some pijama323 description here",
      price: 500,
    },
  ];
  
  const getAllProducts = () => Products;
  const getProductById = (_id) => Products.find((prod) => prod.id == _id);
  
  const addNewProduct = (_description, _price) => {
    const _id = `${new Date().getTime()}-${new Date().getTime()}`;
    Products.push({
      id: _id,
      description: _description,
      price: _price,
    });
    return { id: _id, description: _description, price: _price };
  };
  
  module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
  };
  
const Orders = [
    {
      date: "12-12-2004",
      subTotal: 5403,
      items: [
        {
          product: {
            id: "t-short121",
            description: "some OLD description here",
            price: 321,
          },
          quantity: 32,
        },
      ],
    },
  ];
  
  const getAllOrders = () => Orders;
  
  module.exports = {
    getAllOrders,
  };
  
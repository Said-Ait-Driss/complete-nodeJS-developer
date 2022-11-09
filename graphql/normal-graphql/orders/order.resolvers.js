const OrderModule = require("./order.module");

module.exports = {
  Query: {
    Orders: (parent, args, context, infos) => {
      return OrderModule.getAllOrders();
    },
  },
};

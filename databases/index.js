const express = require("express");
const mongoose = require("mongoose");
const {
  getAllProducts,
  insertProduct,
  cleanProductColl,
  serveInsertPage
} = require("./controllers/product.controller");
const bodyParser = require('body-parser')

const _PORT = 3000;
const _SERVER_START = () => console.log(`server runing at port ${_PORT} ... `);
const _MONGODB_URL = "mongodb://localhost:27017/noSQLDB";

const app = express();
app.listen(_PORT, _SERVER_START);

// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


mongoose.connect(_MONGODB_URL, {
  useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  useUnifiedTopology: true, // use the updated ways to talking to clusters of mongo Dbs
});
var cnx = mongoose.connection; // event emiter

cnx.once("open", () => console.log("mongo db connection ready !")); // explicit that the open event will only get triggered once

cnx.on("connected", () => console.log("database is connected successfully"));

cnx.on("disconnected", () =>
  console.log("database is disconnected successfully")
);

cnx.on("error", console.error.bind(console, "connection error:")); // we use on cuz we will never now when an error will trigger

// app
app.get("/products", getAllProducts);
app.get("/insert",serveInsertPage);
app.get("/clear-products", cleanProductColl);


app.post("/insert", insertProduct);

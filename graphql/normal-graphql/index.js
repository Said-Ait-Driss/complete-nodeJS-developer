// graphql used to avoid over fetching and under fetching
// over fetching  : get unecessery data from response
// under fetching : use to much endpoint

const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const _PORT = 3000;
const _SERVER_START = () => console.log(`server runing at port ${_PORT} ... `);

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: _GQ_ROOT_VALUE,
    graphiql: true, // set up IDE development enveronment
  })
);

app.listen(_PORT, _SERVER_START);

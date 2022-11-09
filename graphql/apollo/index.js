// graphql used to avoid over fetching and under fetching
// over fetching  : get unecessery data from response
// under fetching : use to much endpoint

const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const _PORT = 3000;
const _SERVER_START = () => console.log(`server runing at port ${_PORT} ... `);

const startApolloServer = async () => {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  const serverApollo = new ApolloServer({
    schema,
  });

  await serverApollo.start();
  serverApollo.applyMiddleware({ app, path: "/graphql" });
  app.listen(_PORT, _SERVER_START);
};

startApolloServer();

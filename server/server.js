const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { authMiddleware } = require('./utils/jwt-auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//Allow front-end to pass nested objects/arrays in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//We will need to add NODE_ENV="production" in .env file when deploying.
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
};

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`User GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

startApolloServer(typeDefs, resolvers);
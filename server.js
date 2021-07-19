const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

async function startServer() {
  try {
    const app = express();
    const apolloServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
      res.send('Using express apollo server');
    });

    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongoose connected...');

    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (error) {
    console.log('An error occurred while connecting to the database...');
  }
}
startServer();

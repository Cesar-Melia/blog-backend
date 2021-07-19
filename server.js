const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
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

    const db = await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const { name, host } = db.connection;
    console.log(`Conectado correctamente a la db ${name} en ${host}`);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log('An error occurred while connecting to the database...');
  }
}
startServer();

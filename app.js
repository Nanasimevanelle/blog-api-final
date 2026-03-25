const express = require('express');
const app = express();
require("./config/db");

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const articleRoutes = require('./routes/articleRoutes');

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Blog",
      version: "1.0.0",
      description: "API pour gerer les articles"
    },
    servers: [{
      url: "http://localhost:3000"
    }]
  },
  apis: ["./routes/*.js"], // 🔥 important
};

const specs = swaggerJsdoc(options);

// route test
app.get('/', (req, res) => {
  res.send("Mon API fonctionne !");
});

// routes principales
app.use('/api', articleRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
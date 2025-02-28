const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de One Piece",
      version: "1.0.0",
      description: "Documentación de la API de One Piece con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")], // Escanear todos los archivos en /routes
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Documentación disponible en http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;

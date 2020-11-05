module.exports = function(app){
  const swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express')

  const options = {
  definition: {
  openapi: "3.0.0",
  info: {
    title: "Indonesian Region service query",
    version: "0.1.0",
    description:
      "A service to query all regions in Indonesia, based on data provided by The Indonesia Internal Affairs Ministry regulation.",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "FDN",
      url: "https://femaledaily.com.com",
      email: "support@femaledaily.com",
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT}`,
    },
  ],
  },
  apis: ["../route/map.js"],
  };

  const specs = swaggerJsdoc(options);
  app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
  );
}
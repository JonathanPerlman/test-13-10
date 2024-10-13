import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "College API",   
        version: "1.0.0",
        description: "API for Collage Management",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js", "./src/app.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
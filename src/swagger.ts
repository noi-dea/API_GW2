import swaggerJsdoc from "swagger-jsdoc";
const isProduction = process.env.NODE_ENV === "production";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GW2 API",
      version: "1.0.0",
      description: "API for the second group project fsd 2025",
    },
    servers: isProduction
      ? [
          {
            url: "https://gw2-v1-0-0.onrender.com/api", 
            description: "Production server",
          },
        ]
      : [
          {
            url: "http://localhost:3000/api",
            description: "Development server",
          },
        ],
    components: {
      schemas: {
        Bundle: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            type: { type: "string", enum: ["booster", "booster-bundle", "box", "etb"] },
            series: { type: "string" },
            img: { type: "string" },
            price: { type: "number" },
          },
        },
        Product:{
            type: "object",
            properties:{
                _id: {type: "string"},
                hitPoints: {type: "number"},
                abilities: {type: "object",
                    properties:{
                        name:{type:"string"},
                        cost:{type:"number"},
                        damage:{type:"number"}
                    }
                },
                imageURL:{type: "string"},
                types:{type: "array", items:{type:"string"}},
                price:{type:"number"},
                rarity:{type:"string"}
            }
        },
        Rarity:{
            type:"object",
            properties:{
                _id:{type:"string"},
                name:{type:"string"}
            }
        },
        Transaction:{
            type:"object",
            properties:{
                _id:{type:"string"},
                buyer:{type:"string"},
                products:{type:"array", items:{type:"string"}},
                price:{type:"number"},
                date:{type:"date"}
            }
        },
        Type:{
            type:"object",
            properties:{
                _id:{type:"string"},
                name:{type:"string"},
                img:{type:"string"}
            }
        },
        User:{
            type:"object",
            properties:{
                _id:{type:"string"},
                name:{type:"string"},
                email:{type:"string"},
                avatar:{type:"string"},
                password:{type:"string"},
                wishlist:{type:"array", items:{type:"string"}},
                role:{type:"string"}
            }
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    tags: [
      { name: "Bundles", description: "Bundle management endpoints" },
      { name: "Products", description: "Product management endpoints"},
      { name: "Rarities", description: "Rarity management endpoints"},
      { name: "Transactions", description: "Transaction management endpoints"},
      { name: "Types", description: "Type management endpoints"},
      { name: "Users", description: "User management endpoints"}
    ],
  },
  apis: ["**/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
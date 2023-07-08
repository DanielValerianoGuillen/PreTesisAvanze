const mongoose = require("mongoose");

const conexion = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    await mongoose.connect(MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
};

module.exports = { conexion };

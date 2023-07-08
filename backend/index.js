const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { conexion } = require("./config/connectionBD");
require("dotenv").config();
conexion();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use("/", require("./routes/UserRoute"));
app.use("/", require("./routes/ProductRoute"));
app.use("/", require("./routes/OrdersController"));

const EMV_PORT = process.env.PORT || 4000;

app.listen(EMV_PORT, () => {
  console.log(`Servidor corriendo http://localhost:${EMV_PORT}`);
});

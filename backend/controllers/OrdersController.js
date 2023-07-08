const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuuasdfghzxcbqazcde";


function getUserDataFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}


const createOrders =async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { product, checkIn, checkOut, amount, name, phone, price } =
    req.body;

  Order.create({
    product,
    checkIn,
    checkOut,
    amount,
    name,
    phone,
    price,
    user:userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};


const viewOrder = async (req, res) => {
 const userData= await getUserDataFromToken(req)
 res.json( await Order.find({user:userData.id}).populate('product') );
}

module.exports = {
  createOrders,
  viewOrder
};

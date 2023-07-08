const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuuasdfghzxcbqazcde";
const imageDownloader = require("image-downloader");
const fs = require("fs");

const path = require("path");

const uploadsPath = path.join(__dirname, "..", "uploads");

const upload = async (req, res) => {
  const { link } = req.body;
  const newName = "foto" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: path.join(uploadsPath, newName),
  });
  res.json(newName);
};

const uploadPhoto = (req, res) => {
  const uploadedFile = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFile.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFile);
};

const createProduct = (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    name,
    photos,
    description,
    category,
    extraInfo,
    color,
    brand,
    size,
    price
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const productDoc = await Product.create({
      owner: userData.id,
      title,
      name,
      photos,
      description,
      category,
      extraInfo,
      color,
      brand,
      size,
      price
    });
    res.json(productDoc);
  });
};

const viewUserProduct = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Product.find({ owner: id }));
  });
};
const findProduct = async (req, res) => {
  const { id } = req.params;
  res.json(await Product.findById(id));
};
const updateProduct = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    name,
    photos,
    description,
    category,
    extraInfo,
    color,
    brand,
    size,
    price
  } = req.body;

  const productDoc = await Product.findById(id);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (userData.id === productDoc.owner.toString()) {
      productDoc.set({
        title,
        name,
        photos,
        description,
        category,
        extraInfo,
        color,
        brand,
        size,
        price
      });
      productDoc.save();
      res.json("ok");
    }
  });
};

const viewProduct = async (req, res) => {
  res.json(await Product.find());
};

module.exports = {
  upload,
  uploadPhoto,
  createProduct,
  viewUserProduct,
  findProduct,
  updateProduct,
  viewProduct,
};

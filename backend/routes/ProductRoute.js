const express = require("express");
const {
  upload,
  uploadPhoto,
  createProduct,
  viewUserProduct,
  findProduct,
  updateProduct,
  viewProduct,
} = require("../controllers/ProductController");
const { storage } = require("../middleware/photosMiddleware");
const router = express.Router();

router.post("/upload-by-link", upload);

router.post("/upload", storage.array("photos", 100), uploadPhoto);

router.post("/products", createProduct);
router.get("/user-products", viewUserProduct);
router.get("/products/:id", findProduct);
router.put("/products", updateProduct);
router.get("/products", viewProduct);


module.exports = router;

import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {

  const products = await Product.find();
  console.log(products);
  res.send(products);
});

productRouter.get('/search', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/search/:genre/:store/:price', async (req, res) => {
  let product = [];
  console.log(req.params.price);
  if (req.params.store === "all" && req.params.genre === "all" && req.params.price === "all") {
    product = await Product.find();
    // res.send(products);
  }
  else if (req.params.genre !== "all" && req.params.store !== "all") {
    product = await Product.find({ "genre": req.params.genre, "store": req.params.store });
  }
  else if (req.params.store !== "all" && req.params.price !== "all") {
    product = await Product.find({ "store": req.params.store, "amount": req.params.price });
  }
  else if (req.params.price !== "all" && req.params.genre !== "all") {
    product = await Product.find({ "amount": req.params.price, "genre": req.params.genre });
  }

  else if (req.params.genre !== "all") {
    product = await Product.find({ "genre": req.params.genre })
  }
  else if (req.params.store !== "all") {
    product = await Product.find({ "store": req.params.store });
  }
  else if (req.params.price !== "all") {
    console.log(req.params.price);
    product = await Product.find({ "amount": req.params.price });
  }

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/searchSecond/:language/:pages/:year', async (req, res) => {
  let product = [];
  if (req.params.pages === "all" && req.params.language === "all" && req.params.year === "all") {
    product = await Product.find();
    // res.send(products);
  }
  else if (req.params.language !== "all" && req.params.pages !== "all") {
    product = await Product.find({ "language": req.params.language, "pages": req.params.pages });
  }
  else if (req.params.pages !== "all" && req.params.year !== "all") {
    product = await Product.find({ "pages": req.params.pages, "year": req.params.year });
  }
  else if (req.params.year !== "all" && req.params.language !== "all") {
    product = await Product.find({ "year": req.params.year, "language": req.params.language });
  }

  else if (req.params.language !== "all") {
    console.log(req.params.language)
    product = await Product.find({ "language": req.params.language })
    console.log(product);
  }
  else if (req.params.pages !== "all") {
    product = await Product.find({ "pages": req.params.pages });
  }
  else if (req.params.year !== "all") {
    product = await Product.find({ "year": req.params.year });
  }

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
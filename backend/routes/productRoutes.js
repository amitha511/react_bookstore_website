import express from 'express';
import Product from '../models/productModel.js';
import cors from 'cors';


const productRouter = express.Router();

productRouter.get('/grouped-by-category', async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $project: { _id: 0, category: '$_id', count: 1 } },
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

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

productRouter.get('/search/:name', async (req, res) => {
  try {
    const product = await Product.find({ "name": req.params.name });
    res.send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.post('/addProduct', (req, res) => {
    const product = new Product(req.body);
    product.save((err, savedProduct) => {
        if (err) {
            console.error(err);
            res.status(500).send('Unable to save product to database');
        } else {
            res.send(savedProduct);
        }
    });
});


productRouter.post('/update', async (req, res) => {

  Product.findOne({ _id: req.body._id }, function (err, product) {
    if (!err) {
      console.log(product.price);
      product.name = req.body.name;
      product.amount = req.body.amount;
      product.img = req.body.img;
      product.genre = req.body.genre;
      product.pages = req.body.pages;
      product.year = req.body.year;
      product.store = req.body.store;
      product.language = req.body.language;
      product.save(function (err) {
        if (!err) {
          console.log("Updated!");
        }
        else {
          console.log("Error: could not save");
        }
      });
    }
  });
});


productRouter.delete('/:bookId', async (req, res) => {
    
  const bookId = req.params.bookId;

    try {
        const result = await Product.deleteOne({ _id: bookId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: `Book with ID ${bookId} not found` });
        } else {
            res.json({ message: `Book with ID ${bookId} has been removed` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default productRouter;
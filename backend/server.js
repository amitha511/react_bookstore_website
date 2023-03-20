import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoutes.js';
import buyingRouter from './routes/buyingRouter.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

mongoose
  .connect('mongodb+srv://pro:DDwiYcBcxZDXEHDR@cluster0.iqfprtk.mongodb.net/books')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let userCount = 0;

// Socket.IO event listener for new connections
io.on('connection', (socket) => {
  // Increment user count on new connection
  userCount++;
  // Send user count to all connected clients
  io.emit('userCount', userCount);

  // Socket.IO event listener for disconnect
  socket.on('disconnect', () => {
    // Decrement user count on disconnect
    userCount--;
    // Send user count to all connected clients
    io.emit('userCount', userCount);
  });
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/', buyingRouter);

app.get('/grouped-by-category', (req, res) => {

  const query = `
    SELECT store, COUNT(*) AS count
    FROM products
    GROUP BY genre
  `;
  app.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching grouped products');
    } else {
      res.json(results);
    }
  });


});

const port = process.env.PORT || 5000;


server.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});




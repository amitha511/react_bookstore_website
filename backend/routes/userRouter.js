import express from 'express';
import User from '../models/userModel.js';
import data from '../data.js';

const userRouter = express.Router();

userRouter.post('/addUser', (req, res) => {
    const user = new User(req.body);
    user.save((err, savedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Unable to save user to database');
        } else {
            res.send(savedUser);
        }
    });
});

userRouter.get('/search/:email', async (req, res) => {
  try {
    const user = await User.find({ "email": req.params.email });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

export default userRouter;
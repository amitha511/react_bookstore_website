import express from 'express';
import Shopping from '../models/buyingModel.js';
import data from '../data.js';

const buyingRouter = express.Router();


buyingRouter.post('/', async (req, res) => {//Post Request - On Buy Now - Get the information and send it to addShopping function in db.js 
    var name = req.body.name;
    // var quantity = req.body.quantity;
    var amount = req.body.amount;
    var username = req.body.username;
    var email = req.body.email;
    const data = {
        products: [
            {
                // _id: '1',
                name: name,
                email: email,
                username: username,
                amount: amount,
            },
        ]
    }
    const addedBuying = await Shopping.insertMany(data.products);
    console.log(addedBuying);
    res.send({ addedBuying });
});
export default buyingRouter;
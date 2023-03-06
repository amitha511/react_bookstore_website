import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema(
    {
    amount: {
        type: Number,
        require: true,
        min:0
    },
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    }
    },
    {
        timestamps: true,
    }
);

const Shopping = mongoose.model('Shopping', shoppingSchema);
export default Shopping;
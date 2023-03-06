import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      require: true,
      min: 0
    },
    img: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    genre: {
      type: String,
      require: true
    },
    store: {
      type: String,
      require: true
    },
    language: {
      type: String,
      require: true
    },
    pages: {
      type: String,
      require: true
    },
    year: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
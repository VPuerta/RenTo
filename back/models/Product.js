const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  category: {
    type: String,
    enum: ["Fashion", "Sports", "Motor", "Books", "Tools", "Home", "Other"]
  },
  description: String,
  price: Number,
  rating: Number,
  imageUrl: { type: String, required: true },
  position:{
    lat:Number,
    lng:Number,
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

productSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
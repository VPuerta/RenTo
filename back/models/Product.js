const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  category: {
    type: String,
    enum: ['Sport', 'Other'],
  },
  description: String,
  price: Number,
  days:Number,
  pictures: [{
    imgName: String,
    imgPath: String,
  }],
  position: { type: { type: String }, coordinates: [Number] },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

productSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
  product : { type: Schema.Types.ObjectId, ref: "Product" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  client: { type: Schema.Types.ObjectId, ref: "User" },
  fristDay: Date,
  lastDay: Date,
  rating: Number,
  status: {
    type: String,
    enum: ["pending","confirmed","rejected"],
    default:"pending",
  },
 
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


const Rent = mongoose.model('Rent', rentSchema);
module.exports = Rent;
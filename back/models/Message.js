const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Message = new Schema({
  sender:{ type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('Message');
module.exports = Message;
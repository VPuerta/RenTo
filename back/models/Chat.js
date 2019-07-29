const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Chat = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  messages: [
      {type: Schema.Types.ObjectId, ref: "Message" }
  ],
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});



const Chat = mongoose.model('Chat');
module.exports = Chat;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  username: String,
  password: String,
  // location: { type: { type: String }, coordinates: [Number] },
  email: String,
  city: String,
  rating: [Number],
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// userSchema.index({ location: '2dsphere' });


const User = mongoose.model('User', userSchema);
module.exports = User;

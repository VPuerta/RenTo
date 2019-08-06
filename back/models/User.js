const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  photo: String,
  chatToken: String
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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    recipient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    readed: {
      type: String,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = FriendRequest=  mongoose.model('FriendRequest', friendRequestSchema);
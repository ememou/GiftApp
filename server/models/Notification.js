const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema(
    {
      text: {
          type: String,
          default: ""
      },
      owner: {
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

module.exports = Notifications=  mongoose.model('Notifications', NotificationsSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'employee id is required'],
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'TimeOff',
      required: [true, 'type id is required'],
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      required: [true, 'status is required'],
      default: 'pending',
    },

    startfrom: {
      type: Date,
    },
    endat: {
      type: Date,
    },
    reportedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    description: {
      type: String,
    },
    created_At: {
      type: Date,
      default: Date.now(),
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model('Request', requestSchema);

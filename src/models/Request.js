const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes;

const requestSchema = new mongoose.Schema(
  {
    employee_id: {
      type: ObjectId,
      ref: 'User',
      required: [true, 'employee id is required'],
    },
    type: {
      type: String,
      enum: ['Sick Leave', 'leave', 'payroll'],
      required: [true, 'employee id is required'],
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      required: [true, 'status is required'],
      default: 'pending',
    },
    resolved_by: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },

    startfrom: {
      type: Date,
    },
    endat: {
      type: Date,
    },
    reportedTo: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    description: {
      type: String,
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

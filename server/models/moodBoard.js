const { Schema, model } = require('mongoose');

const moodBoardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    // images: [String]
    images: [
      {
        position: {
          type: Number,
          max: [15, 'Can not have more than 16 images'],
          min: [0, 'Can not have less than 16 images']
        },
        resource: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const MoodBoard = model('MoodBoard', moodBoardSchema);
module.exports = MoodBoard;

const MoodBoard = require('../models/moodBoard');
const fs = require('fs')


exports.getImageResources = async (req, res) => {
  const resourceFolder = "public/resources"
  let files = []
  try {
    files = fs.readdirSync(resourceFolder)
    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

exports.createMoodBoard = async (req, res) => {
  req.body.user = req.session.userId;
  try {
    let moodBoard = await MoodBoard.create(req.body);
    res.status(200).json(moodBoard);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteMoodBoardById = async (req, res) => {
  const { id } = req.params;
  let userId = req.session.userId;
  let moodBoard;
  try {
    moodBoard = await MoodBoard.findById(id);
  } catch (error) {
    res.status(500).json(error.message);
  }
  if (moodBoard.user.toString() !== userId.toString()) {
    return res.status(500).json('Only the owner can delete their mood boards');
  }
  try {
    let moodBoard = await MoodBoard.findByIdAndDelete(id);
    res.status(200).json(moodBoard);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getMoodBoardById = async (req, res) => {
  const { id } = req.params;
  try {
    let moodBoard = await MoodBoard.findById(id);
    res.status(200).json(moodBoard);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getMoodBoardsByUser = async (req, res) => {
  const { user } = req.params;
  try {
    let moodBoards = await MoodBoard.find({ user: user });
    res.status(200).json(moodBoards);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

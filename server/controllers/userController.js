const User = require('../models/user');
ObjectId = require('mongodb').ObjectID;

exports.setBoardToHome = async (req, res) => {
  const { id } = req.body;
  let _id = new ObjectId(id);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      {
        homeBoard: _id
      },
      { new: true }
    )
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.addBoardToFavourites = async (req, res) => {
  const { id } = req.body;
  let _id = new ObjectId(id);
  let recordCheck;
  try {
    recordCheck = await User.findOne({
      _id: req.session.userId,
      favouriteMoodBoards: _id
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
  if (recordCheck !== null) {
    return res.status(500).json('Already added to favourites');
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      {
        $push: { favouriteMoodBoards: _id }
      },
      { new: true, projection: { password: 0 } }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.removeBoardFromFavourites = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      {
        $pull: {
          favouriteMoodBoards: id
        }
      },
      { new: true, projection: { favouriteMoodBoards: 1 } }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.removeAllBoardsFromFavourites = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.session.userId },
      {
        favouriteMoodBoards: []
      },
      { new: true, projection: { favouriteMoodBoards: 1, _id: 0 } }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    let boards = await User.findOne(
      { _id: req.session.userId },
      { favouriteMoodBoards: 1 }
    ).populate('favouriteMoodBoards');
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

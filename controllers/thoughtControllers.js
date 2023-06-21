const { ObjectId } = require('mongoose');
const { Thought, User } = require('..');

const thoughtController = {
    getThought: async function (req, res) {
      try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    getSingleThought: async function (req, res) {
      try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    createThought: async function (req, res) {
      try {
        const dbThoughtData = await Thought.create(req.body);
        const dbUserData = await User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created, but no user found with this id' });
        }
        res.json({ message: 'Thought was created' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    updateThought: async function (req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    deleteThought: async function (req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        const dbUserData = await User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        res.json({ message: 'Thought was deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    addReaction: async function (req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
        console.log(req.body)
        debugger
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    removeReaction: async function (req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          {
            $pull: {
              reactions: {
                reactionId: req.params.reactionId
              }
            }
          },
          { runValidators: true, new: true }
        );
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        res.json(dbThoughtData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  };
  
  module.exports = thoughtController;
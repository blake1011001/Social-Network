const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');
router.route('/').get(getThought).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reaction').post(addReaction);
router.route('/:thoughtId/reaction/:reaactionId').delete(removeReaction);

module.exports = router;
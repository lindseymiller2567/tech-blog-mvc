const router = require('express').Router();
const { Comment } = require('../../models');

// GET // localhost:3001/api/comments/
router.get('/', (req, res) => {
    Comment.findAll({
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST // localhost:3001/api/comments/
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.body.user_id // will need to change this to: req.session.user_id // grabs user id from the session instead of body
    })
        .then(dbCommentData => {
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;
const router = require('express').Router();
const { Post, User, Comment } = require('../models/index');

// View homepage with all the posts 
router.get('/', (req, res) => {
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true })); // Sequelize's get() method
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// View Login page, if user is already logged in, then page redirects to the homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
})

// View user's dashboard with all their posts 
router.get('/dashboard', (req, res) => {
    Post.findAll({
        where: {
            id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true })); // Sequelize's get() method
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


module.exports = router;
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// localhost:3001/api
router.use('/api', apiRoutes);

// localhost:3001/
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
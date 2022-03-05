const router = require('express').Router();

const apiRoutes = require('./api');

// localhost:3001/api
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
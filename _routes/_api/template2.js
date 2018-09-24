const express = require('express');
const router = express.Router();

/*
 * @route   GET api/template2/test
 * @desc    Tests the template2 route
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Template 2 Tester"
    });
});

router.get('/template2', (req, res) => {
    res.json({
        msg: "Template 2"
    });
});

module.exports = router;
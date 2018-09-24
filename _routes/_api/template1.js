const express = require('express');
const router = express.Router();

/*
 * @route   GET api/template1/test
 * @desc    Tests the template1 route
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        msg: "Template 1 Tester"
    });
});

router.get('/template1', (req, res) => {
    res.json({
        msg: "Template 1"
    });
});

module.exports = router;
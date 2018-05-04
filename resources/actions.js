const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
  dbActions.get()
    .then(actions => res.json(actions))
    .catch(err => res.status(500).json({ error: "Could not retrieve the actions." }))
})

module.exports = router;
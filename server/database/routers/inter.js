const express = require('express');
const router = express.Router();
const controllers = require('../contraollers/index.js')


router.get('/', controllers.inter.getIntervention);
router.get('/done/:id', controllers.inter.doneIntervention);

       
module.exports = router;

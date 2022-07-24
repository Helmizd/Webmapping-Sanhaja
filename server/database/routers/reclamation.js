const express = require('express');
const router = express.Router();
const controllers = require('../contraollers/index.js')


router.get('/', controllers.reclamation.getReclamations);
router.get('/user/:user_id', controllers.reclamation.getReclamations);
router.post('/', controllers.reclamation.postReclamation);
router.get('/move/:id', controllers.reclamation.moveReclamation);
router.get('/delete/:id', controllers.reclamation.deleteReclamation);
router.post('/update', controllers.reclamation.updateReclamation);           
module.exports = router;

const express = require('express');
const router = express.Router();
const controllers = require('../contraollers/index.js')


router.get('/', controllers.user.getUserByCookie);
router.get('/all', controllers.user.getUsers);
router.post('/sign', controllers.user.logIn);
router.post('/create', controllers.user.create);
router.post('/delete/:id', controllers.user.delete);
       
module.exports = router;

const inter = require('../models/index.js').inter
const lib = require('../../lib/json_control.js')
module.exports = {

    getIntervention:(req, res) => {

        inter.get()
        .then(response=>{
            res.status(200).send(response);
        })
    },
    doneIntervention:(req, res) => {
        let id = req.params.id
        inter.done(id)
        .then(response=>{
            res.status(200).send(response);
            if(response && response[0]) lib.convertToDone(response[0].rec_id)
        })
    },
    
}

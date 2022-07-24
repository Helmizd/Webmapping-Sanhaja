const Reclamation = require('../models/index.js').reclamation
const lib = require('../../lib/json_control.js')

module.exports = {
    
    getReclamations:(req, res) => {
        let user=null
        if (req.params.user_id) user=req.params.user_id
        console.log(user)
        Reclamation.get(null,user)
        .then(response=>{
            res.status(200).send(response);
        })
    },
    postReclamation:(req, res) => {

        Reclamation.post(req.body)
        .then(response=>{
            
            res.status(200).send(response);
            lib.addReclamationJSON(response[0].id,response[0].type,response[0].objectid)
        })
    },
    moveReclamation:(req, res) => {
        let id = req.params.id
        Reclamation.move(id)
        .then(response=>{
           
                res.status(200).send(response);
                if(response && response[0]) lib.convertToIntervention(response[0].rec_id)
            
        })
    },
    deleteReclamation:(req, res) => {
        let id = req.params.id
        Reclamation.deleteRec(id)
        .then(response=>{
           
                res.status(200).send(response);
                if(response && response[0]) lib.deleteReclamation(response[0].id)
            
        })
    },
    updateReclamation: (req, res) => {

        Reclamation.update(req.body)
        .then(async response=>{
            
            res.status(200).send(response);
            if(response && response[0]){
                await lib.deleteReclamation(response[0].id)
                lib.addReclamationJSON(response[0].id,response[0].type,response[0].objectid)
            } 
        })
    },
}

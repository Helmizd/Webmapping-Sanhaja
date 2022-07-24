const pool = require('../config.js')
const reclamation = require('./index.js').reclamation

const get = () => {
    return new Promise(function(resolve, reject) {

      pool.query('SELECT * FROM intervention ORDER BY cast(statut as int)', (error, results) => {
        if (error) {
          reject(error)
        }

        var CreatedArray = []
        var itemsProcessed = 0;
        results.rows.forEach(async (row,index,array)=>{
            var thread = reclamation.get(row.rec_id)
          .then((response)=> CreatedArray.push({...response[0],...row})  )
          await thread;

          itemsProcessed++;
          if(itemsProcessed === array.length) {
            CreatedArray = CreatedArray.sort((a,b) => (a.statut > b.statut) ? 1 : ((b.statut > a.statut) ? -1 : (a.date_debut > b.date_debut) ? -1 : ((b.date_debut > a.date_debut) ? 1 : 0 )))
            resolve(CreatedArray);
          }
          
        })
        if(results.rows.lenth == 0 && CreatedArray.length == 0) resolve([])
          
        
        
      })
    }) 
  }

const done = (id) => {
    return new Promise(function(resolve, reject) {
        let datefinIntervention = new Date()
        pool.query('UPDATE  intervention SET statut=1 ,date_fin=$1  where id=$2 RETURNING *',[datefinIntervention,id], (error, results) => {
        if (error) {
            reject(error)
        }

        resolve(results.rows);
        })
    }) 
}


module.exports = {
    get,
    done,
}
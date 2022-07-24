const pool = require('../config.js')


const get = (id,user_id) => {
    return new Promise(function(resolve, reject) {
      let query = 'SELECT * FROM reclamation ORDER BY id ASC'
      if(id) query = 'SELECT * FROM reclamation where id='+id+' ORDER BY id ASC'
      if(user_id) query = 'SELECT * FROM reclamation where user_id='+user_id+' ORDER BY id ASC'
      pool.query(query, (error, results) => {
        if (error) {
          reject(error)
        }
        
        var CreatedArray = []
        var itemsProcessed = 0;
        results.rows.forEach(async (row,index,array)=>{
          var CheckExist = false
          if(!id){
             var threadTwo= checkIntervention(row.id)
            .then((resp) => CheckExist = resp)
          }
          await threadTwo;
          if(!CheckExist){
            var data = {nom:''}
            switch (row.type) {
              case "1":
                var thread = extractData('piste',row.objectid)
                    .then((resp)=>  data = resp)
                  break;
              case "2":
                   var thread =  extractData('route',row.objectid)
                    .then((resp)=>  data = resp)
                    break;
              default:
                var data = {nom:''}
                break;
            }
            await thread;
  
            CreatedArray.push({...row,'nom':data.nom}) 
            
          }
          itemsProcessed++;
            if(itemsProcessed === array.length) {
              resolve(CreatedArray);
            }
          
        })
          if(results.rows.lenth == 0 && CreatedArray.length == 0) resolve([])
          
        
        
      })
    }) 
  }
  const checkIntervention= (id)=>{
    return new Promise(function(resolve, reject) {

      pool.query('SELECT * FROM intervention where rec_id=$1',[id], (error, results) => {
        if (error) {
          reject(error)
        }

        if(results && results.rows && results.rows.length>0 ){
          resolve(true);
        }else{
          resolve(false)
        }
        
      })
    }) 
  }
const extractData = (table,id)=>{
  return new Promise(function(resolve, reject) {

    pool.query('SELECT * FROM '+table+' where "OBJECTID"=$1',[id], (error, results) => {
      if (error) {
        reject(error)
      }

      if(results && results.rows && results.rows[0]){
        resolve(results.rows[0]);
      }else{
        resolve({nom:''})
      }
      
    })
  }) 
}
const post = (data) => {
    return new Promise(function(resolve, reject) {
        let dateReclamation = new Date()
        console.log(data.objectid ,data.type ,data.cin ,data.name ,data.lastname,dateReclamation,data.user_id)
        pool.query('INSERT into reclamation (objectid,type, cin ,name,lastname,date_rec,user_id) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *',[data.objectid ,data.type ,data.cin ,data.name ,data.lastname,dateReclamation,data.user_id], (error, results) => {
        if (error) {
            reject(error)
        }

        resolve(results.rows);
        })
    }) 
}
const move = (id) => {
  return new Promise(function(resolve, reject) {
    console.log(id)
      let dateIntervention = new Date()
      pool.query('INSERT into intervention (rec_id,date_debut ,statut) VALUES ($1, $2,0) RETURNING *',[id,dateIntervention], (error, results) => {
      if (error) {
          reject(error)
      }

      resolve(results.rows);
      })
  }) 
}
const update = (data) => {
  return new Promise(async function(resolve, reject) {
      var objectid = ''
      var type = ''
      var cin = ''
      var name = ''
      var lastname = ''
      var thread = get(data.id)
      .then((resp)=>{
        let rwo = resp[0]
         objectid = data.objectid || rwo.objectid
         type = data.type || rwo.type
         cin = data.cin || rwo.cin
         name = data.name || rwo.name
         lastname = data.lastname || rwo.lastname
      })
      await thread;
      console.log(data.id,objectid )
      pool.query('UPDATE reclamation SET  objectid=$1 ,type=$2, cin=$3 ,name=$4,lastname=$5 where id=$6 RETURNING *',[objectid ,type ,cin ,name ,lastname,data.id], (error, results) => {
      if (error) {
          reject(error)
      }

      resolve(results.rows);
      })
  }) 
}

const deleteRec = (id) => {
  return new Promise(function(resolve, reject) {
    console.log(id)
      let dateIntervention = new Date()
      pool.query('delete from reclamation where id=$1 RETURNING *',[id], (error, results) => {
      if (error) {
          reject(error)
      }

      resolve(results.rows);
      })
  }) 
}
module.exports = {
    get,
    post,
    move,
    deleteRec,
    update
}
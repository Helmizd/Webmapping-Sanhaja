const pool = require('../config.js')

const getUser = (cookie) => {
  return new Promise(function(resolve, reject) {

    pool.query('SELECT * FROM users where cookie=$1',[cookie], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  }) 
}
const Users = () => {
    return new Promise(function(resolve, reject) {

      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error)
        }

        resolve(results.rows);
      })
    }) 
  }

const findUser = (email,password) => {
  return new Promise(function(resolve, reject) {

    pool.query('SELECT * FROM users where email=$1 and password=$2',[email,password], (error, results) => {
      if (error) {
        reject(error)
      }

      if (results.rows.length > 0 && results.rows[0].id){
        
        resolve(signUser(results.rows[0].id))
      }else{
        resolve(false)
      }
      
    })
  }) 
}
const signUser = (id)=>{
  return new Promise(function(resolve, reject) {
    var cookie=Math.random().toString();
    cookie=cookie.substring(2,cookie.length);
    pool.query('UPDATE users set cookie=$1 where id=$2',[cookie,id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(cookie);
    })
  }) 
}
const createUser = (data)=>{
  return new Promise(function(resolve, reject) {
    var role='2'
    if (data.role == "administrator" || data.role == "0" || data.role == 0){
      role = '0'
    }else if (data.role == "editor" || data.role == "1" || data.role == 1){
      role = '1'
    }
    pool.query('INSERT INTO users (name,lastname, email,role,password) VALUES ($1, $2,$3,$4,$5) RETURNING *', [data.name ,data.lastname ,data.email ,role ,data.password], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results?.rows?.length > 0)resolve({status:'success'});
      else resolve({status:'fail'});
    })
  }) 
}
const deleteUser = (id)=>{
  return new Promise(function(resolve, reject) {

    pool.query('DELETE FROM users  where id=$1',[id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  }) 
}
module.exports = {
  getUser,
  Users,
  findUser,
  createUser,
  deleteUser
}
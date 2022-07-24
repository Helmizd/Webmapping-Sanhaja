const User = require('../models/index.js').user

module.exports = {
    getUserByCookie:   (req, res) => {
        var cookie = req.cookies.signIn;
        if(!cookie){
            res.status(200).send([]);
            return
        }
        User.getUser(cookie)
        .then(response=>{
            res.status(200).send(response);
        })
    },
    getUsers:   (req, res) => {

        User.Users()
        .then(response=>{
            res.status(200).send(response);
        })
    },
    logIn: (req, res) => {
        if(!req.body.email || !req.body.password){
            res.status(200).send({status:"fail"});
            return
        }
        
        User.findUser(req.body.email.toString(),req.body.password.toString())
        .then(response=>{
            if(response){
                res.cookie('signIn',response, { maxAge: 900000, httpOnly: false });
                res.status(200).send({status:"success"});
            }else{
                res.status(200).send({status:"fail"});
            }
            
        })
    },
    create:   (req, res) => {

        User.createUser(req.body)
        .then(response=>{
            res.status(200).send(response);
        })
    },
    delete:   (req, res) => {

        User.deleteUser(req.params.id)
        .then(response=>{
            res.status(200).send(response);
        })
    },
}


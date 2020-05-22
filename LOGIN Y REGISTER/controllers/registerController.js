const bcryptjs = require ('bcryptjs');
let users = require('../data/users.json');
const fs = require('fs');
const path = require('path');

let registerController = {

    verRegister:function(req,res){
        res.render('register');
    },

    crearRegister:function(req,res){

            let usersFilePath = path.join(__dirname, '../data/users.json');
            let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            let nextId;
            //Creamos id para el usuario
            if(users == false){
                nextId = 1;
            } else {
                nextId = users[users.length - 1].id + 1;
            }

       let user = {
            id:nextId,
            name: req.body.name,
            mail :req.body.mail,
            password: bcryptjs.hashSync(req.body.password, 10),
        }

        users = [...users, user];
        users=JSON.stringify(users, null ,' ');
        fs.writeFileSync(__dirname + '/../data/users.json', users);

        res.redirect('/');


    },
    
    verLogin:function(req,res){
        res.render('login');
    },

    entrarLogin:function(req,res){


        users = fs.readFileSync(__dirname + '/../data/users.json', 'utf8');
        users= JSON.parse(users);
        res.render('profile', {users: users});

        console.log(users);

    }




}

module.exports=registerController;
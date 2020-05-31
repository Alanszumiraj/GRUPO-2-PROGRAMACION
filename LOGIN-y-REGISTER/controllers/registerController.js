const bcryptjs = require ('bcryptjs');
let users = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const models = require('../models/jsonModel');
const userModels = models('users');


let registerController = {

    verRegister:function(req,res){
        return res.render('register');
    },

    crearRegister:function(req,res){

        let errors = validationResult(req);		
		
		if(!errors.isEmpty()){ //Si errors tiene datos 
            res.render('register', { errors: errors.errors})}
            
            else{ 
                

       let user = {
            id:userModels.nextId(),
            name: req.body.name,
            email :req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            //password:req.body.password,
        }

        users = [...users, user];
        users=JSON.stringify(users, null ,' ');
        fs.writeFileSync(__dirname + '/../data/users.json', users);

        res.redirect('/');

    }

    },
    
    verLogin:function(req,res){
        res.render('login');
    },

    verUsuario:function(req,res){
        
        let usuarios = userModels.getAll();

        let usuarioEncontrado = usuarios.filter(function (element) {
            return req.body.email == element.email;
        })

        if(usuarioEncontrado == 0){
            return res.send('No se encontro el usuario')
        }

        res.render('profile', { usuarioEncontrado: usuarioEncontrado });

    }




}

module.exports=registerController;
const mysql = require('mysql');
const express = require('express');
const connection = require('./connectdatabase');

var app = express();
app.use(express.json());

// Listen port
app.listen(3000,() => console.log('Express server is running at port No.: 3000'));

// Get all users
app.get('/users',(req, res) => {
    connection.query('SELECT * FROM users',(err, rows, fields) => {
        if(!err){
            res.send(rows);
        } else {
            console.log(err)
        }
    })
})

// Get user by id
app.get('/users/:id',(req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(rows.length <= 0){
            res.send('User not found with id = ' + id)
        } else {
            res.send(rows);
        }
    })
})

//update user by id
app.post('/users/:id', (req, res, next) => {
    let id = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    let status = req.body.status;
    let f_name = req.body.f_name;
    let l_name = req.body.l_name;
    let tel_num = req.body.tel_num;
    let email = req.body.email;
    let address = req.body.address;
    let gender = req.body.gender;
    let group_id = req.body.group_id;
    let errors = false;

    if (username.length === 0 || password.length === 0){
        errors = true;
        res.send('error','Please fill your information');
        
    }

    if(!errors){
        let form_data = {
            username: username,
            password: password,
            status : status,
            f_name : f_name,
            l_name: l_name,
            tel_num : tel_num,
            email : email,
            address : address,
            gender : gender,
            group_id : group_id
        }
        // update query
        connection.query('UPDATE users SET ? WHERE id = ' + id, form_data, (err,result) => {
            if (err) {
                res.send('Update Error!', err);
            } else {
                res.send('Update Success!');

            }
        })
    }
})

// Delete user by id
app.delete('/users/:id',(req, res) => {
    connection.query('DELETE FROM users WHERE id = ?',[req.params.id],(err, rows, fields) => {
        if(!err){
            res.send('Deleted user successful');
        } else {
            console.log(err)
        }
    })
})

// Insert user
app.post('/users',(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let status = req.body.status;
    let group_id = req.body.group_id;
    let errors = false;

    if(username.length === 0 || password.length === 0 || status.length === 0 || group_id.length === 0){
        errors = true;
        res.send('Please fill your information');
    }

    if(!errors){
        let form_data = {
            username: username,
            password: password,
            status : status,
            group_id : group_id
        }
        
        connection.query('INSERT INTO users SET ?',[form_data],(err, result) => {
            if(!err){
                res.send('Add user successful');
            } else {
                console.log(err)
            }
        })
    }
})
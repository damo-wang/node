var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var path = require('path');
var jade = require('jade');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        var id = url.parse(req.url, true).query.id;
        console.log('id:' + id);
        if (id != undefined) {
            data = JSON.parse(data);
            var user = data["user" + id];
            console.log(user);
            res.render('list', {
                title: '用户信息',
                juser: user
            });
        } else {
            console.log(data);
            data = JSON.parse(data);
            res.render('list', {
                title: '用户信息',
                juser: data
            });
        }
    });
});

//添加的新用户数据
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
};

app.get('/addUser', function(req, res) {
    // 读取已存在的数据
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];

        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function(err) {
            if (err) {
                res.end('add failed');
            } else {
                res.end('add success');
            }
        });
        console.log(data);
        res.render('list', {
            title: '用户信息',
            juser: data
        });
    });
});

app.get('/deleteUser', function(req, res) {

    // First read existing users.
    var id = url.parse(req.url, true).query.id;
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        delete data["user" + id];
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), function(err) {
            if (err) {
                res.end('add failed');
            } else {
                res.end('add success');
            }
        });
        res.render('list', {
            title: '用户信息',
            juser: data
        });
    });
});
/*
app.get('/:id', function(req, res) {
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
});
*/
app.use(express.static(path.join(__dirname, 'public')));
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);
});
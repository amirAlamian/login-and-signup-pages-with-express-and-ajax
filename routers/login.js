const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path")
const bodyparser = require("body-parser");
let userInfo={
    username:"",
    password:"",
    email:"",

};
router.use(bodyparser.urlencoded({ extended: false }))

router.use(express.static("public"));
router.get("/", function (req, res) {
    let ip = req.headers['x-forwarded-for'];
    console.log(req.connection.remoteAddress);
    
    res.render("pages/login")
})

router.post("/", function (req, res) {
    fs.readFile(path.join(__dirname, "../users.json"), "utf-8", function (err, file) {
        if (err) {
            console.log(err);

        }
        file = JSON.parse(file);
        for (let i = 0; i < file.length; i++) {
            if (req.body.username === file[i].username) {
                if (req.body.password === file[i].password) {
                   
                        userInfo = file[i];
                        file[i].isLoggedIn = true;
                        res.send("login/users");
                        fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(file), function (err) {
                            if (err) {
                                console.log("can not write dtata into file");
    
                            }
                        });
                        return;
                   
                   
                    
                }
                else {
                    res.send("password is not correct");
                    return;
                }
            }
            if (i === file.length - 1) {
                res.send("user is not found");
                return;
            }
        }

    })


})

router.get("/users", function (req, res) {
    if(userInfo.username!=""){
        res.render("pages/users", { userInfo })
    }
    else{
        res.render("pages/login");
        
    }
    
})
router.post("/users/logout", function (req, res) {
    fs.readFile(path.join(__dirname, "../users.json"), "utf-8", function (err, file) {
        if (err) {
            console.log(err);

        }
        file = JSON.parse(file);
        for (i = 0; i < file.length; i++) {
            if (req.body.username === file[i].username) {
                file[i].isLoggedIn = false;
                fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(file), function (err) {
                    if (err) {
                        console.log("can not write data into file");

                    }
                });
                res.send("handled")
                break;
            }
        }
    })
    
})

router.put("/users/edit", function (req, res) {
    console.log(req.body);
    fs.readFile(path.join(__dirname, "../users.json"), "utf-8", function (err, file) {
        if (err) {
            console.log(err);

        }
        file = JSON.parse(file);
        for (i = 0; i < file.length; i++) {
            if (req.body.username === file[i].username && "  " + file[i].username != req.body.preUsername) {
                res.send("username is already taken");
                return;
            }
        }
        for (i = 0; i < file.length; i++) {
            if ("  " + file[i].username === req.body.preUsername) {
                file[i].username = req.body.username;
                file[i].email = req.body.email;
                file[i].password = req.body.password;
                file[i].isLoggedIn = false;
                break;
            }
        }
        fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(file), function (err) {
            if (err) {
                console.log("can not write data into file");

            }
            res.send("updated")
        });
    })


})
module.exports = router;











const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path")
const bodyparser = require("body-parser");
let flag=true;
router.use(bodyparser.urlencoded({ extended: false }))
router.get("/", function (req, res) {
    res.render("pages/signup")
})
router.post("/register", function (req, res) {
    fs.readFile(path.join(__dirname, "../users.json"),"utf-8",function(err,file){
        if(err){
            console.log(err);
            
        }
        file=JSON.parse(file);
        for(let i=0;i<file.length;i++){
            if(req.body.username===file[i].username){
                res.send("ununique name");
                flag=false;
            }
        }
        if(flag){
            res.send("received");
            req.body.isLoggedIn = false;
            file.push(req.body);
            fs.writeFile(path.join(__dirname, "../users.json"), JSON.stringify(file),function(err){
                if(err){
                    console.log("can not write dtata into file");
                    
                }
            }); 
        }
    
    
    
    })
   

})
module.exports = router;

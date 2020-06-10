const express=require("express");
const app=express();
const signUp=require("./routers/signup")
const login=require("./routers/login")
app.set("view engine","ejs");


app.use(express.static("public"));

app.use("/signup",signUp)

app.use("/login",login)

app.listen(8080,function(){
    console.log("server is starting on port 8080");
    
});

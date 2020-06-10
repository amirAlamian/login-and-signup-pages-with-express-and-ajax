let titles = ["username", "email", "password", "gender"]
let userInfo = {
    username: "",
    email: "",
    password: "",
    gender: "",
    preUsername:""
}
let loginInfo = {
    username: "",
    password: "",
}
let permission = false;

$("#signup").click(function () {// for sign up button
    for (let i = 0; i < $(".inputSign").length; i++) {
        userInfo[titles[i]] = $(".inputSign").eq(i).val();
    }
    for (i = 0; i < $(".radioSign").length; i++) {
        if ($(".radioSign").eq(i).attr("checked", true)) {
            userInfo.gender = $(".radioSign").eq(i).val();
        }

    }
    for (i = 0; i < titles.length; i++) {
        if (userInfo[titles[i]] === "") {
            $("input").eq(i).css("border-color", "red")
            $("h3").text("Please fill all of the inputs to sign up").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "block" })
            break;
        }
        if (i === titles.length - 1) {
            $("input").css("border-color", "lightgray")
            $("h3").css("display", "none")
            permission = true;
        }
    }
    if (permission) {
        $.ajax({
            type: "POST",
            data: userInfo,
            url: "/signup/register",
            success: function (response) {
                console.log(response);
                if (response === "ununique name") {
                    $("h3").text("this username is taken please  try to choose another one").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "block" })
                }
                if (response === "received") {
                    $("input").css("border-color", "green")
                    permission = false;
                    window.location.href = '/login'
                }

            },
            error: function (err) {
                console.log(err);
            }
        })
    }
})
$("#login").click(function () {//for log in button
    loginInfo.username = $("input").eq(0).val();
    loginInfo.password = $("input").eq(1).val();
    if (loginInfo.password != "" && loginInfo.username != "") {
        permission = true;
        $("input").css("border-color", "lightgray");
        $(".h3").css("display", "none")
    }
    else {
        $("input").css("border-color", "red");
        $(".h3").text("please fill all of the inputs").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "block" })
    }
    if (permission) {
        $.ajax({
            type: "POST",
            data: loginInfo,
            url: "/login",
            success: function (response) {
                console.log(response);
                if (response === "user is not found") {
                    $("h3").text("can not find a user with that username").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "block" })
                }
                if (response === "password is not correct") {
                    $("h3").text("password is incorrect").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "block" })
                }
                if (response === "login/users") {
                    window.location.href = '/login/users'
                }
               
                permission = false;
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

})

$(".logout").click(function () {//for log out button
    loginInfo.username = $("#username").val();
    loginInfo.password = $("#pass").val();
    $.ajax({
        type: "POST",
        data: loginInfo,
        url: "users/logout",
        success: function (response) {
            console.log(response);
            if (response === "handled") {
                window.location.href = '/login'
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
})
$(".edit").click(function () {//for edit button
    $("input").attr("disabled", false);
    $(".save").css("display", "inline-block")
})
$(".save").click(function () {//for save button
    userInfo.username = $("input").eq(0).val();
    userInfo.email = $("input").eq(1).val();
    userInfo.password = $("input").eq(2).val();
    userInfo.preUsername=$(".h2").eq(1).text()
    console.log(loginInfo.username);
    if (userInfo.password != "" && userInfo.username != "" &&userInfo.email!="") {
        permission = true;
        $("input").css("border-color", "lightgray");
        $("h3").css("display", "none")
    }
    else {
        $("h3").text("please fiil all of inputs").css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "inline-block" })
        $("input").css("border-color", "red")
    }
    if (permission) {
        $("h3").css("display", "none");
        $.ajax({
            type: "PUT",
            data: userInfo,
            url: "users/edit",
            success: function (response) {
                console.log(response);
                if(response==="username is already taken"){ 
                    $("h3").text(response).css({ "color": "red", "background-color": "rgba(255,0,0,0.1)", "display": "inline-block" })
                    $("input").css("border-color", "red");
                }
                if (response === "updated") {
                    window.location.href = '/login'
                    $("input").attr("disabled", true);
                    $(".save").css("display", "none")
                }
                
                permission = false
            },
            error: function (err) {
                console.log(err);
            }
        })
        
    }


})

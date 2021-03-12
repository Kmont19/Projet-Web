$(document).ready(function() {
    checkPage();
    userConnect();
})

function checkInputLogin(userName, password) {
    if (userName.length == 0 || password.length == 0) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    if(confirm("Êtes-vous sûr de vouloir vous déconnecter?")) {
        sessionStorage.clear();            
        location.replace("index.html")
    }
}

function userConnect() {
    if(sessionStorage.length == 0) {
        $(".menu-admin").css("display", "none")
        $(".logout").css("display", "none")
        $(".menu-connexion").css("display", "block")
        return false
    } else {
        $(".menu-admin").css("display", "block")
        $(".logout").css("display", "block")
        $(".menu-connexion").css("display", "none")
        return true
    }
}


function loginUser(user) {
    var ajax = {
        type: "POST",
        url: "PHP/Login/login.php",
        datatype: "json",
        data: {
            action: 'loginUser',
            user: user
        },
        success: function(reponse) {
            console.log(reponse);
            if(reponse === "true") {                
                sessionStorage.setItem("utilisateur", "connected")
                userConnect()
            } else {
                errorLogin.innerHTML = ""
                errorLogin.innerHTML = "Le nom d'utilisateur ou le mot de passe ne sont pas corrects!"
                errorLogin.style.color = "#da1a32"
                $("#userName").val("")
                $("#password").val("")
            }
        }
    }
    $.ajax(ajax)
}


function checkPage() {
    if (window.location.href.indexOf("index.html") > -1) {
        $("#accueil").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
    } else if(window.location.href.indexOf("programme.html") > -1) {
        $("#programme").addClass("active")
        $("#accueil").removeClass("active")
        $("#actualite").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
    } else if(window.location.href.indexOf("actualite.html") > -1) {
        $("#actualite").addClass("active")
        $("#programme").removeClass("active")
        $("#accueil").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
    } else if(window.location.href.indexOf("liens-utiles.html") > -1) {
        $("#liens-utiles").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#accueil").removeClass("active")
        $("#evenements").removeClass("active")
    } else if(window.location.href.indexOf("evenement.html") > -1) {
        $("#evenements").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#accueil").removeClass("active")
        $("#liens-utiles").removeClass("active")

    } else {
        $("#index").addClass("active")
    }
} 
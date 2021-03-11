function checkPage() {
    if (window.location.href.indexOf("index.html") > -1) {
        $("#accueil").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
        $("#compte").removeClass("active")
    } else if(window.location.href.indexOf("programme.html") > -1) {
        $("#programme").addClass("active")
        $("#accueil").removeClass("active")
        $("#actualite").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
        $("#compte").removeClass("active")
    } else if(window.location.href.indexOf("actualite.html") > -1) {
        $("#actualite").addClass("active")
        $("#programme").removeClass("active")
        $("#accueil").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
        $("#compte").removeClass("active")
    } else if(window.location.href.indexOf("liens-utiles.html") > -1) {
        $("#liens-utiles").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#accueil").removeClass("active")
        $("#evenements").removeClass("active")
        $("#compte").removeClass("active")
    } else if(window.location.href.indexOf("evenement.html") > -1) {
        $("#evenements").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#accueil").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#compte").removeClass("active")
    } else if(window.location.href.indexOf("compte.html") > -1) {
        $("#compte").addClass("active")
        $("#programme").removeClass("active")
        $("#actualite").removeClass("active")
        $("#accueil").removeClass("active")
        $("#liens-utiles").removeClass("active")
        $("#evenements").removeClass("active")
    } else {
        $("#index").addClass("active")
    }
} 
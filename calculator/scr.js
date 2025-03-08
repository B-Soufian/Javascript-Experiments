
function claire(){
    document.getElementById("show").value = ""
}
function showin(n){
    if (document.getElementById("show").style.color === "rgb(86, 85, 85)"){
        document.getElementById("show").style.color = "white"
        claire()
    }
    document.getElementById("res").style.color="rgb(86, 85, 85)"
    document.getElementById("res").style.fontSize="2rem"
    document.getElementById("show").value += n
    document.getElementById("show").focus();
}
function calc(){
    document.getElementById("res").style.fontSize="5rem"

    document.getElementById("res").style.color = "white"
    let c = document.getElementById("show").value
    
    try{
        let cal = eval(c)
        document.getElementById("res").value = cal
    }
    catch{
        document.getElementById("res").value = "Errore"
    }
    document.getElementById("show").style.color = "rgb(86, 85, 85)";

    
}
let listcontact = []

function info(i){
    let contactinfo = document.querySelector(".contactinfo")
    let contactlist = document.querySelector(".contactlist")
    let addcontact = document.querySelector(".addcontact")
    contactinfo.classList.remove("hidden")
    contactlist.classList.add("hidden")
    addcontact.classList.add("hidden")

    let infocon = document.querySelector(".infocon")
    let inf = `
            <span class="user"><i class="fa-solid fa-user"></i></span>
            <p>${listcontact[i]["nam"]}</p>
            <p>${listcontact[i]["num"]}</p>
            <span class="phoen"><i class="fa-solid fa-phone"></i></span>
    `
    infocon.innerHTML = inf
}
function add(){
    let contactinfo = document.querySelector(".contactinfo")
    let contactlist = document.querySelector(".contactlist")
    let addcontact = document.querySelector(".addcontact")
    contactinfo.classList.add ("hidden")
    contactlist.classList.add("hidden")
    addcontact.classList.remove("hidden")


}
function home(){
    let contactinfo = document.querySelector(".contactinfo")
    let contactlist = document.querySelector(".contactlist")
    let addcontact = document.querySelector(".addcontact")
    contactinfo.classList.add ("hidden")
    contactlist.classList.remove("hidden")
    addcontact.classList.add("hidden")
}

function addcontact(){
    let name  = document.getElementById("name").value
    let number = document.getElementById("phone").value
    if (name == "" || number == ""){
        alert ("ehmmmm")
        return false
    }
    let info = {nam:name,num:number}
    listcontact.push(info)
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    afficher()
}
function afficher(){
    
    let contactsarea = document.querySelector(".contacts")
    contactsarea.innerHTML = ""
    for(i in listcontact){
        let condic = document.createElement("div")
        condic.className = "contact"
        let contact = `
        <span><i class="fa-solid fa-user"></i></span>
        <p onclick="info(${i})">${listcontact[i]["nam"]}</p>
        <span class="x"><i onclick="remove(${i})" class="fa-solid fa-xmark"></i></span>
        `
        condic.innerHTML += contact
        contactsarea.appendChild(condic)
    }
}
function remove(i){
    listcontact.splice(i,1)
    afficher()
    
}
function search(){
    let search = document.getElementById("search").value
    if(search == ""){
        afficher()
    }
    let contactsarea = document.querySelector(".contacts")
    contactsarea.innerHTML = ""
    for(i in listcontact){
        if(listcontact[i]["nam"].includes(search)){

            let condic = document.createElement("div")
            condic.className = "contact"
            
            let contact = `
                    <span><i class="fa-solid fa-user"></i></span>
                    <p onclick="info(${i})">${listcontact[i]["nam"]}</p>
                    <span class="x"><i onclick="remove(${i})" class="fa-solid fa-xmark"></i></span>
            `
            condic.innerHTML += contact
            contactsarea.appendChild(condic)
        }
    }
}

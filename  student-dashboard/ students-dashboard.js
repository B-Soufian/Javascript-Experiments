let users = JSON.parse(localStorage.getItem("users")) || [
    {
        identite : {name:"salma", prenom:"salmi", genre:"F"},
        profil:"Stagiaire",
        specialite:"DD",
        classe:"101",
        notes:{M101:11, M102:12, M103:12},
        average: 11.666666666666666
    },
    {
        identite : {name:"salim", prenom:"kaml", genre:"M"},
        profil:"Stagiaire",
        specialite:"ID",
        classe:"102",
        notes:{M101:12, M102:10, M103:12},
        average: 11.333333333333334
    },
    {
        identite : {name:"kamal", prenom:"hamdawi", genre:"F"},
        profil:"Stagiaire",
        specialite:"IA",
        classe:"102",
        notes:{M101:12, M102:10, M103:19},
        average: 13.666666666666666
    },
    {
        identite : {name:"khadija", prenom:"lmalki", genre:"F"},
        profil:"Stagiaire",
        specialite:"UIX",
        classe:"101",
        notes:{M101:11, M102:12, M103:12},
        average: 12
    },
    {
        identite : {name:"ali", prenom:"ahmad", genre:"M"},
        profil:"Stagiaire",
        specialite:"DD",
        classe:"101",
        notes:{M101:15, M102:15, M103:15},
        average: 15
    },
];
// localStorage.setItem("users", JSON.stringify(users));

let specialites = ["Développement Digital", "UI/UX", "Infrastructure Digital", "Intéligence Artificielle"]


function confirme(i){
    document.querySelector(".cards").classList.add("hidden")
    document.querySelector(".add").classList.add("hidden")
    document.querySelector(".remove").classList.remove("hidden")
    document.querySelector(".remove").innerHTML = `
            <div>
                <img src="images/warning.png" alt="">
                <h2>Vouler vous vraiment supprimer le stagiaire <span>${users[i]["identite"]["prenom"]} ${ users[i]["identite"]["name"]}</span></h2>
                <div class="buttons">
                    <button onclick="remove(${i})">Confirmer</button>
                    <button class="annuler" onclick="cards()">Annuler</button>
                </div>
            </div>
    `
}
function cards(){
    document.querySelector(".cards").classList.remove("hidden")
    document.querySelector(".remove").classList.add("hidden")
    document.querySelector(".add").classList.add("hidden")
}
function addstag(){
    document.querySelector(".cards").classList.add("hidden")
    document.querySelector(".remove").classList.add("hidden")
    document.querySelector(".add").classList.remove("hidden")
}
function add(){
    let nom = document.getElementById("nom").value
    let pren = document.getElementById("prenom").value
    let g = document.getElementById("genre").value
    let speci = document.getElementById("specialite").value
    let clas = document.getElementById("classe").value
    let c1 = parseFloat (document.getElementById("c1").value)
    let c2 = parseFloat (document.getElementById("c2").value)
    let c3 = parseFloat (document.getElementById("c3").value)
    if (
        nom === "" ||
        pren === "" ||
        g === "" ||
        speci === "" ||
        clas === "" ||
        c1 === "" ||
        c2 === "" ||
        c3 === ""
      ) {
        alert("Veuillez remplir tous les champs !");
        return false
    }
    if(c1>20 || c1<0 || c2>20 || c2<0  || c3>20 || c3<0 ){
        alert("The Notes Isnt logique");
        return false
    }
    
    let user = {
        identite : {name:nom,prenom:pren,genre:g},
        profil:"Stagiaire",
        specialite:speci,
        classe:clas,
        notes:{M101:c1,M102:c2,M103:c3}
    }
    users.push(user)
    for (let i = 0; i < users.length; i++) {
        let u = users[i];
        let sum = u.notes.M101 + u.notes.M102 + u.notes.M103
        u.average = sum / 3
    }
    console.log(users)
    afficher()
    cards()
    localStorage.setItem("users", JSON.stringify(users));

}
function afficher(){
    document.getElementById("nom").value = ""
    document.getElementById("prenom").value = ""
    document.getElementById("genre").value = ""
    document.getElementById("specialite").value = ""
    document.getElementById("classe").value = ""
    document.getElementById("c1").value = ""
    document.getElementById("c2").value = ""
    document.getElementById("c3").value = ""
    let cards = document.querySelector(".cards")
    cards.innerHTML = ""


    let classes = [];
    for (let i = 0; i < users.length; i++) {
        let cls = users[i].classe+"_"+users[i].specialite;
        if (classes.indexOf(cls) === -1) {
            classes.push(cls);
        }
    }

    // users.sort((a, b) => {
    //     return a.average - b.average
    // });

        for (let c = 0; c < classes.length; c++) {
            let clsName = classes[c];

            let list = [];

            for (let i = 0; i < users.length; i++) {
                let s = users[i].classe+"_"+users[i].specialite
                if (s === clsName) {
                    list.push({user : users[i],index : i});
                }
            }
            list.sort(function(a, b){
                return b.user.average - a.user.average;
            });
            j = 0

            for (let k = 0; k < list.length; k++) {
                let us = list[k]["user"];
                let index = list[k]["index"]
                j++
                let note = us.average
                note = note.toFixed(2)
                let gen = ""
                if(us["identite"]["genre"] == "M"){
                    gen = "images/boy-removebg-preview.png"
                }
                else(
                    gen = "images/girl-removebg-preview.png"
                )

                let card = `<div class="card">
                                <div class="actions">
                                    <button  onclick="confirme(${index})"><i class="fa-solid fa-trash"></i></button>
                                    <button class="edite" onclick="edite(${index})"><i class="fa-solid fa-pen-to-square"></i></button> 
                                </div>
                                <div class="image">
                                    <img src=${gen} alt="boy">
                                </div>
                                <h5>${us["identite"]["name"]} ${us["identite"]["prenom"]}</h5>
                                <p>${us["profil"]} - <span class="specialite">${us["specialite"]}</span>${us["classe"]}</p>
                                <div class="note">
                                    <span class="rank">#${j}</span>
                                    <p>Moyenne : ${note}</p>
                                </div>
                            </div>`
                cards.innerHTML += card
            }
        }
    }

function remove(i){
        users.splice(i,1)
        afficher()
        cards()
        localStorage.setItem("users", JSON.stringify(users));

}

function edite(i){
    addstag()
    let user =  users[i]
    document.getElementById("nom").value = user["identite"]["name"]
    document.getElementById("prenom").value = user["identite"]["prenom"]
    document.getElementById("genre").value = user["identite"]["genre"]
    document.getElementById("specialite").value = user["specialite"]
    document.getElementById("classe").value = user["classe"]
    document.getElementById("c1").value = user["notes"]["M101"]
    document.getElementById("c2").value = user["notes"]["M102"]
    document.getElementById("c3").value = user["notes"]["M103"]
    let ajt = document.getElementById("ajt")
    ajt.innerHTML = "modifier"
    ajt.onclick =  function() { modifier(i); }

}
function modifier(i){
    let user =  users[i]
    user["identite"]["name"] = document.getElementById("nom").value 
    user["identite"]["prenom"] = document.getElementById("prenom").value
    user["identite"]["genre"] = document.getElementById("genre").value
    user["specialite"] = document.getElementById("specialite").value
    user["classe"] = document.getElementById("classe").value
    user["notes"]["M101"] = parseFloat( document.getElementById("c1").value)
    user["notes"]["M102"] = parseFloat (document.getElementById("c2").value)
    user["notes"]["M103"] = parseFloat (document.getElementById("c3").value)
    afficher()
    let ajt = document.getElementById("ajt")
    ajt.innerHTML = "Ajouter le Stagiare"
    ajt.onclick =  function() { add(); }
    cards()
    localStorage.setItem("users", JSON.stringify(users));

}
afficher()
function search(i){
    let specialite = document.querySelectorAll(".specialite")
    for(s of specialite){
        if(i == "All"){
            if(s.parentElement.parentElement.classList.contains("hidden")){
                s.parentElement.parentElement.classList.remove("hidden")
            }
        }
        else if(s.innerHTML != i){
            s.parentElement.parentElement.classList.add("hidden")
        }
        else{
            s.parentElement.parentElement.classList.remove("hidden")
        }
    }
    
}

// Récupération de l'id du produit via l'url
let url = new URL(window.location.href)
console.log(url)
let id = url.searchParams.get("id")
console.log(id)

/* 
Récupération du JSON de l'API avec l'id en parametre
Pour ajout des informations du produit
*/
fetch("http://localhost:3000/api/products/"+id)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
    else {
        console.log("Erreur")
    }
})
.then(function(value) {
    console.log(value);
    // Ajout des Img, src et alt
    const img = document.createElement("img");
    let newImg = document.querySelector("div.item__img");
    newImg.appendChild(img);
    let src = value.imageUrl;
    img.setAttribute("src", src);
    let alt = value.altTxt;
    img.setAttribute("alt", alt);

    // Ajout du texte pour name
    let name = document.getElementById("title");
    name.innerText = value.name;

    // Ajout du texte pour price
    let price = document.getElementById("price");
    price.innerText = value.price;

    // Ajout du texte pour description
    let description = document.getElementById("description");
    description.innerText = value.description;

    // Ajout des options de couleurs
    let colors = document.getElementById("colors");
    for (color of value.colors) {
        colors.add(new Option(color,color))
    }
    })
.catch(function(err) {
    console.log("Probleme avec l'opérateur fetch : "+err.message);
});

//Gestion de l'ajout au panier
let buttonAddToCard = document.getElementById("addToCard") //Récupère l'élément bouton
buttonAddToCard.addEventListener("click",function() {   // Ecoute l'évènement click sur le bouton

    // let color = document.getElementById("colors").value; // Récupère la valeur (le choix) du select "colors"
    // console.log(color);
    // let quantity = document.getElementById("quantity").value; // Récupère la valeur de la quantité choisie
    // console.log(quantity);
  
});


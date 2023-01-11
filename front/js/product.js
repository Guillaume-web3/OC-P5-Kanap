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

// Enregistrement du panier dans le localStorage
function saveCart(cart) {
    localStorage.setItem("cart",JSON.stringify(cart)); // Données du panier transformées en chaine de caractère    
}
// Récupération du panier à partir du localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) { // Test si le panier est vide - Evite l'erreur de reading push sur un null
        return []; // Retourne un tableau vide si le panier est vide
    }
    else {
        return JSON.parse(cart); // Retourne la valeur du panier si il n'est pas vide (données transformées en objet)
    }
}
// Ajout d'un produit au panier
let buttonAddToCart = document.getElementById("addToCart") // Récupère l'élément bouton

buttonAddToCart.addEventListener("click",function () {   // Ecoute l'évènement click sur le bouton
    let color = document.getElementById("colors").value; // Récupère la valeur (le choix) du select "colors"
    let selectedQuantity = document.getElementById("quantity").value; // Récupère la valeur de la quantité choisie
    let cartProduct = {"id":id,"color":color}; // Définition d'un produit
    console.log(cartProduct);

    // Probleme de portée des variables selectedQuantity et Color qui m'oblige à définir la fonction ici (à voir avec Stéphane)

    function addToCart(cartProduct) {
        let cart = getCart();
        let foundProduct = cart.find(p => p.id == cartProduct.id && p.color == cartProduct.color) // Recherche de la présence du produit dans le panier (id & couleur)
        if (foundProduct != undefined) { // Si le produit exite dans le panier (n'est pas introuvable)
            foundProduct.quantity = Number(foundProduct.quantity)+Number(selectedQuantity); // On ajoute la nouvelle quantité demandée à la quantité déja existante dans le panier     
        }
        else {
            cartProduct.quantity = Number(selectedQuantity); // On ajoute l'article, à la quantité demandée
            cart.push(cartProduct);
        }    
        saveCart(cart);
    }
    addToCart(cartProduct);
});

  
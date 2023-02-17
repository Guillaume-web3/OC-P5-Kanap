// Récupération de l'id du produit via l'url
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// Appel de l'API
fetch("http://localhost:3000/api/products/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      console.log("Erreur");
    }
  })
  .then(function (value) {
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
      colors.add(new Option(color, color));
    }
  })
  .catch(function (err) {
    console.log("Probleme avec l'opérateur fetch : " + err.message);
  });

// Enregistrement du panier dans le localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart)); // Données du panier transformées en chaine de caractère
}
// Récupération du panier à partir du localStorage
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    // Test si le panier est vide - Evite l'erreur de reading push sur un null
    return []; // Retourne un tableau vide si le panier est vide
  } else {
    return JSON.parse(cart); // Retourne la valeur du panier si il n'est pas vide (données transformées en objet)
  }
}
// Ajout d'un produit au panier
document.getElementById("addToCart").addEventListener("click", function () {
  // Ecoute l'évènement click sur le bouton
  let color = document.getElementById("colors").value; // Récupère la valeur (le choix) du select "colors"
  let selectedQuantity = document.getElementById("quantity").value; // Récupère la valeur de la quantité choisie
  if (selectedQuantity <= 0 || selectedQuantity > 100) {
    // Si la quantité inférieur ou égale à 0, ou supérieur à 100, on affiche un message d'alerte
    alert("Quantité saisie incorrect");
    return false;
  }
  if (color == 0) {
    // Si aucune couleur n'est selectionnée, on affiche un message d'alerte
    alert("veuillez selectionner une couleur");
    return false;
  }
  let cartProduct = { id: id, color: color }; // Définition d'un produit
  let cart = getCart();
  let foundProduct = cart.find(
    (p) => p.id == cartProduct.id && p.color == cartProduct.color
  ); // Recherche de la présence du produit dans le panier (id & couleur)
  if (foundProduct != undefined) {
    // Si le produit exite dans le panier (n'est pas introuvable)
    foundProduct.quantity = // ==> let new quantity =  a vérifier si =100 ou moins sinon alerte
      Number(foundProduct.quantity) + Number(selectedQuantity); // On ajoute la nouvelle quantité demandée à la quantité déja existante dans le panier
    if (foundProduct.quantity > 100) {
      alert(
        "Trop d'exemplaire de cet article dans le panier (maximum 100), veuillez ajouter une plus petite quantité"
      );
      return false;
    }
  } else {
    cartProduct.quantity = Number(selectedQuantity); // On ajoute l'article, à la quantité demandée
    cart.push(cartProduct);
  }

  saveCart(cart);
  if (selectedQuantity == 1) {
    alert(selectedQuantity + " canapé ajouté au panier");
  }
  if (selectedQuantity > 1) {
    alert(selectedQuantity + " canapés ajoutés au panier");
  }
});

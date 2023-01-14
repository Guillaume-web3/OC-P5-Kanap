// Affichage des informations des produits du panier
getCartProductInfo();

// Affichage des quantités et prix totaux

async function displayTotals() {
  document.getElementById("totalQuantity").innerText =
    getTotalSelectedQuantity();
  document.getElementById("totalPrice").innerText =
    await getTotalSelectedPrice();
}

// Récupération du panier à partir du localStorage
function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    // Test si le panier est vide - Evite l'erreur de reading push sur un null
    return []; // Retourne un tableau vide si le panier est vide
  } else {
    return JSON.parse(cart); // Retourne la valeur du panier si il n'est pas vide
  }
}

// Appel de l'API
async function getProductInfoById(id) {
  let responseProduct = await fetch("http://localhost:3000/api/products/" + id);
  let product = await responseProduct.json();
  return product;
}

// Récupération des informations liées aux articles du panier
async function getCartProductInfo() {
  let cart = getCart();
  for (cartProduct of cart) {
    // Pour chaque produit dans le panier on va :
    let id = cartProduct.id; // Récuperer l'id
    let color = cartProduct.color; // Récuperer la couleur choisi
    let quantity = cartProduct.quantity; // Récuperer la quantité choisi
    let product = await getProductInfoById(id); // Appeler l'API
    let price = product.price; // Récuperer le prix via l'API
    let altTxt = product.altTxt; // Récuperer l'altTxt via l'API
    let imageUrl = product.imageUrl; // Récuperer l'imageUrl via l'API
    let name = product.name; // Récuperer le nom via l'API

    // Création des noeuds
    const article = document.createElement("article");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const divContent = document.createElement("div");
    const divContentDescription = document.createElement("div");
    const h2 = document.createElement("h2");
    const pColor = document.createElement("p");
    const pPrice = document.createElement("p");
    const divContentSettings = document.createElement("div");
    const divContentSettingsQuantity = document.createElement("div");
    const pQuantity = document.createElement("p");
    const inputQuantity = document.createElement("input");
    const divContentSettingsDelete = document.createElement("div");
    const pDelete = document.createElement("p");

    // Placement dans le DOM
    document.getElementById("cart__items").appendChild(article);
    article.appendChild(divImg);
    divImg.appendChild(img);
    article.appendChild(divContent);
    divContent.appendChild(divContentDescription);
    divContentDescription.appendChild(h2);
    divContentDescription.appendChild(pColor);
    divContentDescription.appendChild(pPrice);
    divContent.appendChild(divContentSettings);
    divContentSettings.appendChild(divContentSettingsQuantity);
    divContentSettingsQuantity.appendChild(pQuantity);
    divContentSettingsQuantity.appendChild(inputQuantity);
    divContentSettings.appendChild(divContentSettingsDelete);
    divContentSettingsDelete.appendChild(pDelete);

    // Ajout des attributs
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", id);
    article.setAttribute("data-colors", color);
    divImg.setAttribute("class", "cart__item__img");
    img.setAttribute("src", imageUrl);
    img.setAttribute("alt", altTxt);
    divContent.setAttribute("class", "cart__item__content");
    divContentDescription.setAttribute(
      "class",
      "cart__item__content__description"
    );
    divContentSettings.setAttribute("class", "cart__item__content__settings");
    divContentSettingsQuantity.setAttribute(
      "class",
      "cart__item__content__settings__quantity"
    );
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", quantity);
    divContentSettingsDelete.setAttribute(
      "class",
      "cart__item__content__settings__delete"
    );
    pDelete.setAttribute("class", "deleteItem");

    // Ajout des contenus
    h2.innerText = name;
    pColor.innerText = color;
    pPrice.innerText = price + " €";
    pQuantity.innerText = "Qté :";
    pDelete.innerText = "Supprimer";

    // Ecoute des évènements
    inputQuantity.addEventListener("change", changeProductQuantity);
    pDelete.addEventListener("click", deleteItem);
  }
  displayTotals();
}

// Calcul de la quantité totale
function getTotalSelectedQuantity() {
  let totalSelectedQuantity = 0;
  let cart = getCart();
  for (cartProduct of cart) {
    totalSelectedQuantity += Number(cartProduct.quantity);
  }
  return totalSelectedQuantity;
}

// Calcul du prix total
async function getTotalSelectedPrice() {
  let totalSelectedPrice = 0;
  let cart = getCart();
  for (cartProduct of cart) {
    // Pour chaque produit dans le panier on va :
    let id = cartProduct.id; // Récupérer l'id
    let product = await getProductInfoById(id);
    totalSelectedPrice += Number(cartProduct.quantity) * Number(product.price);
  }
  return totalSelectedPrice;
}

// Modification de la quantité d'un article
function changeProductQuantity(event) {
  console.log(this);
  let productData = event.target.closest(".cart__item"); // Placement sur l'item correspondant à l'event (changement de quantité)
  let id = productData.dataset.id; // Récupération de l'id via le data-id HTML
  let color = productData.dataset.colors; // Récupération de la couleur via le data-colors HTML
  let newProductQuantity = event.target.value; // Récupération de la nouvelle quantité désirée
  let cart = getCart(); // Recupération du panier
  let foundProduct = cart.find((p) => p.id == id && p.color == color); // Recherche de la présence du produit dans le panier (id & couleur)
  foundProduct.quantity = Number(newProductQuantity); // Redéfinition de la quantité
  saveCart(cart); // Sauvegarde des changements du panier
}

// Enregistrement du panier dans le localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart)); // Données du panier transformées en chaine de caractère
}

// Suppression d'un article
function deleteItem(event) {
  let productToDelete = event.target.closest(".cart__item"); // Placement sur l'item correspondant à l'event
  let id = productToDelete.dataset.id;
  let color = productToDelete.dataset.colors;
  let cart = getCart();
  let foundProduct = cart.find((p) => p.id == id && p.color == color); // Trouve l'article correspondant à l'id + couleur
  cart.splice(cart.indexOf(foundProduct), 1); // Supprime du tableau l'index renvoyé par foundProduct
  saveCart(cart);
  productToDelete.remove();
  //location.reload(); // Rafraichis la page
}

// *************** DEBUT VALIDATION DES FORMATS DE DONNEES DU FORMULAIRE *******************

// Ecoute des évènements
let firstName = document.getElementById("firstName");
firstName.addEventListener("change", firstNameTest);
let lastName = document.getElementById("lastName");
lastName.addEventListener("change", lastNameTest);
let address = document.getElementById("address");
address.addEventListener("change", addressTest);
let city = document.getElementById("city");
city.addEventListener("change", cityTest);
let email = document.getElementById("email");
email.addEventListener("change", emailTest);

// Définition des expressions régulieres ==> à finir de définir
let nameExReg = /^[a-zA-Zéèëêïîàâùüû ,.'-]{3,20}$/;
let adressExReg = /^(?:\d+[ ])?(?:[a-zA-Z -]+[ ])?[a-zA-Z]{3,}$/;
let cityExReg = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
let emailExReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validation du format du prénom
function firstNameTest() {
  let inputName = "firstName";
  if (nameExReg.test(firstName.value)) {
    // Test par expressions régulières
    correctFormat(inputName); // Vers la fonction d'affichage en cas de format valide
    return true;
  } else {
    formatError(inputName); // Vers la fonction d'affichage en cas de format non valide
    return false;
  }
}

// Validation du format du nom
function lastNameTest() {
  let inputName = "lastName";
  if (nameExReg.test(lastName.value)) {
    correctFormat(inputName);
    return true;
  } else {
    formatError(inputName);
    return false;
  }
}

// Validation du format de l'adresse
function addressTest() {
  let inputName = "address";
  if (adressExReg.test(address.value)) {
    correctFormat(inputName);
    return true;
  } else {
    formatError(inputName);
    return false;
  }
}

// Validation du format de la ville
function cityTest() {
  let inputName = "city";
  if (cityExReg.test(city.value)) {
    correctFormat(inputName);
    return true;
  } else {
    formatError(inputName);
    return false;
  }
}

// Validation du format de l'email
function emailTest() {
  let inputName = "email";
  if (emailExReg.test(email.value)) {
    correctFormat(inputName);
    return true;
  } else {
    formatError(inputName);
    return false;
  }
}

// Affichage d'une erreur de format
function formatError(inputName) {
  let idErrorMsg = inputName + "ErrorMsg"; // Création de l'id dynamique de l'input
  document.getElementById(idErrorMsg).innerText = "Le format n'est pas valide"; // Affichage du message d'erreur
}

// Affichage d'un format correct
function correctFormat(inputName) {
  let idErrorMsg = inputName + "ErrorMsg"; // Création de l'id dynamique de l'input
  document.getElementById(idErrorMsg).innerText = ""; // Suppression du message d'erreur éventuel
}

// *************** FIN VALIDATION DES FORMATS DE DONNEES DU FORMULAIRE *******************

// *************** DEBUT ENVOIE DES DONNEES DU FORMULAIRE VERS L'API *******************
document.getElementById("order").addEventListener("click", sendToApi); // Ecoute du clique sur "commander"

// Validation du formulaire
function formIsValid() {
    if (
      firstNameTest() &&
      lastNameTest() &&
      addressTest() &&
      cityTest() &&
      emailTest()
    ) {
      return true;
    } else {
      return false;
    }
  }

// Envoie de la commande
async function sendToApi(event){
    event.preventDefault();
  if (formIsValid()) {
    // Création de l'objet à envoyer
    let arrayProducts = [];
    let cart = getCart();
    for (cartProduct of cart) {
    arrayProducts.push(cartProduct.id);
    }

    let orderObj = {
    contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    },
    products: arrayProducts,
    };

    let fetchResponse = await fetch("http://localhost:3000/api/products/order", {
              method: "POST",
              headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
              },
              body: JSON.stringify(orderObj),
            });
        let orderResult = await fetchResponse.json();
        console.log(orderResult)
        goToConfirmation(orderResult)
    }
}

// *************** FIN ENVOIE DES DONNEES DU FORMULAIRE VERS L'API *******************
async function goToConfirmation(orderResult) {
    let orderId = await orderResult.orderId;
    console.log(orderId);
document.location.href="confirmation.html?orderId="+orderId;
}

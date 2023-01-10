// Affichage des informations des produits du panier
getCartProductInfo()

// Affichage des quantités et prix totaux
displayTotals()

async function displayTotals() {
    document.getElementById("totalQuantity").innerText = getTotalSelectedQuantity();
    console.log(getTotalSelectedQuantity());
    document.getElementById("totalPrice").innerText = await getTotalSelectedPrice();
    console.log(await getTotalSelectedPrice());
}


// Récupération du panier à partir du localStorage
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) { // Test si le panier est vide - Evite l'erreur de reading push sur un null
        return []; // Retourne un tableau vide si le panier est vide
    }
    else {
        return JSON.parse(cart); // Retourne la valeur du panier si il n'est pas vide
    }
}

// Appel de l'API
async function getProductInfoById(id) {
    let responseProduct = await fetch ("http://localhost:3000/api/products/"+id);
    let product = await responseProduct.json();
    return await product;
}

// Récupération des informations liées aux articles du panier
async function getCartProductInfo () {
    let cart = getCart();
    for(cartProduct of cart) { // Pour chaque produit dans le panier on va :
        let id = cartProduct.id; // Récuperer l'id
        let color = cartProduct.color; // Récuperer la couleur choisi
        let quantity = cartProduct.quantity; // Récuperer la quantité choisi
        let product = await getProductInfoById(id) // Appeler l'API
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
        article.setAttribute("class","cart__item");
        article.setAttribute("data-id",id);
        article.setAttribute("data-colors",color);
        divImg.setAttribute("class","cart__item__img");
        img.setAttribute("src",imageUrl);
        img.setAttribute("alt",altTxt);
        divContent.setAttribute("class","cart__item__content");
        divContentDescription.setAttribute("class","cart__item__content__description");
        divContentSettings.setAttribute("class","cart__item__content__settings");
        divContentSettingsQuantity.setAttribute("class","cart__item__content__settings__quantity");
        inputQuantity.setAttribute("type","number");
        inputQuantity.setAttribute("class","itemQuantity");
        inputQuantity.setAttribute("name","itemQuantity");
        inputQuantity.setAttribute("min",1);
        inputQuantity.setAttribute("max",100);
        inputQuantity.setAttribute("value",quantity);
        divContentSettingsDelete.setAttribute("class","cart__item__content__settings__delete");
        pDelete.setAttribute("class","deleteItem");

        // Ajout des contenus
        h2.innerText = name;
        pColor.innerText = color;
        pPrice.innerText = price+" €";
        pQuantity.innerText = "Qté :";
        pDelete.innerText = "Supprimer";

        inputQuantity.addEventListener("change",changeProductQuantity)
    }
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
    console.log(cart);
    for (cartProduct of cart) { // Pour chaque produit dans le panier on va :
        let id = cartProduct.id; // Récupérer l'id
        let product = await getProductInfoById(id)
        console.log(product);
        totalSelectedPrice += Number(cartProduct.quantity) * Number(product.price);
        console.log(cartProduct.quantity);
        console.log(product.price);
    }
    return totalSelectedPrice;
}

// Travaux en cours :
// 
//

// Modification de la quantité d'un article

function changeProductQuantity(event){
    console.log(event)
    // let itemQuantity = document.querySelector(".cart__items");
    // console.log(itemQuantity);

    //     let articleData = itemQuantity.closest("cart__item");
    //     let id = articleData.data-id;
    //     console.log(id);
}


// Suppression d'un article
function deleteArticle () {
}
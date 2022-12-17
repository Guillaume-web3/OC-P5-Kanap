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

function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find()
    cart.push(product);
    saveCart(cart);
}
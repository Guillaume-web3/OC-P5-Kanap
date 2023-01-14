// Récupération de l'id du produit via l'url
let url = new URL(window.location.href)
let id = url.searchParams.get("orderId")

// Affichage du numéro de commande
document.getElementById("orderId").innerText = id; 
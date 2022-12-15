// Récupération de l'id du produit via l'url
let url = new URL(window.location.href)
console.log(url)
let id = url.searchParams.get("id")
console.log(id)

// Récupération du JSON de l'API avec l'id en parametre
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
    // Ajout Img + src + alt
    const img = document.createElement("img");
    let newImg = document.querySelector("div.item__img");
    newImg.appendChild(img);
    let src = value.imageUrl;
    img.setAttribute("src", src);
    let alt = value.altTxt;
    img.setAttribute("alt", alt);

    // Ajout texte name
    let name = document.getElementById("title");
    name.innerText = value.name;

    // Ajout texte prix
    let price = document.getElementById("price");
    price.innerText = value.price;

    // Ajout text description
    let description = document.getElementById("description");
    description.innerText = value.description;

    // Ajout options couleurs
    for (let i = 0; i < value.colors.length; i++) {
        colors.options[colors.length] = new Option(value.colors[i], value.colors[i]);   
    }
    })
.catch(function(err) {
    console.log("Probleme avec l'opérateur fetch : "+err.message);
});
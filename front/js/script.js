/* Récupération du json de l'API */

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
    else {
        console.log("Erreur")
    }
})
.then(function(value) {
    for(product of value) {
        console.log(product)

        // Création des noeuds
        const a = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");

        // Placement dans le DOM
        let newA = document.getElementById("items"); // Récupération de l'emplacement #items
        newA.appendChild(a); // Placement du nouveau noeud à l'emplacement récupéré
        a.appendChild(article); // Placement du nouveau noeud fils de <a>
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);

        // Ajout des attributs href aux <a>
        let href = "./product.html?id="+product._id; // Définition de l'attribut
        a.setAttribute("href", href); // Ajout de l'attribut
       
        // Ajout des attributs src et alt aux <img>
        let src = product.imageUrl;
        let alt = product.altTxt;
        img.setAttribute("src", src);
        img.setAttribute("alt", alt);
        
        // Ajout des class aux <h3>
        h3.classList.add("productName");

        // Ajout des noms des produits
        h3.innerText = product.name;
        
        // Ajout des class aux <p>
        p.classList.add("productDescription");

        // Ajout des descriptions des produits
        p.innerText = product.description
    }
})
.catch(function(err) {
    console.log("Probleme avec l'opérateur fetch" + err.message);
});


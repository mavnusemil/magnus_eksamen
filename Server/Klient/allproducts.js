// Her kan brugeren se alle varene - krav 11
let getAllProducts = document.getElementById("getAllProducts")
    let allProducts = document.getElementById("allProducts")

    allProducts.addEventListener("click", (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/products', {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            allProducts.innerHTML = ""
            data.forEach(element => {
                allProducts.innerHTML += "<b><p> Navn: </b>" +element.produktnavn + "<p/>" + "<b><p> ID:</b> " +element.id + "<p/>" + "<b><p> Pris:</b> " +element.pris + " DKK" + "<p/>" + "<p> <b>Kategori: </b>" +element.kategori + "<p/><hr>" 
            });
        })
    })
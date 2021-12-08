document.addEventListener("DOMContentLoaded", function() {
    //Her oprettes annoncerne - krav 6
    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) => {
        e.preventDefault();

        let productname = document.getElementById('productnavn').value;
        let price = document.getElementById('price').value;
        let category = document.getElementById('category').value;
    
        var unique = 'id' + Date.now().toString(36)
        let newProduct = {
            id: unique,
            produktnavn: productname,
            pris: price,
            kategori: category
        }


        fetch('http://localhost:3000/products', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify(newProduct)
    
        }).then(response => response.json())
        .then(data => {
            alert('Succes!')
        })
    
        .catch((error) => {
            alert(error)
            console.log(error);
        })
    })
    
// Her opdateres annoncerne - krav 8
    let submitupdate = document.getElementById('submitupdate')

    submitupdate.addEventListener("click", (e) => {
        e.preventDefault();

        let productname = document.getElementById('updateproductnavn').value;
        let price = document.getElementById('updateprice').value;
        let unique = document.getElementById('updateid').value;

        let updatedProduct = {
            id: unique,
            produktnavn: productname,
            pris: price      
        }
    

        fetch('http://localhost:3000/products', {
         method: "PUT",
            headers: {
                'Content-Type': 'application/json'
        },

        body: JSON.stringify(updatedProduct)

     }).then(response => response.json())
        .then(data => {
        console.log(data);
        alert('Succes!')
        })
        .catch((error) => {
        alert(error)
    })
    
})
});
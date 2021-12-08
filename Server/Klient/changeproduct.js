document.addEventListener("DOMContentLoaded", function() {
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
        alert('Succes! Varen blev opdateret')
        })
        .catch((error) => {
        alert(error)
        console.log(error);
    })
    
})

// Her slettes annoncerne - krav 7

let deleteProduct = document.getElementById("deletebutton")

deleteProduct.addEventListener("click", (e) => {
    e.preventDefault();

    
    let unique = document.getElementById('deleteproductbyid').value;
    
    
   fetch('http://localhost:3000/products/' + unique, {
       method: "DELETE",
       headers: {
           'Content-Type': 'application/json'
       },
   }).then(response => response.json())
   .then(data => {
       console.log(data)
       alert("Varen blev slettet")
   })
  .catch((err) => {
      console.log("Der skete desværre en fejl")
  })

})






});
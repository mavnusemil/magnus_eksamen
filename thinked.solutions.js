// Løsningsforslag til krav 1.
document.addEventListener("DOMContentLoaded", function() {
    
    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) => {
        e.preventDefault();

        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
    
        var unique = 'id' + Date.now().toString(36)
        let newProduct = {
            userid: unique,
            username: username,
            email: email,
            password: password
        }


        fetch('http://localhost:3000/users', {
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

// Herefter skal al min data postes til min database, som gøres vha. POST
app.post('/users', (req, res) => {

    let dataArray = JSON.parse(fs.readFileSync('userdatabase/database.json'))

    dataArray.push(req.body);

    fs.writeFile('userdatabase/database.json', JSON.stringify(dataArray, null, 4), err => {
       if (err) res.send(err)
       res.send({msg: "Succes!"})
    })
})
})
// Det var mit løsningsforslag til krav 1




// Løsningsforslag til krav 2
let deleteProduct = document.getElementById("deletebuttonusers")

deleteProduct.addEventListener("click", (e) => {
    e.preventDefault();

    
    let unique = document.getElementById('deleteuser').value;
    
    
   fetch('http://localhost:3000/users/' + unique, {
       method: "DELETE",
       headers: {
           'Content-Type': 'application/json'
       },
   }).then(response => response.json())
   .then(data => {
       console.log(data)
       alert("Brugeren blev slettet")
   })
  .catch((err) => {
      console.log("Der skete desværre en fejl")
  })

})


// Herefter skal al min data slettes fra min database, som gøres vha. DELETE

app.delete('/users/:id', (req, res) => {

    let dataArray = JSON.parse(fs.readFileSync('userdatabase/database.json'))

    for (let i = 0; i < dataArray.length; i++) {

        if(dataArray[i].id == req.params.id) {
            dataArray.splice(i, 1)

            fs.writeFile('userdatabase/database.json', JSON.stringify(dataArray, null, 4), err => {
                if(err) res.send(err)
                    res.status(200).json({
                msg: "Din bruger er slettet"
                })
            })
        }
    }

})
// Det var mit løsningsforslag til krav 2



// Løsningsforslag til krav 3

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

// Herefter skal al brugerens data indsættes til min database, som gøres vha. PUT, som overrider det eksisterende data ud fra ID
app.put('/users', (req, res) => {
    let dataArray = JSON.parse(fs.readFileSync("userdatabase/database.json"))
    let { username, password } = req.body;

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id == req.body.id){
            dataArray[i].username = username;
            dataArray[i].password = password;
        }
    }

    fs.writeFile('userdatabase/database.json', JSON.stringify(dataArray, null, 4), err => {
        if(err) res.send(err)
        res.status(200).json({msg: "Opdatering gennemført"})
    });
});


//// Det var mit løsningsforslag til krav 3
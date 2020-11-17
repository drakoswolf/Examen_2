
if (localStorage.getItem("productos") === null) {
    localStorage.setItem("productos", JSON.stringify([]));
}

let add = document.querySelectorAll(".add");
let proQuantity = document.createElement("span");

for (let button of add) {
    button.addEventListener("click", function(e) {
        e.preventDefault();

        if (JSON.parse(localStorage.getItem("productos")) === null) {
            localStorage.setItem("productos", JSON.stringify([]));
        }

        let productos = JSON.parse(localStorage.getItem("productos"));
        let id = this.parentNode.parentNode.getAttribute("id");
        let img = this.parentNode.previousElementSibling.getAttribute("src");
        let name = this.parentElement.firstElementChild.innerText;
        let price = Number(this.previousElementSibling.lastElementChild.innerText);
        let limit = Number(this.previousElementSibling.previousElementSibling.lastElementChild.innerText);

        let product = productos.find(pro => pro.id == id);
        
        if (product === undefined) {
            productos.push({
                id: id,
                img: img,
                name: name,
                price: price,
                quantity: 1,
                limit: limit,
            });
            localStorage.setItem("productos", JSON.stringify(productos));
        productQuantity();
        } else {
            if (product.quantity < product.limit){
                product.quantity++;
                localStorage.setItem("productos", JSON.stringify(productos));
                productQuantity();
                this.previousElementSibling.previousElementSibling.lastElementChild.innerText = product.limit+1 - product.quantity;
            }
            else{
                this.previousElementSibling.previousElementSibling.lastElementChild.innerText = " Agotado";
            }
        }
    });
}
productQuantity();

setInterval(productQuantity, 1000);


function productQuantity() {
    if (localStorage.getItem("productos") === null) {
        document.getElementById("productQuantity").innerText = 0;
    } else {
        let productos = JSON.parse(localStorage.getItem("productos"));
        document.getElementById("productQuantity").innerText = productos.length;
    }
}
if (productos.length === 0)
        { }
        else{
            let productos = JSON.parse(localStorage.getItem("productos"));
            productos.forEach(product => {
                for (var i=1;i<12;i++){
                    if (product.id == "product"+String(i)){
                        document.getElementById("Existencias"+String(i)).innerText = product.limit - product.quantity;
                        if(product.limit - product.quantity == 0){
                            document.getElementById("Existencias"+String(i)).innerText = " Agotado";
                        }
                    }
                }
            });
        }


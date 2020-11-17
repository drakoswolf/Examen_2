
if (localStorage.getItem("productos") === null) {
    localStorage.setItem("productos", JSON.stringify([]));
}

let productos = JSON.parse(localStorage.getItem("productos"));

let products = document.querySelector("#products-list");
let table = document.querySelector("table");

let order = 1;
let total = 0;

if (productos.length === 0) { 
    emptyCart();
} else {
    productos.forEach(product => {
        table.classList.remove("d-none");

        let row = document.createElement("tr");
        let orderCell = document.createElement("th");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");
        let removeCell = document.createElement("td");

        let img = document.createElement("img");
        let proQuantity = document.createElement("span");
        let removeButton = document.createElement("button");

        img.setAttribute("src", product.img);
        proQuantity.innerText = product.quantity;
        let ImgStyle = "width:110px;";
        img.setAttribute("style",ImgStyle);
        let quantityStyle = "padding: 0 10px; font-size: 18px; font-weight: bold";
        proQuantity.setAttribute("style", quantityStyle);
        removeButton.setAttribute("href", "#");
        removeButton.textContent = "X";
        let removeStyle = "font-size: 20px; text-decoration: none; color: #000";
        removeButton.setAttribute("style", removeStyle);
       
        [orderCell, imgCell, nameCell, priceCell, quantityCell, removeCell].forEach(cell => {
            cell.classList.add("align-middle");
        });
        orderCell.setAttribute("scope", "row");
        orderCell.innerText = order++;
        nameCell.innerText = product.name;
        priceCell.innerText = ` $${(product.price * product.quantity).toFixed(2)}`;

        let decrement = document.createElement("i");
        let increment = document.createElement("i");
        decrement.className = "fas fa-minus";
        increment.className = "fas fa-plus";

        decrement.onclick = function() {
            if (this.nextElementSibling.innerText == 1) {
                productos.splice(productos.indexOf(productos.find(p => p.id === product.id)), 1);
                localStorage.setItem("productos", JSON.stringify(productos));
                this.parentElement.parentElement.remove();
                if (productos.length === 0) {
                    table.style.display = "none";
                    emptyCart();
                }
                total = 0;
                productos.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
            } else {
                let index = productos.indexOf(productos.find(p => p.id === product.id));
                productos[index].quantity--;
                proQuantity.innerText = product.quantity;
                priceCell.innerText = ` $${(product.price * product.quantity).toFixed(2)}`;
                total = 0;
                productos.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
                localStorage.setItem("productos", JSON.stringify(productos));
            }
        }

        increment.onclick = () => {
            let index = productos.indexOf(productos.find(p => p.id === product.id));

            if (product.quantity < product.limit){
                productos[index].quantity++;
                proQuantity.innerText = product.quantity;
                priceCell.innerText = ` $${(product.price * product.quantity).toFixed(2)}`;
                total = 0;
                productos.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
                localStorage.setItem("productos", JSON.stringify(productos));
            }
            else{
                alert("Limite de ordenes por producto alcanzado");
            }
        }

        removeButton.onclick = function(e) {
            e.preventDefault();
            productos.splice(productos.indexOf(productos.find(p => p.id === product.id)), 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            this.parentElement.parentElement.remove();
            if (productos.length === 0) {
                table.style.display = "none";
                emptyCart();
            }
            productQuantity();
            total = 0;
            productos.forEach(p => total += p.quantity * p.price);
            totalPrice.innerText = `$${total.toFixed(2)}`;
        }
    
        imgCell.appendChild(img);
        quantityCell.append(decrement, proQuantity, increment);
        removeCell.appendChild(removeButton);
        row.append(orderCell, imgCell, nameCell, priceCell, quantityCell, removeCell);
        table.lastElementChild.appendChild(row);

        if (screen.width < 578) {
            imgCell.style.display = "none";

        }
    });

    let totalPriceRow = document.createElement("tr");
    let totalPriceCell = document.createElement("td");
    totalPriceCell.setAttribute("colspan", "6");
    totalPriceCell.classList.add("text-right");
    productos.forEach(p => total += p.quantity * p.price);
    totalPriceCell.innerHTML = `<span style="color: red; font-size: 20px; margin-right: 20px;">Costo total:</span>`;
    let totalPrice = document.createElement("span");
    totalPrice.style.fontWeight = "bold";
    totalPrice.style.fontSize = "20px";
    totalPrice.innerText = `$${total.toFixed(2)}`;
    totalPriceCell.appendChild(totalPrice);
    totalPriceRow.appendChild(totalPriceCell);
    table.appendChild(totalPriceRow);
    
    let buyRow = document.createElement("tr");
    let buyCell = document.createElement("td");
    buyCell.setAttribute("colspan", "6");
    buyCell.classList.add("text-right");
    let buyButton = document.createElement("button");
    buyButton.style.fontWeight = "bold";
    buyButton.style.fontSize = "20px";
    buyButton.innerText = `Realizar compra`;
    buyCell.appendChild(buyButton);
    buyRow.appendChild(buyCell);
    table.appendChild(buyRow);

    buyButton.onclick = function(e) {
        alert("Compra de " + `$${total.toFixed(2)}`+" realizada con exito");
        productos=[];
        total = 0;   
        localStorage.setItem("productos", JSON.stringify([]));
        emptyCart();
        productQuantity();
    }

    if (screen.width < 768) {
        products.classList.remove("container");
        totalPriceCell.classList.remove("text-right");
        totalPriceCell.classList.add("text-left");
    }
}

function productQuantity() {
    if (localStorage.getItem("productos") === null) {
        document.getElementById("productQuantity").innerText = 0;
    } else {
        let productos = JSON.parse(localStorage.getItem("productos"));
        document.getElementById("productQuantity").innerText = productos.length;
    }
}

productQuantity();

setInterval(productQuantity, 1000);

function emptyCart() {
    table.style.display = "none";
    let message = document.createElement("h1");
    message.style.padding = "50px 0";
    if (screen.width < 900) {
        message.style.fontSize = "20px";
    }
    message.style.border = "2px dashed rgb(167, 161, 161)";
    message.style.borderRadius = "10px";
    message.innerHTML = `<p style="text-align: center; color:gray;">Todo vacio por aquí<br /><br /> <a style="color:red;" href="productos.html"> Haz click aquí</a> para agregar productos</p>`;
    products.appendChild(message);
}

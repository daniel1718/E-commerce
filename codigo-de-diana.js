

const productosStock = [
    {
        id: 1, 
        nombre: "Hoodies", 
        precio: 14.00, 
        img: 'https://i.ibb.co/S7dPp5D/featured1.png',
        categoria: 'hoodies',
        stock: 10,
        quantity: 1,
    },
                        
    {
        id: 2, 
        nombre: "Shirts", 
        precio: 24.00, 
        img: 'https://i.ibb.co/QNHZd4K/featured2.png',
        categoria: 'shirts',
        stock: 15,
        quantity: 1,
    },
                         
    {
        id: 3, 
        nombre: "Sweatshirts", 
        precio: 24.00, 
        img: 'https://i.ibb.co/R7CZn5n/featured3.png',
        categoria: 'sweatshirts',
        stock: 20,
        quantity: 1,
    },
                   
];

function incorporarProductos(productosFet){
    let card = ``;
    productosFet.map(products => {
        card += `<div class="cards" id ='${products.id}' >
            <div class="card__img">
                <img src=${products.img} class="img-products" alt="${products.nombre}">
            </div>
            <div class="card__info">
                <h2 class='product--price'>$${products.precio}.00</h2> 
                <p class='product--stock'>| Stock: ${products.stock}</p>
                <h3 class='product--name'>${products.nombre}</h3>
                <button class="btn-add-cart" data-id="${products.id}">+</button>
            </div>
        </div>`
    });
    cardProductos.innerHTML = card;
    cartFunctionality()
}




function cartFunctionality() {
    const cartProducts =  document.getElementById('cart-products')
    const cart = []
    const counter = document.getElementById('cart-counter')
    counter.textContent = 0
    let productsHTML = ``
    const btns = document.querySelectorAll( ".btn-add-cart" )
    btns.forEach( button => {
        button.addEventListener('click', e =>{
            const id = parseInt(e.target.parentElement.parentElement.id)
            const selectedProduct = productosStore.find( producto => producto.id === id)
            if( cart.indexOf(selectedProduct)!== -1 ){
                if(selectedProduct.unidades>=1 && selectedProduct.unidades!==selectedProduct.stock){
                    selectedProduct.subtotal += selectedProduct.precio
                    selectedProduct.unidades++
                    counter.textContent = parseInt(counter.textContent)+1
                }else{
                    window.alert("No contamos con suficiente stock");
                }
            }else{
                cart.push( selectedProduct )
                selectedProduct.unidades = 1
                selectedProduct.subtotal = selectedProduct.precio
                counter.textContent = parseInt(counter.textContent)+1
            }

            cart.forEach(element =>{
                const elementID = document.getElementById(element.id)
                if (element.unidades!==1){
                    document.getElementById(`subtotal${element.id}`).textContent=`Subtotal: $${element.subtotal}.00`
                    document.getElementById(`units${element.id}`).textContent=`${element.unidades} units`
                    }
                    else if (cartProducts.lastElementChild!==elementID && element.unidades===1){
                        console.log(elementID.id)
                        productsHTML +=`<div class="products--item" id="${element.id}">
                        <div class="item--container-img">
                        <img src=${element.img} class="item--img" alt="">
                        </div>
                        <div class="item--info">
                        <h4>${element.nombre}</h4>
                        <small>Stock: ${element.stock}|</small>
                        <p>$${element.precio}</p>
                        <p id="subtotal${element.id}">Subtotal: $${element.subtotal}.00</p>
                        <div class="info--button">
                        <button id='button-less'>-</button>
                        <p id="units${element.id}">${element.unidades} units</p>
                        <button id='button-plus'>+</button>
                        </div>
                        </div>
                        <i class='bx bx-trash-alt'></i>          
                        </div>`
                        cartProducts.innerHTML = productsHTML
                    }
                })

            
        })
    })
}
     
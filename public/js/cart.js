function addToCart(id, name, description, price, image, quantity = 1) {
    const cart = JSON.parse(sessionStorage.getItem('cart-cancat'));

    const product = cart.find(item => item.id == id);

    if (product) {
        const cartUpdated = cart.map(item => {
            if (item.id == id) {
                item.quantity = item.quantity + 1
            }
            return item
        });
        sessionStorage.setItem('cart-cancat', JSON.stringify(cartUpdated))

    } else {
        const newProduct = {
            id,
            name,
            description,
            price,
            image,
            quantity
        }
        cart.push(newProduct)
        sessionStorage.setItem('cart-cancat', JSON.stringify(cart))
    }

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500
    });

    showCartTotalItems(cart.length);
}

function buyNow(id, name, description, price, image, quantity = 1) {
    addToCart(id, name, description, price, image, quantity);

    // Redirigir a la vista del carrito
    window.location.href = "/carrito";
}

function noUser() {
    Swal.fire({
        title: "Debes iniciar sesión como usuario para ver el carrito",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Ingresar",
        denyButtonText: "Registrarse"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/usuarios/ingreso";
        } else if (result.isDenied) {
          window.location.href = "/usuarios/registro";
        }
      });
}

console.log('cart connected!!');
if (!sessionStorage.getItem('cart-cancat')) {
    sessionStorage.setItem('cart-cancat', JSON.stringify([]))
}

var cart = JSON.parse(sessionStorage.getItem('cart-cancat'));
const cartTotalItems = document.getElementById('cart-total-items');

const calcCost = (products) => {
    document.getElementById('cart-subtotal').innerHTML = '$' + products.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)
    document.getElementById('cart-total').innerHTML = 'Pagar $' + ((products.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)) + 2300)

}

const showProductInCart = (products = []) => {

    const cartBox = document.getElementById('cart-box')
    cartBox.innerHTML = null;

    if (products.length) {
        products.forEach(item => {
            cartBox.innerHTML += `
            <article class="producto__agregado">
                <div style="width: 50px; margin: 8px;" >
                    <img style="max-height: 50px;" src="/images/${item.image}" alt="">
                </div>
                
                <div class="Productos-en-el-carrito__div__titulo__descripcion__precio">
                <div style="width: 170px;">
                <h5 class=".Productos-en-el-carrito__div__titulo">${item.name}</h5>
                </div>
                <p class="Productos-en-el-carrito__div__descripcion">${item.description}</p>
                <h4 class="Productos-en-el-carrito__div__precio">${item.price}</h4>
                </div>
                <div class="Productos-en-el-carrito__div__contador__eliminar">
                <div class="d-flex gap-2">
                    <button class="btn btn-sm" onclick="decrementQuantity('${item.id}')">-</button>
                    <span id="item-counter${item.id}">${item.quantity}</span>
                    <button class="btn btn-sm" onclick="incrementQuantity('${item.id}')">+</button>
                </div>
                <i class="fa-solid fa-trash-can" style="cursor: pointer;" onclick="removeProduct('${item.id}')"></i>
                </div>
            </article>
            `
        })
        calcCost(products)
    } else {
        cartBox.innerHTML += `
        <article class="producto__agregado" >
            <h4 style="line-height: 44px">El carrito está vacío</h4>
        </article>
        `
        document.getElementById('cart-subtotal').innerHTML = '-'
        document.getElementById('cart-total').innerHTML = 'Pagar'
    }

}

const showCartTotalItems = (count) => {
    if (count) {
        cartTotalItems.parentElement.style.display = "flex"
        cartTotalItems.innerHTML = count
    } else {
        cartTotalItems.parentElement.style.display = "none"

    }
}

window.onload = () => {
    showCartTotalItems(cart.length)
    if (document.getElementById('cart-box')) {
        showProductInCart(cart)
    }
}

const removeProduct = (id) => {
    const cart = JSON.parse(sessionStorage.getItem('cart-cancat'))
    const cartUpdated = cart.filter(item => item.id != id);
    sessionStorage.setItem('cart-cancat', JSON.stringify(cartUpdated))

    showCartTotalItems(JSON.parse(sessionStorage.getItem('cart-cancat')).length)
    showProductInCart(cartUpdated)

}

const incrementQuantity = (id) => {
    const counter = document.getElementById('item-counter' + id)
    let currentValue = parseInt(counter.textContent);
    counter.textContent = currentValue + 1;
    modifyQuantity(id, currentValue + 1)
};

const decrementQuantity = (id) => {
    const counter = document.getElementById('item-counter' + id)
    let currentValue = parseInt(counter.textContent);
    if (currentValue > 1) {
        counter.textContent = currentValue - 1;
        modifyQuantity(id, currentValue - 1)
    }
};

const modifyQuantity = (id, quantity) => {
    const cart = JSON.parse(sessionStorage.getItem('cart-cancat'))
    const cartUpdated = cart.map(item => {
        if (item.id == id) {
            item.quantity = quantity
        }
        return item
    });
    sessionStorage.setItem('cart-cancat', JSON.stringify(cartUpdated))
    calcCost(cartUpdated)
}


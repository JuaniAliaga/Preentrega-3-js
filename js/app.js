const stock = [
    {
        id:"1",
        nombre:"Teclado Genesis Thor 303",
        marca:"Genesis",
        precio:19990,
        imagen:"./img/teclado-genesiss.png",
    },
    {
        id:"2",
        nombre:"Teclado Redragon k552",
        marca:"Redragon",
        precio:20990,
        imagen:"./img/redragon-kumara-k552.png",
    },
    {
        id:"3",
        nombre:"Teclado Redragon k568",
        marca:"Redragon",
        precio:21490,
        imagen:"./img/redragon-k566.png",
    },
    {
        id:"4",
        nombre:"Teclado Redragon k552",
        marca:"Redragon",
        precio:22990,
        imagen:"./img/redragon-k552.png",
    },
    {
        id:"5",
        nombre:"Teclado Redragon k616",
        marca:"Redragon",
        precio:24990,
        imagen:"./img/redragon-k616.png",
    },
    {
        id:"6",
        nombre:"Teclado Hyperx Alloy Fps Core",
        marca:"Hyperx",
        precio:25399,
        imagen:"./img/hyperx-alloy-fps-coree.png",
    },
    {
        id:"7",
        nombre:"Teclado Redragon k530",
        marca:"Redragon",
        precio:27990,
        imagen:"./img/redragon-k531.png",
    },
    {
        id:"8",
        nombre:"Teclado Inalambrido Redragon K599",
        marca:"Redragon",
        precio:27990,
        imagen:"./img/redragon-k577.png",
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("section-cards")

///Dibujo las tarjetas de los productos
function dibujarProductos(productos) {
    
    contenedor.innerHTML = "";

    const div = document.createElement("div")
    div.classList.add("cards")

    contenedor.appendChild(div);

    productos.forEach( (elemento) => {

        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
        <img src="${elemento.imagen}" alt="${elemento.nombre}" class="img-card">
        <div class="info">
        <h2 class="nombre">${elemento.nombre}</h2>
        <p class="precio">$${elemento.precio}</p>
        <button id="${elemento.id}" class="agregar">Agregar</button>
    </div>
        `
        div.appendChild(card)

        const agregar = document.getElementById(elemento.id)
        
        agregar.addEventListener( "click" , () =>{
            agregarCarrito(elemento.id)
        })

    })
}
///Se agregan los productos al local storage
function agregarCarrito(item) {
    if (!carrito.some((it) => it.id === item)) {
        let itemNuevo = stock.find((elemento) => elemento.id === item)
        carrito.push({...itemNuevo, cantidad:1})
    }else{
        let itemNuevo = carrito.find((elemento) => elemento.id === item)
        itemNuevo.cantidad++
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

///Se dibujan los productos del carrito en la pagina
function mostrarCarrito() {
    const elementosCarrito = document.getElementById("elementos-carrito")
    elementosCarrito.innerHTML = ""

    const totalCarrito = document.getElementById("total-carrito");
    calculoTotal(totalCarrito)


    if (carrito.length > 0) {
        carrito.forEach(product => {
            const tarjetasCarrito = document.createElement("div") 
            tarjetasCarrito.classList.add("tarjetas-carrito")
            tarjetasCarrito.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="img-card">
            <div class="info">
            <h2 class="nombre-carrito">${product.nombre}</h2>
            <p class="precio-carrito">$${product.precio}</p>
            <p class="cantidad">Cantidad: ${product.cantidad}</p>
            </div>
            <div class="contador">
            <button id="sumar-${product.id}" class="boton-sumar">+</button>
            <button id="bajar-${product.id}" class="boton-restar">-</button>
            </div>
            <button id="eliminar-${product.id}" class="boton-eliminar"><ion-icon name="trash-outline"></ion-icon></button>
            `;
            elementosCarrito.appendChild(tarjetasCarrito)

            const incrementar = document.getElementById(`sumar-${product.id}`)
            incrementar.addEventListener("click" , () =>{
                incrementarProductos(product.id)
            })

            const decrementar = document.getElementById(`bajar-${product.id}`)
            decrementar.addEventListener("click" , () =>{
                decrementarProductos(product.id)
            })

            const eliminar = document.getElementById(`eliminar-${product.id}`)
            eliminar.addEventListener("click", () =>{
                eliminarProductos(product.id)
            })
            
        })

    }else{
        elementosCarrito.innerHTML = `<h2 class="carrito-vacio">No hay items en el carrito</h2>`
    }
}

///Funcionalidad para boton de incrementar
function incrementarProductos(id) {
    const producto = carrito.find((producto) => producto.id === id);
    producto.cantidad++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

///Funcionalidad para boton decrementar
function decrementarProductos(id) {
    const producto = carrito.find((elemento) => elemento.id === id);
    if (producto.cantidad === 1) {
        eliminarProductos(producto.id)
    }else{
    producto.cantidad--;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
}

///Funcionalidd para boton de eliminar
function eliminarProductos(id) {
    carrito = carrito.filter((producto) => producto.id !== id)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

///Funcionalidad para calcular total
function calculoTotal(producto) {
    const total = carrito.reduce((acc, elemento) => acc + elemento.precio * elemento.cantidad, 0);
    const totalFormateado = total.toLocaleString();
    total === 0 ? producto.textContent = ` ` : producto.textContent = `El total de su compra es: $${totalFormateado}`;
}

dibujarProductos(stock);
mostrarCarrito();

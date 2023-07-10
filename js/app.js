const stock = [
    {
        id:"1",
        nombre:"Teclado Genesis Thor 303",
        marca:"Genesis",
        precio:19990,
        imagen:"../img/teclado-genesis.png",
    },
    {
        id:"2",
        nombre:"Teclado Redragon k552",
        marca:"Redragon",
        precio:20990,
        imagen:"../img/redragon-kumara-k552.png",
    },
    {
        id:"3",
        nombre:"Teclado Redragon k568",
        marca:"Redragon",
        precio:21490,
        imagen:"../img/redragon-k566.png",
    },
    {
        id:"4",
        nombre:"Teclado Redragon k552",
        marca:"Redragon",
        precio:22990,
        imagen:"../img/redragon-k552.png",
    },
    {
        id:"5",
        nombre:"Teclado Redragon k616",
        marca:"Redragon",
        precio:24990,
        imagen:"../img/redragon-k616.png",
    },
    {
        id:"6",
        nombre:"Teclado Hyperx Alloy Fps Core",
        marca:"Hyperx",
        precio:25399,
        imagen:"../img/hyperx-alloy-fps-core.jpg",
    },
    {
        id:"7",
        nombre:"Teclado Redragon k530",
        marca:"Redragon",
        precio:27990,
        imagen:"../img/redragon-k531.png",
    },
    {
        id:"8",
        nombre:"Teclado Inalambrido Redragon K599",
        marca:"Redragon",
        precio:27990,
        imagen:"../img/redragon-k577.png",
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("section-cards")

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

function agregarCarrito(item) {
    if (!carrito.some((it) => it.id === item.id)) {
        let itemNuevo = stock.find((elemento) => elemento.id === item.id)
        carrito.push({...itemNuevo, cantidad:1})
    }else{
        let itemNuevo = carrito.find((elemento) => elemento.id === item.id)
        itemNuevo.cantidad++
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


dibujarProductos(stock)
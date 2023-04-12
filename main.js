
const carrito = document.querySelector(".icon-cart")
document.addEventListener("DOMContentLoaded", ()=>{
    allProducts = JSON.parse(localStorage.getItem('carrito')) || [];
    showHTML()
})
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(allProducts))
}


const btnCart= document.querySelector(".container-cart-icon")
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener("click", ()=> {
    containerCartProducts.classList.toggle("hidden-cart")
})



const cartInfo= document.querySelector(".cart-product")
const rowProduct= document.querySelector(".row-product")



const productList= document.querySelector(".container-items")


let allProducts = []

const valorTotal = document.querySelector(".total-pagar")
const countProducts = document.querySelector("#contador-productos")

productList.addEventListener("click", e => {
    if (e.target.classList.contains("btn-add-cart")){ 
        const product= e.target.parentElement 
        const infoProduct = { 
            quantity: 1,
            title: product.querySelector("h3").textContent,
            price: product.querySelector("p").textContent,
        }

        const exists = allProducts.some(product => product.title === infoProduct.title)


        if (exists){
            const products = allProducts.map(product => {
                if(product.title===infoProduct.title){
                    product.quantity++;
                    return product
                } else{
                    return product 
                }
            })
            allProducts = [...products]
        } else{
            allProducts = [...allProducts, infoProduct] 
        }

        showHTML() 
    }
});

rowProduct.addEventListener("click", (e) => { 
    if(e.target.classList.contains("icon-close")){ 
        const product = e.target.parentElement
        const title = product.querySelector("p").textContent 
    
        allProducts = allProducts.filter(product => 
            product.title !== title); 
        showHTML();
    } 
})




const showHTML = () => {

    rowProduct.innerHTML = "";  
    let total = 0; 
    let totalOfProducts = 0; 

    allProducts.forEach(product => {
        const containerProduct = document.createElement("div") 
        containerProduct.classList.add("cart-product") 

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
                    >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
                    />
            </svg>
        `
        rowProduct.append(containerProduct) 

        total= total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity; 
    
    })

    valorTotal.innerText = `$${total}`
    countProducts.innerText = totalOfProducts;
    
    sincronizarStorage()
}


document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
    title: '¿Eres mayor de 18 años?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, soy mayor de 18 años',
    cancelButtonText: 'No, soy menor de 18 años'
    }).then((result) => {
    if (result.isConfirmed) {
        
        Swal.fire({
        title: 'Acceso permitido',
        icon: 'success'
        });
    } else {
        
        window.location.href = 'otra-pagina.html';
    }
    });
});

const tbody = document.getElementById("tragos-body");

fetch("tragos.json")
  .then(response => response.json())
  .then(tragos => {
    tragos.forEach(trago => {
      const row = document.createElement("tr");
      const nombreCell = document.createElement("td");
      const ingredientesCell = document.createElement("td");
      
      nombreCell.textContent = trago.nombre;
      ingredientesCell.textContent = trago.ingredientes.join(", ");
      
      row.appendChild(nombreCell);
      row.appendChild(ingredientesCell);
      tbody.appendChild(row);
    });
  })
  .catch(error => console.error(error));

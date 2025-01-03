import { deleteProduct } from "./deletProducts.js";

function printProducts() {
    let products = document.getElementById('products');

    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                
                let svg = document.createElement('img');
                svg.src = '../img/btn-borrar.svg';
                
                
                let productHTML = `
                    <div class="cart" id="${element.id}">
                        <img src="${element.img}" alt="img-producto">
                        <p>${element.name}</p>
                        <div class="price">
                            <p>$ ${element.price}</p>
                        </div>
                    </div>
                `;
                
                let div = document.createElement('div');
                div.innerHTML = productHTML;
                div.querySelector('.price').appendChild(svg);
                
                products.appendChild(div);

                svg.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    deleteProduct(element.id);
                });
            });
        })
        .catch(error => console.error("Error:", error));
}


printProducts();

export { printProducts };

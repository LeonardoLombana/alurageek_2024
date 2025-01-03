function addProducts() {
        let form = document.querySelector('form');
        let nameProductForm = form.querySelector('#nameProductForm');
        let priceProductForm = form.querySelector('#priceProductForm');
        let imgProductForm = form.querySelector('#imgProductForm');
        let btnSend = form.querySelector('#btnSend');
        let btnClean = form.querySelector('#btnClean');

        priceProductForm.addEventListener('input', function () {
            
            let price = this.value;
            if (price.length > 5) {
                this.value = price.slice(0, 13);
            }

        });
        
        btnSend.addEventListener('click', function (event) {
            event.preventDefault(); 

            let name = nameProductForm.value;
            let price = parseFloat(priceProductForm.value);
            let img = imgProductForm.value;

            if (name.trim() === '' || isNaN(price) || img.trim() === '') {
                alert('Por favor completa todos los campos');
                return;
            }

            
            let nuevoProducto = {
                name: name,
                price: price,
                img: img
            };

            
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto) 
            };

            
            fetch("http://localhost:3000/products", options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no fue exitosa");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Producto añadido:", data);
                })
                .catch(error => {
                    console.error("Error al realizar la solicitud:", error);
                });
        });

        
        btnClean.addEventListener('click', function (event) {
            event.preventDefault()
            
            nameProductForm.value = '';
            priceProductForm.value = '';
            imgProductForm.value = '';
        });
}

addProducts()

export { addProducts };

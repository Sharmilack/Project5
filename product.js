const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("http://localhost:3000/api/cameras/" + productId)
    .then((response) => response.json())
    .then((camera) => {
        var output = "";
        output = ` 
			    <h2>${camera.name}</h2>
			    <div class="productDetails">
				    <div id="left">
					 	<img src = ${camera.imageUrl}></img>
					 	<p>Prix : ${camera.price / 100} €</p>
				    </div>
			        <div id="right">
			         	<p>${camera.description}</p>
			         	<div id ="lenses">
			        		<p>Lenses<br>${camera.lenses}</p>
			        	</div>
			       	</div>
			    </div>
			    <button class="button" id="addToCart">Ajouter au panier</button>
	   		`;

        document.getElementById("maincontainer").innerHTML = output;

                // S'il y en plus que 1, il y a problème, on clean les autres items du tableau
                if (existingItems.length > 1) {
                    cartItems = cartItems.filter(
                        (item) => item.id != camera._id
                    );
                    cartItems.push(existingItems[0]);
                }
            }
            // Sinon on ajoute un nouvel item
            else {
                cartItems.push({
                    id: camera._id,
                    image: camera.imageUrl,
                    name: camera.name,
                    prices: camera.price / 100,
                    quantity: 1,
                });
            }
            // Puis on serialise le tableau
            localStorage.setItem("cart", JSON.stringify(cartItems));
        });


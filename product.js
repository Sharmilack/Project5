const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch('http://localhost:3000/api/cameras/' + productId)
	.then(response =>response.json())
        .then(camera => {
        	var output = '' ;
        	output =` 
			    <h2>${camera.name}</h2>
			    <div class="productDetails">
				    <div id="left">
					 	<img src = ${camera.imageUrl}></img>
					 	<p>Prix : ${camera.price/100} €</p>
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

	document.getElementById('maincontainer').innerHTML=output;

	const addCart=document.getElementById('addToCart')
    
    document.getElementById('addToCart').addEventListener('click', ()=>{
    	addToCart.style.color ="#7cb9c4";
 
		cartItems = localStorage.getItem('cart');
			let items = {id:camera._id, image:camera.imageUrl, name:camera.name, prices:camera.price/100, quantity:1};
			if (cartItems === null){
				cartItems = [];
				cartItems.push(items);
				localStorage.setItem('cart', JSON.stringify(cartItems));
				console.log(cartItems);
			} else {
				cartItems=JSON.parse(cartItems);
				cartItems.forEach (item => {
					if (item.id === camera._id){
						items.quantity = item.quantity += 1;
						items.prices = item.prices*item.quantity;				
				}else{
				cartItems.push(items);
				}
			localStorage.setItem('cart', JSON.stringify(cartItems));


		/*else {
			cartItems = JSON.parse(cartItems);
			if (!cartItems.includes(productId)){
				cartItems.push(productId);
				localStorage.setItem('cart', JSON.stringify(cartItems));
			}
		}*/
	});
};
});
});
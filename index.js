fetch('http://localhost:3000/api/cameras')
	.then(response =>response.json())
    .then(data => {
    	console.log("fetch succeeded");
    	var output = '' ;
        data.forEach(camera => {
        output +=`    
	        <li class="cameraList">
		        <a href="product.html?id=${camera._id}">
		         	<h2>${camera.name}</h2>
		         	<img src = ${camera.imageUrl}></img>
		         	<p>${camera.price/100} €</p>
		         	<p>${camera.description}</p>
		        </a>
		        <div id ="lenses">
		        	<p>Lenses<br>${camera.lenses}</p>
		       	</div>
		        <a href="product.html?id=${camera._id}">
		         	<button class="button">Voir le produit</button>
		        </a>
	         </li>
	         `;
      });
      document.getElementById('listOfItems').innerHTML=output;
   });

fetch('http://localhost:3000/api/cameras')
	.then(response =>response.json())
    .then(data => {
    	var output = '' ;
        data.forEach(camera => {
        output +=`    
	         <li>
	         	<h4>${camera.name}</h4>
	         	<img src = ${camera.imageUrl}></img>
	         	<h5>${camera.price} €</h5>
	         	<h6>${camera.description}</h6>
	         </li>
	         `;
      });
      document.getElementById('listOfItems').innerHTML=output;
   });
finalCart = localStorage.getItem('cart');

if (finalCart == null){
	finalCart = [];
} else{
	finalCart = JSON.parse(finalCart);
}
	const promises = finalCart.map(id => {
		return fetch('http://localhost:3000/api/cameras/' + id).then(response => {
			return response.json()
		});
	});
	var output = '';
	var totalPrice = 0;
	Promise.all(promises).then(camera => {
		camera.forEach((camera)=>{
			totalPrice += camera.price;
	        output +=`
			  	<ul>   
			        <li>
			        	<div class="cartProduct">
				        	<img src = ${camera.imageUrl}></img>
				        	<p>${camera.name}</p>
			        </li>
			        <li><p>${camera.price/100} €</p></li>
				    <li><p>1</p></li>
			    </ul>
		    `;
		    document.getElementById("headingCart").style.visibility="visible";
		    document.getElementById("checkoutSection").style.visibility="visible";
		    document.getElementById('mainContainerCart').innerHTML=output;
		    document.getElementById('total').innerHTML="Total Price = " + totalPrice/100;
		});
	});

	function openForm() {
        document.getElementById("checkoutform").style.display="block";
     }
      
      function closeForm() {
        document.getElementById("checkoutform").style.display="none";
      }

let headers = {
	"Content-Type" : "application/json"
}

var form = document.getElementById('checkoutform');

form.addEventListener('submit', e=>{
	e.preventDefault();
	let order ={
      products: finalCart,
      contact: {
        lastName: document.getElementById("firstname").value,
        firstName: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        postalcode: document.getElementById("postalcode").value,
        city: document.getElementById("city").value,
      },
    };
    fetch("http://localhost:3000/api/cameras/order", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(order),
  	}).then(response=> {
  		response.json().then(result=>{
  			orderId = result.orderId;
  			window.location.href="confirmation.html?orderId=" + orderId
  			localStorage.setItem('cart', JSON.stringify([]));
  		});
  	});
});
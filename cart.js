finalCart = localStorage.getItem("cart");
}

const promises = finalCart.map((item) => {
    return fetch("http://localhost:3000/api/cameras/" + item.id)
        .then((response) => response.json())
        .then((data) => {
            // Shallow merge to keep quantity and previous attrs
            return { ...item, ...data };
        });
});

var output = "";
var totalPrice = 0;
Promise.all(promises).then((camera) => {
    camera.forEach((camera) => 
        output += `
			  <ul>   
			    <li>
			      <div class="cartProduct">
				     	<img src = ${camera.imageUrl}></img>
				      <p>${camera.name}</p>
				    </div>
			    </li>
};

var form = document.getElementById("checkoutform");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    contact: {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            postalcode: document.getElementById("postalcode").value,
            city: document.getElementById("city").value,
        },
    };
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(order),

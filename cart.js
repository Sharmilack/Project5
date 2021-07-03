finalCart = localStorage.getItem("cart");

if (finalCart == null) {
    finalCart = [];
} else {
    finalCart = JSON.parse(finalCart);
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
    camera.forEach((camera) => {
        totalPrice += camera.price;
        output += `
			  <ul>   
			    <li>
			      <div class="cartProduct">
				     	<img src = ${camera.imageUrl}></img>
				      <p>${camera.name}</p>
				    </div>
			    </li>
			    <li><p>${camera.price / 100} €</p></li>
				<li><p>${camera.quantity}</p></li>
			  </ul>
		  `;
        document.getElementById("headingCart").style.visibility = "visible";
        document.getElementById("checkoutSection").style.visibility = "visible";
        document.getElementById("mainContainerCart").innerHTML = output;
        document.getElementById("totalcart").innerHTML =
            "Total Price = " + totalPrice / 100;

        sessionStorage.setItem("total", totalPrice / 100);
    });
});

function openForm() {
    document.getElementById("checkoutform").style.display = "block";
}

function closeForm() {
    document.getElementById("checkoutform").style.display = "none";
}

let headers = {
    "Content-Type": "application/json",
};

var form = document.getElementById("checkoutform");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let order = {
        products: finalCart,
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
    }).then((response) => {
        response.json().then((result) => {
            orderId = result.orderId;
            window.location.href = "confirmation.html?orderId=" + orderId;
            localStorage.setItem("cart", JSON.stringify([]));
        });
    });
});

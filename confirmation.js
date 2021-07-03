const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
console.log(orderId);

const total = sessionStorage.getItem("total");

document.getElementById("mainOrder").innerHTML = 'Your order was successful. The unique id of your order is : ' + orderId; 
document.getElementById("total").innerHTML = 'The total price of your order is: ' + total;


        	

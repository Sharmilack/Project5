const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

document.getElementById("mainOrder").innerHTML = 'Your order was successful. the unique id of your order is ' + orderId; 





        	

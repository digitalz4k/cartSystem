'use strict';

console.log("Cart JS Loaded...");

// Easier elements catching...
var itemHelpers = [
	{
		price: "prix-1",
		btn: "btn1",
		name: "produit-1"
	},
	{
		price: "prix-2",
		btn: "btn2",
		name: "produit-2"
	},
	{
		price: "prix-3",
		btn: "btn3",
		name: "produit-3"
	}
];

// Init global variables
var panier = [],
	total = 0,
	cart = document.getElementById("cart");

/* Get document.Element Function
  - 1st arg => HTML target
  - 2nd arg => String - Require "value", "name" or "btn"
*/
var getE = function(id, val){
	console.log("Attempting to get " + val + " of object " + JSON.stringify(id.name));
	if(val === "btn"){
		return document.getElementById(id.btn);
		console.log("Retrieving " + document.getElementById(id.btn));
	} else if(val === "name") {
		return document.getElementById(id.name);
		console.log("Retrieving " + document.getElementById(id.name));
	}else if(val === "value") {
		return document.getElementById(id.price).value;
		console.log("Retrieving " + document.getElementById(id.price).value);
	} else {
		console.log("Miss arguments (value, btn or name)");
	}
}

/* Get Cart Function
  - Verify Cart content
  - Populate Cart data
	- Display Cart informations
	Notes: panier is array, Cart is HTML target
*/
var getCart = function(){
	// If Cart is empty, display a warning message.
	if(panier.length === 0){
		cart.innerHTML = "<p class='text-warning'>Il n`y a pas encore d'articles dans votre panier.</p>";
	} else {
		// Reset Cart
		cart.innerHTML = '';

		// Prepare total amount informations
		var totalMsg = "<p><strong>Total : " + total.toFixed(2) + "€</strong></p>";

		// Populate Cart data and create a paragraph for each item with name & price tags
		for(var i=0; i<panier.length; i++){
			var item = panier[i].name + " - " + panier[i].price + "€";
			var p = document.createElement('p');
			p.innerHTML = item;
			cart.appendChild(p);
		}

		// Display total amount in Cart footer
		var footer = document.createElement('p');
		footer.innerHTML = totalMsg;
		cart.appendChild(footer);

	}
}

/* Add Item Function
	- Arg is index of item
	- Prepare Item data to push in Cart
*/
var addItem = function(i){
		var itemCart = {
			name: getE(itemHelpers[i], "name").querySelector("h3").innerHTML,
			price: Number(getE(itemHelpers[i], "value"))
		}
	console.log("Adding item " + itemCart.name + " with ID " + i);

	if(itemHelpers[i].selected === undefined){
		itemHelpers[i].selected = true;
	}
	panier.push(itemCart);
	total += itemCart.price;

	getCart();
}

// On page load, display Cart or no items warning message
getCart();

/* Click event button 1 */
getE(itemHelpers[0], "btn").onclick = function(){
	console.log("Button clicked...");
	addItem(0);
}

/* Click event button 2 */
getE(itemHelpers[1], "btn").onclick = function(){
	addItem(1);
}

/* Click event button 3 */
getE(itemHelpers[2], "btn").onclick = function(){
	addItem(2);
}

const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
const summaryContainer = document.getElementById("checkout-summary-container");
const checkoutForm = document.getElementById("checkout-form");

function renderSummary() {
  if (cart.length === 0) {
    summaryContainer.innerHTML = `<p class="empty-cart">Your cart is empty. <a href="shop.html">Go shop</a></p>`;
    return;
  }

  let subtotal = 0;
  let itemsHTML = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    itemsHTML += `
      <div class="summary-line">
        <span>${product.name} (Size ${item.size}) x${item.quantity}</span>
        <span>R${lineTotal.toLocaleString()}</span>
      </div>
    `;
  });

  const shipping = 150;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = `
    <h2 class="checkout-subtitle">Order Summary</h2>
    ${itemsHTML}
    <div class="summary-line">
      <span>Shipping</span>
      <span>R${shipping}</span>
    </div>
    <div class="summary-line summary-total">
      <span>Total</span>
      <span>R${total.toLocaleString()}</span>
    </div>
  `;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the form from actually submitting/reloading the page

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Order placed! Thank you for shopping with AstroKicks.");

  // Clear the cart since the "order" is complete
  sessionStorage.removeItem("cart");

  window.location.href = "index.html";
});

renderSummary();
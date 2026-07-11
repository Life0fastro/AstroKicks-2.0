// Updates the cart count badge in the nav based on sessionStorage
function updateCartCount() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCountEl = document.querySelector(".cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}

// Run on every page load
updateCartCount();
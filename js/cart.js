// Get cart from sessionStorage (or empty array if none)
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const itemsContainer = document.getElementById("cart-items-container");
const summaryContainer = document.getElementById("cart-summary-container");

function renderCart() {
  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty. <a href="shop.html">Go shop</a></p>`;
    summaryContainer.innerHTML = "";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return; // skip if product data is missing

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    itemEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${product.name}</h3>
        <p class="cart-item-size">Size: ${item.size}</p>
        <p class="cart-item-price">R${product.price.toLocaleString()}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn decrease-btn" data-index="${index}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn increase-btn" data-index="${index}">+</button>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    itemsContainer.appendChild(itemEl);
  });

  summaryContainer.innerHTML = `
    <p class="cart-subtotal">Subtotal: R${subtotal.toLocaleString()}</p>
    <a href="checkout.html" class="hero-btn">Proceed to Checkout</a>
  `;

  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll(".increase-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart[index].quantity += 1;
      updateCart();
    });
  });

  document.querySelectorAll(".decrease-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); // remove if quantity drops to 0
      }
      updateCart();
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

function updateCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

renderCart();
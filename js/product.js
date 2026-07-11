// Read the "id" query parameter from the URL (e.g. product.html?id=jordan1)
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Find the matching product in our data
const product = products.find(p => p.id === productId);

const container = document.getElementById("product-detail-container");

if (product) {
  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}" class="detail-shoe-img">
    </div>

    <div class="product-detail-info">
      <h1 class="detail-name">${product.name}</h1>
      <p class="detail-price">R${product.price.toLocaleString()}</p>
      <p class="detail-category">Category: ${product.category}</p>

      <div class="size-selector">
        <label for="size-select" class="size-label">Select Size (UK)</label>
        <select id="size-select" class="filter-select">
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
      </div>

      <button id="add-to-cart-btn" class="hero-btn">Add to Cart</button>
    </div>
  `;
} else {
  container.innerHTML = `<p class="not-found">Product not found. <a href="shop.html">Back to shop</a></p>`;
}

// Add to Cart button logic
if (product) {
  const addToCartBtn = document.getElementById("add-to-cart-btn");

  addToCartBtn.addEventListener("click", () => {
    const sizeSelect = document.getElementById("size-select");
    const selectedSize = sizeSelect.value;

    // Get existing cart from sessionStorage, or start a new empty array
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Check if this exact product+size is already in the cart
    const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: product.id, size: selectedSize, quantity: 1 });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} (Size ${selectedSize}) added to cart!`);
  });
}
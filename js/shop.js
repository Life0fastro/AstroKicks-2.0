// Grab the container where product cards will be injected
const gridContainer = document.getElementById("product-grid-container");
const categoryFilter = document.getElementById("category-filter");
const sortSelect = document.getElementById("sort-select");

// Renders a given array of products into the grid
function renderProducts(productList) {
  gridContainer.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = `product.html?id=${product.id}`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">R${product.price.toLocaleString()}</p>
    `;

    gridContainer.appendChild(card);
  });
}

// Applies current filter + sort, then renders
function updateShop() {
  let filtered = [...products];

  // Filter by category
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Sort
  const sortValue = sortSelect.value;
  if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProducts(filtered);
}

// Listen for changes on the dropdowns
categoryFilter.addEventListener("change", updateShop);
sortSelect.addEventListener("change", updateShop);

// Initial render on page load
updateShop();
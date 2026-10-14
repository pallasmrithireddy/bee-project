
(() => {
  const products = {
    250: { name: "ATMA Natural Honey — 250 g", price: 200, image: "300g product image .png" },
    500: { name: "ATMA Natural Honey — 500 g", price: 400, image: "300g product image .png" },
    900: { name: "ATMA Natural Honey — 900 g", price: 700, image: "900g product image.png" },
    1000: { name: "ATMA Natural Honey — 1000 g", price: 800, image: "900g product image.png" }
  };

  const sizeSelect = document.getElementById("detail-size");
  const quantityInput = document.getElementById("detail-quantity");
  const nameElement = document.getElementById("detail-name");
  const priceElement = document.getElementById("detail-price");
  const imageElement = document.getElementById("detail-image");

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function currentProduct() {
    return products[Number(sizeSelect.value)] || products[900];
  }

  function updateProduct() {
    const product = currentProduct();
    nameElement.textContent = product.name;
    priceElement.textContent = money(product.price);
    imageElement.src = product.image;
    imageElement.alt = product.name;
    document.title = `${product.name} | ATMA Beekeeper`;
  }

  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("atmaCart") || "[]");
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("atmaCart", JSON.stringify(cart));
    if (typeof window.updateCartCount === "function") {
      window.updateCartCount();
    }
  }

  const querySize = Number(new URLSearchParams(location.search).get("size"));
  if (products[querySize]) sizeSelect.value = String(querySize);

  sizeSelect.addEventListener("change", updateProduct);

  document.getElementById("quantity-minus").addEventListener("click", () => {
    quantityInput.value = Math.max(1, Number(quantityInput.value || 1) - 1);
  });

  document.getElementById("quantity-plus").addEventListener("click", () => {
    quantityInput.value = Math.min(99, Number(quantityInput.value || 1) + 1);
  });

  quantityInput.addEventListener("change", () => {
    quantityInput.value = Math.min(99, Math.max(1, Math.floor(Number(quantityInput.value) || 1)));
  });

  document.getElementById("detail-add-to-cart").addEventListener("click", () => {
    const product = currentProduct();
    const quantity = Math.min(99, Math.max(1, Math.floor(Number(quantityInput.value) || 1)));
    const cart = readCart();
    const existing = cart.find((item) => Number(item.size) === Number(sizeSelect.value));

    if (existing) {
      existing.quantity = Math.min(99, (Number(existing.quantity) || 0) + quantity);
    } else {
      cart.push({
        size: Number(sizeSelect.value),
        name: product.name,
        price: product.price,
        quantity
      });
    }

    saveCart(cart);

    const button = document.getElementById("detail-add-to-cart");
    const oldText = button.textContent;
    button.textContent = "Added to Cart ✓";
    setTimeout(() => button.textContent = oldText, 1800);
  });

  updateProduct();
})();

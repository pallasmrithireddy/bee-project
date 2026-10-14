
(() => {
  const productDetails = {
    250: { name: "ATMA Natural Honey — 250 g", price: 200, image: "300g product image .png" },
    500: { name: "ATMA Natural Honey — 500 g", price: 400, image: "300g product image .png" },
    900: { name: "ATMA Natural Honey — 900 g", price: 700, image: "900g product image.png" },
    1000: { name: "ATMA Natural Honey — 1000 g", price: 800, image: "900g product image.png" }
  };

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("atmaCart") || "[]");
      if (!Array.isArray(cart)) return [];

      return cart
        .filter((item) => productDetails[Number(item.size)])
        .map((item) => {
          const product = productDetails[Number(item.size)];
          return {
            ...product,
            size: Number(item.size),
            quantity: Math.min(99, Math.max(1, Math.floor(Number(item.quantity) || 1)))
          };
        });
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

  function renderCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    const cart = readCart();
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    document.getElementById("cart-subtotal").textContent = formatMoney(subtotal);
    document.getElementById("cart-total").textContent = formatMoney(subtotal);

    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton?.classList.toggle("hidden", cart.length === 0);

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-symbol" aria-hidden="true">◇</div>
          <h3>Your cart is waiting for a little sweetness.</h3>
          <p>You haven't added any honey yet.</p>
          <a class="btn btn-primary" href="products.html">Explore Our Honey</a>
        </div>`;
      return;
    }

    container.innerHTML = cart.map((item) => `
      <article class="cart-item" data-size="${item.size}">
        <img class="cart-item-image" src="${item.image}"
          alt="${item.name}" loading="lazy">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${formatMoney(item.price)} per jar</p>
          <div class="quantity-control" aria-label="Quantity controls">
            <button type="button" data-action="decrease"
              data-size="${item.size}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase"
              data-size="${item.size}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-item-end">
          <strong class="cart-item-price">
            ${formatMoney(item.price * item.quantity)}
          </strong>
          <button class="remove-item" type="button"
            data-action="remove" data-size="${item.size}">Remove</button>
        </div>
      </article>
    `).join("");
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action][data-size]");
    if (!button) return;

    const size = Number(button.dataset.size);
    const action = button.dataset.action;
    const cart = readCart();
    const item = cart.find((entry) => entry.size === size);

    if (!item) return;

    if (action === "increase") item.quantity = Math.min(99, item.quantity + 1);
    if (action === "decrease") item.quantity -= 1;

    const updated = action === "remove" || item.quantity < 1
      ? cart.filter((entry) => entry.size !== size)
      : cart;

    saveCart(updated);
    renderCart();
  });

  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("atma:layout-ready", renderCart);
})();

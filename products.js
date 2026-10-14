
(() => {
  const products = {
    250: { size: 250, name: "ATMA Natural Honey — 250 g", price: 200 },
    500: { size: 500, name: "ATMA Natural Honey — 500 g", price: 400 },
    900: { size: 900, name: "ATMA Natural Honey — 900 g", price: 700 },
    1000: { size: 1000, name: "ATMA Natural Honey — 1000 g", price: 800 }
  };

  window.atmaProducts = products;

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

  function addProduct(size) {
    const product = products[size];
    if (!product) return;

    const cart = readCart();
    const existing = cart.find((item) => Number(item.size) === product.size);

    if (existing) {
      existing.quantity = Math.min(99, (Number(existing.quantity) || 0) + 1);
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    showMessage(`${product.size} g honey added to your cart.`);
  }

  function showMessage(message) {
    let notice = document.getElementById("cart-notice");

    if (!notice) {
      notice = document.createElement("div");
      notice.id = "cart-notice";
      notice.className = "cart-notice";
      notice.setAttribute("role", "status");
      document.body.appendChild(notice);
    }

    notice.textContent = message;
    notice.classList.add("is-visible");

    clearTimeout(notice.hideTimer);
    notice.hideTimer = setTimeout(() => {
      notice.classList.remove("is-visible");
    }, 2600);
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;

    addProduct(Number(button.dataset.size));
  });
})();

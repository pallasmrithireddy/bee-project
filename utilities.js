
(() => {
  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);

  function readJSON(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function escapeHTML(value) {
    const element = document.createElement("span");
    element.textContent = String(value ?? "");
    return element.innerHTML;
  }

  function getProduct(size) {
    const products = {
      250: { size: 250, name: "ATMA Natural Honey — 250 g", price: 200 },
      500: { size: 500, name: "ATMA Natural Honey — 500 g", price: 400 },
      900: { size: 900, name: "ATMA Natural Honey — 900 g", price: 700 },
      1000: { size: 1000, name: "ATMA Natural Honey — 1000 g", price: 800 }
    };

    return products[Number(size)] || null;
  }

  function getCartSubtotal(cart) {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((total, item) => {
      const price = Math.max(0, Number(item.price) || 0);
      const quantity = Math.max(0, Math.floor(Number(item.quantity) || 0));
      return total + price * quantity;
    }, 0);
  }

  window.ATMAUtils = {
    money,
    readJSON,
    writeJSON,
    escapeHTML,
    getProduct,
    getCartSubtotal
  };
})();


(() => {
  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);

  function getOrder() {
    try {
      return JSON.parse(
        localStorage.getItem("atmaLastOrder") ||
        localStorage.getItem("atmaCurrentOrder") ||
        "null"
      );
    } catch {
      return null;
    }
  }

  function renderOrder() {
    const order = getOrder();
    const successContainer = document.getElementById("success-order-details");
    const failedContainer = document.getElementById("failed-order-details");
    const container = successContainer || failedContainer;

    if (!container) return;

    if (!order) {
      container.textContent = "No saved order was found in this browser.";
      return;
    }

    container.innerHTML = `
      <p><strong>Order reference:</strong> ${order.id || "Unavailable"}</p>
      <p><strong>Customer:</strong> ${escapeText(order.customer?.name || "Customer")}</p>
      <p><strong>Product total:</strong> ${money(order.subtotal)}</p>
      <p><strong>Status:</strong> ${escapeText(order.status || "Pending")}</p>
    `;
  }

  function escapeText(value) {
    const element = document.createElement("span");
    element.textContent = String(value);
    return element.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", renderOrder);
})();

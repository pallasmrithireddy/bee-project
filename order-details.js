
(() => {
  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(amount) || 0);

  function escapeHTML(value) {
    const element = document.createElement("span");
    element.textContent = String(value ?? "");
    return element.innerHTML;
  }

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

  function render() {
    const target = document.getElementById("order-details-content");
    if (!target) return;

    const order = getOrder();

    if (!order) {
      target.innerHTML = `
        <div class="cart-empty">
          <h2>No saved order found</h2>
          <p>Place a demo order to see its details here.</p>
          <a class="btn btn-primary" href="products.html">Shop Honey</a>
        </div>`;
      return;
    }

    const customer = order.customer || {};
    const items = Array.isArray(order.items) ? order.items : [];

    const orderDate = order.date
      ? new Date(order.date).toLocaleString("en-IN")
      : "Not available";

    target.innerHTML = `
      <h2>Order Summary</h2>
      <div class="order-meta">
        <div class="order-meta-item">
          <span>Order reference</span>
          <strong>${escapeHTML(order.id || "N/A")}</strong>
        </div>
        <div class="order-meta-item">
          <span>Order date</span>
          <strong>${escapeHTML(orderDate)}</strong>
        </div>
        <div class="order-meta-item">
          <span>Order status</span>
          <strong>${escapeHTML(order.status || "Pending")}</strong>
        </div>
        <div class="order-meta-item">
          <span>Payment status</span>
          <strong>${escapeHTML(order.paymentStatus || "Pending")}</strong>
        </div>
      </div>

      <h2>Items Ordered</h2>
      <table class="order-table">
        <thead>
          <tr><th>Product</th><th>Qty</th><th>Total</th></tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>${escapeHTML(item.name)}</td>
              <td>${Math.max(1, Number(item.quantity) || 1)}</td>
              <td>${money((Number(item.price) || 0) * (Number(item.quantity) || 1))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="order-total-row">
        <span>Product subtotal</span>
        <span>${money(order.subtotal)}</span>
      </div>
      <p class="muted">Delivery charges: To be confirmed separately.</p>

      <h2>Delivery Details</h2>
      <p><strong>${escapeHTML(customer.name || "")}</strong></p>
      <p>${escapeHTML(customer.phone || "")}</p>
      <p>${escapeHTML(customer.email || "")}</p>
      <p>${escapeHTML(customer.address || "")}<br>
      ${escapeHTML(customer.city || "")}, ${escapeHTML(customer.state || "")}
      — ${escapeHTML(customer.pincode || "")}</p>

      <p class="muted">
        This order record is stored locally in your browser. It is not a
        server-confirmed order or proof of real payment.
      </p>
    `;
  }

  document.addEventListener("DOMContentLoaded", render);
})();

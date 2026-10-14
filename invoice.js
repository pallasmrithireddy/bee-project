
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

  function renderInvoice() {
    const target = document.getElementById("invoice-content");
    if (!target) return;

    const order = getOrder();

    if (!order) {
      target.innerHTML = `
        <h2>No saved order</h2>
        <p>Place an order before generating a demo invoice.</p>
        <a href="products.html" class="btn btn-primary">Shop Honey</a>`;
      return;
    }

    const customer = order.customer || {};
    const items = Array.isArray(order.items) ? order.items : [];
    const date = order.date ? new Date(order.date).toLocaleDateString("en-IN") : "—";

    target.innerHTML = `
      <div class="invoice-top">
        <div class="invoice-brand">
          <img src="logo.jpeg" alt="ATMA Beekeeper logo">
          <div>
            <h2>ATMA Beekeeper</h2>
            <p>Pure Honey. Honest Promise.</p>
            <p class="invoice-small">
              H.No. 11-2-207/1/A/1, Seetharampur,<br>
              Karimnagar – 505001, Telangana, India
            </p>
            <p class="invoice-small">+91 94400 13202</p>
          </div>
        </div>
        <div class="invoice-number">
          <h2>INVOICE</h2>
          <p><strong>Reference:</strong> ${escapeHTML(order.id || "—")}</p>
          <p><strong>Date:</strong> ${escapeHTML(date)}</p>
          <p><strong>Status:</strong> ${escapeHTML(order.paymentStatus || "Pending")}</p>
        </div>
      </div>

      <div class="invoice-parties">
        <div>
          <h3>Bill To</h3>
          <p><strong>${escapeHTML(customer.name || "Customer")}</strong></p>
          <p>${escapeHTML(customer.phone || "")}</p>
          <p>${escapeHTML(customer.email || "")}</p>
        </div>
        <div>
          <h3>Delivery Address</h3>
          <p>${escapeHTML(customer.address || "")}</p>
          <p>${escapeHTML(customer.city || "")}, ${escapeHTML(customer.state || "")}</p>
          <p>${escapeHTML(customer.pincode || "")}</p>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => {
            const quantity = Math.max(1, Number(item.quantity) || 1);
            const price = Number(item.price) || 0;
            return `
              <tr>
                <td>${escapeHTML(item.name)}</td>
                <td>${quantity}</td>
                <td>${money(price)}</td>
                <td>${money(price * quantity)}</td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>

      <div class="invoice-total">
        <div class="invoice-total-row">
          <span>Product subtotal</span><strong>${money(order.subtotal)}</strong>
        </div>
        <div class="invoice-total-row">
          <span>Delivery</span><span>To be confirmed</span>
        </div>
        <div class="invoice-total-row grand-total">
          <span>Product total</span><span>${money(order.subtotal)}</span>
        </div>
      </div>

      <hr>
      <p><strong>Thank you for choosing ATMA Beekeeper.</strong></p>
      <p class="invoice-small">
        This is a locally generated demo invoice, not a tax invoice or proof
        of payment. Any applicable delivery charges are excluded.
      </p>
    `;
  }

  document.getElementById("print-invoice")?.addEventListener("click", () => {
    window.print();
  });

  document.addEventListener("DOMContentLoaded", renderInvoice);
})();

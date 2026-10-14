
(() => {
  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function loadOrder() {
    try {
      return JSON.parse(localStorage.getItem("atmaCurrentOrder") || "null");
    } catch {
      return null;
    }
  }

  function render() {
    const order = loadOrder();

    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      window.location.replace("cart.html");
      return;
    }

    if (order.paymentMethod !== "simulated") {
      window.location.replace("checkout.html");
      return;
    }

    document.getElementById("payment-total").textContent = money(order.total);
    document.getElementById("payment-order-info").textContent =
      `Order reference: ${order.id}`;
  }

  function completePayment(success) {
    const order = loadOrder();

    if (!order) {
      window.location.href = "cart.html";
      return;
    }

    order.paymentStatus = success ? "Demo payment successful" : "Demo payment failed";
    order.status = success ? "Demo order confirmed" : "Payment failed";

    localStorage.setItem("atmaCurrentOrder", JSON.stringify(order));
    localStorage.setItem("atmaLastOrder", JSON.stringify(order));

    if (success) {
      localStorage.removeItem("atmaCart");
      window.location.href = "order-success.html";
    } else {
      window.location.href = "order-failed.html";
    }
  }

  document.getElementById("simulate-success")?.addEventListener("click", () => {
    completePayment(true);
  });

  document.getElementById("simulate-failure")?.addEventListener("click", () => {
    completePayment(false);
  });

  document.addEventListener("DOMContentLoaded", render);
})();


(() => {
  const WHATSAPP_NUMBER = "919440013202";

  const products = {
    250: { name: "ATMA Natural Honey — 250 g", price: 200 },
    500: { name: "ATMA Natural Honey — 500 g", price: 400 },
    900: { name: "ATMA Natural Honey — 900 g", price: 700 },
    1000: { name: "ATMA Natural Honey — 1000 g", price: 800 }
  };

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function getCart() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("atmaCart") || "[]"
      );

      if (!Array.isArray(saved)) return [];

      return saved
        .filter((item) => products[Number(item.size)])
        .map((item) => {
          const product = products[Number(item.size)];

          return {
            ...product,
            size: Number(item.size),
            quantity: Math.min(
              99,
              Math.max(
                1,
                Math.floor(Number(item.quantity) || 1)
              )
            )
          };
        });
    } catch {
      return [];
    }
  }

  function renderSummary() {
    const cart = getCart();

    const itemsContainer =
      document.getElementById("checkout-items");

    const subtotalElement =
      document.getElementById("checkout-subtotal");

    const totalElement =
      document.getElementById("checkout-total");

    const submitButton =
      document.getElementById("whatsapp-order-button");

    if (!itemsContainer) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <p class="muted">
          Your cart is empty.
          <a href="products.html">Shop honey</a>.
        </p>
      `;
    } else {
      itemsContainer.innerHTML = cart.map((item) => `
        <div class="checkout-line">
          <span>
            ${item.name} × ${item.quantity}
          </span>
          <strong>
            ${money(item.price * item.quantity)}
          </strong>
        </div>
      `).join("");
    }

    if (subtotalElement) {
      subtotalElement.textContent = money(total);
    }

    if (totalElement) {
      totalElement.textContent = money(total);
    }

    if (submitButton) {
      submitButton.disabled = cart.length === 0;
    }
  }

  function createOrder(cart) {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      id: "ATMA-" + Date.now().toString().slice(-8),
      date: new Date().toISOString(),

      customer: {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        note: ""
      },

      items: cart,
      subtotal: total,
      shipping: null,
      total: total,

      paymentMethod: "whatsapp",
      paymentStatus: "Awaiting confirmation",
      status: "Pending WhatsApp confirmation"
    };

    localStorage.setItem(
      "atmaCurrentOrder",
      JSON.stringify(order)
    );

    return order;
  }

  function makeWhatsAppMessage(order) {
    const lines = [
      "Hello ATMA Beekeeper! I would like to place an order.",
      "",
      `Order reference: ${order.id}`,
      "",
      "ORDER DETAILS",
      ...order.items.map((item) =>
        `${item.name} × ${item.quantity} = ${
          money(item.price * item.quantity)
        }`
      ),
      "",
      `Product subtotal: ${money(order.subtotal)}`,
      "Shipping: Please confirm",
      "",
      "I will share my name, phone number and delivery address here.",
      "Please confirm availability, delivery charges and payment instructions.",
      "",
      "Thank you!"
    ];

    return lines.join("\n");
  }

  function placeWhatsAppOrder() {
    const error = document.getElementById("checkout-error");

    if (error) {
      error.textContent = "";
    }

    const cart = getCart();

    if (cart.length === 0) {
      if (error) {
        error.textContent =
          "Your cart is empty. Please add a product first.";
      }

      renderSummary();
      return;
    }

    const order = createOrder(cart);
    const message = makeWhatsAppMessage(order);

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.location.href = url;
  }

  const orderButton = document.getElementById(
    "whatsapp-order-button"
  );

  if (orderButton) {
    orderButton.addEventListener(
      "click",
      placeWhatsAppOrder
    );
  }

  document.addEventListener(
    "DOMContentLoaded",
    renderSummary
  );

  document.addEventListener(
    "atma:layout-ready",
    renderSummary
  );

  // Render immediately when the script loads.
  renderSummary();
})();

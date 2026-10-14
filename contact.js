
(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = document.getElementById("contact-status");
    status.textContent = "";

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      topic: String(data.get("topic") || "").trim(),
      message: String(data.get("message") || "").trim()
    };

    const text = [
      "Hello ATMA Beekeeper, I have an enquiry.",
      "",
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone || "Not provided"}`,
      `Enquiry: ${fields.topic}`,
      "",
      "Message:",
      fields.message
    ].join("\n");

    window.open(
      "https://wa.me/919440013202?text=" + encodeURIComponent(text),
      "_blank",
      "noopener,noreferrer"
    );

    status.textContent = "Your message has been prepared in WhatsApp. Review and send it there.";
    status.className = "form-success";
  });
})();

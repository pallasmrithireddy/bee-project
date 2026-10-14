
(() => {
  const header = `
    <div class="announcement-bar">
      Pure. Natural. Unprocessed. &nbsp; | &nbsp; From our apiaries to your home.
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="ATMA Beekeeper homepage">
          <img class="brand-logo" src="logo.jpeg" alt="ATMA Beekeeper logo">
          <span>
            <span class="brand-name">ATMA Beekeeper</span>
            <span class="brand-tagline">PURE & NATURAL HONEY</span>
          </span>
        </a>

        <nav class="main-nav" id="main-navigation" aria-label="Main navigation">
          <a class="nav-link" href="index.html">Home</a>
          <a class="nav-link" href="products.html">Our Honey</a>
          <a class="nav-link" href="about.html">Our Story</a>
          <a class="nav-link" href="founder.html">Founders</a>
          <a class="nav-link" href="gallery.html">Gallery</a>
          <a class="nav-link" href="contact.html">Contact</a>
        </nav>

        <div class="header-actions">
          <a class="cart-link" href="cart.html" aria-label="Shopping cart">
            Cart <span class="cart-count">0</span>
          </a>
          <a class="btn btn-primary btn-small" href="products.html">Shop Honey</a>
          <button class="menu-toggle" type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="main-navigation">☰</button>
        </div>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img class="footer-logo" src="logo.jpeg" alt="ATMA Beekeeper logo">
            <a class="brand-name" href="index.html">ATMA Beekeeper</a>
            <p class="footer-description">
              Nature's sweetness, straight from the hive.
              Natural honey and responsible beekeeping from Telangana.
            </p>
          </div>

          <div>
            <h3 class="footer-heading">Explore</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">Our Products</a></li>
              <li><a href="about.html">Our Story</a></li>
              <li><a href="founder.html">Our Founders</a></li>
              <li><a href="gallery.html">Beekeeping Gallery</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Customer Care</h3>
            <ul class="footer-links">
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="shipping-policy.html">Shipping Policy</a></li>
              <li><a href="refund-policy.html">Refund Policy</a></li>
              <li><a href="cancellation-policy.html">Cancellation Policy</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 class="footer-heading">Get in Touch</h3>
            <p class="footer-contact">
              H.No. 11-2-207/1/A/1<br>
              Seetharampur, Karimnagar – 505001<br>
              Telangana, India
            </p>
            <p class="footer-contact">
              <a href="tel:+919440013202">+91 94400 13202</a>
            </p>
            <p class="footer-contact">
              <a href="mailto:atmabeekeepers@gmail.com">
                atmabeekeepers@gmail.com
              </a>
            </p>
            <a class="btn btn-whatsapp btn-small"
              href="https://wa.me/919440013202"
              target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© <span class="current-year"></span> ATMA Beekeeper. All rights reserved.</p>
          <p>Pure Honey. Honest Promise.</p>
        </div>
      </div>
    </footer>`;

  function renderSharedLayout() {
    const headerTarget = document.getElementById("site-header");
    const footerTarget = document.getElementById("site-footer");

    if (headerTarget) headerTarget.innerHTML = header;
    if (footerTarget) footerTarget.innerHTML = footer;

    document.querySelectorAll(".current-year").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });

    const currentPage = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

    if (typeof window.updateCartCount === "function") {
      window.updateCartCount();
    }

    document.dispatchEvent(new Event("atma:layout-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderSharedLayout);
  } else {
    renderSharedLayout();
  }
})();

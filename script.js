
/*
 * ATMA Beekeeper compatibility script.
 * Shared navigation and cart-count functionality lives in main.js.
 * Reusable data helpers live in utilities.js.
 */

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });

    document.querySelectorAll("[data-back]").forEach((element) => {
      element.addEventListener("click", () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = "index.html";
        }
      });
    });
  });
})();

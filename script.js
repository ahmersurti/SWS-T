// SWS Trading Enterprises — website interactions
// IMPORTANT: Replace the placeholder WhatsApp number below with your business number.
// Use country code and digits only, e.g. 923001234567 (no +, spaces or dashes).
const SWS_WHATSAPP_NUMBER = "923000000000";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function openWhatsApp(message) {
  if (!SWS_WHATSAPP_NUMBER || SWS_WHATSAPP_NUMBER === "923000000000") {
    const formMessage = document.getElementById("formMessage");
    if (formMessage) {
      formMessage.textContent = "Setup needed: open script.js and replace SWS_WHATSAPP_NUMBER with your real WhatsApp business number, then try again.";
      formMessage.classList.add("visible");
    }
    return;
  }
  const url = `https://wa.me/${SWS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const productInput = document.querySelector('input[name="product"]');
    if (productInput) productInput.value = product;
    const quote = document.getElementById("quote");
    if (quote) quote.scrollIntoView({ behavior: "smooth" });
    if (productInput) window.setTimeout(() => productInput.focus({ preventScroll: true }), 350);
  });
});

const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const fields = [
      ["Product", data.get("product")],
      ["Quantity", data.get("quantity")],
      ["Specification", data.get("specification")],
      ["Country of origin preference", data.get("origin")],
      ["Delivery location", data.get("location")],
      ["Required timeline", data.get("timeline")],
      ["Contact name", data.get("customerName")],
      ["Phone / WhatsApp", data.get("phone")],
      ["Additional details", data.get("notes")]
    ];
    const lines = [
      "Assalam-o-Alaikum SWS Trading Enterprises,",
      "I would like to request a quotation with the following details:",
      "",
      ...fields.filter(([, value]) => String(value || "").trim()).map(([label, value]) => `${label}: ${String(value).trim()}`),
      "",
      "Please let me know the available sourcing options. Thank you."
    ];
    openWhatsApp(lines.join("\n"));
  });
}

const whatsappFloat = document.getElementById("whatsappFloat");
if (whatsappFloat) {
  whatsappFloat.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp("Assalam-o-Alaikum SWS Trading Enterprises, I would like to discuss a product sourcing requirement.");
  });
}

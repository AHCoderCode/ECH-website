/* ECH — EarlyChildHomeschooling
   Lightweight frontend interactions and centralized business details.
   No form data is stored or transmitted to an ECH server.
*/
(() => {
  "use strict";

  const ECH_CONFIG = Object.freeze({
    brandName: "ECH — EarlyChildHomeschooling",
    phoneDisplay: "03333375121",
    whatsappNumber: "92333375121",
    location: "Karachi, Pakistan",
    standardPrice: "$18.05",
    messages: {
      general: "Assalam-o-Alaikum! I would like to learn more about ECH — EarlyChildHomeschooling, including your preschool programs, teaching approach, availability, and fees.",
      age: "Assalam-o-Alaikum! I would like to ask about ECH — EarlyChildHomeschooling's preschool eligibility, age requirements, and current enrollment availability.",
      activities: "Assalam-o-Alaikum! I would like to know which learning activities and educational materials are currently available at ECH — EarlyChildHomeschooling.",
      parent: "Assalam-o-Alaikum! I would like to discuss my preschool child's learning needs and learn more about ECH — EarlyChildHomeschooling.",
      fees: "Assalam-o-Alaikum! I would like to know about ECH — EarlyChildHomeschooling's current programs, availability, standard price, billing period, and any additional fees.",
      location: "Assalam-o-Alaikum! Could you please share ECH — EarlyChildHomeschooling's specific location in Karachi, Pakistan, and any visiting arrangements?"
    }
  });

  const whatsappUrl = (message) =>
    "https://wa.me/" + ECH_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);

  // Populate all contact links from the same configuration, so the display
  // number and WhatsApp destination remain consistent across the site.
  document.querySelectorAll("[data-ech-phone]").forEach((element) => {
    element.textContent = ECH_CONFIG.phoneDisplay;
  });

  document.querySelectorAll("[data-ech-location]").forEach((element) => {
    element.textContent = ECH_CONFIG.location;
  });

  document.querySelectorAll("[data-standard-price]").forEach((element) => {
    element.textContent = ECH_CONFIG.standardPrice;
  });

  document.querySelectorAll("[data-wa-message]").forEach((link) => {
    const messageKey = link.getAttribute("data-wa-message");
    const message = ECH_CONFIG.messages[messageKey] || ECH_CONFIG.messages.general;
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // Accessible small-screen navigation.
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.getElementById("primary-nav");

  const closeMenu = (restoreFocus = false) => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (restoreFocus) menuToggle.focus();
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        primaryNav.classList.add("is-open");
        document.body.classList.add("menu-open");
      }
    });

    primaryNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  // Keep the native details/summary controls keyboard accessible while
  // allowing one FAQ answer to remain open at a time.
  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.open) otherItem.open = false;
      });
    });
  });

  // The form only prepares a WhatsApp draft. It does not claim to deliver or
  // store the inquiry; the visitor reviews and sends it in WhatsApp.
  const inquiryForm = document.getElementById("inquiry-form");
  const statusElement = document.getElementById("form-status");
  const fallbackLink = document.getElementById("whatsapp-fallback");

  if (inquiryForm && statusElement && fallbackLink) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!inquiryForm.reportValidity()) return;

      const formData = new FormData(inquiryForm);
      const parentName = String(formData.get("parentName") || "").trim();
      const childStage = String(formData.get("childStage") || "").trim();
      const topic = String(formData.get("topic") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const lines = [
        "Assalam-o-Alaikum! I am contacting " + ECH_CONFIG.brandName + ".",
        "",
        ...(parentName ? ["Parent/guardian name: " + parentName] : []),
        "Child's learning stage: " + childStage,
        "Topic: " + topic,
        ...(message ? ["Message: " + message] : []),
        "",
        "Please share the relevant program details, current availability, fees, and next steps."
      ];

      const url = whatsappUrl(lines.join("\n"));
      fallbackLink.href = url;
      fallbackLink.hidden = false;
      statusElement.textContent =
        "Your inquiry is ready to review in WhatsApp. Please press Send there. If a new tab did not open, use the link below.";

      // This is directly triggered by the user's form submission.
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
})();

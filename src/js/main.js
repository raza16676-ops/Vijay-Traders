// src/js/main.js
import { STORE_CONFIG, PRODUCTS } from "../data/store-data.js";
import { renderGlobalHeader, renderGlobalFooter, renderProductCard } from "./components.js";
import { addToCart, updateGlobalCartBadges } from "./cart.js";

export function initGlobalShell() {
  const headerMount = document.getElementById("global-header");
  const footerMount = document.getElementById("global-footer");

  if (headerMount) headerMount.innerHTML = renderGlobalHeader();
  if (footerMount) footerMount.innerHTML = renderGlobalFooter();

  updateGlobalCartBadges();
  initAnnouncementRotator();
  initMobileNavigation();
  initGlobalSearch();
  initGlobalQuickAdd();
  initNewsletterDemo();
}

function initAnnouncementRotator() {
  const textEl = document.getElementById("announcement-text");
  const prevBtn = document.getElementById("announcement-prev");
  const nextBtn = document.getElementById("announcement-next");
  if (!textEl) return;

  let idx = 0;
  const messages = STORE_CONFIG.announcements;

  const updateMsg = (newIndex) => {
    idx = (newIndex + messages.length) % messages.length;
    textEl.textContent = messages[idx];
  };

  prevBtn?.addEventListener("click", () => updateMsg(idx - 1));
  nextBtn?.addEventListener("click", () => updateMsg(idx + 1));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => updateMsg(idx + 1), 5000);
  }
}

function initMobileNavigation() {
  const openBtn = document.getElementById("mobile-menu-open");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");

  if (!openBtn || !drawer || !backdrop) return;

  const toggleDrawer = (isOpen) => {
    openBtn.setAttribute("aria-expanded", String(isOpen));
    drawer.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) {
      backdrop.classList.remove("hidden");
      requestAnimationFrame(() => {
        backdrop.classList.remove("opacity-0");
        drawer.classList.remove("-translate-x-full");
      });
      document.body.classList.add("overflow-hidden");
    } else {
      backdrop.classList.add("opacity-0");
      drawer.classList.add("-translate-x-full");
      setTimeout(() => backdrop.classList.add("hidden"), 300);
      document.body.classList.remove("overflow-hidden");
    }
  };

  openBtn.addEventListener("click", () => toggleDrawer(true));
  closeBtn?.addEventListener("click", () => toggleDrawer(false));
  backdrop.addEventListener("click", () => toggleDrawer(false));

  // Nested mobile subcategory accordions
  document.querySelectorAll("[data-mobile-accordion]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-mobile-accordion");
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      targetEl.classList.toggle("hidden", expanded);
      btn.querySelector("svg")?.classList.toggle("rotate-180", !expanded);
    });
  });
}

function initGlobalSearch() {
  const openBtn = document.getElementById("global-search-open");
  const closeBtn = document.getElementById("global-search-close");
  const modal = document.getElementById("global-search-modal");
  const input = document.getElementById("global-search-input");
  const resultsContainer = document.getElementById("global-search-results");

  if (!openBtn || !modal || !input || !resultsContainer) return;

  const openSearch = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    input.focus();
  };

  const closeSearch = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  openBtn.addEventListener("click", openSearch);
  closeBtn?.addEventListener("click", closeSearch);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeSearch();
    }
  });

  const executeSearch = (queryText) => {
    const q = queryText.trim().toLowerCase();
    if (!q) {
      resultsContainer.innerHTML = `<p class="text-xs text-neutral-500 uppercase tracking-wider">Enter a keyword above to search across products, brands, and combo deals.</p>`;
      return;
    }

    const matches = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-sm font-medium text-[#222222]">No products matched "${queryText}".</p>
          <p class="text-xs text-neutral-500 mt-1">Try searching for "Serum", "SPF", "Men", or "Combo".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="mb-3 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-neutral-500">${matches.length} Result${matches.length > 1 ? "s" : ""} Found</span>
        <a href="collection.html?q=${encodeURIComponent(queryText)}" class="text-xs font-semibold text-[#C62828] hover:underline">View All in Collection &rarr;</a>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        ${matches.slice(0, 6).map((p) => renderProductCard(p)).join("")}
      </div>
    `;
  };

  input.addEventListener("input", (e) => executeSearch(e.target.value));

  resultsContainer.addEventListener("click", (e) => {
    const suggestBtn = e.target.closest("[data-search-suggest]");
    if (suggestBtn) {
      const term = suggestBtn.getAttribute("data-search-suggest");
      input.value = term;
      executeSearch(term);
    }
  });
}

function initGlobalQuickAdd() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-quick-add]");
    if (!btn) return;
    const productId = btn.getAttribute("data-quick-add");
    addToCart(productId, null, 1);
  });
}

function initNewsletterDemo() {
  const form = document.getElementById("footer-newsletter-form");
  const feedback = document.getElementById("newsletter-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Thank you! (Prototype Demo: In Shopify, this submits to customer_form).";
    feedback.classList.remove("hidden");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", initGlobalShell);
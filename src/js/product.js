// src/js/product.js
import { PRODUCTS, formatMoney } from "../data/store-data.js";
import { addToCart } from "./cart.js";
import { renderProductCard } from "./components.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const handle = params.get("handle");
  const product = PRODUCTS.find((p) => p.handle === handle) || PRODUCTS[0];

  renderProductDetail(product);
  renderRelatedProducts(product);
});

function renderProductDetail(product) {
  document.title = `${product.title} | Vijay Traders`;
  document.getElementById("pdp-breadcrumb-cat").textContent = product.category.replace("-", " ");
  document.getElementById("pdp-breadcrumb-cat").href = `collection.html?category=${product.category}`;
  document.getElementById("pdp-breadcrumb-title").textContent = product.title;

  let selectedVariant = product.variants[0];
  let quantity = 1;

  const mount = document.getElementById("pdp-mount");
  const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;

  mount.innerHTML = `
    <!-- Left Column: Product Gallery -->
    <div class="lg:col-span-6 space-y-4">
      <div class="aspect-[4/5] bg-[#FAF8F8] border border-[#EAE4E4] rounded-sm overflow-hidden relative">
        <img
          id="pdp-main-image"
          src="${product.images[0]}"
          alt="${product.title}"
          width="800"
          height="1000"
          class="w-full h-full object-cover object-center transition-opacity duration-200"
        />
      </div>

      ${
        product.images.length > 1
          ? `<div class="grid grid-cols-4 gap-3" role="list" aria-label="Product image thumbnails">
              ${product.images
                .map(
                  (imgUrl, idx) => `
                <button
                  type="button"
                  data-thumb-url="${imgUrl}"
                  class="aspect-square rounded-sm overflow-hidden border-2 transition-colors ${
                    idx === 0 ? "border-[#C62828]" : "border-[#EAE4E4] hover:border-neutral-400"
                  }"
                  aria-label="View product image ${idx + 1}"
                >
                  <img src="${imgUrl}" alt="${product.title} thumbnail ${idx + 1}" class="w-full h-full object-cover" />
                </button>
              `
                )
                .join("")}
            </div>`
          : ""
      }
    </div>

    <!-- Right Column: Product Information & Interactive Accordions -->
    <div class="lg:col-span-6 space-y-6">
      <div class="border-b border-[#EAE4E4] pb-5">
        <div class="flex items-center justify-between gap-2">
          <a href="collection.html?brand=${encodeURIComponent(product.brand)}" class="text-xs font-bold uppercase tracking-[0.2em] text-[#C62828] hover:underline">
            ${product.brand}
          </a>
          <span id="pdp-sku" class="text-xs text-neutral-400">SKU: ${selectedVariant.sku}</span>
        </div>

        <h1 class="font-editorial text-3xl sm:text-4xl font-semibold text-[#222222] mt-2 leading-tight">
          ${product.title}
        </h1>

        <div class="mt-4 flex items-baseline gap-3 flex-wrap">
          <span id="pdp-price" class="text-2xl font-bold text-[#C62828]">${formatMoney(selectedVariant.price)}</span>
          <span id="pdp-compare-price" class="text-sm text-neutral-400 line-through ${hasDiscount ? "" : "hidden"}">
            ${hasDiscount ? formatMoney(selectedVariant.compareAtPrice) : ""}
          </span>
          <span id="pdp-stock-badge" class="ml-auto text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-sm ${
            selectedVariant.available ? "bg-[#FAF8F8] text-[#222222] border border-[#EAE4E4]" : "bg-neutral-200 text-neutral-600"
          }">
            ${selectedVariant.available ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p class="mt-4 text-sm text-neutral-600 leading-relaxed">
          ${product.shortDescription}
        </p>
      </div>

      <!-- Variant Selector -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-[#222222] mb-2.5">
          Select Option / Size
        </label>
        <div class="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Product Variants">
          ${product.variants
            .map(
              (v, idx) => `
            <button
              type="button"
              data-variant-id="${v.id}"
              aria-pressed="${idx === 0 ? "true" : "false"}"
              class="px-4 py-2 text-xs font-semibold rounded-sm border transition-colors ${
                idx === 0
                  ? "border-[#C62828] bg-[#C62828] text-white"
                  : "border-[#EAE4E4] bg-white text-[#222222] hover:border-[#C62828]"
              } ${!v.available ? "opacity-50" : ""}"
            >
              ${v.title} ${!v.available ? "(Sold Out)" : ""}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Quantity & Add to Cart Row -->
      <div class="flex items-stretch gap-3 pt-2">
        <div class="flex items-center border border-[#EAE4E4] rounded-sm bg-white">
          <button
            type="button"
            id="pdp-qty-minus"
            class="w-10 h-12 text-[#222222] hover:text-[#C62828] font-bold"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <input
            type="number"
            id="pdp-qty-input"
            value="1"
            min="1"
            max="20"
            aria-label="Product quantity"
            class="w-12 text-center text-sm font-semibold text-[#222222] focus:outline-none"
          />
          <button
            type="button"
            id="pdp-qty-plus"
            class="w-10 h-12 text-[#222222] hover:text-[#C62828] font-bold"
            aria-label="Increase quantity"
          >
            &#43;
          </button>
        </div>

        <button
          type="button"
          id="pdp-add-to-cart"
          class="flex-1 bg-[#C62828] hover:bg-[#E53935] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-sm transition-colors px-6 py-3.5"
        >
          Add to Bag
        </button>
      </div>

      <!-- Interactive Collapsible Accordions (Description, Benefits, Ingredients, How to Use) -->
      <div class="pt-4 divide-y divide-[#EAE4E4] border-t border-b border-[#EAE4E4]">
        
        <!-- 1. Interactive Description Accordion (Expanded by Default) -->
        <div>
          <button
            type="button"
            data-accordion-trigger="acc-description"
            aria-expanded="true"
            aria-controls="acc-description"
            class="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-widest text-[#222222] hover:text-[#C62828] transition-colors"
          >
            <span>Description</span>
            <svg data-accordion-icon class="w-4 h-4 transition-transform duration-200 rotate-180 text-[#C62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="acc-description" class="accordion-content" aria-hidden="false">
            <div class="accordion-inner pb-4 text-sm text-neutral-600 leading-relaxed space-y-2">
              <p>${product.description}</p>
            </div>
          </div>
        </div>

        <!-- 2. Interactive Benefits Accordion -->
        <div>
          <button
            type="button"
            data-accordion-trigger="acc-benefits"
            aria-expanded="true"
            aria-controls="acc-benefits"
            class="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-widest text-[#222222] hover:text-[#C62828] transition-colors"
          >
            <span>Key Benefits</span>
            <svg data-accordion-icon class="w-4 h-4 transition-transform duration-200 rotate-180 text-[#C62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="acc-benefits" class="accordion-content" aria-hidden="false">
            <div class="accordion-inner pb-4">
              <ul class="space-y-2 text-sm text-neutral-600">
                ${(product.benefits || [])
                  .map(
                    (b) => `<li class="flex items-start gap-2"><span class="text-[#C62828] font-bold">&bull;</span><span>${b}</span></li>`
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- 3. Ingredients Accordion -->
        <div>
          <button
            type="button"
            data-accordion-trigger="acc-ingredients"
            aria-expanded="false"
            aria-controls="acc-ingredients"
            class="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-widest text-[#222222] hover:text-[#C62828] transition-colors"
          >
            <span>Ingredients</span>
            <svg data-accordion-icon class="w-4 h-4 transition-transform duration-200 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="acc-ingredients" class="accordion-content" aria-hidden="true">
            <div class="accordion-inner pb-4 text-sm text-neutral-600 leading-relaxed">
              <p>${product.ingredients}</p>
            </div>
          </div>
        </div>

        <!-- 4. How to Use Accordion -->
        <div>
          <button
            type="button"
            data-accordion-trigger="acc-how-to-use"
            aria-expanded="false"
            aria-controls="acc-how-to-use"
            class="w-full py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-widest text-[#222222] hover:text-[#C62828] transition-colors"
          >
            <span>How to Use</span>
            <svg data-accordion-icon class="w-4 h-4 transition-transform duration-200 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="acc-how-to-use" class="accordion-content" aria-hidden="true">
            <div class="accordion-inner pb-4 text-sm text-neutral-600 leading-relaxed">
              <p>${product.howToUse}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Sync Sticky Bar
  const stickyTitle = document.getElementById("sticky-title");
  const stickyPrice = document.getElementById("sticky-price");
  if (stickyTitle) stickyTitle.textContent = product.title;
  if (stickyPrice) stickyPrice.textContent = formatMoney(selectedVariant.price);

  // Thumbnail Switcher
  const mainImg = document.getElementById("pdp-main-image");
  mount.querySelectorAll("[data-thumb-url]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mainImg.src = btn.getAttribute("data-thumb-url");
      mount.querySelectorAll("[data-thumb-url]").forEach((b) => {
        b.classList.remove("border-[#C62828]");
        b.classList.add("border-[#EAE4E4]");
      });
      btn.classList.add("border-[#C62828]");
      btn.classList.remove("border-[#EAE4E4]");
    });
  });

  // Variant Switcher
  mount.querySelectorAll("[data-variant-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const vId = btn.getAttribute("data-variant-id");
      const found = product.variants.find((v) => v.id === vId);
      if (!found) return;
      selectedVariant = found;

      mount.querySelectorAll("[data-variant-id]").forEach((b) => {
        const active = b.getAttribute("data-variant-id") === vId;
        b.setAttribute("aria-pressed", String(active));
        b.className = `px-4 py-2 text-xs font-semibold rounded-sm border transition-colors ${
          active
            ? "border-[#C62828] bg-[#C62828] text-white"
            : "border-[#EAE4E4] bg-white text-[#222222] hover:border-[#C62828]"
        }`;
      });

      document.getElementById("pdp-price").textContent = formatMoney(selectedVariant.price);
      document.getElementById("pdp-sku").textContent = `SKU: ${selectedVariant.sku}`;
      if (stickyPrice) stickyPrice.textContent = formatMoney(selectedVariant.price);

      const cmpEl = document.getElementById("pdp-compare-price");
      if (selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price) {
        cmpEl.textContent = formatMoney(selectedVariant.compareAtPrice);
        cmpEl.classList.remove("hidden");
      } else {
        cmpEl.classList.add("hidden");
      }

      const addBtn = document.getElementById("pdp-add-to-cart");
      if (!selectedVariant.available) {
        addBtn.textContent = "Out of Stock";
        addBtn.disabled = true;
        addBtn.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        addBtn.textContent = "Add to Bag";
        addBtn.disabled = false;
        addBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }
    });
  });

  // Quantity Controls
  const qtyInput = document.getElementById("pdp-qty-input");
  document.getElementById("pdp-qty-minus")?.addEventListener("click", () => {
    quantity = Math.max(1, Number(qtyInput.value) - 1);
    qtyInput.value = quantity;
  });
  document.getElementById("pdp-qty-plus")?.addEventListener("click", () => {
    quantity = Math.min(20, Number(qtyInput.value) + 1);
    qtyInput.value = quantity;
  });
  qtyInput?.addEventListener("change", (e) => {
    quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    qtyInput.value = quantity;
  });

  // Add to Cart Triggers
  const handleAdd = () => {
    addToCart(product.id, selectedVariant.id, quantity);
  };
  document.getElementById("pdp-add-to-cart")?.addEventListener("click", handleAdd);
  document.getElementById("sticky-add-btn")?.addEventListener("click", handleAdd);

  // Accessible Accordion Controller
  mount.querySelectorAll("[data-accordion-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-accordion-trigger");
      const content = document.getElementById(targetId);
      const icon = trigger.querySelector("[data-accordion-icon]");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isExpanded));
      content?.setAttribute("aria-hidden", String(isExpanded));
      icon?.classList.toggle("rotate-180", !isExpanded);
      icon?.classList.toggle("text-[#C62828]", !isExpanded);
    });
  });
}

function renderRelatedProducts(currentProduct) {
  const grid = document.getElementById("pdp-related-grid");
  if (!grid) return;

  const related = PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 4);
  grid.innerHTML = related.map((p) => renderProductCard(p)).join("");
}
// src/js/cart-page.js
import { STORE_CONFIG, formatMoney } from "../data/store-data.js";
import { getCart, updateCartItemQuantity, removeCartItem, getCartTotals } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  window.addEventListener("vt:cart-updated", renderCartPage);
});

function renderCartPage() {
  const mount = document.getElementById("cart-page-mount");
  if (!mount) return;

  const items = getCart();
  const { itemCount, subtotal, totalSavings } = getCartTotals();

  if (items.length === 0) {
    mount.innerHTML = `
      <div class="bg-[#FAF8F8] border border-[#EAE4E4] rounded-sm p-10 sm:p-16 text-center max-w-2xl mx-auto my-6">
        <h2 class="font-editorial text-3xl font-semibold text-[#222222]">Your Bag is Currently Empty</h2>
        <p class="text-sm text-neutral-600 mt-2">
          Explore our skincare serums, fluid sunscreens, makeup essentials, or curated combo deals to begin building your routine.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <a href="collection.html" class="px-7 py-3 bg-[#C62828] hover:bg-[#E53935] text-white text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors">
            Explore Products
          </a>
          <a href="collection.html?category=combo-deals" class="px-7 py-3 bg-white border border-[#222222] hover:border-[#C62828] text-[#222222] hover:text-[#C62828] text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors">
            View Combo Deals
          </a>
        </div>

        <!-- Direct Customer Assistance Links Even When Cart is Empty -->
        <div class="mt-10 pt-8 border-t border-[#EAE4E4]">
          <p class="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Need Help Choosing a Routine?</p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href="${STORE_CONFIG.contact.phoneHref}" class="inline-flex items-center gap-2 px-5 py-2.5 border border-[#222222] text-xs font-semibold uppercase tracking-wider rounded-sm hover:border-[#C62828] hover:text-[#C62828]">
              Call Us Now (${STORE_CONFIG.contact.phoneDisplay})
            </a>
            <a href="${STORE_CONFIG.contact.whatsappHref}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C62828] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#E53935]">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  mount.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- Cart Items Table -->
      <div class="lg:col-span-8 divide-y divide-[#EAE4E4] border-t border-b border-[#EAE4E4]">
        ${items
          .map(
            (item) => `
          <div class="py-5 flex gap-4 sm:gap-6 items-start">
            <a href="product.html?handle=${encodeURIComponent(item.handle)}" class="w-20 h-24 sm:w-24 sm:h-32 bg-[#FAF8F8] border border-[#EAE4E4] rounded-sm overflow-hidden shrink-0">
              <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
            </a>

            <div class="flex-1 min-w-0">
              <p class="text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">${item.brand}</p>
              <h2 class="text-sm sm:text-base font-semibold text-[#222222] mt-0.5">
                <a href="product.html?handle=${encodeURIComponent(item.handle)}" class="hover:text-[#C62828]">${item.title}</a>
              </h2>
              <p class="text-xs text-neutral-500 mt-1">Option: ${item.variantTitle}</p>
              <p class="text-sm font-bold text-[#C62828] mt-2">${formatMoney(item.price)}</p>

              <div class="mt-3 flex items-center gap-4 flex-wrap">
                <div class="inline-flex items-center border border-[#EAE4E4] rounded-sm bg-white">
                  <button
                    type="button"
                    data-cart-dec="${item.productId}"
                    data-variant="${item.variantId}"
                    class="w-8 h-8 text-sm font-bold hover:text-[#C62828]"
                    aria-label="Decrease quantity for ${item.title}"
                  >&minus;</button>
                  <span class="w-8 text-center text-xs font-semibold">${item.quantity}</span>
                  <button
                    type="button"
                    data-cart-inc="${item.productId}"
                    data-variant="${item.variantId}"
                    class="w-8 h-8 text-sm font-bold hover:text-[#C62828]"
                    aria-label="Increase quantity for ${item.title}"
                  >&#43;</button>
                </div>

                <button
                  type="button"
                  data-cart-remove="${item.productId}"
                  data-variant="${item.variantId}"
                  class="text-xs text-neutral-500 hover:text-[#C62828] underline"
                >
                  Remove
                </button>
              </div>
            </div>

            <div class="text-right shrink-0">
              <span class="text-sm sm:text-base font-bold text-[#222222]">${formatMoney(item.price * item.quantity)}</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Order Summary & Direct Communication Options -->
      <aside class="lg:col-span-4 space-y-6">
        <div class="bg-[#FAF8F8] border border-[#EAE4E4] rounded-sm p-6 space-y-4">
          <h2 class="text-xs font-bold uppercase tracking-widest text-[#222222] pb-3 border-b border-[#EAE4E4]">
            Order Summary (${itemCount} Item${itemCount > 1 ? "s" : ""})
          </h2>

          ${
            totalSavings > 0
              ? `<div class="flex items-center justify-between text-xs text-[#C62828] font-semibold">
                  <span>Verified Discount / Bundle Savings</span>
                  <span>&minus; ${formatMoney(totalSavings)}</span>
                </div>`
              : ""
          }

          <div class="flex items-baseline justify-between pt-2">
            <span class="text-sm font-semibold text-[#222222]">Subtotal</span>
            <span class="text-xl font-bold text-[#C62828]">${formatMoney(subtotal)}</span>
          </div>

          <p class="text-xs text-neutral-500 leading-relaxed">
            Shipping rates and applicable taxes are calculated during Shopify Checkout.
          </p>

          <button
            type="button"
            id="prototype-checkout-btn"
            class="w-full py-3.5 px-6 bg-[#C62828] hover:bg-[#E53935] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-sm transition-colors shadow-sm"
          >
            Proceed to Checkout
          </button>

          <p id="checkout-demo-note" class="hidden text-xs text-[#222222] bg-white p-3 border border-[#C62828] rounded-sm">
            <strong>Prototype Demonstration Note:</strong> In the live Shopify store, this button submits <code>/cart</code> directly to Shopify's secure native checkout.
          </p>
        </div>

        <!-- Required Cart Page Communication Block: Call Us Now & WhatsApp -->
        <div class="bg-white border border-[#EAE4E4] rounded-sm p-6 space-y-3.5">
          <span class="text-[11px] font-bold uppercase tracking-widest text-[#C62828]">Customer Assistance</span>
          <h3 class="font-editorial text-xl font-semibold text-[#222222]">Have Questions About Your Bag?</h3>
          <p class="text-xs text-neutral-600 leading-relaxed">
            Speak directly with our team for product inquiries or assistance before completing your purchase. <span class="italic">(Placeholder numbers shown—replace before launch).</span>
          </p>
          <div class="space-y-2.5 pt-1">
            <a
              href="${STORE_CONFIG.contact.phoneHref}"
              class="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-[#222222] text-[#222222] hover:border-[#C62828] hover:text-[#C62828] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>Call Us Now</span>
            </a>
            <a
              href="${STORE_CONFIG.contact.whatsappHref}"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#C62828] hover:bg-[#E53935] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  `;

  mount.querySelectorAll("[data-cart-inc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-cart-inc");
      const vId = btn.getAttribute("data-variant");
      const current = items.find((i) => i.productId === pId && i.variantId === vId);
      if (current) updateCartItemQuantity(pId, vId, current.quantity + 1);
    });
  });

  mount.querySelectorAll("[data-cart-dec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-cart-dec");
      const vId = btn.getAttribute("data-variant");
      const current = items.find((i) => i.productId === pId && i.variantId === vId);
      if (current) updateCartItemQuantity(pId, vId, current.quantity - 1);
    });
  });

  mount.querySelectorAll("[data-cart-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(btn.getAttribute("data-cart-remove"), btn.getAttribute("data-variant"));
    });
  });

  document.getElementById("prototype-checkout-btn")?.addEventListener("click", () => {
    document.getElementById("checkout-demo-note")?.classList.remove("hidden");
  });
}
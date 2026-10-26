// src/js/cart.js
import { PRODUCTS, formatMoney } from "../data/store-data.js";

const CART_STORAGE_KEY = "vijay_traders_cart_v1";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
    return [];
  }
}

export function saveCart(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    updateGlobalCartBadges();
    window.dispatchEvent(new CustomEvent("vt:cart-updated", { detail: { cart: cartItems } }));
  } catch (e) {
    console.error("Failed to save cart", e);
  }
}

export function addToCart(productId, variantId = null, quantity = 1) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return false;

  const chosenVariant = variantId
    ? product.variants.find((v) => v.id === variantId) || product.variants[0]
    : product.variants[0];

  if (!chosenVariant || !chosenVariant.available) {
    showToast("Selected option is currently out of stock.", "error");
    return false;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => item.productId === product.id && item.variantId === chosenVariant.id
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += Number(quantity);
  } else {
    cart.push({
      productId: product.id,
      handle: product.handle,
      variantId: chosenVariant.id,
      title: product.title,
      brand: product.brand,
      variantTitle: chosenVariant.title,
      price: chosenVariant.price,
      compareAtPrice: chosenVariant.compareAtPrice,
      image: product.images[0],
      sku: chosenVariant.sku,
      quantity: Number(quantity)
    });
  }

  saveCart(cart);
  showToast(`Added "${product.title}" to your bag.`);
  return true;
}

export function updateCartItemQuantity(productId, variantId, newQty) {
  let cart = getCart();
  const qty = parseInt(newQty, 10);

  if (qty <= 0) {
    cart = cart.filter((item) => !(item.productId === productId && item.variantId === variantId));
  } else {
    const idx = cart.findIndex((item) => item.productId === productId && item.variantId === variantId);
    if (idx > -1) {
      cart[idx].quantity = qty;
    }
  }
  saveCart(cart);
}

export function removeCartItem(productId, variantId) {
  const cart = getCart().filter(
    (item) => !(item.productId === productId && item.variantId === variantId)
  );
  saveCart(cart);
  showToast("Item removed from your bag.");
}

export function getCartTotals() {
  const cart = getCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cart.reduce((sum, item) => {
    if (item.compareAtPrice && item.compareAtPrice > item.price) {
      return sum + (item.compareAtPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  return { itemCount, subtotal, totalSavings };
}

export function updateGlobalCartBadges() {
  const { itemCount } = getCartTotals();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = itemCount;
    el.setAttribute("aria-label", `${itemCount} items in cart`);
  });
}

export function showToast(message, type = "success") {
  let container = document.getElementById("vt-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "vt-toast-container";
    container.setAttribute("aria-live", "polite");
    container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const bgClass = type === "error" ? "bg-[#222222] border-l-4 border-[#E53935]" : "bg-[#222222] border-l-4 border-[#C62828]";
  toast.className = `${bgClass} text-white px-4 py-3.5 rounded shadow-lg flex items-center justify-between gap-3 pointer-events-auto text-sm transition-opacity duration-300`;
  toast.innerHTML = `
    <div class="flex items-center gap-2.5">
      <span class="inline-block w-2 h-2 rounded-full bg-[#E53935] shrink-0"></span>
      <span>${message}</span>
    </div>
    <a href="cart.html" class="text-xs font-semibold uppercase tracking-wider underline text-white hover:text-[#EAE4E4] shrink-0">View Bag</a>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}
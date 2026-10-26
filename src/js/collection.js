// src/js/collection.js
import { CATEGORIES, PRODUCTS } from "../data/store-data.js";
import { renderProductCard } from "./components.js";

const ITEMS_PER_PAGE = 6;

const state = {
  category: null,
  sub: null,
  brand: null,
  productType: "all",
  maxPrice: 10000,
  inStockOnly: false,
  searchQuery: "",
  sort: "featured",
  page: 1
};

document.addEventListener("DOMContentLoaded", () => {
  parseUrlParams();
  renderCollectionHeader();
  renderFilterControls();
  applyFiltersAndRender();
  bindFilterDrawerEvents();
});

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  state.category = params.get("category") || null;
  state.sub = params.get("sub") || null;
  state.brand = params.get("brand") || null;
  state.searchQuery = params.get("q") || "";
  state.sort = params.get("sort") || "featured";

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      state.page = 1;
      applyFiltersAndRender();
    });
  }
}

function renderCollectionHeader() {
  const titleEl = document.getElementById("collection-title");
  const descEl = document.getElementById("collection-description");
  const crumbEl = document.getElementById("breadcrumb-current");
  const pillsEl = document.getElementById("subcategory-pills");

  const activeCat = CATEGORIES.find((c) => c.handle === state.category);

  if (activeCat) {
    titleEl.textContent = activeCat.title;
    descEl.textContent = activeCat.bannerDesc;
    crumbEl.textContent = activeCat.title;

    if (activeCat.subcategories && activeCat.subcategories.length > 0) {
      pillsEl.classList.remove("hidden");
      pillsEl.innerHTML = `
        <a
          href="collection.html?category=${activeCat.handle}"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-sm border transition-colors ${
            !state.sub
              ? "bg-[#C62828] text-white border-[#C62828]"
              : "bg-white text-[#222222] border-[#EAE4E4] hover:border-[#C62828]"
          }"
        >
          All ${activeCat.title}
        </a>
        ${activeCat.subcategories
          .map(
            (sub) => `
          <a
            href="collection.html?category=${activeCat.handle}&sub=${sub.id}"
            class="px-3.5 py-1.5 text-xs font-semibold rounded-sm border transition-colors ${
              state.sub === sub.id
                ? "bg-[#C62828] text-white border-[#C62828]"
                : "bg-white text-[#222222] border-[#EAE4E4] hover:border-[#C62828]"
            }"
          >
            ${sub.title}
          </a>
        `
          )
          .join("")}
      `;
    } else {
      pillsEl.classList.add("hidden");
    }
  } else if (state.brand) {
    titleEl.textContent = state.brand;
    descEl.textContent = `Showing sample products under ${state.brand}.`;
    crumbEl.textContent = state.brand;
  } else if (state.searchQuery) {
    titleEl.textContent = `Search: "${state.searchQuery}"`;
    descEl.textContent = `Showing catalogue matches for "${state.searchQuery}".`;
    crumbEl.textContent = "Search Results";
  }
}

function renderFilterControls() {
  const uniqueBrands = [...new Set(PRODUCTS.map((p) => p.brand))];
  const uniqueTypes = [...new Set(PRODUCTS.map((p) => p.productType))];

  const buildFilterMarkup = (prefix) => `
    <!-- Category Filter -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-widest text-[#222222] mb-3 pb-1.5 border-b border-[#EAE4E4]">Department</h3>
      <ul class="space-y-2 text-sm">
        <li>
          <a href="collection.html" class="${!state.category ? "font-bold text-[#C62828]" : "text-neutral-700 hover:text-[#C62828]"}">All Departments</a>
        </li>
        ${CATEGORIES.filter((c) => c.id !== "brands")
          .map(
            (c) => `
          <li>
            <a href="collection.html?category=${c.handle}" class="${
              state.category === c.handle ? "font-bold text-[#C62828]" : "text-neutral-700 hover:text-[#C62828]"
            }">${c.title}</a>
          </li>`
          )
          .join("")}
      </ul>
    </div>

    <!-- Product Type Filter -->
    <div>
      <label for="${prefix}-type-select" class="block text-xs font-bold uppercase tracking-widest text-[#222222] mb-2">Product Type</label>
      <select id="${prefix}-type-select" data-filter-type class="w-full text-sm border border-[#EAE4E4] rounded-sm px-3 py-2 bg-white">
        <option value="all">All Types</option>
        ${uniqueTypes.map((t) => `<option value="${t}" ${state.productType === t ? "selected" : ""}>${t}</option>`).join("")}
      </select>
    </div>

    <!-- Brand Filter -->
    <div>
      <label for="${prefix}-brand-select" class="block text-xs font-bold uppercase tracking-widest text-[#222222] mb-2">Brand</label>
      <select id="${prefix}-brand-select" data-filter-brand class="w-full text-sm border border-[#EAE4E4] rounded-sm px-3 py-2 bg-white">
        <option value="">All Brands</option>
        ${uniqueBrands.map((b) => `<option value="${b}" ${state.brand === b ? "selected" : ""}>${b}</option>`).join("")}
      </select>
    </div>

    <!-- Max Price Filter -->
    <div>
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#222222] mb-2">
        <label for="${prefix}-price-range">Max Price</label>
        <span data-price-label class="text-[#C62828]">Rs. ${state.maxPrice.toLocaleString()}</span>
      </div>
      <input
        type="range"
        id="${prefix}-price-range"
        data-filter-price
        min="1500"
        max="10000"
        step="250"
        value="${state.maxPrice}"
        class="w-full accent-[#C62828]"
      />
    </div>

    <!-- Availability Checkbox -->
    <div class="pt-2">
      <label class="inline-flex items-center gap-2 text-sm text-[#222222] cursor-pointer">
        <input type="checkbox" data-filter-stock ${state.inStockOnly ? "checked" : ""} class="accent-[#C62828] w-4 h-4" />
        <span>In Stock Only</span>
      </label>
    </div>
  `;

  const desktopMount = document.getElementById("desktop-filter-container");
  const mobileMount = document.getElementById("mobile-filter-container");
  if (desktopMount) desktopMount.innerHTML = buildFilterMarkup("desk");
  if (mobileMount) mobileMount.innerHTML = buildFilterMarkup("mob");

  document.querySelectorAll("[data-filter-type]").forEach((el) => {
    el.addEventListener("change", (e) => {
      state.productType = e.target.value;
      state.page = 1;
      syncFilterInputs();
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll("[data-filter-brand]").forEach((el) => {
    el.addEventListener("change", (e) => {
      state.brand = e.target.value || null;
      state.page = 1;
      syncFilterInputs();
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll("[data-filter-price]").forEach((el) => {
    el.addEventListener("input", (e) => {
      state.maxPrice = Number(e.target.value);
      state.page = 1;
      document.querySelectorAll("[data-price-label]").forEach((lbl) => {
        lbl.textContent = `Rs. ${state.maxPrice.toLocaleString()}`;
      });
      applyFiltersAndRender();
    });
  });

  document.querySelectorAll("[data-filter-stock]").forEach((el) => {
    el.addEventListener("change", (e) => {
      state.inStockOnly = e.target.checked;
      state.page = 1;
      syncFilterInputs();
      applyFiltersAndRender();
    });
  });

  document.getElementById("reset-filters-btn")?.addEventListener("click", () => {
    state.productType = "all";
    state.brand = null;
    state.maxPrice = 10000;
    state.inStockOnly = false;
    state.page = 1;
    renderFilterControls();
    applyFiltersAndRender();
  });
}

function syncFilterInputs() {
  document.querySelectorAll("[data-filter-type]").forEach((el) => (el.value = state.productType));
  document.querySelectorAll("[data-filter-brand]").forEach((el) => (el.value = state.brand || ""));
  document.querySelectorAll("[data-filter-stock]").forEach((el) => (el.checked = state.inStockOnly));
}

function applyFiltersAndRender() {
  let filtered = PRODUCTS.filter((p) => {
    if (state.category) {
      if (state.category === "women") {
        // Include Women + Make-up when browsing top-level Women unless specific sub chosen
        if (p.category !== "women" && p.category !== "make-up") return false;
      } else if (p.category !== state.category) {
        return false;
      }
    }
    if (state.sub && p.subcategory !== state.sub) return false;
    if (state.brand && p.brand !== state.brand) return false;
    if (state.productType !== "all" && p.productType !== state.productType) return false;
    if (p.price > state.maxPrice) return false;
    if (state.inStockOnly && !p.available) return false;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  if (state.sort === "best-selling") {
    filtered.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
  } else if (state.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sort === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  const countEl = document.getElementById("collection-product-count");
  const gridEl = document.getElementById("collection-products-grid");
  const emptyEl = document.getElementById("collection-empty-state");
  const paginationEl = document.getElementById("collection-pagination");

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? "" : "s"}`;
  }

  if (filtered.length === 0) {
    gridEl.innerHTML = "";
    emptyEl.classList.remove("hidden");
    paginationEl.innerHTML = "";
    return;
  }

  emptyEl.classList.add("hidden");

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (state.page > totalPages) state.page = 1;
  const start = (state.page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  gridEl.innerHTML = paginated.map((p) => renderProductCard(p)).join("");

  // Render Pagination
  if (totalPages > 1) {
    paginationEl.innerHTML = Array.from({ length: totalPages }, (_, i) => {
      const pageNum = i + 1;
      const active = pageNum === state.page;
      return `
        <button
          type="button"
          data-page="${pageNum}"
          aria-current="${active ? "page" : "false"}"
          class="w-9 h-9 text-xs font-semibold rounded-sm border transition-colors ${
            active
              ? "bg-[#C62828] text-white border-[#C62828]"
              : "bg-white text-[#222222] border-[#EAE4E4] hover:border-[#C62828]"
          }"
        >
          ${pageNum}
        </button>
      `;
    }).join("");

    paginationEl.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.page = Number(btn.getAttribute("data-page"));
        applyFiltersAndRender();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  } else {
    paginationEl.innerHTML = "";
  }
}

function bindFilterDrawerEvents() {
  const openBtn = document.getElementById("mobile-filter-open");
  const closeBtn = document.getElementById("mobile-filter-close");
  const applyBtn = document.getElementById("mobile-filter-apply");
  const drawer = document.getElementById("mobile-filter-drawer");
  const backdrop = document.getElementById("mobile-filter-backdrop");

  const toggle = (open) => {
    drawer?.setAttribute("aria-hidden", String(!open));
    backdrop?.classList.toggle("hidden", !open);
    drawer?.classList.toggle("translate-x-full", !open);
  };

  openBtn?.addEventListener("click", () => toggle(true));
  closeBtn?.addEventListener("click", () => toggle(false));
  applyBtn?.addEventListener("click", () => toggle(false));
  backdrop?.addEventListener("click", () => toggle(false));
}
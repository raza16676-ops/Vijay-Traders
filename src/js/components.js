// src/js/components.js
import { STORE_CONFIG, CATEGORIES, formatMoney } from "../data/store-data.js";

/**
 * Reusable Product Card Snippet (Maps to snippets/card-product.liquid)
 */
export function renderProductCard(product) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const savingsPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return `
    <article class="group bg-white border border-[#EAE4E4] rounded-sm flex flex-col justify-between overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div>
        <div class="relative aspect-[4/5] bg-[#FAF8F8] overflow-hidden">
          <a href="product.html?handle=${encodeURIComponent(product.handle)}" class="block w-full h-full focus:outline-none" aria-label="View details for ${product.title}">
            <img
              src="${primaryImage}"
              alt="${product.title}"
              loading="lazy"
              width="400"
              height="500"
              class="product-card-img w-full h-full object-cover object-center"
            />
          </a>
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1.5 pointer-events-none">
            ${
              hasDiscount
                ? `<span class="bg-[#C62828] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">Save ${savingsPercent}%</span>`
                : ""
            }
            ${
              product.isCombo
                ? `<span class="bg-[#222222] text-white text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm">Combo Deal</span>`
                : ""
            }
          </div>
        </div>

        <div class="p-3.5 sm:p-4">
          <p class="text-[11px] uppercase tracking-widest text-neutral-500 font-medium mb-1 truncate">${product.brand}</p>
          <h3 class="text-sm sm:text-[15px] font-medium text-[#222222] leading-snug line-clamp-2 min-h-[2.5rem]">
            <a href="product.html?handle=${encodeURIComponent(product.handle)}" class="hover:text-[#C62828] transition-colors">
              ${product.title}
            </a>
          </h3>

          ${
            product.isCombo && product.includedItems
              ? `<p class="mt-1.5 text-xs text-neutral-600 line-clamp-1">Includes ${product.includedItems.length} full-size items</p>`
              : ""
          }

          <div class="mt-2.5 flex items-baseline gap-2 flex-wrap">
            <span class="text-sm sm:text-base font-bold text-[#C62828]">${formatMoney(product.price)}</span>
            ${
              hasDiscount
                ? `<span class="text-xs text-neutral-400 line-through">${formatMoney(product.compareAtPrice)}</span>`
                : ""
            }
          </div>
        </div>
      </div>

      <div class="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1">
        <button
          type="button"
          data-quick-add="${product.id}"
          class="w-full py-2.5 px-3 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-[#C62828] text-[#C62828] bg-white hover:bg-[#C62828] hover:text-white active:bg-[#E53935] transition-colors rounded-sm focus:outline-none"
        >
          Add to Bag
        </button>
      </div>
    </article>
  `;
}

/**
 * Renders Announcement Bar + Sticky Header + Desktop Dropdowns + Mobile Drawer + Search Modal
 */
export function renderGlobalHeader() {
  const womenCat = CATEGORIES.find((c) => c.id === "women");
  const menCat = CATEGORIES.find((c) => c.id === "men");
  const makeupCat = CATEGORIES.find((c) => c.id === "make-up");

  return `
    <!-- Skip to Content Link for Keyboard Accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#C62828] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
      Skip to main content
    </a>

    <!-- Section: Announcement Bar (sections/announcement-bar.liquid) -->
    <div class="bg-[#C62828] text-white text-xs sm:text-[13px] py-2 px-4 border-b border-[#E53935]/30">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <button type="button" id="announcement-prev" class="hidden sm:inline-flex p-1 hover:opacity-80" aria-label="Previous announcement">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <p id="announcement-text" class="text-center font-medium tracking-wide mx-auto truncate" aria-live="polite">
          ${STORE_CONFIG.announcements[0]}
        </p>
        <button type="button" id="announcement-next" class="hidden sm:inline-flex p-1 hover:opacity-80" aria-label="Next announcement">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    <!-- Section: Sticky Header (sections/header.liquid) -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#EAE4E4]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Left: Mobile Hamburger + Brand Logo -->
          <div class="flex items-center gap-3 sm:gap-6">
            <button
              type="button"
              id="mobile-menu-open"
              class="lg:hidden p-2 -ml-2 text-[#222222] hover:text-[#C62828] transition-colors"
              aria-label="Open navigation menu"
              aria-expanded="false"
              aria-controls="mobile-nav-drawer"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <a href="index.html" class="flex flex-col group focus:outline-none">
              <span class="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#222222] group-hover:text-[#C62828] transition-colors">
                VIJAY <span class="text-[#C62828]">TRADERS</span>
              </span>
              <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-neutral-500 -mt-1">
                Cosmetics &amp; Skincare
              </span>
            </a>
          </div>

          <!-- Center: Desktop Main Navigation with Dropdowns -->
          <nav class="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            
            <!-- Women Mega/Dropdown (Includes Make-up Hierarchy) -->
            <div class="relative group py-6">
              <a
                href="collection.html?category=women"
                class="inline-flex items-center gap-1 text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors"
              >
                <span>Women</span>
                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </a>
              <!-- Dropdown Panel -->
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-200 absolute left-0 top-full w-[520px] bg-white border border-[#EAE4E4] shadow-xl rounded-sm p-6 grid grid-cols-2 gap-6 z-50">
                <div>
                  <a href="collection.html?category=women" class="text-xs font-bold uppercase tracking-wider text-[#C62828] block mb-3 pb-1.5 border-b border-[#EAE4E4]">
                    Women's Skincare &amp; Care
                  </a>
                  <ul class="space-y-2 text-sm">
                    ${womenCat.subcategories
                      .map(
                        (sub) => `
                      <li>
                        <a href="collection.html?category=women&sub=${sub.id}" class="text-neutral-700 hover:text-[#C62828] block py-0.5 transition-colors">
                          ${sub.title}
                        </a>
                      </li>`
                      )
                      .join("")}
                  </ul>
                </div>
                <div>
                  <a href="collection.html?category=make-up" class="text-xs font-bold uppercase tracking-wider text-[#C62828] block mb-3 pb-1.5 border-b border-[#EAE4E4]">
                    Make-up Studio
                  </a>
                  <ul class="space-y-2 text-sm">
                    ${makeupCat.subcategories
                      .map(
                        (sub) => `
                      <li>
                        <a href="collection.html?category=make-up&sub=${sub.id}" class="text-neutral-700 hover:text-[#C62828] block py-0.5 transition-colors">
                          ${sub.title}
                        </a>
                      </li>`
                      )
                      .join("")}
                    <li class="pt-2">
                      <a href="collection.html?category=make-up" class="text-xs font-semibold text-[#C62828] hover:underline">
                        View All Make-up &rarr;
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Men Dropdown -->
            <div class="relative group py-6">
              <a
                href="collection.html?category=men"
                class="inline-flex items-center gap-1 text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors"
              >
                <span>Men</span>
                <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </a>
              <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-200 absolute left-0 top-full w-64 bg-white border border-[#EAE4E4] shadow-xl rounded-sm p-5 z-50">
                <a href="collection.html?category=men" class="text-xs font-bold uppercase tracking-wider text-[#C62828] block mb-3 pb-1.5 border-b border-[#EAE4E4]">
                  Men's Grooming
                </a>
                <ul class="space-y-2 text-sm">
                  ${menCat.subcategories
                    .map(
                      (sub) => `
                    <li>
                      <a href="collection.html?category=men&sub=${sub.id}" class="text-neutral-700 hover:text-[#C62828] block py-0.5 transition-colors">
                        ${sub.title}
                      </a>
                    </li>`
                    )
                    .join("")}
                </ul>
              </div>
            </div>

            <!-- Make-up Direct Access -->
            <a href="collection.html?category=make-up" class="text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors">
              Make-up
            </a>

            <!-- Sun Protection -->
            <a href="collection.html?category=sun-protection" class="text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors">
              Sun Protection
            </a>

            <!-- Mother & Baby -->
            <a href="collection.html?category=mother-baby" class="text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors">
              Mother &amp; Baby
            </a>

            <!-- Brands -->
            <a href="brands.html" class="text-sm font-medium text-[#222222] hover:text-[#C62828] transition-colors">
              Brands
            </a>

            <!-- Combo Deals -->
            <a href="collection.html?category=combo-deals" class="text-sm font-semibold text-[#C62828] hover:text-[#E53935] transition-colors flex items-center gap-1">
              <span>Combo Deals</span>
              <span class="bg-[#FAF8F8] border border-[#C62828]/30 text-[#C62828] text-[10px] px-1.5 py-0.2 rounded-sm">SAVE</span>
            </a>
          </nav>

          <!-- Right: Search, Account Placeholder, Cart Bag -->
          <div class="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              id="global-search-open"
              class="p-2 text-[#222222] hover:text-[#C62828] transition-colors flex items-center gap-1.5"
              aria-label="Open product search"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-4.35-4.35M16.65 10.825a5.825 5.825 0 11-11.65 0 5.825 5.825 0 0111.65 0z"/>
              </svg>
              <span class="hidden xl:inline text-xs font-medium uppercase tracking-wider">Search</span>
            </button>

            <a
              href="contact.html"
              class="hidden sm:inline-flex p-2 text-[#222222] hover:text-[#C62828] transition-colors"
              aria-label="Customer Support and Account Info"
              title="Support & Store Info"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </a>

            <a
              href="cart.html"
              class="relative p-2 text-[#222222] hover:text-[#C62828] transition-colors flex items-center gap-1.5"
              aria-label="Shopping bag"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span
                data-cart-count
                class="bg-[#C62828] text-white text-[11px] font-bold min-w-[20px] h-5 px-1.5 rounded-full inline-flex items-center justify-center"
              >
                0
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <div
      id="mobile-nav-backdrop"
      class="fixed inset-0 bg-black/50 z-50 hidden opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    ></div>
    <aside
      id="mobile-nav-drawer"
      class="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 transform -translate-x-full transition-transform duration-300 flex flex-col justify-between overflow-y-auto"
      aria-label="Mobile Navigation Drawer"
      aria-hidden="true"
    >
      <div>
        <div class="p-4 border-b border-[#EAE4E4] flex items-center justify-between bg-[#FAF8F8]">
          <span class="font-editorial text-xl font-bold tracking-tight text-[#222222]">
            VIJAY <span class="text-[#C62828]">TRADERS</span>
          </span>
          <button
            type="button"
            id="mobile-menu-close"
            class="p-2 text-[#222222] hover:text-[#C62828]"
            aria-label="Close navigation menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <nav class="p-4 divide-y divide-[#EAE4E4]" aria-label="Mobile Categories">
          <!-- Women Expandable -->
          <div class="py-2">
            <div class="flex items-center justify-between">
              <a href="collection.html?category=women" class="text-base font-semibold text-[#222222] py-2">Women</a>
              <button type="button" data-mobile-accordion="mob-women" class="p-2 text-neutral-600" aria-expanded="false" aria-label="Toggle Women subcategories">
                <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <ul id="mob-women" class="hidden pl-4 pb-2 space-y-2 text-sm border-l-2 border-[#C62828]/30 mt-1">
              ${womenCat.subcategories
                .map(
                  (sub) => `<li><a href="collection.html?category=women&sub=${sub.id}" class="block py-1 text-neutral-600 hover:text-[#C62828]">${sub.title}</a></li>`
                )
                .join("")}
            </ul>
          </div>

          <!-- Make-up Expandable -->
          <div class="py-2">
            <div class="flex items-center justify-between">
              <a href="collection.html?category=make-up" class="text-base font-semibold text-[#222222] py-2">Make-up</a>
              <button type="button" data-mobile-accordion="mob-makeup" class="p-2 text-neutral-600" aria-expanded="false" aria-label="Toggle Make-up subcategories">
                <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <ul id="mob-makeup" class="hidden pl-4 pb-2 space-y-2 text-sm border-l-2 border-[#C62828]/30 mt-1">
              ${makeupCat.subcategories
                .map(
                  (sub) => `<li><a href="collection.html?category=make-up&sub=${sub.id}" class="block py-1 text-neutral-600 hover:text-[#C62828]">${sub.title}</a></li>`
                )
                .join("")}
            </ul>
          </div>

          <!-- Men Expandable -->
          <div class="py-2">
            <div class="flex items-center justify-between">
              <a href="collection.html?category=men" class="text-base font-semibold text-[#222222] py-2">Men</a>
              <button type="button" data-mobile-accordion="mob-men" class="p-2 text-neutral-600" aria-expanded="false" aria-label="Toggle Men subcategories">
                <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <ul id="mob-men" class="hidden pl-4 pb-2 space-y-2 text-sm border-l-2 border-[#C62828]/30 mt-1">
              ${menCat.subcategories
                .map(
                  (sub) => `<li><a href="collection.html?category=men&sub=${sub.id}" class="block py-1 text-neutral-600 hover:text-[#C62828]">${sub.title}</a></li>`
                )
                .join("")}
            </ul>
          </div>

          <a href="collection.html?category=sun-protection" class="block py-3.5 text-base font-semibold text-[#222222] hover:text-[#C62828]">Sun Protection</a>
          <a href="collection.html?category=mother-baby" class="block py-3.5 text-base font-semibold text-[#222222] hover:text-[#C62828]">Mother &amp; Baby</a>
          <a href="brands.html" class="block py-3.5 text-base font-semibold text-[#222222] hover:text-[#C62828]">Brands Directory</a>
          <a href="collection.html?category=combo-deals" class="block py-3.5 text-base font-bold text-[#C62828]">Combo Deals</a>
        </nav>
      </div>

      <!-- Direct Mobile Drawer Contact Actions -->
      <div class="p-4 bg-[#FAF8F8] border-t border-[#EAE4E4] space-y-2.5">
        <p class="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Need Assistance?</p>
        <a href="${STORE_CONFIG.contact.phoneHref}" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-[#EAE4E4] text-[#222222] text-xs font-semibold uppercase tracking-wider rounded-sm hover:border-[#C62828]">
          Call Us Now
        </a>
        <a href="${STORE_CONFIG.contact.whatsappHref}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#C62828] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#E53935]">
          Chat on WhatsApp
        </a>
      </div>
    </aside>

    <!-- Global Search Overlay Modal -->
    <div
      id="global-search-modal"
      class="fixed inset-0 bg-black/60 z-50 hidden items-start justify-center pt-12 sm:pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div class="bg-white w-full max-w-3xl rounded-sm shadow-2xl border border-[#EAE4E4] overflow-hidden">
        <div class="p-4 sm:p-5 border-b border-[#EAE4E4] flex items-center gap-3">
          <svg class="w-5 h-5 text-[#C62828] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M16.65 10.825a5.825 5.825 0 11-11.65 0 5.825 5.825 0 0111.65 0z"/>
          </svg>
          <label id="search-modal-title" for="global-search-input" class="sr-only">Search Vijay Traders products</label>
          <input
            type="search"
            id="global-search-input"
            placeholder="Search serums, sunscreens, lip tints, combo deals..."
            class="w-full text-sm sm:text-base text-[#222222] placeholder-neutral-400 focus:outline-none"
            autocomplete="off"
          />
          <button
            type="button"
            id="global-search-close"
            class="p-1.5 text-neutral-500 hover:text-[#C62828] text-xs uppercase tracking-wider font-semibold"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        <div id="global-search-results" class="p-4 sm:p-6 max-h-[65vh] overflow-y-auto bg-[#FAF8F8]">
          <p class="text-xs text-neutral-500 uppercase tracking-wider">Popular Searches: <button type="button" data-search-suggest="SPF" class="underline text-[#C62828] ml-1">SPF 50</button>, <button type="button" data-search-suggest="Niacinamide" class="underline text-[#C62828] ml-1">Niacinamide</button>, <button type="button" data-search-suggest="Combo" class="underline text-[#C62828] ml-1">Combo Deals</button></p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders Section H (Social Banner) + Section I (Custom Footer) + Non-Intrusive Floating WhatsApp Pill
 */
export function renderGlobalFooter() {
  return `
    <!-- Section H: Social Media Community Bar -->
    <section class="bg-[#FAF8F8] border-t border-[#EAE4E4] py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#C62828]">Connect With Us</span>
        <h2 class="font-editorial text-2xl sm:text-3xl font-semibold text-[#222222] mt-1">
          Follow Vijay Traders on Social Media
        </h2>
        <p class="text-sm text-neutral-600 mt-2 max-w-xl mx-auto">
          Stay updated on new beauty arrivals, routine guides, and seasonal combo promotions across our official channels.
        </p>
        <div class="mt-6 flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          <a
            href="${STORE_CONFIG.socials.facebook}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vijay Traders on Facebook"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#EAE4E4] hover:border-[#C62828] text-[#222222] hover:text-[#C62828] rounded-sm text-xs sm:text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            <span>Facebook</span>
          </a>
          <a
            href="${STORE_CONFIG.socials.instagram}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vijay Traders on Instagram"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#EAE4E4] hover:border-[#C62828] text-[#222222] hover:text-[#C62828] rounded-sm text-xs sm:text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            <span>Instagram</span>
          </a>
          <a
            href="${STORE_CONFIG.socials.tiktok}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vijay Traders on TikTok"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white border border-[#EAE4E4] hover:border-[#C62828] text-[#222222] hover:text-[#C62828] rounded-sm text-xs sm:text-sm font-semibold transition-colors"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Section I: Global Footer (sections/footer.liquid) -->
    <footer class="bg-white border-t border-[#EAE4E4] text-[#222222]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          <!-- Column 1: Brand Identity & Direct Contact -->
          <div class="lg:col-span-2 space-y-4">
            <a href="index.html" class="inline-block">
              <span class="font-editorial text-2xl font-bold tracking-tight text-[#222222]">
                VIJAY <span class="text-[#C62828]">TRADERS</span>
              </span>
            </a>
            <p class="text-sm text-neutral-600 leading-relaxed max-w-sm">
              Vijay Traders is your trusted destination for authentic skincare, cosmetics, sun protection, and family care essentials.
            </p>
            <div class="pt-2 space-y-2 text-xs sm:text-sm text-neutral-700">
              <p><strong>Address:</strong> ${STORE_CONFIG.contact.address}</p>
              <p><strong>Hours:</strong> ${STORE_CONFIG.contact.hours}</p>
            </div>
            <div class="pt-2 flex flex-wrap gap-3">
              <a
                href="${STORE_CONFIG.contact.phoneHref}"
                class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#222222] text-[#222222] hover:border-[#C62828] hover:text-[#C62828] rounded-sm transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Us Now</span>
              </a>
              <a
                href="${STORE_CONFIG.contact.whatsappHref}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C62828] text-white hover:bg-[#E53935] rounded-sm transition-colors"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <!-- Column 2: Shop Categories -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C62828] mb-4">Shop Categories</h3>
            <ul class="space-y-2.5 text-sm text-neutral-600">
              <li><a href="collection.html?category=women" class="hover:text-[#C62828] transition-colors">Women's Beauty</a></li>
              <li><a href="collection.html?category=men" class="hover:text-[#C62828] transition-colors">Men's Grooming</a></li>
              <li><a href="collection.html?category=make-up" class="hover:text-[#C62828] transition-colors">Make-up Essentials</a></li>
              <li><a href="collection.html?category=sun-protection" class="hover:text-[#C62828] transition-colors">Sun Protection</a></li>
              <li><a href="collection.html?category=mother-baby" class="hover:text-[#C62828] transition-colors">Mother &amp; Baby</a></li>
              <li><a href="brands.html" class="hover:text-[#C62828] transition-colors">All Brands</a></li>
              <li><a href="collection.html?category=combo-deals" class="font-semibold text-[#C62828] hover:underline">Combo Deals</a></li>
            </ul>
          </div>

          <!-- Column 3: Customer Care & Policies -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C62828] mb-4">Customer Support</h3>
            <ul class="space-y-2.5 text-sm text-neutral-600">
              <li><a href="contact.html" class="hover:text-[#C62828] transition-colors">Contact Us</a></li>
              <li><a href="contact.html#shipping" class="hover:text-[#C62828] transition-colors">Shipping Information</a></li>
              <li><a href="contact.html#returns" class="hover:text-[#C62828] transition-colors">Returns &amp; Refund Policy</a></li>
              <li><a href="contact.html#privacy" class="hover:text-[#C62828] transition-colors">Privacy Policy</a></li>
              <li><a href="contact.html#terms" class="hover:text-[#C62828] transition-colors">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter Prototype Demonstration -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C62828] mb-4">Beauty Dispatch</h3>
            <p class="text-xs text-neutral-600 leading-relaxed mb-3">
              Subscribe for new product launches and curated bundle offers. <span class="italic text-neutral-400">(Prototype Demo — Connects to Shopify Customer Form in production)</span>
            </p>
            <form id="footer-newsletter-form" class="space-y-2">
              <label for="footer-email" class="sr-only">Email address</label>
              <input
                type="email"
                id="footer-email"
                required
                placeholder="Enter your email"
                class="w-full px-3 py-2 text-sm border border-[#EAE4E4] rounded-sm focus:outline-none focus:border-[#C62828]"
              />
              <button
                type="submit"
                class="w-full py-2 px-4 bg-[#222222] hover:bg-[#C62828] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
              >
                Subscribe
              </button>
              <p id="newsletter-feedback" class="text-xs text-[#C62828] hidden" aria-live="polite"></p>
            </form>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-[#EAE4E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; ${new Date().getFullYear()} ${STORE_CONFIG.storeName}. All rights reserved. Sample product and contact placeholders used for prototype demonstration.</p>
          <div class="flex items-center gap-4">
            <a href="${STORE_CONFIG.socials.facebook}" target="_blank" rel="noopener noreferrer" class="hover:text-[#C62828]">Facebook</a>
            <a href="${STORE_CONFIG.socials.instagram}" target="_blank" rel="noopener noreferrer" class="hover:text-[#C62828]">Instagram</a>
            <a href="${STORE_CONFIG.socials.tiktok}" target="_blank" rel="noopener noreferrer" class="hover:text-[#C62828]">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
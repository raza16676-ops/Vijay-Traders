// src/js/carousel.js
import { HERO_SLIDES } from "../data/store-data.js";

export function initHeroCarousel(mountSelector = "#hero-carousel-mount") {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;

  mount.innerHTML = `
    <div class="relative overflow-hidden bg-[#FAF8F8] border-b border-[#EAE4E4]" id="hero-slider" role="region" aria-roledescription="carousel" aria-label="Featured Promotions">
      <div class="relative h-[440px] sm:h-[520px] lg:h-[600px] w-full">
        ${HERO_SLIDES.map(
          (slide, index) => `
          <div
            data-hero-slide="${index}"
            class="absolute inset-0 transition-opacity duration-700 ease-out ${
              index === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }"
            role="group"
            aria-roledescription="slide"
            aria-label="${index + 1} of ${HERO_SLIDES.length}: ${slide.headline}"
            aria-hidden="${index === 0 ? "false" : "true"}"
          >
            <img
              src="${slide.image}"
              alt="${slide.imageAlt}"
              ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
              width="1600"
              height="900"
              class="w-full h-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-[#222222]/80 via-[#222222]/45 to-transparent flex items-center">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="max-w-xl text-white space-y-4">
                  <span class="inline-block bg-[#C62828] text-white text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                    ${slide.badge}
                  </span>
                  <h1 class="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
                    ${slide.headline}
                  </h1>
                  <p class="text-sm sm:text-base text-neutral-100 leading-relaxed max-w-md">
                    ${slide.supportingText}
                  </p>
                  <div class="pt-2">
                    <a
                      href="${slide.ctaLink}"
                      class="inline-flex items-center justify-center px-7 py-3.5 bg-[#C62828] hover:bg-[#E53935] text-white text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-sm transition-colors shadow-sm"
                    >
                      ${slide.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        ).join("")}
      </div>

      <!-- Previous / Next Controls -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="absolute bottom-5 right-4 sm:right-8 z-20 flex items-center gap-2">
          <button
            type="button"
            id="hero-prev"
            class="w-10 h-10 rounded-sm bg-white/90 hover:bg-[#C62828] text-[#222222] hover:text-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Previous slide"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            type="button"
            id="hero-next"
            class="w-10 h-10 rounded-sm bg-white/90 hover:bg-[#C62828] text-[#222222] hover:text-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Next slide"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <!-- Pagination Indicators -->
        <div class="absolute bottom-6 left-4 sm:left-8 z-20 flex items-center gap-2.5" role="tablist" aria-label="Slide Dots">
          ${HERO_SLIDES.map(
            (slide, index) => `
            <button
              type="button"
              data-hero-dot="${index}"
              role="tab"
              aria-selected="${index === 0 ? "true" : "false"}"
              aria-label="Go to slide ${index + 1}"
              class="h-2 transition-all duration-300 rounded-full ${
                index === 0 ? "w-8 bg-[#C62828]" : "w-2 bg-white/70 hover:bg-white"
              }"
            ></button>
          `
          ).join("")}
        </div>
      </div>
    </div>
  `;

  let current = 0;
  let timer = null;
  const slides = mount.querySelectorAll("[data-hero-slide]");
  const dots = mount.querySelectorAll("[data-hero-dot]");
  const sliderEl = document.getElementById("hero-slider");

  const goToSlide = (nextIdx) => {
    current = (nextIdx + slides.length) % slides.length;
    slides.forEach((el, i) => {
      const active = i === current;
      el.classList.toggle("opacity-100", active);
      el.classList.toggle("z-10", active);
      el.classList.toggle("opacity-0", !active);
      el.classList.toggle("z-0", !active);
      el.classList.toggle("pointer-events-none", !active);
      el.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.setAttribute("aria-selected", String(active));
      dot.className = `h-2 transition-all duration-300 rounded-full ${
        active ? "w-8 bg-[#C62828]" : "w-2 bg-white/70 hover:bg-white"
      }`;
    });
  };

  const startAutoRotate = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopAutoRotate();
    timer = setInterval(() => goToSlide(current + 1), 6000);
  };

  const stopAutoRotate = () => {
    if (timer) clearInterval(timer);
  };

  document.getElementById("hero-prev")?.addEventListener("click", () => {
    goToSlide(current - 1);
    startAutoRotate();
  });
  document.getElementById("hero-next")?.addEventListener("click", () => {
    goToSlide(current + 1);
    startAutoRotate();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(Number(dot.getAttribute("data-hero-dot")));
      startAutoRotate();
    });
  });

  sliderEl?.addEventListener("mouseenter", stopAutoRotate);
  sliderEl?.addEventListener("mouseleave", startAutoRotate);
  sliderEl?.addEventListener("focusin", stopAutoRotate);
  sliderEl?.addEventListener("focusout", startAutoRotate);

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  sliderEl?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  sliderEl?.addEventListener(
    "touchend",
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) goToSlide(current + 1);
        else goToSlide(current - 1);
        startAutoRotate();
      }
    },
    { passive: true }
  );

  startAutoRotate();
}
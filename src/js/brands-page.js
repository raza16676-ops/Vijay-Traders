// src/js/brands-page.js
import { BRANDS } from "../data/store-data.js";

document.addEventListener("DOMContentLoaded", () => {
  let activeLimit = 25;
  let query = "";

  const grid = document.getElementById("brands-directory-grid");
  const input = document.getElementById("brand-filter-input");
  const btn25 = document.getElementById("dir-btn-25");
  const btn18 = document.getElementById("dir-btn-18");

  const render = () => {
    const list = BRANDS.slice(0, activeLimit).filter(
      (b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.categoryFocus.toLowerCase().includes(query.toLowerCase())
    );

    grid.innerHTML = list
      .map(
        (b) => `
      <a
        href="collection.html?brand=${encodeURIComponent(b.name)}"
        class="group bg-white border border-[#EAE4E4] hover:border-[#C62828] rounded-sm p-6 flex flex-col items-center text-center transition-all hover:shadow-sm"
      >
        <div class="w-14 h-14 rounded-full bg-[#FAF8F8] border border-[#EAE4E4] flex items-center justify-center font-editorial text-xl font-bold text-[#C62828] mb-3">
          ${b.code}
        </div>
        <h2 class="text-sm font-semibold text-[#222222] group-hover:text-[#C62828]">${b.name}</h2>
        <p class="text-[11px] text-neutral-500 mt-1">${b.categoryFocus}</p>
        <span class="mt-3 text-[11px] font-semibold uppercase tracking-wider text-[#C62828]">View Products &rarr;</span>
      </a>
    `
      )
      .join("");
  };

  render();

  input?.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });

  btn25?.addEventListener("click", () => {
    activeLimit = 25;
    btn25.className = "px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#C62828] text-white";
    btn18.className = "px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-white border border-[#EAE4E4] text-[#222222]";
    render();
  });

  btn18?.addEventListener("click", () => {
    activeLimit = 18;
    btn18.className = "px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#C62828] text-white";
    btn25.className = "px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-white border border-[#EAE4E4] text-[#222222]";
    render();
  });
});
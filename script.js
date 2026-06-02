const categoryGrid = document.getElementById("categoryGrid");
const businessGrid = document.getElementById("businessGrid");
const resultsSummary = document.getElementById("resultsSummary");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchButton");
const activeCount = document.getElementById("activeCount");
const featuredCount = document.getElementById("featuredCount");
const categoryCount = document.getElementById("categoryCount");
const featuredTrack = document.getElementById("featuredTrack");
const featuredPrev = document.getElementById("featuredPrev");
const featuredNext = document.getElementById("featuredNext");
const featuredDots = document.getElementById("featuredDots");

let currentCategory = "";
let currentQuery = "";
let currentLocation = "";
let featuredIndex = 0;
let featuredTimer = null;

function renderHomeStats() {
  const allBusinesses = getBusinesses();
  if (activeCount) activeCount.textContent = allBusinesses.length.toLocaleString("es-CR");
  if (featuredCount) featuredCount.textContent = allBusinesses.filter(b => b.destacado).length.toLocaleString("es-CR");
  if (categoryCount) categoryCount.textContent = categories.length.toLocaleString("es-CR");
}

function renderCategories() {
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories.map(cat => {
    const total = getBusinesses().filter(b => b.categoria === cat.key).length;

    return `
      <article class="category-card" data-category="${escapeHTML(cat.key)}">
        <div class="category-icon">${cat.icon}</div>
        <h3>${escapeHTML(cat.label)}</h3>
        <p>${escapeHTML(cat.description)}</p>
        <p class="category-count">${total} negocio${total === 1 ? "" : "s"}</p>
      </article>
    `;
  }).join("");

  categoryGrid.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      currentCategory = card.dataset.category;
      if (categoryFilter) categoryFilter.value = currentCategory;
      renderResults(filterBusinesses());
      document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function filterBusinesses() {
  const allBusinesses = getBusinesses();
  const q = currentQuery.trim().toLowerCase();
  const cat = currentCategory;
  const loc = currentLocation;

  return allBusinesses.filter(b => {
    const searchable = [
      b.nombre,
      b.descripcion,
      b.categoriaLabel,
      b.ubicacion,
      b.instagram
    ].join(" ").toLowerCase();

    const matchesQuery = !q || searchable.includes(q);
    const matchesCategory = !cat || b.categoria === cat;
    const matchesLocation = !loc || b.ubicacion.toLowerCase().includes(loc);

    return matchesQuery && matchesCategory && matchesLocation;
  });
}

function renderBusinesses(list) {
  if (!businessGrid) return;

  if (resultsSummary) {
    const total = list.length;
    resultsSummary.textContent = total === 1
      ? "1 negocio coincide con tu búsqueda."
      : `${total} negocios coinciden con tu búsqueda.`;
  }

  if (!list.length) {
    businessGrid.innerHTML = `
      <div class="empty-state full-span">
        No se encontraron negocios con esos filtros. Prueba con otra búsqueda o cambia la categoría.
      </div>
    `;
    return;
  }

  businessGrid.innerHTML = list.map(b => {
    const image = getBusinessMainImage(b);
    const rating = Number(b.rating || 0).toFixed(1);
    const reviews = b.reseñas || 0;

    return `
      <article class="business-card" data-id="${b.id}">
        <div class="business-image">
          <img src="${escapeHTML(image)}" alt="${escapeHTML(b.nombre)}" loading="lazy" />
          ${b.destacado ? '<div class="business-badge">Destacado</div>' : ""}
          <div class="business-fav">♡</div>
        </div>

        <div class="business-content">
          <div class="business-top">
            <div>
              <h3>${escapeHTML(b.nombre)}</h3>
              <p>${escapeHTML(b.categoriaLabel)}</p>
            </div>
            <div class="rating">★ ${rating} <span>(${reviews})</span></div>
          </div>

          <p class="business-description">${escapeHTML(b.descripcion)}</p>

          <div class="business-meta">
            <span class="meta-item">📍 ${escapeHTML(b.ubicacion)}</span>
            <span class="meta-item">🕒 ${escapeHTML(b.horario || "Horario no disponible")}</span>
            ${b.verificado ? '<span class="meta-item verified">Verificado</span>' : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");

  businessGrid.querySelectorAll(".business-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = `negocio.html?id=${card.dataset.id}`;
    });
  });
}

function getFeaturedItems() {
  const featured = getBusinesses().filter(b => b.destacado);
  return featured.length ? featured : getBusinesses().slice(0, 4);
}

function renderFeaturedCarousel() {
  if (!featuredTrack) return;

  const items = getFeaturedItems();
  if (!items.length) {
    featuredTrack.innerHTML = `
      <div class="empty-state">
        Aún no hay negocios destacados.
      </div>
    `;
    return;
  }

  featuredIndex = Math.min(featuredIndex, items.length - 1);
  const business = items[featuredIndex];
  const image = getBusinessMainImage(business);
  const galleryCount = getBusinessGallery(business).length;

  featuredTrack.innerHTML = `
    <article class="featured-slide" style="--accent:${escapeHTML(business.bannerColor || "#2ee59d")}">
      <div class="featured-image">
        <img src="${escapeHTML(image)}" alt="${escapeHTML(business.nombre)}" />
      </div>
      <div class="featured-copy">
        <span class="featured-kicker">${escapeHTML(business.categoriaLabel)} · ${escapeHTML(business.ubicacion)}</span>
        <h3>${escapeHTML(business.nombre)}</h3>
        <p>${escapeHTML(business.descripcion)}</p>
        <div class="featured-meta">
          <span>★ ${Number(business.rating || 0).toFixed(1)} (${business.reseñas || 0})</span>
          <span>${galleryCount} foto${galleryCount === 1 ? "" : "s"}</span>
          ${business.verificado ? "<span>Verificado</span>" : ""}
        </div>
        <div class="featured-actions">
          <a class="btn btn-primary" href="negocio.html?id=${business.id}">Ver negocio</a>
          <a class="btn btn-ghost" href="#explorar">Explorar más</a>
        </div>
      </div>
    </article>
  `;

  if (featuredDots) {
    featuredDots.innerHTML = items.map((_, index) => `
      <button class="${index === featuredIndex ? "active" : ""}" type="button" aria-label="Ver destacado ${index + 1}"></button>
    `).join("");

    featuredDots.querySelectorAll("button").forEach((button, index) => {
      button.addEventListener("click", () => {
        goToFeatured(index);
      });
    });
  }
}

function goToFeatured(index) {
  const items = getFeaturedItems();
  if (!items.length) return;

  featuredIndex = (index + items.length) % items.length;
  renderFeaturedCarousel();
  restartFeaturedTimer();
}

function restartFeaturedTimer() {
  if (featuredTimer) clearInterval(featuredTimer);
  const items = getFeaturedItems();
  if (items.length <= 1) return;

  featuredTimer = setInterval(() => {
    featuredIndex = (featuredIndex + 1) % items.length;
    renderFeaturedCarousel();
  }, 5200);
}

function renderResults(list) {
  renderHomeStats();
  renderBusinesses(list);
}

function applyFilters() {
  currentQuery = searchInput ? searchInput.value : "";
  currentLocation = locationFilter ? locationFilter.value : "";
  currentCategory = categoryFilter ? categoryFilter.value : "";
  renderResults(filterBusinesses());
}

function initFilters() {
  if (locationFilter) {
    locations.forEach(loc => {
      const option = document.createElement("option");
      option.value = loc.toLowerCase();
      option.textContent = loc;
      locationFilter.appendChild(option);
    });
  }

  if (categoryFilter) {
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.key;
      option.textContent = cat.label;
      categoryFilter.appendChild(option);
    });
  }
}

function bindEvents() {
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      applyFilters();
      document.getElementById("explorar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentQuery = searchInput.value;
      renderResults(filterBusinesses());
    });
  }

  if (locationFilter) {
    locationFilter.addEventListener("change", () => {
      currentLocation = locationFilter.value;
      renderResults(filterBusinesses());
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      currentCategory = categoryFilter.value;
      renderResults(filterBusinesses());
    });
  }

  if (featuredPrev) featuredPrev.addEventListener("click", () => goToFeatured(featuredIndex - 1));
  if (featuredNext) featuredNext.addEventListener("click", () => goToFeatured(featuredIndex + 1));

  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && ["INPUT", "SELECT"].includes(document.activeElement?.tagName)) {
      applyFilters();
    }
  });
}

function bootstrapHome() {
  initFilters();
  renderHomeStats();
  renderCategories();
  renderFeaturedCarousel();
  renderResults(getBusinesses());
  bindEvents();
  restartFeaturedTimer();
}

if (categoryGrid && businessGrid) {
  bootstrapHome();
}

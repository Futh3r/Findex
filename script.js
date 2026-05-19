const categoryGrid = document.getElementById("categoryGrid");
const businessGrid = document.getElementById("businessGrid");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const categoryFilter = document.getElementById("categoryFilter");
const searchButton = document.getElementById("searchButton");
const activeCount = document.getElementById("activeCount");

let currentCategory = "";
let currentQuery = "";
let currentLocation = "";

function renderCategories() {
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories.map(cat => {
    const total = getBusinesses().filter(b => b.categoria === cat.key).length;

    return `
      <article class="category-card" data-category="${cat.key}">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.label}</h3>
        <p>${cat.description}</p>
        <p style="margin-top:10px;color:#2ee59d;font-weight:700;">${total} negocios</p>
      </article>
    `;
  }).join("");

  categoryGrid.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      currentCategory = card.dataset.category;
      if (categoryFilter) categoryFilter.value = currentCategory;
      renderBusinesses(filterBusinesses());
      document.getElementById("destacados").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function filterBusinesses() {
  const allBusinesses = getBusinesses();
  const q = currentQuery.trim().toLowerCase();
  const cat = currentCategory;
  const loc = currentLocation;

  return allBusinesses.filter(b => {
    const matchesQuery =
      b.nombre.toLowerCase().includes(q) ||
      b.descripcion.toLowerCase().includes(q) ||
      b.categoriaLabel.toLowerCase().includes(q) ||
      b.ubicacion.toLowerCase().includes(q);

    const matchesCategory = !cat || b.categoria === cat;
    const matchesLocation = !loc || b.ubicacion.toLowerCase().includes(loc);

    return matchesQuery && matchesCategory && matchesLocation;
  });
}

function renderBusinesses(list) {
  if (!businessGrid) return;

  activeCount.textContent = getBusinesses().length.toLocaleString("es-CR");

  if (!list.length) {
    businessGrid.innerHTML = `
      <div class="empty-state">
        No se encontraron negocios con esos filtros. Prueba con otra búsqueda o cambia la categoría.
      </div>
    `;
    return;
  }

  businessGrid.innerHTML = list.map(b => `
    <article class="business-card" data-id="${b.id}">
      <div class="business-image">
        <img src="${b.imagen}" alt="${b.nombre}" />
        ${b.destacado ? '<div class="business-badge">Destacado</div>' : ''}
        <div class="business-fav">⟡</div>
      </div>

      <div class="business-content">
        <div class="business-top">
          <div>
            <h3>${b.nombre}</h3>
            <p>${b.categoriaLabel}</p>
          </div>
          <div class="rating">★ ${Number(b.rating || 0).toFixed(1)} <span style="color:#94a3b8;font-weight:500;">(${b.reseñas || 0})</span></div>
        </div>

        <div class="business-meta">
          <span class="meta-item">📍 ${b.ubicacion}</span>
          <span class="meta-item">🕒 ${b.horario || "Horario no disponible"}</span>
          ${b.verificado ? '<span class="meta-item" style="color:#2ee59d;font-weight:700;">✔ Verificado</span>' : ''}
        </div>
      </div>
    </article>
  `).join("");

  businessGrid.querySelectorAll(".business-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      window.location.href = `negocio.html?id=${id}`;
    });
  });
}

function applyFilters() {
  currentQuery = searchInput ? searchInput.value : "";
  currentLocation = locationFilter ? locationFilter.value : "";
  currentCategory = categoryFilter ? categoryFilter.value : "";
  renderBusinesses(filterBusinesses());
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
  if (searchButton) searchButton.addEventListener("click", applyFilters);

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentQuery = searchInput.value;
      renderBusinesses(filterBusinesses());
    });
  }

  if (locationFilter) {
    locationFilter.addEventListener("change", () => {
      currentLocation = locationFilter.value;
      renderBusinesses(filterBusinesses());
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      currentCategory = categoryFilter.value;
      renderBusinesses(filterBusinesses());
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && ["INPUT", "SELECT"].includes(document.activeElement?.tagName)) {
      applyFilters();
    }
  });
}

function bootstrapHome() {
  initFilters();
  renderCategories();
  renderBusinesses(getBusinesses());
  bindEvents();
}

if (categoryGrid && businessGrid) {
  bootstrapHome();
}
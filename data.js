const ADMIN_EMAIL = "luisdiegoeb09@gmail.com";
const ADMIN_PASSWORD = "C4NELO$ZZY721!!";

const ACCOUNT_TYPES = {
  client: "client",
  business: "business"
};

const IMAGE_LIMITS = {
  maxFileSize: 2.5 * 1024 * 1024,
  maxGalleryImages: 6
};

const planDefinitions = [
  {
    key: "basic",
    label: "Básico",
    price: "Gratis",
    description: "Publica lo esencial y empieza a aparecer en el directorio.",
    maxBusinesses: 1,
    featured: false,
    extraFields: false
  },
  {
    key: "advanced",
    label: "Avanzado",
    price: "₡4.900/mes",
    description: "Más negocios, más enlaces y una presentación visual más completa.",
    maxBusinesses: 3,
    featured: false,
    extraFields: true
  },
  {
    key: "premium",
    label: "Premium",
    price: "₡9.900/mes",
    description: "Aparece en destacados y dale prioridad visual a tu marca.",
    maxBusinesses: 10,
    featured: true,
    extraFields: true
  }
];

const categories = [
  { key: "comida", label: "Comida", icon: "🍔", description: "Restaurantes, sodas, cafeterías y comida rápida." },
  { key: "ferreteria", label: "Ferretería", icon: "🔧", description: "Herramientas, materiales y construcción." },
  { key: "sastreria", label: "Sastrería", icon: "🧵", description: "Confección, arreglos y moda a medida." },
  { key: "tecnologia", label: "Tecnología", icon: "💻", description: "Soporte, accesorios y reparación." },
  { key: "hogar", label: "Hogar", icon: "🏠", description: "Decoración, plantas, organización y estilo." },
  { key: "mascotas", label: "Mascotas", icon: "🐾", description: "Cuidados, grooming, alimentos y accesorios." }
];

const locations = ["San José", "Heredia", "Alajuela", "Cartago"];

const seedBusinesses = [
  {
    id: 1,
    ownerEmail: ADMIN_EMAIL,
    nombre: "Burger House",
    categoria: "comida",
    categoriaLabel: "Comida",
    ubicacion: "San José, Centro",
    descripcion: "Hamburguesas artesanales, papas crujientes y combos premium preparados al momento.",
    rating: 4.8,
    reseñas: 256,
    verificado: true,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "11:00 AM - 10:00 PM",
    telefono: "50688888888",
    whatsapp: "50688888888",
    sitio: "https://example.com",
    instagram: "@burgerhouse",
    bannerColor: "#2ee59d"
  },
  {
    id: 2,
    ownerEmail: ADMIN_EMAIL,
    nombre: "Ferretería El Progreso",
    categoria: "ferreteria",
    categoriaLabel: "Ferretería",
    ubicacion: "Heredia, San Francisco",
    descripcion: "Materiales, herramientas eléctricas y asesoría para proyectos del hogar.",
    rating: 4.6,
    reseñas: 118,
    verificado: true,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "7:00 AM - 6:00 PM",
    telefono: "50688990011",
    whatsapp: "50688990011",
    sitio: "https://example.com",
    instagram: "@ferreprogreso",
    bannerColor: "#38bdf8"
  },
  {
    id: 3,
    ownerEmail: ADMIN_EMAIL,
    nombre: "Studio Sastrería",
    categoria: "sastreria",
    categoriaLabel: "Sastrería",
    ubicacion: "San José, Escazú",
    descripcion: "Ajustes, confección a medida y reparaciones finas para ropa formal.",
    rating: 4.9,
    reseñas: 84,
    verificado: true,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "9:00 AM - 7:00 PM",
    telefono: "50687001234",
    whatsapp: "50687001234",
    sitio: "https://example.com",
    instagram: "@studiosastreria",
    bannerColor: "#a78bfa"
  },
  {
    id: 4,
    ownerEmail: ADMIN_EMAIL,
    nombre: "TecnoFix Express",
    categoria: "tecnologia",
    categoriaLabel: "Tecnología",
    ubicacion: "Cartago, Oriental",
    descripcion: "Reparación de celulares, laptops, accesorios y soporte técnico rápido.",
    rating: 4.7,
    reseñas: 143,
    verificado: true,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "10:00 AM - 8:00 PM",
    telefono: "50687776655",
    whatsapp: "50687776655",
    sitio: "https://example.com",
    instagram: "@tecnofixcr",
    bannerColor: "#f9c74f"
  },
  {
    id: 5,
    ownerEmail: ADMIN_EMAIL,
    nombre: "Casa Verde Decor",
    categoria: "hogar",
    categoriaLabel: "Hogar",
    ubicacion: "Alajuela, Centro",
    descripcion: "Decoración, plantas, organizadores y piezas modernas para el hogar.",
    rating: 4.5,
    reseñas: 97,
    verificado: false,
    destacado: false,
    imagen: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "8:30 AM - 6:30 PM",
    telefono: "50686664545",
    whatsapp: "50686664545",
    sitio: "https://example.com",
    instagram: "@casaverdedecor",
    bannerColor: "#2ee59d"
  },
  {
    id: 6,
    ownerEmail: ADMIN_EMAIL,
    nombre: "PetCare Barrio",
    categoria: "mascotas",
    categoriaLabel: "Mascotas",
    ubicacion: "San José, Rohrmoser",
    descripcion: "Alimentos, grooming, accesorios y atención cariñosa para mascotas.",
    rating: 4.8,
    reseñas: 152,
    verificado: true,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=1200&q=80",
    galeria: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80"
    ],
    horario: "9:00 AM - 6:00 PM",
    telefono: "50685551212",
    whatsapp: "50685551212",
    sitio: "https://example.com",
    instagram: "@petcarebarrio",
    bannerColor: "#fb7185"
  }
];

const STORAGE_KEYS = {
  users: "findex_users",
  businesses: "findex_businesses",
  session: "findex_session"
};

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function createId() {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeImageList(list = []) {
  if (!Array.isArray(list)) return [];

  const seen = new Set();
  return list
    .filter(src => typeof src === "string" && src.trim())
    .map(src => src.trim())
    .filter(src => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    })
    .slice(0, IMAGE_LIMITS.maxGalleryImages);
}

function normalizeBusiness(business) {
  const categoria = business.categoria || "comida";
  const imagen = business.imagen || business.imagenPrincipal || "";
  const galeria = normalizeImageList(business.galeria || business.gallery || []);

  return {
    ...business,
    categoria,
    categoriaLabel: business.categoriaLabel || getCategoryLabel(categoria),
    imagen,
    galeria,
    horario: business.horario || "Horario no disponible",
    telefono: business.telefono || "",
    whatsapp: business.whatsapp || business.telefono || "",
    sitio: business.sitio || "",
    instagram: business.instagram || "",
    bannerColor: business.bannerColor || "#2ee59d",
    rating: Number(business.rating || 0),
    reseñas: Number(business.reseñas || business.resenas || 0),
    verificado: !!business.verificado,
    destacado: !!business.destacado
  };
}

function getBusinessGallery(business) {
  if (!business) return [];
  return normalizeImageList([business.imagen, ...(business.galeria || [])]);
}

function getBusinessMainImage(business) {
  return business?.imagen || getBusinessGallery(business)[0] || "";
}

function getBusinesses() {
  const raw = localStorage.getItem(STORAGE_KEYS.businesses);
  if (!raw) return seedBusinesses.map(normalizeBusiness);

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeBusiness) : seedBusinesses.map(normalizeBusiness);
  } catch {
    return seedBusinesses.map(normalizeBusiness);
  }
}

function saveBusinesses(list) {
  localStorage.setItem(STORAGE_KEYS.businesses, JSON.stringify(list.map(normalizeBusiness)));
}

function getAccountType(user) {
  if (!user) return null;
  if (user.role === "admin") return ACCOUNT_TYPES.business;
  if (user.accountType === ACCOUNT_TYPES.business || user.plan) return ACCOUNT_TYPES.business;
  return ACCOUNT_TYPES.client;
}

function normalizeUser(user) {
  const accountType = getAccountType(user);
  const role = user.role === "admin" ? "admin" : accountType;

  return {
    ...user,
    accountType,
    role,
    name: user.name || "Usuario",
    email: normalizeEmail(user.email)
  };
}

function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.users);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeUser) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users.map(normalizeUser)));
}

function getSession() {
  const raw = localStorage.getItem(STORAGE_KEYS.session);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setSession(userId) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ userId }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

async function hashPassword(password) {
  if (!window.crypto?.subtle) {
    return btoa(unescape(encodeURIComponent(password)));
  }

  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function ensureAdminUser() {
  const users = getUsers();
  const cleanEmail = normalizeEmail(ADMIN_EMAIL);
  const existing = users.find(u => u.email === cleanEmail);

  if (!existing) {
    const passwordHash = await hashPassword(ADMIN_PASSWORD);
    users.push({
      id: createId(),
      name: "Administrador",
      email: cleanEmail,
      passwordHash,
      role: "admin",
      accountType: ACCOUNT_TYPES.business,
      plan: "premium",
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
    return;
  }

  let changed = false;
  if (existing.role !== "admin") {
    existing.role = "admin";
    changed = true;
  }
  if (existing.accountType !== ACCOUNT_TYPES.business) {
    existing.accountType = ACCOUNT_TYPES.business;
    changed = true;
  }
  if (!existing.plan) {
    existing.plan = "premium";
    changed = true;
  }
  if (changed) saveUsers(users);
}

const findexReady = ensureAdminUser();

async function registerUser({ name, email, password, accountType = ACCOUNT_TYPES.client }) {
  await findexReady;

  const users = getUsers();
  const cleanEmail = normalizeEmail(email);

  if (users.some(u => u.email === cleanEmail)) {
    throw new Error("Ya existe una cuenta con ese correo.");
  }

  const cleanAccountType = accountType === ACCOUNT_TYPES.business ? ACCOUNT_TYPES.business : ACCOUNT_TYPES.client;
  const isAdminAccount = cleanEmail === normalizeEmail(ADMIN_EMAIL);
  const passwordHash = await hashPassword(password);
  const user = {
    id: createId(),
    name: name.trim(),
    email: cleanEmail,
    passwordHash,
    role: isAdminAccount ? "admin" : cleanAccountType,
    accountType: isAdminAccount ? ACCOUNT_TYPES.business : cleanAccountType,
    plan: isAdminAccount ? "premium" : null,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);
  setSession(user.id);
  return user;
}

async function loginUser(email, password) {
  await findexReady;

  const users = getUsers();
  const cleanEmail = normalizeEmail(email);
  const passwordHash = await hashPassword(password);
  const user = users.find(u => u.email === cleanEmail);

  if (!user) {
    throw new Error("No existe una cuenta con ese correo.");
  }

  if (user.passwordHash !== passwordHash) {
    throw new Error("Contraseña incorrecta.");
  }

  let changed = false;
  if (cleanEmail === normalizeEmail(ADMIN_EMAIL) && user.role !== "admin") {
    user.role = "admin";
    user.accountType = ACCOUNT_TYPES.business;
    user.plan = user.plan || "premium";
    changed = true;
  }
  if (!user.accountType) {
    user.accountType = getAccountType(user);
    changed = true;
  }
  if (changed) saveUsers(users);

  setSession(user.id);
  return normalizeUser(user);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;

  const users = getUsers();
  return users.find(u => u.id === session.userId) || null;
}

function saveCurrentUser(updatedUser) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = normalizeUser(updatedUser);
    saveUsers(users);
  }
}

function updateCurrentUser(patch) {
  const user = getCurrentUser();
  if (!user) return null;
  const updated = normalizeUser({ ...user, ...patch });
  saveCurrentUser(updated);
  return updated;
}

function setUserPlan(planKey) {
  const user = getCurrentUser();
  if (!user) throw new Error("No hay sesión activa.");

  const updated = {
    ...user,
    plan: planKey,
    accountType: ACCOUNT_TYPES.business,
    role: user.role === "admin" ? "admin" : ACCOUNT_TYPES.business
  };
  saveCurrentUser(updated);
  return normalizeUser(updated);
}

function getPlanDefinition(planKey) {
  return planDefinitions.find(p => p.key === planKey) || null;
}

function addBusiness(newBusiness) {
  const user = getCurrentUser();
  if (!user) throw new Error("Debes iniciar sesión.");
  if (!isBusinessUser(user)) throw new Error("Necesitas una cuenta de empresa para publicar negocios.");

  const list = getBusinesses();
  const nextId = list.length ? Math.max(...list.map(b => Number(b.id) || 0)) + 1 : 1;
  const plan = getPlanDefinition(user.plan);
  const currentTotal = list.filter(b => b.ownerEmail === user.email).length;

  if (!plan) {
    throw new Error("Elige un plan antes de publicar tu negocio.");
  }

  if (currentTotal >= plan.maxBusinesses) {
    throw new Error(`Tu plan ${plan.label} permite hasta ${plan.maxBusinesses} negocio(s).`);
  }

  if (!newBusiness.imagen) {
    throw new Error("Agrega una foto principal del negocio.");
  }

  const business = normalizeBusiness({
    id: nextId,
    ownerEmail: user.email,
    nombre: newBusiness.nombre,
    categoria: newBusiness.categoria,
    categoriaLabel: getCategoryLabel(newBusiness.categoria),
    ubicacion: newBusiness.ubicacion,
    descripcion: newBusiness.descripcion,
    imagen: newBusiness.imagen,
    galeria: normalizeImageList(newBusiness.galeria),
    horario: newBusiness.horario,
    telefono: newBusiness.telefono,
    whatsapp: newBusiness.whatsapp || newBusiness.telefono,
    sitio: newBusiness.sitio || "",
    instagram: newBusiness.instagram || "",
    bannerColor: newBusiness.bannerColor || "#2ee59d",
    rating: 0,
    reseñas: 0,
    verificado: false,
    destacado: plan.featured || false
  });

  list.unshift(business);
  saveBusinesses(list);
  return business;
}

function updateBusiness(id, patch) {
  const list = getBusinesses();
  const index = list.findIndex(b => Number(b.id) === Number(id));
  if (index === -1) return null;

  const current = list[index];
  const next = normalizeBusiness({
    ...current,
    ...patch,
    galeria: patch.galeria !== undefined ? normalizeImageList(patch.galeria) : current.galeria,
    categoriaLabel: patch.categoria ? getCategoryLabel(patch.categoria) : current.categoriaLabel
  });

  list[index] = next;
  saveBusinesses(list);
  return next;
}

function deleteBusiness(id) {
  const list = getBusinesses().filter(b => Number(b.id) !== Number(id));
  saveBusinesses(list);
}

function getCategoryLabel(categoryKey) {
  const found = categories.find(c => c.key === categoryKey);
  return found ? found.label : categoryKey;
}

function getOwnerBusinesses(email) {
  return getBusinesses().filter(b => b.ownerEmail === normalizeEmail(email));
}

function isAdmin(user) {
  return !!user && user.role === "admin";
}

function isBusinessUser(user) {
  return isAdmin(user) || getAccountType(user) === ACCOUNT_TYPES.business;
}

function isClientUser(user) {
  return !!user && !isBusinessUser(user);
}

function getDashboardUrl(user) {
  if (isAdmin(user)) return "admin.html";
  if (isBusinessUser(user)) return user.plan ? "dashboard.html" : "planes.html";
  return "index.html#explorar";
}

function getRoleLabel(user) {
  if (isAdmin(user)) return "Administrador";
  return isBusinessUser(user) ? "Empresa" : "Cliente";
}

function renderSessionNav(containerId = "navActions") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = getCurrentUser();

  if (!user) {
    container.innerHTML = `
      <a class="btn btn-ghost" href="auth.html">Entrar</a>
      <a class="btn btn-primary" href="auth.html?tipo=empresa">Publicar negocio</a>
    `;
    return;
  }

  const panelUrl = getDashboardUrl(user);
  const panelLabel = isBusinessUser(user) ? "Mi panel" : "Explorar";

  container.innerHTML = `
    <span class="session-chip">${escapeHTML(user.name)} · ${getRoleLabel(user)}</span>
    <a class="btn btn-ghost" href="${panelUrl}">${panelLabel}</a>
    <button class="btn btn-primary" id="logoutBtn" type="button">Salir</button>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    clearSession();
    window.location.href = "index.html";
  });
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    if (!file.type?.startsWith("image/")) {
      reject(new Error("Selecciona un archivo de imagen válido."));
      return;
    }

    if (file.size > IMAGE_LIMITS.maxFileSize) {
      reject(new Error("La imagen debe pesar menos de 2.5 MB."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

async function readImageFiles(fileList, limit = IMAGE_LIMITS.maxGalleryImages) {
  const files = Array.from(fileList || []).slice(0, limit);
  const images = [];

  for (const file of files) {
    images.push(await readImageFile(file));
  }

  return normalizeImageList(images);
}

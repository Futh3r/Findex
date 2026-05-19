const ADMIN_EMAIL = "luisdiegoeb09@gmail.com";
const ADMIN_PASSWORD = "C4NELO$ZZY721!!"; 

const planDefinitions = [
  {
    key: "basic",
    label: "Básico",
    price: "Gratis",
    description: "Agrega tu negocio con lo esencial.",
    maxBusinesses: 1,
    featured: false,
    extraFields: false
  },
  {
    key: "advanced",
    label: "Avanzado",
    price: "₡",
    description: "Más personalización y mejor presentación.",
    maxBusinesses: 3,
    featured: false,
    extraFields: true
  },
  {
    key: "premium",
    label: "Premium",
    price: "₡₡",
    description: "Aparece destacado y recibe soporte de personalización.",
    maxBusinesses: 10,
    featured: true,
    extraFields: true
  }
];

const categories = [
  { key: "comida", label: "Comida", icon: "🍔", description: "Restaurantes, sodas y comida rápida." },
  { key: "ferreteria", label: "Ferretería", icon: "🔧", description: "Herramientas, materiales y construcción." },
  { key: "sastreria", label: "Sastrería", icon: "🧵", description: "Confección, arreglos y moda." },
  { key: "tecnologia", label: "Tecnología", icon: "💻", description: "Soporte, accesorios y reparación." },
  { key: "hogar", label: "Hogar", icon: "🏠", description: "Decoración, organización y estilo." },
  { key: "mascotas", label: "Mascotas", icon: "🐾", description: "Cuidados, alimentos y accesorios." }
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
    descripcion: "Hamburguesas artesanales, papas y combos premium.",
    rating: 4.8,
    reseñas: 256,
    verificado: true,
    destacado: true,
    imagen: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    horario: "11:00 AM - 10:00 PM",
    telefono: "50688888888",
    whatsapp: "50688888888",
    sitio: "https://example.com",
    instagram: "@burgerhouse",
    bannerColor: "#2ee59d"
  }
];

const STORAGE_KEYS = {
  users: "findex_users",
  businesses: "findex_businesses",
  session: "findex_session"
};

function getBusinesses() {
  const raw = localStorage.getItem(STORAGE_KEYS.businesses);
  if (!raw) return [...seedBusinesses];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedBusinesses];
  } catch {
    return [...seedBusinesses];
  }
}

function saveBusinesses(list) {
  localStorage.setItem(STORAGE_KEYS.businesses, JSON.stringify(list));
}

function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.users);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
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
  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function ensureAdminUser() {
  const users = getUsers();
  const cleanEmail = normalizeEmail(ADMIN_EMAIL);
  const existing = users.find(u => u.email === cleanEmail);

  if (!existing) {
    const passwordHash = await hashPassword(ADMIN_PASSWORD);
    users.push({
      id: crypto.randomUUID(),
      name: "Administrador",
      email: cleanEmail,
      passwordHash,
      role: "admin",
      plan: "premium",
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
  } else if (existing.role !== "admin") {
    existing.role = "admin";
    saveUsers(users);
  }
}

async function registerUser({ name, email, password }) {
  const users = getUsers();
  const cleanEmail = normalizeEmail(email);

  if (users.some(u => u.email === cleanEmail)) {
    throw new Error("Ya existe una cuenta con ese correo.");
  }

  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: cleanEmail,
    passwordHash,
    role: cleanEmail === normalizeEmail(ADMIN_EMAIL) ? "admin" : "user",
    plan: null,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);
  setSession(user.id);
  return user;
}

async function loginUser(email, password) {
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

  if (cleanEmail === normalizeEmail(ADMIN_EMAIL) && user.role !== "admin") {
    user.role = "admin";
    saveUsers(users);
  }

  setSession(user.id);
  return user;
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
    users[index] = updatedUser;
    saveUsers(users);
  }
}

function updateCurrentUser(patch) {
  const user = getCurrentUser();
  if (!user) return null;
  const updated = { ...user, ...patch };
  saveCurrentUser(updated);
  return updated;
}

function setUserPlan(planKey) {
  const user = getCurrentUser();
  if (!user) throw new Error("No hay sesión activa.");
  const updated = { ...user, plan: planKey };
  saveCurrentUser(updated);
  return updated;
}

function getPlanDefinition(planKey) {
  return planDefinitions.find(p => p.key === planKey) || null;
}

function addBusiness(newBusiness) {
  const user = getCurrentUser();
  if (!user) throw new Error("Debes iniciar sesión.");

  const list = getBusinesses();
  const nextId = list.length ? Math.max(...list.map(b => b.id)) + 1 : 1;
  const plan = getPlanDefinition(user.plan);

  const business = {
    id: nextId,
    ownerEmail: user.email,
    nombre: newBusiness.nombre,
    categoria: newBusiness.categoria,
    categoriaLabel: getCategoryLabel(newBusiness.categoria),
    ubicacion: newBusiness.ubicacion,
    descripcion: newBusiness.descripcion,
    imagen: newBusiness.imagen,
    horario: newBusiness.horario,
    telefono: newBusiness.telefono,
    whatsapp: newBusiness.whatsapp || newBusiness.telefono,
    sitio: newBusiness.sitio || "https://example.com",
    instagram: newBusiness.instagram || "",
    bannerColor: newBusiness.bannerColor || "#2ee59d",
    rating: 0,
    reseñas: 0,
    verificado: false,
    destacado: plan?.featured || false
  };

  list.unshift(business);
  saveBusinesses(list);
  return business;
}

function updateBusiness(id, patch) {
  const list = getBusinesses();
  const index = list.findIndex(b => b.id === Number(id));
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...patch,
    categoriaLabel: patch.categoria ? getCategoryLabel(patch.categoria) : list[index].categoriaLabel
  };

  saveBusinesses(list);
  return list[index];
}

function deleteBusiness(id) {
  const list = getBusinesses().filter(b => b.id !== Number(id));
  saveBusinesses(list);
}

function getCategoryLabel(categoryKey) {
  const found = categories.find(c => c.key === categoryKey);
  return found ? found.label : categoryKey;
}

function getOwnerBusinesses(email) {
  return getBusinesses().filter(b => b.ownerEmail === email);
}

function isAdmin(user) {
  return !!user && user.role === "admin";
}

ensureAdminUser();
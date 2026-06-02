function createPhotoManager({
  mainInputId,
  galleryInputId,
  mainDropId,
  galleryDropId,
  mainPreviewId,
  galleryPreviewId,
  onError
}) {
  const mainInput = document.getElementById(mainInputId);
  const galleryInput = document.getElementById(galleryInputId);
  const mainDrop = document.getElementById(mainDropId);
  const galleryDrop = document.getElementById(galleryDropId);
  const mainPreview = document.getElementById(mainPreviewId);
  const galleryPreview = document.getElementById(galleryPreviewId);

  let mainImage = "";
  let galleryImages = [];

  function reportError(err) {
    if (typeof onError === "function") {
      onError(err.message || "No se pudo cargar la imagen.");
    }
  }

  function renderMain() {
    if (!mainPreview) return;

    mainPreview.innerHTML = mainImage
      ? `
        <div class="photo-thumb main">
          <img src="${escapeHTML(mainImage)}" alt="Foto principal" />
          <button class="photo-remove" type="button" data-remove-main aria-label="Eliminar foto principal">×</button>
        </div>
      `
      : '<div class="photo-empty">Sin foto principal</div>';

    mainPreview.querySelector("[data-remove-main]")?.addEventListener("click", () => {
      mainImage = "";
      if (mainInput) mainInput.value = "";
      renderMain();
    });
  }

  function renderGallery() {
    if (!galleryPreview) return;

    if (!galleryImages.length) {
      galleryPreview.innerHTML = '<div class="photo-empty">Sin fotos adicionales</div>';
      return;
    }

    galleryPreview.innerHTML = galleryImages.map((image, index) => `
      <div class="photo-thumb">
        <img src="${escapeHTML(image)}" alt="Foto adicional ${index + 1}" />
        <button class="photo-remove" type="button" data-remove-gallery="${index}" aria-label="Eliminar foto adicional">×</button>
      </div>
    `).join("");

    galleryPreview.querySelectorAll("[data-remove-gallery]").forEach(button => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.removeGallery);
        galleryImages = galleryImages.filter((_, itemIndex) => itemIndex !== index);
        renderGallery();
      });
    });
  }

  async function setMainFromFiles(files) {
    try {
      const [file] = Array.from(files || []);
      if (!file) return;
      mainImage = await readImageFile(file);
      renderMain();
    } catch (err) {
      reportError(err);
    }
  }

  async function addGalleryFromFiles(files) {
    try {
      const available = IMAGE_LIMITS.maxGalleryImages - galleryImages.length;
      if (available <= 0) return;

      const images = await readImageFiles(files, available);
      galleryImages = normalizeImageList([...galleryImages, ...images]);
      renderGallery();
    } catch (err) {
      reportError(err);
    }
  }

  function bindDrop(zone, callback) {
    if (!zone) return;

    ["dragenter", "dragover"].forEach(eventName => {
      zone.addEventListener(eventName, event => {
        event.preventDefault();
        zone.classList.add("is-dragging");
      });
    });

    ["dragleave", "drop"].forEach(eventName => {
      zone.addEventListener(eventName, event => {
        event.preventDefault();
        zone.classList.remove("is-dragging");
      });
    });

    zone.addEventListener("drop", event => {
      callback(event.dataTransfer?.files);
    });
  }

  mainInput?.addEventListener("change", event => setMainFromFiles(event.target.files));
  galleryInput?.addEventListener("change", event => addGalleryFromFiles(event.target.files));
  bindDrop(mainDrop, setMainFromFiles);
  bindDrop(galleryDrop, addGalleryFromFiles);

  renderMain();
  renderGallery();

  return {
    getImages() {
      return {
        imagen: mainImage,
        galeria: normalizeImageList(galleryImages)
      };
    },
    setImages({ imagen = "", galeria = [] } = {}) {
      mainImage = imagen || "";
      galleryImages = normalizeImageList(galeria);
      if (mainInput) mainInput.value = "";
      if (galleryInput) galleryInput.value = "";
      renderMain();
      renderGallery();
    },
    clear() {
      mainImage = "";
      galleryImages = [];
      if (mainInput) mainInput.value = "";
      if (galleryInput) galleryInput.value = "";
      renderMain();
      renderGallery();
    },
    hasMain() {
      return !!mainImage;
    }
  };
}

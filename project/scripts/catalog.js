
let storedGearCollection = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchNexusCatalog();
  initializeFilterListeners();
  initializeModalControls();
});

async function fetchNexusCatalog() {
  const gridTarget = document.getElementById('gear-catalog-grid');
  const errorTarget = document.getElementById('directory-error-fallback');
  if (!gridTarget) return;

  try {
    const response = await fetch('data/gear.json');
    if (!response.ok) { throw new Error(`Network failure caught: ${response.status}`); }

    storedGearCollection = await response.json();
    renderCatalogGrid(storedGearCollection);

  } catch (error) {
    console.error("Pipeline failure fetching product catalog properties:", error);
    if (errorTarget) {
      errorTarget.textContent = `Failed to process gear matrix files. Please trace network bounds and reload.`;
      errorTarget.style.display = "block";
    }
  }
}

function renderCatalogGrid(itemsArray) {
  const gridTarget = document.getElementById('gear-catalog-grid');
  if (!gridTarget) return;

  gridTarget.innerHTML = ''; 

  itemsArray.forEach(item => {
    const cardNode = document.createElement('article');
    cardNode.className = 'apparel-catalog-card';

    // Exclusively leveraging Template Literals string construction here
    cardNode.innerHTML = `
      <h2 class="grid-area-name">${item.name}</h2>
      <figure class="grid-area-photo">
        <img src="${item.image}" alt="Product blueprint matrix capture showing ${item.name}" loading="lazy" width="300" height="200">
      </figure>
      <p class="grid-area-desc">${item.feature}</p>
      <div class="grid-area-meta">
        <span class="price-indicator">$${item.price}</span>
        <span class="category-badge-tag">${item.category.toUpperCase()}</span>
      </div>
      <button class="grid-area-btn btn-open-details" data-id="${item.id}">Learn More</button>
    `;
    gridTarget.appendChild(cardNode);
  });

  attachCatalogButtonTriggers();
}

function initializeFilterListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      document.querySelector('.filter-btn.active-filter')?.classList.remove('active-filter');
      event.target.classList.add('active-filter');

      const filterCategory = event.target.getAttribute('data-category');

      if (filterCategory === 'all') {
        renderCatalogGrid(storedGearCollection);
      } else {
        const filteredDataset = storedGearCollection.filter(item => item.category === filterCategory);
        renderCatalogGrid(filteredDataset);
      }
    });
  });
}

function attachCatalogButtonTriggers() {
  const detailTriggers = document.querySelectorAll('.btn-open-details');
  detailTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      const selectedId = event.target.getAttribute('data-id');
      const matchedItemObject = storedGearCollection.find(item => item.id === selectedId);
      if (matchedItemObject) { openAccessibleModal(matchedItemObject); }
    });
  });
}

function openAccessibleModal(item) {
  const dialogElement = document.getElementById('gear-detail-modal');
  if (!dialogElement) return;

  document.getElementById('modal-product-name').textContent = item.name;
  document.getElementById('modal-product-category').textContent = item.category.toUpperCase();
  document.getElementById('modal-product-price').textContent = item.price;
  document.getElementById('modal-product-feature').textContent = item.feature;
  document.getElementById('modal-product-specs').textContent = item.specs;

  const modalImg = document.getElementById('modal-product-image');
  if (modalImg) {
    modalImg.src = item.image;
    modalImg.alt = `Macro hardware zoom visualization detailing item profile specifications for ${item.name}`;
  }

  dialogElement.showModal();
}

function initializeModalControls() {
  const dialogElement = document.getElementById('gear-detail-modal');
  const closeBtn = document.getElementById('modal-close-trigger-btn');

  if (closeBtn && dialogElement) {
    closeBtn.addEventListener('click', () => { dialogElement.close(); });
    dialogElement.addEventListener('click', (e) => { if (e.target === dialogElement) { dialogElement.close(); } });
  }
}

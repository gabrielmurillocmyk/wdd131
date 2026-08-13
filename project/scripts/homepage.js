/**
 * Global Core Module Architecture for Gaming Nexus
 * Controls menu responsiveness, cross-page wayfinding links, and footer metadata generation.
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeMobileMenu();
  injectFooterMetadata();
  trackUserPlatformVisitState();
});

function initializeMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-menu-btn');
  const navigationMenu = document.querySelector('.navigation-menu');

  if (hamburgerBtn && navigationMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navigationMenu.classList.toggle('menu-open');
      hamburgerBtn.textContent = navigationMenu.classList.contains('menu-open') ? '✕' : '☰';
    });
  }
}

function trackUserPlatformVisitState() {
  const stateBanner = document.getElementById('welcome-state-banner');
  if (!stateBanner) return;

  const totalVisitsCount = parseInt(localStorage.getItem('nexusVisitsTotal'), 10) || 0;
  const rawUpdatedCount = totalVisitsCount + 1;
  
  localStorage.setItem('nexusVisitsTotal', rawUpdatedCount.toString());

  // Conditional branching handling the welcome messages strings outputs
  if (totalVisitsCount === 0) {
    stateBanner.textContent = `Welcome to Gaming Nexus! Explore our curated low-latency catalog directories.`;
    stateBanner.style.display = "block";
  } else {
    stateBanner.textContent = `Welcome back! This is log visit #${rawUpdatedCount} to your player dashboard center.`;
    stateBanner.style.display = "block";
  }
}

function injectFooterMetadata() {
  const yearSpan = document.getElementById('footer-year');
  const modifiedSpan = document.getElementById('footer-modified-stamp');
  
  if (yearSpan) { yearSpan.textContent = new Date().getFullYear().toString(); }
  if (modifiedSpan) { modifiedSpan.textContent = document.lastModified; }
}

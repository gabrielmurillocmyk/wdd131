const products = [
  { id: "fps-01", name: "Apex Precision Mechanical Keyboard", averagerating: 4.8 },
  { id: "fps-02", name: "Raptor Low-Latency Optical Mouse", averagerating: 4.6 },
  { id: "fgt-01", name: "Vanguard Arcade Fight Stick", averagerating: 4.9 },
  { id: "rac-01", name: "Formula-Drive Force Wheel", averagerating: 4.7 },
  { id: "spt-01", name: "Titan Spatial Audio Headset", averagerating: 4.5 },
  { id: "spt-02", name: "Vector Pro Hall-Effect Controller", averagerating: 4.7 },
  { id: "gen-01", name: "Endurance Ergonomic Gaming Chair", averagerating: 4.4 },
  { id: "gam-01", name: "Tactical Strike: Remastered (Steelbook)", averagerating: 4.8 },
  { id: "gam-02", name: "FC 26", averagerating: 4.2 },
  { id: "gam-03", name: "Grand Prix Simulator Ultra", averagerating: 4.9 }
];

document.addEventListener("DOMContentLoaded", () => {
  populateGenreMenu();
  enforceAccessibleKeyboardTabOrdering();
});

function populateGenreMenu() {
  const selectNode = document.getElementById("primary-genre-select");
  if (!selectNode) return;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id; // Map array id to the value attribute field
    option.textContent = product.name; // Map array name to text display field
    selectNode.appendChild(option);
  });
}

function enforceAccessibleKeyboardTabOrdering() {
  const formTarget = document.getElementById('gaming-nexus-custom-form');
  if (!formTarget) return;

  const formInteractiveInputs = formTarget.querySelectorAll(
    'select, input[type="radio"], input[type="date"], input[type="checkbox"], textarea, input[type="text"], input[type="submit"]'
  );

  formInteractiveInputs.forEach((inputNode, indexingCoordinate) => {
    inputNode.setAttribute('tabindex', (indexingCoordinate + 1).toString());
  });
}

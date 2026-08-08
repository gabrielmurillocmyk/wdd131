
// Strict Rubric Data Source Array
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

document.addEventListener("DOMContentLoaded", () => {
  populateProductOptions();
  trackReviewSubmissions();
  ensureCorrectTabOrder();
});

/**
 * Dynamically builds options where array name is for display text and array id is for value.
 */
function populateProductOptions() {
  const selectNode = document.getElementById("product-select");
  if (!selectNode) return;

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id; // Array's id is used for the value field
    option.textContent = product.name; // Array's name field is used for display text
    selectNode.appendChild(option);
  });
}
/**
 * Tracks the number of reviews completed via localStorage and handles successful increments.
 */
function trackReviewSubmissions() {
  const displayField = document.getElementById("counter-display");
  const urlParameters = new URLSearchParams(window.location.search);
  
  // Retrieve completed count parameter from local database cache
  let reviewsCount = parseInt(localStorage.getItem("totalCompletedReviewsCount"), 10) || 0;

  // Verify if page is loading following an active successful GET form submission redirection
  if (urlParameters.has("productName") && urlParameters.has("overallRating")) {
    reviewsCount += 1;
    localStorage.setItem("totalCompletedReviewsCount", reviewsCount.toString());
    
    // Immediately redirect back to clean up parameters and present updated scores
    window.location.href = "review.html?status=success";
    return;
  }

  // Display tracking results dynamically inside the notification badge header area
  if (displayField) {
    if (reviewsCount === 0) {
      displayField.textContent = "Reviews Completed Counter: 0 (Submit your first evaluation to start!)";
    } else if (reviewsCount === 1) {
      displayField.textContent = "Reviews Completed Counter: 1 review completed.";
    } else {
      displayField.textContent = `Reviews Completed Counter: ${reviewsCount} reviews completed.`;
    }
  }
}

/**
 * Guarantees correct and seamless sequential keyboard tab tracking behavior
 */
function ensureCorrectTabOrder() {
  const elements = document.querySelectorAll(
    "#reviewForm select, #reviewForm input[type='radio'], #reviewForm input[type='date'], #reviewForm input[type='checkbox'], #reviewForm textarea, #reviewForm input[type='text'], #reviewForm input[type='submit']"
  );
  elements.forEach((element, idx) => {
    element.setAttribute("tabindex", (idx + 1).toString());
  });
}
// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

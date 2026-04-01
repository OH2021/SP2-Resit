// js/home.js
import { loadNavbar } from "./ui.js";
import { loadListings } from "./listings.js";

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  loadListings();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      loadListings(e.target.value);
    });
  }
});

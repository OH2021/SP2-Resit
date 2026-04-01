// js/create-listing.js
import { loadNavbar } from "./ui.js";
import { createListing } from "./listings.js";
import { getToken } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  const token = getToken();
  if (!token) {
    alert("You must be logged in to create a listing!");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("createListingForm");

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const media = document.getElementById("media").value.trim();
    const deadline = document.getElementById("deadline").value;

    if (!title || !description || !deadline) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      console.log("Sending listing to API...");

      await createListing(title, description, media, deadline);

      alert("Listing created successfully!");

      window.location.href = "profile.html";
    } catch (error) {
      console.error("Create listing error:", error);
      alert("Failed to create listing.");
    }
  });
});

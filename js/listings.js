// js/listings.js
import { request, getToken, getUser } from "./api.js";

let currentPage = 0;
const pageSize = 6;
let allListings = [];

/*
LOAD LISTINGS
*/
export async function loadListings(search = "", reset = false) {
  try {
    if (reset) {
      currentPage = 0;
      allListings = [];
    }

    const token = getToken();

    // Fetch all public listings (including all users' listings)
    const res = await request(
      "/auction/listings?limit=100&_bids=true&_seller=true&_active=true",
    );
    let listings = res.data || [];

    // If logged in, fetch current user's listings and merge on top
    if (token) {
      try {
        const user = getUser();
        if (user?.name) {
          const userRes = await request(
            `/auction/profiles/${user.name}/listings?_bids=true&_seller=true`,
            "GET",
          );

          // Merge: user's listings on top, avoid duplicates
          listings = [
            ...userRes.data,
            ...listings.filter(
              (l) => !userRes.data.find((ul) => ul.id === l.id),
            ),
          ];
        }
      } catch (err) {
        console.warn("Could not fetch user listings:", err);
      }
    }

    // Sort: active first, newest first
    const now = new Date();
    listings.sort((a, b) => {
      const aActive = new Date(a.endsAt) > now;
      const bActive = new Date(b.endsAt) > now;

      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      return new Date(b.endsAt) - new Date(a.endsAt);
    });

    // Reverse the list so newest appears first
    listings.reverse();

    allListings = listings;

    // Apply search filter
    let filteredListings = allListings;
    if (search) {
      filteredListings = allListings.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    renderListingsPage(filteredListings, currentPage);
  } catch (error) {
    console.error("Failed to load listings:", error);
    const container = document.getElementById("listings");
    if (container)
      container.innerHTML = `<div class="text-center mt-5"><h4>Failed to load listings</h4></div>`;
  }
}

/*
RENDER ONE PAGE
*/
function renderListingsPage(listings, page) {
  const container = document.getElementById("listings");
  const nextBtnContainer = document.getElementById("nextListingsBtn");
  if (!container || !nextBtnContainer) return;

  const start = page * pageSize;
  const end = start + pageSize;
  const pageListings = listings.slice(start, end);

  if (page === 0) container.innerHTML = "";

  pageListings.forEach((item) => {
    const now = new Date();
    const endsAt = new Date(item.endsAt);
    const isExpired = endsAt <= now;

    const image =
      item.media?.length && item.media[0].url
        ? item.media[0].url
        : "https://placehold.co/400x250?text=No+Image";

    const bids = item.bids?.length || 0;

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          src="${image}"
          class="card-img-top"
          style="height:220px; object-fit:cover;"
          onerror="this.onerror=null;this.src='https://placehold.co/400x250?text=Image+Unavailable';"
        >
        <div class="card-body">
          <h5 class="card-title">
            ${item.title} ${isExpired ? '<span class="badge bg-danger">Expired</span>' : ""}
          </h5>
          <p class="card-text text-muted">
            ${item.description?.slice(0, 100) || "No description"}
          </p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <small class="text-muted">${bids} bid${bids !== 1 ? "s" : ""}</small>
          <a href="listing.html?id=${item.id}" class="btn btn-primary btn-sm">
            View Listing
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Show or hide "Load More" button
  if (end < listings.length) {
    nextBtnContainer.innerHTML = `
      <div class="text-center py-3">
        <button id="loadMoreBtn" class="btn btn-secondary px-4">Load More</button>
      </div>
    `;
    document.getElementById("loadMoreBtn").addEventListener("click", () => {
      currentPage++;
      renderListingsPage(listings, currentPage);
    });
  } else {
    nextBtnContainer.innerHTML = "";
  }
}

/*
CREATE LISTING
*/
export async function createListing(title, description, media, deadline) {
  try {
    const body = {
      title,
      description,
      endsAt: new Date(deadline).toISOString(),
      public: true, // public by default
      media: media ? [{ url: media, alt: title }] : [],
    };

    const newListing = await request("/auction/listings", "POST", body);
    console.log("Created listing:", newListing);

    alert("Listing created successfully!");
    setTimeout(() => (window.location.href = "index.html"), 500);
  } catch (error) {
    console.error("Create listing failed:", error);
    alert("Could not create listing");
  }
}

/*
AUTO LOAD LISTINGS ON SEARCH
*/
document.addEventListener("DOMContentLoaded", () => {
  loadListings();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      loadListings(e.target.value, true);
    });
  }
});

// js/listings.js

import { request } from "./api.js";

/*
LOAD LISTINGS
*/
export async function loadListings(search = "") {
  try {
    const res = await request(
      "/auction/listings?limit=30&_bids=true&_seller=true",
    );

    const container = document.getElementById("listings");
    if (!container) return;

    let listings = res.data;

    // Search filter
    if (search) {
      listings = listings.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (listings.length === 0) {
      container.innerHTML = `
        <div class="text-center mt-5">
          <h4>No listings found</h4>
        </div>
      `;
      return;
    }

    container.innerHTML = listings
      .map((item) => {
        // Get image safely
        let image = "https://placehold.co/400x250?text=No+Image";

        if (item.media && item.media.length > 0 && item.media[0].url) {
          image = item.media[0].url;
        }

        const bids = item.bids?.length || 0;

        return `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">

            <img 
              src="${image}"
              class="card-img-top"
              style="height:220px; object-fit:cover;"
              onerror="this.onerror=null;this.src='https://placehold.co/400x250?text=Image+Unavailable';"
            >

            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text text-muted">
                ${item.description?.slice(0, 100) || "No description"}
              </p>
            </div>

            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted">
                ${bids} bid${bids !== 1 ? "s" : ""}
              </small>

              <a href="listing.html?id=${item.id}" 
                 class="btn btn-primary btn-sm">
                View Listing
              </a>
            </div>

          </div>
        </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to load listings:", error);

    const container = document.getElementById("listings");
    if (container) {
      container.innerHTML = `
        <div class="text-center mt-5">
          <h4>Failed to load listings</h4>
        </div>
      `;
    }
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
    };

    // Add image if provided
    if (media) {
      body.media = [
        {
          url: media,
          alt: title,
        },
      ];
    }

    await request("/auction/listings", "POST", body);

    alert("Listing created successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Create listing failed:", error);
    alert("Could not create listing");
  }
}

/*
AUTO LOAD LISTINGS WHEN PAGE LOADS
*/
document.addEventListener("DOMContentLoaded", () => {
  loadListings();

  const searchInput = document.getElementById("search");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      loadListings(e.target.value);
    });
  }
});

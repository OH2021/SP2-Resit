import { request } from "./api.js";

/*
LOAD LISTINGS
*/
export async function loadListings(search = "") {
  try {
    const res = await request("/auction/listings?_bids=true&_seller=true");

    const container = document.getElementById("listings");
    if (!container) return;

    let listings = res.data;

    // Search filter
    if (search) {
      listings = listings.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    container.innerHTML = listings
      .map((item) => {
        const image =
          item.media && item.media.length > 0
            ? item.media[0].url
            : "https://via.placeholder.com/400x250?text=No+Image";

        const bids = item.bids?.length || 0;

        return `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">

            <img 
              src="${image}" 
              class="card-img-top"
              style="height:220px; object-fit:cover;"
            >

            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">
                ${item.description?.slice(0, 100) || "No description"}
              </p>
            </div>

            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted">${bids} bids</small>
              <a href="listing.html?id=${item.id}" class="btn btn-primary btn-sm">
                View
              </a>
            </div>

          </div>
        </div>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to load listings:", error);
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

    if (media) {
      body.media = [
        {
          url: media,
          alt: title,
        },
      ];
    }

    await request("/auction/listings", "POST", body);

    alert("Listing created!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Create listing failed:", error);
    alert("Could not create listing");
  }
}

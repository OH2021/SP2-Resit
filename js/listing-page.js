// js/listing-page.js
import { loadNavbar } from "./ui.js";
import { getToken, request } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  loadNavbar();

  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");

  if (!listingId) {
    alert("No listing id provided!");
    window.location.href = "index.html";
    return;
  }

  const listingContainer = document.getElementById("listingDetails");
  const bidsList = document.getElementById("bidsList");
  const bidForm = document.getElementById("bidForm");
  const bidAmountInput = document.getElementById("bidAmount");

  let listing;

  try {
    // Fetch the listing with bids and seller
    const res = await request(
      `/auction/listings/${listingId}?_bids=true&_seller=true`,
    );
    listing = res.data;

    const imageUrl =
      listing.media && listing.media.length > 0
        ? typeof listing.media[0] === "string"
          ? listing.media[0]
          : listing.media[0].url || "https://placehold.co/400x250?text=No+Image"
        : "https://placehold.co/400x250?text=No+Image";

    listingContainer.innerHTML = `
      <h2>${listing.title}</h2>
      <img src="${imageUrl}" class="img-fluid rounded mb-3" alt="${listing.title}" />
      <p>${listing.description}</p>
      <p><strong>Deadline:</strong> ${new Date(listing.endsAt).toLocaleString()}</p>
      <p><strong>Owner:</strong> ${listing.seller?.name || listing.sellerId || "Unknown"}</p>
    `;
  } catch (err) {
    console.error("Failed to load listing:", err);
    listingContainer.innerHTML =
      '<p class="text-danger">Failed to load listing details.</p>';
    return;
  }

  // Display bids
  function displayBids(bids) {
    if (!bids || bids.length === 0) {
      bidsList.innerHTML = "<li class='list-group-item'>No bids yet.</li>";
      return;
    }

    bids.sort((a, b) => b.amount - a.amount);

    bidsList.innerHTML = bids
      .map(
        (bid) =>
          `<li class="list-group-item">
             ${bid.user?.name || "Unknown"} bid $${bid.amount}
           </li>`,
      )
      .join("");
  }

  displayBids(listing.bids);

  // Handle new bid submission
  bidForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("You must be logged in to place a bid!");
      window.location.href = "login.html";
      return;
    }

    const bidValue = parseFloat(bidAmountInput.value);
    if (isNaN(bidValue) || bidValue <= 0) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      await request(`/auction/listings/${listingId}/bids`, "POST", {
        amount: bidValue,
      });

      alert("Bid placed successfully!");
      bidAmountInput.value = "";

      // Reload listing to update bids
      const updatedRes = await request(
        `/auction/listings/${listingId}?_bids=true&_seller=true`,
      );
      listing = updatedRes.data;
      displayBids(listing.bids);
    } catch (err) {
      console.error("Failed to place bid:", err);
      alert(err.message || "Failed to place bid");
    }
  });
});

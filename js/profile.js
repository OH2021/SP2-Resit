// js/profile.js
import { request, getUser } from "./api.js";
import { loadNavbar } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  loadNavbar();

  const user = getUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  await loadProfile(user.name);

  document
    .getElementById("updateAvatarBtn")
    .addEventListener("click", updateAvatar);
});

async function loadProfile(username) {
  try {
    const res = await request(`/auction/profiles/${username}?_listings=true`);

    const profile = res.data;

    document.getElementById("profileName").textContent = profile.name;
    document.getElementById("profileEmail").textContent = profile.email;
    document.getElementById("profileCredits").textContent = profile.credits;

    if (profile.avatar && profile.avatar.url) {
      document.getElementById("profileAvatar").src = profile.avatar.url;
    }

    renderListings(profile.listings || []);
  } catch (err) {
    console.error("Profile load error:", err);
    alert("Failed to load profile.");
  }
}

function renderListings(listings) {
  const container = document.getElementById("userListings");

  if (!listings.length) {
    container.innerHTML = "<p>No listings yet.</p>";
    return;
  }

  container.innerHTML = listings
    .map((listing) => {
      let image =
        listing.media && listing.media.length
          ? typeof listing.media[0] === "string"
            ? listing.media[0]
            : listing.media[0].url
          : "https://placehold.co/400x250";

      return `
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm h-100">
            <img src="${image}" class="card-img-top" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${listing.title}</h5>
              <a href="listing.html?id=${listing.id}" class="btn btn-primary mt-auto w-100">
                View Listing
              </a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

async function updateAvatar() {
  const user = getUser();
  const avatarUrl = document.getElementById("avatarUrl").value.trim();

  if (!avatarUrl) {
    alert("Please enter a valid avatar URL");
    return;
  }

  try {
    await request(`/auction/profiles/${user.name}`, "PUT", {
      avatar: {
        url: avatarUrl,
      },
    });

    document.getElementById("profileAvatar").src = avatarUrl;
    document.getElementById("avatarUrl").value = "";

    alert("Avatar updated successfully!");
  } catch (err) {
    console.error("Avatar update error:", err);
    alert("Failed to update avatar.");
  }
}

import { logout } from "./auth.js";

export function loadNavbar(showHome = false) {
  const nav = document.getElementById("navLinks");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!nav) return;

  let html = "";

  if (showHome) {
    html += `
      <a href="index.html" class="nav-link text-white fw-semibold">
        Home
      </a>
    `;
  }

  if (user) {
    html += `
      <a href="create-listing.html" class="btn btn-outline-light">
        Sell Item
      </a>

      <a href="profile.html" class="btn btn-outline-info">
        Profile
      </a>

      <button id="logoutBtn" class="btn btn-outline-danger">
        Logout
      </button>
    `;
  } else {
    html += `
      <a href="login.html" class="btn btn-outline-light">
        Login
      </a>

      <a href="register.html" class="btn btn-warning">
        Register
      </a>
    `;
  }

  nav.innerHTML = html;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
}

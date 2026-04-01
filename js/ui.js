import { getToken, clearUser } from "./api.js";

export function loadNavbar() {
  const navLinks = document.getElementById("navLinks");
  if (!navLinks) return;

  const token = getToken();
  navLinks.innerHTML = ""; // Clear existing buttons

  const createButton = (
    text,
    href,
    classes = "btn btn-outline-light text-white",
  ) => {
    const li = document.createElement("li");
    li.className = "nav-item me-2";
    const a = document.createElement("a");
    a.className = `nav-link ${classes}`;
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    return li;
  };

  // Always show Home
  navLinks.appendChild(createButton("Home", "index.html"));

  if (token) {
    // Logged in: show Profile, Create Listing, Logout
    navLinks.appendChild(createButton("Profile", "profile.html"));
    navLinks.appendChild(createButton("Create Listing", "create-listing.html"));

    const logoutLi = document.createElement("li");
    logoutLi.className = "nav-item me-2";
    const logoutA = document.createElement("a");
    logoutA.className = "nav-link btn btn-outline-danger text-white";
    logoutA.href = "#";
    logoutA.textContent = "Logout";
    logoutA.addEventListener("click", (e) => {
      e.preventDefault();
      clearUser();
      window.location.href = "index.html";
    });
    logoutLi.appendChild(logoutA);
    navLinks.appendChild(logoutLi);
  } else {
    // Logged out: show Login/Register + disabled Profile + Create redirecting to login
    navLinks.appendChild(
      createButton("Login", "login.html", "btn btn-outline-success text-white"),
    );
    navLinks.appendChild(
      createButton(
        "Register",
        "register.html",
        "btn btn-outline-warning text-white",
      ),
    );

    navLinks.appendChild(createButton("Profile", "login.html"));
    navLinks.appendChild(createButton("Create Listing", "login.html"));
  }
}

// js/auth.js

import { request, endpoints, saveUser, clearUser } from "./api.js";

/*
REGISTER USER
*/
export async function register(name, email, password) {
  try {
    await request(endpoints.register, "POST", {
      name: name.trim(),
      email: email.trim(),
      password: password,
    });

    alert("Account created! Please login.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Register failed:", error);
    alert(error.message);
  }
}

/*
LOGIN USER
*/
export async function login(email, password) {
  try {
    const response = await request(
      `${endpoints.login}?_holidays=false`,
      "POST",
      {
        email: email.trim(),
        password: password,
      },
    );

    // Save user session
    saveUser(response.data);

    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message);
  }
}

/*
LOGOUT
*/
export function logout() {
  clearUser();
  window.location.href = "index.html";
}

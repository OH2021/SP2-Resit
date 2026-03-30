// js/api.js

export const API = "https://v2.api.noroff.dev";

/*
GET TOKEN
*/
export function getToken() {
  return localStorage.getItem("token");
}

/*
GET LOGGED IN USER
*/
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/*
SAVE USER SESSION
*/
export function saveUser(data) {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", data.accessToken);
}

/*
CLEAR SESSION
*/
export function clearUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

/*
API REQUEST HELPER
*/
export async function request(endpoint, method = "GET", body = null) {
  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.errors?.[0]?.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

/*
API ENDPOINTS
*/
export const endpoints = {
  register: "/auth/register",
  login: "/auth/login",
  listings: "/auction/listings",
  profiles: "/auction/profiles",
};

import { request, getUser } from "./api.js";

export async function loadProfile() {
  const user = getUser();

  const res = await request(`/auction/profiles/${user.name}`);

  document.getElementById("profile").innerHTML = `
    <p><strong>Name:</strong> ${res.data.name}</p>
    <p><strong>Credits:</strong> ${res.data.credits}</p>
  `;
}

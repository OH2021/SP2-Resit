import { request, getToken } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

export async function loadListing() {
  const res = await request(`/auction/listings/${id}?_bids=true`);
  const item = res.data;

  document.getElementById("listing").innerHTML = `
    <h1 class="text-2xl font-bold">${item.title}</h1>
    <img src="${item.media?.[0] || ""}" class="my-4">

    <p>${item.description}</p>

    <h3 class="mt-4 font-bold">Bids:</h3>
    <ul>${item.bids.map((b) => `<li>${b.amount}</li>`).join("")}</ul>

    ${
      getToken()
        ? `
      <form id="bidForm" class="mt-4">
        <input id="amount" type="number" class="border p-2 w-full mb-2">
        <button class="bg-green-500 text-white px-4 py-2 rounded">Bid</button>
      </form>
    `
        : "<p class='text-red-500'>Login to bid</p>"
    }
  `;

  if (getToken()) {
    document.getElementById("bidForm").addEventListener("submit", placeBid);
  }
}

async function placeBid(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;

  await request(`/auction/listings/${id}/bids`, "POST", { amount });

  location.reload();
}

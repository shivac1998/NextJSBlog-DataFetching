export async function loadAccount() {
  // Calling an external API endpoint to get JSON data
  const res = await fetch("https://api.artic.edu/api/v1/artworks/search");
  if (!res.ok) {
    throw new Error("Could not retrieve data");
  }
  const data = await res.json();

  return data;
}

// https://jsonplaceholder.typicode.com/todos/1
// https://testnet.dragonglass.me/api/accounts/0.0.1245

// https://api.artic.edu/api/v1/artworks/search

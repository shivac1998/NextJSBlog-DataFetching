export async function getAccountId() {
  const res = await fetch(
    "https://testnet.dragonglass.me/api/accounts/0.0.1245"
  );
  if (!res.ok) {
    throw new Error("Could not retrieve data");
  }
  return res.json;
}
// https://testnet.dragonglass.me/api/accounts/0.0.1245

// https://jsonplaceholder.typicode.com/todos/1

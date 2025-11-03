const BASE = "/api";

export async function generateNames(payload: any) {
  const res = await fetch(`${BASE}/names/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getNameDetail(name: string) {
  const res = await fetch(`${BASE}/names/detail?name=${encodeURIComponent(name)}`);
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${BASE}/user/profile`);
  return res.json();
}

export async function addFavorite(name: string) {
  const res = await fetch(`${BASE}/user/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function createOrder(product: string, name: string) {
  const res = await fetch(`${BASE}/pay/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, name })
  });
  return res.json();
}

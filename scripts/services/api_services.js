
export async function getDatas() {
  const response = await fetch('../data/photographers.json');
  return response.json();
}
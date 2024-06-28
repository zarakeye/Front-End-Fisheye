import { getDatas } from "./api_services.js";
export async function getPhotographers() {
  const { photographers } = await getDatas();
  return { photographers };
}

// Get a specific photographer by this id
export async function getPhotographerById(idParam) {
  const { photographers } = await getPhotographers();
  return photographers.find(photographer => photographer.id === idParam);
}
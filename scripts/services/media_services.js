import { getDatas } from "./api_services.js";
// Get Media objects list 
export async function getMedias() {
  const { media } = await getDatas();
  return { media };
}
export async function isVideo(media) {
  return media.hasOwnProperty('video');
}

// Get medias from the photographer whose id is specified as param
export async function getMediasByPhotographerId(photographerIdParam) {
  const { media } = await getMedias();
  return media.filter(elt => elt.photographerId === photographerIdParam);
}
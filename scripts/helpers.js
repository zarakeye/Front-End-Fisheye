export async function getDatas() {
  const response = await fetch('../data/photographers.json');
  return response.json();
}

export async function getPhotographers() {
  const { photographers } = await getDatas();
  return { photographers };
}

export async function getPhotographerById(idParam) {
  const { photographers } = await getPhotographers();
  return photographers.find(photographer => photographer.id === idParam);
}

export async function getMedias() {
  const { media } = await getDatas();
  return { media };
}

export async function getMediasByPhotographerId(photographerIdParam) {
  const { media } = await getMedias();
  return media.filter(elt => elt.photographerId === photographerIdParam);
}
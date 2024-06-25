// Retrieve all datas from photographers.json
export async function getDatas() {
  const response = await fetch('../data/photographers.json');
  return response.json();
}

// Get photographer objects list from extracted datas 
export async function getPhotographers() {
  const { photographers } = await getDatas();
  return { photographers };
}

// Get a specific photographer by this id
export async function getPhotographerById(idParam) {
  const { photographers } = await getPhotographers();
  return photographers.find(photographer => photographer.id === idParam);
}

// Get Media objects list 
export async function getMedias() {
  const { media } = await getDatas();
  return { media };
}

// Get medias from the photographer whose id is specified as param
export async function getMediasByPhotographerId(photographerIdParam) {
  const { media } = await getMedias();
  return media.filter(elt => elt.photographerId === photographerIdParam);
}
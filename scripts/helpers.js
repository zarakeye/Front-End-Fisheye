export function extractFileNameWithoutExtension(filename, regex) {
  if (filename.test(regex)) {
    const filenameWithoutExtension = filename.replace(regex, '');
    return filenameWithoutExtension;
  }
}

export function isVideo(filename) {
  if (filename.test(/\.mp4$/i)) {
    return true;
  }
}

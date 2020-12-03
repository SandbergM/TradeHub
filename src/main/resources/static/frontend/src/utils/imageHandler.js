import imageMissing from "../images/bild_saknas.png";

const serverAddress = "http://localhost:8080";

export const getThumbNail = (images) => {
  if (!images || !images[0]) {
    return imageMissing;
  }

  for (let image of images) {
    if (image.primary === true) {
      return serverAddress + image.url;
    }
  }

  return serverAddress + images[0].url;
};

export const sortImagesAfterPriority = (images) => {
  let sortedImages = [];

  images.forEach((img) => {
    if (img.primary) {
      sortedImages.unshift(img);
    } else {
      sortedImages.push(img);
    }
  });

  return sortedImages;
};

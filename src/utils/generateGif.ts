import GIF from "gif.js.optimized";

export const generateGif = async (
  photos: string[]
): Promise<string> => {
  return new Promise(async (resolve) => {
    // LOAD IMAGES
    const loadedImages = await Promise.all(
      photos.map((src) => {
        return new Promise<HTMLImageElement>(
          (resolveImage) => {
            const img = new Image();

            img.src = src;

            img.onload = () => {
              resolveImage(img);
            };
          }
        );
      })
    );

    // USE REAL IMAGE SIZE
    const width = loadedImages[0].width;
    const height = loadedImages[0].height;

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width,
      height,

      workerScript: "/gif.worker.js",
    });

    // ADD FRAMES
    loadedImages.forEach((img) => {
      gif.addFrame(img, {
        delay: 700,
      });
    });

    // FINISH
    gif.on("finished", (blob: Blob) => {
      const url = URL.createObjectURL(blob);

      resolve(url);
    });

    gif.render();
  });
};
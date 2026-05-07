export const generatePhotoStrip = async (
  photos: string[]
): Promise<string> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas not supported");

  // 🌸 Portrait booth dimensions
  const stripWidth = 420;

  const photoWidth = 340;
  const photoHeight = 420;

  const gap = 24;
  const padding = 40;

  const footerHeight = 100;

  canvas.width = stripWidth;

  canvas.height =
    photos.length * photoHeight +
    (photos.length - 1) * gap +
    padding * 2 +
    footerHeight;

  // 🌸 Soft pastel background
  ctx.fillStyle = "#fff7fb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < photos.length; i++) {
    const img = new Image();
    img.src = photos[i];

    await new Promise<void>((resolve) => {
      img.onload = () => {
        const x = (stripWidth - photoWidth) / 2;

        const y =
          padding + i * (photoHeight + gap);

        ctx.save();

        roundRect(
          ctx,
          x,
          y,
          photoWidth,
          photoHeight,
          28
        );

        ctx.clip();

        // 🌸 Keep aspect ratio properly
        drawImageCover(
          ctx,
          img,
          x,
          y,
          photoWidth,
          photoHeight
        );

        ctx.restore();

        resolve();
      };
    });
  }

  // 🌸 Footer branding
  ctx.fillStyle = "#ff4fa3";
  ctx.font = "bold 30px Poppins";
  ctx.textAlign = "center";

  ctx.fillText(
    "FunFrame ✨",
    stripWidth / 2,
    canvas.height - 45
  );

  ctx.fillStyle = "#999";
  ctx.font = "18px Poppins";

  const date = new Date().toLocaleDateString();

  ctx.fillText(
    date,
    stripWidth / 2,
    canvas.height - 15
  );

  return canvas.toDataURL("image/png");
};

// 🌸 Rounded rectangle helper
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();

  ctx.moveTo(x + radius, y);

  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(x + width, y + height - radius);

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(x + radius, y + height);

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(x, y + radius);

  ctx.quadraticCurveTo(x, y, x + radius, y);

  ctx.closePath();
}

// 🌸 Proper image crop helper
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const imgRatio = img.width / img.height;
  const boxRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;

  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > boxRatio) {
    drawHeight = height;
    drawWidth = height * imgRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawWidth = width;
    drawHeight = width / imgRatio;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.drawImage(
    img,
    x + offsetX,
    y + offsetY,
    drawWidth,
    drawHeight
  );
}
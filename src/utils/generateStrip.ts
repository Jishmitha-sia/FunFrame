export const generatePhotoStrip = async (
  photos: string[]
): Promise<string> => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas not supported");

  // 🌸 Realistic strip proportions
  const stripWidth = 340;

  const imageWidth = 260;
  const imageHeight = 195;

  const padding = 24;
  const gap = 16;

  const footerHeight = 80;

  canvas.width = stripWidth;

  canvas.height =
    photos.length * imageHeight +
    (photos.length - 1) * gap +
    padding * 2 +
    footerHeight;

  // 🌸 Background
  ctx.fillStyle = "#fff7fb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🌸 Draw images
  for (let i = 0; i < photos.length; i++) {
    const img = new Image();
    img.src = photos[i];

    await new Promise<void>((resolve) => {
      img.onload = () => {
        const x = (stripWidth - imageWidth) / 2;

        const y =
          padding + i * (imageHeight + gap);

        ctx.save();

        roundRect(
          ctx,
          x,
          y,
          imageWidth,
          imageHeight,
          18
        );

        ctx.clip();

        // ✅ NORMAL IMAGE RENDERING
        ctx.drawImage(
          img,
          x,
          y,
          imageWidth,
          imageHeight
        );

        ctx.restore();

        resolve();
      };
    });
  }

  // 🌸 Footer
  ctx.fillStyle = "#ff4fa3";
  ctx.font = "bold 22px Poppins";
  ctx.textAlign = "center";

  ctx.fillText(
    "FunFrame ✨",
    stripWidth / 2,
    canvas.height - 34
  );

  ctx.fillStyle = "#999";
  ctx.font = "14px Poppins";

  const date = new Date().toLocaleDateString();

  ctx.fillText(
    date,
    stripWidth / 2,
    canvas.height - 12
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
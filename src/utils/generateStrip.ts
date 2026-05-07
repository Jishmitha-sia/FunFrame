import type { BoothTheme } from "../types/theme";

export const generatePhotoStrip = async (
  photos: string[],
  theme: BoothTheme
): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 420;
    canvas.height = 1400;

    // =========================
    // THEME COLORS
    // =========================

    let background = "#fff1f7";
    let titleColor = "#ff4fa3";
    let footerColor = "#ff4fa3";

    if (theme === "retro") {
      background = "#f5e6cc";
      titleColor = "#7a4b00";
      footerColor = "#7a4b00";
    }

    if (theme === "neon") {
      background = "#111111";
      titleColor = "#d946ef";
      footerColor = "#d946ef";
    }

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Title
    ctx.fillStyle = titleColor;
    ctx.font = "bold 34px Poppins";
    ctx.textAlign = "center";

    let title = "Aesthetic Booth";

    if (theme === "retro") {
      title = "Retro Booth";
    }

    if (theme === "neon") {
      title = "Neon Booth";
    }

    ctx.fillText(title, 210, 70);

    // =========================
    // DRAW PHOTOS
    // =========================

    let loadedImages = 0;

    photos.forEach((photo, index) => {
      const image = new Image();

      image.src = photo;

      image.onload = () => {
        const x = 40;

        const y = 120 + index * 290;

        const width = 340;

        const height = 240;

        // Shadow
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 15;

        // Rounded photo container
        ctx.fillStyle = "white";

        roundRect(
          ctx,
          x - 10,
          y - 10,
          width + 20,
          height + 20,
          20
        );

        ctx.fill();

        ctx.save();

        roundRect(
          ctx,
          x,
          y,
          width,
          height,
          18
        );

        ctx.clip();

        // NORMAL photo ratio
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          x,
          y,
          width,
          height
        );

        ctx.restore();

        loadedImages++;

        // =========================
        // FOOTER
        // =========================

        if (
          loadedImages === photos.length
        ) {
          ctx.shadowBlur = 0;

          ctx.fillStyle = footerColor;

          ctx.font =
            "bold 26px Poppins";

          ctx.fillText(
            "FunFrame ✨",
            210,
            1320
          );

          ctx.fillStyle = "#999";

          ctx.font = "18px Poppins";

          const today =
            new Date().toLocaleDateString();

          ctx.fillText(
            today,
            210,
            1360
          );

          resolve(
            canvas.toDataURL(
              "image/png"
            )
          );
        }
      };
    });
  });
};

// =========================
// ROUNDED RECTANGLE
// =========================

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

  ctx.lineTo(
    x + width - radius,
    y
  );

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(
    x + width,
    y + height - radius
  );

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(
    x + radius,
    y + height
  );

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(
    x,
    y + radius
  );

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}
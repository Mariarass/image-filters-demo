  
  export function convertRgbaToHexAInGradient(gradient: string): string {
    return gradient.replace(
      /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)/gi,
      (_, r, g, b, a) => {
        const toHex = (n: number) => n.toString(16).padStart(2, '0');
        const alpha = a !== undefined ? Math.round(parseFloat(a) * 255) : 255;
        return `#${toHex(+r)}${toHex(+g)}${toHex(+b)}${toHex(alpha)}`.toUpperCase();
      }
    );
  } 
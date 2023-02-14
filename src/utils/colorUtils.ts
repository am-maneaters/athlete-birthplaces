import Color from '@arcgis/core/Color';

export function getLuminance({ r, g, b }: Color) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

import Color from '@arcgis/core/Color';
import { Team } from '../types';
import { PointGraphic } from '../typings/AthleteTypes';
import { getContrastRatio } from './colorUtils';

const MIN_CONTRAST = 750;
const MAX_CONTRAST = 5000;

export function getTeamLineColor(team: PointGraphic<Team>) {
  const primaryColor = new Color(`#${team.attributes.color}`);
  const secondaryColor = new Color(`#${team.attributes.alternateColor}`);

  const backgroundColor = new Color('#000000');

  const primaryContrast = getContrastRatio(primaryColor, backgroundColor);
  const secondaryContrast = getContrastRatio(secondaryColor, backgroundColor);
  console.log(primaryContrast, secondaryContrast);

  let isPrimary = primaryContrast > secondaryContrast;

  const maxContrast = Math.max(primaryContrast, secondaryContrast);
  const minContrast = Math.min(primaryContrast, secondaryContrast);

  if (maxContrast > MAX_CONTRAST && minContrast > MIN_CONTRAST) {
    isPrimary = !isPrimary;
  }

  const lineColor = isPrimary ? primaryColor : secondaryColor;

  lineColor.a =
    getContrastRatio(lineColor, backgroundColor) < 2000 ? 0.5 : 0.25;

  return lineColor;
}

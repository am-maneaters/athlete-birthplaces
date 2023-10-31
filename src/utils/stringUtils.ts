export function formatHeight(height: number | null) {
  if (!height) return;
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}' ${inches}"`;
}

export function formatWeight(weight: number | null) {
  if (!weight) return;
  return `${weight} lbs`;
}

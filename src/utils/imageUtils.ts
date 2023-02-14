export enum Sport {
  Hockey = 'hockey',
  Football = 'football',
  Basketball = 'basketball',
  Baseball = 'baseball',
}

export const sports = [
  Sport.Hockey,
  Sport.Football,
  Sport.Basketball,
  Sport.Baseball,
];
const leagueLookup = {
  [Sport.Hockey]: 'nhl',
  [Sport.Football]: 'nfl',
  [Sport.Basketball]: 'nba',
  [Sport.Baseball]: 'mlb',
};

type ImageOptions = {
  h?: number;
  w?: number;
  transparent?: boolean;
};

export const getAthleteHeadshotUrl = (
  athleteId: number,
  sport: Sport,
  { h = 100, w = 100 }: ImageOptions
) =>
  `https://a.espncdn.com/combiner/i?img=/i/headshots/${leagueLookup[sport]}/players/full/${athleteId}.png&h=${h}&w=${w}&scale=crop`;

export const getLeagueLogoUrl = (
  sport: Sport,
  { h = 100, w = 100, transparent = true }: ImageOptions
) =>
  `https://a.espncdn.com/combiner/i?img=/i/teamlogos/leagues/500/${leagueLookup[sport]}.png?w=${w}&h=${h}&transparent=${transparent}`;

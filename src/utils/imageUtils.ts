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

export const getLeagueLogoUrl = (sport: Sport) =>
  new URL(`../images/leagueLogos/${leagueLookup[sport]}.png`, import.meta.url)
    .href;

export const getTeamLogoUrl = (teamAbbreviation: string, league: string) =>
  new URL(
    `../images/${league.toLowerCase()}/${teamAbbreviation.toLowerCase()}.png`,
    import.meta.url
  ).href;

export const getCountryFlagUrl = (countryCode: string) =>
  new URL(`../images/flags/${countryCode.toLowerCase()}.png`, import.meta.url)
    .href;

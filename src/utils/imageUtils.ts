import { supabase } from '../contexts/SupabaseContext';

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
export const leagueLookup = {
  [Sport.Hockey]: 'nhl',
  [Sport.Football]: 'nfl',
  [Sport.Basketball]: 'nba',
  [Sport.Baseball]: 'mlb',
};

export const getAthleteHeadshotUrl = (athleteId: number, league: string) =>
  supabase.storage
    .from('athlete-headshots')
    .getPublicUrl(`${league.toLowerCase()}/${athleteId}.webp`).data.publicUrl;

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

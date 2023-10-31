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
  supabase.storage
    .from('league-logos')
    .getPublicUrl(`${leagueLookup[sport].toLowerCase()}.webp`).data.publicUrl;

export const getTeamLogoUrl = (teamAbbreviation: string, league: string) =>
  supabase.storage
    .from('team-logos')
    .getPublicUrl(
      `${league.toLowerCase()}/${teamAbbreviation.toLowerCase()}.png`
    ).data.publicUrl;

export const getCountryFlagUrl = (countryCode: string) =>
  supabase.storage
    .from('country-flags')
    .getPublicUrl(`${countryCode.toLowerCase()}.webp`).data.publicUrl;

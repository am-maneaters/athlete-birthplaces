export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Athletes: {
        Row: {
          active: boolean | null;
          age: number | null;
          birthCity: string | null;
          birthCountry: string | null;
          birthPlace: string | null;
          birthState: string | null;
          birthStateAbbr: string | null;
          country2Code: string | null;
          dateOfBirth: string | null;
          debutYear: number | null;
          firstName: string | null;
          height: number | null;
          id: number;
          jersey: string | null;
          lastName: string | null;
          latitude: number | null;
          league: string | null;
          longitude: number | null;
          positionDisplayName: string | null;
          positionName: string | null;
          statusName: string | null;
          statusType: string | null;
          teamId: number | null;
          type: string | null;
          weight: number | null;
        };
        Insert: {
          active?: boolean | null;
          age?: number | null;
          birthCity?: string | null;
          birthCountry?: string | null;
          birthPlace?: string | null;
          birthState?: string | null;
          birthStateAbbr?: string | null;
          country2Code?: string | null;
          dateOfBirth?: string | null;
          debutYear?: number | null;
          firstName?: string | null;
          height?: number | null;
          id?: number;
          jersey?: string | null;
          lastName?: string | null;
          latitude?: number | null;
          league?: string | null;
          longitude?: number | null;
          positionDisplayName?: string | null;
          positionName?: string | null;
          statusName?: string | null;
          statusType?: string | null;
          teamId?: number | null;
          type?: string | null;
          weight?: number | null;
        };
        Update: {
          active?: boolean | null;
          age?: number | null;
          birthCity?: string | null;
          birthCountry?: string | null;
          birthPlace?: string | null;
          birthState?: string | null;
          birthStateAbbr?: string | null;
          country2Code?: string | null;
          dateOfBirth?: string | null;
          debutYear?: number | null;
          firstName?: string | null;
          height?: number | null;
          id?: number;
          jersey?: string | null;
          lastName?: string | null;
          latitude?: number | null;
          league?: string | null;
          longitude?: number | null;
          positionDisplayName?: string | null;
          positionName?: string | null;
          statusName?: string | null;
          statusType?: string | null;
          teamId?: number | null;
          type?: string | null;
          weight?: number | null;
        };
        Relationships: [];
      };
      Teams: {
        Row: {
          abbreviation: string;
          alternateColor: string | null;
          color: string | null;
          displayName: string;
          espn_id: number;
          id: number;
          latitude: number | null;
          league: string;
          location: string;
          longitude: number | null;
          name: string;
          shortDisplayName: string | null;
          slug: string | null;
          type: string;
          venueAddress: string;
          venueCity: string | null;
          venueCountry: string | null;
          venueId: number | null;
          venueName: string | null;
          venueState: string | null;
        };
        Insert: {
          abbreviation: string;
          alternateColor?: string | null;
          color?: string | null;
          displayName: string;
          espn_id: number;
          id: number;
          latitude?: number | null;
          league: string;
          location: string;
          longitude?: number | null;
          name: string;
          shortDisplayName?: string | null;
          slug?: string | null;
          type: string;
          venueAddress: string;
          venueCity?: string | null;
          venueCountry?: string | null;
          venueId?: number | null;
          venueName?: string | null;
          venueState?: string | null;
        };
        Update: {
          abbreviation?: string;
          alternateColor?: string | null;
          color?: string | null;
          displayName?: string;
          espn_id?: number;
          id?: number;
          latitude?: number | null;
          league?: string;
          location?: string;
          longitude?: number | null;
          name?: string;
          shortDisplayName?: string | null;
          slug?: string | null;
          type?: string;
          venueAddress?: string;
          venueCity?: string | null;
          venueCountry?: string | null;
          venueId?: number | null;
          venueName?: string | null;
          venueState?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

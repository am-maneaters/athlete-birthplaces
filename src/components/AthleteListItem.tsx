// boilerplate function component with props

import React from 'react';
import { CalciteListItem } from '@esri/calcite-components-react';
import { Athlete } from '../schemas/athleteSchema';

export interface AthleteListItemProps {
  athlete: Athlete;
  teamLogoUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLCalciteListItemElement>) => void;
  mode: 'card' | 'list';
}

export enum Sport {
  Hockey = 'hockey',
  Football = 'football',
  Basketball = 'basketball',
  Baseball = 'baseball',
}
const leagueLookup = {
  [Sport.Hockey]: 'nhl',
  [Sport.Football]: 'nfl',
  [Sport.Basketball]: 'nba',
  [Sport.Baseball]: 'mlb',
};
const getAthleteHeadshot = (
  athleteId: number,
  sport: Sport,
  height: number,
  width: number
) =>
  `https://a.espncdn.com/combiner/i?img=/i/headshots/${leagueLookup[sport]}/players/full/${athleteId}.png&h=${height}&w=${width}&scale=crop`;

export const AthleteListItem = ({
  athlete: { id, fullName, birthPlace, type },
  onClick,
  teamLogoUrl,
  mode = 'card',
}: AthleteListItemProps) =>
  mode === 'card' ? (
    <CalciteListItem
      label={fullName}
      description={birthPlace}
      onClick={onClick}
    >
      <div
        slot="content-start"
        className="relative overflow-y-clip w-[140px] h-[100px]"
      >
        <img
          src={teamLogoUrl}
          alt="Team Logo"
          height="100px"
          className="opacity-20 scale-125 ml-2"
        />
        <img
          src={getAthleteHeadshot(id, type as Sport, 100, 140)}
          alt="Athlete Headshot"
          height="100px"
          width="140px"
          className="absolute inset-0"
        />
      </div>
    </CalciteListItem>
  ) : (
    <CalciteListItem
      label={fullName}
      description={birthPlace}
      onClick={onClick}
    />
  );

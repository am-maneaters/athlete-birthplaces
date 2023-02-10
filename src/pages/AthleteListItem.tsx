// boilerplate function component with props

import React from 'react';
import { Athlete } from './AthleteTypes';
import { CalciteListItem } from '@esri/calcite-components-react';

export interface AthleteListItemProps {
  athlete: Athlete;
  teamLogoUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLCalciteListItemElement>) => void;
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
}: AthleteListItemProps) => (
  <CalciteListItem label={fullName} description={birthPlace} onClick={onClick}>
    <div
      slot="content-start"
      style={{
        height: 100,
        width: 150,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={teamLogoUrl}
        alt="Team Logo"
        height="100px"
        style={{
          marginLeft: 25,
          transform: 'scale(1.5)',
          opacity: 0.2,
        }}
      />
      <img
        src={getAthleteHeadshot(id, type as Sport, 100, 140)}
        alt="Athlete Headshot"
        height="100px"
        width="140px"
        // overlay the team logo
        style={{ position: 'absolute', left: 0 }}
      />
    </div>
  </CalciteListItem>
);

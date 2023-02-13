// boilerplate function component with props

import React from 'react';
import { CalciteIcon, CalciteListItem } from '@esri/calcite-components-react';
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
  athlete: { id, fullName, birthPlace, type, jersey },
  onClick,
  teamLogoUrl,
  mode = 'card',
}: AthleteListItemProps) => {
  const [showImage, setShowImage] = React.useState(true);
  return mode === 'card' ? (
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
        {showImage && (
          <img
            src={getAthleteHeadshot(id, type as Sport, 100, 140)}
            alt="Athlete Headshot"
            height="100px"
            width="140px"
            className="absolute inset-0"
            onLoad={(e) => {
              setShowImage(true);
            }}
            onError={(e) => {
              setShowImage(false);
            }}
          />
        )}
      </div>
      <div slot="content">
        <div className="flex items-center text-1">{fullName}</div>
        <div className="flex items-center text-n3">
          <span>{birthPlace}</span>
        </div>
      </div>

      <div slot="content-end" className="flex flex-col mr-2">
        <div className="flex items-center text-n1">
          <span className="ml-1">#{jersey}</span>
        </div>
      </div>
    </CalciteListItem>
  ) : (
    <CalciteListItem
      label={fullName}
      description={birthPlace}
      onClick={onClick}
    />
  );
};

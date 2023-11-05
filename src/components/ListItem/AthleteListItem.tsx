// boilerplate function component with props

import React from 'react';
import { CalciteListItem } from '@esri/calcite-components-react';
import { getAthleteHeadshotUrl } from '../../utils/imageUtils';
import { Athlete } from '../../types';
import { formatHeight, formatWeight } from '../../utils/stringUtils';

export interface AthleteListItemProps {
  athlete: Athlete;
  teamLogoUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLCalciteListItemElement>) => void;
  mode: 'card' | 'list';
}

export const AthleteListItem = ({
  athlete,
  onClick,
  teamLogoUrl,
  mode = 'card',
}: AthleteListItemProps) => {
  const {
    id,
    firstName,
    lastName,
    birthPlace,
    league,
    jersey,
    height,
    weight,
    dateOfBirth,
  } = athlete;

  const [showImage, setShowImage] = React.useState(true);
  return mode === 'card' ? (
    <CalciteListItem
      label={`${firstName} ${lastName}`}
      description={birthPlace ?? 'N/AA'}
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
          className="opacity-20 scale-125 ml-0"
          loading="lazy"
        />
        {showImage && (
          <img
            src={getAthleteHeadshotUrl(id, league ?? '')}
            alt="Athlete Headshot"
            height="100px"
            width="140px"
            loading="lazy"
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
        <div className="flex items-baseline gap-1">
          <span className="text-1">
            {firstName} {lastName}
          </span>
          <span className="text-n3 text-color-3">#{jersey}</span>
        </div>
        <div className="flex items-center text-n3">
          <span>{birthPlace}</span>
        </div>
      </div>

      <div slot="content-end" className="flex flex-col mr-2 text-n3 items-end">
        <span>{formatHeight(height)}</span>
        <span>{formatWeight(weight)}</span>
        {dateOfBirth !== null && (
          <span>{new Date(dateOfBirth).toLocaleDateString('en-US')}</span>
        )}
      </div>
    </CalciteListItem>
  ) : (
    <CalciteListItem
      label={`${firstName} ${lastName}`}
      description={birthPlace ?? 'N/AA?'}
      onClick={onClick}
    />
  );
};

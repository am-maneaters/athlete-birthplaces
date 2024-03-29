import { CalciteListItem } from '@esri/calcite-components-react';
import { getTeamLogoUrl } from '../../utils/imageUtils';
import { Team } from '../../types';

export function TeamListItem({
  team,
  onClick,
}: {
  team: Team;
  onClick: (team: Team) => void;
}) {
  return (
    <CalciteListItem label={team.name} onClick={() => onClick(team)}>
      <div
        slot="content-start"
        className="flex relative overflow-y-clip w-[100px] h-[100px] content-center"
      >
        <img
          src={getTeamLogoUrl(team.abbreviation, team.league)}
          alt="Team Logo"
          height="100px"
          width="140px"
          loading="lazy"
          className="ml-2"
        />
      </div>
      <div slot="content" className="flex flex-col items-end">
        <div className="flex items-center text-2 font-bold text-end">
          {team.displayName}
        </div>
        <div className="flex items-center text-n2 font-bold text-end">
          <span>
            {team.venueName}, {team.venueCity}
          </span>
        </div>
      </div>
    </CalciteListItem>
  );
}

import { CalciteListItem } from '@esri/calcite-components-react';
import { Team } from '../../schemas/teamSchema';
import { getTeamLogoUrl } from '../../utils/imageUtils';

export function TeamListItem({
  team,
  onClick,
}: {
  team: Team;
  onClick: (team: Team) => void;
}) {
  return (
    <CalciteListItem
      label={team.name}
      onClick={() => onClick(team)}
      style={
        {
          // '--calcite-ui-foreground-1': team.alternateColor,
        }
      }
    >
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
        />
      </div>
      <div
        slot="content"
        className="flex flex-col items-end"
        // style={{ color: team.color }}
      >
        <div className="flex items-center text-2 font-bold text-end">
          {team.displayName}
        </div>
        <div className="flex items-center text-n2 font-bold text-end">
          <span>{team.venueAddress}</span>
        </div>
      </div>
    </CalciteListItem>
  );
}

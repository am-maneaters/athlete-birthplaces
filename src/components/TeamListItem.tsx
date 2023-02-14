import { CalciteListItem } from '@esri/calcite-components-react';
import { Team } from '../schemas/teamSchema';

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
          src={team.logo}
          alt="Athlete Headshot"
          height="100px"
          width="140px"
          loading="lazy"
        />
      </div>
      <div slot="content" className="flex flex-col items-end">
        <div className="flex items-center text-2">{team.displayName}</div>
        <div className="flex items-center text-n2">
          <span>{team.venueAddress}</span>
        </div>
      </div>
    </CalciteListItem>
  );
}

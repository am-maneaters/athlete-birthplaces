import { Team } from '../../types';
import { PointGraphic } from '../../typings/AthleteTypes';
import { TeamListItem } from '../ListItem/TeamListItem';
import { ListContainer } from './ListContainer';

export function TeamList({
  onTeamSelect,
  teams,
  loading,
}: {
  onTeamSelect: (teamId: number) => void;
  teams: PointGraphic<Team>[] | undefined;
  loading: boolean;
}) {
  return (
    <ListContainer loading={loading}>
      {teams
        ?.sort((a, b) =>
          a.attributes.location.localeCompare(b.attributes.location)
        )
        .map((team) => (
          <TeamListItem
            key={team.attributes.espn_id}
            team={team.attributes}
            onClick={() => onTeamSelect(team.attributes.espn_id)}
          />
        ))}
    </ListContainer>
  );
}

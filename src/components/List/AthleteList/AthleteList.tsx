import {
  CalciteAction,
  CalciteActionBar,
  CalciteListItem,
} from '@esri/calcite-components-react';
import { Fragment, useMemo, useState } from 'react';
import { getTeamLogoUrl } from '../../../utils/imageUtils';
import { AthleteListItem } from '../../ListItem/AthleteListItem';
import { ListContainer } from '../ListContainer';
import { Athlete } from '../../../schemas/athleteSchema';
import { SortField, useGroupSort } from '../../../hooks/useGroupSort';
import { Team } from '../../../schemas/teamSchema';
import { PointGraphic } from '../../../typings/AthleteTypes';
import { ListSorter } from '../../ListSorter';

const sortingFields: SortField[] = [
  {
    field: 'birthCountry',
    label: 'Country',
    group: true,
  },
  {
    field: 'birthState',
    altField: 'birthCountry',
    group: true,
    label: 'State',
  },
  { field: 'lastName', label: 'Last Name' },
  { field: 'weight', label: 'Weight' },
  { field: 'height', label: 'Height' },
  { field: 'dateOfBirth', label: 'Age', transform: Number },
  { field: 'positionName', label: 'Position', group: true },
  { field: 'jersey', label: 'Jersey', transform: Number },
];

export function AthleteList({
  loading,
  athletes,
  onAthleteSelect,
  teams,
}: {
  loading: boolean;
  athletes: Athlete[] | undefined;
  onAthleteSelect: (athleteId: string) => void;
  teams: PointGraphic<Team>[] | undefined;
}) {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card');
  const [sort, setSort] = useState<SortField>(sortingFields[0]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // teams by id
  const teamsById = useMemo(
    () =>
      teams?.reduce(
        (acc, team) => ({ ...acc, [team.attributes.id]: team.attributes }),
        {} as Record<string, Team>
      ),
    [teams]
  );
  const groupedAthletes = useGroupSort(athletes ?? [], sort, sortDirection);
  return (
    <>
      <div className="px-2 py-1 flex items-center justify-between">
        <CalciteActionBar layout="horizontal" expandDisabled>
          <CalciteAction
            icon="embedded-card"
            active={viewMode === 'card' ? true : undefined}
            onClick={() => setViewMode('card')}
            text="Card"
            scale="s"
          />
          <CalciteAction
            icon="list"
            onClick={() => setViewMode('list')}
            active={viewMode === 'list' ? true : undefined}
            text="List"
            scale="s"
          />
        </CalciteActionBar>

        <ListSorter
          fields={sortingFields}
          sort={sort}
          setSort={setSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      <ListContainer loading={loading}>
        {groupedAthletes?.map(([groupLabel, athletes]) => (
          <Fragment key={groupLabel}>
            {sort.group && (
              <CalciteListItem
                label={groupLabel}
                className="sticky top-0 z-sticky pointer-events-none bg-brand"
                style={{
                  '--calcite-ui-foreground-1': 'var(--calcite-ui-foreground-2)',
                }}
              />
            )}

            {athletes.map((athlete) => {
              const team = teamsById?.[athlete.teamId];
              return (
                <AthleteListItem
                  key={`${athlete.type}-${athlete.id}`}
                  mode={viewMode}
                  athlete={athlete}
                  teamLogoUrl={
                    team
                      ? getTeamLogoUrl(team.abbreviation, team.league)
                      : undefined
                  }
                  onClick={() => onAthleteSelect(athlete.id.toString())}
                />
              );
            })}
          </Fragment>
        ))}
      </ListContainer>
    </>
  );
}

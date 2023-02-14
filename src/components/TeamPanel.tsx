import {
  CalciteList,
  CalciteActionBar,
  CalciteAction,
  CalciteDropdown,
  CalciteButton,
  CalciteDropdownItem,
  CalciteListItem,
  CalciteDropdownGroup,
} from '@esri/calcite-components-react';
import { AthleteListItem } from './AthleteListItem';
import { Team } from '../schemas/teamSchema';
import { Athlete } from '../schemas/athleteSchema';
import { PointGraphic } from '../typings/AthleteTypes';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Sport, getLeagueLogoUrl } from '../utils/imageUtils';
import { TeamListItem } from './TeamListItem';
import { useAthletesLayer } from '../hooks/athleteLayerHooks';

type SortField = {
  field: keyof Athlete;
  altField?: keyof Athlete;
  label: string;
  transform?: (val: string | number | boolean) => string | number;
  group?: boolean;
};

const sortingFields: SortField[] = [
  {
    field: 'birthState',
    altField: 'birthCountry',
    label: 'Birthplace',
    group: true,
  },
  { field: 'fullName', label: 'Name' },
  { field: 'weight', label: 'Weight' },
  { field: 'height', label: 'Height' },
  { field: 'dateOfBirth', label: 'Age', transform: Number },
  { field: 'positionName', label: 'Position', group: true },
  { field: 'jersey', label: 'Jersey', transform: Number },
];

type TeamPanelProps = {
  mapView: __esri.MapView;
  teamId: string | undefined;
  onAthleteClick: (athlete: PointGraphic<Athlete>) => void;
  teams: PointGraphic<Team>[];
  sport: Sport;
  onTeamChange: (team: Team | undefined) => void;
};

export function TeamPanel({
  teamId,
  mapView,
  onAthleteClick,
  teams,
  sport,
  onTeamChange,
}: TeamPanelProps) {
  const team = useMemo(() => {
    const feat = teams?.find((f) => f.attributes.id.toString() === teamId);

    return feat;
  }, [teams, teamId]);

  const { athleteQuery } = useAthletesLayer(mapView, team, sport);
  const { data: athletes, isFetching: loading } = athleteQuery;

  const [sort, setSort] = useState(sortingFields[0]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const getSortField = useCallback(
    (athlete: Athlete) =>
      athlete[sort.field] ? sort.field : sort.altField ?? sort.field,
    [sort.altField, sort.field]
  );

  const sortedAthletes = useMemo(
    () =>
      athletes?.sort(({ attributes: a }, { attributes: b }) => {
        const field = getSortField(a);
        const transform = sort.transform ?? ((val: string) => val);
        const aVal = a[field];
        const bVal = b[field];
        if (!aVal && !bVal) return 0;
        if (!aVal) return -1;
        if (!bVal) return 1;

        const aTransformed = transform(aVal);
        const bTransformed = transform(bVal);

        if (aTransformed < bTransformed) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aTransformed > bTransformed) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      }),
    [athletes, getSortField, sort.transform, sortDirection]
  );

  const groupedAthletes = useMemo(() => {
    if (!sort.group || !sortedAthletes) return undefined;
    // eslint-disable-next-line unicorn/no-array-reduce
    return sortedAthletes.reduce((acc, athlete) => {
      const field = getSortField(athlete.attributes);

      const position = athlete.attributes[field];
      if (!position) return acc;
      const key = position.toString();
      if (acc[key]) {
        acc[key].push(athlete);
        return acc;
      }
      return { ...acc, [key]: [athlete] };
    }, {} as Record<string, PointGraphic<Athlete>[]>);
  }, [getSortField, sort.group, sortedAthletes]);

  // teams by id
  const teamsById = useMemo(
    () =>
      teams?.reduce(
        (acc, team) => ({ ...acc, [team.attributes.id]: team.attributes }),
        {} as Record<string, Team>
      ),
    [teams]
  );
  return (
    <div className="flex flex-col h-full bg-foreground-2 w-[400px]">
      <div
        className="flex justify-stretch overflow-hidden"
        style={{ backgroundColor: team?.attributes.color ?? 'black' }}
      >
        {team?.attributes.id && (
          <CalciteAction
            text="Back"
            icon="chevron-left"
            scale="s"
            style={{
              '--calcite-ui-text-3': 'white',
              justifySelf: 'flex-start',
            }}
            appearance="transparent"
            onClick={() => onTeamChange(undefined)}
          />
        )}
        <div className="py-2 px-4 flex-1">
          <h1 className="text-4 text-color-1 uppercase italic whitespace-nowrap">
            {team?.attributes.location ?? teams[0].attributes.league}
          </h1>
          <h1 className="text-3 text-color-1 uppercase italic whitespace-nowrap">
            {team?.attributes.name ?? 'Teams'}
          </h1>
        </div>
        <img
          className="scale-150 opacity-30 flex-1 w-[100px] h-[100px] object-cover"
          src={
            team?.attributes?.logo ??
            getLeagueLogoUrl(sport, { w: 500, h: 500 })
          }
          alt="Team Logo"
        />
      </div>

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

        <CalciteDropdown>
          <CalciteButton
            slot="trigger"
            iconStart="sort-descending"
            kind="neutral"
            appearance="outline-fill"
          >
            {sort.label}
          </CalciteButton>
          <CalciteDropdownGroup groupTitle="Sort Fields">
            {sortingFields.map((sortField) => (
              <CalciteDropdownItem
                key={sortField.field}
                label={sortField.label}
                onCalciteDropdownItemSelect={() => setSort(sortField)}
                selected={sortField.label === sort.label ? true : undefined}
              >
                {sortField.label}
              </CalciteDropdownItem>
            ))}
          </CalciteDropdownGroup>
          <CalciteDropdownGroup groupTitle="Sort Direction">
            <CalciteDropdownItem
              label="Ascending"
              onCalciteDropdownItemSelect={() => setSortDirection('asc')}
              selected={sortDirection === 'asc' ? true : undefined}
            >
              Ascending
            </CalciteDropdownItem>
            <CalciteDropdownItem
              label="Descending"
              onCalciteDropdownItemSelect={() => setSortDirection('desc')}
              selected={sortDirection === 'desc' ? true : undefined}
            >
              Descending
            </CalciteDropdownItem>
          </CalciteDropdownGroup>
        </CalciteDropdown>
      </div>

      <div className="overflow-auto flex-1">
        <CalciteList
          className="min-h-[100px]"
          loading={loading ? true : undefined}
        >
          {groupedAthletes &&
            Object.entries(groupedAthletes).map(([groupLabel, athletes]) => (
              <Fragment key={groupLabel}>
                <CalciteListItem
                  label={groupLabel}
                  className="sticky top-0 z-sticky pointer-events-none bg-brand"
                  style={{
                    '--calcite-ui-foreground-1':
                      'var(--calcite-ui-foreground-2)',
                  }}
                />

                {athletes?.map((athlete) => (
                  <AthleteListItem
                    key={`${athlete.attributes.type}-${athlete.attributes.id}`}
                    mode={viewMode}
                    athlete={athlete.attributes}
                    teamLogoUrl={teamsById?.[athlete.attributes.teamId]?.logo}
                    onClick={() => onAthleteClick(athlete)}
                  />
                ))}
              </Fragment>
            ))}

          {!groupedAthletes &&
            sortedAthletes?.map((athlete) => (
              <AthleteListItem
                key={`${athlete.attributes.type}-${athlete.attributes.id}`}
                mode={viewMode}
                athlete={athlete.attributes}
                teamLogoUrl={teamsById?.[athlete.attributes.teamId]?.logo}
                onClick={() => onAthleteClick(athlete)}
              />
            ))}

          {!sortedAthletes &&
            teams?.map((team) => (
              <TeamListItem
                key={team.attributes.id}
                team={team.attributes}
                onClick={onTeamChange}
              />
            ))}
        </CalciteList>
      </div>
    </div>
  );
}

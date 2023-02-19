import {
  CalciteList,
  CalciteActionBar,
  CalciteAction,
  CalciteListItem,
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from '@esri/calcite-components-react';
import { AthleteListItem } from './AthleteListItem';
import { Team } from '../schemas/teamSchema';
import { PointGraphic } from '../typings/AthleteTypes';
import { Fragment, useMemo, useState } from 'react';
import { Sport, getLeagueLogoUrl } from '../utils/imageUtils';
import { TeamListItem } from './TeamListItem';
import { useAthletesLayer } from '../hooks/athleteLayerHooks';
import { ListSorter, sortingFields } from './ListSorter';
import { PanelHeader } from './PanelHeader';
import { useGroupSort } from '../hooks/useGroupSort';

type TeamPanelProps = {
  mapView: __esri.MapView;
  teamId: string | undefined;
  onAthleteClick: (athlete: string) => void;
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

  const sortedAthletes = useGroupSort(
    athletes?.map((a) => a.attributes),
    sort,
    sortDirection
  );

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
    <div className="bg-foreground-2 h-full">
      <CalciteTabs layout="center" className="h-full">
        {!team && (
          <CalciteTabNav slot="title-group">
            <CalciteTabTitle>Teams</CalciteTabTitle>
            <CalciteTabTitle>Countries</CalciteTabTitle>
          </CalciteTabNav>
        )}
        <div className="flex flex-col bg-foreground-2 w-[400px] h-full">
          {team ? (
            <PanelHeader
              bgColor={team.attributes.color}
              onBackClick={() => onTeamChange(undefined)}
              title={team.attributes.location}
              subtitle={team.attributes.name}
              logo={team.attributes.logo}
            />
          ) : (
            <PanelHeader
              title={teams[0].attributes.league}
              subtitle="Teams"
              logo={getLeagueLogoUrl(sport, { w: 500, h: 500 })}
            />
          )}

          {team && (
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
                sort={sort}
                setSort={setSort}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />
            </div>
          )}

          <div className="overflow-auto flex-1">
            <CalciteList
              className="min-h-[100px]"
              loading={loading ? true : undefined}
            >
              {sortedAthletes?.map(([groupLabel, athletes]) => (
                <Fragment key={groupLabel}>
                  {sort.group && (
                    <CalciteListItem
                      label={groupLabel}
                      className="sticky top-0 z-sticky pointer-events-none bg-brand"
                      style={{
                        '--calcite-ui-foreground-1':
                          'var(--calcite-ui-foreground-2)',
                      }}
                    />
                  )}

                  {athletes.map((athlete) => (
                    <AthleteListItem
                      key={`${athlete.type}-${athlete.id}`}
                      mode={viewMode}
                      athlete={athlete}
                      teamLogoUrl={teamsById?.[athlete.teamId]?.logo}
                      onClick={() => onAthleteClick(athlete.id.toString())}
                    />
                  ))}
                </Fragment>
              ))}

              {!sortedAthletes &&
                teams
                  ?.sort((a, b) =>
                    a.attributes.location.localeCompare(b.attributes.location)
                  )
                  .map((team) => (
                    <TeamListItem
                      key={team.attributes.id}
                      team={team.attributes}
                      onClick={onTeamChange}
                    />
                  ))}
            </CalciteList>
          </div>
        </div>
      </CalciteTabs>
    </div>
  );
}

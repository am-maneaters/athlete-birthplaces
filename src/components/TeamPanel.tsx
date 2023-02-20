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
import { ListSorter } from './ListSorter';
import { PanelHeader } from './PanelHeader';
import { SortField, useGroupSort } from '../hooks/useGroupSort';
import { getStateName, states } from '../data/statesLookup';
import { useQuery } from '@tanstack/react-query';
import { useFeatureLayerView } from '../arcgisUtils/useGraphicsLayer';
import { array } from 'yup';
import { athleteSchema } from '../schemas/athleteSchema';
import { graphicSchema } from '../schemas/graphicSchema';

import countryCodes from '../data/countryCodes.json';

const sortingFields: SortField[] = [
  {
    field: 'birthState',
    altField: 'birthCountry',
    label: 'Birthplace',
    group: true,
    transform: (val) => {
      if (typeof val !== 'string') return val.toString();
      return getStateName(val);
    },
  },
  { field: 'lastName', label: 'Last Name' },
  { field: 'weight', label: 'Weight' },
  { field: 'height', label: 'Height' },
  { field: 'dateOfBirth', label: 'Age', transform: Number },
  { field: 'positionName', label: 'Position', group: true },
  { field: 'jersey', label: 'Jersey', transform: Number },
];

type TeamPanelProps = {
  mapView: __esri.MapView;
  teamId: string | undefined;
  onAthleteSelect: (athlete: string) => void;
  teams: PointGraphic<Team>[];
  sport: Sport;
  onTeamSelect: (team: Team | undefined) => void;
  mode: 'Teams' | 'Athletes' | 'Regions';
  onModeChange: (mode: 'Teams' | 'Athletes' | 'Regions') => void;
};

const TABS = ['Teams', 'Regions'] as const;

const getCountryFlag = (country: string) => {
  const code = countryCodes.find(
    (c) => c.name.toLowerCase() === country.toLowerCase()
  );

  return code
    ? `https://flagcdn.com/144x108/${code.code.toLowerCase()}.png`
    : country;
};

export function TeamPanel({
  teamId,
  mapView,
  onAthleteSelect,
  teams,
  sport,
  onTeamSelect,
  mode,
  onModeChange,
}: TeamPanelProps) {
  const [regionType, setRegionType] = useState<'State' | 'Country' | 'City'>(
    'Country'
  );
  const team = useMemo(() => {
    const feat = teams?.find((f) => f.attributes.id.toString() === teamId);

    return feat;
  }, [teams, teamId]);

  const { athletesLayer } = useAthletesLayer(mapView, team, sport);

  const athletesLayerView = useFeatureLayerView(mapView, athletesLayer);

  const { data: Regions, isLoading: RegionsLoading } = useQuery({
    queryKey: ['Regions', sport, regionType],
    queryFn: async ({ signal }) => {
      const groupFields =
        regionType === 'State'
          ? ['birthState', 'birthCountry']
          : regionType === 'City'
          ? ['birthCity', 'birthState', 'birthCountry']
          : ['birthCountry'];
      const feats = await athletesLayer?.queryFeatures(
        {
          where: `type = '${sport}'`,
          returnGeometry: false,
          groupByFieldsForStatistics: groupFields,
          orderByFields: ['count(*) desc'],
          outStatistics: [
            {
              statisticType: 'count',
              onStatisticField: '*',
              outStatisticFieldName: 'countOFExpr',
            },
          ],
        },
        { signal }
      );
      return feats;
    },
    select: (data) =>
      data?.features.map(({ attributes }) => ({
        img: getCountryFlag(attributes.birthCountry),
        Country: attributes.birthCountry,
        State: getStateName(attributes.birthState) ?? attributes.birthCountry,
        City: attributes.birthCity,
        count: attributes.countOFExpr,
      })),
  });
  console.log(Regions);
  const { data: athletes, isLoading } = useQuery({
    queryKey: ['relatedPlayers', team, sport, athleteSchema],
    queryFn: async ({ signal }) => {
      if (!team) return [];

      const features = await athletesLayerView?.queryFeatures(
        {
          where: `type = '${sport}' AND teamId = ${team?.attributes.id}`,

          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );

      if (!features) return [];

      return array()
        .of(graphicSchema(athleteSchema))
        .validate(features.features);
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => (data?.length === 0 ? undefined : data),
  });

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
        {mode !== 'Athletes' && (
          <CalciteTabNav slot="title-group">
            {TABS.map((tab, i) => (
              <CalciteTabTitle
                key={tab}
                title={tab}
                tabIndex={i}
                selected={mode === tab ? true : undefined}
                onCalciteTabsActivate={(e) => {
                  onModeChange(e.target.title as 'Teams' | 'Athletes');
                }}
              >
                {tab}
              </CalciteTabTitle>
            ))}
          </CalciteTabNav>
        )}
        <div className="flex flex-col bg-foreground-2 w-[400px] h-full">
          {mode === 'Athletes' && team && (
            <PanelHeader
              bgColor={team.attributes.color}
              onBackClick={() => onTeamSelect(undefined)}
              title={team.attributes.location}
              subtitle={team.attributes.name}
              logo={team.attributes.logo}
            />
          )}

          {mode === 'Regions' && (
            <PanelHeader
              title="Players By"
              subtitle={
                <select
                  className="text-3 pt-1 uppercase bg-transparent"
                  onChange={(e) => {
                    setRegionType(e.target.value as any);
                  }}
                  value={regionType}
                >
                  <option>Country</option>
                  <option>State</option>
                  <option>City</option>
                </select>
              }
              logo={getLeagueLogoUrl(sport, { w: 500, h: 500 })}
            />
          )}
          {mode === 'Teams' && (
            <PanelHeader
              title={teams[0].attributes.league}
              subtitle="Teams"
              logo={getLeagueLogoUrl(sport, { w: 500, h: 500 })}
            />
          )}

          {mode === 'Athletes' && (
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
          )}

          <div className="overflow-auto flex-1">
            <CalciteList
              className="min-h-[100px]"
              loading={isLoading ? true : undefined}
            >
              {mode === 'Athletes' &&
                sortedAthletes?.map(([groupLabel, athletes]) => (
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
                        onClick={() => onAthleteSelect(athlete.id.toString())}
                      />
                    ))}
                  </Fragment>
                ))}

              {mode === 'Teams' &&
                teams
                  ?.sort((a, b) =>
                    a.attributes.location.localeCompare(b.attributes.location)
                  )
                  .map((team) => (
                    <TeamListItem
                      key={team.attributes.id}
                      team={team.attributes}
                      onClick={onTeamSelect}
                    />
                  ))}

              {mode === 'Regions' &&
                Regions?.map((region, i) => (
                  <CalciteListItem
                    key={region[regionType] + i}
                    label={region[regionType]}
                    // onClick={() => onClick(team)}
                  >
                    <div
                      slot="content-start"
                      className="flex relative overflow-y-clip w-[100px] h-[100px] content-center"
                    >
                      <img
                        src={region.img}
                        alt="Team Logo"
                        height="108px"
                        width="144px"
                        loading="lazy"
                        className="absolute inset-0 m-auto pl-2"
                      />
                    </div>
                    <div slot="content" className="flex flex-col items-end">
                      <div className="flex items-center text-2 text-end">
                        {region[regionType]}
                      </div>
                      <div className="flex items-center text-n2 text-end">
                        <span>{region.count}</span>
                      </div>
                    </div>
                  </CalciteListItem>
                ))}
            </CalciteList>
          </div>
        </div>
      </CalciteTabs>
    </div>
  );
}

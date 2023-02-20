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
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Sport, getLeagueLogoUrl } from '../utils/imageUtils';
import { TeamListItem } from './TeamListItem';
import { useAthletesLayer } from '../hooks/athleteLayerHooks';
import { ListSorter } from './ListSorter';
import { PanelHeader } from './PanelHeader';
import { SortField, useGroupSort } from '../hooks/useGroupSort';
import { getStateName } from '../data/statesLookup';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { array } from 'yup';
import { athleteSchema } from '../schemas/athleteSchema';
import { graphicSchema } from '../schemas/graphicSchema';

import Polyline from '@arcgis/core/geometry/Polyline';

import countryCodes from '../data/countryCodes.json';
import { AthleteHover } from './AthleteHover';
import Color from '@arcgis/core/Color';
import Graphic from '@arcgis/core/Graphic';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import { getLuminance } from '../utils/colorUtils';
import { replaceFeatures } from '../utils/layerUtils';

const ListContainer = ({
  children,
  loading,
  enabled,
}: {
  children: React.ReactNode;
  loading: boolean;
  enabled: boolean;
}) =>
  enabled ? (
    <div className="overflow-auto flex-1">
      <CalciteList
        className="min-h-[100px]"
        loading={loading ? true : undefined}
      >
        {children}
      </CalciteList>
    </div>
  ) : null;

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
  teamQuery: UseQueryResult<PointGraphic<Team>[]>;
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
  teamQuery,
  sport,
  onTeamSelect,
  mode,
  onModeChange,
}: TeamPanelProps) {
  const [regionType, setRegionType] = useState<'State' | 'Country' | 'City'>(
    'Country'
  );

  const teams = teamQuery.data;
  const team = useMemo(
    () => teams?.find((f) => f.attributes.id.toString() === teamId),
    [teams, teamId]
  );

  const { athletesLayer } = useAthletesLayer(mapView, team, sport);

  const athletesLayerView = useFeatureLayerView(mapView, athletesLayer);
  const { data: Regions, isLoading: regionsLoading } = useQuery({
    queryKey: ['Regions', sport, regionType],
    enabled: mode === 'Regions',
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

  const { data: athletes, isLoading: athletesLoading } = useQuery({
    queryKey: ['relatedPlayers', team, sport, athleteSchema],
    enabled: mode === 'Athletes',
    queryFn: async ({ signal }) => {
      console.log(team);
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

      console.log(features.features);

      return array()
        .of(graphicSchema(athleteSchema))
        .validate(features.features);
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => (data?.length === 0 ? undefined : data),
  });

  const playerLineLayer = useFeatureLayer(mapView, {
    title: 'Player Lines',
    source: [],
    objectIdField: 'id',
    geometryType: 'polyline',
    spatialReference: { wkid: 4326 },
    fields: [
      {
        name: 'id',
        alias: 'id',
        type: 'oid',
      },
    ],
    renderer: new SimpleRenderer({
      symbol: new SimpleLineSymbol({
        color: [255, 0, 0, 0.25],
        width: 1,
      }),
    }),
    effect: 'bloom(1.7, 0.5px, 2%)',
  });

  useEffect(() => {
    let isUpdating = false;
    async function updateLines() {
      if (isUpdating) return;
      isUpdating = true;
      await replaceFeatures(playerLineLayer, []);
      if (!athletes || !team) return;
      const primaryColor = new Color(team.attributes.color);
      const secondaryColor = new Color(team.attributes.alternateColor);
      const lineColor =
        getLuminance(primaryColor) > getLuminance(secondaryColor)
          ? primaryColor
          : secondaryColor;
      lineColor.a = 0.25;
      playerLineLayer.renderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          color: lineColor,
          width: 2,
        }),
      });
      const teamPoint = [team.geometry.longitude, team.geometry.latitude];
      const newGraphicsPromise = athletes.map(
        async ({ geometry, attributes }) => {
          const polyline = new Polyline({
            paths: [[[geometry.longitude, geometry.latitude], teamPoint]],
          });
          return new Graphic({
            geometry: polyline,
            attributes: { ...attributes },
          });
        }
      );
      const newGraphics = await Promise.all(newGraphicsPromise);
      await replaceFeatures(playerLineLayer, newGraphics);
      isUpdating = false;
    }
    updateLines();
    return () => {
      isUpdating = true;
    };
  }, [athletes, playerLineLayer, team]);

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
      {/* <AthleteHover mapView={mapView} athletesLayer={athletesLayer} /> */}
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
              title={teams?.[0].attributes.league ?? 'Teams'}
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

          <ListContainer
            loading={athletesLoading}
            enabled={mode === 'Athletes'}
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
                    onClick={() => onAthleteSelect(athlete.id.toString())}
                  />
                ))}
              </Fragment>
            ))}
          </ListContainer>

          <ListContainer
            loading={teamQuery.isLoading}
            enabled={mode === 'Teams'}
          >
            {teams
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
          </ListContainer>

          <ListContainer loading={regionsLoading} enabled={mode === 'Regions'}>
            {Regions?.map((region, i) => (
              <CalciteListItem
                key={region[regionType] + i}
                label={region[regionType]}
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
          </ListContainer>
        </div>
      </CalciteTabs>
    </div>
  );
}

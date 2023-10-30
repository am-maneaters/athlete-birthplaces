import {
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from '@esri/calcite-components-react';
import { PointGraphic } from '../typings/AthleteTypes';
import { useMemo, useState } from 'react';
import {
  Sport,
  getCountryFlagUrl,
  getLeagueLogoUrl,
  getTeamLogoUrl,
} from '../utils/imageUtils';
import { TeamListItem } from './ListItem/TeamListItem';
import { useAthletesLayer } from '../hooks/athleteLayerHooks';
import { PanelHeader } from './PanelHeader';

import { useOnEvent } from '../arcgisUtils/useOnEvent';
import { isGraphicsHit } from '../utils/esriUtils';
import { Region } from './ListItem/RegionListItem';
import { ListContainer } from './List/ListContainer';
import RegionList from './List/RegionList';
import TeamAthletesList from './List/AthleteList/TeamAthletesList';
import RegionAthletesList from './List/AthleteList/RegionAthletesList';
import { Team, Athlete } from '../types';
import { useMapView } from '../arcgisUtils/MapViewComponent';

type TeamPanelProps = {
  teamId: string | undefined;
  onAthleteSelect: (athlete: string) => void;
  sport: Sport;
  onTeamSelect: (team: number | undefined) => void;
  mode: 'Teams' | 'Regions';
  onModeChange: (mode: 'Teams' | 'Regions') => void;
  onSportChange: (sport: Sport) => void;
  teamsLayer: __esri.FeatureLayer;
  isLoading: boolean;
  teams: PointGraphic<Team>[];
};

const TABS = ['Teams', 'Regions'] as const;

export function TeamPanel({
  teamId,
  onAthleteSelect,
  sport,
  onTeamSelect,
  mode,
  onModeChange,
  onSportChange,
  teamsLayer,
  isLoading,
  teams,
}: TeamPanelProps) {
  const mapView = useMapView();
  const [regionType, setRegionType] = useState<'State' | 'Country' | 'City'>(
    'Country'
  );

  const [selectedRegion, setSelectedRegion] = useState<Region>();

  const team = useMemo(
    () => teams?.find((f) => f.attributes.espn_id.toString() === teamId),
    [teams, teamId]
  );

  const { athletesLayer } = useAthletesLayer(mapView, team, sport);

  const showRegionAthletes = mode === 'Regions' && !!selectedRegion;
  const showTeamAthletes = mode === 'Teams' && !!team;
  const showAthletes = showRegionAthletes || showTeamAthletes;

  const showTeams = mode === 'Teams' && !team;
  const showRegions = mode === 'Regions' && !selectedRegion;

  useOnEvent(mapView, 'click', async (e) => {
    if (!mapView) return;

    if (mode === 'Teams') {
      const teamsMapHit = await mapView.hitTest(e, {
        include: [teamsLayer],
      });

      if (!teamsMapHit || teamsMapHit.results.length === 0)
        return onTeamSelect(undefined);

      const [firstHit] = teamsMapHit.results;

      if (isGraphicsHit(firstHit)) {
        const { graphic } = firstHit;

        if (!Object.hasOwn(graphic.attributes, 'espn_id'))
          throw new Error('Could not get team id');
        onTeamSelect(graphic.attributes.espn_id);
      }
      return;
    }

    const mapHit = await mapView?.hitTest(e, {
      include: [athletesLayer, teamsLayer],
    });

    if (!mapHit || mapHit.results.length === 0)
      throw new Error('Could not get map hit');

    const [firstHit] = mapHit.results;

    if (isGraphicsHit(firstHit)) {
      const { graphic } = firstHit;

      if (!Object.hasOwn(graphic.attributes, 'espn_id'))
        throw new Error('Could not get team id');

      const athlete = graphic.attributes as Athlete;

      console.log(athlete);

      onModeChange('Regions');
      setRegionType('City');
      setSelectedRegion({
        img: getCountryFlagUrl(athlete.country2Code),
        count: 1,
        Country: athlete.birthCountry,
        State: athlete.birthState ?? undefined,
        City: athlete.birthCity,
        label: athlete.birthCity,
      });
    }
  });

  return (
    <div className="bg-foreground-2 h-full">
      {/* <AthleteHover mapView={mapView} athletesLayer={athletesLayer} /> */}
      <CalciteTabs layout="center" className="h-full">
        {!showAthletes && (
          <CalciteTabNav slot="title-group">
            {TABS.map((tab, i) => (
              <CalciteTabTitle
                key={tab}
                title={tab}
                tabIndex={i}
                selected={mode === tab ? true : undefined}
                onCalciteTabsActivate={(e) => {
                  onModeChange(e.target.title as 'Teams' | 'Regions');
                }}
              >
                {tab}
              </CalciteTabTitle>
            ))}
          </CalciteTabNav>
        )}

        <div className="flex flex-col bg-foreground-2 w-[400px] h-full">
          {showTeamAthletes && (
            <PanelHeader
              bgColor={team.attributes.color}
              onBackClick={() => onTeamSelect(undefined)}
              title={team.attributes.location}
              subtitle={team.attributes.name}
              logo={getTeamLogoUrl(
                team.attributes.abbreviation,
                team.attributes.league
              )}
            />
          )}

          {showRegionAthletes && (
            <PanelHeader
              onBackClick={() => setSelectedRegion(undefined)}
              title={selectedRegion.label}
              subtitle={null}
              logo={selectedRegion.img}
            />
          )}

          {showRegions && (
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
              logo={getLeagueLogoUrl(sport)}
            />
          )}
          {showTeams && (
            <PanelHeader
              title={
                <select
                  className="text-3 pt-1 uppercase bg-transparent"
                  onChange={(e) => {
                    onSportChange(e.target.value as Sport);
                  }}
                  value={sport}
                >
                  <option value={Sport.Hockey}>NHL</option>
                  <option value={Sport.Football}>NFL</option>
                  <option value={Sport.Basketball}>NBA</option>
                  <option value={Sport.Baseball}>MLB</option>
                </select>
              }
              subtitle="Teams"
              logo={getLeagueLogoUrl(sport)}
            />
          )}

          {showTeamAthletes && (
            <TeamAthletesList
              onAthleteSelect={onAthleteSelect}
              teams={teams}
              sport={sport}
              mapView={mapView}
              athletesLayer={athletesLayer}
              team={team}
            />
          )}

          {showRegionAthletes && (
            <RegionAthletesList
              onAthleteSelect={onAthleteSelect}
              teams={teams}
              sport={sport}
              regionType={regionType}
              selectedRegion={selectedRegion}
              athletesLayer={athletesLayer}
            />
          )}

          {showTeams && (
            <ListContainer loading={isLoading}>
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
          )}

          {showRegions && (
            <RegionList
              sport={sport}
              regionType={regionType}
              showRegions={showRegions}
              onRegionClick={setSelectedRegion}
              athletesLayer={athletesLayer}
            />
          )}
        </div>
      </CalciteTabs>
    </div>
  );
}

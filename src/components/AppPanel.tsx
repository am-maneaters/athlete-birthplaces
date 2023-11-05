import {
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
} from '@esri/calcite-components-react';
import { useEffect, useMemo, useState } from 'react';
import { Sport, getLeagueLogoUrl, getTeamLogoUrl } from '../utils/imageUtils';
import { useAthletesLayer } from '../hooks/athleteLayerHooks';
import { PanelHeader } from './PanelHeader';

import { useOnEvent } from '../arcgisUtils/useOnEvent';
import { isGraphicsHit } from '../utils/esriUtils';
import { Region } from './ListItem/RegionListItem';
import RegionList, { createRegionFromAthlete } from './List/RegionList';
import TeamAthletesList from './List/AthleteList/TeamAthletesList';
import RegionAthletesList from './List/AthleteList/RegionAthletesList';
import { Athlete } from '../types';
import { useMapView } from '../arcgisUtils/MapViewComponent';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import { useTeamsLayer } from '../hooks/teamLayerHooks';
import { TeamList } from './List/TeamList';

const TABS = ['Teams', 'Regions'] as const;

export function AppPanel({
  initialSport,
  initialTeamId,
  initialPlayerId,
}: {
  initialSport?: Sport;
  initialTeamId?: string;
  initialPlayerId?: string;
}) {
  const mapView = useMapView();

  const [selectedTeamId, setSelectedTeamId] = useState(initialTeamId);

  const [selectedPlayerId, setSelectedPlayerId] = useState(initialPlayerId);

  const [panelMode, setPanelMode] = useState<'Teams' | 'Regions'>('Teams');

  const [sport, setSport] = useState(initialSport ?? Sport.Hockey);

  useEffect(() => {
    // update url params when teamId, playerId, or sport changes
    const params = new URLSearchParams();
    params.set('teamId', selectedTeamId ?? '');
    params.set('playerId', selectedPlayerId ?? '');
    params.set('sport', sport);
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [selectedTeamId, selectedPlayerId, sport]);

  const { teamsLayer, teamsLoading, teams } = useTeamsLayer(mapView, sport);

  const handleSportChange = (sport: Sport) => {
    setSport(sport);
    setSelectedTeamId(undefined);
  };

  const handleTeamSelect = (teamId: number | undefined) => {
    const teamIdString = teamId?.toString();
    setSelectedTeamId(teamIdString);
  };

  const handleAthleteSelect = (athleteId: string) => {
    setSelectedPlayerId(athleteId);
  };

  const handlePanelModeChange = (mode: 'Teams' | 'Regions') => {
    setPanelMode(mode);
    setSelectedTeamId(undefined);
  };

  useEffect(() => {
    teamsLayer.visible = panelMode === 'Teams';
  }, [panelMode, teamsLayer]);

  const [regionType, setRegionType] = useState<'State' | 'Country' | 'City'>(
    'Country'
  );

  const [selectedRegion, setSelectedRegion] = useState<Region>();

  const team = useMemo(
    () =>
      teams?.find((f) => f.attributes.espn_id.toString() === selectedTeamId),
    [teams, selectedTeamId]
  );

  const { athletesLayer } = useAthletesLayer(mapView, team, sport);

  const showRegionAthletes = panelMode === 'Regions' && !!selectedRegion;
  const showTeamAthletes = panelMode === 'Teams' && !!team;

  useEffect(() => {
    if (!selectedTeamId) {
      // Clear the feature effect
      // @ts-expect-error - maps sdk types are wrong
      teamsLayer.featureEffect = undefined;
      return;
    }

    teamsLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      filter: {
        where: `espn_id = '${selectedTeamId}'`,
      },
      excludedLabelsVisible: false,
    });
  }, [teamsLayer, mapView, selectedTeamId]);

  async function onTeamMapClick(e: __esri.ViewClickEvent) {
    const teamsMapHit = await mapView.hitTest(e, {
      include: [teamsLayer],
    });

    if (!teamsMapHit || teamsMapHit.results.length === 0)
      return handleTeamSelect(undefined);

    const [firstHit] = teamsMapHit.results;

    if (isGraphicsHit(firstHit)) {
      const { graphic } = firstHit;
      handleTeamSelect(graphic.attributes.espn_id);
    }
    return;
  }

  async function onRegionMapClick(e: __esri.ViewClickEvent) {
    const mapHit = await mapView?.hitTest(e, {
      include: [athletesLayer, teamsLayer],
    });

    if (!mapHit || mapHit.results.length === 0)
      throw new Error('Could not get map hit');

    const [firstHit] = mapHit.results;

    if (isGraphicsHit(firstHit)) {
      const { graphic } = firstHit;
      console.log(graphic);

      if (!Object.hasOwn(graphic.attributes, 'teamId'))
        throw new Error('Could not get team id');

      const athlete = graphic.attributes as Athlete;

      handlePanelModeChange('Regions');
      setRegionType('City');

      const newRegion = createRegionFromAthlete(athlete, regionType);
      setSelectedRegion(newRegion);
    }
  }

  useOnEvent(mapView, 'click', async (e) => {
    if (!mapView) return;

    return panelMode === 'Teams' ? onTeamMapClick(e) : onRegionMapClick(e);
  });

  return (
    <div className="bg-foreground-2 h-full">
      {/* <AthleteHover mapView={mapView} athletesLayer={athletesLayer} /> */}
      <CalciteTabs layout="center" className="h-full">
        {!showRegionAthletes && !showTeamAthletes && (
          <CalciteTabNav slot="title-group">
            {TABS.map((tab, i) => (
              <CalciteTabTitle
                key={tab}
                title={tab}
                tabIndex={i}
                selected={panelMode === tab}
                onCalciteTabsActivate={(e) => {
                  handlePanelModeChange(e.target.title as 'Teams' | 'Regions');
                }}
              >
                {tab}
              </CalciteTabTitle>
            ))}
          </CalciteTabNav>
        )}

        <div className="flex flex-col bg-foreground-2 w-screen s:w-[400px] s:h-full">
          {showTeamAthletes && (
            <>
              <PanelHeader
                bgColor={
                  team.attributes.color
                    ? `#${team.attributes.color}`
                    : undefined
                }
                onBackClick={() => handleTeamSelect(undefined)}
                title={team.attributes.location}
                subtitle={team.attributes.name}
                logo={getTeamLogoUrl(
                  team.attributes.abbreviation,
                  team.attributes.league
                )}
              />
              <TeamAthletesList
                onAthleteSelect={handleAthleteSelect}
                teams={teams}
                sport={sport}
                mapView={mapView}
                athletesLayer={athletesLayer}
                team={team}
              />
            </>
          )}

          {showRegionAthletes && (
            <>
              <PanelHeader
                onBackClick={() => setSelectedRegion(undefined)}
                title={selectedRegion.label}
                subtitle={null}
                logo={selectedRegion.img}
              />
              <RegionAthletesList
                onAthleteSelect={handleAthleteSelect}
                teams={teams}
                sport={sport}
                regionType={regionType}
                selectedRegion={selectedRegion}
                athletesLayer={athletesLayer}
              />
            </>
          )}

          {panelMode === 'Regions' && !selectedRegion && (
            <>
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
              <RegionList
                sport={sport}
                regionType={regionType}
                showRegions
                onRegionClick={setSelectedRegion}
                athletesLayer={athletesLayer}
              />
            </>
          )}
          {panelMode === 'Teams' && !team && (
            <>
              <PanelHeader
                title={
                  <select
                    className="text-3 pt-1 uppercase bg-transparent"
                    onChange={(e) => {
                      handleSportChange(e.target.value as Sport);
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
              <TeamList
                teams={teams}
                onTeamSelect={handleTeamSelect}
                loading={teamsLoading}
              />
            </>
          )}
        </div>
      </CalciteTabs>
    </div>
  );
}

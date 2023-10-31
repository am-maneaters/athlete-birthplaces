import { useEffect, useMemo } from 'react';

import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { useQuery } from '@tanstack/react-query';
import { replaceFeatures } from '../utils/layerUtils';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { useFeatureLayer } from '../arcgisUtils/useGraphicsLayer';

import { Sport, getTeamLogoUrl, leagueLookup } from '../utils/imageUtils';
import { useSupabase } from '../contexts/SupabaseContext';
import { PointGraphic } from '../typings/AthleteTypes';
import { Team } from '../types';

export function useTeamsLayer(
  mapView: __esri.MapView | undefined,
  selectedSport: Sport
) {
  const supabase = useSupabase();

  const teamsLayer = useFeatureLayer(mapView, {
    title: 'Team Points',
    source: [],
    objectIdField: 'ObjectId',
    geometryType: 'point',
    spatialReference: { wkid: 4326 },
    outFields: ['*'],

    fields: [
      {
        name: 'ObjectId',
        alias: 'ObjectId',
        type: 'oid',
      },
      {
        name: 'id',
        alias: 'id',
        type: 'string',
      },
      {
        name: 'logo',
        alias: 'logo',
        type: 'string',
      },
      {
        name: 'name',
        alias: 'name',
        type: 'string',
      },
      {
        name: 'espn_id',
        alias: 'espn_id',
        type: 'string',
      },
    ],
  });

  //  Query the base team layer for the selected sport
  const teamQuery = useQuery({
    queryKey: ['teamInfo', selectedSport],
    queryFn: async ({ signal }) =>
      supabase
        .from('Teams')
        .select('*')
        .eq('league', leagueLookup[selectedSport])
        .abortSignal(signal),
    throwOnError: true,
    select: ({ data }) => {
      if (!data) return;
      return data.map((team) => ({
        ...team,
        logo: getTeamLogoUrl(team.abbreviation, team.league),
      }));
    },
  });

  const teamsGraphics = useMemo(() => {
    const { data: teamFeatures } = teamQuery;
    if (!teamFeatures) return;
    const newFeatures = teamFeatures.map(
      ({ latitude, longitude, ...attributes }) =>
        new Graphic({
          geometry: new Point({ longitude, latitude }),
          attributes: { ...attributes },
        }) as PointGraphic<Team>
    );

    return newFeatures;
  }, [teamQuery]);

  useQuery({
    queryKey: ['replaceFeatures', teamsGraphics],
    queryFn: async ({ signal }) =>
      teamsGraphics ? replaceFeatures(teamsLayer, teamsGraphics, signal) : null,
  });

  //  Replace features in the teams layer
  useEffect(() => {
    if (!teamsLayer || !teamsGraphics) return;

    teamsLayer.renderer = new UniqueValueRenderer({
      field: 'name',
      uniqueValueInfos: teamsGraphics.map(
        ({ attributes: { name, abbreviation, league } }) => ({
          value: name,
          symbol: new PictureMarkerSymbol({
            url: getTeamLogoUrl(abbreviation, league),
            width: '48px',
            height: '48px',
          }),
        })
      ),
    });
  }, [teamsGraphics, teamsLayer]);

  return { teamsLayer, isLoading: teamQuery.isLoading, teamsGraphics };
}

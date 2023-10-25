import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import { PointGraphic } from '../typings/AthleteTypes';

import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { useFeatureLayer } from '../arcgisUtils/useGraphicsLayer';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../contexts/SupabaseContext';
import { Sport, leagueLookup } from '../utils/imageUtils';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { replaceFeatures } from '../utils/layerUtils';
import { Athlete, Team } from '../types';

export function useAthletesLayer(
  mapView: __esri.MapView | undefined,
  selectedTeam: PointGraphic<Team> | undefined,
  selectedSport: Sport
) {
  const athletesLayer = useFeatureLayer(mapView, {
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
        name: 'teamId',
        alias: 'teamId',
        type: 'string',
      },
      {
        name: 'birthCity',
        alias: 'birthCity',
        type: 'string',
      },
      {
        name: 'active',
        alias: 'active',
        type: 'string',
      },
      {
        name: 'age',
        alias: 'age',
        type: 'integer',
      },
      {
        name: 'birthCity',
        alias: 'birthCity',
        type: 'string',
      },
      {
        name: 'birthCountry',
        alias: 'birthCountry',
        type: 'string',
      },
      {
        name: 'birthPlace',
        alias: 'birthPlace',
        type: 'string',
      },
      {
        name: 'birthState',
        alias: 'birthState',
        type: 'string',
      },
      {
        name: 'birthStateAbbr',
        alias: 'birthStateAbbr',
        type: 'string',
      },
      {
        name: 'country2Code',
        alias: 'country2Code',
        type: 'string',
      },
      {
        name: 'dateOfBirth',
        alias: 'dateOfBirth',
        type: 'string',
      },
      {
        name: 'debutYear',
        alias: 'debutYear',
        type: 'integer',
      },
      {
        name: 'firstName',
        alias: 'firstName',
        type: 'string',
      },
      {
        name: 'height',
        alias: 'height',
        type: 'long',
      },
      {
        name: 'id',
        alias: 'id',
        type: 'integer',
      },
      {
        name: 'jersey',
        alias: 'jersey',
        type: 'string',
      },
      {
        name: 'lastName',
        alias: 'lastName',
        type: 'string',
      },

      {
        name: 'league',
        alias: 'league',
        type: 'string',
      },
      {
        name: 'longitude',
        alias: 'longitude',
        type: 'integer',
      },
      {
        name: 'positionDisplayName',
        alias: 'positionDisplayName',
        type: 'string',
      },
      {
        name: 'positionName',
        alias: 'positionName',
        type: 'string',
      },
      {
        name: 'statusName',
        alias: 'statusName',
        type: 'string',
      },
      {
        name: 'statusType',
        alias: 'statusType',
        type: 'string',
      },
    ],
    labelingInfo: [
      {
        labelExpressionInfo: {
          expression: '$feature.birthCity',
        },
        symbol: {
          type: 'text',
          color: '#fff',
          haloColor: 'black',
          haloSize: '1px',
          font: {
            size: 8,
            family: 'Noto Sans',
            weight: 'bold',
          },
        },
        maxScale: 0,
        minScale: 1_500_000,
        labelPlacement: 'above-center',
      },
    ],
  });

  const athleteQuery = useQuery({
    queryKey: ['athleteInfo', selectedSport, leagueLookup[selectedSport]],
    queryFn: async ({ signal }) =>
      supabase
        .from('Athletes')
        .select('*')
        .eq('league', leagueLookup[selectedSport])
        .abortSignal(signal),
    throwOnError: true,
    select: ({ data }) => data,
  });

  useEffect(() => {
    athletesLayer.effect = 'bloom(1, 1px, 99%)';
    athletesLayer.renderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        color: [255, 255, 255, 1],
        size: 5,
        outline: {
          color: [255, 255, 255, 0.1],
          width: 1,
        },
      }),
    });
  }, [athletesLayer]);

  useEffect(() => {
    const { data: athleteFeatures } = athleteQuery;
    if (!athleteFeatures) return;
    const newFeatures = athleteFeatures.map(
      ({ latitude, longitude, ...attributes }) =>
        new Graphic({
          geometry: new Point({
            longitude: longitude ?? undefined,
            latitude: latitude ?? undefined,
          }),
          attributes: { ...attributes },
        }) as PointGraphic<Athlete>
    );

    replaceFeatures(athletesLayer, newFeatures);
  }, [athleteQuery, athletesLayer]);

  useEffect(() => {
    if (!selectedTeam) {
      // @ts-expect-error - maps sdk types are wrong
      athletesLayer.featureEffect = undefined;
      return;
    }

    athletesLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      // make the feature bigger
      includedEffect: 'drop-shadow(1px, 1px, 1px, black)',
      filter: {
        where: `teamId = ${selectedTeam?.attributes.espn_id}`,
      },
    });
  }, [athletesLayer, selectedTeam]);

  return { athletesLayer };
}

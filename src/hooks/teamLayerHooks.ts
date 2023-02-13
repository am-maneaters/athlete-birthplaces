import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { useQuery } from '@tanstack/react-query';
import { replaceFeatures } from '../utils/layerUtils';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { array } from 'yup';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { teamSchema } from '../schemas/teamSchema';
import { graphicSchema } from '../schemas/graphicSchema';

const nhlTeamsLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/ESPN_Big_Four_Teams/FeatureServer/0';

export function useTeamsLayer(
  mapView: __esri.MapView | undefined,
  selectedTeamId: string | undefined,
  selectedSport: string
) {
  const baseTeamLayer = useFeatureLayer(mapView, {
    url: nhlTeamsLayerUrl,
    title: 'NHL Teams',
    outFields: ['*'],
    visible: false,
  });

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
    ],
  });

  const teamsView = useFeatureLayerView(mapView, baseTeamLayer);

  useEffect(() => {
    if (!mapView || !teamsView) return;

    const sportTypeFilter = new FeatureFilter({
      where: `type = '${selectedSport}'`,
    });

    teamsView.filter = sportTypeFilter;
  }, [mapView, selectedSport, teamsView]);

  //   Apply feature effect to the teams layer
  useEffect(() => {
    if (!mapView || !selectedTeamId) {
      teamsLayer.featureEffect = new FeatureEffect();
      return;
    }

    teamsLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      filter: {
        where: `id = '${selectedTeamId}'`,
      },
    });
  }, [teamsLayer, mapView, selectedTeamId]);

  //  Query the base team layer for the selected sport
  const { data: teamFeatures } = useQuery(
    ['teamInfo', selectedSport],
    async ({ signal }) => {
      const features = await baseTeamLayer.queryFeatures(
        {
          where: `type = '${selectedSport}'`,
          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );
      return array().of(graphicSchema(teamSchema)).validate(features.features);
    }
  );

  //  Replace features in the teams layer
  useEffect(() => {
    if (!teamFeatures || !teamsLayer) return;

    teamsLayer.renderer = new UniqueValueRenderer({
      field: 'logo',
      uniqueValueInfos: teamFeatures.map(({ attributes }) => ({
        value: attributes?.logo,
        symbol: new PictureMarkerSymbol({
          url: attributes?.logo,
          width: '48px',
          height: '48px',
        }),
      })),
    });

    const newFeatures = teamFeatures.map(
      ({ geometry, attributes }) =>
        new Graphic({
          geometry: new Point({
            longitude: geometry.longitude,
            latitude: geometry.latitude,
          }),
          attributes: { ...attributes },
        })
    );

    replaceFeatures(teamsLayer, newFeatures);
  }, [baseTeamLayer.fields, teamFeatures, teamsLayer]);

  return { teamsLayer, teamFeatures };
}

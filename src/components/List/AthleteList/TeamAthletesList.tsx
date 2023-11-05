import React from 'react';
import { AthleteList } from './AthleteList';
import { useQuery } from '@tanstack/react-query';
import { PointGraphic } from '../../../typings/AthleteTypes';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../../../arcgisUtils/useGraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import { replaceFeatures } from '../../../utils/layerUtils';
import { Athlete, Team } from '../../../types';
import { getTeamLineColor } from '../../../utils/teamUtils';

type Props = {
  onAthleteSelect: (athlete: string) => void;
  teams: PointGraphic<Team>[] | undefined;
  team: PointGraphic<Team>;
  sport: string;
  mapView: __esri.MapView;
  athletesLayer: __esri.FeatureLayer;
};

export default function TeamAthletesList({
  onAthleteSelect,
  teams,
  team,
  sport,
  mapView,
  athletesLayer,
}: Props) {
  const athletesLayerView = useFeatureLayerView(mapView, athletesLayer);
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

  const { data: teamAthletes, isLoading: athletesLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['relatedPlayers', team, sport],
    enabled: !!athletesLayerView,
    queryFn: async ({ signal }) => {
      if (!team) return [];

      if (!athletesLayerView) throw new Error('Athletes layer not loaded');
      const features = await athletesLayerView.layer.queryFeatures(
        {
          where: `teamId = '${team?.attributes.espn_id}'`,
          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );

      if (!features) return [];

      return features.features as PointGraphic<Athlete>[];
    },

    select: (data) => (data?.length === 0 ? undefined : data),
  });

  useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['playerLines', team, teamAthletes, playerLineLayer],
    enabled: !!playerLineLayer,
    queryFn: async ({ signal }) => {
      if (!team || !teamAthletes) return [];

      const lineColor = getTeamLineColor(team);

      playerLineLayer.renderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          color: lineColor,
          width: 2,
        }),
      });

      const newGraphicsPromise = teamAthletes.map(
        async ({ geometry, attributes }) =>
          new Graphic({
            geometry: new Polyline({
              paths: [
                [
                  // Create a line from the team to the player
                  [geometry.longitude, geometry.latitude],
                  [team.geometry.longitude, team.geometry.latitude],
                ],
              ],
            }),
            attributes: { ...attributes },
          })
      );
      const newGraphics = await Promise.all(newGraphicsPromise);
      await replaceFeatures(playerLineLayer, newGraphics, signal);
      return newGraphics;
    },
  });

  return (
    <AthleteList
      loading={athletesLoading}
      athletes={teamAthletes?.map((a) => a.attributes)}
      onAthleteSelect={onAthleteSelect}
      teams={teams}
    />
  );
}

import React, { useEffect } from 'react';
import { AthleteList } from './AthleteList';
import { Team } from '../../../schemas/teamSchema';
import { Athlete, athleteSchema } from '../../../schemas/athleteSchema';
import { useQuery } from '@tanstack/react-query';
import { array } from 'yup';
import { graphicSchema } from '../../../schemas/graphicSchema';
import { PointGraphic } from '../../../typings/AthleteTypes';
import {
  useCsvLayerView,
  useFeatureLayer,
} from '../../../arcgisUtils/useGraphicsLayer';
import Color from '@arcgis/core/Color';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import { getLuminance } from '../../../utils/colorUtils';
import { replaceFeatures } from '../../../utils/layerUtils';

type Props = {
  onAthleteSelect: (athlete: string) => void;
  teams: PointGraphic<Team>[] | undefined;
  team: PointGraphic<Team>;
  sport: string;
  mapView: __esri.MapView;
  athletesLayer: __esri.CSVLayer;
};

export default function TeamAthletesList({
  onAthleteSelect,
  teams,
  team,
  sport,
  mapView,
  athletesLayer,
}: Props) {
  const athletesLayerView = useCsvLayerView(mapView, athletesLayer);
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
    queryKey: ['relatedPlayers', team, sport, athleteSchema],
    enabled: !!athletesLayerView,
    queryFn: async ({ signal }) => {
      if (!team) return [];

      if (!athletesLayerView) throw new Error('Athletes layer not loaded');
      const features = await (
        athletesLayerView.layer as __esri.CSVLayer
      ).queryFeatures(
        {
          where: `type = '${sport}' AND teamId = '${team?.attributes.id}'`,
          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );

      if (!features) return [];

      return array()
        .of(graphicSchema(athleteSchema))
        .validateSync(features.features) as PointGraphic<Athlete>[];
    },
    onError: (err) => {
      console.log(err);
    },
    select: (data) => (data?.length === 0 ? undefined : data),
  });

  useEffect(() => {
    let isUpdating = false;
    async function updateLines() {
      if (isUpdating) return;
      isUpdating = true;
      await replaceFeatures(playerLineLayer, []);
      if (!teamAthletes || !team) return;
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
      const newGraphicsPromise = teamAthletes.map(
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
  }, [teamAthletes, playerLineLayer, team]);

  // const averageDistance = useMemo(() => {
  //   if (!teamAthletes || !team) return;

  //   const distances = teamAthletes.map((athlete) =>
  //     distance(
  //       athlete.geometry as __esri.Point,
  //       team.geometry as __esri.Point,
  //       'miles'
  //     )
  //   );

  //   const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;

  //   return avgDistance.toFixed(0);
  // }, [teamAthletes, team]);

  return (
    <>
      {/* {averageDistance} */}
      <AthleteList
        loading={athletesLoading}
        athletes={teamAthletes?.map((athlete) => athlete.attributes)}
        onAthleteSelect={onAthleteSelect}
        teams={teams}
      />
    </>
  );
}

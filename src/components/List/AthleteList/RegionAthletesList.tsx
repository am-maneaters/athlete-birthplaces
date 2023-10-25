import { useQuery } from '@tanstack/react-query';
import { Region } from '../../ListItem/RegionListItem';
import { AthleteList } from './AthleteList';
import { PointGraphic } from '../../../typings/AthleteTypes';
import { Athlete, Team } from '../../../types';

type Props = {
  onAthleteSelect: (athleteId: string) => void;
  teams: PointGraphic<Team>[] | undefined;
  sport: string;
  regionType: 'City' | 'State' | 'Country';
  selectedRegion: Region | undefined;
  athletesLayer: __esri.FeatureLayer | undefined;
};
export default function RegionAthletesList({
  onAthleteSelect,
  teams,
  sport,
  regionType,
  selectedRegion,
  athletesLayer,
}: Props) {
  const { data: regionAthletes, isLoading: regionAthletesLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['regionAth', sport, regionType, selectedRegion],
    queryFn: async ({ signal }) => {
      if (!selectedRegion) return [];

      const { State } = selectedRegion;

      const currentRegionName = selectedRegion[regionType];

      const where =
        regionType === 'State'
          ? `type = '${sport}' AND birthState = '${currentRegionName}'`
          : regionType === 'City'
          ? `type = '${sport}' AND birthCity = '${currentRegionName}'${
              State ? ` AND birthState = '${State}'` : ''
            }`
          : `type = '${sport}' AND birthCountry = '${currentRegionName}'`;

      const features = await athletesLayer?.queryFeatures(
        {
          where,
          outFields: ['*'],
        },
        { signal }
      );

      if (!features) return [];

      return features.features as PointGraphic<Athlete>[];
    },
  });

  return (
    <AthleteList
      loading={regionAthletesLoading}
      athletes={regionAthletes}
      onAthleteSelect={onAthleteSelect}
      teams={teams}
    />
  );
}

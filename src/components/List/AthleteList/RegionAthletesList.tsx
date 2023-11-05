import { useQuery } from '@tanstack/react-query';
import { Region } from '../../ListItem/RegionListItem';
import { AthleteList } from './AthleteList';
import { PointGraphic } from '../../../typings/AthleteTypes';
import { Athlete, Team } from '../../../types';
import { Sport, leagueLookup } from '../../../utils/imageUtils';

type Props = {
  onAthleteSelect: (athleteId: string) => void;
  teams: PointGraphic<Team>[] | undefined;
  sport: Sport;
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
    throwOnError: true,
    queryFn: async ({ signal }) => {
      if (!selectedRegion) return [];

      const { State } = selectedRegion;

      const currentRegionName = selectedRegion[regionType];

      const league = leagueLookup[sport];

      const where =
        regionType === 'State'
          ? `league = '${league}' AND birthState = '${currentRegionName}'`
          : regionType === 'City'
          ? `league = '${league}' AND birthCity = '${currentRegionName}'${
              State ? ` AND birthState = '${State}'` : ''
            }`
          : `league = '${league}' AND birthCountry = '${currentRegionName}'`;

      const features = await athletesLayer?.queryFeatures(
        {
          where,
          outFields: ['*'],
        },
        { signal }
      );

      if (!features) return [];

      return features.features.map((f) => f.attributes as Athlete);
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

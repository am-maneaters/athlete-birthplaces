import * as yup from 'yup';

export const graphicSchema = <T extends yup.Schema>(attributes: T) =>
  yup.object().shape({
    attributes,
    geometry: yup.object().shape({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    }),
  });

export const athleteSchema = yup.object().shape({
  id: yup.number().required(),
  type: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  fullName: yup.string().required(),
  displayName: yup.string().required(),
  shortName: yup.string().required(),
  weight: yup.number().required(),
  displayWeight: yup.string().required(),
  height: yup.number().required(),
  displayHeight: yup.string().required(),
  age: yup.number().required().nullable(),
  dateOfBirth: yup.string().required().nullable(),
  debutYear: yup.number().nullable(),
  headshotUrl: yup
    .string()
    .url()
    .default(
      'https://thesanctuaryupc.com/wp-content/uploads/2014/07/Headshot-Placeholder-Vertix.jpg'
    )
    .nullable(),
  jersey: yup.string().nullable(),
  positionName: yup.string().required(),
  positionDisplayName: yup.string().required(),
  birthCity: yup.string().required(),
  birthState: yup.string().nullable(),
  birthCountry: yup.string().required(),
  birthPlace: yup.string().required(),
  teamId: yup.string().required(),
  teamUrl: yup.string().required().url(),
  statsUrl: yup.string().url().nullable(),
  active: yup.boolean().required(),
  statusType: yup.string().required(),
  statusName: yup.string().required(),
});

export type Athlete = yup.InferType<typeof athleteSchema>;

export type Team = {
  id: number;
  slug: string;
  location: string;
  name: string;
  nickname: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  logo: string;
  athletesUrl: string;
  venueUrl?: string;
  venueId?: string;
  venueName?: string;
  venueCity?: string;
  venueState?: string;
  venueCountry?: string;
  venueAddress: string;
};

export interface PointGraphic<T> extends __esri.Graphic {
  attributes: T;
  geometry: __esri.Point;
}

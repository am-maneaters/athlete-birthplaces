import { string, number, object, boolean, InferType } from 'yup';

export const athleteSchema = object().shape({
  id: number().required(),
  type: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  fullName: string().required(),
  displayName: string().required(),
  shortName: string().required(),
  weight: number().required(),
  displayWeight: string().required(),
  height: number().required(),
  displayHeight: string().required(),
  age: number().required().nullable(),
  dateOfBirth: string().required().nullable(),
  debutYear: number().nullable(),
  headshotUrl: string()
    .url()
    .default(
      'https://thesanctuaryupc.com/wp-content/uploads/2014/07/Headshot-Placeholder-Vertix.jpg'
    )
    .nullable(),
  jersey: string().nullable(),
  positionName: string().required(),
  positionDisplayName: string().required(),
  birthCity: string().required(),
  birthState: string().nullable(),
  birthCountry: string().required(),
  birthPlace: string().required(),
  teamId: string().required(),
  teamUrl: string().required().url(),
  statsUrl: string().url().nullable(),
  active: boolean().required(),
  statusType: string().required(),
  statusName: string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Athlete extends InferType<typeof athleteSchema> {}

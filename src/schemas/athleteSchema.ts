import { string, number, object, boolean, InferType } from 'yup';

export const athleteSchema = object().shape({
  id: number().required(),
  type: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  // fullName: string().required(),
  // displayName: string().required(),
  // shortName: string().required(),
  weight: number().nullable(),
  displayWeight: string().nullable(),
  height: number().nullable(),
  displayHeight: string().nullable(),
  age: number().required().nullable(),
  dateOfBirth: string().required().nullable(),
  debutYear: number().nullable(),
  jersey: string().nullable(),
  positionName: string().required(),
  positionDisplayName: string().required(),
  // birthCity: string().required(),
  birthState: string().nullable(),
  birthCountry: string().required(),
  country2Code: string().required(),
  birthPlace: string(),
  teamId: string().required(),
  // active: boolean().required(),
  statusType: string().required(),
  statusName: string().required(),
  league: string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Athlete extends InferType<typeof athleteSchema> {}

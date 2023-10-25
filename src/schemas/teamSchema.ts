import { object, string, number, boolean, InferType } from 'yup';

export const teamSchema = object().shape({
  id: number().required(),
  slug: string().required(),
  location: string().required(),
  name: string().required(),
  nickname: string().nullable(),
  abbreviation: string().required(),
  displayName: string().required(),
  shortDisplayName: string().required(),
  color: string()
    .required()
    .transform((value) => `#${value}`),

  alternateColor: string()
    .required()
    .transform((value) => `#${value}`),

  logo: string().required(),
  athletesUrl: string().required().url(),
  venueUrl: string().url().nullable(),
  venueId: string().nullable(),
  venueName: string().nullable(),
  venueCity: string().nullable(),
  venueState: string().nullable(),
  venueCountry: string().nullable(),
  venueAddress: string().required(),
  league: string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Team extends InferType<typeof teamSchema> {}

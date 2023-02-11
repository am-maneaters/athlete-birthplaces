import { InferType, Schema, number, object } from 'yup';

export function graphicSchema<T extends Schema>(attributes: T) {
  return object().shape({
    attributes,
    geometry: object().shape({
      latitude: number().required(),
      longitude: number().required(),
    }),
  });
}

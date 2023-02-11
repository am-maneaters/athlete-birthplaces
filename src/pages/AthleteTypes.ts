export interface PointGraphic<T> {
  attributes: T;
  geometry: {
    latitude: number;
    longitude: number;
  };
}

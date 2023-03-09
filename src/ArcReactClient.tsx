import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import React, {
  HTMLAttributes,
  createContext,
  useEffect,
  useId,
  useRef,
} from 'react';

const MapContext = createContext<MapView | undefined>(undefined);

type Props = {
  children: React.ReactNode;
  viewProps?: __esri.MapViewProperties;
};

export const ArcReactClient: React.FC<Props> = ({ children, viewProps }) => {
  const mapView = useRef(new MapView(viewProps));

  return (
    <MapContext.Provider value={mapView.current}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapView = () => {
  const mapView = React.useContext(MapContext);
  if (mapView === undefined) {
    throw new Error(`useMapView must be used within a MapContextProvider`);
  }
  return mapView;
};

type MapViewComponentProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function ArcView({
  children,
  ...divAttributes
}: MapViewComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapView = useMapView();

  //   useEffect(() => {
  //     mapViewRef.current.when(() => {
  //       setMapView(mapViewRef.current);
  //       onMapViewLoad?.(mapViewRef.current);
  //     });
  //   }, [onMapViewLoad]);

  useEffect(() => {
    if (mapContainer.current) mapView.set('container', mapContainer.current);
  }, [mapView]);

  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} style={{ overflow: 'auto' }} {...divAttributes}>
        {mapView && children}
      </div>
    </MapContext.Provider>
  );
}

export function useFeatureLayer(
  layerParams: ConstructorParameters<typeof FeatureLayer>[0],
  layerIndex = 0
): FeatureLayer {
  const id = useId();
  const mapView = useMapView();
  const layer = useRef(new FeatureLayer({ ...layerParams, id }));

  useEffect(() => {
    if (!mapView) return;
    const currentLayer = layer.current;
    const prevLayer = mapView.map.findLayerById(id);
    if (prevLayer) {
      mapView.map.remove(prevLayer);
    }
    mapView.map.add(currentLayer, layerIndex);

    return () => {
      mapView.map.remove(currentLayer);
    };
  }, [id, layer, layerIndex, mapView]);

  return layer.current;
}

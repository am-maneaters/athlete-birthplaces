import MapView from '@arcgis/core/views/MapView';
import React, {
  useRef,
  useEffect,
  createContext,
  HTMLAttributes,
  useState,
} from 'react';
import Map from '@arcgis/core/Map';

export const MapContext = createContext<MapView | undefined>(new MapView());

type MapViewComponentProps = {
  children?: React.ReactNode;
  mapProps: __esri.WebMapProperties;
  mapViewProps: __esri.MapViewProperties;
  onMapViewLoad?: (map: MapView) => void;
} & HTMLAttributes<HTMLDivElement>;

export default function MapViewComponent({
  children,
  mapProps,
  mapViewProps,
  onMapViewLoad,
  ...divAttributes
}: MapViewComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(new Map(mapProps));

  const [mapView, setMapView] = useState<MapView>();

  const mapViewRef = useRef<MapView>(
    new MapView({ ...mapViewProps, map: mapRef.current })
  );

  useEffect(() => {
    mapViewRef.current.when(() => {
      setMapView(mapViewRef.current);
      onMapViewLoad?.(mapViewRef.current);
    });
  }, [onMapViewLoad]);

  useEffect(() => {
    if (mapContainer.current)
      mapViewRef.current.container = mapContainer.current;
  }, []);

  return (
    <MapContext.Provider value={mapView}>
      <div ref={mapContainer} style={{ overflow: 'auto' }} {...divAttributes}>
        {mapView && children}
      </div>
    </MapContext.Provider>
  );
}

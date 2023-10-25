import React from 'react';
import { useOnEvent } from '../arcgisUtils/useOnEvent';
import { isGraphicsHit } from '../utils/esriUtils';
import { autoPlacement, autoUpdate, useFloating } from '@floating-ui/react-dom';
import { Athlete } from '../types';

type Props = {
  mapView: __esri.MapView;
  athletesLayer: __esri.FeatureLayer;
};

export function AthleteHover({ mapView, athletesLayer }: Props) {
  const [athletes, setAthletes] = React.useState<Athlete[]>([]);

  const { x, y, strategy, refs } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [autoPlacement({})],
  });

  useOnEvent(mapView, 'pointer-move', async (e) => {
    refs.setReference({
      getBoundingClientRect: () => ({
        top: e.y,
        left: e.x,
        x: e.x,
        y: e.y,
        width: 0,
        height: 0,
        right: e.x,
        bottom: e.y,
      }),
    });
    const mapHit = await mapView?.hitTest(e, {
      include: [athletesLayer],
    });

    const hits = mapHit?.results.filter((result) =>
      isGraphicsHit(result)
    ) as __esri.GraphicHit[];

    if (!hits || hits.length === 0) {
      setAthletes([]);
      return;
    }

    setAthletes(hits.map((hit) => hit.graphic.attributes as Athlete));
  });

  return (
    <>
      <div
        style={{
          top: y ?? 0,
          left: x ?? 0,
          position: strategy,
          maxHeight: '50vh',
          overflowY: 'auto',
          pointerEvents: 'none',
        }}
        ref={refs.setFloating}
      >
        {athletes.map((athlete) => (
          <div
            key={athlete.id}
            className="bg-foreground-1 text-black p-2 rounded-md shadow-md"
          >
            <div className="text-n3">
              {athlete.firstName} {athlete.lastName}
            </div>
            {/* <div className="text-2h">{athlete.teamId}</div> */}
          </div>
        ))}
      </div>
    </>
  );
}

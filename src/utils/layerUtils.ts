export const replaceFeatures = (
  layer: __esri.FeatureLayer,
  features: __esri.Graphic[],
  signal: AbortSignal
) =>
  layer.queryFeatures(undefined, { signal }).then((result) =>
    layer.applyEdits({
      deleteFeatures: result.features,
      addFeatures: features,
    })
  );

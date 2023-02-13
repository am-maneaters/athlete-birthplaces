export const replaceFeatures = (
  layer: __esri.FeatureLayer,
  features: __esri.Graphic[]
) =>
  layer.queryFeatures().then((result) =>
    layer.applyEdits({
      deleteFeatures: result.features,
      addFeatures: features,
    })
  );

import{aY as r,n5 as m,az as s}from"./index.js";import{p as c}from"./queryTopFeatures.js";async function u(a,o,n){const e=r(a),t=await c(e,m.from(o),{...n});return{count:t.data.count,extent:s.fromJSON(t.data.extent)}}export{u as executeForTopExtents};

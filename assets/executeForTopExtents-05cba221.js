import{aY as r,n5 as m,az as s}from"./index-5be327fa.js";import{p as c}from"./queryTopFeatures-af5f0097.js";async function u(a,o,n){const e=r(a),t=await c(e,m.from(o),{...n});return{count:t.data.count,extent:s.fromJSON(t.data.extent)}}export{u as executeForTopExtents};

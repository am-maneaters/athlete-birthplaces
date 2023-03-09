import{aY as s,n5 as e}from"./index.js";import{m}from"./queryTopFeatures.js";async function f(o,a,t){const r=s(o);return(await m(r,e.from(a),{...t})).data.objectIds}export{f as executeForTopIds};

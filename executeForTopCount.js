import{aY as n,n5 as s}from"./index.js";import{a as u}from"./queryTopFeatures.js";async function f(o,t,a){const r=n(o);return(await u(r,s.from(t),{...a})).data.count}export{f as executeForTopCount};

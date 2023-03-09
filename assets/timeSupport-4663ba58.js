import{hh as N,hi as w,cd as S,fW as I,cv as m,hj as E,hk as T,a2 as _,ck as v,s as R,f2 as G,bd as q}from"./index-5be327fa.js";import{f as C}from"./projectionSupport-7ddc688f.js";import{v as f}from"./utils-dc6e7cd5.js";function M(e){return e==="mesh"?N:w(e)}function P(e,t){return e?t?4:3:t?3:2}function $(e,t,i,r){return b(e,t,i,r.coords[0],r.coords[1])}function F(e,t,i,r,s,n){const l=P(s,n),{coords:a,lengths:u}=r;if(!u)return!1;for(let o=0,c=0;o<u.length;o++,c+=l)if(!b(e,t,i,a[c],a[c+1]))return!1;return!0}function b(e,t,i,r,s){if(!e)return!1;const n=P(t,i),{coords:l,lengths:a}=e;let u=!1,o=0;for(const c of a)u=j(u,l,n,o,c,r,s),o+=c*n;return u}function j(e,t,i,r,s,n,l){let a=e,u=r;for(let o=r,c=r+s*i;o<c;o+=i){u=o+i,u===c&&(u=r);const g=t[o],p=t[o+1],A=t[u],y=t[u+1];(p<l&&y>=l||y<l&&p>=l)&&g+(l-p)/(y-p)*(A-g)<n&&(a=!a)}return a}const d="feature-store:unsupported-query",x={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},h={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function O(e){return e!=null&&h.spatialRelationship[e]===!0}function W(e){return e!=null&&h.queryGeometry[q(e)]===!0}function D(e){return e!=null&&h.layerGeometry[e]===!0}function U(){return _(()=>import("./geometryEngineJSON-1e940afe.js"),["assets/geometryEngineJSON-1e940afe.js","assets/geometryEngineBase-e1a33b0a.js","assets/geometryEngineJSON-3f330436.js","assets/json-48e3ea08.js"])}function B(e,t,i,r,s){if(S(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains")){const n=I(new v,t,!1,!1);return Promise.resolve(l=>$(n,!1,!1,l))}if(S(t)&&i==="esriGeometryMultipoint"){const n=I(new v,t,!1,!1);if(e==="esriSpatialRelContains")return Promise.resolve(l=>F(n,!1,!1,l,r,s))}if(m(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains"))return Promise.resolve(n=>E(t,f(i,r,s,n)));if(m(t)&&i==="esriGeometryMultipoint"&&e==="esriSpatialRelContains")return Promise.resolve(n=>T(t,f(i,r,s,n)));if(m(t)&&e==="esriSpatialRelIntersects"){const n=M(i);return Promise.resolve(l=>n(t,f(i,r,s,l)))}return U().then(n=>{const l=n[x[e]].bind(null,t.spatialReference,t);return a=>l(f(i,r,s,a))})}async function H(e,t,i){const{spatialRel:r,geometry:s}=e;if(s){if(!O(r))throw new R(d,"Unsupported query spatial relationship",{query:e});if(G(s.spatialReference)&&G(i)){if(!W(s))throw new R(d,"Unsupported query geometry type",{query:e});if(!D(t))throw new R(d,"Unsupported layer geometry type",{query:e});if(e.outSR)return C(e.geometry&&e.geometry.spatialReference,e.outSR)}}}function J(e){if(m(e))return!0;if(S(e)){for(const t of e.rings)if(t.length!==5||t[0][0]!==t[1][0]||t[0][0]!==t[4][0]||t[2][0]!==t[3][0]||t[0][1]!==t[3][1]||t[0][1]!==t[4][1]||t[1][1]!==t[2][1])return!1;return!0}return!1}async function K(e,t){if(!e)return null;const i=t.featureAdapter,{startTimeField:r,endTimeField:s}=e;let n=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY;if(r&&s)await t.forEach(a=>{const u=i.getAttribute(a,r),o=i.getAttribute(a,s);u==null||isNaN(u)||(n=Math.min(n,u)),o==null||isNaN(o)||(l=Math.max(l,o))});else{const a=r||s;await t.forEach(u=>{const o=i.getAttribute(u,a);o==null||isNaN(o)||(n=Math.min(n,o),l=Math.max(l,o))})}return{start:n,end:l}}function Q(e,t,i){if(!t||!e)return null;const{startTimeField:r,endTimeField:s}=e;if(!r&&!s)return null;const{start:n,end:l}=t;return n===null&&l===null?null:n===void 0&&l===void 0?Y():r&&s?V(i,r,s,n,l):k(i,r||s,n,l)}function V(e,t,i,r,s){return r!=null&&s!=null?n=>{const l=e.getAttribute(n,t),a=e.getAttribute(n,i);return(l==null||l<=s)&&(a==null||a>=r)}:r!=null?n=>{const l=e.getAttribute(n,i);return l==null||l>=r}:s!=null?n=>{const l=e.getAttribute(n,t);return l==null||l<=s}:void 0}function k(e,t,i,r){return i!=null&&r!=null&&i===r?s=>e.getAttribute(s,t)===i:i!=null&&r!=null?s=>{const n=e.getAttribute(s,t);return n>=i&&n<=r}:i!=null?s=>e.getAttribute(s,t)>=i:r!=null?s=>e.getAttribute(s,t)<=r:void 0}function Y(){return()=>!1}export{J as I,H as P,Q as n,K as t,B as v};

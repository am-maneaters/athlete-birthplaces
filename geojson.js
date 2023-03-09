import{s as P,gS as G,iy as $,gU as C,ck as J}from"./index.js";const v={LineString:"esriGeometryPolyline",MultiLineString:"esriGeometryPolyline",MultiPoint:"esriGeometryMultipoint",Point:"esriGeometryPoint",Polygon:"esriGeometryPolygon",MultiPolygon:"esriGeometryPolygon"};function S(n){return v[n]}function*M(n){switch(n.type){case"Feature":yield n;break;case"FeatureCollection":for(const t of n.features)t&&(yield t)}}function*x(n){if(n)switch(n.type){case"Point":yield n.coordinates;break;case"LineString":case"MultiPoint":yield*n.coordinates;break;case"MultiLineString":case"Polygon":for(const t of n.coordinates)yield*t;break;case"MultiPolygon":for(const t of n.coordinates)for(const o of t)yield*o}}function*A(n,t={}){const{geometryType:o,objectIdField:e}=t;for(const r of n){const{geometry:s,properties:p,id:i}=r;if(s&&S(s.type)!==o)continue;const l=p||{};let c;e&&(c=l[e],i==null||c||(l[e]=c=i)),yield new C(s?Z(new J,s,t):null,l,null,c??void 0)}}function D(n){for(const t of n)if(t.length>2)return!0;return!1}function E(n){return!T(n)}function R(n){return T(n)}function T(n){let t=0;for(let o=0;o<n.length;o++){const e=n[o],r=n[(o+1)%n.length];t+=e[0]*r[1]-r[0]*e[1]}return t<=0}function L(n){const t=n[0],o=n[n.length-1];return t[0]===o[0]&&t[1]===o[1]&&t[2]===o[2]||n.push(t),n}function Z(n,t,o){switch(t.type){case"LineString":return H(n,t,o);case"MultiLineString":return U(n,t,o);case"MultiPoint":return q(n,t,o);case"MultiPolygon":return z(n,t,o);case"Point":return B(n,t,o);case"Polygon":return K(n,t,o)}}function H(n,t,o){return g(n,t.coordinates,o),n}function U(n,t,o){for(const e of t.coordinates)g(n,e,o);return n}function q(n,t,o){return g(n,t.coordinates,o),n}function z(n,t,o){for(const e of t.coordinates){O(n,e[0],o);for(let r=1;r<e.length;r++)I(n,e[r],o)}return n}function B(n,t,o){return b(n,t.coordinates,o),n}function K(n,t,o){const e=t.coordinates;O(n,e[0],o);for(let r=1;r<e.length;r++)I(n,e[r],o);return n}function O(n,t,o){const e=L(t);E(e)?N(n,e,o):g(n,e,o)}function I(n,t,o){const e=L(t);R(e)?N(n,e,o):g(n,e,o)}function g(n,t,o){for(const e of t)b(n,e,o);n.lengths.push(t.length)}function N(n,t,o){for(let e=t.length-1;e>=0;e--)b(n,t[e],o);n.lengths.push(t.length)}function b(n,t,o){const[e,r,s]=t;n.coords.push(e,r),o.hasZ&&n.coords.push(s||0)}function Q(n){switch(typeof n){case"string":return"esriFieldTypeString";case"number":return"esriFieldTypeDouble";default:return"unknown"}}function W(n){if(!n)throw new P("geojson-layer:empty","GeoJSON data is empty");if(n.type!=="Feature"&&n.type!=="FeatureCollection")throw new P("geojson-layer:unsupported-geojson-object","missing or not supported GeoJSON object type",{data:n});const{crs:t}=n;if(!t)return;const o=typeof t=="string"?t:t.type==="name"?t.properties.name:t.type==="EPSG"?t.properties.code:null,e=new RegExp(".*(CRS84H?|4326)$","i");if(!o||!e.test(o))throw new P("geojson-layer:unsupported-crs","unsupported GeoJSON 'crs' member",{crs:t})}function X(n,t={}){const o=[],e=new Set,r=new Set;let s,p=!1,i=null,l=!1,{geometryType:c=null}=t,m=!1;for(const d of M(n)){const{geometry:h,properties:u,id:a}=d;if((!h||(c||(c=S(h.type)),S(h.type)===c))&&(p||(p=D(x(h))),l||(l=a!=null,l&&(s=typeof a,u&&(i=Object.keys(u).filter(y=>u[y]===a)))),u&&i&&l&&a!=null&&(i.length>1?i=i.filter(y=>u[y]===a):i.length===1&&(i=u[i[0]]===a?i:[])),!m&&u)){let y=!0;for(const f in u){if(e.has(f))continue;const F=u[f];if(F==null){y=!1,r.add(f);continue}const j=Q(F);if(j==="unknown"){r.add(f);continue}r.delete(f),e.add(f);const k=G(f);k&&o.push({name:k,alias:f,type:j})}m=y}}const w=G((i==null?void 0:i.length)===1&&i[0]||null)??void 0;if(w){for(const d of o)if(d.name===w&&$(d)){d.type="esriFieldTypeOID";break}}return{fields:o,geometryType:c,hasZ:p,objectIdFieldName:w,objectIdFieldType:s,unknownFields:Array.from(r)}}function Y(n,t){return Array.from(A(M(n),t))}export{Y as I,X as L,W as T,S as s};

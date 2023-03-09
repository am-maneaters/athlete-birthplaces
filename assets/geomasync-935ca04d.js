import{dl as w,az as x,dA as N,aE as O,cb as b,dz as T,bg as U,aW as en,bt as rn}from"./index-5be327fa.js";import{u as s,B as h,U as B,r as D,J as A,V as F,d as J,w as P,G as Z,x as S,y as d,S as q,E as p,H as L,I as W,l as R,K as an,M as un,O as ln,P as H,b as j,Q as k,W as cn,X as M}from"./arcadeUtils-cf911842.js";import{A as fn,h as on,S as sn,m as dn,x as wn,p as hn,O as mn,g as yn,R as pn,D as gn,b as vn,E as Pn,k as In,y as An,w as Fn,W as K,K as V,F as z,M as E,d as Rn,C as G,U as Q,B as Nn,L as bn,P as xn,v as Sn,H as X,N as Y,J as On,j as Jn}from"./geometryEngineAsync-4476210c.js";import{t as u,e as l}from"./executionError-fb3f283a.js";import{t as _,s as $}from"./portalUtils-4f244af3.js";import"./arcadeTimeUtils-e22e7151.js";import"./number-4ce2490b.js";function nn(r){return en.indexOf("4.")===0?b.fromExtent(r):new b({spatialReference:r.spatialReference,rings:[[[r.xmin,r.ymin],[r.xmin,r.ymax],[r.xmax,r.ymax],[r.xmax,r.ymin],[r.xmin,r.ymin]]]})}function I(r,t,e){if(h(r,2,2,t,e),!(r[0]instanceof w&&r[1]instanceof w)){if(!(r[0]instanceof w&&r[1]===null)){if(!(r[1]instanceof w&&r[0]===null)){if(r[0]!==null||r[1]!==null)throw new u(t,l.InvalidParameter,e)}}}}async function tn(r,t){if(r.type!=="polygon"&&r.type!=="polyline"&&r.type!=="extent")return 0;let e=1;(r.spatialReference.vcsWkid||r.spatialReference.latestVcsWkid)&&(e=cn(r.spatialReference)/rn(r.spatialReference));let c=0;if(r.type==="polyline")for(const n of r.paths)for(let i=1;i<n.length;i++)c+=M(n[i],n[i-1],e);else if(r.type==="polygon")for(const n of r.rings){for(let i=1;i<n.length;i++)c+=M(n[i],n[i-1],e);(n[0][0]!==n[n.length-1][0]||n[0][1]!==n[n.length-1][1]||n[0][2]!==void 0&&n[0][2]!==n[n.length-1][2])&&(c+=M(n[0],n[n.length-1],e))}else r.type==="extent"&&(c+=2*M([r.xmin,r.ymin,0],[r.xmax,r.ymin,0],e),c+=2*M([r.xmin,r.ymin,0],[r.xmin,r.ymax,0],e),c*=2,c+=4*Math.abs(d(r.zmax,0)*e-d(r.zmin,0)*e));const o=new N({hasZ:!1,hasM:!1,spatialReference:r.spatialReference,paths:[[0,0],[0,c]]});return z(o,t)}function jn(r){r.mode==="async"&&(r.functions.disjoint=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]===null||n[1]===null||fn(n[0],n[1])))},r.functions.intersects=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&on(n[0],n[1])))},r.functions.touches=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&sn(n[0],n[1])))},r.functions.crosses=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&dn(n[0],n[1])))},r.functions.within=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&wn(n[0],n[1])))},r.functions.contains=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&hn(n[0],n[1])))},r.functions.overlaps=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]!==null&&mn(n[0],n[1])))},r.functions.equals=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(h(n,2,2,t,e),n[0]===n[1]||(n[0]instanceof w&&n[1]instanceof w?yn(n[0],n[1]):!(!B(n[0])||!B(n[1]))&&n[0].equals(n[1]))))},r.functions.relate=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,3,3,t,e),n[0]instanceof w&&n[1]instanceof w)return pn(n[0],n[1],D(n[2]));if(n[0]instanceof w&&n[1]===null||n[1]instanceof w&&n[0]===null||n[0]===null&&n[1]===null)return!1;throw new u(t,l.InvalidParameter,e)})},r.functions.intersection=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]===null||n[1]===null?null:gn(n[0],n[1])))},r.functions.union=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{const i=[];if((n=s(n)).length===0)throw new u(t,l.WrongNumberOfParameters,e);if(n.length===1)if(A(n[0])){const a=s(n[0]);for(let f=0;f<a.length;f++)if(a[f]!==null){if(!(a[f]instanceof w))throw new u(t,l.InvalidParameter,e);i.push(a[f])}}else{if(!F(n[0])){if(n[0]instanceof w)return J(P(n[0]),t.spatialReference);if(n[0]===null)return null;throw new u(t,l.InvalidParameter,e)}{const a=s(n[0].toArray());for(let f=0;f<a.length;f++)if(a[f]!==null){if(!(a[f]instanceof w))throw new u(t,l.InvalidParameter,e);i.push(a[f])}}}else for(let a=0;a<n.length;a++)if(n[a]!==null){if(!(n[a]instanceof w))throw new u(t,l.InvalidParameter,e);i.push(n[a])}return i.length===0?null:vn(i)})},r.functions.difference=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]!==null&&n[1]===null?P(n[0]):n[0]===null?null:Pn(n[0],n[1])))},r.functions.symmetricdifference=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>(I(n=s(n),t,e),n[0]===null&&n[1]===null?null:n[0]===null?P(n[1]):n[1]===null?P(n[0]):In(n[0],n[1])))},r.functions.clip=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,2,t,e),!(n[1]instanceof x)&&n[1]!==null)throw new u(t,l.InvalidParameter,e);if(n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return n[1]===null?null:An(n[0],n[1])})},r.functions.cut=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,2,t,e),!(n[1]instanceof N)&&n[1]!==null)throw new u(t,l.InvalidParameter,e);if(n[0]===null)return[];if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return n[1]===null?[P(n[0])]:Fn(n[0],n[1])})},r.functions.area=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{if(h(n,1,2,t,e),(n=s(n))[0]===null)return 0;if(Z(n[0])){const i=await n[0].sumArea(S(d(n[1],-1)),!1,t.abortSignal);if(t.abortSignal.aborted)throw new u(t,l.Cancelled,e);return i}if(A(n[0])||F(n[0])){const i=q(n[0],t.spatialReference);return i===null?0:K(i,S(d(n[1],-1)))}if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return K(n[0],S(d(n[1],-1)))})},r.functions.areageodetic=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{if(h(n,1,2,t,e),(n=s(n))[0]===null)return 0;if(Z(n[0])){const i=await n[0].sumArea(S(d(n[1],-1)),!0,t.abortSignal);if(t.abortSignal.aborted)throw new u(t,l.Cancelled,e);return i}if(A(n[0])||F(n[0])){const i=q(n[0],t.spatialReference);return i===null?0:V(i,S(d(n[1],-1)))}if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return V(n[0],S(d(n[1],-1)))})},r.functions.length=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{if(h(n,1,2,t,e),(n=s(n))[0]===null)return 0;if(Z(n[0])){const i=await n[0].sumLength(p(d(n[1],-1)),!1,t.abortSignal);if(t.abortSignal.aborted)throw new u(t,l.Cancelled,e);return i}if(A(n[0])||F(n[0])){const i=L(n[0],t.spatialReference);return i===null?0:z(i,p(d(n[1],-1)))}if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return z(n[0],p(d(n[1],-1)))})},r.functions.length3d=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(h(n,1,2,t,e),(n=s(n))[0]===null)return 0;if(A(n[0])||F(n[0])){const i=L(n[0],t.spatialReference);return i===null?0:i.hasZ===!0?tn(i,p(d(n[1],-1))):z(i,p(d(n[1],-1)))}if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return n[0].hasZ===!0?tn(n[0],p(d(n[1],-1))):z(n[0],p(d(n[1],-1)))})},r.functions.lengthgeodetic=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{if(h(n,1,2,t,e),(n=s(n))[0]===null)return 0;if(Z(n[0])){const i=await n[0].sumLength(p(d(n[1],-1)),!0,t.abortSignal);if(t.abortSignal.aborted)throw new u(t,l.Cancelled,e);return i}if(A(n[0])||F(n[0])){const i=L(n[0],t.spatialReference);return i===null?0:E(i,p(d(n[1],-1)))}if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return E(n[0],p(d(n[1],-1)))})},r.functions.distance=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{n=s(n),h(n,2,3,t,e);let i=n[0];(A(n[0])||F(n[0]))&&(i=W(n[0],t.spatialReference));let a=n[1];if((A(n[1])||F(n[1]))&&(a=W(n[1],t.spatialReference)),!(i instanceof w))throw new u(t,l.InvalidParameter,e);if(!(a instanceof w))throw new u(t,l.InvalidParameter,e);return Rn(i,a,p(d(n[2],-1)))})},r.functions.distancegeodetic=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{n=s(n),h(n,2,3,t,e);const i=n[0],a=n[1];if(!(i instanceof O))throw new u(t,l.InvalidParameter,e);if(!(a instanceof O))throw new u(t,l.InvalidParameter,e);const f=new N({paths:[],spatialReference:i.spatialReference});return f.addPath([i,a]),E(f,p(d(n[2],-1)))})},r.functions.densify=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,3,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);if(i<=0)throw new u(t,l.InvalidParameter,e);return n[0]instanceof b||n[0]instanceof N?G(n[0],i,p(d(n[2],-1))):n[0]instanceof x?G(nn(n[0]),i,p(d(n[2],-1))):n[0]})},r.functions.densifygeodetic=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,3,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);if(i<=0)throw new u(t,l.InvalidParameter,e);return n[0]instanceof b||n[0]instanceof N?Q(n[0],i,p(d(n[2],-1))):n[0]instanceof x?Q(nn(n[0]),i,p(d(n[2],-1))):n[0]})},r.functions.generalize=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,4,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);return Nn(n[0],i,an(d(n[2],!0)),p(d(n[3],-1)))})},r.functions.buffer=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,3,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);return i===0?P(n[0]):bn(n[0],i,p(d(n[2],-1)))})},r.functions.buffergeodetic=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,3,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);return i===0?P(n[0]):xn(n[0],i,p(d(n[2],-1)))})},r.functions.offset=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,2,6,t,e),n[0]===null)return null;if(!(n[0]instanceof b||n[0]instanceof N))throw new u(t,l.InvalidParameter,e);const i=R(n[1]);if(isNaN(i))throw new u(t,l.InvalidParameter,e);const a=R(d(n[4],10));if(isNaN(a))throw new u(t,l.InvalidParameter,e);const f=R(d(n[5],0));if(isNaN(f))throw new u(t,l.InvalidParameter,e);return Sn(n[0],i,p(d(n[2],-1)),D(d(n[3],"round")).toLowerCase(),a,f)})},r.functions.rotate=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{n=s(n),h(n,2,3,t,e);let i=n[0];if(i===null)return null;if(!(i instanceof w))throw new u(t,l.InvalidParameter,e);i instanceof x&&(i=b.fromExtent(i));const a=R(n[1]);if(isNaN(a))throw new u(t,l.InvalidParameter,e);const f=d(n[2],null);if(f===null)return X(i,a);if(f instanceof O)return X(i,a,f);throw new u(t,l.InvalidParameter,e)})},r.functions.centroid=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,1,1,t,e),n[0]===null)return null;let i=n[0];if((A(n[0])||F(n[0]))&&(i=W(n[0],t.spatialReference)),i===null)return null;if(!(i instanceof w))throw new u(t,l.InvalidParameter,e);return i instanceof O?J(P(n[0]),t.spatialReference):i instanceof b?i.centroid:i instanceof N?un(i):i instanceof T?ln(i):i instanceof x?i.center:null})},r.functions.multiparttosinglepart=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{n=s(n),h(n,1,1,t,e);const i=[];if(n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);if(n[0]instanceof O)return[J(P(n[0]),t.spatialReference)];if(n[0]instanceof x)return[J(P(n[0]),t.spatialReference)];const a=await Y(n[0]);if(a instanceof b){const f=[],y=[];for(let m=0;m<a.rings.length;m++)if(a.isClockwise(a.rings[m])){const g=U({rings:[a.rings[m]],hasZ:a.hasZ===!0,hazM:a.hasM===!0,spatialReference:a.spatialReference.toJSON()});f.push(g)}else y.push({ring:a.rings[m],pt:a.getPoint(m,0)});for(let m=0;m<y.length;m++)for(let g=0;g<f.length;g++)if(f[g].contains(y[m].pt)){f[g].addRing(y[m].ring);break}return f}if(a instanceof N){const f=[];for(let y=0;y<a.paths.length;y++){const m=U({paths:[a.paths[y]],hasZ:a.hasZ===!0,hazM:a.hasM===!0,spatialReference:a.spatialReference.toJSON()});f.push(m)}return f}if(n[0]instanceof T){const f=J(P(n[0]),t.spatialReference);for(let y=0;y<f.points.length;y++)i.push(f.getPoint(y));return i}return null})},r.functions.issimple=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,1,1,t,e),n[0]===null)return!0;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return On(n[0])})},r.functions.simplify=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,1,1,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return Y(n[0])})},r.functions.convexhull=function(t,e){return r.standardFunctionAsync(t,e,(c,o,n)=>{if(n=s(n),h(n,1,1,t,e),n[0]===null)return null;if(!(n[0]instanceof w))throw new u(t,l.InvalidParameter,e);return Jn(n[0])})},r.functions.getuser=function(t,e){return r.standardFunctionAsync(t,e,async(c,o,n)=>{h(n,0,2,t,e);let i=d(n[1],""),a=i===!0;if(i=i===!0||i===!1?"":D(i),n.length===0||n[0]instanceof H){let y=null;t.services&&t.services.portal&&(y=t.services.portal),n.length>0&&(y=_(n[0],y));const m=await $(y,i,a);if(m){const g=JSON.parse(JSON.stringify(m));for(const v of["lastLogin","created","modified"])g[v]!==void 0&&g[v]!==null&&(g[v]=new Date(g[v]));return j.convertObjectToArcadeDictionary(g,k(t))}return null}let f=null;if(Z(n[0])&&(f=n[0]),f){if(a=!1,i)return null;await f.load();const y=await f.getOwningSystemUrl();if(!y){if(!i){const v=await f.getIdentityUser();return v?j.convertObjectToArcadeDictionary({username:v},k(t)):null}return null}let m=null;t.services&&t.services.portal&&(m=t.services.portal),m=_(new H(y),m);const g=await $(m,i,a);if(g){const v=JSON.parse(JSON.stringify(g));for(const C of["lastLogin","created","modified"])v[C]!==void 0&&v[C]!==null&&(v[C]=new Date(v[C]));return j.convertObjectToArcadeDictionary(v,k(t))}return null}throw new u(t,l.InvalidParameter,e)})})}export{jn as registerFunctions};

import{hB as L}from"./index.js";import{t as O,n as C}from"./Indices.js";function F(f,n,e){const l=Array.isArray(f),r=l?f.length/n:f.byteLength/(4*n),g=l?f:new Uint32Array(f,0,r*n),s=(e==null?void 0:e.minReduction)??0,h=(e==null?void 0:e.originalIndices)||null,q=h?h.length:0,c=(e==null?void 0:e.componentOffsets)||null;let U=0;if(c)for(let t=0;t<c.length-1;t++){const a=c[t+1]-c[t];a>U&&(U=a)}else U=r;const m=Math.floor(1.1*U)+1;(y==null||y.length<2*m)&&(y=new Uint32Array(L(2*m)));for(let t=0;t<2*m;t++)y[t]=0;let i=0;const w=!!c&&!!h,b=w?q:r;let A=O(r/3);const p=new Uint32Array(q),k=1.96;let j=s!==0?Math.ceil(4*k*k/(s*s)*s*(1-s)):b,d=1,v=c?c[1]:b;for(let t=0;t<b;t++){if(t===j){const o=1-i/t;if(o+k*Math.sqrt(o*(1-o)/t)<s)return null;j*=2}if(t===v){for(let o=0;o<2*m;o++)y[o]=0;if(h)for(let o=c[d-1];o<c[d];o++)p[o]=A[h[o]];v=c[++d]}const a=w?h[t]:t,B=a*n,x=z(g,B,n);let u=x%m,I=i;for(;y[2*u+1]!==0;){if(y[2*u]===x){const o=y[2*u+1]-1;if(R(g,B,o*n,n)){I=A[o];break}}u++,u>=m&&(u-=m)}I===i&&(y[2*u]=x,y[2*u+1]=a+1,i++),A[a]=I}if(s!==0&&1-i/r<s)return null;if(w){for(let t=c[d-1];t<p.length;t++)p[t]=A[h[t]];A=C(p)}const M=l?new Array(i):new Uint32Array(i*n);i=0;for(let t=0;t<b;t++)A[t]===i&&($(g,(w?h[t]:t)*n,M,i*n,n),i++);if(h&&!w){const t=new Uint32Array(q);for(let a=0;a<t.length;a++)t[a]=A[h[a]];A=C(t)}return{buffer:Array.isArray(M)?M:M.buffer,indices:A,uniqueCount:i}}function R(f,n,e,l){for(let r=0;r<l;r++)if(f[n+r]!==f[e+r])return!1;return!0}function $(f,n,e,l,r){for(let g=0;g<r;g++)e[l+g]=f[n+g]}function z(f,n,e){let l=0;for(let r=0;r<e;r++)l=f[n+r]+l|0,l=l+(l<<11)+(l>>>2)|0;return l>>>0}let y=null;export{F as r};

import{fo as E,e4 as L,s as N,r as S,fs as w,dL as c,ft as d,fu as q,k5 as U,fq as k,fr as D,k6 as P,k7 as v,k8 as h,k9 as $,fp as C}from"./index-8fbc1f4a.js";import{c as F,a as g}from"./devEnvironmentUtils-5002a058.js";function z(e,t,a,s){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?R(e,t,s):E(e,t,s).then(n=>M(L(n),e.name,t,a,s)):Promise.reject(new N("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function M(e,t,a,s,n){var f;const u=e.data,m=a&&S(a.portal)?a.portal:w.getDefault(),b={portal:m,url:c(e.baseUrl),origin:"portal-item"},o=u.items.find(r=>r.name===t);if(!o){const r=`The symbol name '${t}' could not be found`;return Promise.reject(new N("symbolstyleutils:symbol-name-not-found",r,{symbolName:t}))}let i=d(q(o,s),b),y=((f=o.thumbnail)==null?void 0:f.href)??null;const p=o.thumbnail&&o.thumbnail.imageData;F()&&(i=g(i)??"",y=g(y));const j={portal:m,url:c(U(i)),origin:"portal-item"};return k(i,n).then(r=>{const O=s==="cimRef"?D(r.data):r.data,l=P(O,j);if(l&&v(l)){if(y){const x=d(y,b);l.thumbnail=new h({url:x})}else p&&(l.thumbnail=new h({url:`data:image/png;base64,${p}`}));e.styleUrl?l.styleOrigin=new $({portal:a.portal,styleUrl:e.styleUrl,name:t}):e.styleName&&(l.styleOrigin=new $({portal:a.portal,styleName:e.styleName,name:t}))}return l})}function R(e,t,a){const s=C.replace(/\{SymbolName\}/gi,e.name),n=S(t.portal)?t.portal:w.getDefault();return k(s,a).then(u=>{const m=D(u.data);return P(m,{portal:n,url:c(U(s)),origin:"portal-item"})})}export{M as fetchSymbolFromStyle,z as resolveWebStyleSymbol};
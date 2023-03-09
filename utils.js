import{r as E,w as t,dh as A,Q as D,di as x,dj as O,dk as w,s as C}from"./index.js";import{a as y,E as N,S as T}from"./color.js";import{U as F}from"./MaterialKey.js";class p{static getStorageSpec(e){return null}static createOrUpdateRendererSchema(e,a){return E(e)&&e.type==="default"?e:{type:"default"}}static getVariation(e){return{}}static getVariationHash(e){return 0}}p.type="default",p.programSpec=null;let g=class extends p{static getStorageSpec({attributes:e}){return{visualVariables:!1,attributes:e??null}}static _createRendererSchema(){return{type:"dot-density",colors:new Float32Array(32),dotValue:-1,dotSize:-1,dotScale:-1,dotBlending:!1,backgroundColor:new Float32Array(4),activeDots:new Float32Array(8),seed:-1}}static createOrUpdateRendererSchema(e,a){const{attributes:u,dotValue:m,referenceScale:h,dotSize:c,dotBlendingEnabled:l,seed:r,backgroundColor:d}=a,s=E(e)&&e.type==="dot-density"?e:this._createRendererSchema();s.dotValue=m,s.dotSize=c,s.dotScale=h,s.dotBlending=l,s.seed=r;const{colors:b,activeDots:S,backgroundColor:i}=s;for(let o=0;o<A;o++){const R=o>=u.length?null:u[o].color;y(b,R,4*o)}for(let o=0;o<8;o++)S[o]=o<a.attributes.length?1:0;return y(i,d),s}static getVariation(e){return{ddDotBlending:e.dotBlending}}static getVariationHash(e){return e.dotBlending?1:0}};g.type="dot-density",g.programSpec={shader:"materials/fill",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:t.SHORT},{location:1,name:"a_id",count:3,type:t.UNSIGNED_BYTE},{location:2,name:"a_bitset",count:1,type:t.UNSIGNED_BYTE},{location:3,name:"a_inverseArea",count:1,type:t.FLOAT}]}};class f extends p{static getStorageSpec({field:e,valueExpression:a}){return{visualVariables:!1,attributes:e||a?[{field:e,valueExpression:a}]:null}}static _createRendererSchema(){return{type:"heatmap",radius:-1,referenceScale:-1,isFieldActive:0,minDensity:-1,densityRange:-1,kernel:null,gradient:null,gradientHash:"invalid"}}static createOrUpdateRendererSchema(e,a){const{radius:u,minDensity:m,maxDensity:h,referenceScale:c,field:l,valueExpression:r,colorStops:d}=a,s=h-m,b=l||r?1:0,S=d.map(({color:R,ratio:v})=>`${v}:${R.toString()}`).join();let i,o=!0;return E(e)&&e.type==="heatmap"?(i=e,o=S!==e.gradientHash):i=this._createRendererSchema(),i.radius=D(u),i.minDensity=m,i.densityRange=s,i.referenceScale=c,i.isFieldActive=b,o&&(i.gradient=x(d),i.gradientHash=S),i}}f.type="heatmap",f.programSpec={shader:"materials/icon/heatmapAccumulate",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:t.SHORT},{location:1,name:"a_vertexOffset",count:2,type:t.SHORT},{location:4,name:"a_id",count:4,type:t.UNSIGNED_BYTE}]}};class _ extends p{static getStorageSpec({attributes:e}){return{visualVariables:!0,attributes:e??null}}static _createRendererSchema(){return{type:"pie-chart",colors:new Float32Array(4*O),defaultColor:new Float32Array(4),othersColor:new Float32Array(4),outlineColor:new Float32Array(4),holePercentage:0,sectorThreshold:0,outlineWidth:1,numberOfFields:10}}static createOrUpdateRendererSchema(e,a){const{attributes:u,defaultColor:m,holePercentage:h,othersCategory:c,outline:l}=a,r=E(e)&&e.type==="pie-chart"?e:this._createRendererSchema();for(let d=0;d<O;d++){const s=d>=u.length?new w([0,0,0,0]):u[d].color;y(r.colors,s,4*d)}return y(r.defaultColor,m),y(r.othersColor,c==null?void 0:c.color),y(r.outlineColor,l==null?void 0:l.color),r.outlineWidth=D((l==null?void 0:l.width)||0),r.holePercentage=h,r.sectorThreshold=(c==null?void 0:c.threshold)||0,r.numberOfFields=u.length,r}static getVariation(e){return{numberOfFields:e.numberOfFields}}static getVariationHash(e){return e.numberOfFields}}_.type="pie-chart",_.programSpec={shader:"materials/pie",vertexLayout:{geometry:[{location:0,name:"a_pos",count:2,type:t.SHORT},{location:1,name:"a_vertexOffset",count:2,type:t.SHORT},{location:2,name:"a_texCoords",count:2,type:t.UNSIGNED_SHORT},{location:3,name:"a_bitSetAndDistRatio",count:2,type:t.UNSIGNED_SHORT},{location:4,name:"a_id",count:4,type:t.UNSIGNED_BYTE},{location:5,name:"a_color",count:4,type:t.UNSIGNED_BYTE,normalized:!0},{location:6,name:"a_outlineColor",count:4,type:t.UNSIGNED_BYTE,normalized:!0},{location:7,name:"a_sizeAndOutlineWidth",count:4,type:t.UNSIGNED_BYTE},{location:8,name:"a_zoomRange",count:2,type:t.UNSIGNED_SHORT}]},hittestAttributes:["a_vertexOffset","a_texCoords"]};function V(n,e){if(n.type!==e)throw new C("material-view-model:unexpected-renderer-schema",`expected to find renderer schema of type "${e}" but found type "${n.type}"`)}function G(n){switch(n==null?void 0:n.type){case"dot-density":return g;case"heatmap":return f;case"pie-chart":return _;default:return p}}function Y(n){const{geometryType:e,symbologyType:a}=F.load(n);switch(e){case N.FILL:if(a===T.DOT_DENSITY)return g;break;case N.MARKER:switch(a){case T.HEATMAP:return f;case T.PIE_CHART:return _}}return p}export{G as c,p as e,Y as p,V as s};

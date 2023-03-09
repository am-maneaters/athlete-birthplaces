import{am as p,an as d,kI as xt,bl as wt,bk as vt,ao as Q,bi as xe,lB as He,bj as Te,dk as et,r as c,al as $,gg as k,cU as I,hC as $t,k2 as bt,m_ as N,c as M,dw as Oe,a2 as ue,aE as _,k5 as At,m$ as Tt,iO as Mt,dM as Rt,f as Ft,t as pe,s as Me,hz as _e,hH as tt,hO as nt,gw as he,hy as Ct,g as rt,hx as fe,jk as Lt,hG as Dt,n0 as ot,b_ as st,bW as It,jO as Ot,dn as _t,dl as Et,a6 as Pt,az as Re,cb as jt,b3 as ve,ap as St,aV as Nt,at as zt}from"./index.js";import{r as we,b as kt,x as Wt,M as Ee,j as Pe,a as je,R as Se,h as Ne,L as ze,_ as Ut,c as oe,v as Fe,g as Ce,d as Ht,e as le,f as ge}from"./georeference.js";import{r as Gt}from"./imageUtils2.js";import{r as Vt}from"./earcut.js";import{r as Ge}from"./deduplicate.js";import{e as ke}from"./mat3f64.js";import{e as at}from"./mat4f64.js";import{c as We}from"./spatialReferenceEllipsoidUtils.js";var Z;const $e=new WeakMap;let Bt=0,O=Z=class extends xe{constructor(e){super(e),this.wrap="repeat"}get url(){return this._get("url")||null}set url(e){this._set("url",e),e&&this._set("data",null)}get data(){return this._get("data")||null}set data(e){this._set("data",e),e&&this._set("url",null)}writeData(e,t,n,r){if(e instanceof HTMLImageElement){const o={type:"image-element",src:He(e.src,r),crossOrigin:e.crossOrigin};t[n]=o}else if(e instanceof HTMLCanvasElement){const o=e.getContext("2d").getImageData(0,0,e.width,e.height),s={type:"canvas-element",imageData:this._encodeImageData(o)};t[n]=s}else if(e instanceof HTMLVideoElement){const o={type:"video-element",src:He(e.src,r),autoplay:e.autoplay,loop:e.loop,muted:e.muted,crossOrigin:e.crossOrigin,preload:e.preload};t[n]=o}else if(e instanceof ImageData){const o={type:"image-data",imageData:this._encodeImageData(e)};t[n]=o}}readData(e){switch(e.type){case"image-element":{const t=new Image;return t.src=e.src,t.crossOrigin=e.crossOrigin,t}case"canvas-element":{const t=this._decodeImageData(e.imageData),n=document.createElement("canvas");return n.width=t.width,n.height=t.height,n.getContext("2d").putImageData(t,0,0),n}case"image-data":return this._decodeImageData(e.imageData);case"video-element":{const t=document.createElement("video");return t.src=e.src,t.crossOrigin=e.crossOrigin,t.autoplay=e.autoplay,t.loop=e.loop,t.muted=e.muted,t.preload=e.preload,t}default:return}}get transparent(){const e=this.data,t=this.url;if(e instanceof HTMLCanvasElement)return this._imageDataContainsTransparent(e.getContext("2d").getImageData(0,0,e.width,e.height));if(e instanceof ImageData)return this._imageDataContainsTransparent(e);if(t){const n=t.substr(t.length-4,4).toLowerCase(),r=t.substr(0,15).toLocaleLowerCase();if(n===".png"||r==="data:image/png;")return!0}return!1}set transparent(e){this._overrideIfSome("transparent",e)}get contentHash(){const e=typeof this.wrap=="string"?this.wrap:typeof this.wrap=="object"?`${this.wrap.horizontal}/${this.wrap.vertical}`:"",t=(n="")=>`d:${n},t:${this.transparent},w:${e}`;return this.url!=null?t(this.url):this.data!=null?this.data instanceof HTMLImageElement||this.data instanceof HTMLVideoElement?t(this.data.src):($e.has(this.data)||$e.set(this.data,++Bt),t($e.get(this.data))):t()}clone(){const e={url:this.url,data:this.data,wrap:this._cloneWrap()};return new Z(e)}cloneWithDeduplication(e){const t=e.get(this);if(t)return t;const n=this.clone();return e.set(this,n),n}_cloneWrap(){return typeof this.wrap=="string"?this.wrap:{horizontal:this.wrap.horizontal,vertical:this.wrap.vertical}}_encodeImageData(e){let t="";for(let n=0;n<e.data.length;n++)t+=String.fromCharCode(e.data[n]);return{data:btoa(t),width:e.width,height:e.height}}_decodeImageData(e){const t=atob(e.data),n=new Uint8ClampedArray(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return Gt(n,e.width,e.height)}_imageDataContainsTransparent(e){for(let t=3;t<e.data.length;t+=4)if(e.data[t]!==255)return!0;return!1}static from(e){return typeof e=="string"?new Z({url:e}):e instanceof HTMLImageElement||e instanceof HTMLCanvasElement||e instanceof ImageData||e instanceof HTMLVideoElement?new Z({data:e}):Te(Z,e)}};p([d({type:String,json:{write:xt}})],O.prototype,"url",null),p([d({json:{write:{overridePolicy(){return{enabled:!this.url}}}}}),d()],O.prototype,"data",null),p([wt("data")],O.prototype,"writeData",null),p([vt("data")],O.prototype,"readData",null),p([d({type:Boolean,json:{write:{overridePolicy(){return{enabled:this._isOverridden("transparent")}}}}})],O.prototype,"transparent",null),p([d({json:{write:!0}})],O.prototype,"wrap",void 0),p([d({readOnly:!0})],O.prototype,"contentHash",null),O=Z=p([Q("esri.geometry.support.MeshTexture")],O);const re=O;var Le;let L=Le=class extends xe{constructor(e){super(e),this.color=null,this.colorTexture=null,this.normalTexture=null,this.alphaMode="auto",this.alphaCutoff=.5,this.doubleSided=!0}clone(){return this.cloneWithDeduplication(null,new Map)}cloneWithDeduplication(e,t){const n=c(e)?e.get(this):null;if(n)return n;const r=new Le(this.clonePropertiesWithDeduplication(t));return c(e)&&e.set(this,r),r}clonePropertiesWithDeduplication(e){return{color:c(this.color)?this.color.clone():null,colorTexture:c(this.colorTexture)?this.colorTexture.cloneWithDeduplication(e):null,normalTexture:c(this.normalTexture)?this.normalTexture.cloneWithDeduplication(e):null,alphaMode:this.alphaMode,alphaCutoff:this.alphaCutoff,doubleSided:this.doubleSided,colorTextureTransform:c(this.colorTextureTransform)?this.colorTextureTransform:null,normalTextureTransform:c(this.normalTextureTransform)?this.normalTextureTransform:null}}};p([d({type:et,json:{write:!0}})],L.prototype,"color",void 0),p([d({type:re,json:{write:!0}})],L.prototype,"colorTexture",void 0),p([d({type:re,json:{write:!0}})],L.prototype,"normalTexture",void 0),p([d({nonNullable:!0,json:{write:!0}})],L.prototype,"alphaMode",void 0),p([d({nonNullable:!0,json:{write:!0}})],L.prototype,"alphaCutoff",void 0),p([d({nonNullable:!0,json:{write:!0}})],L.prototype,"doubleSided",void 0),p([d()],L.prototype,"colorTextureTransform",void 0),p([d()],L.prototype,"normalTextureTransform",void 0),L=Le=p([Q("esri.geometry.support.MeshMaterial")],L);const Ue=L;var De;let C=De=class extends Ue{constructor(e){super(e),this.emissiveColor=null,this.emissiveTexture=null,this.occlusionTexture=null,this.metallic=1,this.roughness=1,this.metallicRoughnessTexture=null}clone(){return this.cloneWithDeduplication(null,new Map)}cloneWithDeduplication(e,t){const n=c(e)?e.get(this):null;if(n)return n;const r=new De(this.clonePropertiesWithDeduplication(t));return c(e)&&e.set(this,r),r}clonePropertiesWithDeduplication(e){return{...super.clonePropertiesWithDeduplication(e),emissiveColor:c(this.emissiveColor)?this.emissiveColor.clone():null,emissiveTexture:c(this.emissiveTexture)?this.emissiveTexture.cloneWithDeduplication(e):null,occlusionTexture:c(this.occlusionTexture)?this.occlusionTexture.cloneWithDeduplication(e):null,metallic:this.metallic,roughness:this.roughness,metallicRoughnessTexture:c(this.metallicRoughnessTexture)?this.metallicRoughnessTexture.cloneWithDeduplication(e):null,occlusionTextureTransform:c(this.occlusionTextureTransform)?this.occlusionTextureTransform:null,emissiveTextureTransform:c(this.emissiveTextureTransform)?this.emissiveTextureTransform:null,metallicRoughnessTextureTransform:c(this.metallicRoughnessTextureTransform)?this.metallicRoughnessTextureTransform:null}}};p([d({type:et,json:{write:!0}})],C.prototype,"emissiveColor",void 0),p([d({type:re,json:{write:!0}})],C.prototype,"emissiveTexture",void 0),p([d({type:re,json:{write:!0}})],C.prototype,"occlusionTexture",void 0),p([d({type:Number,nonNullable:!0,json:{write:!0},range:{min:0,max:1}})],C.prototype,"metallic",void 0),p([d({type:Number,nonNullable:!0,json:{write:!0},range:{min:0,max:1}})],C.prototype,"roughness",void 0),p([d({type:re,json:{write:!0}})],C.prototype,"metallicRoughnessTexture",void 0),p([d()],C.prototype,"occlusionTextureTransform",void 0),p([d()],C.prototype,"emissiveTextureTransform",void 0),p([d()],C.prototype,"metallicRoughnessTextureTransform",void 0),C=De=p([Q("esri.geometry.support.MeshMaterialMetallicRoughness")],C);const Zt=C;var ce;const it="esri.geometry.support.MeshVertexAttributes",U=$.getLogger(it);let T=ce=class extends xe{constructor(e){super(e),this.color=null,this.position=new Float64Array(0),this.uv=null,this.normal=null,this.tangent=null}castColor(e){return J(e,Uint8Array,[Uint8ClampedArray],{loggerTag:".color=",stride:4},U)}castPosition(e){return e&&e instanceof Float32Array&&U.warn(".position=","Setting position attribute from a Float32Array may cause precision problems. Consider storing data in a Float64Array or a regular number array"),J(e,Float64Array,[Float32Array],{loggerTag:".position=",stride:3},U)}castUv(e){return J(e,Float32Array,[Float64Array],{loggerTag:".uv=",stride:2},U)}castNormal(e){return J(e,Float32Array,[Float64Array],{loggerTag:".normal=",stride:3},U)}castTangent(e){return J(e,Float32Array,[Float64Array],{loggerTag:".tangent=",stride:4},U)}clone(){const e={position:I(this.position),uv:I(this.uv),normal:I(this.normal),tangent:I(this.tangent),color:I(this.color)};return new ce(e)}clonePositional(){const e={position:I(this.position),normal:I(this.normal),tangent:I(this.tangent),uv:this.uv,color:this.color};return new ce(e)}};function be(e,t,n,r){const{loggerTag:o,stride:s}=t;return e.length%s!=0?(r.error(o,`Invalid array length, expected a multiple of ${s}`),new n([])):e}function J(e,t,n,r,o){if(!e)return e;if(e instanceof t)return be(e,r,t,o);for(const s of n)if(e instanceof s)return be(new t(e),r,t,o);if(Array.isArray(e))return be(new t(e),r,t,o);{const s=n.map(a=>`'${a.name}'`);return o.error(`Failed to set property, expected one of ${s}, but got ${e.constructor.name}`),new t([])}}function ee(e,t,n){t[n]=Jt(e)}function Jt(e){const t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=e[n];return t}p([d({json:{write:ee}})],T.prototype,"color",void 0),p([k("color")],T.prototype,"castColor",null),p([d({nonNullable:!0,json:{write:ee}})],T.prototype,"position",void 0),p([k("position")],T.prototype,"castPosition",null),p([d({json:{write:ee}})],T.prototype,"uv",void 0),p([k("uv")],T.prototype,"castUv",null),p([d({json:{write:ee}})],T.prototype,"normal",void 0),p([k("normal")],T.prototype,"castNormal",null),p([d({json:{write:ee}})],T.prototype,"tangent",void 0),p([k("tangent")],T.prototype,"castTangent",null),T=ce=p([Q(it)],T);var ne;const lt="esri.geometry.support.MeshComponent",Xt=$.getLogger(lt);let E=ne=class extends xe{static from(e){return Te(ne,e)}constructor(e){super(e),this.faces=null,this.material=null,this.shading="source",this.trustSourceNormals=!1}castFaces(e){return J(e,Uint32Array,[Uint16Array],{loggerTag:".faces=",stride:3},Xt)}castMaterial(e){return Te(e&&typeof e=="object"&&("metallic"in e||"roughness"in e||"metallicRoughnessTexture"in e)?Zt:Ue,e)}clone(){return new ne({faces:I(this.faces),shading:this.shading,material:I(this.material),trustSourceNormals:this.trustSourceNormals})}cloneWithDeduplication(e,t){const n={faces:I(this.faces),shading:this.shading,material:this.material?this.material.cloneWithDeduplication(e,t):null,trustSourceNormals:this.trustSourceNormals};return new ne(n)}};p([d({json:{write:!0}})],E.prototype,"faces",void 0),p([k("faces")],E.prototype,"castFaces",null),p([d({type:Ue,json:{write:!0}})],E.prototype,"material",void 0),p([k("material")],E.prototype,"castMaterial",null),p([d({type:String,json:{write:!0}})],E.prototype,"shading",void 0),p([d({type:Boolean})],E.prototype,"trustSourceNormals",void 0),E=ne=p([Q(lt)],E);const K=E;function ct(e,t=!1){return e<=$t?t?new Array(e).fill(0):new Array(e):new Float64Array(e)}function Yt(e,t,n){return Array.isArray(e)?e.slice(t,t+n):e.subarray(t,t+n)}function qt(e){const t=Qt(e.rings,e.hasZ,me.CCW_IS_HOLE),n=new Array;let r=0,o=0;for(const i of t.polygons){const l=i.count,u=i.index,h=Yt(t.position,3*u,3*l),m=i.holeIndices.map(g=>g-u),f=new Uint32Array(Vt(h,m,3));n.push({position:h,faces:f}),r+=h.length,o+=f.length}const s=Kt(n,r,o),a=Array.isArray(s.position)?Ge(s.position,3,{originalIndices:s.faces}):Ge(s.position.buffer,6,{originalIndices:s.faces});return s.position=new Float64Array(a.buffer),s.faces=a.indices,s}function Kt(e,t,n){if(e.length===1)return e[0];const r=ct(t),o=new Uint32Array(n);let s=0,a=0,i=0;for(const l of e){for(let u=0;u<l.position.length;u++)r[s++]=l.position[u];for(let u=0;u<l.faces.length;u++)o[a++]=l.faces[u]+i;i=s/3}return{position:r,faces:o}}function Qt(e,t,n){const r=e.length,o=new Array(r),s=new Array(r),a=new Array(r);let i=0,l=0,u=0,h=0;for(let g=0;g<r;++g)h+=e[g].length;const m=ct(3*h);let f=0;for(let g=r-1;g>=0;g--){const y=e[g],F=n===me.CCW_IS_HOLE&&en(y);if(F&&r!==1)o[i++]=y;else{let v=y.length;for(let x=0;x<i;++x)v+=o[x].length;const b={index:f,pathLengths:new Array(i+1),count:v,holeIndices:new Array(i)};b.pathLengths[0]=y.length,y.length>0&&(a[u++]={index:f,count:y.length}),f=F?se(y,y.length-1,-1,m,f,y.length,t):se(y,0,1,m,f,y.length,t);for(let x=0;x<i;++x){const A=o[x];b.holeIndices[x]=f,b.pathLengths[x+1]=A.length,A.length>0&&(a[u++]={index:f,count:A.length}),f=se(A,0,1,m,f,A.length,t)}i=0,b.count>0&&(s[l++]=b)}}for(let g=0;g<i;++g){const y=o[g];y.length>0&&(a[u++]={index:f,count:y.length}),f=se(y,0,1,m,f,y.length,t)}return s.length=l,a.length=u,{position:m,polygons:s,outlines:a}}function se(e,t,n,r,o,s,a){o*=3;for(let i=0;i<s;++i){const l=e[t];r[o++]=l[0],r[o++]=l[1],r[o++]=a?l[2]:0,t+=n}return o/3}function en(e){return!bt(e,!1,!1)}var me;(function(e){e[e.NONE=0]="NONE",e[e.CCW_IS_HOLE=1]="CCW_IS_HOLE"})(me||(me={}));const Ie=$.getLogger("esri.geometry.support.meshUtils.centerAt");function tn(e,t,n){if(!e.vertexAttributes||!e.vertexAttributes.position)return;const r=(n==null?void 0:n.origin)??e.origin;c(e.transform)?((n==null?void 0:n.geographic)!=null&&n.geographic!==e.transform.geographic&&Ie.warn(`Specifying the 'geographic' parameter (${n.geographic}) different from the Mesh transform setting (${e.transform.geographic}) is not supported`),nn(e.transform,t,r)):we(e.spatialReference,n)?rn(e,t,r):on(e,t,r)}function nn(e,t,n){const r=t.x-n.x,o=t.y-n.y,s=t.hasZ&&n.hasZ?t.z-n.z:0,a=e.origin;e.origin=[a[0]+r,a[1]+o,a[2]+s]}function rn(e,t,n){const r=kt(e.vertexAttributes,n,{geographic:!0}),{position:o,normal:s,tangent:a}=Wt(r,t,{geographic:!0});e.vertexAttributes.position=o,e.vertexAttributes.normal=s,e.vertexAttributes.tangent=a,e.vertexAttributesChanged()}function on(e,t,n){const r=ln,o=an;if(N(t,o,e.spatialReference)){if(!N(n,r,e.spatialReference)){const s=e.origin;r[0]=s.x,r[1]=s.y,r[2]=s.z,Ie.error(`Failed to project specified origin (wkid:${n.spatialReference.wkid}) to mesh spatial reference (wkid:${e.spatialReference.wkid}).`)}sn(e.vertexAttributes.position,o,r),e.vertexAttributesChanged()}else Ie.error(`Failed to project centerAt location (wkid:${t.spatialReference.wkid}) to mesh spatial reference (wkid:${e.spatialReference.wkid})`)}function sn(e,t,n){if(e)for(let r=0;r<e.length;r+=3)for(let o=0;o<3;o++)e[r+o]+=t[o]-n[o]}const an=M(),ln=M();async function cn(e,t,n){const{loadGLTFMesh:r}=await Oe(ue(()=>import("./loadGLTFMesh.js"),["loadGLTFMesh.js","index.js","assets/index-cac073d9.css","mat3f64.js","BufferView.js","vec33.js","DefaultMaterial_COLOR_GAMMA.js","types.js","mat4f64.js","Version.js","quat.js","quatf64.js","resourceUtils2.js","basicInterfaces.js","Indices.js","georeference.js","spatialReferenceEllipsoidUtils.js","imageUtils2.js","earcut.js","deduplicate.js"]),n),o=await ut(t,n),s=r(new _({x:0,y:0,z:0,spatialReference:e.spatialReference}),o.url,{resolveFile:un(o),useTransform:!0,signal:c(n)?n.signal:null});s.then(()=>o.dispose(),()=>o.dispose());const{vertexAttributes:a,components:i}=await s;e.vertexAttributes=a,e.components=i}function un(e){const t=At(e.url);return n=>{const r=Tt(n,t,t),o=r?r.replace(/^ *\.\//,""):null;return(o?e.files.get(o):null)??n}}async function ut(e,t){return e instanceof Blob?de.fromBlob(e):typeof e=="string"?new de(e):Array.isArray(e)?pn(e,t):hn(e,t)}async function pn(e,t){const n=new Map;let r=null;const o=await Mt(e.map(async a=>({name:a.name,source:await ut(a instanceof Blob?a:a.source,t)}))),s=[];for(const a of o)a&&(Rt(t)?a.source.dispose():s.push(a));Ft(t);for(const{name:a,source:i}of s)(pe(r)||/\.(gltf|glb)/i.test(a))&&(r=i.url),n.set(a,i.url),i.files&&i.files.forEach((l,u)=>n.set(u,l));if(pe(r))throw new Me("mesh-load-external:missing-files","Missing files to load external mesh source");return new de(r,()=>s.forEach(({source:a})=>a.dispose()),n)}async function hn(e,t){const{default:n}=await Oe(ue(()=>import("./index.js").then(o=>o.nv),["index.js","assets/index-cac073d9.css"]),t),r=typeof e.multipart[0]=="string"?await Promise.all(e.multipart.map(async o=>(await n(o,{responseType:"array-buffer"})).data)):e.multipart;return de.fromBlob(new Blob(r))}let de=class pt{constructor(t,n=()=>{},r=new Map){this.url=t,this.dispose=n,this.files=r}static fromBlob(t){const n=URL.createObjectURL(t);return new pt(n,()=>URL.revokeObjectURL(n))}};function fn(e,t,n){e.vertexAttributes&&e.vertexAttributes.position&&(c(e.transform)?((n==null?void 0:n.geographic)!=null&&n.geographic!==e.transform.geographic&&$.getLogger("esri.geometry.support.meshUtils.offset").warn(`Specifying the 'geographic' parameter (${n.geographic}) different from the Mesh transform setting (${e.transform.geographic}) is not supported`),gn(e.transform,t)):we(e.spatialReference,n)?mn(e,t):dn(e,t))}function gn(e,t){const n=e.origin;e.origin=_e(M(),n,t)}function mn(e,t){const n=e.spatialReference,r=e.vertexAttributes.position,o=e.vertexAttributes.normal,s=e.vertexAttributes.tangent,a=new Float64Array(r.length),i=c(o)?new Float32Array(o.length):null,l=c(s)?new Float32Array(s.length):null,u=e.extent.center,h=yn;tt(n,[u.x,u.y,u.z],Ve,We(n)),nt(Be,Ve),he(h,t,Be),Ee(r,n,a),c(o)&&c(i)&&Pe(o,r,a,n,i),c(s)&&c(l)&&je(s,r,a,n,l),ht(a,h),Se(a,r,n),c(o)&&c(i)&&Ne(i,r,a,n,o),c(s)&&c(l)&&ze(l,r,a,n,s),e.vertexAttributesChanged()}function dn(e,t){ht(e.vertexAttributes.position,t),e.vertexAttributesChanged()}function ht(e,t){if(e)for(let n=0;n<e.length;n+=3)for(let r=0;r<3;r++)e[n+r]+=t[r]}const yn=M(),Ve=at(),Be=ke();function xn(){const{faceDescriptions:e,faceVertexOffsets:t,uvScales:n}=Rn,r=4*e.length,o=new Float64Array(3*r),s=new Float32Array(3*r),a=new Float32Array(2*r),i=new Uint32Array(2*e.length*3);let l=0,u=0,h=0,m=0;for(let f=0;f<e.length;f++){const g=e[f],y=l/3;for(const v of t)i[m++]=y+v;const F=g.corners;for(let v=0;v<4;v++){const b=F[v];let x=0;a[h++]=.25*n[v][0]+g.uvOrigin[0],a[h++]=g.uvOrigin[1]-.25*n[v][1];for(let A=0;A<3;A++)g.axis[A]!==0?(o[l++]=.5*g.axis[A],s[u++]=g.axis[A]):(o[l++]=.5*b[x++],s[u++]=0)}}return{position:o,normal:s,uv:a,faces:i}}function wn(e,t){const n=e.components[0],r=n.faces,o=Fn[t],s=6*o,a=new Array(6),i=new Array(r.length-6);let l=0,u=0;for(let h=0;h<r.length;h++)h>=s&&h<s+6?a[l++]=r[h]:i[u++]=r[h];if(c(e.vertexAttributes.uv)){const h=new Float32Array(e.vertexAttributes.uv),m=4*o*2,f=[0,1,1,1,1,0,0,0];for(let g=0;g<f.length;g++)h[m+g]=f[g];e.vertexAttributes.uv=h}return e.components=[new K({faces:a,material:n.material}),new K({faces:i})],e}function vn(e=0){const t=Math.round(8*2**e),n=2*t,r=(t-1)*(n+1)+2*n,o=new Float64Array(3*r),s=new Float32Array(3*r),a=new Float32Array(2*r),i=new Uint32Array(3*((t-1)*n*2));let l=0,u=0,h=0,m=0;for(let f=0;f<=t;f++){const g=f/t*Math.PI+.5*Math.PI,y=Math.cos(g),F=Math.sin(g);w[2]=F;const v=f===0||f===t,b=v?n-1:n;for(let x=0;x<=b;x++){const A=x/b*2*Math.PI;w[0]=-Math.sin(A)*y,w[1]=Math.cos(A)*y;for(let P=0;P<3;P++)o[l]=.5*w[P],s[l]=w[P],++l;a[u++]=(x+(v?.5:0))/n,a[u++]=f/t,f!==0&&x!==n&&(f!==t&&(i[h++]=m,i[h++]=m+1,i[h++]=m-n),f!==1&&(i[h++]=m,i[h++]=m-n,i[h++]=m-n-1)),m++}}return{position:o,normal:s,uv:a,faces:i}}function $n(e=0){const n=Math.round(16*2**e),r=(5-1)*(n+1)+2*n,o=new Float64Array(3*r),s=new Float32Array(3*r),a=new Float32Array(2*r),i=new Uint32Array(3*(4*n));let l=0,u=0,h=0,m=0,f=0;for(let g=0;g<=5;g++){const y=g===0||g===5,F=g<=1||g>=5-1,v=g===2||g===4,b=y?n-1:n;for(let x=0;x<=b;x++){const A=x/b*2*Math.PI,P=y?0:.5;w[0]=P*Math.sin(A),w[1]=P*-Math.cos(A),w[2]=g<=2?.5:-.5;for(let W=0;W<3;W++)o[l++]=w[W],s[u++]=F?W===2?g<=1?1:-1:0:W===2?0:w[W]/P;a[h++]=(x+(y?.5:0))/n,a[h++]=g<=1?1*g/3:g<=3?1*(g-2)/3+1/3:1*(g-4)/3+2/3,v||g===0||x===n||(g!==5&&(i[m++]=f,i[m++]=f+1,i[m++]=f-n),g!==1&&(i[m++]=f,i[m++]=f-n,i[m++]=f-n-1)),f++}}return{position:o,normal:s,uv:a,faces:i}}function bn(e,t){const n=typeof t=="number"?t:t!=null?t.width:1,r=typeof t=="number"?t:t!=null?t.height:1;switch(e){case"up":case"down":return{width:n,depth:r};case"north":case"south":return{width:n,height:r};case"east":case"west":return{depth:n,height:r}}}function An(e){const t=te.facingAxisOrderSwap[e],n=te.position,r=te.normal,o=new Float64Array(n.length),s=new Float32Array(r.length);let a=0;for(let i=0;i<4;i++){const l=a;for(let u=0;u<3;u++){const h=t[u],m=Math.abs(h)-1,f=h>=0?1:-1;o[a]=n[l+m]*f,s[a]=r[l+m]*f,a++}}return{position:o,normal:s,uv:new Float32Array(te.uv),faces:new Uint32Array(te.faces),isPlane:!0}}const H=1,G=2,V=3,te={position:[-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],normal:[0,0,1,0,0,1,0,0,1,0,0,1],uv:[0,1,1,1,1,0,0,0],faces:[0,1,2,0,2,3],facingAxisOrderSwap:{east:[V,H,G],west:[-V,-H,G],north:[-H,V,G],south:[H,-V,G],up:[H,G,V],down:[H,-G,-V]}};function ae(e,t,n){e.isPlane||Tn(e),Mn(e,n==null?void 0:n.size);const{vertexAttributes:r,transform:o}=Ut(e,t,n);return{vertexAttributes:new T({...r,uv:e.uv}),transform:o,components:[new K({faces:e.faces,material:n&&n.material||null})],spatialReference:t.spatialReference}}function Tn(e){for(let t=0;t<e.position.length;t+=3)e.position[t+2]+=.5}function Mn(e,t){if(t==null)return;const n=typeof t=="number"?[t,t,t]:[t.width!=null?t.width:1,t.depth!=null?t.depth:1,t.height!=null?t.height:1];j[0]=n[0],j[4]=n[1],j[8]=n[2];for(let r=0;r<e.position.length;r+=3){for(let o=0;o<3;o++)w[o]=e.position[r+o];he(w,w,j);for(let o=0;o<3;o++)e.position[r+o]=w[o]}if(n[0]!==n[1]||n[1]!==n[2]){j[0]=1/n[0],j[4]=1/n[1],j[8]=1/n[2];for(let r=0;r<e.normal.length;r+=3){for(let o=0;o<3;o++)w[o]=e.normal[r+o];he(w,w,j),Ct(w,w);for(let o=0;o<3;o++)e.normal[r+o]=w[o]}}}const Rn={faceDescriptions:[{axis:[0,-1,0],uvOrigin:[0,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[1,0,0],uvOrigin:[.25,.625],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,1,0],uvOrigin:[.5,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[-1,0,0],uvOrigin:[.75,.625],corners:[[1,-1],[-1,-1],[-1,1],[1,1]]},{axis:[0,0,1],uvOrigin:[0,.375],corners:[[-1,-1],[1,-1],[1,1],[-1,1]]},{axis:[0,0,-1],uvOrigin:[0,.875],corners:[[-1,1],[1,1],[1,-1],[-1,-1]]}],uvScales:[[0,0],[1,0],[1,1],[0,1]],faceVertexOffsets:[0,1,2,0,2,3]},Fn={south:0,east:1,north:2,west:3,up:4,down:5},w=M(),j=ke(),ft=$.getLogger("esri.geometry.support.meshUtils.rotate");function Cn(e,t,n){if(!e.vertexAttributes||!e.vertexAttributes.position||t[3]===0)return;const r=e.spatialReference;if(c(e.transform)){(n==null?void 0:n.geographic)!=null&&n.geographic!==e.transform.geographic&&ft.warn(`Specifying the 'geographic' parameter (${n.geographic}) different from the Mesh transform setting (${e.transform.geographic}) is not supported`);const o=(n==null?void 0:n.origin)??e.transform.getOriginPoint(r);Ln(e.transform,t,o)}else{const o=(n==null?void 0:n.origin)??e.origin;we(e.spatialReference,n)?Dn(e,t,o):In(e,t,o)}}function Ln(e,t,n){const r=rt(X,n.x,n.y,n.z),o=fe(X,r,e.origin);e.applyLocalInverse(o,Ze),e.rotation=Fe(e.rotation,t,oe()),e.applyLocalInverse(o,o),fe(o,o,Ze),e.translation=_e(M(),e.translation,o)}function Dn(e,t,n){const r=e.spatialReference,o=We(r),s=gt;N(n,s,o)||N(e.origin,s,o);const a=e.vertexAttributes.position,i=e.vertexAttributes.normal,l=e.vertexAttributes.tangent,u=new Float64Array(a.length),h=c(i)?new Float32Array(i.length):null,m=c(l)?new Float32Array(l.length):null;tt(o,s,ye,o),nt(Xe,ye);const f=Je;he(Ce(Je),Ce(t),Xe),f[3]=t[3],Ee(a,r,u),c(i)&&c(h)&&Pe(i,a,u,r,h),c(l)&&c(m)&&je(l,a,u,r,m),q(u,f,3,s),Se(u,a,r),c(i)&&c(h)&&(q(h,f,3),Ne(h,a,u,r,i)),c(l)&&c(m)&&(q(m,f,4),ze(m,a,u,r,l)),e.vertexAttributesChanged()}function In(e,t,n){const r=gt;if(!N(n,r,e.spatialReference)){const o=e.origin;r[0]=o.x,r[1]=o.y,r[2]=o.z,ft.error(`Failed to project specified origin (wkid:${n.spatialReference.wkid}) to mesh spatial reference (wkid:${e.spatialReference.wkid}).`)}q(e.vertexAttributes.position,t,3,r),q(e.vertexAttributes.normal,t,3),q(e.vertexAttributes.tangent,t,4),e.vertexAttributesChanged()}function q(e,t,n,r=ot){if(!pe(e)){Lt(ye,Ht(t),Ce(t));for(let o=0;o<e.length;o+=n){for(let s=0;s<3;s++)X[s]=e[o+s]-r[s];Dt(X,X,ye);for(let s=0;s<3;s++)e[o+s]=X[s]+r[s]}}}const X=M(),Ze=M(),Je=oe(),ye=at(),Xe=ke(),gt=M(),mt=$.getLogger("esri.geometry.support.meshUtils.scale");function On(e,t,n){if(!e.vertexAttributes||!e.vertexAttributes.position)return;const r=e.spatialReference;if(c(e.transform)){(n==null?void 0:n.geographic)!=null&&n.geographic!==e.transform.geographic&&mt.warn(`Specifying the 'geographic' parameter (${n.geographic}) different from the Mesh transform setting (${e.transform.geographic}) is not supported`);const o=(n==null?void 0:n.origin)??e.transform.getOriginPoint(r);_n(e.transform,t,o)}else{const o=we(e.spatialReference,n),s=n&&n.origin||e.origin;o?En(e,t,s):Pn(e,t,s)}}function _n(e,t,n){const r=rt(Y,n.x,n.y,n.z),o=fe(Y,r,e.origin);e.applyLocalInverse(o,Ye);const s=st(M(),e.scale,t);e.scale=s,e.applyLocalInverse(o,o),fe(o,o,Ye),e.translation=_e(M(),e.translation,o)}function En(e,t,n){const r=e.spatialReference,o=We(r),s=yt;N(n,s,o)||N(e.origin,s,o);const a=e.vertexAttributes.position,i=e.vertexAttributes.normal,l=e.vertexAttributes.tangent,u=new Float64Array(a.length),h=c(i)?new Float32Array(i.length):null,m=c(l)?new Float32Array(l.length):null;Ee(a,r,u),c(i)&&c(h)&&Pe(i,a,u,r,h),c(l)&&c(m)&&je(l,a,u,r,m),dt(u,t,s),Se(u,a,r),c(i)&&c(h)&&Ne(h,a,u,r,i),c(l)&&c(m)&&ze(m,a,u,r,l),e.vertexAttributesChanged()}function Pn(e,t,n){const r=yt;if(!N(n,r,e.spatialReference)){const o=e.origin;r[0]=o.x,r[1]=o.y,r[2]=o.z,mt.error(`Failed to project specified origin (wkid:${n.spatialReference.wkid}) to mesh spatial reference (wkid:${e.spatialReference.wkid}).`)}dt(e.vertexAttributes.position,t,r),e.vertexAttributesChanged()}function dt(e,t,n=ot){if(e)for(let r=0;r<e.length;r+=3){for(let o=0;o<3;o++)Y[o]=e[r+o]-n[o];st(Y,Y,t);for(let o=0;o<3;o++)e[r+o]=Y[o]+n[o]}}const Y=M(),Ye=M(),yt=M();var D;const z="esri.geometry.Mesh";let R=D=class extends It(Ot.LoadableMixin(_t(Et))){constructor(e){super(e),this.components=null,this.transform=null,this.external=null,this.hasZ=!0,this.hasM=!1,this.vertexAttributes=new T,this.type="mesh"}initialize(){(pe(this.external)||this.vertexAttributes.position.length)&&(this.loadStatus="loaded"),this.when(()=>{this.handles.add(Pt(()=>{var e;return{vertexAttributes:this.vertexAttributes,components:(e=this.components)==null?void 0:e.map(t=>t.clone())}},()=>this._set("external",null),{once:!0,sync:!0}))})}get hasExtent(){return!this.loaded&&c(this.external)&&c(this.external.extent)||this.loaded&&this.vertexAttributes.position.length>0&&(!this.components||this.components.length>0)}get _boundingInfo(){const e=this.vertexAttributes.position,t=this.spatialReference;if(e.length===0||this.components&&this.components.length===0)return{extent:new Re({xmin:0,ymin:0,zmin:0,xmax:0,ymax:0,zmax:0,spatialReference:t}),center:new _({x:0,y:0,z:0,spatialReference:t})};const n=c(this.transform)?this.transform.project(e,t):e;let r=1/0,o=1/0,s=1/0,a=-1/0,i=-1/0,l=-1/0,u=0,h=0,m=0;const f=n.length,g=1/(f/3);let y=0;for(;y<f;){const F=n[y++],v=n[y++],b=n[y++];r=Math.min(r,F),o=Math.min(o,v),s=Math.min(s,b),a=Math.max(a,F),i=Math.max(i,v),l=Math.max(l,b),u+=g*F,h+=g*v,m+=g*b}return{extent:new Re({xmin:r,ymin:o,zmin:s,xmax:a,ymax:i,zmax:l,spatialReference:t}),center:new _({x:u,y:h,z:m,spatialReference:t})}}get anchor(){if(c(this.transform))return this.transform.getOriginPoint(this.spatialReference);const e=this._boundingInfo;return new _({x:e.center.x,y:e.center.y,z:e.extent.zmin,spatialReference:this.spatialReference})}get origin(){return c(this.transform)?this.transform.getOriginPoint(this.spatialReference):this._boundingInfo.center}get extent(){return!this.loaded&&c(this.external)&&c(this.external.extent)?this.external.extent.clone():this._boundingInfo.extent}addComponent(e){this.loaded?(this.components||(this.components=[]),this.components.push(K.from(e)),this.notifyChange("components")):$.getLogger(this.declaredClass).error("addComponent()","Mesh must be loaded before applying operations")}removeComponent(e){if(this.loaded){if(this.components){const t=this.components.indexOf(e);if(t!==-1)return this.components.splice(t,1),void this.notifyChange("components")}$.getLogger(this.declaredClass).error("removeComponent()","Provided component is not part of the list of components")}else $.getLogger(this.declaredClass).error("removeComponent()","Mesh must be loaded before applying operations")}rotate(e,t,n,r){return le(Ae.x,e,B),le(Ae.y,t,qe),le(Ae.z,n,Ke),Fe(B,qe,B),Fe(B,Ke,B),Cn(this,B,r),this}offset(e,t,n,r){return this.loaded?(ie[0]=e,ie[1]=t,ie[2]=n,fn(this,ie,r),this):($.getLogger(this.declaredClass).error("offset()","Mesh must be loaded before applying operations"),this)}scale(e,t){return this.loaded?(On(this,e,t),this):($.getLogger(this.declaredClass).error("scale()","Mesh must be loaded before applying operations"),this)}centerAt(e,t){return this.loaded?(tn(this,e,t),this):($.getLogger(this.declaredClass).error("centerAt()","Mesh must be loaded before applying operations"),this)}load(e){return c(this.external)&&this.addResolvingPromise(cn(this,this.external.source,e)),Promise.resolve(this)}updateExternalSource(e){this._set("external",e)}clone(){let e=null;if(this.components){const n=new Map,r=new Map;e=this.components.map(o=>o.cloneWithDeduplication(n,r))}const t={components:e,spatialReference:this.spatialReference,vertexAttributes:this.vertexAttributes.clone(),transform:c(this.transform)?this.transform.clone():null,external:c(this.external)?{source:this.external.source,extent:c(this.external.extent)?this.external.extent.clone():null}:null};return new D(t)}vertexAttributesChanged(){this.notifyChange("vertexAttributes")}async toBinaryGLTF(e){const t=ue(()=>import("./gltfexport.js"),["gltfexport.js","index.js","assets/index-cac073d9.css","quat.js","mat3f64.js","quatf64.js","georeference.js","mat4f64.js","spatialReferenceEllipsoidUtils.js","BufferView.js","vec33.js","imageutils.js","resourceUtils2.js","basicInterfaces.js","imageUtils2.js","earcut.js","deduplicate.js","Indices.js"]),n=this.load(),r=await Promise.all([t,n]),{toBinaryGLTF:o}=r[0];return o(this,e)}static createBox(e,t){if(!(e instanceof _))return $.getLogger(z).error(".createBox()","expected location to be a Point instance"),null;const n=new D(ae(xn(),e,t));return t&&t.imageFace&&t.imageFace!=="all"?wn(n,t.imageFace):n}static createSphere(e,t){return e instanceof _?new D(ae(vn(t&&t.densificationFactor||0),e,t)):($.getLogger(z).error(".createSphere()","expected location to be a Point instance"),null)}static createCylinder(e,t){return e instanceof _?new D(ae($n(t&&t.densificationFactor||0),e,t)):($.getLogger(z).error(".createCylinder()","expected location to be a Point instance"),null)}static createPlane(e,t){if(!(e instanceof _))return $.getLogger(z).error(".createPlane()","expected location to be a Point instance"),null;const n=(t==null?void 0:t.facing)??"up",r=bn(n,t==null?void 0:t.size);return new D(ae(An(n),e,{...t,size:r}))}static createFromPolygon(e,t){if(!(e instanceof jt))return $.getLogger(z).error(".createFromPolygon()","expected polygon to be a Polygon instance"),null;const n=qt(e);return new D({vertexAttributes:new T({position:n.position}),components:[new K({faces:n.faces,shading:"flat",material:(t==null?void 0:t.material)??null})],spatialReference:e.spatialReference})}static async createFromGLTF(e,t,n){if(!(e instanceof _))throw $.getLogger(z).error(".createfromGLTF()","expected location to be a Point instance"),new Me("invalid-input","Expected location to be a Point instance");const{loadGLTFMesh:r}=await Oe(ue(()=>import("./loadGLTFMesh.js"),["loadGLTFMesh.js","index.js","assets/index-cac073d9.css","mat3f64.js","BufferView.js","vec33.js","DefaultMaterial_COLOR_GAMMA.js","types.js","mat4f64.js","Version.js","quat.js","quatf64.js","resourceUtils2.js","basicInterfaces.js","Indices.js","georeference.js","spatialReferenceEllipsoidUtils.js","imageUtils2.js","earcut.js","deduplicate.js"]),n);return new D(await r(e,t,n))}static createWithExternalSource(e,t,n){var a;const r=(n==null?void 0:n.extent)??null,o=((a=n==null?void 0:n.transform)==null?void 0:a.clone())??new ge;o.origin=[e.x,e.y,e.z??0];const s=e.spatialReference;return new D({external:{source:t,extent:r},transform:o,spatialReference:s})}static createIncomplete(e,t){var s;const n=((s=t==null?void 0:t.transform)==null?void 0:s.clone())??new ge;n.origin=[e.x,e.y,e.z??0];const r=e.spatialReference,o=new D({transform:n,spatialReference:r});return o.addResolvingPromise(Promise.reject(new Me("mesh-incomplete","Mesh resources are not complete"))),o}};p([d({type:[K],json:{write:!0}})],R.prototype,"components",void 0),p([d({type:ge,json:{write:!0}})],R.prototype,"transform",void 0),p([d({constructOnly:!0})],R.prototype,"external",void 0),p([d({readOnly:!0})],R.prototype,"hasExtent",null),p([d({readOnly:!0})],R.prototype,"_boundingInfo",null),p([d({readOnly:!0})],R.prototype,"anchor",null),p([d({readOnly:!0})],R.prototype,"origin",null),p([d({readOnly:!0,json:{read:!1}})],R.prototype,"extent",null),p([d({readOnly:!0,json:{read:!1,write:!0,default:!0}})],R.prototype,"hasZ",void 0),p([d({readOnly:!0,json:{read:!1,write:!0,default:!1}})],R.prototype,"hasM",void 0),p([d({type:T,nonNullable:!0,json:{write:!0}})],R.prototype,"vertexAttributes",void 0),R=D=p([Q(z)],R);const Ae={x:ve(1,0,0),y:ve(0,1,0),z:ve(0,0,1)},B=oe(),qe=oe(),Ke=oe(),ie=M(),Qe=R;function jn(e,t,n){const r=n.features;n.features=[],delete n.geometryType;const o=St.fromJSON(n);if(o.geometryType="mesh",!n.assetMaps)return o;const s=Wn(t,n.assetMaps),a=o.spatialReference??Nt.WGS84,i=n.globalIdFieldName,{outFields:l}=e,u=c(l)&&l.length>0?Sn(l.includes("*")?null:new Set(l)):()=>({});for(const h of r){const m=Nn(h,i,a,t,s);c(m)&&o.features.push(new zt({geometry:m,attributes:u(h)}))}return o}function Sn(e){return({attributes:t})=>{if(!t)return{};if(!e)return t;for(const n in t)e.has(n)||delete t[n];return t}}function Nn(e,t,n,r,o){const s=e.attributes[t],a=o.get(s);if(a==null||a.status===S.FAILED||a.url==null)return null;const i=zn(e,n,r),l=Re.fromJSON(e.geometry);l.spatialReference=n;const u=kn(e.attributes,r,a.projectVertices);return a.status===S.PENDING?Qe.createIncomplete(i,{extent:l,transform:u}):Qe.createWithExternalSource(i,[{name:a.name,source:a.url}],{extent:l,transform:u})}function zn({attributes:e},t,{transformFieldRoles:n}){return new _({x:e[n.originX],y:e[n.originY],z:e[n.originZ],spatialReference:t})}function kn(e,{transformFieldRoles:t},n){return new ge({translation:[e[t.translationX],-e[t.translationZ],e[t.translationY]],rotation:le([e[t.rotationX],e[t.rotationZ],e[t.rotationY]],e[t.rotationDeg]),scale:[e[t.scaleX],e[t.scaleY],e[t.scaleZ]],geographic:n})}var S;function Wn(e,t){const n=new Map;for(const r of t){const o=r.parentGlobalId;if(o==null)continue;const s=r.assetName,a=r.assetURL,i=r.conversionStatus;let l=n.get(o);if(l==null)switch(l={name:s,status:S.FAILED,url:a,projectVertices:Un(r.flags).projectVertices},n.set(o,l),i){case"COMPLETED":case"SUBMITTED":l.status=S.COMPLETED;break;case"INPROGRESS":l.status=S.PENDING;break;default:l.status=S.FAILED}else console.warn(`Multiple asset parts not expected. Ignoring additional parts. conflicting assetname: ${r.assetName}`)}return n}function Un(e){return{projectVertices:e.includes("PROJECT_VERTICES")}}(function(e){e[e.FAILED=0]="FAILED",e[e.PENDING=1]="PENDING",e[e.COMPLETED=2]="COMPLETED"})(S||(S={}));const qn=Object.freeze(Object.defineProperty({__proto__:null,meshFeatureSetFromJSON:jn},Symbol.toStringTag,{value:"Module"}));export{qn as a,Zt as c,K as g,re as m,T as p};

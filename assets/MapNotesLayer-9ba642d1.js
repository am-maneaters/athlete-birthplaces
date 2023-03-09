import{iE as M,am as a,an as s,ao as $,l6 as F,l4 as B,br as x,lV as z,kj as A,kk as W,gG as H,gH as U,gI as K,aV as O,ae as v,jY as Q,cU as J,h5 as E,r as c,lW as L,gv as w,lX as j,dg as D,at as V,t as g,s as Y,jQ as q,aj as X,gi as Z,gh as ee,aU as te,aS as re,bn as oe,kt as C,bk as b,bl as ae,az as ie,lY as le,lZ as R,gb as ne}from"./index-5be327fa.js";import{n as se}from"./objectIdUtils-789e911a.js";function S(t){return t.featureCollectionType==="markup"||t.layers.some(e=>e.layerDefinition.visibilityField!=null||!_(e))}function _({layerDefinition:t,featureSet:e}){const r=t.geometryType??e.geometryType;return T.find(o=>{var i,n,y;return r===o.geometryTypeJSON&&((y=(n=(i=t.drawingInfo)==null?void 0:i.renderer)==null?void 0:n.symbol)==null?void 0:y.type)===o.identifyingSymbol.type})}function G(){return new ie({xmin:-180,ymin:-90,xmax:180,ymax:90})}const I=new M({name:"OBJECTID",alias:"OBJECTID",type:"oid",nullable:!1,editable:!1}),ye=new M({name:"title",alias:"Title",type:"string",nullable:!0,editable:!0});let u=class extends le{constructor(t){super(t),this.visibilityMode="inherited"}initialize(){for(const t of this.graphics)t.sourceLayer=this.layer;this.graphics.on("after-add",t=>{t.item.sourceLayer=this.layer}),this.graphics.on("after-remove",t=>{t.item.sourceLayer=null})}get fullExtent(){var r;const t=(r=this.layer)==null?void 0:r.spatialReference,e=this.fullBounds;return t?g(e)?w(G(),t).geometry:D(e,t):null}get fullBounds(){var r;const t=(r=this.layer)==null?void 0:r.spatialReference;if(!t)return null;const e=E();return this.graphics.forEach(o=>{const i=c(o.geometry)?w(o.geometry,t).geometry:null;c(i)&&L(e,i.type==="point"?i:i.extent,e)}),j(e,R)?null:e}get sublayers(){return this.graphics}};a([s({readOnly:!0})],u.prototype,"fullExtent",null),a([s({readOnly:!0})],u.prototype,"fullBounds",null),a([s({readOnly:!0})],u.prototype,"sublayers",null),a([s()],u.prototype,"layer",void 0),a([s()],u.prototype,"layerId",void 0),a([s({readOnly:!0})],u.prototype,"visibilityMode",void 0),u=a([$("esri.layers.MapNotesLayer.MapNotesSublayer")],u);const T=[{geometryType:"polygon",geometryTypeJSON:"esriGeometryPolygon",id:"polygonLayer",layerId:0,title:"Polygons",identifyingSymbol:new F().toJSON()},{geometryType:"polyline",geometryTypeJSON:"esriGeometryPolyline",id:"polylineLayer",layerId:1,title:"Polylines",identifyingSymbol:new B().toJSON()},{geometryType:"multipoint",geometryTypeJSON:"esriGeometryMultipoint",id:"multipointLayer",layerId:2,title:"Multipoints",identifyingSymbol:new x().toJSON()},{geometryType:"point",geometryTypeJSON:"esriGeometryPoint",id:"pointLayer",layerId:3,title:"Points",identifyingSymbol:new x().toJSON()},{geometryType:"point",geometryTypeJSON:"esriGeometryPoint",id:"textLayer",layerId:4,title:"Text",identifyingSymbol:new z().toJSON()}];let l=class extends A(W(H(U(K(ne))))){constructor(t){super(t),this.capabilities={operations:{supportsMapNotesEditing:!0}},this.featureCollections=null,this.featureCollectionJSON=null,this.featureCollectionType="notes",this.legendEnabled=!1,this.listMode="hide-children",this.minScale=0,this.maxScale=0,this.spatialReference=O.WGS84,this.sublayers=new v(T.map(e=>new u({id:e.id,layerId:e.layerId,title:e.title,layer:this}))),this.title="Map Notes",this.type="map-notes",this.visibilityMode="inherited"}readCapabilities(t,e,r){return{operations:{supportsMapNotesEditing:!S(e)&&(r==null?void 0:r.origin)!=="portal-item"}}}readFeatureCollections(t,e,r){if(!S(e))return null;const o=e.layers.map(i=>{const n=new Q;return n.read(i,r),n});return new v({items:o})}readLegacyfeatureCollectionJSON(t,e){return S(e)?J(e.featureCollection):null}get fullExtent(){var r;const t=this.spatialReference,e=E();return c(this.sublayers)?this.sublayers.forEach(({fullBounds:o})=>c(o)?L(e,o,e):e,e):(r=this.featureCollectionJSON)!=null&&r.layers.some(o=>o.layerDefinition.extent)&&this.featureCollectionJSON.layers.forEach(o=>{const i=w(o.layerDefinition.extent,t).geometry;c(i)&&L(e,i,e)}),j(e,R)?w(G(),t).geometry:D(e,t)}readMinScale(t,e){for(const r of e.layers)if(r.layerDefinition.minScale!=null)return r.layerDefinition.minScale;return 0}readMaxScale(t,e){for(const r of e.layers)if(r.layerDefinition.maxScale!=null)return r.layerDefinition.maxScale;return 0}get multipointLayer(){return this._findSublayer("multipointLayer")}get pointLayer(){return this._findSublayer("pointLayer")}get polygonLayer(){return this._findSublayer("polygonLayer")}get polylineLayer(){return this._findSublayer("polylineLayer")}readSpatialReference(t,e){return e.layers.length?O.fromJSON(e.layers[0].layerDefinition.spatialReference):O.WGS84}readSublayers(t,e,r){if(S(e))return null;const o=[];let i=e.layers.reduce((n,y)=>Math.max(n,y.layerDefinition.id??-1),-1)+1;for(const n of e.layers){const{layerDefinition:y,featureSet:p}=n,d=y.id??i++,m=_(n);if(c(m)){const f=new u({id:m.id,title:y.name,layerId:d,layer:this,graphics:p.features.map(({geometry:h,symbol:N,attributes:P,popupInfo:k})=>V.fromJSON({attributes:P,geometry:h,symbol:N,popupTemplate:k}))});o.push(f)}}return new v(o)}writeSublayers(t,e,r,o){var m;const{minScale:i,maxScale:n}=this;if(g(t))return;const y=t.some(f=>f.graphics.length>0);if(!this.capabilities.operations.supportsMapNotesEditing)return void(y&&((m=o==null?void 0:o.messages)==null?void 0:m.push(new Y("map-notes-layer:editing-not-supported","New map notes cannot be added to this layer"))));const p=[];let d=this.spatialReference.toJSON();e:for(const f of t)for(const h of f.graphics)if(c(h.geometry)){d=h.geometry.spatialReference.toJSON();break e}for(const f of T){const h=t.find(N=>f.id===N.id);this._writeMapNoteSublayer(p,h,f,i,n,d,o)}q("featureCollection.layers",p,e)}get textLayer(){return this._findSublayer("textLayer")}load(t){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Collection"]},t)),Promise.resolve(this)}read(t,e){"featureCollection"in t&&(t=J(t),Object.assign(t,t.featureCollection)),super.read(t,e)}async beforeSave(){if(g(this.sublayers))return;let t=null;const e=[];for(const o of this.sublayers)for(const i of o.graphics)if(c(i.geometry)){const n=i.geometry;t?X(n.spatialReference,t)||(Z(n.spatialReference,t)||ee()||await te(),i.geometry=re(n,t)):t=n.spatialReference,e.push(i)}const r=await oe(e.map(o=>o.geometry));e.forEach((o,i)=>o.geometry=r[i])}_findSublayer(t){var e;return g(this.sublayers)?null:((e=this.sublayers)==null?void 0:e.find(r=>r.id===t))??null}_writeMapNoteSublayer(t,e,r,o,i,n,y){const p=[];if(!g(e)){for(const d of e.graphics)this._writeMapNote(p,d,r.geometryType,y);this._normalizeObjectIds(p,I),t.push({layerDefinition:{name:e.title,drawingInfo:{renderer:{type:"simple",symbol:J(r.identifyingSymbol)}},id:e.layerId,geometryType:r.geometryTypeJSON,minScale:o,maxScale:i,objectIdField:"OBJECTID",fields:[I.toJSON(),ye.toJSON()],spatialReference:n},featureSet:{features:p,geometryType:r.geometryTypeJSON}})}}_writeMapNote(t,e,r,o){var d,m;if(g(e))return;const{geometry:i,symbol:n,popupTemplate:y}=e;if(g(i))return;if(i.type!==r)return void((d=o==null?void 0:o.messages)==null?void 0:d.push(new C("map-notes-layer:invalid-geometry-type",`Geometry "${i.type}" cannot be saved in "${r}" layer`,{graphic:e})));if(g(n))return void((m=o==null?void 0:o.messages)==null?void 0:m.push(new C("map-notes-layer:no-symbol","Skipping map notes with no symbol",{graphic:e})));const p={attributes:{...e.attributes},geometry:i.toJSON(),symbol:n.toJSON()};c(y)&&(p.popupInfo=y.toJSON()),t.push(p)}_normalizeObjectIds(t,e){const r=e.name;let o=se(r,t)+1;const i=new Set;for(const n of t){n.attributes||(n.attributes={});const{attributes:y}=n;(y[r]==null||i.has(y[r]))&&(y[r]=o++),i.add(y[r])}}};a([s({readOnly:!0})],l.prototype,"capabilities",void 0),a([b(["portal-item","web-map"],"capabilities",["layers"])],l.prototype,"readCapabilities",null),a([s({readOnly:!0})],l.prototype,"featureCollections",void 0),a([b(["web-map","portal-item"],"featureCollections",["layers"])],l.prototype,"readFeatureCollections",null),a([s({readOnly:!0,json:{origins:{"web-map":{write:{enabled:!0,target:"featureCollection"}}}}})],l.prototype,"featureCollectionJSON",void 0),a([b(["web-map","portal-item"],"featureCollectionJSON",["featureCollection"])],l.prototype,"readLegacyfeatureCollectionJSON",null),a([s({readOnly:!0,json:{read:!0,write:{enabled:!0,ignoreOrigin:!0}}})],l.prototype,"featureCollectionType",void 0),a([s({readOnly:!0})],l.prototype,"fullExtent",null),a([s({readOnly:!0,json:{origins:{"web-map":{write:{target:"featureCollection.showLegend",overridePolicy(){return{enabled:this.featureCollectionJSON!=null}}}}}}})],l.prototype,"legendEnabled",void 0),a([s({type:["show","hide","hide-children"]})],l.prototype,"listMode",void 0),a([s({type:Number,nonNullable:!0,json:{write:!1}})],l.prototype,"minScale",void 0),a([b(["web-map","portal-item"],"minScale",["layers"])],l.prototype,"readMinScale",null),a([s({type:Number,nonNullable:!0,json:{write:!1}})],l.prototype,"maxScale",void 0),a([b(["web-map","portal-item"],"maxScale",["layers"])],l.prototype,"readMaxScale",null),a([s({readOnly:!0})],l.prototype,"multipointLayer",null),a([s({value:"ArcGISFeatureLayer",type:["ArcGISFeatureLayer"]})],l.prototype,"operationalLayerType",void 0),a([s({readOnly:!0})],l.prototype,"pointLayer",null),a([s({readOnly:!0})],l.prototype,"polygonLayer",null),a([s({readOnly:!0})],l.prototype,"polylineLayer",null),a([s({type:O})],l.prototype,"spatialReference",void 0),a([b(["web-map","portal-item"],"spatialReference",["layers"])],l.prototype,"readSpatialReference",null),a([s({readOnly:!0,json:{origins:{"web-map":{write:{ignoreOrigin:!0}}}}})],l.prototype,"sublayers",void 0),a([b("web-map","sublayers",["layers"])],l.prototype,"readSublayers",null),a([ae("web-map","sublayers")],l.prototype,"writeSublayers",null),a([s({readOnly:!0})],l.prototype,"textLayer",null),a([s()],l.prototype,"title",void 0),a([s({readOnly:!0,json:{read:!1}})],l.prototype,"type",void 0),l=a([$("esri.layers.MapNotesLayer")],l);const de=l;export{de as default};

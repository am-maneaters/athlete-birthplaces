import{cp as de,am as t,an as s,bk as j,i$ as ue,kn as _,ao as p,ko as ce,al as I,jO as Y,dn as ee,fK as he,r as d,jY as te,kp as ge,U as re,aD as fe,cK as me,s as F,at as ve,t as be,az as we,aV as se,iv as Se,kq as $e,kr as Oe,aq as xe,gC as ie,d3 as Ie,ks as Fe,ae as w,kt as je,ku as Le,bi as m,cU as c,kv as Te,kf as Be,gF as ke,gG as Ae,gH as Ee,kk as _e,gI as qe,kw as Ne,ca as Pe,gM as Re,cs as Me,kx as Ue,ky as Ce,kz as Qe,gb as De}from"./index-5be327fa.js";import{t as Ke,u as Ve,l as He}from"./FetchAssociatedFeatureLayer-5ac0d9c1.js";import{n as Je,E as ze,L as J}from"./SceneService-e07fe74c.js";import{s as Ge,l as Ze,u as We,m as Xe}from"./I3SLayerDefinitions-9355bfde.js";import{d as Ye,s as et}from"./popupUtils-fb92d4f7.js";import"./mat3f64-221ce671.js";import"./mat4f64-1413b4a7.js";import"./quat-7ca1255d.js";import"./quatf64-3363c48e.js";import"./I3SBinaryReader-3e4ff5f2.js";import"./VertexAttribute-15d1866a.js";import"./spatialReferenceEllipsoidUtils-c53d83bd.js";import"./symbolColorUtils-11645124.js";import"./vec3f32-ad1dc57f.js";import"./plane-cd111fb5.js";import"./sphere-d505e384.js";import"./originUtils-1469eeaf.js";import"./multiOriginJSONSupportUtils-c978f4c3.js";import"./resourceUtils-56094837.js";let y=class extends de(ce){constructor(r){super(r),this.title="",this.id=-1,this.modelName=null,this.isEmpty=null,this.visible=!0,this.opacity=1}readTitle(r,i){return typeof i.alias=="string"?i.alias:typeof i.name=="string"?i.name:""}readIdOnlyOnce(r){return this.id!==-1?this.id:typeof r=="number"?r:-1}};t([s({type:String,json:{origins:{"web-scene":{write:!0},"portal-item":{write:!0}}}})],y.prototype,"title",void 0),t([j("service","title",["alias","name"])],y.prototype,"readTitle",null),t([s()],y.prototype,"layer",void 0),t([s({type:ue,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],y.prototype,"id",void 0),t([j("service","id")],y.prototype,"readIdOnlyOnce",null),t([s(_(String))],y.prototype,"modelName",void 0),t([s(_(Boolean))],y.prototype,"isEmpty",void 0),t([s({type:Boolean,json:{name:"visibility",write:!0}})],y.prototype,"visible",void 0),t([s({type:Number,json:{write:!0}})],y.prototype,"opacity",void 0),y=t([p("esri.layers.buildingSublayers.BuildingSublayer")],y);const oe=y,ae="esri.layers.buildingSublayers.BuildingComponentSublayer",tt=I.getLogger(ae),z=Fe();let a=class extends Y.LoadableMixin(ee(oe)){constructor(e){super(e),this.type="building-component",this.nodePages=null,this.materialDefinitions=[],this.textureSetDefinitions=[],this.geometryDefinitions=[],this.indexInfo=null,this.serviceUpdateTimeStamp=null,this.store=null,this.attributeStorageInfo=[],this.fields=[],this.associatedLayer=null,this.outFields=null,this.listMode="show",this.renderer=null,this.definitionExpression=null,this.popupEnabled=!0,this.popupTemplate=null,this.layerType="3d-object"}get parsedUrl(){var e,r;return this.layer?{path:`${(e=this.layer.parsedUrl)==null?void 0:e.path}/sublayers/${this.id}`,query:(r=this.layer.parsedUrl)==null?void 0:r.query}:{path:""}}get fieldsIndex(){return new he(this.fields)}readAssociatedLayer(e,r){const i=this.layer.associatedFeatureServiceItem,o=r.associatedLayerID;return d(i)&&typeof o=="number"?new te({portalItem:i,layerId:o}):null}get objectIdField(){if(this.fields!=null){for(const e of this.fields)if(e.type==="oid")return e.name}return null}get displayField(){return d(this.associatedLayer)?this.associatedLayer.displayField:void 0}get apiKey(){return this.layer.apiKey}get fullExtent(){return this.layer.fullExtent}get spatialReference(){return this.layer.spatialReference}get version(){return this.layer.version}get elevationInfo(){return this.layer.elevationInfo}get minScale(){return this.layer.minScale}get maxScale(){return this.layer.maxScale}get effectiveScaleRange(){return this.layer.effectiveScaleRange}get defaultPopupTemplate(){return this.createPopupTemplate()}load(e){const r=d(e)?e.signal:null,i=this._fetchService(r).then(()=>{this.indexInfo=Je(this.parsedUrl.path,this.rootNode,this.nodePages,this.apiKey,tt,r)});return this.addResolvingPromise(i),Promise.resolve(this)}createPopupTemplate(e){return ge(this,e)}async _fetchService(e){const r=(await re(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(r,{origin:"service",url:this.parsedUrl})}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,r){var o,n,h;const i=(n=(o=this.getFeatureType(r==null?void 0:r.feature))==null?void 0:o.domains)==null?void 0:n[e];return i&&i.type!=="inherited"?i:((h=this.getField(e))==null?void 0:h.domain)??null}getFeatureType(e){return e&&d(this.associatedLayer)?this.associatedLayer.getFeatureType(e):null}get types(){return d(this.associatedLayer)?this.associatedLayer.types??[]:[]}get typeIdField(){return d(this.associatedLayer)?this.associatedLayer.typeIdField:null}get geometryType(){return this.layerType==="3d-object"?"mesh":"point"}get profile(){return this.layerType==="3d-object"?"mesh-pyramids":"points"}get capabilities(){const e=d(this.associatedLayer)&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:Ke,{query:r,data:{supportsZ:i,supportsM:o,isVersioned:n}}=e;return{query:r,data:{supportsZ:i,supportsM:o,isVersioned:n}}}createQuery(){const e=new fe;return this.geometryType!=="mesh"&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryExtent(e||this.createQuery(),r))}queryFeatureCount(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryFeatureCount(e||this.createQuery(),r))}queryFeatures(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryFeatures(e||this.createQuery(),r)).then(i=>{if(i!=null&&i.features)for(const o of i.features)o.layer=this.layer,o.sourceLayer=this;return i})}queryObjectIds(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryObjectIds(e||this.createQuery(),r))}async queryCachedAttributes(e,r){const i=me(this.fieldsIndex,await Ye(this,et(this)));return Ve(this.parsedUrl.path,this.attributeStorageInfo,e,r,i)}async queryCachedFeature(e,r){const i=await this.queryCachedAttributes(e,[r]);if(!i||i.length===0)throw new F("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const o=new ve;return o.attributes=i[0],o.layer=this,o.sourceLayer=this,o}getFieldUsageInfo(e){return this.fieldsIndex.has(e)?{supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1}:{supportsLabelingInfo:!1,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:d(this.associatedLayer)}}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return d(e)&&e.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),be(this.associatedLayer))throw new F("buildingscenelayer:query-not-available","BuildingSceneLayer component layer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new F("buildingscenelayer:query-not-available","BuildingSceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}};t([s({readOnly:!0})],a.prototype,"parsedUrl",null),t([s({type:Ge,readOnly:!0})],a.prototype,"nodePages",void 0),t([s({type:[Ze],readOnly:!0})],a.prototype,"materialDefinitions",void 0),t([s({type:[We],readOnly:!0})],a.prototype,"textureSetDefinitions",void 0),t([s({type:[Xe],readOnly:!0})],a.prototype,"geometryDefinitions",void 0),t([s({readOnly:!0})],a.prototype,"serviceUpdateTimeStamp",void 0),t([s({readOnly:!0})],a.prototype,"store",void 0),t([s({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],a.prototype,"rootNode",void 0),t([s({readOnly:!0})],a.prototype,"attributeStorageInfo",void 0),t([s(z.fields)],a.prototype,"fields",void 0),t([s({readOnly:!0})],a.prototype,"fieldsIndex",null),t([s({readOnly:!0,type:te})],a.prototype,"associatedLayer",void 0),t([j("service","associatedLayer",["associatedLayerID"])],a.prototype,"readAssociatedLayer",null),t([s(z.outFields)],a.prototype,"outFields",void 0),t([s({type:String,readOnly:!0})],a.prototype,"objectIdField",null),t([s({readOnly:!0,type:String,json:{read:!1}})],a.prototype,"displayField",null),t([s({readOnly:!0,type:String})],a.prototype,"apiKey",null),t([s({readOnly:!0,type:we})],a.prototype,"fullExtent",null),t([s({readOnly:!0,type:se})],a.prototype,"spatialReference",null),t([s({readOnly:!0})],a.prototype,"version",null),t([s({readOnly:!0,type:Se})],a.prototype,"elevationInfo",null),t([s({readOnly:!0,type:Number})],a.prototype,"minScale",null),t([s({readOnly:!0,type:Number})],a.prototype,"maxScale",null),t([s({readOnly:!0,type:Number})],a.prototype,"effectiveScaleRange",null),t([s({type:["hide","show"],json:{write:!0}})],a.prototype,"listMode",void 0),t([s({types:$e,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],a.prototype,"renderer",void 0),t([s({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],a.prototype,"definitionExpression",void 0),t([s(Oe)],a.prototype,"popupEnabled",void 0),t([s({type:xe,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],a.prototype,"popupTemplate",void 0),t([s({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],a.prototype,"normalReferenceFrame",void 0),t([s({readOnly:!0,json:{read:!1}})],a.prototype,"defaultPopupTemplate",null),t([s()],a.prototype,"types",null),t([s()],a.prototype,"typeIdField",null),t([s({json:{write:!1}}),ie(new Ie({"3DObject":"3d-object",Point:"point"}))],a.prototype,"layerType",void 0),t([s()],a.prototype,"geometryType",null),t([s()],a.prototype,"profile",null),t([s({readOnly:!0,json:{read:!1}})],a.prototype,"capabilities",null),a=t([p(ae)],a);const q=a;var N;const G={type:w,readOnly:!0,json:{origins:{service:{read:{source:"sublayers",reader:ne}}},read:!1}};function ne(e,r,i){if(e&&Array.isArray(e))return new w(e.map(o=>{const n=rt(o);if(n){const h=new n;return h.read(o,i),h}return i&&i.messages&&o&&i.messages.push(new je("building-scene-layer:unsupported-sublayer-type","Building scene sublayer of type '"+(o.type||"unknown")+"' are not supported",{definition:o,context:i})),null}))}let f=N=class extends oe{constructor(e){super(e),this.type="building-group",this.listMode="show",this.sublayers=null}loadAll(){return Le(this,e=>N.forEachSublayer(this.sublayers,r=>{r.type!=="building-group"&&e(r)}))}};function rt(e){return e.layerType==="group"?f:q}t([s({type:["hide","show","hide-children"],json:{write:!0}})],f.prototype,"listMode",void 0),t([s(G)],f.prototype,"sublayers",void 0),f=N=t([p("esri.layers.buildingSublayers.BuildingGroupSublayer")],f),function(e){function r(i,o){i.forEach(n=>{o(n),n.type==="building-group"&&r(n.sublayers,o)})}e.sublayersProperty=G,e.readSublayers=ne,e.forEachSublayer=r}(f||(f={}));const v=f;let L=class extends m{constructor(){super(...arguments),this.type=null}};t([s({type:String,readOnly:!0,json:{write:!0}})],L.prototype,"type",void 0),L=t([p("esri.layers.support.BuildingFilterAuthoringInfo")],L);const le=L;var P;let S=P=class extends m{constructor(){super(...arguments),this.filterType=null,this.filterValues=null}clone(){return new P({filterType:this.filterType,filterValues:c(this.filterValues)})}};t([s({type:String,json:{write:!0}})],S.prototype,"filterType",void 0),t([s({type:[String],json:{write:!0}})],S.prototype,"filterValues",void 0),S=P=t([p("esri.layers.support.BuildingFilterAuthoringInfoType")],S);const st=S;var R;const it=w.ofType(st);let T=R=class extends m{clone(){return new R({filterTypes:c(this.filterTypes)})}};t([s({type:it,json:{write:!0}})],T.prototype,"filterTypes",void 0),T=R=t([p("esri.layers.support.BuildingFilterAuthoringInfoBlock")],T);const ot=T;var M;const at=w.ofType(ot);let $=M=class extends le{constructor(){super(...arguments),this.type="checkbox"}clone(){return new M({filterBlocks:c(this.filterBlocks)})}};t([s({type:["checkbox"]})],$.prototype,"type",void 0),t([s({type:at,json:{write:!0}})],$.prototype,"filterBlocks",void 0),$=M=t([p("esri.layers.support.BuildingFilterAuthoringInfoCheckbox")],$);const Z=$;let B=class extends m{};t([s({readOnly:!0,json:{read:!1}})],B.prototype,"type",void 0),B=t([p("esri.layers.support.BuildingFilterMode")],B);const E=B;var U;let k=U=class extends E{constructor(){super(...arguments),this.type="solid"}clone(){return new U}};t([s({type:["solid"],readOnly:!0,json:{write:!0}})],k.prototype,"type",void 0),k=U=t([p("esri.layers.support.BuildingFilterModeSolid")],k);const C=k;var Q;let O=Q=class extends E{constructor(){super(...arguments),this.type="wire-frame",this.edges=null}clone(){return new Q({edges:c(this.edges)})}};t([ie({wireFrame:"wire-frame"})],O.prototype,"type",void 0),t([s(Te)],O.prototype,"edges",void 0),O=Q=t([p("esri.layers.support.BuildingFilterModeWireFrame")],O);const W=O;var D;let A=D=class extends E{constructor(){super(...arguments),this.type="x-ray"}clone(){return new D}};t([s({type:["x-ray"],readOnly:!0,json:{write:!0}})],A.prototype,"type",void 0),A=D=t([p("esri.layers.support.BuildingFilterModeXRay")],A);const X=A;var K;const nt={nonNullable:!0,types:{key:"type",base:E,typeMap:{solid:C,"wire-frame":W,"x-ray":X}},json:{read:e=>{switch(e&&e.type){case"solid":return C.fromJSON(e);case"wireFrame":return W.fromJSON(e);case"x-ray":return X.fromJSON(e);default:return}},write:{enabled:!0,isRequired:!0}}};let b=K=class extends m{constructor(){super(...arguments),this.filterExpression=null,this.filterMode=new C,this.title=""}clone(){return new K({filterExpression:this.filterExpression,filterMode:c(this.filterMode),title:this.title})}};t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],b.prototype,"filterExpression",void 0),t([s(nt)],b.prototype,"filterMode",void 0),t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],b.prototype,"title",void 0),b=K=t([p("esri.layers.support.BuildingFilterBlock")],b);const lt=b;var V;const pt=w.ofType(lt);let g=V=class extends m{constructor(){super(...arguments),this.description=null,this.filterBlocks=null,this.id=Be(),this.name=null}clone(){return new V({description:this.description,filterBlocks:c(this.filterBlocks),id:this.id,name:this.name,filterAuthoringInfo:c(this.filterAuthoringInfo)})}};t([s({type:String,json:{write:!0}})],g.prototype,"description",void 0),t([s({type:pt,json:{write:{enabled:!0,isRequired:!0}}})],g.prototype,"filterBlocks",void 0),t([s({types:{key:"type",base:le,typeMap:{checkbox:Z}},json:{read:e=>(e&&e.type)==="checkbox"?Z.fromJSON(e):null,write:!0}})],g.prototype,"filterAuthoringInfo",void 0),t([s({type:String,constructOnly:!0,json:{write:{enabled:!0,isRequired:!0}}})],g.prototype,"id",void 0),t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],g.prototype,"name",void 0),g=V=t([p("esri.layers.support.BuildingFilter")],g);const yt=g;let u=class extends m{constructor(){super(...arguments),this.fieldName=null,this.modelName=null,this.label=null,this.min=null,this.max=null,this.mostFrequentValues=null,this.subLayerIds=null}};t([s({type:String})],u.prototype,"fieldName",void 0),t([s({type:String})],u.prototype,"modelName",void 0),t([s({type:String})],u.prototype,"label",void 0),t([s({type:Number})],u.prototype,"min",void 0),t([s({type:Number})],u.prototype,"max",void 0),t([s({json:{read:e=>Array.isArray(e)&&(e.every(r=>typeof r=="string")||e.every(r=>typeof r=="number"))?e.slice():null}})],u.prototype,"mostFrequentValues",void 0),t([s({type:[Number]})],u.prototype,"subLayerIds",void 0),u=t([p("esri.layers.support.BuildingFieldStatistics")],u);let x=class extends Y.LoadableMixin(ee(m)){constructor(){super(...arguments),this.url=null}get fields(){return this.loaded||this.loadStatus==="loading"?this._get("fields"):(I.getLogger(this.declaredClass).error("building summary statistics are not loaded"),null)}load(e){const r=d(e)?e.signal:null;return this.addResolvingPromise(this._fetchService(r)),Promise.resolve(this)}async _fetchService(e){const r=(await re(this.url,{query:{f:"json"},responseType:"json",signal:e})).data;this.read(r,{origin:"service"})}};t([s({constructOnly:!0,type:String})],x.prototype,"url",void 0),t([s({readOnly:!0,type:[u],json:{read:{source:"summary"}}})],x.prototype,"fields",null),x=t([p("esri.layers.support.BuildingSummaryStatistics")],x);const pe=x,ye=w.ofType(yt),H=c(v.sublayersProperty);H.json.origins["web-scene"]={type:[q],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}},H.json.origins["portal-item"]={type:[q],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}};let l=class extends ze(ke(Ae(Ee(_e(qe(Ne(De))))))){constructor(e){super(e),this.operationalLayerType="BuildingSceneLayer",this.allSublayers=new Pe({getCollections:()=>[this.sublayers],getChildrenFunction:r=>r.type==="building-group"?r.sublayers:null}),this.sublayers=null,this._sublayerOverrides=null,this.filters=new ye,this.activeFilterId=null,this.summaryStatistics=null,this.outFields=null,this.type="building-scene"}normalizeCtorArgs(e){return typeof e=="string"?{url:e}:e??{}}destroy(){this.allSublayers.destroy()}readSublayers(e,r,i){const o=v.readSublayers(e,r,i);return v.forEachSublayer(o,n=>n.layer=this),this._sublayerOverrides&&(this.applySublayerOverrides(o,this._sublayerOverrides),this._sublayerOverrides=null),o}applySublayerOverrides(e,{overrides:r,context:i}){v.forEachSublayer(e,o=>o.read(r.get(o.id),i))}readSublayerOverrides(e,r){var o;const i=new Map;for(const n of e)n!=null&&typeof n=="object"&&typeof n.id=="number"?i.set(n.id,n):(o=r.messages)==null||o.push(new F("building-scene-layer:invalid-sublayer-override","Invalid value for sublayer override. Not an object or no id specified.",{value:n}));return{overrides:i,context:r}}writeSublayerOverrides(e,r,i){const o=[];v.forEachSublayer(this.sublayers,n=>{const h=n.write({},i);Object.keys(h).length>1&&o.push(h)}),o.length>0&&(r.sublayers=o)}writeUnappliedOverrides(e,r){r.sublayers=[],e.overrides.forEach(i=>{r.sublayers.push(c(i))})}write(e,r){return e=super.write(e,r),!r||r.origin!=="web-scene"&&r.origin!=="portal-item"||(this.sublayers?this.writeSublayerOverrides(this.sublayers,e,r):this._sublayerOverrides&&this.writeUnappliedOverrides(this._sublayerOverrides,e)),e}read(e,r){if(super.read(e,r),r&&(r.origin==="web-scene"||r.origin==="portal-item")&&e!=null&&Array.isArray(e.sublayers)){const i=this.readSublayerOverrides(e.sublayers,r);this.sublayers?this.applySublayerOverrides(this.sublayers,i):this._sublayerOverrides=i}}readSummaryStatistics(e,r){var i;if(typeof r.statisticsHRef=="string"){const o=Re((i=this.parsedUrl)==null?void 0:i.path,r.statisticsHRef);return new pe({url:o})}return null}set elevationInfo(e){this._set("elevationInfo",e),this._validateElevationInfo()}load(e){const r=d(e)?e.signal:null,i=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch(Me).then(()=>this._fetchService(r)).then(()=>this._fetchAssociatedFeatureService(r));return this.addResolvingPromise(i),Promise.resolve(this)}loadAll(){return Ue(this,e=>{v.forEachSublayer(this.sublayers,r=>{r.type!=="building-group"&&e(r)}),this.summaryStatistics&&e(this.summaryStatistics)})}async saveAs(e,r){return this._debouncedSaveOperations(J.SAVE_AS,{...r,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"};return this._debouncedSaveOperations(J.SAVE,e)}validateLayer(e){if(!e.layerType||e.layerType!=="Building")throw new F("buildingscenelayer:layer-type-not-supported","BuildingSceneLayer does not support this layer type",{layerType:e.layerType})}_getTypeKeywords(){return["Building"]}_validateElevationInfo(){const e=this.elevationInfo;e&&(e.mode!=="absolute-height"&&I.getLogger(this.declaredClass).warn(".elevationInfo=","Building scene layers only support absolute-height elevation mode"),e.featureExpressionInfo&&e.featureExpressionInfo.expression!=="0"&&I.getLogger(this.declaredClass).warn(".elevationInfo=","Building scene layers do not support featureExpressionInfo"))}async _fetchAssociatedFeatureService(e){const r=new He(this.parsedUrl,this.portalItem,this.apiKey,e);try{this.associatedFeatureServiceItem=await r.fetchPortalItem()}catch(i){I.getLogger(this.declaredClass).warn("Associated feature service item could not be loaded",i)}}};t([s({type:["BuildingSceneLayer"]})],l.prototype,"operationalLayerType",void 0),t([s({readOnly:!0})],l.prototype,"allSublayers",void 0),t([s(H)],l.prototype,"sublayers",void 0),t([j("service","sublayers")],l.prototype,"readSublayers",null),t([s({type:ye,nonNullable:!0,json:{write:!0}})],l.prototype,"filters",void 0),t([s({type:String,json:{write:!0}})],l.prototype,"activeFilterId",void 0),t([s({readOnly:!0,type:pe})],l.prototype,"summaryStatistics",void 0),t([j("summaryStatistics",["statisticsHRef"])],l.prototype,"readSummaryStatistics",null),t([s({type:[String],json:{read:!1}})],l.prototype,"outFields",void 0),t([s(Ce)],l.prototype,"fullExtent",void 0),t([s({type:["show","hide","hide-children"]})],l.prototype,"listMode",void 0),t([s(_(se))],l.prototype,"spatialReference",void 0),t([s(Qe)],l.prototype,"elevationInfo",null),t([s({json:{read:!1},readOnly:!0})],l.prototype,"type",void 0),t([s()],l.prototype,"associatedFeatureServiceItem",void 0),l=t([p("esri.layers.BuildingSceneLayer")],l);const At=l;export{At as default};

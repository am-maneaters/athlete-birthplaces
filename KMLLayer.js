import{bR as _,kJ as $,bq as f,av as y,a6 as m,c$ as g,r as h,az as d,ka as j,ae as b,am as s,an as i,lJ as F,bk as p,ao as S,jO as M,kj as I,kl as R,kk as C,gG as J,gH as K,gI as N,ca as P,aV as w,dY as T,cs as z,bl as A,gL as H,gb as V}from"./index.js";import{j as W,S as k,g as x,d as E}from"./kmlUtils.js";var u;let o=u=class extends _.EventedMixin($(M)){constructor(...e){super(...e),this.description=null,this.id=null,this.networkLink=null,this.sublayers=null,this.title=null,this.sourceJSON=null,this.fullExtent=null,this.addHandles([f(()=>this.sublayers,"after-add",({item:t})=>{t.parent=this,t.layer=this.layer},y),f(()=>this.sublayers,"after-remove",({item:t})=>{t.layer=t.parent=null},y),m(()=>this.sublayers,(t,r)=>{if(r)for(const l of r)l.layer=l.parent=null;if(t)for(const l of t)l.parent=this,l.layer=this.layer},y)])}initialize(){g(()=>this.networkLink).then(()=>g(()=>this.visible===!0)).then(()=>this.load())}load(e){var l;if(!this.networkLink||this.networkLink.viewFormat)return;const t=h(e)?e.signal:null,r=this._fetchService(((l=this._get("networkLink"))==null?void 0:l.href)??"",t).then(n=>{var v;const O=W(n.sublayers);this.fullExtent=d.fromJSON(O),this.sourceJSON=n;const c=j(b.ofType(u),k(u,n));this.sublayers?this.sublayers.addMany(c):this.sublayers=c,(v=this.layer)==null||v.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(r),Promise.resolve(this)}get visible(){return this._get("visible")}set visible(e){this._get("visible")!==e&&(this._set("visible",e),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(e,t){return!!t.visibility}set layer(e){this._set("layer",e),this.sublayers&&this.sublayers.forEach(t=>t.layer=e)}_fetchService(e,t){return x(e,this.layer.outSpatialReference,this.layer.refreshInterval,t).then(r=>E(r.data))}};s([i()],o.prototype,"description",void 0),s([i()],o.prototype,"id",void 0),s([i({readOnly:!0,value:null})],o.prototype,"networkLink",void 0),s([i({json:{write:{allowNull:!0}}})],o.prototype,"parent",void 0),s([i({type:b.ofType(u),json:{write:{allowNull:!0}}})],o.prototype,"sublayers",void 0),s([i({value:null,json:{read:{source:"name",reader:e=>F(e)}}})],o.prototype,"title",void 0),s([i({value:!0})],o.prototype,"visible",null),s([p("visible",["visibility"])],o.prototype,"readVisible",null),s([i()],o.prototype,"sourceJSON",void 0),s([i({value:null})],o.prototype,"layer",null),s([i({type:d})],o.prototype,"fullExtent",void 0),o=u=s([S("esri.layers.support.KMLSublayer")],o);const L=o,q=["kml","xml"];let a=class extends I(R(C(J(K(N(V)))))){constructor(...e){super(...e),this._visibleFolders=[],this.allSublayers=new P({getCollections:()=>[this.sublayers],getChildrenFunction:t=>t.sublayers}),this.outSpatialReference=w.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.addHandles([m(()=>this.sublayers,(e,t)=>{t&&t.forEach(r=>{r.parent=null,r.layer=null}),e&&e.forEach(r=>{r.parent=this,r.layer=this})},y),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))])}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}readSublayersFromItemOrWebMap(e,t){this._visibleFolders=t.visibleFolders}readSublayers(e,t,r){return k(L,t,r,this._visibleFolders)}writeSublayers(e,t){const r=[],l=e.toArray();for(;l.length;){const n=l[0];n.networkLink||(n.visible&&r.push(n.id),n.sublayers&&l.push(...n.sublayers.toArray())),l.shift()}t.visibleFolders=r}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?T(this.url,q)||"KML":e||""}set title(e){this._set("title",e)}get visibleSublayers(){const e=this.sublayers,t=[],r=l=>{l.visible&&(t.push(l),l.sublayers&&l.sublayers.forEach(r))};return e&&e.forEach(r),t}get fullExtent(){return this._recomputeFullExtent()}load(e){const t=h(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"],supportsData:!1},e).catch(z).then(()=>this._fetchService(t))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(e){const t=await Promise.resolve().then(()=>this.resourceInfo?{ssl:!1,data:this.resourceInfo}:x(this.url??"",this.outSpatialReference,this.refreshInterval,e)),r=E(t.data);r&&this.read(r,{origin:"service"})}_recomputeFullExtent(){let e=null;h(this.extent)&&(e=this.extent.clone());const t=r=>{if(r.sublayers)for(const l of r.sublayers.items)t(l),l.visible&&l.fullExtent&&(h(e)?e.union(l.fullExtent):e=l.fullExtent.clone())};return t(this),e}};s([i({readOnly:!0})],a.prototype,"allSublayers",void 0),s([i({type:w})],a.prototype,"outSpatialReference",void 0),s([i({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],a.prototype,"path",void 0),s([i({readOnly:!0,json:{read:!1,write:!1}})],a.prototype,"legendEnabled",void 0),s([i({type:["show","hide","hide-children"]})],a.prototype,"listMode",void 0),s([i({type:["KML"]})],a.prototype,"operationalLayerType",void 0),s([i({})],a.prototype,"resourceInfo",void 0),s([i({type:b.ofType(L),json:{write:{ignoreOrigin:!0}}})],a.prototype,"sublayers",void 0),s([p(["web-map","portal-item"],"sublayers",["visibleFolders"])],a.prototype,"readSublayersFromItemOrWebMap",null),s([p("service","sublayers",["sublayers"])],a.prototype,"readSublayers",null),s([A("sublayers")],a.prototype,"writeSublayers",null),s([i({readOnly:!0,json:{read:!1}})],a.prototype,"type",void 0),s([i({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],a.prototype,"title",null),s([i(H)],a.prototype,"url",void 0),s([i({readOnly:!0})],a.prototype,"visibleSublayers",null),s([i({type:d})],a.prototype,"extent",void 0),s([i()],a.prototype,"fullExtent",null),a=s([S("esri.layers.KMLLayer")],a);const U=a;export{U as default};

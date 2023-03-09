import{af as w,ag as y,ah as I,ai as V,a6 as v,aj as H,j as p,ak as c,al as T,am as o,an as g,ao as q}from"./index-5be327fa.js";import"./MagnifierPrograms-e4fddd1a.js";import"./Container-abf16040.js";import"./BufferPool-0528d3b4.js";import"./color-07427e33.js";import"./WGLContainer-2eecf7ee.js";import"./Texture-0acc3c7f.js";import"./ProgramTemplate-871ef44b.js";import"./MaterialKey-f3e0d2fe.js";import"./utils-86ca6992.js";import"./VertexArrayObject-6cdb6ff4.js";import"./OrderIndependentTransparency-336d0b80.js";import"./floatRGBA-b5760baa.js";import"./webgl-debug-b1f7a2c5.js";import{a as U}from"./GraphicsView2D-4f243c71.js";import"./AttributeStoreView-9147237c.js";import"./earcut-61f7b102.js";import"./vec3f32-ad1dc57f.js";import{t as Q,o as f,n as d}from"./imageUtils-0446a7b3.js";import{f as S,u as b}from"./LayerView-87c40c57.js";import{n as C}from"./HighlightGraphicContainer-2d1ea4b8.js";import{i as k}from"./RefreshableLayerView-a2afedda.js";import{P as F,S as P,a as G}from"./drapedUtils-b9d113cb.js";import"./_commonjsHelpers-2f3e7994.js";import"./ExpandedCIM-99ff4391.js";import"./BidiEngine-836b7ef6.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-95d000c1.js";import"./rasterizingUtils-5f9266e9.js";import"./GeometryUtils-dd03fc25.js";import"./imageutils-31414487.js";import"./Matcher-52fe3d1e.js";import"./visualVariablesUtils-d12a4ac4.js";import"./visualVariablesUtils-09f66a0f.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-eba779fd.js";import"./devEnvironmentUtils-5002a058.js";import"./CircularArray-08cee32d.js";import"./ComputedAttributeStorage-aedfbce9.js";import"./arcadeTimeUtils-e22e7151.js";import"./executionError-fb3f283a.js";import"./centroid-23d4a258.js";import"./config-1337d16e.js";import"./basicInterfaces-b7051eb1.js";import"./normalizeUtilsSync-a4aa398f.js";import"./projectionSupport-7ddc688f.js";import"./json-48e3ea08.js";import"./schemaUtils-19a5f5ac.js";import"./util-3f742baf.js";import"./TiledDisplayObject-95ae21d2.js";import"./BitmapTileContainer-6ded9215.js";import"./Bitmap-f6ecf140.js";import"./TileContainer-3757efda.js";import"./BaseGraphicContainer-75c07d45.js";import"./FeatureContainer-f46fd607.js";import"./scaleUtils-f6e83fa8.js";import"./floorFilterUtils-080a7cd2.js";import"./sublayerUtils-a65f1a73.js";import"./popupUtils-fb92d4f7.js";const R=[0,0];let h=class extends k(Q(S(b))){constructor(){super(...arguments),this._fetchQueue=null,this._highlightGraphics=new w,this._highlightView=null,this._popupHighlightHelper=null,this._tileStrategy=null,this.layer=null}get resampling(){return!("resampling"in this.layer)||this.layer.resampling!==!1}update(t){var e;this._fetchQueue.pause(),this._fetchQueue.state=t.state,this._tileStrategy.update(t),this._fetchQueue.resume(),(e=this._highlightView)==null||e.processUpdate(t)}attach(){const t="tileServers"in this.layer?this.layer.tileServers:null;if(this._tileInfoView=new y(this.layer.tileInfo,this.layer.fullExtent),this._fetchQueue=new I({tileInfoView:this._tileInfoView,concurrency:t&&10*t.length||10,process:(e,i)=>this.fetchTile(e,i)}),this._tileStrategy=new V({cachePolicy:"keep",resampling:this.resampling,acquireTile:e=>this.acquireTile(e),releaseTile:e=>this.releaseTile(e),tileInfoView:this._tileInfoView}),F(this,this.layer)){const e=this._highlightView=new U({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new C(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1});this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new P({createFetchPopupFeaturesQueryGeometry:(i,r)=>G(i,r,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(i,r)=>{e.graphicUpdateHandler({graphic:i,property:r})},layerView:this,updatingHandles:this.updatingHandles})}this.requestUpdate(),this.addAttachHandles(v(()=>this.resampling,()=>{this.doRefresh()})),super.attach()}detach(){var t;super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),(t=this._popupHighlightHelper)==null||t.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._popupHighlightHelper=null}async fetchPopupFeatures(t,e){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(t,e):[]}highlight(t){return this._popupHighlightHelper?this._popupHighlightHelper.highlight(t):{remove(){}}}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(t){var e;return H((e=this.layer.tileInfo)==null?void 0:e.spatialReference,t)}async doRefresh(){!this.attached||this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(t=>this._enqueueTileFetch(t)))}isUpdating(){var t;return((t=this._fetchQueue)==null?void 0:t.updating)??!1}acquireTile(t){const e=this._bitmapView.createTile(t),i=e.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(R,e.key),i.resolution=this._tileInfoView.getTileResolution(e.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(e),this._bitmapView.addChild(e),this.requestUpdate(),e}releaseTile(t){this._fetchQueue.abort(t.key.id),this._bitmapView.removeChild(t),t.once("detach",()=>t.destroy()),this.requestUpdate()}async fetchTile(t,e={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:r,resamplingLevel:n=0}=e;if(!i)try{return await this._fetchImage(t,r)}catch(s){if(!p(s)&&!this.resampling)return f(this._tileInfoView.tileInfo.size);if(n<3){const u=this._tileInfoView.getTileParentId(t.id);if(u){const m=new c(u),_=await this.fetchTile(m,{...e,resamplingLevel:n+1});return d(this._tileInfoView,_,m,t)}}throw s}const a=new c(0,0,0,0);let l;try{if(await i.fetchAvailabilityUpsample(t.level,t.row,t.col,a,{signal:r}),a.level!==t.level&&!this.resampling)return f(this._tileInfoView.tileInfo.size);l=await this._fetchImage(a,r)}catch(s){if(p(s))throw s;l=await this._fetchImage(t,r)}return this.resampling?d(this._tileInfoView,l,a,t):l}async _enqueueTileFetch(t){if(!this._fetchQueue.has(t.key.id)){try{const e=await this._fetchQueue.push(t.key);t.bitmap.source=e,t.bitmap.width=this._tileInfoView.tileInfo.size[0],t.bitmap.height=this._tileInfoView.tileInfo.size[1],t.once("attach",()=>this.requestUpdate())}catch(e){p(e)||T.getLogger(this.declaredClass).error(e)}this.requestUpdate()}}async _fetchImage(t,e){return this.layer.fetchImageBitmapTile(t.level,t.row,t.col,{signal:e})}};o([g()],h.prototype,"_fetchQueue",void 0),o([g()],h.prototype,"resampling",null),h=o([q("esri.views.2d.layers.TileLayerView2D")],h);const At=h;export{At as default};

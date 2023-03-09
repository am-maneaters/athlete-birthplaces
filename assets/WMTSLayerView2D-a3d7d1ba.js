import{ag as w,ah as g,ai as I,a6 as S,ak as p,j as n,aj as d,al as T,am as o,an as m,ao as V}from"./index-5be327fa.js";import{t as v,n as y}from"./imageUtils-0446a7b3.js";import{f as q,u as x}from"./LayerView-87c40c57.js";import{i as M}from"./RefreshableLayerView-a2afedda.js";import"./BitmapTileContainer-6ded9215.js";import"./Bitmap-f6ecf140.js";import"./Container-abf16040.js";import"./Texture-0acc3c7f.js";import"./TiledDisplayObject-95ae21d2.js";import"./WGLContainer-2eecf7ee.js";import"./VertexArrayObject-6cdb6ff4.js";import"./color-07427e33.js";import"./ProgramTemplate-871ef44b.js";import"./MaterialKey-f3e0d2fe.js";import"./utils-86ca6992.js";import"./config-1337d16e.js";import"./GeometryUtils-dd03fc25.js";import"./earcut-61f7b102.js";import"./TileContainer-3757efda.js";const R=[102113,102100,3857,3785,900913],Q=[0,0];let r=class extends M(v(q(x))){constructor(){super(...arguments),this._tileStrategy=null,this._fetchQueue=null,this._tileRequests=new Map,this.layer=null}get tileMatrixSet(){const e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(e.id!==this.layer.activeLayer.tileMatrixSetId&&(this.layer.activeLayer.tileMatrixSetId=e.id),e):null}update(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume()}attach(){var t;const e=(t=this.tileMatrixSet)==null?void 0:t.tileInfo;e&&(this._tileInfoView=new w(e),this._fetchQueue=new g({tileInfoView:this._tileInfoView,concurrency:16,process:(i,s)=>this.fetchTile(i,s)}),this._tileStrategy=new I({cachePolicy:"keep",resampling:!0,acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),tileInfoView:this._tileInfoView}),this.addAttachHandles(S(()=>{var i,s;return[(s=(i=this.layer)==null?void 0:i.activeLayer)==null?void 0:s.styleId,this.tileMatrixSet]},()=>this._refresh())),super.attach())}detach(){var e,t;super.detach(),(e=this._tileStrategy)==null||e.destroy(),(t=this._fetchQueue)==null||t.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(Q,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(t),this._bitmapView.addChild(t),this.requestUpdate(),t}async doRefresh(){!this.attached||this.updateRequested||this.suspended||this._refresh()}isUpdating(){var e;return((e=this._fetchQueue)==null?void 0:e.updating)??!1}async fetchTile(e,t={}){const i="tilemapCache"in this.layer?this.layer.tilemapCache:null,{signal:s,resamplingLevel:a=0}=t;if(!i)return this._fetchImage(e,s);const l=new p(0,0,0,0);let u;try{await i.fetchAvailabilityUpsample(e.level,e.row,e.col,l,{signal:s}),u=await this._fetchImage(l,s)}catch(h){if(n(h))throw h;if(a<3){const c=this._tileInfoView.getTileParentId(e.id);if(c){const f=new p(c),_=await this.fetchTile(f,{...t,resamplingLevel:a+1});return y(this._tileInfoView,_,f,e)}}throw h}return y(this._tileInfoView,u,l,e)}canResume(){const e=super.canResume();return e&&this.tileMatrixSet!==null}supportsSpatialReference(e){var t;return((t=this.layer.activeLayer.tileMatrixSets)==null?void 0:t.some(i=>{var s;return d((s=i.tileInfo)==null?void 0:s.spatialReference,e)}))??!1}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.once("attach",()=>this.requestUpdate())}catch(t){n(t)||T.getLogger(this.declaredClass).error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:t})}_refresh(){this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(e=>{if(!e.bitmap.source)return;const t={id:e.key.id,fulfilled:!1,promise:this._fetchQueue.push(e.key).then(i=>{e.bitmap.source=i}).catch(i=>{n(i)||(e.bitmap.source=null)}).finally(()=>{e.requestRender(),t.fulfilled=!0})};this._tileRequests.set(e,t)})}_getTileMatrixSetBySpatialReference(e){const t=this.view.spatialReference;if(!e.tileMatrixSets)return null;let i=e.tileMatrixSets.find(s=>{var a;return d((a=s.tileInfo)==null?void 0:a.spatialReference,t)});return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(s=>{var a;return R.includes(((a=s.tileInfo)==null?void 0:a.spatialReference.wkid)??-1)})),i}};o([m()],r.prototype,"_fetchQueue",void 0),o([m({readOnly:!0})],r.prototype,"tileMatrixSet",null),r=o([V("esri.views.2d.layers.WMTSLayerView2D")],r);const K=r;export{K as default};

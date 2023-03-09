import{am as a,an as l,au as p,ao as d,ae as V,a6 as y,av as h,aw as w,t as o}from"./index-5be327fa.js";import{r as v}from"./GroupContainer-3f33703e.js";import{u,f as b}from"./LayerView-87c40c57.js";import"./WGLContainer-2eecf7ee.js";import"./VertexArrayObject-6cdb6ff4.js";import"./Texture-0acc3c7f.js";import"./color-07427e33.js";import"./ProgramTemplate-871ef44b.js";import"./MaterialKey-f3e0d2fe.js";import"./utils-86ca6992.js";import"./config-1337d16e.js";import"./GeometryUtils-dd03fc25.js";import"./Container-abf16040.js";import"./earcut-61f7b102.js";let t=class extends u{constructor(i){super(i),this.type="group",this.layerViews=new V}_allLayerViewVisibility(i){this.layerViews.forEach(e=>{e.visible=i})}initialize(){this.handles.add([this.layerViews.on("change",i=>this._layerViewsChangeHandler(i)),y(()=>this.layer.visibilityMode,()=>this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(null)),h),y(()=>this.visible,i=>{this._applyVisibility(()=>this._allLayerViewVisibility(i),()=>{})},h)],"grouplayerview"),this._layerViewsChangeHandler({target:null,added:this.layerViews.toArray(),removed:[],moved:[]})}set layerViews(i){this._set("layerViews",w(i,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((i,e)=>i+e.updatingProgress,0)/this.layerViews.length}isUpdating(){return this.layerViews.some(i=>i.updating)}_hasLayerViewVisibleOverrides(){return this.layerViews.some(i=>i._isOverridden("visible"))}_findLayerViewForLayer(i){return i&&this.layerViews.find(e=>e.layer===i)}_firstVisibleOnLayerOrder(){const i=this.layer.layers.find(e=>{var s;return!!((s=this._findLayerViewForLayer(e))!=null&&s.visible)});return i&&this._findLayerViewForLayer(i)}_applyExclusiveVisibility(i){o(i)&&(i=this._firstVisibleOnLayerOrder(),o(i)&&this.layerViews.length>0&&(i=this._findLayerViewForLayer(this.layer.layers.getItemAt(0)))),this.layerViews.forEach(e=>{e.visible=e===i})}_layerViewsChangeHandler(i){this.handles.remove("grouplayerview:visible"),this.handles.add(this.layerViews.map(s=>y(()=>s.visible,r=>this._applyVisibility(()=>{r!==this.visible&&(s.visible=this.visible)},()=>this._applyExclusiveVisibility(r?s:null)),h)).toArray(),"grouplayerview:visible");const e=i.added[i.added.length-1];this._applyVisibility(()=>this._allLayerViewVisibility(this.visible),()=>this._applyExclusiveVisibility(e!=null&&e.visible?e:null))}_applyVisibility(i,e){var s,r;this._hasLayerViewVisibleOverrides()&&(((s=this.layer)==null?void 0:s.visibilityMode)==="inherited"?i():((r=this.layer)==null?void 0:r.visibilityMode)==="exclusive"&&e())}};a([l({cast:p})],t.prototype,"layerViews",null),a([l({readOnly:!0})],t.prototype,"updatingProgress",null),a([l()],t.prototype,"view",void 0),t=a([d("esri.views.layers.GroupLayerView")],t);const c=t;let n=class extends b(c){constructor(){super(...arguments),this.container=new v}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(i){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((i,e)=>this.container.addChildAt(i.container,e))}};n=a([d("esri.views.2d.layers.GroupLayerView2D")],n);const M=n;export{M as default};

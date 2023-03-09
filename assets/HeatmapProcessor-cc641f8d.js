import{am as _,ao as F,d1 as S,r as U,b6 as f,mT as v,aL as E}from"./index-5be327fa.js";import{p as O}from"./BaseProcessor-0ca65969.js";import{o}from"./tileUtils-c2f19f52.js";class n{constructor(t,i){this.offset=t,this.extent=i}}function g(s){const t=s.key,i=new Map,a=256,e=E,r=s.tileInfoView.tileInfo.isWrappable;return i.set(o(t,-1,-1,r).id,new n([-e,-e],[e-a,e-a,e,e])),i.set(o(t,0,-1,r).id,new n([0,-e],[0,e-a,e,e])),i.set(o(t,1,-1,r).id,new n([e,-e],[0,e-a,a,e])),i.set(o(t,-1,0,r).id,new n([-e,0],[e-a,0,e,e])),i.set(o(t,1,0,r).id,new n([e,0],[0,0,a,e])),i.set(o(t,-1,1,r).id,new n([-e,e],[e-a,0,e,a])),i.set(o(t,0,1,r).id,new n([0,e],[0,0,e,a])),i.set(o(t,1,1,r).id,new n([e,e],[0,0,a,a])),i}let c=class extends O{constructor(){super(...arguments),this.type="heatmap",this._tileKeyToFeatureSets=new Map}initialize(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))])}async update(s,t){const i=t.schema.processors[0];i.type==="heatmap"&&S(this._schema,i)&&(s.mesh=!0,this._schema=i)}onTileUpdate(s){for(const t of s.removed)this._tileKeyToFeatureSets.delete(t.key.id)}onTileClear(s){const t={clear:!0};return this._tileKeyToFeatureSets.delete(s.key.id),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:s.id,data:t})}async onTileMessage(s,t,i){this._tileKeyToFeatureSets.has(s.key.id)||this._tileKeyToFeatureSets.set(s.key.id,new Map);const a=this._tileKeyToFeatureSets.get(s.key.id);if(a&&U(t.addOrUpdate)&&t.addOrUpdate.hasFeatures&&a.set(t.addOrUpdate.instance,t),t.end){const e=[],r=g(s);this._tileKeyToFeatureSets.forEach((m,d)=>{if(d===s.key.id)m.forEach(l=>f(l.addOrUpdate,h=>e.push(h)));else if(r.has(d)){const l=r.get(d),[h,T]=l.offset;m.forEach(w=>f(w.addOrUpdate,k=>{const K=k.transform(h,T,1,1);e.push(K)}))}});const p=v(e,this._schema.mesh,512,512),u={tileKey:s.key.id,intensityInfo:p},y=[p.matrix];return this.remoteClient.invoke("tileRenderer.onTileData",u,{...i,transferList:y})}}onTileError(s,t,i){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:s.id,error:t},i)}};c=_([F("esri.views.2d.layers.features.processors.HeatmapProcessor")],c);const b=c;export{b as default};

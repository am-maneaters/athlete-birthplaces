import{am as s,ao as a,b4 as o}from"./index-8fbc1f4a.js";import{T as d}from"./color-0cdbba8e.js";import{n as h}from"./BaseGraphicContainer-d069d938.js";let t=class extends h{doRender(e){e.drawPhase===d.HIGHLIGHT&&super.doRender(e)}renderChildren(e){if(this.attributeView.update(),!this.children.some(n=>n.hasData))return;this.attributeView.bindTextures(e.context),super.renderChildren(e);const{painter:i}=e,r=i.effects.highlight;r.bind(e),e.context.setColorMask(!0,!0,!0,!0),e.context.clear(o.COLOR_BUFFER_BIT),this._renderChildren(e,r.defines.concat(["highlightAll"])),r.draw(e),r.unbind()}};t=s([a("esri.views.2d.layers.support.HighlightGraphicContainer")],t);const u=t;export{u as n};
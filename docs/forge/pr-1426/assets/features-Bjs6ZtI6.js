import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,t as n}from"./lit-html-SpIZ5SkX.js";import{T as r,v as i,y as a}from"./iframe-Bgb4QAnH.js";import{N as o,t as s}from"./dist-19HqaCjJ.js";import{c,d as l,h as u,p as d,r as f}from"./async-directive-Beo_QdOI.js";import{Ft as ee,P as te,_t as ne,bt as re,ct as ie,dt as ae,en as oe,ft as se,gt as ce,hn as le,ht as ue,lt as de,mt as fe,pt as pe,t as p,ut as me,vt as he,yt as ge}from"./tyler-icons-D6M2os7k.js";import{n as m,t as h}from"./consume-BHg1TYBx.js";import{r as _e,t as ve}from"./if-defined-B1ve8lTA.js";import{r as ye,t as be}from"./live-Biq9EH_c.js";import{n as g,t as _}from"./tslib.es6-2OK4V6AF.js";import{D as xe,S as Se,T as v,_ as Ce,a as y,h as we,i as Te,o as b,t as Ee}from"./static-html-CTeCrd_V.js";import{C as De,D as x,E as S,S as Oe,T as ke,_ as Ae,a as je,b as Me,c as Ne,d as Pe,f as Fe,g as Ie,h as Le,i as C,l as Re,m as ze,n as Be,o as w,p as Ve,r as He,s as T,u as Ue,v as We,w as Ge,x as Ke,y as qe}from"./esm-DpgME0Vl.js";var E;function D(){return(D=e((()=>{i(),E=r`
  :host {
    display: contents;
  }
`})))()}var Je,O,k;function A(){return(A=e((()=>{g(),m(),b(),i(),f(),be(),D(),Be(),s(),O=`forge-rte-tool-button`,k=class extends a{constructor(){super(...arguments),this.label=`Tool`,this.disabled=!1,this.active=!1,this.noToggle=!1,this.controlsElement=null}static{Je=o}static{this[Je]=O}static{Se()}static{this.styles=E}connectedCallback(){super.connectedCallback(),this._toolbarFocus?.requestSync()}disconnectedCallback(){let e=this._toolbarFocus;super.disconnectedCallback(),e?.requestSync()}updated(e){super.updated(e),e.has(`disabled`)&&this._toolbarFocus?.requestSync(),e.has(`controlsElement`)&&this._iconButton&&`ariaControlsElements`in this._iconButton&&(this._iconButton.ariaControlsElements=this.controlsElement?[this.controlsElement]:null)}render(){return t`
      <forge-icon-button
        shape="squared"
        density="medium"
        ?toggle=${!this.noToggle}
        ?pressed=${!this.noToggle&&this.active}
        @forge-icon-button-toggle=${this._toggle}
        @click=${this.#t}
        @pointerdown=${this.#n}
        @keydown=${this.#r}
        ?disabled=${this.disabled}
        tabindex=${this.disabled?n:ye(this.#e)}
        aria-label=${this.label}
        aria-keyshortcuts=${this.keyboardShortcut||``}>
        <forge-icon .name=${this.icon}></forge-icon>
        <forge-icon slot="on" .name=${this.icon}></forge-icon>
      </forge-icon-button>
    `}get#e(){return!this._toolbarFocus||this._toolbarFocus.isTabStop(this)?`0`:`-1`}focus(e){this._iconButton?.focus(e)}async _toggle(e){e.preventDefault(),this.dispatchEvent(new CustomEvent(`forge-rte-tool-toggle`,{detail:e.detail}))}#t(){this.noToggle&&this.dispatchEvent(new CustomEvent(`forge-rte-tool-toggle`,{detail:!1}))}#n(e){e.preventDefault()}#r(e){(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),e.target.click())}},_([d()],k.prototype,`label`,void 0),_([d()],k.prototype,`icon`,void 0),_([d({type:Boolean})],k.prototype,`disabled`,void 0),_([d({type:Boolean})],k.prototype,`active`,void 0),_([d({attribute:`keyboard-shortcut`})],k.prototype,`keyboardShortcut`,void 0),_([d({type:Boolean,attribute:`no-toggle`})],k.prototype,`noToggle`,void 0),_([d({attribute:!1})],k.prototype,`controlsElement`,void 0),_([c(`forge-icon-button`)],k.prototype,`_iconButton`,void 0),_([l(),h({context:He,subscribe:!0})],k.prototype,`_toolbarFocus`,void 0),k=_([u(O)],k)})))()}var Ye,Xe,j;function M(){return(M=e((()=>{g(),m(),b(),p(),i(),f(),s(),x(),w(),D(),A(),Xe=`forge-rte-align`,j=class extends a{constructor(){super(...arguments),this.leftLabel=`Align Left`,this.centerLabel=`Align Center`,this.rightLabel=`Align Right`,this.justifyLabel=`Justify`,this.extensions=C.align}static{Ye=o}static{this[Ye]=Xe}static{v.define([me,ie,ae,de])}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(`left`)}
        label=${this.leftLabel}
        icon=${me.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({textAlign:`left`})}></forge-rte-tool-button>
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(`center`)}
        label=${this.centerLabel}
        icon=${ie.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({textAlign:`center`})}></forge-rte-tool-button>
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(`right`)}
        label=${this.rightLabel}
        icon=${ae.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({textAlign:`right`})}></forge-rte-tool-button>
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(`justify`)}
        label=${this.justifyLabel}
        icon=${de.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({textAlign:`justify`})}></forge-rte-tool-button>
    `}async _toggle(e){try{let t=this._editorContext.isActive({textAlign:e}),n=this._editorContext.editor?.chain().focus().toggleTextAlign(e).run();n&&!t?this._editorContext.announce({left:`Left aligned`,center:`Center aligned`,right:`Right aligned`,justify:`Justified`}[e]):n||console.warn(`[RTE Align] Command execution failed for ${e}`)}catch(t){console.error(`[RTE Align] Error toggling ${e} alignment:`,t)}}},_([d({type:String,attribute:`left-label`})],j.prototype,`leftLabel`,void 0),_([d({type:String,attribute:`center-label`})],j.prototype,`centerLabel`,void 0),_([d({type:String,attribute:`right-label`})],j.prototype,`rightLabel`,void 0),_([d({type:String,attribute:`justify-label`})],j.prototype,`justifyLabel`,void 0),_([l(),h({context:S,subscribe:!0})],j.prototype,`_editorContext`,void 0),j=_([u(Xe)],j)})))()}var Ze,N,P;function Qe(){return(Qe=e((()=>{g(),m(),Ke(),b(),p(),i(),f(),s(),x(),w(),D(),A(),N=`forge-rte-bold`,P=class extends a{constructor(){super(...arguments),this.label=`Bold`,this.extensions=C.bold}static{Ze=o}static{this[Ze]=N}static{v.define(se)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${se.name}
        keyboard-shortcut="Control+B"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Me.name)}></forge-rte-tool-button>
    `}async _toggle(e){try{let e=this._editorContext.isActive(Me.name);if(this._editorContext.editor?.chain().focus().toggleBold().run()){let t=e?`Bold removed`:`Bold applied`;this._editorContext.announce(t)}else console.warn(`[RTE Bold] Command execution failed`)}catch(e){console.error(`[RTE Bold] Error toggling bold:`,e)}}},_([d({type:String})],P.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],P.prototype,`_editorContext`,void 0),P=_([u(N)],P)})))()}var $e,et,F;function tt(){return(tt=e((()=>{g(),m(),Pe(),b(),p(),i(),f(),s(),x(),w(),D(),A(),et=`forge-rte-bullet-list`,F=class extends a{constructor(){super(...arguments),this.label=`Bullet List`,this.extensions=C[`bullet-list`]}static{$e=o}static{this[$e]=et}static{v.define(ne)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${ne.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Re.name)}></forge-rte-tool-button>
    `}_toggle(e){try{let e=this._editorContext.isActive(Re.name);if(this._editorContext.editor?.chain().focus().toggleBulletList().run()){let t=e?`List removed`:`Bullet list`;this._editorContext.announce(t)}else console.warn(`[RTE BulletList] Command execution failed`)}catch(e){console.error(`[RTE BulletList] Error toggling bullet list:`,e)}}},_([d({type:String})],F.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],F.prototype,`_editorContext`,void 0),F=_([u(et)],F)})))()}var nt,rt,I;function it(){return(it=e((()=>{g(),m(),Ve(),b(),p(),i(),f(),s(),x(),w(),D(),A(),rt=`forge-rte-code`,I=class extends a{constructor(){super(...arguments),this.label=Fe.name,this.extensions=C.code}static{nt=o}static{this[nt]=rt}static{v.define(te)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${te.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Fe.name)}></forge-rte-tool-button>
    `}async _toggle(e){try{let e=this._editorContext.isActive(Fe.name);if(this._editorContext.editor?.chain().focus().toggleCode().run()){let t=e?`Code removed`:`Code applied`;this._editorContext.announce(t)}else console.warn(`[RTE Code] Command execution failed`)}catch(e){console.error(`[RTE Code] Error toggling code:`,e)}}},_([d({type:String})],I.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],I.prototype,`_editorContext`,void 0),I=_([u(rt)],I)})))()}var at,L,R;function z(){return(z=e((()=>{g(),b(),i(),f(),D(),s(),L=`forge-rte-divider`,R=class extends a{static{at=o}static{this[at]=L}static{we()}static{this.styles=[E,r`
      forge-divider {
        height: 24px;
      }
    `]}render(){return t`<forge-divider vertical part="forge-divider" exportparts="root:forge-divider-root"></forge-divider>`}},R=_([u(L)],R)})))()}var ot,B,V;function H(){return(H=e((()=>{g(),m(),b(),p(),i(),f(),s(),x(),w(),D(),A(),B=`forge-rte-heading`,V=class extends a{constructor(){super(...arguments),this.h1Label=`Heading 1`,this.h2Label=`Heading 2`,this.h3Label=`Heading 3`,this.extensions=C.heading}static{ot=o}static{this[ot]=B}static{v.define([pe,fe,ue])}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(1)}
        label=${this.h1Label}
        icon=${pe.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(`heading`,{level:1})}></forge-rte-tool-button>
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(2)}
        label=${this.h2Label}
        icon=${fe.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(`heading`,{level:2})}></forge-rte-tool-button>
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${()=>this._toggle(3)}
        label=${this.h3Label}
        icon=${ue.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(`heading`,{level:3})}></forge-rte-tool-button>
    `}async _toggle(e){try{let t=this._editorContext.isActive(`heading`,{level:e});if(this._editorContext.editor?.chain().focus().toggleHeading({level:e}).run()){let n=t?`Paragraph style`:`Heading ${e}`;this._editorContext.announce(n)}else console.warn(`[RTE Heading] Command execution failed for level ${e}`)}catch(t){console.error(`[RTE Heading] Error toggling heading ${e}:`,t)}}},_([d({type:String,attribute:`h1-label`})],V.prototype,`h1Label`,void 0),_([d({type:String,attribute:`h2-label`})],V.prototype,`h2Label`,void 0),_([d({type:String,attribute:`h3-label`})],V.prototype,`h3Label`,void 0),_([l(),h({context:S,subscribe:!0})],V.prototype,`_editorContext`,void 0),V=_([u(B)],V)})))()}var st,U,W;function G(){return(G=e((()=>{g(),m(),We(),b(),p(),i(),f(),s(),x(),w(),D(),A(),U=`forge-rte-italic`,W=class extends a{constructor(){super(...arguments),this.label=`Italic`,this.extensions=C.italic}static{st=o}static{this[st]=U}static{v.define(ce)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${ce.name}
        keyboard-shortcut="Control+I"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(qe.name)}></forge-rte-tool-button>
    `}_toggle(e){try{let e=this._editorContext.isActive(qe.name);if(this._editorContext.editor?.chain().focus().toggleItalic().run()){let t=e?`Italic removed`:`Italic applied`;this._editorContext.announce(t)}else console.warn(`[RTE Italic] Command execution failed`)}catch(e){console.error(`[RTE Italic] Error toggling italic:`,e)}}},_([d({type:String})],W.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],W.prototype,`_editorContext`,void 0),W=_([u(U)],W)})))()}var ct,K,q;function lt(){return(lt=e((()=>{g(),m(),ke(),Ne(),b(),p(),i(),f(),ve(),x(),w(),D(),De(),s(),A(),K=`forge-rte-link`,q=class extends a{constructor(){super(...arguments),this.label=`Link`,this.autoProtocol=!0,this.extensions=C.link,this._linkUrl=``,this._validationError=``,this._validationWarning=``,this._linkText=``,this._urlTouched=!1,this.#e=``,this.#t=``}static{ct=o}static{this[ct]=K}static{v.define(ee),Ce()}static{this.styles=[E,r`
      .link-popover {
        padding: var(--forge-spacing-medium);
        display: flex;
        flex-direction: column;
        gap: var(--forge-spacing-small);
        min-width: 320px;
      }

      .button-group {
        display: flex;
        gap: var(--forge-spacing-xsmall);
        justify-content: flex-end;
      }

      .warning-message {
        color: var(--forge-theme-warning, #b45309);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `]}#e;#t;firstUpdated(e){this._editorContext?.registerFeature(this)}updated(e){e.has(`_popoverAnchor`)&&this._popoverAnchor&&this.updateComplete.then(()=>{requestAnimationFrame(()=>{let e=this._linkText?this._linkUrlInput:this._linkTextInput;e?.focus(),e?.select()})})}render(){let e=!!this._popoverAnchor&&this._editorContext.isActive(T.name);return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this.#p}
        label=${this.label}
        icon=${ee.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(T.name)}></forge-rte-tool-button>
      <forge-popover .arrow=${!0} .open=${!!this._popoverAnchor} .anchorElement=${this._popoverAnchor} @forge-popover-toggle=${this.#n}>
        <div class="link-popover">
          <forge-text-field density="small" label-position="block-start">
            <label for="link-text">Text to display</label>
            <input id="link-text" type="text" .value=${this._linkText} @input=${this.#i} @keydown=${this.#a} />
          </forge-text-field>
          <forge-text-field density="small" label-position="block-start" .invalid=${!!this._validationError}>
            <label for="link-url">URL</label>
            <input
              id="link-url"
              type="url"
              placeholder="https://example.com"
              .value=${this._linkUrl}
              @input=${this.#r}
              @keydown=${this.#a}
              @blur=${this.#o}
              aria-describedby=${_e(this._validationError?`link-error`:void 0)}
              aria-invalid=${!!this._validationError} />
            ${this._validationError?t`<div id="link-error" slot="support-text">${this._validationError}</div>`:this._validationWarning?t`<div id="link-error" class="warning-message" slot="support-text">${this._validationWarning}</div>`:``}
          </forge-text-field>
          <!-- Kept permanently mounted so screen readers reliably announce content changes -->
          <div class="sr-only" role="alert" aria-atomic="true">${this._validationError}</div>
          <div class="sr-only" role="status" aria-atomic="true">${this._validationWarning}</div>
          <div class="button-group">
            <forge-button variant="tonal" @click=${this.#l} ?disabled=${!!this._validationError}>
              ${e?`Update`:`Apply`}
            </forge-button>
            ${e?t`<forge-button variant="outlined" @click=${this.#u}>Remove Link</forge-button>`:``}
            <forge-button variant="text" @click=${this.#d}>Cancel</forge-button>
          </div>
        </div>
      </forge-popover>
    `}#n(e){e.detail.newState===`closed`&&this.#f()}#r(e){this._linkUrl=e.target.value.trim(),this.#s()}#i(e){this._linkText=e.target.value}#a(e){e.key===`Enter`?(e.preventDefault(),this._validationError||this.#l()):e.key===`Escape`&&(e.preventDefault(),this.#d())}#o(){this._urlTouched=!0,this.#s()}#s(){if(!this._urlTouched||(this._validationError=``,!this._linkUrl))return;let e=2048;if(this._linkUrl.length>e){this._validationError=`URL too long (maximum ${e} characters)`;return}let t=this._linkUrl.toLowerCase().trim();for(let e of Oe)if(t.startsWith(e)){this._validationError=`Invalid protocol. Only http and https URLs are allowed.`;return}try{let e=decodeURIComponent(t);for(let t of Oe)if(e.startsWith(t)){this._validationError=`Invalid protocol detected. Only http and https URLs are allowed.`;return}}catch{this._validationError=`Invalid URL encoding`;return}let n=/[^\x00-\x7F]/.test(this._linkUrl),r=this._linkUrl.includes(`xn--`);if(n||r)this._validationWarning=`Warning: This URL contains international characters. Verify carefully to avoid phishing.`;else if(this._validationWarning=``,!/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*|[?#][^\s]*)?$/.test(this._linkUrl)){this._validationError=`Please enter a valid URL (e.g., https://example.com)`;return}try{let e=this.#c(this._linkUrl),t=new URL(e);if(t.protocol!==`http:`&&t.protocol!==`https:`){this._validationError=`Invalid protocol. Only http and https URLs are allowed.`;return}}catch{this._validationError=`Please enter a valid URL (e.g., https://example.com)`}}#c(e){if(!e)return``;let t=e.trim();return this.autoProtocol&&!t.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:/)?`https://${t}`:t}#l(){if(this._urlTouched=!0,this.#s(),!this._validationError)try{let e=this._editorContext.editor;if(!e)return;if(this._linkUrl){let t=this.#c(this._linkUrl),n=e.isActive(`link`),r=this._linkText!==this.#e,i=e.chain().focus(),a=!1;if(n){let{$head:n}=e.state.selection,a=e.schema.marks[T.name],o=Ge(n,a,{href:this.#t});if(r&&o){let e=this._linkText||t;i=i.insertContentAt(o,e,{updateSelection:!0}).setTextSelection({from:o.from,to:o.from+e.length})}}else{let{from:n,to:a}=e.state.selection;r&&(i=i.insertContentAt({from:n,to:a},this._linkText||t,{updateSelection:!0}).setTextSelection({from:n,to:n+(this._linkText||t).length}))}a=i.setLink({href:t}).run(),a?this._editorContext.announce(n?`Link updated`:`Link added`):console.warn(`[RTE Link] Failed to apply link`)}else e.chain().focus().unsetLink().run()?this._editorContext.announce(`Link removed`):console.warn(`[RTE Link] Failed to remove link`);this.#f()}catch(e){console.error(`[RTE Link] Error applying link:`,e),this.#f()}}#u(){try{this._editorContext.editor?.chain().focus().unsetLink().run()?this._editorContext.announce(`Link removed`):console.warn(`[RTE Link] Failed to remove link`),this.#f()}catch(e){console.error(`[RTE Link] Error removing link:`,e),this.#f()}}#d(){this.#f()}#f(){this._popoverAnchor=void 0,this._linkUrl=``,this._validationError=``,this._validationWarning=``,this._urlTouched=!1}async#p(e){let{x:t,y:n,height:r,width:i}=this.#m();this._popoverAnchor=new xe(t,n,i,r);let a=this._editorContext.editor;if(!a)return;let{href:o}=a?.getAttributes(`link`)??{};this._linkUrl=o??``,this.#t=this._linkUrl;let{from:s,to:c,$head:l}=a.state.selection;if(this._editorContext.isActive(`link`)){let e=a.schema.marks[T.name],t=Ge(l,e,{href:this.#t});this._linkText=t?a.state.doc.textBetween(t.from,t.to,` `):``}else this._linkText=a.state.doc.textBetween(s,c,` `);this.#e=this._linkText}#m(){let e=this._editorContext.editor?.state.selection;if(e&&e.$from&&e.$to){let t=this._editorContext.editor.view.coordsAtPos(e.$from.pos),n=this._editorContext.editor.view.coordsAtPos(e.$to.pos);return{x:t.left,y:t.top,width:n.left-t.left,height:t.bottom-t.top}}return{x:0,y:0,width:0,height:0}}},_([d({type:String})],q.prototype,`label`,void 0),_([d({type:Boolean,attribute:`auto-protocol`})],q.prototype,`autoProtocol`,void 0),_([l(),h({context:S,subscribe:!0})],q.prototype,`_editorContext`,void 0),_([l()],q.prototype,`_popoverAnchor`,void 0),_([l()],q.prototype,`_linkUrl`,void 0),_([l()],q.prototype,`_validationError`,void 0),_([l()],q.prototype,`_validationWarning`,void 0),_([l()],q.prototype,`_linkText`,void 0),_([l()],q.prototype,`_urlTouched`,void 0),_([c(`#link-text`,!0)],q.prototype,`_linkTextInput`,void 0),_([c(`#link-url`,!0)],q.prototype,`_linkUrlInput`,void 0),q=_([u(K)],q)})))()}var ut,J,Y;function dt(){return(dt=e((()=>{g(),m(),Pe(),b(),p(),i(),f(),s(),x(),w(),D(),A(),J=`forge-rte-ordered-list`,Y=class extends a{constructor(){super(...arguments),this.label=`Ordered List`,this.extensions=C[`ordered-list`]}static{ut=o}static{this[ut]=J}static{v.define(he)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${he.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Ue.name)}></forge-rte-tool-button>
    `}_toggle(e){try{let e=this._editorContext.isActive(Ue.name);if(this._editorContext.editor?.chain().focus().toggleOrderedList().run()){let t=e?`List removed`:`Numbered list`;this._editorContext.announce(t)}else console.warn(`[RTE OrderedList] Command execution failed`)}catch(e){console.error(`[RTE OrderedList] Error toggling ordered list:`,e)}}},_([d({type:String})],Y.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],Y.prototype,`_editorContext`,void 0),Y=_([u(J)],Y)})))()}var ft,pt,X;function mt(){return(mt=e((()=>{g(),m(),Ie(),b(),p(),i(),f(),s(),x(),w(),D(),A(),pt=`forge-rte-underline`,X=class extends a{constructor(){super(...arguments),this.label=`Underline`,this.extensions=C.underline}static{ft=o}static{this[ft]=pt}static{v.define(re)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${re.name}
        keyboard-shortcut="Control+U"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Ae.name)}></forge-rte-tool-button>
    `}_toggle(e){try{let e=this._editorContext.isActive(Ae.name);if(this._editorContext.editor?.chain().focus().toggleUnderline().run()){let t=e?`Underline removed`:`Underline applied`;this._editorContext.announce(t)}else console.warn(`[RTE Underline] Command execution failed`)}catch(e){console.error(`[RTE Underline] Error toggling underline:`,e)}}},_([d({type:String})],X.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],X.prototype,`_editorContext`,void 0),X=_([u(pt)],X)})))()}var ht,Z,Q;function gt(){return(gt=e((()=>{g(),m(),Le(),b(),p(),i(),f(),s(),x(),w(),D(),A(),Z=`forge-rte-strike`,Q=class extends a{constructor(){super(...arguments),this.label=`Strikethrough`,this.extensions=C.strike}static{ht=o}static{this[ht]=Z}static{v.define(ge)}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${ge.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(ze.name)}></forge-rte-tool-button>
    `}async _toggle(e){try{let e=this._editorContext.isActive(ze.name);if(this._editorContext.editor?.chain().focus().toggleStrike().run()){let t=e?`Strikethrough removed`:`Strikethrough applied`;this._editorContext.announce(t)}else console.warn(`[RTE Strike] Command execution failed`)}catch(e){console.error(`[RTE Strike] Error toggling strike:`,e)}}},_([d({type:String})],Q.prototype,`label`,void 0),_([l(),h({context:S,subscribe:!0})],Q.prototype,`_editorContext`,void 0),Q=_([u(Z)],Q)})))()}var _t,vt,$;function yt(){return(yt=e((()=>{g(),m(),b(),p(),i(),f(),x(),w(),D(),s(),A(),vt=`forge-rte-undo-redo`,$=class extends a{constructor(){super(...arguments),this.undoLabel=`Undo`,this.redoLabel=`Redo`,this.extensions=C[`undo-redo`]}static{_t=o}static{this[_t]=vt}static{v.define([le,oe])}static{this.styles=E}firstUpdated(e){this._editorContext?.registerFeature(this)}render(){return t`
      <forge-rte-tool-button
        no-toggle
        @forge-rte-tool-toggle=${this.#n}
        label=${this.undoLabel}
        icon=${le.name}
        keyboard-shortcut="Control+Z"
        .controlsElement=${this._editorContext.controlsElement}
        ?disabled=${!this._editorContext.isEditable()||!this.#e()}></forge-rte-tool-button>
      <forge-rte-tool-button
        no-toggle
        @forge-rte-tool-toggle=${this.#r}
        label=${this.redoLabel}
        icon=${oe.name}
        keyboard-shortcut="Control+Shift+Z"
        .controlsElement=${this._editorContext.controlsElement}
        ?disabled=${!this._editorContext.isEditable()||!this.#t()}></forge-rte-tool-button>
    `}#e(){let e=this._editorContext.editor;return!!e&&!e.isDestroyed&&!!e.can().undo()}#t(){let e=this._editorContext.editor;return!!e&&!e.isDestroyed&&!!e.can().redo()}#n(){try{this._editorContext.editor?.chain().focus().undo().run()?this._editorContext.announce(`Undo`):console.warn(`[RTE UndoRedo] Undo command execution failed`)}catch(e){console.error(`[RTE UndoRedo] Error executing undo:`,e)}}#r(){try{this._editorContext.editor?.chain().focus().redo().run()?this._editorContext.announce(`Redo`):console.warn(`[RTE UndoRedo] Redo command execution failed`)}catch(e){console.error(`[RTE UndoRedo] Error executing redo:`,e)}}},_([d({type:String,attribute:`undo-label`})],$.prototype,`undoLabel`,void 0),_([d({type:String,attribute:`redo-label`})],$.prototype,`redoLabel`,void 0),_([l(),h({context:S,subscribe:!0})],$.prototype,`_editorContext`,void 0),$=_([u(vt)],$)})))()}var bt,xt,St,Ct;function wt(){return(wt=e((()=>{g(),i(),Ee(),f(),s(),D(),w(),Qe(),G(),mt(),gt(),tt(),dt(),H(),M(),yt(),z(),xt=`forge-rte-standard-tools`,St=e=>{let t=Te(`forge-rte-${e}`);return y`<${t}></${t}>`},Ct=class extends a{static{bt=o}static{this[bt]=xt}static{this.styles=E}render(){return y`${je.map((e,t)=>y`${t?y`<forge-rte-divider></forge-rte-divider>`:``}${e.map(St)}`)}`}},Ct=_([u(xt)],Ct)})))()}function Tt(){return(Tt=e((()=>{s(),M(),Qe(),tt(),it(),z(),H(),G(),lt(),dt(),wt(),gt(),A(),mt(),yt()})))()}export{Tt as t};
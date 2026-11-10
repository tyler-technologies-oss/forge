import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{T as i,a as ee,g as a,o as te,s as ne}from"./iframe-CbV23-8Y.js";import{d as o,l as re,r as ie,t as s}from"./decorators-DcQFeJ4p.js";import{n as c}from"./when-Daf2bbVy.js";import{C as l,S as u,t as d,x as f}from"./dist-CPhmYI86.js";import{n as p,t as m}from"./base-lit-element-BTojiV2b.js";import{p as h}from"./constants-Bpi-_RbP.js";import{a as g,i as _,o as v,t as y}from"./icon-DTOjPWy9.js";import{t as b}from"./decorate-DvwEnSYK.js";import{Lt as ae,Nt as oe,en as se,fn as ce,n as le,on as ue,r as de,t as x}from"./tyler-icons-kuH1S-j5.js";import{s as S,x as C}from"./utils-B2Tk8obI.js";import{i as w,n as T,t as E}from"./ref-DZ35M6As.js";import{n as fe,t as pe}from"./icon-button-BRvxNmXW.js";import{t as me}from"./icon-button-D4UjEleU.js";import{n as he,t as ge}from"./button-D513iKC3.js";import{t as _e}from"./button-5s54CFRd.js";import{t as ve}from"./app-bar-CngbJV3u.js";import{i as ye,n as be,r as xe}from"./list-CMvX_fMw.js";import{n as Se,t as Ce}from"./popover-zmgHerVR.js";import{t as we}from"./popover-Hn6MwMXG.js";import{a as Te,n as Ee,o as De}from"./avatar-53PLEjkf.js";import{n as Oe,r as ke,t as Ae}from"./toolbar-8xhAwSg5.js";import{n as je,t as Me}from"./divider-DgCL_avI.js";import{t as Ne}from"./divider-OYrn3EVA.js";import{a as Pe,i as Fe,n as Ie,o as Le,r as Re,t as ze}from"./button-toggle-group-D8gkY8xq.js";import{t as Be}from"./profile-link-chEzbm1s.js";function Ve(){let e=window.localStorage.getItem(k);return j.includes(e)?e:`system`}function He(e){window.localStorage.setItem(k,e)}function D(){return window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function O(e){let t=e===`system`?D():e;document.documentElement.setAttribute(A,t),He(e)}var k,A,j;function M(){return(M=e((()=>{k=`.forge-theme`,A=`data-forge-theme`,j=[`light`,`dark`,`system`]})))()}var N;function P(){return(P=e((()=>{N=`:host{--toggle-background:var(--forge-theme-surface-dim,#fafafa);display:contents}.title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading1-font-size-scale,.875)));font-weight:var(--forge-typography-heading1-font-weight,500);line-height:var(--forge-typography-heading1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading1-line-height-scale,1.125)));letter-spacing:var(--forge-typography-heading1-letter-spacing,.0178571em);text-transform:var(--forge-typography-heading1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading1-text-decoration,inherit);text-decoration:var(--forge-typography-heading1-text-decoration,inherit);margin-block-end:var(--forge-spacing-xsmall,8px)}forge-button-toggle-group{--forge-button-toggle-group-height:32px;--forge-button-toggle-group-outline-width:0;--forge-button-toggle-group-shape:calc(var(--forge-shape-large,8px) * var(--forge-shape-factor,1))}forge-button-toggle-group::part(root){background-color:var(--toggle-background)}forge-button-toggle{--forge-button-toggle-color:var(--forge-theme-text-high,#000000de);--forge-button-toggle-selected-color:var(--forge-theme-text-high,#000000de);--forge-button-toggle-selected-background:var(--forge-theme-surface-bright,#fff);--forge-button-toggle-shape:calc(var(--forge-shape-large,8px) * var(--forge-shape-factor,1))}forge-button-toggle[selected]::part(root){position:relative}forge-button-toggle[selected]::part(root):before{content:"";border:1px solid var(--forge-theme-outline-low,#9e9e9e);border-radius:inherit;position:absolute;inset:0}:host(:state(light)){--toggle-background:var(--forge-theme-surface-container-minimum,#f5f5f5)}:host(:state(dark)){--toggle-background:var(--forge-theme-surface-container-low,#ebebeb)}`})))()}var F,I;function L(){return(L=e((()=>{a(),s(),d(),x(),p(),S(),M(),Fe(),ze(),y(),Le(),Re(),g(),P(),F=`forge-theme-toggle`,I=class extends m{static{this[l]=F}static{this[u]=[Ie,Pe,_]}static{v.define([ce,ae,ue])}static{this.styles=i(N)}#e;#t;constructor(){super(),this.groupAriaLabel=`Select a theme`,this._theme=`system`,this.#t=window.matchMedia(`(prefers-color-scheme: dark)`),this.#n=n`<slot name="title" id="theme-toggle-title">Theme</slot>`,this.#r=n`<slot name="light-label" id="light-label-slot">Light</slot>`,this.#i=n`<slot name="dark-label" id="dark-label-slot">Dark</slot>`,this.#a=n`<slot name="system-label" id="system-label-slot">System</slot>`,this.#u=()=>{this._theme===`system`&&this.#s()},this.#e=this.attachInternals(),this._theme=Ve(),O(this._theme),this.#c()}connectedCallback(){super.connectedCallback(),this.#t.addEventListener(`change`,this.#u)}disconnectedCallback(){super.disconnectedCallback(),this.#t.removeEventListener(`change`,this.#u)}#n;#r;#i;#a;render(){return n`
      <div class="title">${this.#n}</div>
      <forge-button-toggle-group aria-label=${this.groupAriaLabel} .value=${this._theme} mandatory @forge-button-toggle-group-change=${this.#o}>
        <forge-button-toggle value="light" id="light-button">
          <forge-icon slot="start" name="wb_sunny"></forge-icon>
          <span>${this.#r}</span>
        </forge-button-toggle>
        <forge-button-toggle value="dark" id="dark-button">
          <forge-icon slot="start" name="moon_waning_crescent"></forge-icon>
          <span>${this.#i}</span>
        </forge-button-toggle>
        <forge-button-toggle value="system" id="system-button">
          <forge-icon slot="start" name="tonality"></forge-icon>
          <span>${this.#a}</span>
        </forge-button-toggle>
      </forge-button-toggle-group>
    `}setTheme(e){this._theme=e,O(this._theme),this.#c()}#o(e){this._theme=e.detail,this.#s()}#s(){O(this._theme),this.#c(),this.#l(this._theme)}#c(){switch(this._theme){case`light`:C(this.#e,`light`,!0),C(this.#e,`dark`,!1);break;case`dark`:C(this.#e,`dark`,!0),C(this.#e,`light`,!1);break;case`system`:{let e=D();C(this.#e,`light`,e===`light`),C(this.#e,`dark`,e===`dark`);break}}}#l(e){let t=e===`system`?D():e,n=new CustomEvent(`forge-theme-toggle-update`,{bubbles:!0,composed:!0,cancelable:!0,detail:{theme:e,resolvedTheme:t}});this.dispatchEvent(n)}#u},b([o({attribute:`group-aria-label`})],I.prototype,`groupAriaLabel`,void 0),b([re()],I.prototype,`_theme`,void 0),f(F,I)})))()}function R(){return(R=e((()=>{h()})))()}function z(){return(z=e((()=>{d(),L(),R()})))()}var B;function V(){return(V=e((()=>{B=`:host{--_popover-avatar-background:var(--forge-avatar-background,var(--forge-theme-secondary-container-low,#fff8e1));--_popover-avatar-color:var(--forge-avatar-color,var(--forge-theme-on-secondary-container-low,#8a6804));display:contents}.sign-in-button{--forge-button-spacing:var(--forge-spacing-xsmall,8px);--forge-button-pill-padding-inline:var(--forge-spacing-xsmall,8px);--forge-button-outlined-color:var(--forge-theme-on-brand,#fff);--forge-button-outlined-border-color:var(--forge-theme-on-brand,#fff);--forge-button-outlined-background:color-mix(in srgb, var(--forge-theme-on-brand,#fff) 16%, transparent)}.user-info-container{gap:var(--forge-spacing-medium,16px);padding:var(--forge-spacing-medium,16px);grid-template-columns:56px 1fr;align-items:center;display:grid}.popover-avatar{--forge-avatar-size:56px;--forge-avatar-shape:calc(var(--forge-shape-extra-large,16px) * var(--forge-shape-factor,1));--forge-avatar-background:var(--_popover-avatar-background);--forge-avatar-color:var(--_popover-avatar-color)}.popover-avatar::part(root){font-size:calc(var(--forge-avatar-size) * .4)}.user-info{flex-direction:column;display:flex}.full-name{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading2-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-heading2-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading2-font-size-scale,1)));font-weight:var(--forge-typography-heading2-font-weight,500);line-height:var(--forge-typography-heading2-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-heading2-line-height-scale,1.25)));letter-spacing:var(--forge-typography-heading2-letter-spacing,.0125em);text-transform:var(--forge-typography-heading2-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-heading2-text-decoration,inherit);text-decoration:var(--forge-typography-heading2-text-decoration,inherit)}.email{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family,var(--forge-typography-font-family,"Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-font-size-scale,.875)));font-weight:var(--forge-typography-body1-font-weight,400);line-height:var(--forge-typography-body1-line-height,calc(var(--forge-typography-font-size,1rem) * var(--forge-typography-body-line-height-scale,1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing,.0357143em);text-transform:var(--forge-typography-body1-text-transform,inherit);-webkit-text-decoration:var(--forge-typography-body1-text-decoration,inherit);text-decoration:var(--forge-typography-body1-text-decoration,inherit)}.theme-toggle-container{padding:var(--forge-spacing-medium,16px)}.sign-out-button{--forge-button-color:var(--forge-theme-text-high,#000000de)}`})))()}var H,U;function W(){return(W=e((()=>{a(),s(),E(),d(),x(),p(),S(),Ee(),_e(),Ne(),me(),y(),be(),we(),Ae(),z(),M(),De(),he(),je(),fe(),g(),ye(),Se(),ke(),L(),V(),H=`forge-user-profile`,U=class extends m{static{this[l]=H}static{this[u]=[Te,ge,Me,pe,_,xe,Ce,Oe,I]}static{v.define([oe,de])}static{this.styles=i(B)}#e;#t;#n;#r;#i;#a;#o;#s;#c;constructor(){super(),this.fullName=``,this.email=``,this.imageUrl=``,this.buttonLabel=`Open user profile`,this.themeToggle=!1,this.themeToggleAriaLabel=`Select a theme`,this.open=!1,this._signedIn=!1,this.#t=n`<slot name="link" id="link-slot"></slot>`,this.#n=n`<slot name="sign-in-button-text" id="sign-in-button-slot">Sign in</slot>`,this.#r=n`<slot name="sign-out-button-text" id="sign-out-button-slot">Sign Out</slot>`,this.#i=n`<slot name="theme-toggle-title" slot="title">Theme</slot>`,this.#a=n`<slot name="theme-toggle-light-label" slot="light-label">Light</slot>`,this.#o=n`<slot name="theme-toggle-dark-label" slot="dark-label">Dark</slot>`,this.#s=n`<slot name="theme-toggle-system-label" slot="system-label">System</slot>`,this.#c=T(),this.#e=this.attachInternals(),this._signedIn=this.fullName.trim().length>0}willUpdate(e){e.has(`open`)&&C(this.#e,`open`,this.open),e.has(`fullName`)&&(this._signedIn=this.fullName.trim().length>0)}get#l(){let e=this._slottedLinkNodes.length>0;return c(e,()=>n`<forge-list>${this.#t}</forge-list>`,()=>this.#t)}get#u(){return c(this.themeToggle,()=>n`
        <forge-divider></forge-divider>
        <div class="theme-toggle-container">
          <forge-theme-toggle ${w(this.#c)} .groupAriaLabel=${this.themeToggleAriaLabel}>
            ${this.#i} ${this.#a} ${this.#o} ${this.#s}
          </forge-theme-toggle>
        </div>
      `,()=>r)}get#d(){return this._signedIn?n`
          <forge-icon-button theme="app-bar" aria-label=${this.buttonLabel} id="popover-trigger">
            <forge-avatar .text=${this.fullName} .imageUrl=${this.imageUrl} id="button-avatar"></forge-avatar>
          </forge-icon-button>
        `:n`
          <forge-button variant="outlined" class="sign-in-button" pill @click=${this.#m}>
            <forge-icon name="account_outline" slot="start"></forge-icon>
            ${this.#n}
          </forge-button>
        `}get#f(){return n`
      <forge-toolbar inverted>
        <div slot="end">
          <forge-button class="sign-out-button" id="sign-out-button" @click=${this.#h}>
            ${this.#r}
            <forge-icon name="logout" external slot="end"></forge-icon>
          </forge-button>
        </div>
      </forge-toolbar>
    `}render(){return n`
      ${this.#d}
      ${c(this._signedIn,()=>n`
          <forge-popover
            id="user-profile-popover"
            anchor="popover-trigger"
            placement="bottom-end"
            arrow
            position-strategy="fixed"
            .open=${this.open}
            @forge-popover-toggle=${this.#p}
            @slotchange=${this.#g}>
            <div class="user-info-container">
              <forge-avatar .text=${this.fullName} class="popover-avatar" .imageUrl=${this.imageUrl} id="popover-avatar"></forge-avatar>
              <div class="user-info">
                <div class="full-name">${this.fullName}</div>
                <div class="email">${this.email}</div>
              </div>
            </div>
            ${c(this._slottedLinkNodes.length>0,()=>n`<forge-divider></forge-divider>`)} ${this.#l} ${this.#u}
            ${this.#f}
          </forge-popover>
        `)}
    `}setTheme(e){this.#c.value?this.#c.value.setTheme(e):O(e)}#p(e){this.open=e.detail.newState===`open`}#m(){let e=new Event(`forge-user-profile-sign-in`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#h(){let e=new Event(`forge-user-profile-sign-out`,{bubbles:!0,composed:!0});this.dispatchEvent(e)}#g(e){let t=e.target.name;[`link`,`sign-in-button-text`,`sign-out-button-text`].includes(t)&&this.requestUpdate()}},b([o({attribute:`full-name`})],U.prototype,`fullName`,void 0),b([o()],U.prototype,`email`,void 0),b([o({attribute:`image-url`})],U.prototype,`imageUrl`,void 0),b([o({attribute:`button-label`})],U.prototype,`buttonLabel`,void 0),b([o({type:Boolean,attribute:`theme-toggle`})],U.prototype,`themeToggle`,void 0),b([o({attribute:`theme-toggle-aria-label`})],U.prototype,`themeToggleAriaLabel`,void 0),b([o({type:Boolean})],U.prototype,`open`,void 0),b([re()],U.prototype,`_signedIn`,void 0),b([ie({slot:`link`,flatten:!0})],U.prototype,`_slottedLinkNodes`,void 0),f(H,U)})))()}function G(){return(G=e((()=>{h()})))()}function K(){return(K=e((()=>{d(),W(),G(),Be()})))()}var Ue=t({Demo:()=>Q,__namedExportsOrder:()=>Je,default:()=>qe}),q,J,Y,X,We,Ge,Ke,Z,qe,Q,Je;function $(){return($=e((()=>{a(),E(),ne(),y(),x(),K(),Be(),ve(),{addons:q}=__STORYBOOK_MODULE_PREVIEW_API__,{action:J}=__STORYBOOK_MODULE_ACTIONS__,Y=q.getChannel(),X=J(`forge-user-profile-sign-out`),We=J(`forge-user-profile-sign-in`),v.define([se,le]),Ge=`forge-user-profile`,Ke=!1,Z=null,qe={title:`Components/User Profile`,render:e=>{let t=T();function i(e){Z=e.detail.theme,Y.emit(te,e.detail.resolvedTheme)}function a(e){Z===`system`?Z=null:t.value&&t.value.setTheme(e?`dark`:`light`)}return Ke||=(Y.on(ee,a),!0),n`<forge-app-bar theme-mode="scoped" title-text="Forge Extended">
      <forge-user-profile
        ${w(t)}
        @forge-user-profile-sign-in=${e=>We(e)}
        @forge-user-profile-sign-out=${e=>X(e)}
        @forge-theme-toggle-update=${i}
        slot="end"
        button-label="${e.buttonAriaLabel}"
        ?theme-toggle=${e.showThemeToggle}
        image-url="${e.imageUrl}"
        full-name="${e.fullName}"
        email="first.last@tylertech.com"
        theme-toggle-aria-label="${e.themeToggleAriaLabel}">
        ${e.showSlottedLinks?n`<forge-profile-link slot="link">
                <forge-icon slot="icon" name="settings"></forge-icon>
                <a href="http://www.google.com" target="_blank">Settings</a>
              </forge-profile-link>
              <forge-profile-link slot="link">
                <forge-icon slot="icon" name="account"></forge-icon>
                <a href="http://www.google.com" target="_blank">Profile</a>
              </forge-profile-link>`:r}
        ${e.signInButtonText.length?n`<span slot="sign-in-button-text">${e.signInButtonText}</span>`:``}
        ${e.signOutButtonText.length?n`<span slot="sign-out-button-text">${e.signOutButtonText}</span>`:``}
        ${e.themeToggleTitle.length?n`<span slot="theme-toggle-title">${e.themeToggleTitle}</span>`:``}
        ${e.themeToggleLightLabel.length?n`<span slot="theme-toggle-light-label">${e.themeToggleLightLabel}</span>`:``}
        ${e.themeToggleDarkLabel.length?n`<span slot="theme-toggle-dark-label">${e.themeToggleDarkLabel}</span>`:``}
        ${e.themeToggleSystemLabel.length?n`<span slot="theme-toggle-system-label">${e.themeToggleSystemLabel}</span>`:``}
      </forge-user-profile>
    </forge-app-bar>`},component:Ge,subcomponents:{"Profile Link":`forge-profile-link`},argTypes:{fullName:{control:`text`},signInButtonText:{control:`text`},signOutButtonText:{control:`text`},buttonAriaLabel:{control:`text`},imageUrl:{control:`text`},showSlottedLinks:{control:`boolean`},showThemeToggle:{control:`boolean`},themeToggleAriaLabel:{control:`text`},themeToggleTitle:{control:`text`},themeToggleLightLabel:{control:`text`},themeToggleDarkLabel:{control:`text`},themeToggleSystemLabel:{control:`text`}},args:{fullName:`First Last`,signInButtonText:`Sign in`,signOutButtonText:`Sign Out`,buttonAriaLabel:`Open the incredibly awesome profile menu`,imageUrl:``,showSlottedLinks:!0,showThemeToggle:!0,themeToggleAriaLabel:`Select a theme`,themeToggleTitle:`Theme`,themeToggleLightLabel:`Light`,themeToggleDarkLabel:`Dark`,themeToggleSystemLabel:`System`}},Q={},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{}`,...Q.parameters?.docs?.source}}},Je=[`Demo`]})))()}export{Ue as n,$ as r,Q as t};
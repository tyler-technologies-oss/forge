var z=o=>{throw TypeError(o)};var k=(o,e,n)=>e.has(o)||z("Cannot "+n);var a=(o,e,n)=>(k(o,e,"read from private field"),n?n.call(o):e.get(o)),p=(o,e,n)=>e.has(o)?z("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,n),_=(o,e,n,d)=>(k(o,e,"write to private field"),d?d.call(o,n):e.set(o,n),n),I=(o,e,n)=>(k(o,e,"access private method"),n);import{r as N,A as t,b as r}from"./iframe-BTsZxqzu.js";import{t as D,C as L,a as j}from"./service-adapter-DlT-lJx7.js";import{I as U,a6 as F,a7 as H,G,w as V,O as Y,a8 as q,a9 as J,g as K,aa as Q,c as X}from"./tyler-icons-DhRbvloE.js";import{s as w}from"./utils-B0J9t6hU.js";import{n as W}from"./property-DkOodoSL.js";import{n as Z}from"./query-assigned-nodes-D8SsSM9e.js";import{S as M,h as c,B as oo}from"./base-lit-element-fjOVRZ-k.js";import{t as $}from"./utils-DxVSXevv.js";import{C as eo}from"./card-Qhb2yYy0.js";import{a as no}from"./tooltip-DAcILSGy.js";import"./overlay-knVFCZgv.js";import"./badge-DDQskPzl.js";import"./icon-button-CSxHjIC-.js";import"./menu-D5KoOrqK.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./popover-CdNzs7fC.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DBZT6LKu.js";import"./list-item-BTfzPPjj.js";import"./meter-group-Bnnr3Hry.js";const ro=["none","primary","secondary","tertiary","success","error","warning","info","info-secondary"],to=':host{display:block;--_count-card-icon-background: var(--forge-count-card-icon-background, var(--forge-theme-surface-container, #e0e0e0));--_count-card-icon-color: var(--forge-count-card-icon-color, var(--forge-theme-on-surface, #000000));--_count-card-icon-container-size: var(--forge-count-card-icon-container-size, 32px);--_count-card-icon-size: var(--forge-count-card-icon-size, 24px );--_count-card-color: var(--forge-count-card-color, var(--forge-theme-text-high, rgba(0, 0, 0, .87)));height:100%}forge-card{--forge-card-padding: 0;height:100%}.outer-container{position:relative}.inner-container{display:flex;flex-direction:column;gap:var(--forge-spacing-medium, 16px);padding:var(--forge-spacing-medium, 16px)}.action{position:absolute;inset-block-start:var(--forge-spacing-xsmall, 8px);inset-inline-end:var(--forge-spacing-xsmall, 8px)}.header{display:grid;grid-template-columns:1fr auto;align-items:center;justify-content:space-between;gap:var(--forge-spacing-small, 12px);padding-inline:var(--forge-spacing-medium, 16px);padding-block-start:var(--forge-spacing-medium, 16px);min-height:36px}.header-start{display:flex;align-items:center;gap:var(--forge-spacing-small, 12px)}:host(:state(has-action)) .header-start{padding-inline-end:var(--forge-spacing-xlarge, 32px)}.header-end{display:flex;align-items:center}.icon-container{display:flex;align-items:center;justify-content:center;min-inline-size:var(--_count-card-icon-container-size);block-size:var(--_count-card-icon-container-size);inline-size:var(--_count-card-icon-container-size);background-color:var(--_count-card-icon-background);color:var(--_count-card-icon-color);border-radius:calc(var(--forge-shape-medium, 4px) * var(--forge-shape-factor, 1));--forge-icon-font-size: var(--_count-card-icon-size)}.label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-body1-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-body1-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-font-size-scale, .875)));font-weight:var(--forge-typography-body1-font-weight, 400);line-height:var(--forge-typography-body1-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-body-line-height-scale, 1.125)));letter-spacing:var(--forge-typography-body1-letter-spacing, .0357142857em);text-transform:var(--forge-typography-body1-text-transform, inherit);text-decoration:var(--forge-typography-body1-text-decoration, inherit);display:-webkit-box;color:var(--_count-card-color);-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}.label slot[name=label],.label slot[name=label]::slotted(*){display:block;max-height:36px}.count-container{display:flex;align-items:center;justify-content:space-between;gap:var(--forge-spacing-xsmall, 8px);min-inline-size:0}.count{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--forge-typography-heading6-font-family, var(--forge-typography-font-family, "Roboto", sans-serif));font-size:var(--forge-typography-heading6-font-size, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading6-font-size-scale, 1.75)));font-weight:var(--forge-typography-heading6-font-weight, 500);line-height:var(--forge-typography-heading6-line-height, calc(var(--forge-typography-font-size, 1rem) * var(--forge-typography-heading6-line-height-scale, 2.125)));letter-spacing:var(--forge-typography-heading6-letter-spacing, 0em);text-transform:var(--forge-typography-heading6-text-transform, inherit);text-decoration:var(--forge-typography-heading6-text-decoration, inherit);text-box-trim:trim-both;color:var(--_count-card-color);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host(:state(primary)){--forge-card-background: var(--forge-theme-primary-container-minimum, #f7f8fc);--forge-card-color: var(--forge-theme-on-primary, #ffffff);--forge-card-outline-color: var(--forge-theme-primary-container, #d1d5ed);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-primary-container-low, #e8eaf6);--_count-card-icon-color: var(--forge-theme-on-primary-container, #222c62);--_count-card-color: var(--forge-theme-on-primary-container, #222c62)}:host(:state(secondary)){--forge-card-background: var(--forge-theme-secondary-container-minimum, #fffdf5);--forge-card-color: var(--forge-theme-on-secondary, #000000);--forge-card-outline-color: var(--forge-theme-secondary-container, #fff0c3);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-secondary-container-low, #fff8e1);--_count-card-icon-color: var(--forge-theme-on-secondary-container, #8a6804);--_count-card-color: var(--forge-theme-on-secondary-container, #8a6804)}:host(:state(tertiary)){--forge-card-background: var(--forge-theme-tertiary-container-minimum, #f7f8ff);--forge-card-color: var(--forge-theme-on-tertiary, #ffffff);--forge-card-outline-color: var(--forge-theme-tertiary-container, #d0d7ff);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-tertiary-container-low, #e8ebff);--_count-card-icon-color: var(--forge-theme-on-tertiary-container, #213189);--_count-card-color: var(--forge-theme-on-tertiary-container, #213189)}:host(:state(success)){--forge-card-background: var(--forge-theme-success-container-minimum, #f7faf7);--forge-card-color: var(--forge-theme-on-success, #ffffff);--forge-card-outline-color: var(--forge-theme-success-container, #cde0ce);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-success-container-low, #e6efe6);--_count-card-icon-color: var(--forge-theme-on-success-container, #19441b);--_count-card-color: var(--forge-theme-on-success-container, #19441b)}:host(:state(error)){--forge-card-background: var(--forge-theme-error-container-minimum, #fcf5f6);--forge-card-color: var(--forge-theme-on-error, #ffffff);--forge-card-outline-color: var(--forge-theme-error-container, #ecc2c9);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-error-container-low, #f6e0e4);--_count-card-icon-color: var(--forge-theme-on-error-container, #5f0011);--_count-card-color: var(--forge-theme-on-error-container, #5f0011)}:host(:state(warning)){--forge-card-background: var(--forge-theme-warning-container-minimum, #fdf8f5);--forge-card-color: var(--forge-theme-on-warning, #ffffff);--forge-card-outline-color: var(--forge-theme-warning-container, #f4d3c2);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-warning-container-low, #f9e9e0);--_count-card-icon-color: var(--forge-theme-on-warning-container, #712700);--_count-card-color: var(--forge-theme-on-warning-container, #712700)}:host(:state(info)){--forge-card-background: var(--forge-theme-info-container-minimum, #f6f9fc);--forge-card-color: var(--forge-theme-on-info, #ffffff);--forge-card-outline-color: var(--forge-theme-info-container, #c7daf0);--forge-card-outline-width: 1px;--forge-card-outline-style: solid;--_count-card-icon-background: var(--forge-theme-info-container-low, #e3edf7);--_count-card-icon-color: var(--forge-theme-on-info-container, #0b3768);--_count-card-color: var(--forge-theme-on-info-container, #0b3768)}:host(:state(info-secondary)){--forge-card-background: var(--forge-theme-surface-dim, #fafafa);--forge-card-outline-color: var(--forge-theme-outline, #e0e0e0);--forge-card-outline-width: 1px;--forge-card-outline-style: solid}:host(:state(no-border)){--forge-card-outline-width: 0}';var ao=Object.defineProperty,E=(o,e,n,d)=>{for(var f=void 0,T=o.length-1,C;T>=0;T--)(C=o[T])&&(f=C(e,n,f)||f);return f&&ao(e,n,f),f},P,O,B;const A="forge-count-card";var s,i,l,S,R;const x=class x extends(B=oo,O=L,P=j,B){constructor(){super();p(this,S);p(this,s);p(this,i);p(this,l);this.theme="none",this.noBorder=!1,_(this,i,new M(this,{slotName:"label"})),_(this,l,new M(this,{slotName:"count"})),_(this,s,this.attachInternals())}willUpdate(n){if(n.has("theme"))for(const d of ro)$(a(this,s),d,this.theme===d);n.has("noBorder")&&$(a(this,s),"no-border",this.noBorder)}render(){return r`
      <forge-card>
        <div class="outer-container">
          <div class="header">
            <div class="header-start">
              <div class="icon-container" ${c()}>
                <slot name="icon"></slot>
              </div>
              <div class="label" ${c()}>
                <slot name="label" @slotchange=${a(this,i).handleSlotChange}></slot>
              </div>
              ${a(this,i).text?r`<forge-tooltip>${a(this,i).text}</forge-tooltip>`:t}
            </div>
            <div class="header-end" ${c()}>
              <slot name="header-end"></slot>
            </div>
            <div class="action" ${c()}>
              <slot name="action" @slotchange=${I(this,S,R)}></slot>
            </div>
          </div>
          <div class="inner-container">
            <div class="count-container" ${c()}>
              <div class="count">
                <slot name="count" @slotchange=${a(this,l).handleSlotChange}></slot>
              </div>
              ${a(this,l).text?r`<forge-tooltip>${a(this,l).text}</forge-tooltip>`:t}
              <slot name="count-end"></slot>
            </div>
            <div ${c()}>
              <slot name="body"></slot>
            </div>
          </div>
          <div ${c()}>
            <slot name="full-width"></slot>
          </div>
        </div>
      </forge-card>
    `}};s=new WeakMap,i=new WeakMap,l=new WeakMap,S=new WeakSet,R=function(){$(a(this,s),"has-action",this._actionSlotNodes.length>0)},x[O]=A,x[P]=[eo,no],x.styles=N(to);let g=x;E([W({type:String})],g.prototype,"theme");E([W({type:Boolean,attribute:"no-border"})],g.prototype,"noBorder");E([Z({slot:"action",flatten:!0})],g.prototype,"_actionSlotNodes");D(A,g);U.define([F,H,G,V,Y,q,J,K,Q,X]);const co="forge-count-card",so={title:"Components/Count Card",component:co,render:o=>r`
    <div style="width: 320px;">
      <forge-count-card theme=${o.theme||t} ?no-border=${o.noBorder}>
        ${o.showIcon?r`<forge-icon slot="icon" name="attach_money"></forge-icon>`:t}
        ${o.showLabel?r`<span slot="label">${o.labelText}</span>`:t}
        ${o.showHeaderEnd?r`<forge-badge slot="header-end" theme=${o.theme||t}>${o.badgeText}</forge-badge>`:t}
        ${o.showAction?r`
              <forge-icon-button slot="action" aria-label="More options">
                <forge-icon name="more_vert"></forge-icon>
              </forge-icon-button>
            `:t}
        <span slot="count">${o.countText}</span>
        ${o.showCountEnd?r`<forge-badge slot="count-end" theme=${o.theme||t}>${o.countEndText}</forge-badge>`:t}
        ${o.showFullWidth?r`
              <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
                <polyline
                  fill="none"
                  stroke="var(--forge-theme-primary)"
                  stroke-width="2"
                  points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5" />
              </svg>
            `:t}
      </forge-count-card>
    </div>
  `,argTypes:{theme:{control:"select",options:["none","primary","secondary","tertiary","success","error","warning","info","info-secondary"],description:"Theme variant applied to the card",table:{category:"Properties"}},noBorder:{control:"boolean",description:"Hide the card border",table:{category:"Properties"}},showIcon:{control:"boolean",description:"Toggle the icon slot",table:{category:"Slots"}},showLabel:{control:"boolean",description:"Toggle the label slot",table:{category:"Slots"}},showHeaderEnd:{control:"boolean",description:"Toggle the header-end slot (badge)",table:{category:"Slots"}},showAction:{control:"boolean",description:"Toggle the action slot (icon button)",table:{category:"Slots"}},showCountEnd:{control:"boolean",description:"Toggle the count-end slot (badge)",table:{category:"Slots"}},showFullWidth:{control:"boolean",description:"Toggle the full-width slot (sparkline)",table:{category:"Slots"}},labelText:{control:"text",description:"Label text content",table:{category:"Content"}},countText:{control:"text",description:"Count text content",table:{category:"Content"}},countEndText:{control:"text",description:"Count end text content",table:{category:"Content"}},badgeText:{control:"text",description:"Badge text content",table:{category:"Content"}}},args:{theme:"none",noBorder:!1,showIcon:!0,showLabel:!0,showHeaderEnd:!0,showAction:!1,showCountEnd:!1,showFullWidth:!1,labelText:"Tomorrows money",countText:"$303.33",countEndText:"+5%",badgeText:"+12%"}},m={},u={...w,render:()=>r`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card>
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Revenue</span>
        <span slot="count">$12,450.00</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Total Users</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Orders</span>
        <span slot="count">567</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Growth</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>
    </div>
  `},h={...w,render:()=>r`
    <div style="width: 320px;">
      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Weekly Sales</span>
        <span slot="count">$4,250.00</span>
        <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
          <polyline
            fill="none"
            stroke="var(--forge-theme-primary)"
            stroke-width="2"
            points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5" />
        </svg>
      </forge-count-card>
    </div>
  `},y={...w,render:()=>r`
    <style>
      .meter-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--forge-theme-text-medium);
      }

      .body-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .last-updated {
        color: var(--forge-theme-text-low);
      }
    </style>
    <div style="width: 320px;">
      <forge-count-card>
        <span slot="label">Todays money</span>
        <forge-badge slot="header-end" theme="success">
          +8.2%
          <forge-icon slot="end" name="trending_up"></forge-icon>
        </forge-badge>
        <span slot="count">$50,846.00</span>
        <div slot="body" class="meter-body">
          <span class="forge-typography--body1">66% of monthly target</span>
          <span class="forge-typography--body1">100k</span>
        </div>
        <div slot="body" class="body-content">
          <forge-meter value="0.66" min="0" max="1" theme="success"></forge-meter>
          <span class="forge-typography--label1 last-updated">Last updated 12/12/2025</span>
        </div>
      </forge-count-card>
    </div>
  `},v={...w,render:()=>r`
      <div style="width: 320px;">
        <forge-count-card>
          <forge-icon slot="icon" name="attach_money"></forge-icon>
          <span slot="label">Revenue</span>
          <forge-menu slot="action" .options=${[{label:"View details",value:"details"},{label:"Export data",value:"export"},{label:"Remove card",value:"remove"}]}>
            <forge-icon-button aria-label="More options">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>
          <span slot="count">$12,450.00</span>
        </forge-count-card>
      </div>
    `},b={...w,render:()=>r`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card theme="none">
        <forge-icon slot="icon" name="dashboard"></forge-icon>
        <span slot="label">None (Default)</span>
        <span slot="count">100</span>
      </forge-count-card>

      <forge-count-card theme="primary">
        <forge-icon slot="icon" name="star"></forge-icon>
        <span slot="label">Primary</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card theme="secondary">
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Secondary</span>
        <span slot="count">5,678</span>
      </forge-count-card>

      <forge-count-card theme="tertiary">
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Tertiary</span>
        <span slot="count">910</span>
      </forge-count-card>

      <forge-count-card theme="success">
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Success</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>

      <forge-count-card theme="error">
        <forge-icon slot="icon" name="error"></forge-icon>
        <span slot="label">Error</span>
        <span slot="count">12</span>
      </forge-count-card>

      <forge-count-card theme="warning">
        <forge-icon slot="icon" name="warning"></forge-icon>
        <span slot="label">Warning</span>
        <span slot="count">47</span>
      </forge-count-card>

      <forge-count-card theme="info">
        <forge-icon slot="icon" name="info"></forge-icon>
        <span slot="label">Info</span>
        <span slot="count">99+</span>
      </forge-count-card>

      <forge-count-card theme="info-secondary">
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Info Secondary</span>
        <span slot="count">$12,450</span>
      </forge-count-card>
    </div>
  `};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card>
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Revenue</span>
        <span slot="count">$12,450.00</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Total Users</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Orders</span>
        <span slot="count">567</span>
      </forge-count-card>

      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Growth</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>
    </div>
  \`
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 320px;">
      <forge-count-card>
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Weekly Sales</span>
        <span slot="count">$4,250.00</span>
        <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
          <polyline
            fill="none"
            stroke="var(--forge-theme-primary)"
            stroke-width="2"
            points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5" />
        </svg>
      </forge-count-card>
    </div>
  \`
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <style>
      .meter-body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--forge-theme-text-medium);
      }

      .body-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .last-updated {
        color: var(--forge-theme-text-low);
      }
    </style>
    <div style="width: 320px;">
      <forge-count-card>
        <span slot="label">Todays money</span>
        <forge-badge slot="header-end" theme="success">
          +8.2%
          <forge-icon slot="end" name="trending_up"></forge-icon>
        </forge-badge>
        <span slot="count">$50,846.00</span>
        <div slot="body" class="meter-body">
          <span class="forge-typography--body1">66% of monthly target</span>
          <span class="forge-typography--body1">100k</span>
        </div>
        <div slot="body" class="body-content">
          <forge-meter value="0.66" min="0" max="1" theme="success"></forge-meter>
          <span class="forge-typography--label1 last-updated">Last updated 12/12/2025</span>
        </div>
      </forge-count-card>
    </div>
  \`
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const menuOptions = [{
      label: 'View details',
      value: 'details'
    }, {
      label: 'Export data',
      value: 'export'
    }, {
      label: 'Remove card',
      value: 'remove'
    }];
    return html\`
      <div style="width: 320px;">
        <forge-count-card>
          <forge-icon slot="icon" name="attach_money"></forge-icon>
          <span slot="label">Revenue</span>
          <forge-menu slot="action" .options=\${menuOptions}>
            <forge-icon-button aria-label="More options">
              <forge-icon name="more_vert"></forge-icon>
            </forge-icon-button>
          </forge-menu>
          <span slot="count">$12,450.00</span>
        </forge-count-card>
      </div>
    \`;
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <forge-count-card theme="none">
        <forge-icon slot="icon" name="dashboard"></forge-icon>
        <span slot="label">None (Default)</span>
        <span slot="count">100</span>
      </forge-count-card>

      <forge-count-card theme="primary">
        <forge-icon slot="icon" name="star"></forge-icon>
        <span slot="label">Primary</span>
        <span slot="count">1,234</span>
      </forge-count-card>

      <forge-count-card theme="secondary">
        <forge-icon slot="icon" name="people"></forge-icon>
        <span slot="label">Secondary</span>
        <span slot="count">5,678</span>
      </forge-count-card>

      <forge-count-card theme="tertiary">
        <forge-icon slot="icon" name="shopping_cart"></forge-icon>
        <span slot="label">Tertiary</span>
        <span slot="count">910</span>
      </forge-count-card>

      <forge-count-card theme="success">
        <forge-icon slot="icon" name="trending_up"></forge-icon>
        <span slot="label">Success</span>
        <span slot="count">+23.5%</span>
      </forge-count-card>

      <forge-count-card theme="error">
        <forge-icon slot="icon" name="error"></forge-icon>
        <span slot="label">Error</span>
        <span slot="count">12</span>
      </forge-count-card>

      <forge-count-card theme="warning">
        <forge-icon slot="icon" name="warning"></forge-icon>
        <span slot="label">Warning</span>
        <span slot="count">47</span>
      </forge-count-card>

      <forge-count-card theme="info">
        <forge-icon slot="icon" name="info"></forge-icon>
        <span slot="label">Info</span>
        <span slot="count">99+</span>
      </forge-count-card>

      <forge-count-card theme="info-secondary">
        <forge-icon slot="icon" name="attach_money"></forge-icon>
        <span slot="label">Info Secondary</span>
        <span slot="count">$12,450</span>
      </forge-count-card>
    </div>
  \`
}`,...b.parameters?.docs?.source}}};const io=["Demo","MultipleCards","WithFullWidth","AdditionalBodyContent","WithMenu","Themes"],Oo=Object.freeze(Object.defineProperty({__proto__:null,AdditionalBodyContent:y,Demo:m,MultipleCards:u,Themes:b,WithFullWidth:h,WithMenu:v,__namedExportsOrder:io,default:so},Symbol.toStringTag,{value:"Module"}));export{y as A,Oo as C,m as D,u as M,b as T,h as W,v as a};

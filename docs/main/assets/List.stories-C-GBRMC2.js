import{x as e,T as i}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as R}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as _,g,s as C}from"./utils-C7XotN6S.js";import{I as N}from"./icon-DdNu5rAq.js";import{n as V,f as F,o as M,m as P,p as D,q as H,r as W,s as q,j as z}from"./index-TSSE1zcJ.js";import{t as B}from"./index-fxMNKkgx.js";import{o as G}from"./style-map-D0ILlpbs.js";import{s as J}from"./decorators-EVhofM2Q.js";import"./constants-CmaEVTEu.js";import"./list-BN1qzEIh.js";import"./drawer-Buamlc4X.js";import"./index-Dh0vMUMR.js";import"./avatar-By8UD2iO.js";import"./checkbox-DJehbw3q.js";import"./label-BsLwoMJm.js";import"./button-DqH9YfaW.js";import"./focus-indicator-CexacDHl.js";import"./state-layer-DjEoH8hN.js";import"./button-toggle-group-CSWkQPk2.js";import"./icon-button-Cqg7QjNu.js";import"./switch-DYQgudGV.js";import"./expansion-panel-CYEWAjhB.js";N.define([V,F,M,P,B,D,H,W,q,z]);const d="forge-list",p="forge-list-item",K="with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.",Q=R("forge-list-item-select"),U={title:"Components/List",render:t=>{const m=_(t),O=m?G(m):i,c=[];for(let o=0;o<4;o++){const f=t.wrap?`List item ${o+1} ${K}`:`List item ${o+1}`,A=t.variant==="button"?e`<button type="button" .disabled=${t.disabled}>${f}</button>`:t.variant==="anchor"?e`<a href="javascript: void(0);">${f}</a>`:e`<span>${f}</span>`;c.push(e`
        <forge-list-item value="list-item-${o+1}" ?selected=${o===0&&t.selected}>
          ${t.withAvatar?e`<forge-avatar slot="start" style="--forge-avatar-background: var(--forge-theme-text-medium);"
                ><forge-icon name="folder"></forge-icon
              ></forge-avatar>`:i}
          ${t.withStartIcon?e`<forge-icon slot="start" name="forge_logo"></forge-icon>`:i}
          ${t.withStartCheckbox?e`<forge-checkbox slot="start" aria-label=${`List Item ${o+1} Start Checkbox`}></forge-checkbox>`:i}
          ${t.withStartRadio?e`<forge-radio name="radios" slot="start" aria-label=${`List Item ${o+1} Start Radio`}></forge-radio>`:i}
          ${t.withStartSwitch?e`<forge-switch slot="start" aria-label=${`List Item ${o+1} Start Switch`}></forge-switch>`:i} ${A}
          ${t.twoLine||t.threeLine?e`<span slot="secondary-text">Secondary text</span>`:i}
          ${t.threeLine?e`<span slot="tertiary-text">Tertiary text</span>`:i}
          ${t.withEndIcon?e`<forge-icon slot="end" name="info"></forge-icon>`:i}
          ${t.withEndCheckbox?e`<forge-checkbox slot="end" aria-label=${`List Item ${o+1} End Checkbox`}></forge-checkbox>`:i}
          ${t.withEndRadio?e`<forge-radio name="radios" slot="end" aria-label=${`List Item ${o+1} End Radio`}></forge-radio>`:i}
          ${t.withEndSwitch?e`<forge-switch slot="end" aria-label=${`List Item ${o+1} End Switch`}></forge-switch>`:i}
        </forge-list-item>
      `)}return e`
      <forge-list
        .dense=${t.dense}
        .indented=${t.indented}
        .selectedValue=${t.selectedValue}
        .twoLine=${t.twoLine}
        .threeLine=${t.threeLine}
        .wrap=${t.wrap}
        style=${O}
        @forge-list-item-select=${Q}>
        ${c}
      </forge-list>
    `},component:d,subcomponents:{"List Item":p},decorators:[J(`
    forge-list {
      max-width: 500px;
    }
  `)],argTypes:{...g({tagName:d,exclude:["active","noninteractive"]}),variant:{control:{type:"select"},options:["anchor","button","static"]},...g({tagName:p,exclude:["active","value","noninteractive"]}),selectedValue:{control:{type:"select"},options:["list-item-1","list-item-2","list-item-3","list-item-4"]},disabled:{control:{type:"boolean"},if:{arg:"variant",eq:"button"}}},args:{variant:"static",withStartIcon:!1,withEndIcon:!1,withAvatar:!1,withStartCheckbox:!1,withEndCheckbox:!1,withStartRadio:!1,withEndRadio:!1,withStartSwitch:!1,withEndSwitch:!1,disabled:!1,dense:!1,indented:!1,twoLine:!1,threeLine:!1,wrap:!1,selected:!1}},n={},r={args:{variant:"button"}},s={args:{variant:"anchor"}},a={...C,render:()=>e`
      <forge-drawer>
        <aside>
          <forge-list navlist>
            <forge-list-item>
              <forge-icon slot="start" name="home"></forge-icon>
              <a href="javascript: void(0);">Home</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="inbox"></forge-icon>
              <a href="javascript: void(0);">Inbox</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="star"></forge-icon>
              <a href="javascript: void(0);">Starred</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="settings"></forge-icon>
              <a href="javascript: void(0);">Settings</a>
            </forge-list-item>
          </forge-list>
        </aside>
      </forge-drawer>
    `},l={...C,render:()=>e`
      <forge-list>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="code"></forge-icon>
            <button type="button">List Item One</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="face"></forge-icon>
            <button type="button">List Item Two</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-list-item>
          <forge-icon slot="start" name="favorite"></forge-icon>
          <button type="button">List Item Three</button>
        </forge-list-item>
      </forge-list>
    `};var u,b,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(h=(b=n.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var v,w,y;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'button'
  }
}`,...(y=(w=r.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var I,$,L;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'anchor'
  }
}`,...(L=($=s.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var x,S,T;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-drawer>
        <aside>
          <forge-list navlist>
            <forge-list-item>
              <forge-icon slot="start" name="home"></forge-icon>
              <a href="javascript: void(0);">Home</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="inbox"></forge-icon>
              <a href="javascript: void(0);">Inbox</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="star"></forge-icon>
              <a href="javascript: void(0);">Starred</a>
            </forge-list-item>
            <forge-list-item>
              <forge-icon slot="start" name="settings"></forge-icon>
              <a href="javascript: void(0);">Settings</a>
            </forge-list-item>
          </forge-list>
        </aside>
      </forge-drawer>
    \`;
  }
}`,...(T=(S=a.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var E,j,k;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-list>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="code"></forge-icon>
            <button type="button">List Item One</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-expansion-panel>
          <forge-list-item slot="header">
            <forge-icon slot="start" name="face"></forge-icon>
            <button type="button">List Item Two</button>
            <forge-open-icon slot="end"></forge-open-icon>
          </forge-list-item>
          <div role="listitem">
            <forge-list indented>
              <forge-list-item>
                <button type="button">List Item One</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Two</button>
              </forge-list-item>
              <forge-list-item>
                <button type="button">List Item Three</button>
              </forge-list-item>
            </forge-list>
          </div>
        </forge-expansion-panel>
        <forge-list-item>
          <forge-icon slot="start" name="favorite"></forge-icon>
          <button type="button">List Item Three</button>
        </forge-list-item>
      </forge-list>
    \`;
  }
}`,...(k=(j=l.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};const X=["Demo","Interactive","WithAnchor","NavigationMenu","Expandable"],It=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,Expandable:l,Interactive:r,NavigationMenu:a,WithAnchor:s,__namedExportsOrder:X,default:U},Symbol.toStringTag,{value:"Module"}));export{n as D,l as E,r as I,It as L,a as N,s as W};

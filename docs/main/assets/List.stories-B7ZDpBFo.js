import{E as t,x as e}from"./iframe-CdcPESwS.js";import{g as O,s as Z,a as tt}from"./utils-DpKzuC-M.js";import{I as st,u as at,l as rt,v as lt,c as ct,d as dt,s as gt,w as mt,x as ft,y as ht,p as pt}from"./icon-B8CdcxqJ.js";import{o as et}from"./style-map-CvrRkKxH.js";import{e as r}from"./class-map-B4dJbP0y.js";import{s as bt}from"./decorators-NusRQPww.js";import"./feature-detection-uS6p5jc8.js";import"./list-z5iQB-6r.js";import"./drawer-rHXDK_gj.js";import"./index-CiLSBptl.js";import"./avatar-C8ZWMLCh.js";import"./checkbox-DOmkbh7U.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./button-toggle-group-D5jBldBo.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import"./expansion-panel-Cn_4I3Ho.js";const{action:ut}=__STORYBOOK_MODULE_ACTIONS__;st.define([at,rt,lt,ct,dt,gt,mt,ft,ht,pt]);const j="forge-list",z="forge-list-item",$t="with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.",wt=ut("forge-list-item-select"),vt={title:"Components/List",render:n=>{const w=tt(n),M=w?et(w):t,v=[];for(let i=0;i<4;i++){const a=n.wrap?`List item ${i+1} ${$t}`:`List item ${i+1}`,o=n.variant==="button"?e`<button type="button" .disabled=${n.disabled}>${a}</button>`:n.variant==="anchor"?e`<a href="javascript: void(0);">${a}</a>`:e`<span>${a}</span>`;v.push(e`
        <forge-list-item value="list-item-${i+1}" ?selected=${i===0&&n.selected}>
          ${n.withAvatar?e`<forge-avatar slot="start" style="--forge-avatar-background: var(--forge-theme-text-medium);"
                ><forge-icon name="folder"></forge-icon
              ></forge-avatar>`:t}
          ${n.withStartIcon?e`<forge-icon slot="start" name="forge_logo"></forge-icon>`:t}
          ${n.withStartCheckbox?e`<forge-checkbox slot="start" aria-label=${`List Item ${i+1} Start Checkbox`}></forge-checkbox>`:t}
          ${n.withStartRadio?e`<forge-radio name="radios" slot="start" aria-label=${`List Item ${i+1} Start Radio`}></forge-radio>`:t}
          ${n.withStartSwitch?e`<forge-switch slot="start" aria-label=${`List Item ${i+1} Start Switch`}></forge-switch>`:t} ${o}
          ${n.twoLine||n.threeLine?e`<span slot="secondary-text">Secondary text</span>`:t}
          ${n.threeLine?e`<span slot="tertiary-text">Tertiary text</span>`:t}
          ${n.withEndIcon?e`<forge-icon slot="end" name="info"></forge-icon>`:t}
          ${n.withEndCheckbox?e`<forge-checkbox slot="end" aria-label=${`List Item ${i+1} End Checkbox`}></forge-checkbox>`:t}
          ${n.withEndRadio?e`<forge-radio name="radios" slot="end" aria-label=${`List Item ${i+1} End Radio`}></forge-radio>`:t}
          ${n.withEndSwitch?e`<forge-switch slot="end" aria-label=${`List Item ${i+1} End Switch`}></forge-switch>`:t}
        </forge-list-item>
      `)}return e`
      <forge-list
        .dense=${n.dense}
        .indented=${n.indented}
        .selectedValue=${n.selectedValue}
        .twoLine=${n.twoLine}
        .threeLine=${n.threeLine}
        .wrap=${n.wrap}
        style=${M}
        @forge-list-item-select=${wt}>
        ${v}
      </forge-list>
    `},component:j,subcomponents:{"List Item":z},decorators:[bt(`
    forge-list {
      max-width: 500px;
    }
  `)],argTypes:{...O({tagName:j,exclude:["active","noninteractive"]}),variant:{control:{type:"select"},options:["anchor","button","static"]},...O({tagName:z,exclude:["active","value","noninteractive"]}),selectedValue:{control:{type:"select"},options:["list-item-1","list-item-2","list-item-3","list-item-4"]},disabled:{control:{type:"boolean"},if:{arg:"variant",eq:"button"}}},args:{variant:"static",withStartIcon:!1,withEndIcon:!1,withAvatar:!1,withStartCheckbox:!1,withEndCheckbox:!1,withStartRadio:!1,withEndRadio:!1,withStartSwitch:!1,withEndSwitch:!1,disabled:!1,dense:!1,indented:!1,twoLine:!1,threeLine:!1,wrap:!1,selected:!1}},f={},h={args:{variant:"button"}},p={args:{variant:"anchor"}},b={...Z,render:()=>e`
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
    `},u={...Z,render:()=>e`
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
    `},$={render:({variant:n,indented:w,wrap:M,dense:v,disabled:i,twoLine:a,threeLine:o,withStartIcon:x,withEndIcon:_,withAvatar:_t,withStartCheckbox:y,withEndCheckbox:I,withStartRadio:L,withEndRadio:S,withStartSwitch:T,withEndSwitch:E,selectedValue:k,...nt})=>{const C=tt(nt),it=C?et(C):t,ot={"forge-list":!0,"forge-list--indented":w,"forge-list--wrap":M,"forge-list--dense":v,"forge-list--two-line":a,"forge-list--three-line":o},l=({area:s})=>e`<svg class=${r({"forge-icon":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Forge design system logo</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>`,c=({area:s,id:m})=>e`<div class=${r({"forge-checkbox":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="checkbox" id=${m} />
        <div class="forge-checkbox__icon"></div>
      </div>`,d=({area:s,id:m})=>e`<div class=${r({"forge-radio":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="radio" id=${m} name="radios" />
      </div>`,g=({area:s,id:m})=>e`<div class=${r({"forge-switch":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="checkbox" switch id=${m} />
        <div class="forge-switch__thumb">
          <svg class="forge-icon forge-switch__icon forge-switch__icon--off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
          <svg class="forge-icon forge-switch__icon forge-switch__icon--on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>`;return e`
      <div class="list-demo" style=${it}>
        <ul class=${r(ot)}>
          <li class=${r({"forge-list-item":!0,"forge-list-item--selected":k==="list-item-1"})}>
            ${x?l({area:"start"}):t}
            ${y?c({area:"start",id:"li-cb-1"}):t}
            ${L?d({area:"start",id:"li-rb-1"}):t}
            ${T?g({area:"start",id:"li-sw-1"}):t}
            ${n==="static"?e`<span>List Item One</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item One</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item One</a>`:t}
            ${a||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?l({area:"end"}):t}
            ${I?c({area:"end",id:"li-cb-1"}):t}
            ${S?d({area:"end",id:"li-rb-1"}):t}
            ${E?g({area:"end",id:"li-sw-1"}):t}
          </li>
          <li class=${r({"forge-list-item":!0,"forge-list-item--selected":k==="list-item-2"})}>
            ${x?l({area:"start"}):t}
            ${y?c({area:"start",id:"li-cb-2"}):t}
            ${L?d({area:"start",id:"li-rb-2"}):t}
            ${T?g({area:"start",id:"li-sw-2"}):t}
            ${n==="static"?e`<span>List Item Two</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Two</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Two</a>`:t}
            ${a||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?l({area:"end"}):t}
            ${I?c({area:"end",id:"li-cb-2"}):t}
            ${S?d({area:"end",id:"li-rb-2"}):t}
            ${E?g({area:"end",id:"li-sw-2"}):t}
          </li>
          <li class=${r({"forge-list-item":!0,"forge-list-item--selected":k==="list-item-3"})}>
            ${x?l({area:"start"}):t}
            ${y?c({area:"start",id:"li-cb-3"}):t}
            ${L?d({area:"start",id:"li-rb-3"}):t}
            ${T?g({area:"start",id:"li-sw-3"}):t}
            ${n==="static"?e`<span>List Item Three</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Three</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Three</a>`:t}
            ${a||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?l({area:"end"}):t}
            ${I?c({area:"end",id:"li-cb-3"}):t}
            ${S?d({area:"end",id:"li-rb-3"}):t}
            ${E?g({area:"end",id:"li-sw-3"}):t}
          </li>
          <li class=${r({"forge-list-item":!0,"forge-list-item--selected":k==="list-item-4"})}>
            ${x?l({area:"start"}):t}
            ${y?c({area:"start",id:"li-cb-4"}):t}
            ${L?d({area:"start",id:"li-rb-4"}):t}
            ${T?g({area:"start",id:"li-sw-4"}):t}
            ${n==="static"?e`<span>List Item Four</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Four</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Four</a>`:t}
            ${a||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?l({area:"end"}):t}
            ${I?c({area:"end",id:"li-cb-4"}):t}
            ${S?d({area:"end",id:"li-rb-4"}):t}
            ${E?g({area:"end",id:"li-sw-4"}):t}
          </li>
        </ul>
      </div>
    `}};var A,V,H;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:"{}",...(H=(V=f.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};var F,R,B;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    variant: 'button'
  }
}`,...(B=(R=h.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var N,D,P;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'anchor'
  }
}`,...(P=(D=p.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var W,q,K;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(K=(q=b.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};var U,Y,G;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(G=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var J,Q,X;$.parameters={...$.parameters,docs:{...(J=$.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: ({
    variant,
    indented,
    wrap,
    dense,
    disabled,
    twoLine,
    threeLine,
    withStartIcon,
    withEndIcon,
    withAvatar,
    withStartCheckbox,
    withEndCheckbox,
    withStartRadio,
    withEndRadio,
    withStartSwitch,
    withEndSwitch,
    selectedValue,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const listClasses = {
      'forge-list': true,
      'forge-list--indented': indented,
      'forge-list--wrap': wrap,
      'forge-list--dense': dense,
      'forge-list--two-line': twoLine,
      'forge-list--three-line': threeLine
    };

    // prettier-ignore
    const forgeIcon = ({
      area
    }: {
      area: 'start' | 'end';
    }) => html\`<svg class=\${classMap({
      'forge-icon': true,
      'forge-list-item__start': area === 'start',
      'forge-list-item__end': area === 'end'
    })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Forge design system logo</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>\`;
    const checkbox = ({
      area,
      id
    }: {
      area: 'start' | 'end';
      id: string;
    }) => html\`<div class=\${classMap({
      'forge-checkbox': true,
      'forge-list-item__start': area === 'start',
      'forge-list-item__end': area === 'end'
    })}>
        <input type="checkbox" id=\${id} />
        <div class="forge-checkbox__icon"></div>
      </div>\`;
    const radio = ({
      area,
      id
    }: {
      area: 'start' | 'end';
      id: string;
    }) => html\`<div class=\${classMap({
      'forge-radio': true,
      'forge-list-item__start': area === 'start',
      'forge-list-item__end': area === 'end'
    })}>
        <input type="radio" id=\${id} name="radios" />
      </div>\`;
    const switchEl = ({
      area,
      id
    }: {
      area: 'start' | 'end';
      id: string;
    }) => html\`<div class=\${classMap({
      'forge-switch': true,
      'forge-list-item__start': area === 'start',
      'forge-list-item__end': area === 'end'
    })}>
        <input type="checkbox" switch id=\${id} />
        <div class="forge-switch__thumb">
          <svg class="forge-icon forge-switch__icon forge-switch__icon--off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
          <svg class="forge-icon forge-switch__icon forge-switch__icon--on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>\`;

    // prettier-ignore
    return html\`
      <div class="list-demo" style=\${style}>
        <ul class=\${classMap(listClasses)}>
          <li class=\${classMap({
      'forge-list-item': true,
      'forge-list-item--selected': selectedValue === 'list-item-1'
    })}>
            \${withStartIcon ? forgeIcon({
      area: 'start'
    }) : nothing}
            \${withStartCheckbox ? checkbox({
      area: 'start',
      id: 'li-cb-1'
    }) : nothing}
            \${withStartRadio ? radio({
      area: 'start',
      id: 'li-rb-1'
    }) : nothing}
            \${withStartSwitch ? switchEl({
      area: 'start',
      id: 'li-sw-1'
    }) : nothing}
            \${variant === 'static' ? html\`<span>List Item One</span>\` : nothing}
            \${variant === 'button' ? html\`<button type="button" .disabled=\${disabled}>List Item One</button>\` : nothing}
            \${variant === 'anchor' ? html\`<a href="javascript: void(0);">List Item One</a>\` : nothing}
            \${twoLine || threeLine ? html\`<span class="forge-list-item__text">Secondary text</span>\` : nothing}
            \${threeLine ? html\`<span class="forge-list-item__text">Tertiary text</span>\` : nothing}
            \${withEndIcon ? forgeIcon({
      area: 'end'
    }) : nothing}
            \${withEndCheckbox ? checkbox({
      area: 'end',
      id: 'li-cb-1'
    }) : nothing}
            \${withEndRadio ? radio({
      area: 'end',
      id: 'li-rb-1'
    }) : nothing}
            \${withEndSwitch ? switchEl({
      area: 'end',
      id: 'li-sw-1'
    }) : nothing}
          </li>
          <li class=\${classMap({
      'forge-list-item': true,
      'forge-list-item--selected': selectedValue === 'list-item-2'
    })}>
            \${withStartIcon ? forgeIcon({
      area: 'start'
    }) : nothing}
            \${withStartCheckbox ? checkbox({
      area: 'start',
      id: 'li-cb-2'
    }) : nothing}
            \${withStartRadio ? radio({
      area: 'start',
      id: 'li-rb-2'
    }) : nothing}
            \${withStartSwitch ? switchEl({
      area: 'start',
      id: 'li-sw-2'
    }) : nothing}
            \${variant === 'static' ? html\`<span>List Item Two</span>\` : nothing}
            \${variant === 'button' ? html\`<button type="button" .disabled=\${disabled}>List Item Two</button>\` : nothing}
            \${variant === 'anchor' ? html\`<a href="javascript: void(0);">List Item Two</a>\` : nothing}
            \${twoLine || threeLine ? html\`<span class="forge-list-item__text">Secondary text</span>\` : nothing}
            \${threeLine ? html\`<span class="forge-list-item__text">Tertiary text</span>\` : nothing}
            \${withEndIcon ? forgeIcon({
      area: 'end'
    }) : nothing}
            \${withEndCheckbox ? checkbox({
      area: 'end',
      id: 'li-cb-2'
    }) : nothing}
            \${withEndRadio ? radio({
      area: 'end',
      id: 'li-rb-2'
    }) : nothing}
            \${withEndSwitch ? switchEl({
      area: 'end',
      id: 'li-sw-2'
    }) : nothing}
          </li>
          <li class=\${classMap({
      'forge-list-item': true,
      'forge-list-item--selected': selectedValue === 'list-item-3'
    })}>
            \${withStartIcon ? forgeIcon({
      area: 'start'
    }) : nothing}
            \${withStartCheckbox ? checkbox({
      area: 'start',
      id: 'li-cb-3'
    }) : nothing}
            \${withStartRadio ? radio({
      area: 'start',
      id: 'li-rb-3'
    }) : nothing}
            \${withStartSwitch ? switchEl({
      area: 'start',
      id: 'li-sw-3'
    }) : nothing}
            \${variant === 'static' ? html\`<span>List Item Three</span>\` : nothing}
            \${variant === 'button' ? html\`<button type="button" .disabled=\${disabled}>List Item Three</button>\` : nothing}
            \${variant === 'anchor' ? html\`<a href="javascript: void(0);">List Item Three</a>\` : nothing}
            \${twoLine || threeLine ? html\`<span class="forge-list-item__text">Secondary text</span>\` : nothing}
            \${threeLine ? html\`<span class="forge-list-item__text">Tertiary text</span>\` : nothing}
            \${withEndIcon ? forgeIcon({
      area: 'end'
    }) : nothing}
            \${withEndCheckbox ? checkbox({
      area: 'end',
      id: 'li-cb-3'
    }) : nothing}
            \${withEndRadio ? radio({
      area: 'end',
      id: 'li-rb-3'
    }) : nothing}
            \${withEndSwitch ? switchEl({
      area: 'end',
      id: 'li-sw-3'
    }) : nothing}
          </li>
          <li class=\${classMap({
      'forge-list-item': true,
      'forge-list-item--selected': selectedValue === 'list-item-4'
    })}>
            \${withStartIcon ? forgeIcon({
      area: 'start'
    }) : nothing}
            \${withStartCheckbox ? checkbox({
      area: 'start',
      id: 'li-cb-4'
    }) : nothing}
            \${withStartRadio ? radio({
      area: 'start',
      id: 'li-rb-4'
    }) : nothing}
            \${withStartSwitch ? switchEl({
      area: 'start',
      id: 'li-sw-4'
    }) : nothing}
            \${variant === 'static' ? html\`<span>List Item Four</span>\` : nothing}
            \${variant === 'button' ? html\`<button type="button" .disabled=\${disabled}>List Item Four</button>\` : nothing}
            \${variant === 'anchor' ? html\`<a href="javascript: void(0);">List Item Four</a>\` : nothing}
            \${twoLine || threeLine ? html\`<span class="forge-list-item__text">Secondary text</span>\` : nothing}
            \${threeLine ? html\`<span class="forge-list-item__text">Tertiary text</span>\` : nothing}
            \${withEndIcon ? forgeIcon({
      area: 'end'
    }) : nothing}
            \${withEndCheckbox ? checkbox({
      area: 'end',
      id: 'li-cb-4'
    }) : nothing}
            \${withEndRadio ? radio({
      area: 'end',
      id: 'li-rb-4'
    }) : nothing}
            \${withEndSwitch ? switchEl({
      area: 'end',
      id: 'li-sw-4'
    }) : nothing}
          </li>
        </ul>
      </div>
    \`;
  }
}`,...(X=(Q=$.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const xt=["Demo","Interactive","WithAnchor","NavigationMenu","Expandable","CSSOnly"],Pt=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:$,Demo:f,Expandable:u,Interactive:h,NavigationMenu:b,WithAnchor:p,__namedExportsOrder:xt,default:vt},Symbol.toStringTag,{value:"Module"}));export{$ as C,f as D,u as E,h as I,Pt as L,b as N,p as W};

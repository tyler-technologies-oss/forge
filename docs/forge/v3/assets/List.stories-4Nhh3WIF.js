import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-C-z8vi0w.js";import{_ as a,l as o,m as s,s as c}from"./utils-BktKkMbo.js";import{n as l,t as u}from"./decorators-Eg-GwljX.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";import{o as p,t as m}from"./icon-BrLOytZD.js";import{G as h,Jt as g,K as _,Q as v,Z as y,Zt as b,_t as x,ht as S,k as C,mt as w,t as T}from"./tyler-icons-CLXzO0Q_.js";import{t as E}from"./expansion-panel-CwBHirYb.js";import{t as D}from"./list-B4jau5I5.js";import{r as O,t as k}from"./style-map-C_WKUe4Y.js";import{n as A}from"./avatar-BAP6hUjV.js";import{t as j}from"./checkbox-BiS9Z7ZV.js";import{t as M}from"./drawer-1BtL2FrW.js";import{t as N}from"./radio-ApjB4j1n.js";import{t as P}from"./switch-DzBJVUhY.js";var F=t({CSSOnly:()=>J,Demo:()=>H,Expandable:()=>K,Interactive:()=>U,Multicolumn:()=>q,NavigationMenu:()=>G,WithAnchor:()=>W,__namedExportsOrder:()=>Y,default:()=>V}),I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{i(),s(),m(),T(),k(),f(),u(),D(),M(),A(),j(),N(),P(),E(),{action:I}=__STORYBOOK_MODULE_ACTIONS__,p.define([w,S,b,g,v,x,y,C,h,_]),L=`forge-list`,R=`forge-list-item`,z=`with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.`,B=I(`forge-list-item-select`),V={title:`Components/List`,render:e=>{let t=o(e),i=t?O(t):r,a=[];for(let t=0;t<4;t++){let i=e.wrap?`List item ${t+1} ${z}`:`List item ${t+1}`,o=e.variant===`button`?n`<button type="button" .disabled=${e.disabled}>${i}</button>`:e.variant===`anchor`?n`<a href="javascript: void(0);">${i}</a>`:n`<span>${i}</span>`;a.push(n`
        <forge-list-item value="list-item-${t+1}" ?selected=${t===0&&e.selected}>
          ${e.withAvatar?n`<forge-avatar slot="start" style="--forge-avatar-background: var(--forge-theme-text-medium);"
                ><forge-icon name="folder"></forge-icon
              ></forge-avatar>`:r}
          ${e.withStartIcon?n`<forge-icon slot="start" name="forge_logo"></forge-icon>`:r}
          ${e.withStartCheckbox?n`<forge-checkbox slot="start" aria-label=${`List Item ${t+1} Start Checkbox`}></forge-checkbox>`:r}
          ${e.withStartRadio?n`<forge-radio name="radios" slot="start" aria-label=${`List Item ${t+1} Start Radio`}></forge-radio>`:r}
          ${e.withStartSwitch?n`<forge-switch slot="start" aria-label=${`List Item ${t+1} Start Switch`}></forge-switch>`:r} ${o}
          ${e.twoLine||e.threeLine?n`<span slot="secondary-text">Secondary text</span>`:r}
          ${e.threeLine?n`<span slot="tertiary-text">Tertiary text</span>`:r}
          ${e.withEndIcon?n`<forge-icon slot="end" name="info"></forge-icon>`:r}
          ${e.withEndCheckbox?n`<forge-checkbox slot="end" aria-label=${`List Item ${t+1} End Checkbox`}></forge-checkbox>`:r}
          ${e.withEndRadio?n`<forge-radio name="radios" slot="end" aria-label=${`List Item ${t+1} End Radio`}></forge-radio>`:r}
          ${e.withEndSwitch?n`<forge-switch slot="end" aria-label=${`List Item ${t+1} End Switch`}></forge-switch>`:r}
        </forge-list-item>
      `)}return n`
      <forge-list
        .dense=${e.dense}
        .indented=${e.indented}
        .selectedValue=${e.selectedValue}
        .twoLine=${e.twoLine}
        .threeLine=${e.threeLine}
        .wrap=${e.wrap}
        .multicolumn=${e.multicolumn}
        style=${i}
        @forge-list-item-select=${B}>
        ${a}
      </forge-list>
    `},component:L,subcomponents:{"List Item":R},decorators:[l(`
    forge-list:not([multicolumn]) {
      max-width: 500px;
    }
  `)],argTypes:{...c({tagName:L,exclude:[`active`,`noninteractive`]}),variant:{control:{type:`select`},options:[`anchor`,`button`,`static`]},...c({tagName:R,exclude:[`active`,`value`,`noninteractive`]}),selectedValue:{control:{type:`select`},options:[`list-item-1`,`list-item-2`,`list-item-3`,`list-item-4`]},disabled:{control:{type:`boolean`},if:{arg:`variant`,eq:`button`}}},args:{variant:`static`,withStartIcon:!1,withEndIcon:!1,withAvatar:!1,withStartCheckbox:!1,withEndCheckbox:!1,withStartRadio:!1,withEndRadio:!1,withStartSwitch:!1,withEndSwitch:!1,disabled:!1,dense:!1,indented:!1,twoLine:!1,threeLine:!1,wrap:!1,selected:!1,multicolumn:!1}},H={},U={args:{variant:`button`}},W={args:{variant:`anchor`}},G={...a,render:()=>n`
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
  `},K={...a,render:()=>n`
    <forge-list>
      <forge-list-item>
        <forge-icon slot="start" name="code"></forge-icon>
        <button type="button" id="li-1">List Item One</button>
        <forge-open-icon slot="end" id="li-open-1"></forge-open-icon>
        <forge-expansion-panel slot="additional-content" trigger="li-1" open-icon="li-open-1">
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
        </forge-expansion-panel>
      </forge-list-item>
      <forge-list-item>
        <forge-icon slot="start" name="face"></forge-icon>
        <button type="button" id="li-2">List Item Two</button>
        <forge-open-icon slot="end" id="li-open-2"></forge-open-icon>
        <forge-expansion-panel slot="additional-content" trigger="li-2" open-icon="li-open-2">
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
        </forge-expansion-panel>
      </forge-list-item>
      <forge-list-item>
        <forge-icon slot="start" name="favorite"></forge-icon>
        <button type="button">List Item Three</button>
      </forge-list-item>
    </forge-list>
  `},q={...a,render:()=>{let e=[];for(let t=0;t<9;t++)e.push(n`
        <forge-list-item>
          <forge-icon slot="start" name="folder"></forge-icon>
          <button type="button">List Item ${t+1}</button>
        </forge-list-item>
      `);return n` <forge-list multicolumn> ${e} </forge-list> `}},J={render:({variant:e,indented:t,wrap:i,dense:a,disabled:s,twoLine:c,threeLine:l,withStartIcon:u,withEndIcon:f,withAvatar:p,withStartCheckbox:m,withEndCheckbox:h,withStartRadio:g,withEndRadio:_,withStartSwitch:v,withEndSwitch:y,selectedValue:b,...x})=>{let S=o(x),C=S?O(S):r,w={"forge-list":!0,"forge-list--indented":t,"forge-list--wrap":i,"forge-list--dense":a,"forge-list--two-line":c,"forge-list--three-line":l},T=({area:e})=>n`<svg class=${d({"forge-icon":!0,"forge-list-item__start":e===`start`,"forge-list-item__end":e===`end`})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Forge design system logo</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>`,E=({area:e,id:t})=>n`<div class=${d({"forge-checkbox":!0,"forge-list-item__start":e===`start`,"forge-list-item__end":e===`end`})}>
        <input type="checkbox" id=${t} />
        <div class="forge-checkbox__icon"></div>
      </div>`,D=({area:e,id:t})=>n`<div class=${d({"forge-radio":!0,"forge-list-item__start":e===`start`,"forge-list-item__end":e===`end`})}>
        <input type="radio" id=${t} name="radios" />
      </div>`,k=({area:e,id:t})=>n`<div class=${d({"forge-switch":!0,"forge-list-item__start":e===`start`,"forge-list-item__end":e===`end`})}>
        <input type="checkbox" switch id=${t} />
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
      </div>`;return n`
      <div class="list-demo" style=${C}>
        <ul class=${d(w)}>
          <li class=${d({"forge-list-item":!0,"forge-list-item--selected":b===`list-item-1`})}>
            ${u?T({area:`start`}):r}
            ${m?E({area:`start`,id:`li-cb-1`}):r}
            ${g?D({area:`start`,id:`li-rb-1`}):r}
            ${v?k({area:`start`,id:`li-sw-1`}):r}
            ${e===`static`?n`<span>List Item One</span>`:r}
            ${e===`button`?n`<button type="button" .disabled=${s}>List Item One</button>`:r}
            ${e===`anchor`?n`<a href="javascript: void(0);">List Item One</a>`:r}
            ${c||l?n`<span class="forge-list-item__text">Secondary text</span>`:r}
            ${l?n`<span class="forge-list-item__text">Tertiary text</span>`:r}
            ${f?T({area:`end`}):r}
            ${h?E({area:`end`,id:`li-cb-1`}):r}
            ${_?D({area:`end`,id:`li-rb-1`}):r}
            ${y?k({area:`end`,id:`li-sw-1`}):r}
          </li>
          <li class=${d({"forge-list-item":!0,"forge-list-item--selected":b===`list-item-2`})}>
            ${u?T({area:`start`}):r}
            ${m?E({area:`start`,id:`li-cb-2`}):r}
            ${g?D({area:`start`,id:`li-rb-2`}):r}
            ${v?k({area:`start`,id:`li-sw-2`}):r}
            ${e===`static`?n`<span>List Item Two</span>`:r}
            ${e===`button`?n`<button type="button" .disabled=${s}>List Item Two</button>`:r}
            ${e===`anchor`?n`<a href="javascript: void(0);">List Item Two</a>`:r}
            ${c||l?n`<span class="forge-list-item__text">Secondary text</span>`:r}
            ${l?n`<span class="forge-list-item__text">Tertiary text</span>`:r}
            ${f?T({area:`end`}):r}
            ${h?E({area:`end`,id:`li-cb-2`}):r}
            ${_?D({area:`end`,id:`li-rb-2`}):r}
            ${y?k({area:`end`,id:`li-sw-2`}):r}
          </li>
          <li class=${d({"forge-list-item":!0,"forge-list-item--selected":b===`list-item-3`})}>
            ${u?T({area:`start`}):r}
            ${m?E({area:`start`,id:`li-cb-3`}):r}
            ${g?D({area:`start`,id:`li-rb-3`}):r}
            ${v?k({area:`start`,id:`li-sw-3`}):r}
            ${e===`static`?n`<span>List Item Three</span>`:r}
            ${e===`button`?n`<button type="button" .disabled=${s}>List Item Three</button>`:r}
            ${e===`anchor`?n`<a href="javascript: void(0);">List Item Three</a>`:r}
            ${c||l?n`<span class="forge-list-item__text">Secondary text</span>`:r}
            ${l?n`<span class="forge-list-item__text">Tertiary text</span>`:r}
            ${f?T({area:`end`}):r}
            ${h?E({area:`end`,id:`li-cb-3`}):r}
            ${_?D({area:`end`,id:`li-rb-3`}):r}
            ${y?k({area:`end`,id:`li-sw-3`}):r}
          </li>
          <li class=${d({"forge-list-item":!0,"forge-list-item--selected":b===`list-item-4`})}>
            ${u?T({area:`start`}):r}
            ${m?E({area:`start`,id:`li-cb-4`}):r}
            ${g?D({area:`start`,id:`li-rb-4`}):r}
            ${v?k({area:`start`,id:`li-sw-4`}):r}
            ${e===`static`?n`<span>List Item Four</span>`:r}
            ${e===`button`?n`<button type="button" .disabled=${s}>List Item Four</button>`:r}
            ${e===`anchor`?n`<a href="javascript: void(0);">List Item Four</a>`:r}
            ${c||l?n`<span class="forge-list-item__text">Secondary text</span>`:r}
            ${l?n`<span class="forge-list-item__text">Tertiary text</span>`:r}
            ${f?T({area:`end`}):r}
            ${h?E({area:`end`,id:`li-cb-4`}):r}
            ${_?D({area:`end`,id:`li-rb-4`}):r}
            ${y?k({area:`end`,id:`li-sw-4`}):r}
          </li>
        </ul>
      </div>
    `}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'button'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'anchor'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
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
  \`
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-list>
      <forge-list-item>
        <forge-icon slot="start" name="code"></forge-icon>
        <button type="button" id="li-1">List Item One</button>
        <forge-open-icon slot="end" id="li-open-1"></forge-open-icon>
        <forge-expansion-panel slot="additional-content" trigger="li-1" open-icon="li-open-1">
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
        </forge-expansion-panel>
      </forge-list-item>
      <forge-list-item>
        <forge-icon slot="start" name="face"></forge-icon>
        <button type="button" id="li-2">List Item Two</button>
        <forge-open-icon slot="end" id="li-open-2"></forge-open-icon>
        <forge-expansion-panel slot="additional-content" trigger="li-2" open-icon="li-open-2">
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
        </forge-expansion-panel>
      </forge-list-item>
      <forge-list-item>
        <forge-icon slot="start" name="favorite"></forge-icon>
        <button type="button">List Item Three</button>
      </forge-list-item>
    </forge-list>
  \`
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const items = [];
    for (let i = 0; i < 9; i++) {
      items.push(html\`
        <forge-list-item>
          <forge-icon slot="start" name="folder"></forge-icon>
          <button type="button">List Item \${i + 1}</button>
        </forge-list-item>
      \`);
    }
    return html\` <forge-list multicolumn> \${items} </forge-list> \`;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
    }): ReturnType<typeof html> => html\`<svg class=\${classMap({
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
    }): ReturnType<typeof html> => html\`<div class=\${classMap({
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
    }): ReturnType<typeof html> => html\`<div class=\${classMap({
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
    }): ReturnType<typeof html> => html\`<div class=\${classMap({
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
}`,...J.parameters?.docs?.source}}},Y=[`Demo`,`Interactive`,`WithAnchor`,`NavigationMenu`,`Expandable`,`Multicolumn`,`CSSOnly`]})))()}export{F as a,W as c,U as i,X as l,H as n,q as o,K as r,G as s,J as t};
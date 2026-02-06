import{A as t,b as e}from"./iframe-ChYTUqET.js";import{s as O,b as V,g as z}from"./utils-CIAtqUFR.js";import{I as P,u as D,l as W,v as q,d as K,t as U,s as Y,w as G,x as J,y as Q,p as X}from"./tyler-icons-B0WPf66k.js";import{o as H}from"./style-map-drh4lmly.js";import{e as a}from"./class-map-ick1tmH2.js";import{s as Z}from"./decorators-DTEKSgMR.js";import"./service-adapter-CffG5Lhq.js";import"./list-C8nVQbQz.js";import"./drawer-eo8EwIfW.js";import"./index-DTwfV0k0.js";import"./avatar-CIyyq-I0.js";import"./checkbox-dR4UZyjy.js";import"./label-6XplHCdu.js";import"./button-Ds7w-yh5.js";import"./focus-indicator-DLoD58zG.js";import"./state-layer-u9rLNX9t.js";import"./button-toggle-group-D1Q-3Cp5.js";import"./icon-button-DJQ87Z9l.js";import"./switch-BeMnyuMU.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";const{action:tt}=__STORYBOOK_MODULE_ACTIONS__;P.define([D,W,q,K,U,Y,G,J,Q,X]);const A="forge-list",R="forge-list-item",et="with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.",nt=tt("forge-list-item-select"),it={title:"Components/List",render:n=>{const l=V(n),C=l?H(l):t,y=[];for(let i=0;i<4;i++){const r=n.wrap?`List item ${i+1} ${et}`:`List item ${i+1}`,o=n.variant==="button"?e`<button type="button" .disabled=${n.disabled}>${r}</button>`:n.variant==="anchor"?e`<a href="javascript: void(0);">${r}</a>`:e`<span>${r}</span>`;y.push(e`
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
        .multicolumn=${n.multicolumn}
        style=${C}
        @forge-list-item-select=${nt}>
        ${y}
      </forge-list>
    `},component:A,subcomponents:{"List Item":R},decorators:[Z(`
    forge-list:not([multicolumn]) {
      max-width: 500px;
    }
  `)],argTypes:{...z({tagName:A,exclude:["active","noninteractive"]}),variant:{control:{type:"select"},options:["anchor","button","static"]},...z({tagName:R,exclude:["active","value","noninteractive"]}),selectedValue:{control:{type:"select"},options:["list-item-1","list-item-2","list-item-3","list-item-4"]},disabled:{control:{type:"boolean"},if:{arg:"variant",eq:"button"}}},args:{variant:"static",withStartIcon:!1,withEndIcon:!1,withAvatar:!1,withStartCheckbox:!1,withEndCheckbox:!1,withStartRadio:!1,withEndRadio:!1,withStartSwitch:!1,withEndSwitch:!1,disabled:!1,dense:!1,indented:!1,twoLine:!1,threeLine:!1,wrap:!1,selected:!1,multicolumn:!1}},h={},p={args:{variant:"button"}},u={args:{variant:"anchor"}},b={...O,render:()=>e`
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
  `},$={...O,render:()=>e`
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
  `},w={...O,render:()=>{const n=[];for(let l=0;l<9;l++)n.push(e`
        <forge-list-item>
          <forge-icon slot="start" name="folder"></forge-icon>
          <button type="button">List Item ${l+1}</button>
        </forge-list-item>
      `);return e` <forge-list multicolumn> ${n} </forge-list> `}},v={render:({variant:n,indented:l,wrap:C,dense:y,disabled:i,twoLine:r,threeLine:o,withStartIcon:x,withEndIcon:_,withAvatar:st,withStartCheckbox:I,withEndCheckbox:L,withStartRadio:S,withEndRadio:T,withStartSwitch:E,withEndSwitch:k,selectedValue:M,...F})=>{const j=V(F),B=j?H(j):t,N={"forge-list":!0,"forge-list--indented":l,"forge-list--wrap":C,"forge-list--dense":y,"forge-list--two-line":r,"forge-list--three-line":o},c=({area:s})=>e`<svg class=${a({"forge-icon":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Forge design system logo</title><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>`,d=({area:s,id:f})=>e`<div class=${a({"forge-checkbox":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="checkbox" id=${f} />
        <div class="forge-checkbox__icon"></div>
      </div>`,g=({area:s,id:f})=>e`<div class=${a({"forge-radio":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="radio" id=${f} name="radios" />
      </div>`,m=({area:s,id:f})=>e`<div class=${a({"forge-switch":!0,"forge-list-item__start":s==="start","forge-list-item__end":s==="end"})}>
        <input type="checkbox" switch id=${f} />
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
      <div class="list-demo" style=${B}>
        <ul class=${a(N)}>
          <li class=${a({"forge-list-item":!0,"forge-list-item--selected":M==="list-item-1"})}>
            ${x?c({area:"start"}):t}
            ${I?d({area:"start",id:"li-cb-1"}):t}
            ${S?g({area:"start",id:"li-rb-1"}):t}
            ${E?m({area:"start",id:"li-sw-1"}):t}
            ${n==="static"?e`<span>List Item One</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item One</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item One</a>`:t}
            ${r||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?c({area:"end"}):t}
            ${L?d({area:"end",id:"li-cb-1"}):t}
            ${T?g({area:"end",id:"li-rb-1"}):t}
            ${k?m({area:"end",id:"li-sw-1"}):t}
          </li>
          <li class=${a({"forge-list-item":!0,"forge-list-item--selected":M==="list-item-2"})}>
            ${x?c({area:"start"}):t}
            ${I?d({area:"start",id:"li-cb-2"}):t}
            ${S?g({area:"start",id:"li-rb-2"}):t}
            ${E?m({area:"start",id:"li-sw-2"}):t}
            ${n==="static"?e`<span>List Item Two</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Two</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Two</a>`:t}
            ${r||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?c({area:"end"}):t}
            ${L?d({area:"end",id:"li-cb-2"}):t}
            ${T?g({area:"end",id:"li-rb-2"}):t}
            ${k?m({area:"end",id:"li-sw-2"}):t}
          </li>
          <li class=${a({"forge-list-item":!0,"forge-list-item--selected":M==="list-item-3"})}>
            ${x?c({area:"start"}):t}
            ${I?d({area:"start",id:"li-cb-3"}):t}
            ${S?g({area:"start",id:"li-rb-3"}):t}
            ${E?m({area:"start",id:"li-sw-3"}):t}
            ${n==="static"?e`<span>List Item Three</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Three</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Three</a>`:t}
            ${r||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?c({area:"end"}):t}
            ${L?d({area:"end",id:"li-cb-3"}):t}
            ${T?g({area:"end",id:"li-rb-3"}):t}
            ${k?m({area:"end",id:"li-sw-3"}):t}
          </li>
          <li class=${a({"forge-list-item":!0,"forge-list-item--selected":M==="list-item-4"})}>
            ${x?c({area:"start"}):t}
            ${I?d({area:"start",id:"li-cb-4"}):t}
            ${S?g({area:"start",id:"li-rb-4"}):t}
            ${E?m({area:"start",id:"li-sw-4"}):t}
            ${n==="static"?e`<span>List Item Four</span>`:t}
            ${n==="button"?e`<button type="button" .disabled=${i}>List Item Four</button>`:t}
            ${n==="anchor"?e`<a href="javascript: void(0);">List Item Four</a>`:t}
            ${r||o?e`<span class="forge-list-item__text">Secondary text</span>`:t}
            ${o?e`<span class="forge-list-item__text">Tertiary text</span>`:t}
            ${_?c({area:"end"}):t}
            ${L?d({area:"end",id:"li-cb-4"}):t}
            ${T?g({area:"end",id:"li-rb-4"}):t}
            ${k?m({area:"end",id:"li-sw-4"}):t}
          </li>
        </ul>
      </div>
    `}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"{}",...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'button'
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'anchor'
  }
}`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};const ot=["Demo","Interactive","WithAnchor","NavigationMenu","Expandable","Multicolumn","CSSOnly"],Tt=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:v,Demo:h,Expandable:$,Interactive:p,Multicolumn:w,NavigationMenu:b,WithAnchor:u,__namedExportsOrder:ot,default:it},Symbol.toStringTag,{value:"Module"}));export{v as C,h as D,$ as E,p as I,Tt as L,w as M,b as N,u as W};

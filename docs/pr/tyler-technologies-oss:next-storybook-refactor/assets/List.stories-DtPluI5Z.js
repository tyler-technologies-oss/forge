import{a as f}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as s}from"./utils-BOMFcC0N.js";import"./list-Cu4wzbUs.js";import"./focus-indicator-By3BQe1w.js";import"./index-Dh0vMUMR.js";import{x as t,T as r}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";const l="forge-list",c="forge-list-item",$="with a long title that spans the seven seas and beyond. It is said it would take a 100 lifetimes to read if you dared to set wrap to true. But only time will tell if this is a talltale or truth be told. May the brave have the courage to toggle such a powerful control.",h=f("forge-list-item-select"),L={title:"Components/List",render:e=>{const a=[];for(let o=0;o<4;o++){const i=e.wrap?`List item ${o+1} ${$}`:`List item ${o+1}`,u=e.variant==="button"?t`<button>${i}</button>`:e.variant==="anchor"?t`<a href="#" target="_blank">${i}</a>`:t`<span>${i}</span>`;a.push(t`
        <forge-list-item
          value="List item ${o+1}"
          ?selected=${o===0&&e.selected}
          @forge-list-item-select=${h}>
          ${u}
          ${e.twoLine||e.threeLine?t`<span slot="secondary-text">Secondary text</span>`:r}
          ${e.threeLine?t`<span slot="tertiary-text">Tertiary text</span>`:r}
        </forge-list-item>`)}return t`
      <forge-list
        .dense=${e.dense}
        .indented=${e.indented}
        .selectedValue=${e.selectedValue}
        .twoLine=${e.twoLine}
        .threeLine=${e.threeLine}
        .wrap=${e.wrap}>
        ${a}
      </forge-list>
    `},component:l,subcomponents:{"List Item":c},argTypes:{...s({tagName:l,exclude:["active","noninteractive"]}),variant:{control:{type:"select"},options:["anchor","button","static"]},...s({tagName:c,exclude:["active","value","noninteractive"]})},args:{variant:"static",dense:!1,indented:!1,twoLine:!1,threeLine:!1,wrap:!1}},n={};var m,p,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const v=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,__namedExportsOrder:v,default:L},Symbol.toStringTag,{value:"Module"}));export{n as D,S as L};

import{b as d}from"./iframe-BWAobhOu.js";import{s as u,g as f}from"./utils-BmZ1G202.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BOGVYiZ9.js";import"./app-bar-profile-button-Dt1-aPj1.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C2isZNDF.js";import"./menu-Db5tVldy.js";import"./linear-progress-CsGp1g6o.js";import"./list-BVxyNe29.js";import"./popover-CMixvJRM.js";import"./overlay-B2Oq3AqY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-B7Gn8FGS.js";import"./avatar-CNy2wjid.js";import"./icon-button-CjKKMho2.js";import"./focus-indicator-DsmueVAt.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-RZkFxRku.js";import"./label-DsFbV3le.js";import"./base-field-BkUfAqwn.js";import"./text-field-DEX3_LrG.js";import"./backdrop-3KzDwztH.js";import"./badge-D6HcRNKM.js";import"./banner-Ro8zNaiJ.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-vccxiSy3.js";import"./button-toggle-group-vww4kAwk.js";import"./button-BZXwUSWo.js";import"./calendar-DlmvU6hF.js";import"./card-D9IB3zRq.js";import"./checkbox-Cp8REoWi.js";import"./chip-set-YaWyaETd.js";import"./circular-progress-DIduwjig.js";import"./color-picker-B2Wu5OLO.js";import"./date-picker-DTbublh2.js";import"./date-range-picker-5pob3cN6.js";import"./divider-DJ0JjzdV.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-Co5SsV4d.js";import"./open-icon-u5IwX--f.js";import"./file-picker-uO9qV1yc.js";import"./floating-action-button-DskyjavD.js";import"./inline-message-fj34p3Px.js";import"./key-item-BBsp2YVJ.js";import"./keyboard-shortcut-BB7azKrI.js";import"./label-value-cTsUvwyw.js";import"./meter-group-CNmc0Waj.js";import"./page-state-DDjhdZbK.js";import"./paginator-DZ7ZBCkn.js";import"./radio-group-DTE-tpfW.js";import"./scaffold-CufLEZ-a.js";import"./secret-BGNliMzc.js";import"./select-dropdown-DIjzQPNz.js";import"./select-CrJD6EGz.js";import"./skip-link-BRsOs8dv.js";import"./slider-B-vKOGJg.js";import"./split-view-SmvrSkAy.js";import"./stack-Bc7kWG9C.js";import"./stepper-CUJBubQB.js";import"./switch-vKLgt2Nh.js";import"./table-DHSXk39C.js";import"./tab-panel-CiLDhWMT.js";import"./time-picker-pY6k3vJT.js";import"./timestamp-tSu9IZbD.js";import"./toast-Ca5cpQsi.js";import"./toolbar-B9K5lYA9.js";import"./tooltip-Db-SDmAb.js";import"./tree-item-CdjlMtdC.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-auUMMqRf.js";import"./split-button-BZe8ycK6.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
        .avatarLetterCount=${n}
        .profileButton=${p}
        .profileButtonText=${e}
        .signOutButton=${t}
        .signOutButtonText=${o}
        .fullName=${r}
        .email=${i}
        .open=${a}>
      </forge-app-bar-profile-button>
    </forge-app-bar>
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};

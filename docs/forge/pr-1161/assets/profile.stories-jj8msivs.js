import{b as d}from"./iframe-BjSnTnt_.js";import{s as u,g as f}from"./utils-CO0dVEgQ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BlH6VSyX.js";import"./app-bar-profile-button-DXDia_E8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CXoZipsS.js";import"./menu-RTvPB5K3.js";import"./linear-progress-BmTkV8LG.js";import"./list-BYnp3_OB.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-DMyVr2gF.js";import"./icon-button-IKBwp3TU.js";import"./focus-indicator-Btk3Yz-z.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-Bgzm4Pxj.js";import"./label-D8WxEvVU.js";import"./button-Ck6-uTmv.js";import"./button-toggle-group-BRY1tfgC.js";import"./checkbox-u4iFTCCd.js";import"./switch-5Hkh9nAu.js";import"./base-field-CJyzSTw-.js";import"./text-field-Dy8OQ6KE.js";import"./backdrop-B-u3npFo.js";import"./badge-6G-TaN4c.js";import"./banner-DRjFXcwg.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-CP-TZu4z.js";import"./calendar-71boLYG2.js";import"./card-BYnLDEow.js";import"./chip-set-BLRzRQTE.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-41jgukaU.js";import"./date-picker-YBW84jYf.js";import"./date-range-picker-CjZ0FFAZ.js";import"./divider-Cdn-HIBQ.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-BoXOdb9_.js";import"./open-icon-CYX6WvgD.js";import"./file-picker-BVjOmAYR.js";import"./floating-action-button-DmhAk2r_.js";import"./inline-message-rggUpLwV.js";import"./key-item-BZZhhhiC.js";import"./keyboard-shortcut-BFzckFL2.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BRuVJktA.js";import"./page-state-B9wnmWpA.js";import"./paginator-BSJF3GAS.js";import"./scaffold-ALuq0Bgn.js";import"./secret-BdmVJ8gl.js";import"./select-dropdown-eynuvRKO.js";import"./select-DeAsgvYt.js";import"./skip-link-BxvJNer8.js";import"./slider-69lYxDiN.js";import"./split-view-DSrAPUfO.js";import"./stack-DGYl-onA.js";import"./stepper-CGm20_Cp.js";import"./table-DHpwkczj.js";import"./tab-bar-CXebMffA.js";import"./time-picker-Db6FcSZo.js";import"./toast-r-zueZ5L.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-CcrjDXK5.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-BBXsrT4f.js";import"./split-button-B7h71oz7.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};

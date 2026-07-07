import{b as d}from"./iframe-BYDrRnOm.js";import{s as u,g as f}from"./utils-CxQpgtu2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-ByBe1hQT.js";import"./app-bar-profile-button-D50D330d.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DhQHOdPt.js";import"./menu-DCEiOJVA.js";import"./linear-progress-DLb8lZjg.js";import"./list-Cez13ixY.js";import"./popover-lzJONmB4.js";import"./overlay-Ba1x-UC-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-DgdlxWFD.js";import"./icon-button-Lifo_E-f.js";import"./focus-indicator-fonQhWdU.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-CELs6Uwh.js";import"./label-BD_Crkmm.js";import"./button-B6oHvYnp.js";import"./button-toggle-group-D1nnZ6m9.js";import"./checkbox-NBvnyxeE.js";import"./switch-ClsoGOlp.js";import"./base-field-Deh_qvHC.js";import"./text-field-CUp5IOz8.js";import"./backdrop-Br-v5NXK.js";import"./badge-C4u6jKzq.js";import"./banner-D_plyLAL.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-CpvCQ9G7.js";import"./calendar-DDnYLHqv.js";import"./card-DU46VE8F.js";import"./chip-set-DCiyOzU8.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Ds6nM5NE.js";import"./date-picker-B1IK2dt1.js";import"./date-range-picker-D-ujNMIo.js";import"./divider-BJCwLEFl.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-BDkLHSUg.js";import"./open-icon-BkpPCj4F.js";import"./file-picker-BSe6MEYp.js";import"./floating-action-button-BFqy9Hrl.js";import"./inline-message-EO-dHXbB.js";import"./key-item-D5A9QEWb.js";import"./keyboard-shortcut-CNdwgg1Z.js";import"./label-value-C46r41pN.js";import"./meter-group-BhnWgqmI.js";import"./page-state-BeEclPwI.js";import"./paginator-BXmZIRxg.js";import"./scaffold-B-1oYF3d.js";import"./secret-BoinjNky.js";import"./select-dropdown-DZLi7Tuh.js";import"./select-BjuJhMcW.js";import"./skip-link-BqDMSCfo.js";import"./slider-BjscwSkN.js";import"./split-view-txgxmxZh.js";import"./stack-DskzmGQg.js";import"./stepper-Trj3r4PD.js";import"./table-C6mW2TNE.js";import"./tab-bar-HCPwintV.js";import"./time-picker-CJKvc3I6.js";import"./timeline-break-CFH8HfDF.js";import"./toast-CmvX5OMy.js";import"./toolbar-B7inSu_h.js";import"./tooltip-C-iOO2tm.js";import"./tree-item-DDwjMy2q.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-BQWxVooe.js";import"./split-button-C4t72B_x.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};

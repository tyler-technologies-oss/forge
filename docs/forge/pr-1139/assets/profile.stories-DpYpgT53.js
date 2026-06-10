import{b as d}from"./iframe-B4qL4WW8.js";import{s as u,g as f}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CzuVxpXq.js";import"./app-bar-profile-button-BMG5G6lJ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-N_dRJhWh.js";import"./menu-rhjmP1El.js";import"./linear-progress-DLb8lZjg.js";import"./list-MRfQ1ZFc.js";import"./popover-BgA7_RAN.js";import"./overlay-BeM6eaPr.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-CySrahNq.js";import"./icon-button-BM3J1fbO.js";import"./focus-indicator-CWvPPMO_.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-ZbtZOCgJ.js";import"./label-Cez-rt1T.js";import"./button-KwClblCq.js";import"./button-toggle-group-BxYW3cle.js";import"./checkbox-BLVeyHfZ.js";import"./switch-nalHzitq.js";import"./base-field-uheUCyyA.js";import"./text-field-_spscdWS.js";import"./backdrop-Br-v5NXK.js";import"./badge-GvuSpuZR.js";import"./banner-BnIxuUaW.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-8sNEeqhF.js";import"./calendar-qRVzwEmp.js";import"./card-BXpTr0jx.js";import"./chip-set-DO9H8W5i.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-DxH4JKCg.js";import"./date-picker-XDPLC6vP.js";import"./date-range-picker-CJu-XkHt.js";import"./divider-CJu1o6qy.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-ins2ej8m.js";import"./open-icon-i2OabBmg.js";import"./file-picker-Do0HCc7f.js";import"./floating-action-button-C-eydPIS.js";import"./inline-message-EO-dHXbB.js";import"./key-item-BgicAxKR.js";import"./keyboard-shortcut-Ce-dNs6X.js";import"./label-value-C46r41pN.js";import"./meter-group-DuArPAL8.js";import"./page-state-BeEclPwI.js";import"./paginator-lhLGAd7B.js";import"./scaffold-B-1oYF3d.js";import"./secret-BFIaEYTi.js";import"./select-dropdown-DEkDJFtK.js";import"./select-Drakk4YN.js";import"./skip-link-BV48jx5L.js";import"./slider-Bmq-0B5Q.js";import"./split-view-Cbp261iT.js";import"./stack-DskzmGQg.js";import"./stepper-Da9s5Vxg.js";import"./table-Dxp3qESg.js";import"./tab-bar-BpMv8GmY.js";import"./time-picker-Kdn5w6bR.js";import"./toast-zxhFedNH.js";import"./toolbar-DlCov7p1.js";import"./tooltip-CbELgf5o.js";import"./tree-item-3QuB55Ib.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-B3gBfOA_.js";import"./split-button-BzgFw8EF.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

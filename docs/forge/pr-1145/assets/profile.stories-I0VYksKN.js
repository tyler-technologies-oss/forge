import{b as d}from"./iframe-oVCy0CKL.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-V6h2-OPj.js";import"./app-bar-profile-button-DnsOTPmD.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B5QTbAtT.js";import"./menu-DiFQqMy1.js";import"./linear-progress-BvuLf7up.js";import"./list-IUhRNIec.js";import"./popover-98RIrDc_.js";import"./overlay-BduRS6k-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-0tvJWIW1.js";import"./avatar-DFDqZrkN.js";import"./icon-button-BkuiL2Hq.js";import"./focus-indicator-PC490wMa.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-BBr1jlor.js";import"./label-BDA3qcRk.js";import"./base-field-DdZdsiFy.js";import"./text-field-CipdUHVs.js";import"./backdrop-SMwLBDG5.js";import"./badge-BI9qGSCu.js";import"./banner-BNNl3TzW.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-CI6G92Xi.js";import"./button-toggle-group-BshhYDlD.js";import"./button-BLRO6C8h.js";import"./calendar-DShZz9jg.js";import"./card-BhaGv1yy.js";import"./checkbox-m4LQtTXF.js";import"./chip-set-BAp8u4V0.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-DtZobSHF.js";import"./date-picker-kc1pB5xH.js";import"./date-range-picker-CJKVGmDn.js";import"./divider-CBWqzXLl.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-fA7Scivn.js";import"./open-icon-c-IUX_XH.js";import"./file-picker-Bv7a4WFZ.js";import"./floating-action-button-BYCyt7vA.js";import"./inline-message-Dej6nioH.js";import"./key-item-EKvtAxx8.js";import"./keyboard-shortcut-BQ-ywjoE.js";import"./label-value-CJDyRgCt.js";import"./meter-group-C5V8IOh3.js";import"./page-state-xtTZreUO.js";import"./paginator-D4JhXJHk.js";import"./radio-group-tH4YQvv6.js";import"./scaffold-l7cEUk27.js";import"./secret-DXPXn3g_.js";import"./select-dropdown-DL0kcMJF.js";import"./select-DA_4284r.js";import"./skip-link-C73iYvmL.js";import"./slider-PccwMSOm.js";import"./split-view-DIJde9oH.js";import"./stack-DYrRnd9D.js";import"./stepper-C5RyMgPr.js";import"./switch-BAmLKqKc.js";import"./table-2kISL-id.js";import"./tab-bar-BrLETRGk.js";import"./time-picker-BX-5w7dx.js";import"./toast-C4ZP_q_g.js";import"./toolbar-Cn3D-JIp.js";import"./tooltip-DSFbs0bB.js";import"./tree-item-Ds5zXQZc.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-h98kcY4b.js";import"./split-button-DuNHo-kx.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

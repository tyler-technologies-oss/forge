import{b as d}from"./iframe-BkfqMPZ2.js";import{s as u,g as f}from"./utils-BUOWcVje.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-DJ5goLCB.js";import"./expansion-panel-C_G1-suY.js";import"./open-icon-D1aYND7B.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-qRy4GWP2.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B4xXB1kz.js";import"./menu-B8Sa5NXk.js";import"./linear-progress-CdLostcG.js";import"./list-C_38r5K6.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-Dw2r0qFf.js";import"./icon-button-f5Q77iYH.js";import"./focus-indicator-DDav8RIj.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-CHx1j0mi.js";import"./label-C1zkt7Qw.js";import"./button-CHZUclR2.js";import"./button-toggle-group-DiuCCWAc.js";import"./checkbox-DaBlnnAu.js";import"./switch-RLwo-drU.js";import"./base-field-PlooMBgy.js";import"./text-field-CXk6dO2m.js";import"./backdrop-C92f0qEt.js";import"./badge-DJqcsPzQ.js";import"./banner-CJqNXgIO.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-CBipAhuD.js";import"./calendar-CgVSzINK.js";import"./card-BExgcS1g.js";import"./chip-set-CyaT3ho1.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-Chma0KwA.js";import"./date-picker-DJrSx0Ks.js";import"./date-range-picker-DkzD57KW.js";import"./divider-CHRaFADc.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-CWpe_tw4.js";import"./floating-action-button-BlUEpi0-.js";import"./inline-message-9zvVMjFA.js";import"./key-item-DUMMHfrl.js";import"./keyboard-shortcut-DUY9vF73.js";import"./label-value-CW81Czz-.js";import"./meter-group-BVUtopNY.js";import"./page-state-Cg6BV8eb.js";import"./paginator-B31OXtwl.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-CE2Gja4N.js";import"./select-BBy9VqTa.js";import"./skip-link-CzTHabhP.js";import"./slider-BxdeQtmd.js";import"./split-view-B7yCI_Nk.js";import"./stack-4trrgLzF.js";import"./stepper-Bph6j62a.js";import"./table-SoKXfxlV.js";import"./tab-bar-lLxhl9i2.js";import"./time-picker-BwcTw_T1.js";import"./toast-DYClhJ1d.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-B1oj3j7d.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-B8bCM9xx.js";import"./split-button-v-FiwTZm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};

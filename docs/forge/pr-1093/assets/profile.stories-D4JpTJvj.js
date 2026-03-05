import{b as d}from"./iframe-CG34Pyww.js";import{s as u,g as f}from"./utils-CUOVSmqg.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-DXXA9fxd.js";import"./expansion-panel-D3Q0t3k2.js";import"./open-icon-CAk2UJIJ.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CaekFkjS.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DJO2-615.js";import"./menu-C-s5Ok3q.js";import"./linear-progress-CdLostcG.js";import"./list-BOJcxtba.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-CvthT5-E.js";import"./icon-button-BOixoLth.js";import"./focus-indicator-684J3Eeo.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-Vkcx6ozB.js";import"./label-C5i5lXak.js";import"./button-C38ZBOvE.js";import"./button-toggle-group-QHe7ank2.js";import"./checkbox-DNYJINVk.js";import"./switch-BGozN540.js";import"./base-field-uXwsmn5v.js";import"./text-field-cYMENDyC.js";import"./backdrop-C92f0qEt.js";import"./badge-zqJerjRA.js";import"./banner-9M-ZNjW_.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-B-n1WBNo.js";import"./calendar-edfIjjF4.js";import"./card-mllA_MQ3.js";import"./chip-set-xisQQT3i.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-CY4SHx_z.js";import"./date-picker-PjFBG-qe.js";import"./date-range-picker-CNHz74NZ.js";import"./divider-CKDe_5wd.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-L2RveygI.js";import"./floating-action-button-PSY3OTWr.js";import"./inline-message-9zvVMjFA.js";import"./key-item-CS5IjHYg.js";import"./keyboard-shortcut-DtTWALVr.js";import"./label-value-CW81Czz-.js";import"./meter-group-ERHcBfmd.js";import"./page-state-Cg6BV8eb.js";import"./paginator-C0tLhH82.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-N5FcI6xS.js";import"./select-B00cieTg.js";import"./skip-link-BFa8J-EF.js";import"./slider-DbIEMAGl.js";import"./split-view-BGV9Iz36.js";import"./stack-4trrgLzF.js";import"./stepper-CbyhA02T.js";import"./table-DL1Qdyvf.js";import"./tab-bar-Cy3yxvY6.js";import"./time-picker-BccOByUf.js";import"./toast-UO3Yh2kF.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-Dc-J0k4j.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-DWoy1XiS.js";import"./split-button-BmTHybDf.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

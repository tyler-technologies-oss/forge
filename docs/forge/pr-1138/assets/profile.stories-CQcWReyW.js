import{b as d}from"./iframe-54dvmREw.js";import{s as u,g as f}from"./utils-CHhwppm_.js";import"./service-adapter-8tADcN_b.js";import"./accordion-81htP23C.js";import"./app-bar-profile-button-BwnTk-mH.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C6Hny9SR.js";import"./menu-CEtVCZob.js";import"./linear-progress-CQSap4jm.js";import"./list-BW0qa89W.js";import"./popover-CUHnDXdw.js";import"./overlay-5BgNu8Uy.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-B1DH9z7r.js";import"./icon-button-CuL33LTi.js";import"./focus-indicator-DGginyZZ.js";import"./state-layer-DF73syxT.js";import"./autocomplete-B5Z7uxJe.js";import"./label-C_tGyKn-.js";import"./button-D03bOLfT.js";import"./button-toggle-group-BXJNUo8n.js";import"./checkbox-BWaV4RnL.js";import"./switch-BrGCo5jz.js";import"./base-field-Cgs4C_gj.js";import"./text-field-XCsJ9gz7.js";import"./backdrop-B_VtJyIN.js";import"./badge-Cp5I_N9k.js";import"./banner-CewP9xrV.js";import"./bottom-sheet-DKT8q8tz.js";import"./dialog-Dwl3PZbB.js";import"./button-area-B6AV5aA8.js";import"./calendar-Zbwr_jCm.js";import"./card-BIM78596.js";import"./chip-set-FNeG1f1-.js";import"./circular-progress-CaUNetLo.js";import"./color-picker-D6HznS4I.js";import"./date-picker-B6fr2voX.js";import"./date-range-picker-Co7Rj-ds.js";import"./divider-DypuW_Kz.js";import"./base-drawer-CyU1ZunB.js";import"./drawer-YtzVjQMj.js";import"./modal-drawer-Br-skC4C.js";import"./mini-drawer-CdmHaLKa.js";import"./expansion-panel-D64QXYyR.js";import"./open-icon-BGtJLnPm.js";import"./file-picker-CU5n8lT7.js";import"./floating-action-button-D8mZET05.js";import"./inline-message-CeWMjtBE.js";import"./key-item-C0TPAHC6.js";import"./keyboard-shortcut-CUnpd7xo.js";import"./label-value-DMg7pXRQ.js";import"./meter-group-D0eMI3o2.js";import"./page-state-CtvoNG-u.js";import"./paginator-CQvi_G9X.js";import"./scaffold-D_SIXSFE.js";import"./secret-BtUY4-zR.js";import"./select-dropdown-VuFLf0g6.js";import"./select-BtRTen42.js";import"./skip-link-S4ScUpoD.js";import"./slider-CfTQ9OmJ.js";import"./split-view-W3JLlKcx.js";import"./stack-D5YailS3.js";import"./stepper-DKnPRIB_.js";import"./table-CQJf4w1e.js";import"./tab-bar-P6302d8N.js";import"./time-picker-Dmc4wQeB.js";import"./toast-CzCJ5VkW.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-DMvFQEd_.js";import"./tree-item-DY-5BhKK.js";import"./view-switcher-LXtNBul2.js";import"./deprecated-icon-button-u-17CUHh.js";import"./split-button-40nrKkoK.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

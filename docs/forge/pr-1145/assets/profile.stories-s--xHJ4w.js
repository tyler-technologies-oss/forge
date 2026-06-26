import{b as d}from"./iframe-DoUS1-oo.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CmBu2Xh3.js";import"./app-bar-profile-button-e9AhMT01.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-cwljV7td.js";import"./menu-CYyuvI-B.js";import"./linear-progress-dFUODLVX.js";import"./list-D34uG9M-.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-sfPSa9bB.js";import"./icon-button-DXwfZBq8.js";import"./focus-indicator-BqjQwaKb.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-B8hUerUr.js";import"./label-CCJpr-qV.js";import"./base-field-B0DwcZ0I.js";import"./text-field-UbjFyvkY.js";import"./backdrop--ezx6yHr.js";import"./badge-CN-nBqa4.js";import"./banner-CVU8hgrJ.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-BGm8V4K7.js";import"./button-toggle-group-CGpzQFu7.js";import"./button-BQPRgvho.js";import"./calendar-C5Yt0nLt.js";import"./card-DsVYzzkj.js";import"./checkbox-0sN7Tiv3.js";import"./chip-set-ci30GtYc.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DoW3er2A.js";import"./date-picker-B5yV8I7d.js";import"./date-range-picker-Cvw-AC4C.js";import"./divider-7SlL6Ghb.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-DyPbB3I8.js";import"./open-icon-MMNJG2ay.js";import"./file-picker-8r5nIqO1.js";import"./floating-action-button-Cewtgn1I.js";import"./inline-message-1YYbEfHN.js";import"./key-item-Di7mVB3O.js";import"./keyboard-shortcut-B6AhE7hD.js";import"./label-value-CMJEsLJf.js";import"./meter-group-OBA6AxJe.js";import"./page-state-BwPC_Hd9.js";import"./paginator-2J1KAM9T.js";import"./radio-group-C2-FmNKb.js";import"./scaffold-BAVRvYZ-.js";import"./secret-BywGxhhg.js";import"./select-dropdown-pFCPNtNg.js";import"./select-Df9t-6Ez.js";import"./skip-link-D2-7vBj9.js";import"./slider-DGwt45W0.js";import"./split-view-D1ZrSCr1.js";import"./stack-BRmnsrL_.js";import"./stepper-BA5RddMe.js";import"./switch-CJrXoDMA.js";import"./table-FnyG0Fbi.js";import"./tab-bar-ZGRHcvji.js";import"./time-picker-_3cPMKbz.js";import"./toast-DvwTNgpF.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-Buq1zWrJ.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-CLYUh4Lb.js";import"./split-button-GViXqYUR.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

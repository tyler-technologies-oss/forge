import{b as d}from"./iframe-z7Ae_yDw.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CL46i0MK.js";import"./app-bar-profile-button-LXc8fwGy.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BOn3z86b.js";import"./menu-BOe7mOYv.js";import"./linear-progress-dFUODLVX.js";import"./list-BnVconLT.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-x1vZKGRL.js";import"./icon-button-BJW60lVc.js";import"./focus-indicator-ClC2A688.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-DCcOyeL_.js";import"./label-CCJpr-qV.js";import"./base-field-CZFBvKHE.js";import"./text-field-YVUkRuzv.js";import"./backdrop--ezx6yHr.js";import"./badge-BPWv6IL8.js";import"./banner-DQGJMe9y.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-DWxF_hV1.js";import"./button-toggle-group-CT-8zb43.js";import"./button-CxbrcL0i.js";import"./calendar-B7jFCpNM.js";import"./card-DTulV1mO.js";import"./checkbox--wrurRCe.js";import"./chip-set-bPr7vT4S.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-D9skf3Ur.js";import"./date-picker-BJ-IoF95.js";import"./date-range-picker-BVqtpkXr.js";import"./divider-BIIXB-l3.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-D4hADAe8.js";import"./open-icon-xBdJP46I.js";import"./file-picker-DhJzbBcH.js";import"./floating-action-button-CzVDnOWe.js";import"./inline-message-1YYbEfHN.js";import"./key-item-sbgfIBsR.js";import"./keyboard-shortcut-CeeAC4kU.js";import"./label-value-CMJEsLJf.js";import"./meter-group-Cs859GOP.js";import"./page-state-BwPC_Hd9.js";import"./paginator-DqChpedi.js";import"./radio-group-DSoqYw8f.js";import"./scaffold-BAVRvYZ-.js";import"./secret-C0WBMYRT.js";import"./select-dropdown-c68qozml.js";import"./select-EcUX5Ex2.js";import"./skip-link-Bcin5KcQ.js";import"./slider-DO4RZmCz.js";import"./split-view-Z3faapgy.js";import"./stack-BRmnsrL_.js";import"./stepper-Ba3u-JRo.js";import"./switch-B3kgtfK6.js";import"./table-BYeDlDZR.js";import"./tab-bar-TIDQp67J.js";import"./time-picker-nMU-twsJ.js";import"./toast-aj8T_6tG.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-8PK33US6.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-Ru6UWWOE.js";import"./split-button-D4NQk3LH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

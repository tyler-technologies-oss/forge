import{b as d}from"./iframe-CsSGZsWc.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B7TX0xcB.js";import"./app-bar-profile-button-CcpcqqN8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CLRLqkf8.js";import"./menu-LZDQmwxZ.js";import"./linear-progress-dFUODLVX.js";import"./list-CCIKok9s.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-CstLOgup.js";import"./icon-button-DAI1ONvZ.js";import"./focus-indicator-DoA5AH4q.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-D2C8L4X1.js";import"./label-CCJpr-qV.js";import"./base-field-BxKvKw7x.js";import"./text-field-BIYU_Ynu.js";import"./backdrop--ezx6yHr.js";import"./badge-Cg9T-bP2.js";import"./banner-yfCaeQPH.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-BF0tmtcQ.js";import"./button-toggle-group-B1tfiE3v.js";import"./button-B8LR0Yj3.js";import"./calendar-YPwHBlo7.js";import"./card-BYRMhCM_.js";import"./checkbox-BDs_YxZH.js";import"./chip-set-DGh-PmnW.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-D8EP7l1i.js";import"./date-picker-Cmpch0Lz.js";import"./date-range-picker-B3bbSBzm.js";import"./divider-C_7vutPK.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-BEnI7WxA.js";import"./open-icon-DvxafrAN.js";import"./file-picker-wVoRgDJT.js";import"./floating-action-button-BZN_9tFQ.js";import"./inline-message-1YYbEfHN.js";import"./key-item-DoEoQK-o.js";import"./keyboard-shortcut-BizGCfzT.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BaIRB8qX.js";import"./page-state-BwPC_Hd9.js";import"./paginator-BVHeiaOc.js";import"./radio-group-DzfJzy8O.js";import"./scaffold-BAVRvYZ-.js";import"./secret-BV8ZwA5G.js";import"./select-dropdown-Njm1Bw2z.js";import"./select-V5lgi0GI.js";import"./skip-link-8FtE2TIP.js";import"./slider-iKppE91x.js";import"./split-view-CI88Vh2u.js";import"./stack-BRmnsrL_.js";import"./stepper-BDPAKyvT.js";import"./switch-Cet73nz0.js";import"./table-MzZ-URZB.js";import"./tab-bar-D8UE5BhP.js";import"./time-picker-GQFsQSdI.js";import"./toast-BTIHmJuw.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-C8Q2_Q9i.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-BvVUCsac.js";import"./split-button-BHA-2NWu.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

import{b as d}from"./iframe-CvOKOd3F.js";import{s as u,g as f}from"./utils-zCyTXnrZ.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-qhnN9Dhm.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BZMX21gE.js";import"./state-layer-D7Damx7l.js";import"./focus-indicator-D4rjhUva.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DRTyRvfU.js";import"./menu-BlJ62tzA.js";import"./linear-progress-Dnev6XAt.js";import"./list-DrfuQcV0.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";import"./avatar-7Qgj_Jkk.js";import"./icon-button-dDjQtfj0.js";import"./autocomplete-DNEfXPT6.js";import"./label-DjhrjYcA.js";import"./button-Bi90NRzP.js";import"./button-toggle-group-BVIytbZM.js";import"./checkbox-DW8QQYdx.js";import"./switch-DReLaeSi.js";import"./base-field-BDjPjPCs.js";import"./text-field-TrCZ3xYL.js";import"./backdrop-DBJsfqA2.js";import"./badge-B5eoFBN0.js";import"./banner-C6vs6cOZ.js";import"./bottom-sheet-Ce3j_iPW.js";import"./dialog-BidBU9U3.js";import"./button-area-CA0AK0GX.js";import"./calendar-C_sbnOBj.js";import"./card-DoZ6dVJM.js";import"./chip-set-BKprp8Rq.js";import"./circular-progress-YjONhwAO.js";import"./color-picker-C1wVmXbh.js";import"./date-picker-CQ6wKSpe.js";import"./date-range-picker-Dtpl9cX1.js";import"./divider-BUi3LQey.js";import"./base-drawer-CMV8i4IQ.js";import"./drawer-6E6dRWgC.js";import"./modal-drawer-S8qVhni2.js";import"./mini-drawer-BD0KMCV8.js";import"./file-picker-CjEb1Wtx.js";import"./floating-action-button-DS80j05t.js";import"./inline-message-D4tR_oFp.js";import"./key-item-BbUCbjlP.js";import"./keyboard-shortcut-YNNDN05D.js";import"./label-value-BrspRHH6.js";import"./meter-group-uWZdtsmz.js";import"./page-state-Ds7MnXyo.js";import"./paginator-BB9ExUfD.js";import"./scaffold-B5aByuW8.js";import"./select-dropdown-CqIm-WFg.js";import"./select-CpxPSkNS.js";import"./skip-link-Dg6-Nju6.js";import"./slider-DZgzOjEW.js";import"./split-view-CkLHLAtp.js";import"./stack-DOOJtDNF.js";import"./stepper-BeKjZBE1.js";import"./table-zH8x9uxO.js";import"./tab-bar-BCSyRZMn.js";import"./time-picker-DJ0uB05t.js";import"./toast-CEWYrknq.js";import"./toolbar-DKTN8__P.js";import"./tooltip-jHI1dl1O.js";import"./tree-item-BBGJykAV.js";import"./view-switcher-CH_mOtvX.js";import"./deprecated-icon-button-CfnBouRs.js";import"./split-button-DHIo14Gm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

import{x as c}from"./iframe-6cPDpsNm.js";import{g as u,s as f}from"./utils-C4vOzYQF.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-52DczsbS.js";import"./expansion-panel-CtPm9dI4.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-Cs8XQ8_L.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-G54Jciam.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-kuXwuZAY.js";import"./menu-CpmG56lU.js";import"./linear-progress-r0Hzg69v.js";import"./list-ld1YzFNy.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-CX8Vak5O.js";import"./icon-button-1R5U55qh.js";import"./autocomplete-DDoGEhND.js";import"./label-BhJThvhc.js";import"./button-BVwEn5NA.js";import"./button-toggle-group-DFmmP4m3.js";import"./checkbox-HQHDW49u.js";import"./switch-BHDCMZTd.js";import"./base-field-g08VN-JW.js";import"./text-field-hB-_nVGa.js";import"./backdrop-BDRZVysw.js";import"./badge-C-_wv753.js";import"./banner-COC1oFN1.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-NVYCgujg.js";import"./calendar-DP0chHV_.js";import"./card-CBZyAmGk.js";import"./chip-set-CdIVwbDD.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-DkXgl0Vy.js";import"./date-picker-B9CHf7QA.js";import"./date-range-picker-BwYWRurJ.js";import"./divider-NNdF1g4c.js";import"./base-drawer-CyECteXI.js";import"./drawer-B9FH5M3o.js";import"./modal-drawer-DeyGxZKd.js";import"./mini-drawer-BWLlcDZ8.js";import"./file-picker-DdRt15T_.js";import"./floating-action-button-Cx3v0bQA.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-Cox-thuw.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-bK4VAAe9.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-ujU4mZfg.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-Drg_beh0.js";import"./select-BqnUat4T.js";import"./skip-link-D11WX_QO.js";import"./slider-D0bM8Ldp.js";import"./split-view-ruKW860c.js";import"./stack-Ca0GDYK5.js";import"./stepper-CSWML9_n.js";import"./table-BKxKEzW2.js";import"./tab-bar-D4SAtktA.js";import"./time-picker-Dd69zSgL.js";import"./toast-CvW8hbpG.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-DkvJSuap.js";import"./split-button-DezFuKYD.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
    `,component:s,argTypes:{...u({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...f,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return c`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],Ft=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ft as P,m as W};

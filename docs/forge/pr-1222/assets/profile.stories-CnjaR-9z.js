import{b as d}from"./iframe-BPj94FGh.js";import{s as u,g as f}from"./utils-LbM5kS63.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bckxvy97.js";import"./app-bar-profile-button-fTlS9ltg.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D8NJqrYQ.js";import"./menu-BEUOKQvv.js";import"./linear-progress-Dh__ll_M.js";import"./list-Bog6thhw.js";import"./popover-b8Gx4sac.js";import"./overlay-MMpEd-75.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DP9gcNgN.js";import"./avatar-_-DI1-TJ.js";import"./icon-button-CR83Kg9m.js";import"./focus-indicator-DDCQz0qC.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-tYeSo9MW.js";import"./label-DntvFisr.js";import"./base-field-DKvZp4s1.js";import"./text-field-BhRaR8G8.js";import"./backdrop-6rFKosil.js";import"./badge-DOWYtknc.js";import"./banner-CcvTs6jh.js";import"./bottom-sheet-CzibY-xn.js";import"./dialog-DqSQzysl.js";import"./button-area-WtMFY0Pu.js";import"./button-toggle-group-BeMdS7Rv.js";import"./button-fWyNfyy9.js";import"./calendar-BTY1cDDi.js";import"./card-BOAJRdnh.js";import"./checkbox-S0wbrtnY.js";import"./chip-set-ihRCQPgy.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-DSU_-0nr.js";import"./date-picker-BhssqJw3.js";import"./date-range-picker-aZYBQ2ZQ.js";import"./divider-Gl_gGqnk.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-BIsU606u.js";import"./open-icon-CUTwfP0D.js";import"./file-picker-BVDL8BKr.js";import"./floating-action-button-BdB76eGc.js";import"./inline-message-DGh2LsDu.js";import"./kbd-DYjwD61B.js";import"./key-item-DMWDnaJn.js";import"./keyboard-shortcut-BLkSP6_U.js";import"./label-value-o_jvt4kl.js";import"./meter-group-RheF0fPl.js";import"./page-state-By0fGZIX.js";import"./paginator-B7feSzkd.js";import"./radio-group-2nWXRnFr.js";import"./scaffold-DlnKxn3X.js";import"./secret-CxVQOAxP.js";import"./select-dropdown-BFj-6rdQ.js";import"./select-8BAXccUm.js";import"./skip-link-DNzLJwJl.js";import"./slider-Di2i4Url.js";import"./split-view-DJ132E5B.js";import"./stack-Cbce-CUg.js";import"./stepper-CDd8xGx6.js";import"./switch-EShiemOX.js";import"./table-Bs65j2Um.js";import"./tab-panel-DkUqwo7y.js";import"./time-picker-Bu9eSgpd.js";import"./timestamp-OUrhjBiQ.js";import"./toast-C_O3YvRg.js";import"./toolbar-Duiannn3.js";import"./tooltip-WnsCuOqb.js";import"./tree-item-BETKErDp.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-BGVWKo7p.js";import"./split-button-hdLiZUtZ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};

import{b as d}from"./iframe-HlIX8nsI.js";import{s as u,g as f}from"./utils-DhPatzMP.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CBMW7RFg.js";import"./expansion-panel-DExwsoGT.js";import"./open-icon-C_jTwCsD.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-DxXsoE2G.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B1nAV5VC.js";import"./menu-MzeWWlwh.js";import"./linear-progress-Buvtsnzw.js";import"./list-2JCez8nQ.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";import"./avatar-CrzMonA2.js";import"./icon-button-kXhWo8t5.js";import"./focus-indicator-DO-4oH1N.js";import"./state-layer-DNIS1N8s.js";import"./autocomplete-Czj5S6PY.js";import"./label-YoDu1hYe.js";import"./button-C32nRzKT.js";import"./button-toggle-group-C7Z2oquR.js";import"./checkbox-IEt9rg4t.js";import"./switch-D4m-nLTp.js";import"./base-field-BqEaAztZ.js";import"./text-field-DXuIdBiY.js";import"./backdrop-oZnGSNKb.js";import"./badge-LpmmrA1A.js";import"./banner-DupgT2z3.js";import"./bottom-sheet-DDpnIaAl.js";import"./dialog-DnEdA4Zv.js";import"./button-area-Ddf19vd3.js";import"./calendar-TwY79W32.js";import"./card-C7PNSpyL.js";import"./chip-set-BvTqyg0d.js";import"./circular-progress-Ci4eSBMs.js";import"./color-picker-DFZyEYD_.js";import"./date-picker-DknlIXOx.js";import"./date-range-picker-DZ0leqKH.js";import"./divider-DhuFTWtL.js";import"./base-drawer-BE-Z-VKe.js";import"./drawer-CndaJZ5M.js";import"./modal-drawer-DJtc-YF3.js";import"./mini-drawer-DMU3MkON.js";import"./file-picker-C0wjiPhr.js";import"./floating-action-button-Dk4mhfjj.js";import"./inline-message-Bx3TFYuF.js";import"./key-item-BU2PeOPu.js";import"./keyboard-shortcut-IvUA1BNM.js";import"./label-value-DtSG8whe.js";import"./meter-group-BdQhAZGc.js";import"./page-state-DMYoHkwa.js";import"./paginator-BjUu2Kjj.js";import"./scaffold-WBY1Y1UI.js";import"./select-dropdown-Dc74TJVJ.js";import"./select-L2jk2k8L.js";import"./skip-link-DULI9kyH.js";import"./slider-EpYFEqG1.js";import"./split-view-CjQMwypy.js";import"./stack-RxD7iAYA.js";import"./stepper-GLJ5WlKI.js";import"./table-BSsJe38T.js";import"./tab-bar-CVa5ae4Z.js";import"./time-picker-B4NDrZYV.js";import"./toast-DqATFgpj.js";import"./toolbar-DZNz2UmX.js";import"./tooltip-CfnSp6nA.js";import"./tree-item-BfR1VjFc.js";import"./view-switcher-RGGrHK6Y.js";import"./deprecated-icon-button-WXraiasE.js";import"./split-button-O04zwv9R.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

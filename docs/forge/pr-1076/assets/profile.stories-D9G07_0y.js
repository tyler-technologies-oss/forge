import{b as d}from"./iframe-B1rDg3rc.js";import{s as u,g as f}from"./utils-dyGV7reF.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CrLRmZVM.js";import"./expansion-panel-C3GW3TPs.js";import"./open-icon-C85rqQKN.js";import"./app-bar-profile-button-B6Gu4c4r.js";import"./state-layer-CwwoRddA.js";import"./focus-indicator-O36tFu3y.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import"./menu-C4qmVCcY.js";import"./linear-progress-BPDXw63a.js";import"./list-DF2pFjlE.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";import"./avatar-C85ANupQ.js";import"./icon-button-COOy05Xm.js";import"./autocomplete-hT8mF6ui.js";import"./label-Cfrg3nW3.js";import"./button-BwyCbBt8.js";import"./button-toggle-group-BE18Gts3.js";import"./checkbox-CvcwHomn.js";import"./switch-DrX5-08d.js";import"./base-field-66zVG-BA.js";import"./text-field-BnrBzcaJ.js";import"./backdrop-D38KdwVf.js";import"./badge-C7OjGb2Q.js";import"./banner-CaSpPRRj.js";import"./bottom-sheet-Bz5tAfnc.js";import"./dialog-BHIjTFN9.js";import"./button-area-D5VrfXgi.js";import"./calendar-CYad09II.js";import"./card-CXNgjeRn.js";import"./chip-set-Btoh-lVc.js";import"./circular-progress-sCU3ipF0.js";import"./color-picker-CPF5ukjo.js";import"./date-picker-CxD6O9GJ.js";import"./date-range-picker-C9phBKgO.js";import"./divider-C8Z9knLF.js";import"./base-drawer-DhUDqhET.js";import"./drawer-CBjgLAp7.js";import"./modal-drawer-B92jreWY.js";import"./mini-drawer-BoKnXVqz.js";import"./file-picker-BoUh9IfX.js";import"./floating-action-button-CAo1ypS5.js";import"./inline-message-Bxm-OuA9.js";import"./key-item-DRbZy-Pm.js";import"./keyboard-shortcut-BUn6QSxQ.js";import"./label-value-CWtpDJwk.js";import"./meter-group-DlqNs359.js";import"./page-state-B0m1Ibgi.js";import"./paginator-Bzk0fGpH.js";import"./scaffold-Cez5RFLR.js";import"./select-dropdown-ClYeqZYH.js";import"./select-BIf68enH.js";import"./skip-link-Dn53U_xX.js";import"./slider-R8oxEXnG.js";import"./split-view-D1tc-HgX.js";import"./stack-Csa7srza.js";import"./stepper-DnPU36mX.js";import"./table-CX4w94bJ.js";import"./tab-bar-CXqorO6F.js";import"./time-picker-tSl2RII9.js";import"./toast-6_d_JI4K.js";import"./toolbar-EYXxyIl9.js";import"./tooltip-CMogPifb.js";import"./tree-item-Dmg-hw4X.js";import"./view-switcher-CFtDEX4F.js";import"./deprecated-icon-button-CkUV5rhj.js";import"./split-button-BDEqLrsA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

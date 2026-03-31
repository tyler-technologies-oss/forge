import{b as d}from"./iframe-DIse7dWG.js";import{s as u,g as f}from"./utils-CAFI_ioD.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CQbdmq26.js";import"./app-bar-profile-button-CJ2uGzgV.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CJFVxose.js";import"./menu-B-wRllNk.js";import"./linear-progress-DP1CUIRM.js";import"./list-rJl9MVef.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-aLWnYKas.js";import"./icon-button-DhxJI1TN.js";import"./focus-indicator-ByV7i1_k.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-CEwB_zQU.js";import"./label-B1PNP--5.js";import"./button-BFEOBbvJ.js";import"./button-toggle-group-BzGLvUha.js";import"./checkbox-BQM1WMl0.js";import"./switch-Dn8_XRDj.js";import"./base-field-JSlC1NGq.js";import"./text-field-B_BE1IeA.js";import"./backdrop-B_VtJyIN.js";import"./badge-DH_vq9Zq.js";import"./banner-sTikr1ei.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-CkmKolFi.js";import"./calendar-BIxDZDXS.js";import"./card-BD9asAl_.js";import"./chip-set-Bknyzdo0.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CQ5zR78Q.js";import"./date-picker-Du6bpx2H.js";import"./date-range-picker-KDrLPz7x.js";import"./divider-T3GzbIy1.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-TRM3fGve.js";import"./open-icon-DWff79wn.js";import"./file-picker-CbJfM2kZ.js";import"./floating-action-button-DDM1Xuzy.js";import"./inline-message-BK9gijHu.js";import"./key-item-B4iiuzX7.js";import"./keyboard-shortcut-C516rbR8.js";import"./label-value-BE9wSmbi.js";import"./meter-group-Ek0Qgqk_.js";import"./page-state-BYBCycIs.js";import"./paginator-intHpzgC.js";import"./scaffold-D_SIXSFE.js";import"./secret-C26p3UpN.js";import"./select-dropdown-h6XCUQIe.js";import"./select-DhADd04t.js";import"./skip-link-DP1PhndY.js";import"./slider-BUgmgSSx.js";import"./split-view-DYcEs4Q2.js";import"./stack-BuaXNRar.js";import"./stepper-DS7Vy-ow.js";import"./table-CNKoNz3i.js";import"./tab-bar-CoGDDXdd.js";import"./time-picker-Cif2pI_g.js";import"./toast-Ct-7_WWN.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DXkn5Zn2.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BcIF5M6h.js";import"./split-button-rH6sYuN4.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

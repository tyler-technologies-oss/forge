import{b as d}from"./iframe-i7EfaxWb.js";import{s as u,g as f}from"./utils-BnVlj7nJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-wX-hKU8u.js";import"./app-bar-profile-button-MiKFi12G.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CEYO8wS0.js";import"./menu-7J2EdnbD.js";import"./linear-progress-DP1CUIRM.js";import"./list-C0gUFmp0.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-RSrh58_q.js";import"./icon-button-FxLtxm1R.js";import"./focus-indicator-BRH0wIUg.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-Dc_Mr1ZR.js";import"./label-B9WHx3Cm.js";import"./button-CnDgXLC2.js";import"./button-toggle-group-YC3LFCAo.js";import"./checkbox-wDBbk7Bn.js";import"./switch-CEVlZ-s7.js";import"./base-field-DCd2jOV_.js";import"./text-field-BpTk0Gli.js";import"./backdrop-B_VtJyIN.js";import"./badge-DYxk_pNB.js";import"./banner-BFFxROZH.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Bbb8x7c8.js";import"./calendar-Dcs4tRot.js";import"./card-OEi-4eQT.js";import"./chip-set-CMPo06Nt.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DmV-2VRj.js";import"./date-picker-CTxMJd2N.js";import"./date-range-picker-DVBHBnuK.js";import"./divider-BC-oTkGr.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-CQ2WU5Iy.js";import"./open-icon-DgLSXJpZ.js";import"./file-picker-BOUC24VI.js";import"./floating-action-button-BerThiPl.js";import"./inline-message-BK9gijHu.js";import"./key-item-K2c3tLFG.js";import"./keyboard-shortcut-EcPCNOMo.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BVVxsHBT.js";import"./page-state-BYBCycIs.js";import"./paginator-Bp6awUpf.js";import"./scaffold-D_SIXSFE.js";import"./secret-B3js3wTC.js";import"./select-dropdown-CXNBFRTX.js";import"./select-d2PDMzfu.js";import"./skip-link-KRb0HliO.js";import"./slider-DWxLWqpn.js";import"./split-view-CUlqqejs.js";import"./stack-BuaXNRar.js";import"./stepper-mm03hrgk.js";import"./table-8H2y-EQE.js";import"./tab-bar-lKlbgTXc.js";import"./time-picker-e2ny5EKa.js";import"./toast-DzMjDLYd.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CUndS755.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BDKuDgQ2.js";import"./split-button-mykwrwUH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

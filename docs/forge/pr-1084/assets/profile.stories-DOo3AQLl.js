import{b as d}from"./iframe-C968nksY.js";import{s as u,g as f}from"./utils-DWX6V94N.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-qhnN9Dhm.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BlYyFM6s.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DRTyRvfU.js";import"./menu-C9qBdRnF.js";import"./linear-progress-Dnev6XAt.js";import"./list-BBJyroMD.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";import"./avatar-CgTTqmUj.js";import"./icon-button-XSoXgn_Y.js";import"./focus-indicator-kmsJjA3V.js";import"./state-layer-D7Damx7l.js";import"./autocomplete-Bu53YyCd.js";import"./label-DXROT2e8.js";import"./button-w0jPws2W.js";import"./button-toggle-group-By0fBApA.js";import"./checkbox-B51zW713.js";import"./switch-BiyA8dzM.js";import"./base-field-8Wp1oxjl.js";import"./text-field-ijRlUfbl.js";import"./backdrop-DBJsfqA2.js";import"./badge-YMU_Bkmv.js";import"./banner-DBp4KBnb.js";import"./bottom-sheet-Ce3j_iPW.js";import"./dialog-BidBU9U3.js";import"./button-area-CHUTGfRG.js";import"./calendar-CTQlHNhk.js";import"./card-wL8pMkBa.js";import"./chip-set-tSMorQPX.js";import"./circular-progress-YjONhwAO.js";import"./color-picker-5brkVgLV.js";import"./date-picker-Cdi3ha3j.js";import"./date-range-picker-CtTiWEon.js";import"./divider-BUi3LQey.js";import"./base-drawer-CMV8i4IQ.js";import"./drawer-6E6dRWgC.js";import"./modal-drawer-S8qVhni2.js";import"./mini-drawer-BD0KMCV8.js";import"./file-picker-DJ45wf34.js";import"./floating-action-button-BnMK0LXc.js";import"./inline-message-D4tR_oFp.js";import"./key-item-DIsjQEVf.js";import"./keyboard-shortcut-YNNDN05D.js";import"./label-value-BrspRHH6.js";import"./meter-group-DuWc0f7D.js";import"./page-state-Ds7MnXyo.js";import"./paginator-BIYmkLrs.js";import"./scaffold-B5aByuW8.js";import"./select-dropdown-BNh5VFa3.js";import"./select-DeEpVUVc.js";import"./skip-link-B-RJmx8i.js";import"./slider-CoMXAB23.js";import"./split-view-CeCsLx_c.js";import"./stack-DOOJtDNF.js";import"./stepper-CzfXBGrr.js";import"./table-B-hK3tf9.js";import"./tab-bar-CBRiBfUI.js";import"./time-picker-Bo0Bty4M.js";import"./toast-s0URM7xQ.js";import"./toolbar-DKTN8__P.js";import"./tooltip-jHI1dl1O.js";import"./tree-item-vBjDOHev.js";import"./view-switcher-CH_mOtvX.js";import"./deprecated-icon-button-D7UmpjNB.js";import"./split-button-DGwlG4It.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

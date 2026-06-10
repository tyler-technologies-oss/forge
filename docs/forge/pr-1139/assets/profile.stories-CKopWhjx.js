import{b as d}from"./iframe-D7yGoXUc.js";import{s as u,g as f}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-COUaSk7p.js";import"./app-bar-profile-button-DSKoUly4.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DQPVwFP_.js";import"./menu-Ds69yPWn.js";import"./linear-progress-DLb8lZjg.js";import"./list-DS45qf86.js";import"./popover-CCF5Rgnf.js";import"./overlay-BcO3gIlA.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-BNKtKOxW.js";import"./icon-button-gU_wqqLD.js";import"./focus-indicator-C_ZgqUBS.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-Dfr5al9T.js";import"./label-C2aoKVOL.js";import"./button-Cq-ljBAf.js";import"./button-toggle-group-CJ3R-Ddh.js";import"./checkbox-B0ryUDnH.js";import"./switch-DbZlW4o-.js";import"./base-field-BnfSyDU8.js";import"./text-field-DlJG8uyW.js";import"./backdrop-Br-v5NXK.js";import"./badge-BR6UdpmR.js";import"./banner-DfYj65-w.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-vhiMBTy1.js";import"./calendar-BLh4hiB6.js";import"./card-BKah7p5A.js";import"./chip-set-Doubcy0S.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Dlu1jkIS.js";import"./date-picker-BUanxAkF.js";import"./date-range-picker-DrwTzosv.js";import"./divider-DMbBP4fr.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-DSi6tOfF.js";import"./open-icon-D7LqGRIa.js";import"./file-picker-oFl50s94.js";import"./floating-action-button-C_h7wmlw.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Dzv-SVjR.js";import"./keyboard-shortcut-xGVYmv2D.js";import"./label-value-C46r41pN.js";import"./meter-group-D6vdOwsF.js";import"./page-state-BeEclPwI.js";import"./paginator-C9b5kQmh.js";import"./scaffold-B-1oYF3d.js";import"./secret-CH4so0Dd.js";import"./select-dropdown-CzLNuJR-.js";import"./select-DBbrKeTK.js";import"./skip-link-_QbxSoZy.js";import"./slider-DKqoVh5c.js";import"./split-view-DBUoGcDb.js";import"./stack-DskzmGQg.js";import"./stepper-BR3ej3l-.js";import"./table-DYx7RKuO.js";import"./tab-bar-CzgK71oT.js";import"./time-picker-CfNKN-Ph.js";import"./toast-HXFy6mcq.js";import"./toolbar-DGkadOPX.js";import"./tooltip-DMHiENAZ.js";import"./tree-item-6ggds-b1.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-C9eqKsxZ.js";import"./split-button-Ch2A8yJg.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

import{b as d}from"./iframe-D3ywNwM8.js";import{s as u,g as f}from"./utils-DI4_RuhW.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bj4YjFbN.js";import"./app-bar-profile-button-S58fsRAk.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B-oGyIaD.js";import"./menu-DiOOlW3h.js";import"./linear-progress-DLb8lZjg.js";import"./list-Drs8GpbO.js";import"./popover-CwCOnS6V.js";import"./overlay-CHo1bjNa.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar--VYXUsGR.js";import"./icon-button-C-gmku5F.js";import"./focus-indicator-L8jLY3bP.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-BcLGlvuO.js";import"./label-DSKa9dGD.js";import"./button-jbDXhbVx.js";import"./button-toggle-group-D3b7Fof0.js";import"./checkbox-BULrRoA1.js";import"./switch-CNr0V07u.js";import"./base-field-_ogFqgFi.js";import"./text-field-Dy5AkmIq.js";import"./backdrop-Br-v5NXK.js";import"./badge-sm_dRb1K.js";import"./banner-BPSVi3QM.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-D5whCPES.js";import"./calendar-BA1KMkIF.js";import"./card-kMaCCB0o.js";import"./chip-set-CTNif94r.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-LkeRQoSF.js";import"./date-picker-mYuLLO1f.js";import"./date-range-picker-2LG9bN2P.js";import"./divider-C2rifY9z.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Cs4bmUMC.js";import"./open-icon-lLXUZ9dO.js";import"./file-picker-8YjEvxm3.js";import"./floating-action-button-D7VU3q7w.js";import"./inline-message-EO-dHXbB.js";import"./key-item-CAsmdyKX.js";import"./keyboard-shortcut-C7606aOO.js";import"./label-value-C46r41pN.js";import"./meter-group-BSFeyXPT.js";import"./page-state-BeEclPwI.js";import"./paginator-CykPTkhA.js";import"./scaffold-B-1oYF3d.js";import"./secret-B7I65b0X.js";import"./select-dropdown-quKX_lXx.js";import"./select-vEybfJiH.js";import"./skip-link-CMVBXWMu.js";import"./slider-CGo7DqIb.js";import"./split-view-Do8yzCcC.js";import"./stack-DskzmGQg.js";import"./stepper-BVyxrQzl.js";import"./table-D56IsUp-.js";import"./tab-bar-B0VuSy4w.js";import"./time-picker-C8Q9ORQC.js";import"./timeline-break-DF9CQAV3.js";import"./toast-DcDoY4pL.js";import"./toolbar-CIJK0Tzd.js";import"./tooltip-B_O9h6Rp.js";import"./tree-item-n5oXXDrG.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-mBDLvK2_.js";import"./split-button-BwjTHL4Q.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

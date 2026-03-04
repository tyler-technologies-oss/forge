import{b as d}from"./iframe-6jvvl83j.js";import{s as u,g as f}from"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-DxYdaCID.js";import"./expansion-panel-ClBSbOiN.js";import"./open-icon-C5Nap6r8.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-CpnTpsBC.js";import"./state-layer-CDycYdPe.js";import"./focus-indicator-uWMef9QC.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-_ZRRE207.js";import"./menu-C6DBPHOx.js";import"./linear-progress-DAF_c_Qg.js";import"./list-n8XxbbWm.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./skeleton-BEzRyBrd.js";import"./avatar-CpjMD2dN.js";import"./icon-button-Bs31_lcM.js";import"./autocomplete-DcNQ85oY.js";import"./label-DeJt3_F9.js";import"./button-gG20MWYF.js";import"./button-toggle-group-BEE-9owA.js";import"./checkbox-C-zSna6d.js";import"./switch-DDhwKpy9.js";import"./base-field-Zo4to8fb.js";import"./text-field-DRhXxEw0.js";import"./backdrop-JQaHonK5.js";import"./badge-CxS8NskQ.js";import"./banner-D5JJmysT.js";import"./bottom-sheet-gC932635.js";import"./dialog-CMWG5v4z.js";import"./button-area-B5Na-g1k.js";import"./calendar-B4rq4PDe.js";import"./card-ylDKlB-w.js";import"./chip-set-BnlBtPoY.js";import"./circular-progress-DvgFMT2P.js";import"./color-picker-CTH_jwnI.js";import"./date-picker-iUZ0fzel.js";import"./date-range-picker-BqaG_Ds7.js";import"./divider-B_OILhdX.js";import"./base-drawer-CgGVTosj.js";import"./drawer-CBK_snqa.js";import"./modal-drawer-B4G239H3.js";import"./mini-drawer-BLOTeDXk.js";import"./file-picker-BQIurMnQ.js";import"./floating-action-button-tn6KaCjz.js";import"./inline-message-aYzonakd.js";import"./key-item-wOoRZCGm.js";import"./keyboard-shortcut-DzM9x902.js";import"./label-value-I-fyl3XO.js";import"./meter-group-Dl3NjJFM.js";import"./page-state-CiJNOtHF.js";import"./paginator-Cphh8BL6.js";import"./scaffold-DRWrbyLH.js";import"./select-dropdown-BhPTK2Gl.js";import"./select-C_6yOCc1.js";import"./skip-link-Dh2ym03k.js";import"./slider-B2ndz8_q.js";import"./split-view-BiJwHIn-.js";import"./stack-hYrAUTOo.js";import"./stepper-EYcDv-ai.js";import"./table-Bhz6LtQn.js";import"./tab-bar-GKbQcYCc.js";import"./time-picker-BPPZGqC1.js";import"./toast-Du8poT2d.js";import"./toolbar-CJhTaBYA.js";import"./tooltip-D6IG9xiN.js";import"./tree-item-BZOZ-FDG.js";import"./view-switcher-pdDr6yH3.js";import"./deprecated-icon-button-C5SgkF9c.js";import"./split-button-DrqBgRXQ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};

import{b as d}from"./iframe-DMB8y2Lk.js";import{s as u,g as f}from"./utils-CqVN-aYX.js";import"./service-adapter-8tADcN_b.js";import"./accordion-bW4b1unh.js";import"./app-bar-profile-button-DEqqY3ge.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-q3qt_rXj.js";import"./menu-hqANTDB_.js";import"./linear-progress-BvuLf7up.js";import"./list-Dpozo5Vs.js";import"./popover-DGXtkWZ2.js";import"./overlay-gLArHX3C.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CxWWXsKD.js";import"./avatar-CpqEZalC.js";import"./icon-button-CuvVCAic.js";import"./focus-indicator-Z65mqrHe.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-Beh3b5Tn.js";import"./label-CtOXRnEQ.js";import"./base-field-BMt88HlZ.js";import"./text-field-IZlwEFX7.js";import"./backdrop-SMwLBDG5.js";import"./badge-BFBj9MQi.js";import"./banner-C9mF7SZi.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-C4mvuQme.js";import"./button-toggle-group-Bpa5MWtD.js";import"./button-DEzPgAqM.js";import"./calendar-DxFOq1z6.js";import"./card-CIWuVsOo.js";import"./checkbox-CcIbF4gU.js";import"./chip-set-Bao77nzT.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-N66UEPXF.js";import"./date-picker-DYGe_MbN.js";import"./date-range-picker-YQvqaD6r.js";import"./divider-rDWdxIay.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-D5BgVMfo.js";import"./open-icon-BNYhGlj8.js";import"./file-picker-DOJPQPZA.js";import"./floating-action-button-CIpOqnJt.js";import"./inline-message-Dej6nioH.js";import"./key-item-By2PEjn4.js";import"./keyboard-shortcut--wykzj_t.js";import"./label-value-CJDyRgCt.js";import"./meter-group-BD7Pxt4s.js";import"./page-state-xtTZreUO.js";import"./paginator-DT4qra52.js";import"./radio-group-CQSrXybe.js";import"./scaffold-l7cEUk27.js";import"./secret-i1iVXtPf.js";import"./select-dropdown-xx_NiRKG.js";import"./select-DX_Fyl5j.js";import"./skip-link-D4kbsAIA.js";import"./slider-kXDT_RaM.js";import"./split-view-CnLFSGvp.js";import"./stack-DYrRnd9D.js";import"./stepper-CxCMSQeH.js";import"./switch-BSoF-cUx.js";import"./table-DYJPoDTE.js";import"./tab-bar-DVV4RxWB.js";import"./time-picker-Ccg6qbzQ.js";import"./toast-DipUGrBn.js";import"./toolbar-DX4Q6lV7.js";import"./tooltip-CifLNMza.js";import"./tree-item-Etxot378.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-DaZCzBG0.js";import"./split-button-D5y8QrXL.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

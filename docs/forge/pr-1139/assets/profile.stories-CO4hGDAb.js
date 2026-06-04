import{b as d}from"./iframe-Cw7KEIxV.js";import{s as u,g as f}from"./utils-Bhs_gPRq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-cBaQb8Oh.js";import"./app-bar-profile-button-DaDKp5TL.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BkylKoYy.js";import"./menu-CHE0O06z.js";import"./linear-progress-CKPFd0xY.js";import"./list-BLbp3BZn.js";import"./popover-C3RcZ0IP.js";import"./overlay-BxCKAaVb.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-DKQzeFai.js";import"./icon-button-DMbE_Gq7.js";import"./focus-indicator-8tlC_kG5.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-BIDf6RFL.js";import"./label-H9_kqpx1.js";import"./button-D0S5f0pR.js";import"./button-toggle-group-TutWxXkU.js";import"./checkbox-D7Egrepk.js";import"./switch-bw6IQb5b.js";import"./base-field-DfpgISva.js";import"./text-field-CuEilQaG.js";import"./backdrop-DuhijlGd.js";import"./badge-Do3Q1ndU.js";import"./banner-BLx4eKu-.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-CCOob5pT.js";import"./calendar-CvSNlsKM.js";import"./card-DeUlfnMO.js";import"./chip-set-ClBG59YX.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-DKqv0G8w.js";import"./date-picker-LN4x8ccF.js";import"./date-range-picker-CdGp1zCy.js";import"./divider-FvIFlZ0T.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-D403CMyO.js";import"./open-icon-70jJ1VZg.js";import"./file-picker-Dw5N8fmu.js";import"./floating-action-button-2w8gDYO4.js";import"./inline-message-CzR1CZl4.js";import"./key-item-s9AmEk7u.js";import"./keyboard-shortcut-CNM1jipW.js";import"./label-value-CI8WZIke.js";import"./meter-group-DZA9xJFf.js";import"./page-state-DLzWYTpL.js";import"./paginator-sPhkj2h7.js";import"./scaffold-D6_2VrU0.js";import"./secret-DhGziwvg.js";import"./select-dropdown-Cmmq1j9u.js";import"./select-gjjmyHyS.js";import"./skip-link-DYPHpZU_.js";import"./slider-CxtsNszp.js";import"./split-view-C4ShKWNF.js";import"./stack-DqNjYC3W.js";import"./stepper-CvpJU3cE.js";import"./table-TF5paL0w.js";import"./tab-bar-CDY1HTds.js";import"./time-picker-CVA73Vfh.js";import"./toast-YHV6DdGz.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-CG4jFip8.js";import"./tree-item-DN_YoBMq.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-CrTUI1KY.js";import"./split-button-qvEqqju4.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

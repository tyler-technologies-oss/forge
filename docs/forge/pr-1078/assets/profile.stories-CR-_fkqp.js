import{b as d}from"./iframe-CqmBxxxw.js";import{s as u,g as f}from"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CqMi06dt.js";import"./expansion-panel-Dv8zOBvR.js";import"./open-icon-Ppa_qRd_.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-BlWLmQYm.js";import"./state-layer-CDycYdPe.js";import"./focus-indicator-BGIlkLsU.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D-59dOyn.js";import"./menu-BTcl7HkI.js";import"./linear-progress-DAF_c_Qg.js";import"./list-DTk5X6mh.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./skeleton-BEzRyBrd.js";import"./avatar-C2qvkq1x.js";import"./icon-button-CRjf1LQA.js";import"./autocomplete-CegGfmLJ.js";import"./label-AubqXluV.js";import"./button-DX_DhTaU.js";import"./button-toggle-group-D_Dzo2at.js";import"./checkbox-Bv0J0WTO.js";import"./switch-DLphmdNU.js";import"./base-field-aEi7nshb.js";import"./text-field-BIGWGZBU.js";import"./backdrop-JQaHonK5.js";import"./badge-Bm2snKF_.js";import"./banner-DgosgY5h.js";import"./bottom-sheet-gC932635.js";import"./dialog-CMWG5v4z.js";import"./button-area-K02tIhA8.js";import"./calendar-BCEf_K1j.js";import"./card-CNCcq8o5.js";import"./chip-set-DBn6xXLh.js";import"./circular-progress-DvgFMT2P.js";import"./color-picker-CZRUznW_.js";import"./date-picker-u7KDKqx-.js";import"./date-range-picker-9e_gOFJf.js";import"./divider-B_OILhdX.js";import"./base-drawer-CgGVTosj.js";import"./drawer-CBK_snqa.js";import"./modal-drawer-B4G239H3.js";import"./mini-drawer-BLOTeDXk.js";import"./file-picker-D9NtBj-D.js";import"./floating-action-button-ssC_pXGx.js";import"./inline-message-aYzonakd.js";import"./key-item-C8tRJA5Y.js";import"./keyboard-shortcut-DzM9x902.js";import"./label-value-I-fyl3XO.js";import"./meter-group-YGymspQ1.js";import"./page-state-CiJNOtHF.js";import"./paginator-DH_pIg2D.js";import"./scaffold-DRWrbyLH.js";import"./select-dropdown-CUdZEGmO.js";import"./select-CUQ1S5RC.js";import"./skip-link-BkzvSbdd.js";import"./slider-BGv9hqya.js";import"./split-view-Bx4P3DOK.js";import"./stack-hYrAUTOo.js";import"./stepper-BTUXdC6E.js";import"./table-hhP3uOpY.js";import"./tab-bar-Co-yglDg.js";import"./time-picker-C27N63_e.js";import"./toast-BHWKLxmZ.js";import"./toolbar-CJhTaBYA.js";import"./tooltip-D6IG9xiN.js";import"./tree-item-BWiB__lk.js";import"./view-switcher-pdDr6yH3.js";import"./deprecated-icon-button-CdFBe4s0.js";import"./split-button-nqtOs812.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

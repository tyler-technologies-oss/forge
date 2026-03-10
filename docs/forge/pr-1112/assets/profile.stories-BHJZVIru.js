import{b as d}from"./iframe-BqpmPwq_.js";import{s as u,g as f}from"./utils-Dyztg_A4.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BU1Cztks.js";import"./app-bar-profile-button--n3rypGr.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./menu-DDzUQVjY.js";import"./linear-progress-DJCUZyG6.js";import"./list-DxoqoHfM.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./avatar-CvKEOuDy.js";import"./icon-button-v27EN9qr.js";import"./focus-indicator-BHHgalS6.js";import"./state-layer-D0PE-_Ks.js";import"./autocomplete-BlDK21st.js";import"./label-DK09rgTn.js";import"./button-Bttm48HU.js";import"./button-toggle-group-fRLgIYT2.js";import"./checkbox-HEdstB8E.js";import"./switch-kS9Yl3-l.js";import"./base-field-CpGwF63l.js";import"./text-field-BDwQUTE6.js";import"./backdrop-D_yGNC2E.js";import"./badge-CzDPFYFX.js";import"./banner-VPrSRlrP.js";import"./bottom-sheet-Ca7i8NLD.js";import"./dialog-Be0VDz-Q.js";import"./button-area-Bl4cRS5Z.js";import"./calendar-Bj1ac908.js";import"./card-CoIYVQUN.js";import"./chip-set-hes5nmbh.js";import"./circular-progress-CqL7HYv9.js";import"./color-picker-N_nJurDj.js";import"./date-picker-DHP4YgNB.js";import"./date-range-picker-BU0ZOthR.js";import"./divider-CFdicjKI.js";import"./base-drawer-BnnNJiqc.js";import"./drawer-Bhr3bs1s.js";import"./modal-drawer-mTx20ZEu.js";import"./mini-drawer-bZpKaAxY.js";import"./expansion-panel-fbEqa6VA.js";import"./open-icon-CU8SdVAE.js";import"./file-picker-D9iNplof.js";import"./floating-action-button-CXeBfAqA.js";import"./inline-message-CrfY1HGc.js";import"./key-item-DR4b-UFa.js";import"./keyboard-shortcut-BwrfozYa.js";import"./label-value-BFzJp2nK.js";import"./meter-group-iYlnghzU.js";import"./page-state-FbD8mDEF.js";import"./paginator-Bhedg_4p.js";import"./scaffold-1Jx5bjjO.js";import"./select-dropdown-BZueEZut.js";import"./select-N6QI5bpB.js";import"./skip-link-C4WYYdDd.js";import"./slider-ChK9fPKP.js";import"./split-view-D5yp_aJU.js";import"./stack-DxVg50Xs.js";import"./stepper-BmwfSbtn.js";import"./table-kMRHoJqG.js";import"./tab-bar-LmdSlEk9.js";import"./time-picker-rTrACsUY.js";import"./toast-D5sd-Bnb.js";import"./toolbar-Bf50hayz.js";import"./tooltip-CNBOgnFN.js";import"./tree-item-Csw03lqZ.js";import"./view-switcher-CcYqDgDr.js";import"./deprecated-icon-button-__9UdqlR.js";import"./split-button-D9FHPCu1.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

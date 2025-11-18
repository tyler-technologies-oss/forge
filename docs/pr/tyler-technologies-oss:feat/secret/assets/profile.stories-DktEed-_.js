import{x as c}from"./iframe-CSGc-9i1.js";import{g as u,s as f}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-Cd5doxfX.js";import"./expansion-panel-BVSc4qx-.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-51V83pf6.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-D44tT1xv.js";import{I as g}from"./icon-8E01u_jy.js";import"./menu-loaz4Jm2.js";import{t as E,a as b,b as C,c as y}from"./tyler-icons-DSFxyJDy.js";import"./linear-progress-r0Hzg69v.js";import"./list-DtNhvwRU.js";import"./popover-BAoNoe3k.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-CUpcDMQk.js";import"./icon-button-Bg2-fVpI.js";import"./autocomplete-BV38R3ug.js";import"./label-DPY4klp1.js";import"./button-Bki5-cWt.js";import"./button-toggle-group-B97AwIfi.js";import"./checkbox-o5QzGLyK.js";import"./switch-D3v_I57m.js";import"./base-field-CD_0w8HJ.js";import"./text-field-DckpEdB0.js";import"./backdrop-BDRZVysw.js";import"./badge-CkPmD3dJ.js";import"./banner-bhqABPoI.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-DQUuz-xF.js";import"./calendar-DKICQwY0.js";import"./card-DHzr1c62.js";import"./chip-set-CKvK8I11.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-CPCgzNnc.js";import"./date-picker-U80c3ppq.js";import"./date-range-picker-BJnY8Fww.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-_P9naweP.js";import"./floating-action-button-s1ro7PDX.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-CDRqXGKK.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-5-SOcZ10.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-FsEt8p55.js";import"./scaffold-BrokB2Ba.js";import"./secret-CHGnbafv.js";import"./select-dropdown-BO--jMcE.js";import"./select-CeQ7cRoI.js";import"./skip-link-BJFqLdRv.js";import"./slider-CHy4yw64.js";import"./split-view-ChaBpox9.js";import"./stack-Ca0GDYK5.js";import"./stepper-DTAwZfhe.js";import"./table-C2dzK0Au.js";import"./tab-bar-DOKWR5fP.js";import"./time-picker-MyHoxosU.js";import"./toast-Q7ok_n86.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-BLh1wqJa.js";import"./split-button-CM7PW0p5.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
    `,component:s,argTypes:{...u({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...f,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return c`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};

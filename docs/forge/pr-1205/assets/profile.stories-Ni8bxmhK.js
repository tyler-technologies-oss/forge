import{b as d}from"./iframe-CGF9490j.js";import{s as u,g as f}from"./utils-cbnKSSEt.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-DTaALSMd.js";import"./app-bar-menu-button-DVmUUxYf.js";import"./app-bar-profile-button-CK07oWjB.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CM84cyec.js";import"./menu-BoRK6ol3.js";import"./linear-progress-Du-Ntegu.js";import"./list-EiOoI77I.js";import"./popover-CBkkBxnw.js";import"./overlay-iu-_ABPF.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ZvFpE85R.js";import"./list-item-BwYEQ33V.js";import"./avatar-B7h22bVK.js";import"./icon-button-D1wmfd79.js";import"./autocomplete-f3l_Be1N.js";import"./label-CtoUkODo.js";import"./base-field-D8CxI0Jj.js";import"./focus-indicator-BuzCXwAm.js";import"./text-field-V39Mt-6S.js";import"./backdrop-e4rWKi0D.js";import"./badge-BfXwQdqa.js";import"./banner-YIL7yTpX.js";import"./bottom-sheet-C2SvqPsM.js";import"./dialog-CGeB4Flg.js";import"./button-area-DypEoyMu.js";import"./button-toggle-group-DM1kvl4T.js";import"./button-X-BaipNf.js";import"./calendar-WFRAhrnZ.js";import"./card-BggT-zBh.js";import"./checkbox-BjuLW923.js";import"./chip-set-DRKXmCcP.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-8FRnVfhI.js";import"./date-picker-Bm3aEs4x.js";import"./date-range-picker-BHqkBcOg.js";import"./divider-BzjCc6TM.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-BFvy7dNk.js";import"./open-icon-BDuGFBPz.js";import"./file-picker-qieYJaGv.js";import"./floating-action-button-Uitf1v_W.js";import"./inline-message-D6TY8UzG.js";import"./key-item-Crc6qGSt.js";import"./keyboard-shortcut-CKpUL8EG.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-dTvndwx1.js";import"./meter-group-uB9uJbQT.js";import"./page-state-C_fu_Hm3.js";import"./paginator-BlGZB6YS.js";import"./radio-group-zePoHbkV.js";import"./scaffold-C8LskKFX.js";import"./secret-Bh82KRH-.js";import"./option-BA9lA4Kv.js";import"./select-dropdown-GzGT9sXo.js";import"./select-B1TRBwRF.js";import"./skip-link-Da6pvf55.js";import"./slider-CtDPa1iV.js";import"./split-view-CNoae3vm.js";import"./stack-Grf8E1p3.js";import"./stepper-Puq66nUQ.js";import"./switch-1aMvoHy8.js";import"./table-D4yIvrTD.js";import"./tab-panel-BZ5MTAj5.js";import"./time-picker-BCZ6_qqy.js";import"./timestamp-BZgNY179.js";import"./toast-dpHRnoIj.js";import"./toolbar-D4s_V7c3.js";import"./tooltip-u84XDAZH.js";import"./tree-item-4BCjKdRf.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-BoJt1vt9.js";import"./split-button-CjgQw8tq.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Qt as P,l as W};

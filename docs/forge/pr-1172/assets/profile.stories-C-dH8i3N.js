import{b as d}from"./iframe-Ct7_Im3r.js";import{s as u,g as f}from"./utils-YUGVIsXY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BSbg8nrB.js";import"./app-bar-profile-button-P5X1ncIl.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DHcFYUo8.js";import"./menu-C8uTwp6w.js";import"./linear-progress-BvuLf7up.js";import"./list-BZX3BfXR.js";import"./popover-mByQYqA1.js";import"./overlay-B4lWdMx2.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-9R_n9OY2.js";import"./icon-button-Bl0BWpRR.js";import"./autocomplete--n38x35G.js";import"./label-DIaGplDT.js";import"./button-CseKomli.js";import"./button-toggle-group-aLPXvlfd.js";import"./focus-indicator-CrKoG3Nd.js";import"./checkbox-D9bMPwhq.js";import"./switch-DwqAQuQf.js";import"./base-field-CCo-4VS7.js";import"./text-field-C_N2HQqH.js";import"./backdrop-SMwLBDG5.js";import"./badge-BUo2oWcY.js";import"./banner-BTkYn8ee.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-ChIF771t.js";import"./calendar-2kZbIc92.js";import"./card-Cd2DEfI2.js";import"./chip-set-4y51DhDX.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CZJi_L_e.js";import"./date-picker-cnjmRfDb.js";import"./date-range-picker-CQDglOff.js";import"./divider-DD8uvhxV.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DKywKqIa.js";import"./open-icon-qT7GFCH0.js";import"./file-picker-o4LJnebw.js";import"./floating-action-button-DmxSB-Ze.js";import"./inline-message-Dej6nioH.js";import"./key-item-DrZBStRL.js";import"./keyboard-shortcut-CswOvusr.js";import"./label-value-CJDyRgCt.js";import"./meter-group-7Sazfebw.js";import"./page-state-xtTZreUO.js";import"./paginator-CXr54Vko.js";import"./scaffold-l7cEUk27.js";import"./secret-D3em97yk.js";import"./select-dropdown-Cb-aoezb.js";import"./select-D5ODPpEs.js";import"./skip-link-VOUTEvDP.js";import"./slider-qQBHEUFh.js";import"./split-view-Bbr15cK3.js";import"./stack-DYrRnd9D.js";import"./stepper-BCvmb8cv.js";import"./table-jT_u-1ma.js";import"./tab-bar-CZdl7TQP.js";import"./time-picker-BOq4W6P_.js";import"./toast-Wr6V4s0r.js";import"./toolbar-B_QLjelg.js";import"./tooltip-ylaJPtpW.js";import"./tree-item-f4BEaGw9.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-Rc3fthZl.js";import"./split-button-RZjZQdTO.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

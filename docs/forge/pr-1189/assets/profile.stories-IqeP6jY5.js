import{b as d}from"./iframe-DhPPATOI.js";import{s as u,g as f}from"./utils-BUEgyQuR.js";import"./service-adapter-gy1PbA1l.js";import"./accordion-CVxNcXqO.js";import"./app-bar-menu-button-DD6-mDnN.js";import"./app-bar-profile-button-kCSUMpdG.js";import{I as g,a as E,b,c as C,d as y}from"./icon-DaCKLlYs.js";import"./menu-BDuuGK0D.js";import"./linear-progress-BGu4ylYb.js";import"./list-BQeID-EI.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-D0Kw-TGm.js";import"./list-item-Czcdb5bP.js";import"./avatar-Db8N8ihi.js";import"./icon-button-C2v-Sinx.js";import"./autocomplete-DKzqKby3.js";import"./label-D4E_mm-6.js";import"./base-field-Mwf4T1kF.js";import"./focus-indicator-Cy6URCXv.js";import"./text-field-BWtqe7xr.js";import"./backdrop-Cme44_g_.js";import"./badge-C-_a_oin.js";import"./banner-CyikUPby.js";import"./bottom-sheet-KuMRRU4q.js";import"./dialog-DGghfkK0.js";import"./button-area-IAVzIT9I.js";import"./button-toggle-group-D3kaTgcy.js";import"./button-D5tK2bf-.js";import"./calendar-B1HggwMd.js";import"./card-xZjk_lrn.js";import"./checkbox-Bgp1tKl-.js";import"./chip-set-DW8HxT5C.js";import"./state-layer-D75fz-rw.js";import"./circular-progress-D4RaVrYZ.js";import"./color-picker-2UOSVK_F.js";import"./date-picker-Bvgn5KHz.js";import"./date-range-picker-BG_WQ2GV.js";import"./divider-DrBQytg-.js";import"./base-drawer-BL5lye2C.js";import"./drawer-lU6k92RL.js";import"./modal-drawer-BZ72iO8w.js";import"./mini-drawer-OoNkqIRy.js";import"./expansion-panel-B0kFDtRV.js";import"./open-icon-CD6pRoqI.js";import"./file-picker-3iTwqp6j.js";import"./floating-action-button-DFWyBCJn.js";import"./inline-message-BPZn-wv9.js";import"./key-item-Bw2Delzo.js";import"./keyboard-shortcut--lvwNh3B.js";import"./label-value-Arz5rsAk.js";import"./meter-group-CKWk1yE2.js";import"./page-state-DpE8pwA_.js";import"./paginator-CywmcBMW.js";import"./radio-group-DrtVHBVn.js";import"./scaffold-BVJBr1z1.js";import"./secret-CxwwCYfT.js";import"./select-dropdown-B-Jd_TaC.js";import"./select-Z-fll7Bu.js";import"./skip-link-Cnc6ikzR.js";import"./slider-CSqmYK-c.js";import"./split-view-BDb1aCjJ.js";import"./stack-k5bE-KTo.js";import"./stepper-Dvw9sdHr.js";import"./switch-BdWbb_wW.js";import"./table-4QhGonzI.js";import"./tab-panel-CLq4K60J.js";import"./time-picker-BNX7fr4c.js";import"./timestamp-fCuepr5Y.js";import"./toast-DIupd_v2.js";import"./toolbar-7MtW3mBN.js";import"./tooltip-BJ-I3FD9.js";import"./tree-item-Bxz-ijwX.js";import"./view-switcher-BCdzMvcV.js";import"./deprecated-icon-button-Ddu9MTiL.js";import"./split-button-DtXi3ffH.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};

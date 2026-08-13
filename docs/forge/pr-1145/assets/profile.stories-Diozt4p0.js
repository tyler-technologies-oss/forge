import{b as d}from"./iframe-HMJ7n3dG.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-nX4RsbqD.js";import"./app-bar-profile-button-BH19qtLl.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dp2vVtqR.js";import"./menu-ClX53aIN.js";import"./linear-progress-BvuLf7up.js";import"./list-DLgiAqMd.js";import"./popover-Cl_Kh6c4.js";import"./overlay-ZODNJdUy.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BodZg-5h.js";import"./avatar-becK9-63.js";import"./icon-button-B6QZ7nwE.js";import"./focus-indicator-D6uj4Uta.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-Dp7Ymx1F.js";import"./label-ChkWMY1h.js";import"./base-field-i7HruBdo.js";import"./text-field-D5j8DA1w.js";import"./backdrop-SMwLBDG5.js";import"./badge-CeHJMMHm.js";import"./banner-5y7n1f24.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-BwlYKHsf.js";import"./button-toggle-group-Dv9iUC6J.js";import"./button-lth0lefQ.js";import"./calendar-Cy6ny0LD.js";import"./card-BEicWyAT.js";import"./checkbox-cpRNNYvk.js";import"./chip-set-7EViyoJ8.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-Mf4Jv7zO.js";import"./date-picker-DLjSUr77.js";import"./date-range-picker-BK0v-Mk-.js";import"./divider-UjS7GMjq.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DUjanMnE.js";import"./open-icon-DPAe6937.js";import"./file-picker-DUwKz_ae.js";import"./floating-action-button-uyMnPUSp.js";import"./inline-message-Dej6nioH.js";import"./key-item-DVUUdzkH.js";import"./keyboard-shortcut-B_bSUQlU.js";import"./label-value-CJDyRgCt.js";import"./meter-group-B-kSFT0k.js";import"./page-state-xtTZreUO.js";import"./paginator-BmGvNJK9.js";import"./radio-group-6a6L8UVg.js";import"./scaffold-l7cEUk27.js";import"./secret-D1x1M39j.js";import"./select-dropdown-B5XIvtGE.js";import"./select-Bxxy3sig.js";import"./skip-link-BQ-O_45V.js";import"./slider-D-sxboB6.js";import"./split-view-DJtNYlYl.js";import"./stack-DYrRnd9D.js";import"./stepper-EnWnVZ2n.js";import"./switch-IMKnM8dX.js";import"./table-jxopWdxQ.js";import"./tab-bar-BVxnxVyk.js";import"./time-picker-C2yezabX.js";import"./toast-DBnGVua3.js";import"./toolbar-CTlDDdeo.js";import"./tooltip-hhOZ6EKj.js";import"./tree-item-BpleGp-E.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-C7ZMYRhH.js";import"./split-button-BCT76cdE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

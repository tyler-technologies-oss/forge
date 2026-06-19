import{b as d}from"./iframe-DVkCwayn.js";import{s as u,g as f}from"./utils-DdM9-TOU.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bju4UCGb.js";import"./app-bar-profile-button-DFI_vFS2.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cgf0s-mg.js";import"./menu-Ber7q_hx.js";import"./linear-progress-BvuLf7up.js";import"./list-BXQsrNmJ.js";import"./popover-BlNpEvTu.js";import"./overlay-28eYr5_V.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-Bd2S7TSu.js";import"./icon-button-Bo2inTOg.js";import"./autocomplete-djlZCL5B.js";import"./label-CiukcC95.js";import"./button-CS24bbOS.js";import"./button-toggle-group-DGFvxll2.js";import"./focus-indicator-DhDYsd3D.js";import"./checkbox-DGvqAXro.js";import"./switch-B389hJLx.js";import"./base-field-KxAV97UB.js";import"./text-field-xfFJOiAD.js";import"./backdrop-SMwLBDG5.js";import"./badge-qpaRsKmM.js";import"./banner-CklL7CQk.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-wJUYO31f.js";import"./calendar-Duf0iqiU.js";import"./card-Cz1s75aV.js";import"./chip-set-Bdz2ISmW.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-BjRBTZNG.js";import"./date-picker-DeB9lMY7.js";import"./date-range-picker-CochveAZ.js";import"./divider-BjwgLGTs.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-Dzu2UNzD.js";import"./open-icon-C63OJEFz.js";import"./file-picker-BRIUhgc5.js";import"./floating-action-button-CQBjHcl5.js";import"./inline-message-Dej6nioH.js";import"./key-item-BJyLa84Z.js";import"./keyboard-shortcut-DhnIfPzf.js";import"./label-value-CJDyRgCt.js";import"./meter-group-DgcMR1kq.js";import"./page-state-xtTZreUO.js";import"./paginator-B8h--4DA.js";import"./scaffold-l7cEUk27.js";import"./secret-CyC8uSRM.js";import"./select-dropdown-BxDVA05v.js";import"./select-DIb25EHS.js";import"./skip-link-B-EM4o_Y.js";import"./slider-DFuOlD2Y.js";import"./split-view-2SeZDF7k.js";import"./stack-DYrRnd9D.js";import"./stepper-MjPaY5jZ.js";import"./table-ORbHM-GU.js";import"./tab-bar-Cy4PunTc.js";import"./time-picker-BRN7WKsh.js";import"./toast-ue0CkcVD.js";import"./toolbar-DdsEVZdr.js";import"./tooltip-CR19x8g7.js";import"./tree-item-C1VSINCT.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-BdEB7zoY.js";import"./split-button-C7o_BGd-.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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

import{b as d}from"./iframe-BJxToyET.js";import{s as u,g as f}from"./utils-UHZ10xki.js";import"./service-adapter-8tADcN_b.js";import"./accordion-RRt90sRv.js";import"./app-bar-menu-button-1cKXt_wX.js";import"./app-bar-profile-button-CBWn5KGD.js";import{I as g}from"./icon-CxJqbZxZ.js";import"./menu-aLJCoXgh.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BAsQ94Lf.js";import"./linear-progress-BFcPS07f.js";import"./list-DcLkysYS.js";import"./popover-CyhOFEuV.js";import"./overlay-DJKQ8z9g.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-gZ6y8N7F.js";import"./list-item-CkV3pnHm.js";import"./avatar-MHFWGlvf.js";import"./icon-button-Jr3jBluS.js";import"./autocomplete-BAZ4Jny5.js";import"./label-D3aYJFzX.js";import"./base-field-CvxMEI8-.js";import"./focus-indicator-DrGqahUv.js";import"./text-field-Cqx3plho.js";import"./backdrop-DRDqOFah.js";import"./badge-lk4WKqw5.js";import"./banner-D67lyRfR.js";import"./bottom-sheet-DK4QcdmV.js";import"./dialog-DX49i-fZ.js";import"./button-area-DDZcRCLo.js";import"./button-toggle-group-DMyC3tpi.js";import"./button-BFMR-gG-.js";import"./calendar-Bm1iSSyA.js";import"./card-CkiTlThZ.js";import"./checkbox-owQ4xjG0.js";import"./chip-set-AET7Bsn_.js";import"./state-layer-C_jpB3Dn.js";import"./circular-progress-B6JHX0hV.js";import"./color-picker-Ho48nmAF.js";import"./date-picker-BnAr5mK4.js";import"./date-range-picker-DgpdC0gr.js";import"./divider-B4C5KLYP.js";import"./base-drawer-DyN1qGQ4.js";import"./drawer-DVzWakGj.js";import"./modal-drawer-BJ5voIVv.js";import"./mini-drawer-zT43CQ5q.js";import"./expansion-panel-BTn2JIx2.js";import"./open-icon-SDij93t6.js";import"./file-picker-DVSiVm6s.js";import"./floating-action-button-Cpo4Aipj.js";import"./inline-message-BfZQ61t1.js";import"./key-item-a89Z7DiP.js";import"./keyboard-shortcut-ByjEp9ng.js";import"./label-value-Dd33niBr.js";import"./listbox-BvwrO52E.js";import"./meter-group-DZ8W54Oa.js";import"./page-state-kROZlh-1.js";import"./paginator-1kcK-8Qg.js";import"./radio-group-CLo_ybCV.js";import"./scaffold-Bfaw0bF8.js";import"./secret-ywx-qkiI.js";import"./option-BrTo5tGE.js";import"./select-dropdown-CszhW8x2.js";import"./select-CNDx-9Qu.js";import"./skip-link-BK0CyKT0.js";import"./slider-CJ8vReLs.js";import"./split-view-C7t8fbPJ.js";import"./stack-DJDsqZ2Z.js";import"./stepper-Be_7bHgx.js";import"./switch-CrbMwA5a.js";import"./table-CPn2ZiFk.js";import"./tab-panel-C4qHpVEF.js";import"./time-picker-CyedJypy.js";import"./timestamp-D0gDgQOH.js";import"./toast-BBPNIzAg.js";import"./toolbar-D4eiazkc.js";import"./tooltip-DAmw-RhN.js";import"./tree-item-CBO-JSWQ.js";import"./view-switcher-Bm7PcBPE.js";import"./deprecated-icon-button-BEs0RKUT.js";import"./split-button-BL3FUSt4.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Vt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Vt as P,l as W};

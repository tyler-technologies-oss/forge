import{b as t}from"./iframe-BsWNYj34.js";import"./service-adapter-8tADcN_b.js";import"./app-layout-CKnMQnkf.js";import"./badge-C4OPzmQY.js";import"./button-CtcS03YF.js";import"./card-DkzXc1IY.js";import"./date-picker-DxEI2jHB.js";import"./calendar-BsymnUPU.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-Csig8kiH.js";import"./icon-BUxeVNUp.js";import"./text-field-BSJIXTpk.js";import"./base-field-DZXXPrI8.js";import"./focus-indicator-Bk7H1xfH.js";import"./label-4k9r-Qn3.js";import"./divider-Cmk3s280.js";import"./list-DRNq441o.js";import"./list-item-DedBsUVI.js";import"./option-Cy1-rc0E.js";import"./select-dropdown-CZqsN6Fs.js";import"./linear-progress-BuMeIIdZ.js";import"./popover-Dlk7E9HG.js";import"./overlay-Cf6QOhOg.js";import"./skeleton-BlJfl3pU.js";import"./select-HmDDw0Qu.js";import"./stack-Bd7iC-xk.js";import"./tab-panel-DNZ73mhU.js";import"./toolbar-M4wgHqgc.js";import"./tooltip-vxqZR3qG.js";import"./preload-helper-PPVm8Dsz.js";import"./property-DjxtPSwu.js";import"./state-CbHYH1xk.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./tyler-icons-D62AQmQV.js";import"./base-lit-element-uFwdyarG.js";import"./async-directive-CNb4_GPI.js";import"./directive-CwRn8Fwj.js";import"./utils-C31il88P.js";import"./app-bar-menu-button-BTh7rlBG.js";import"./class-map-Bo5d0TOS.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./custom-element-DR9AFpIK.js";import"./icon-button-constants-JHHxiN9v.js";import"./base-component-BFu9bkgC.js";import"./base-button-B4XSMArk.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./state-layer-gtlkuVuf.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dialog-C4E5MayG.js";import"./backdrop-ngk7d2eo.js";import"./dismissible-stack-DyoP5jNB.js";import"./drawer-B-04gfFR.js";import"./base-drawer-L9q0-_V8.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-CEn9vZb3.js";import"./scaffold-Ca9xBuAs.js";import"./button-constants-DRqTH6Pv.js";import"./base-date-picker-core-BBheI7O9.js";import"./a11y-BxM9_46k.js";import"./object-utils-CUPteeNI.js";import"./event-utils-C1SDeUaq.js";import"./with-label-aware-B4Q13qtt.js";import"./floating-ui.dom-DaMtbvS2.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./switch-constants-BZVST_qJ.js";import"./with-element-internals-CFYP_epH.js";import"./custom-element-C-crYl4r.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./circular-progress-BCp-Zc6w.js";import"./with-longpress-listener-D4ROnnkg.js";import"./with-form-associated-BZpZ-kob.js";import"./list-dropdown-aware-core-BmoOVxRU.js";import"./list-dropdown-LFHtkVOg.js";import"./scroll-axis-observer-DmuibK9q.js";import"./provide-CZDhzwTe.js";import"./live-Couw9aIP.js";import"./focus-group-CFQOf4z4.js";const l="forge-app-layout",Ue={title:"Components/App Layout",component:l,render:o=>{const e={heading3:"forge-typography--heading1",heading4:"forge-typography--heading2",heading5:"forge-typography--heading3",body1:"forge-typography--body1",label1:"forge-typography--label1"};return t`
      <style>
        * {
          box-sizing: border-box !important;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          padding: 0;
          margin: 0;
        }

        forge-app-layout:state(small) {
          .main-content-container {
            grid-template-columns: 1fr;
          }

          .column-2 {
            grid-column: 1;
          }
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
        }

        .secondary-header {
          --forge-toolbar-background: transparent;
        }

        .body {
          height: 100%;
          background-color: var(--forge-theme-surface-dim);
          padding-inline: var(--forge-spacing-medium);
        }

        .tab-container {
          grid-column: 1 / -1;
        }

        .main-content-container {
          display: grid;
          grid-template-columns: 9fr 3fr;
          gap: var(--forge-spacing-medium);
          grid-auto-rows: min-content;
          margin-block-start: var(--forge-spacing-medium);
        }

        .details-card {
          grid-column: 1;
        }

        .column-2 {
          grid-column: 2;
          display: flex;
          flex-direction: column;
          gap: var(--forge-spacing-medium);
        }

        .label-value-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          column-gap: var(--forge-spacing-medium);
          row-gap: var(--forge-spacing-xsmall);
          align-items: center;
        }

        forge-button[variant='tonal'] {
          --forge-button-tonal-background: #e5e8f7;
        }
      </style>
      <forge-app-layout app-title=${o.appTitle} breakpoint=${o.breakpoint} use-mini-drawer ?mini-hover=${o.miniHover}>
        <forge-list navlist slot="navigation" data-forge-app-layout-close>
          <forge-list-item selected id="tooltip-host-dashboard">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-dashboard">Dashboard</forge-tooltip>`}
            <forge-icon slot="leading" name="visibility" external></forge-icon>
            <button type="button">Dashboard</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-analytics">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-analytics">Analytics</forge-tooltip>`}
            <forge-icon slot="leading" name="analytics" external></forge-icon>
            <button type="button">Analytics</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-reports">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-reports">Reports</forge-tooltip>`}
            <forge-icon slot="leading" name="assessment" external></forge-icon>
            <button type="button">Reports</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-users">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-users">Users</forge-tooltip>`}
            <forge-icon slot="leading" name="people" external></forge-icon>
            <button type="button">Users</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-settings">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-settings">Settings</forge-tooltip>`}
            <forge-icon slot="leading" name="settings" external></forge-icon>
            <button type="button">Settings</button>
          </forge-list-item>
          <forge-list-item id="tooltip-host-help">
            ${o.miniHover?"":t`<forge-tooltip anchor="tooltip-host-help">Help</forge-tooltip>`}
            <forge-icon slot="leading" name="help" external></forge-icon>
            <button type="button">Help</button>
          </forge-list-item>
        </forge-list>

        <main slot="body" class="body">
          <forge-toolbar class="secondary-header" no-divider>
            <!-- Back button - always visible -->
            <forge-stack inline alignment="center" gap="32" slot="before-start">
              <forge-stack alignment="center" inline gap="8">
                <forge-icon-button aria-label="Go back" density="small">
                  <forge-icon name="arrow_back" external></forge-icon>
                </forge-icon-button>
                <h2 class="${e.heading5}">Cory Ander</h2>
              </forge-stack>
              <forge-stack inline alignment="center" gap="8">
                <forge-badge theme="secondary">Interview pending</forge-badge>
                <forge-badge theme="info">Internal</forge-badge>
              </forge-stack>
            </forge-stack>
          </forge-toolbar>
          <div class="tab-container">
            <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
              <forge-tab>Applicant information</forge-tab>
              <forge-tab>Documents</forge-tab>
              <forge-tab>Interviews</forge-tab>
              <forge-tab>Messages</forge-tab>
            </forge-tab-bar>
          </div>

          <div class="main-content-container">
            <forge-card class="details-card">
              <forge-stack gap="24">
                <h3 class="${e.heading4}">Details</h3>
                <div class="label-value-grid">
                  <label slot="label" class="${e.label1}">Applied for</label>
                  <span slot="value" class="${e.body1}">Senior software engineer</span>
                  <label slot="label" class="${e.label1}">Application date</label>
                  <span slot="value" class="${e.body1}">January 1, 2024</span>
                </div>
                <div class="tab-container">
                  <forge-tab-bar data-aria-label="Demo tabs" active-tab="0" clustered slot="start">
                    <forge-tab>Personal information</forge-tab>
                    <forge-tab>Qualifications</forge-tab>
                    <forge-tab>Work history</forge-tab>
                    <forge-tab>References</forge-tab>
                  </forge-tab-bar>
                </div>
                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Education</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">Massachusetts Institute of Technology</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Masters of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Science</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Institution</label>
                      <span slot="value" class="${e.body1}">University of California, Berkeley</span>
                      <label slot="label" class="${e.label1}">Degree</label>
                      <span slot="value" class="${e.body1}">Bachelors of Science</span>
                      <label slot="label" class="${e.label1}">Area 1</label>
                      <span slot="value" class="${e.body1}">Computer Engineering</span>
                      <label slot="label" class="${e.label1}">Area 2</label>
                      <span slot="value" class="${e.body1}">Mathematics</span>
                    </div>
                  </forge-stack>
                </forge-stack>
                <forge-divider></forge-divider>

                <forge-stack gap="24">
                  <h4 class="${e.heading3}">Certifications</h4>
                  <forge-stack gap="24">
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">AWS Certified Solutions Architect</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Cloud Computing</span>
                      <label slot="label" class="${e.label1}">Level</label>
                      <span slot="value" class="${e.body1}">Professional</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                    <div class="label-value-grid">
                      <label slot="label" class="${e.label1}">Type</label>
                      <span slot="value" class="${e.body1}">Certified Scrum Master</span>
                      <label slot="label" class="${e.label1}">Area</label>
                      <span slot="value" class="${e.body1}">Agile Methodology</span>
                      <label slot="label" class="${e.label1}">Effective date</label>
                      <span slot="value" class="${e.body1}">01/01/2026</span>
                      <label slot="label" class="${e.label1}">Expiration date</label>
                      <span slot="value" class="${e.body1}">01/01/2028</span>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-stack>
            </forge-card>

            <div class="column-2">
              <forge-card>
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Workflow Status</h3>
                  <forge-select
                    label="Applicant status"
                    aria-label="Label"
                    label-position="block-start"
                    label-alignment="default"
                    variant="outlined"
                    theme="default"
                    shape="default"
                    density="default"
                    value="1"
                    placeholder
                    support-text-inset
                    select-all-label="Select all">
                    <forge-option value="1">Interview</forge-option>
                    <forge-option value="2">Option 2</forge-option>
                    <forge-option value="3">Option 3</forge-option>
                  </forge-select>
                  <forge-stack gap="8">
                    <forge-button variant="filled">
                      <forge-icon name="calendar_today" slot="start" external></forge-icon>
                      <span>Schedule interview</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="send_variant_outline" slot="start" external></forge-icon>
                      <span>Send reference request</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Interview details</h3>
                  <forge-date-picker>
                    <forge-text-field label-position="block-start">
                      <label for="date-picker">Date</label>
                      <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="mm/dd/yyyy" />
                    </forge-text-field>
                  </forge-date-picker>
                  <forge-stack gap="8">
                    <forge-button variant="tonal">
                      <forge-icon name="question_answer" slot="start" external></forge-icon>
                      <span>Generate questions</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="star_border" slot="start" external></forge-icon>
                      <span>Add evaluation</span>
                    </forge-button>
                    <forge-button variant="tonal">
                      <forge-icon name="notes" slot="start" external></forge-icon>
                      <span>View notes</span>
                    </forge-button>
                  </forge-stack>
                </forge-stack>
              </forge-card>

              <forge-card class="workflow-status-card">
                <forge-stack gap="16">
                  <h3 class="${e.heading4}">Verification status</h3>
                  <forge-stack gap="8">
                    <div class="label-value-grid">
                      <span class="${e.label1}">Background check</span>
                      <forge-badge theme="info-secondary">Initiated</forge-badge>

                      <span class="${e.label1}">Reference check</span>
                      <forge-badge theme="tertiary">Sent</forge-badge>
                    </div>
                  </forge-stack>
                </forge-stack>
              </forge-card>
            </div>
          </div>
        </main>

        <div slot="footer">
          <div
            style="padding: 16px; background: var(--forge-theme-surface-container); border-top: 1px solid var(--forge-theme-outline-low); text-align: center;">
            Footer Content
          </div>
        </div>
      </forge-app-layout>
    `},argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}},miniHover:{control:"boolean",description:"Whether the mini drawer should expand on hover",table:{category:"Properties"}}},args:{appTitle:"App Layout Mini Drawer",breakpoint:768,miniHover:!1}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const Ve=["MiniDrawer"];export{a as MiniDrawer,Ve as __namedExportsOrder,Ue as default};

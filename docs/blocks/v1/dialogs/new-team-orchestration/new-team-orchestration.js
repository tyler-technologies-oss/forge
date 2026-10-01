const t=(e,{lead:r=!1,dashed:g=!1,muted:u=!1}={})=>`
    <span
      class="inline-flex items-center gap-xxsmall rounded-md border ${g?"border-dashed":""} border-outline ${r?"bg-tertiary-container-low":"bg-surface"} px-xsmall py-xxsmall ${u?"opacity-40":""}">
      <forge-icon name="robot_outline" style="font-size: 20px;" class="text-tertiary"></forge-icon>
      <span class="text-label2">${e}</span>
    </span>`,s=e=>`<forge-icon name="${e}"></forge-icon>`,a=e=>`<span class="text-label2 text-medium">${e}</span>`,d=[{id:"router",name:"Router",icon:"alt_route",useWhen:"One best-fit agent handles each request.",description:"Incoming requests are classified and handed off to the single agent best suited to answer.",example:"A support inbox sends billing questions to the billing agent and technical questions to the technical agent.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        ${a("Incoming request")}
        ${s("arrow_down")}
        ${t("Router",{lead:!0})}
        <div class="flex items-center gap-large">
          ${s("arrow_bottom_left")}${s("arrow_down")}${s("arrow_bottom_right")}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("Billing",{muted:!0})}${t("Technical")}${t("General",{muted:!0})}
        </div>
        ${a("Only the best-fit agent runs")}
      </div>`},{id:"hierarchical",name:"Hierarchical",icon:"sitemap",useWhen:"A supervisor delegates pieces of work and composes the result.",description:"A supervising agent breaks a request into subtasks, assigns them to member agents, and merges their outputs.",example:"A research supervisor assigns fact-finding and drafting subtasks, then compiles the final report.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        ${t("Supervisor",{lead:!0})}
        <div class="flex items-center gap-xsmall">
          ${s("arrow_bottom_left")}${a("delegates subtasks")}${s("arrow_bottom_right")}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("Research")}${t("Drafting")}
        </div>
        <div class="flex items-center gap-xxsmall">
          ${s("arrow_up")}${a("supervisor composes the final result")}
        </div>
      </div>`},{id:"network",name:"Network",icon:"hub",tag:"Experimental",useWhen:"Members contribute to a shared discussion in turn, then a synthesis pass merges it.",description:"Every member sees the running discussion and adds its perspective before a final synthesis pass merges the thread.",example:"Three domain experts debate a proposal in turn, then a synthesis pass writes the final recommendation.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-col items-center gap-xsmall rounded-md border border-dashed border-outline p-small">
          ${a("Shared discussion, one turn each")}
          <div class="flex flex-wrap items-center justify-center gap-xsmall">
            ${t("Member 1")}${s("sync_alt")}${t("Member 2")}${s("sync_alt")}${t("Member 3")}
          </div>
        </div>
        ${s("arrow_down")}
        ${t("Synthesis pass",{lead:!0})}
      </div>`},{id:"sequential",name:"Sequential",icon:"list",useWhen:"Members run in a fixed order, each building on the last.",description:"Agents run one after another in a fixed pipeline, with each step building on the output of the previous one.",example:"A drafting agent writes a first pass, an editing agent revises it, and a formatting agent prepares it for delivery.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("1. Draft")}${s("forward")}${t("2. Edit")}${s("forward")}${t("3. Format")}
        </div>
        ${a("Each step builds on the previous output")}
      </div>`},{id:"loop",name:"Loop",icon:"sync",useWhen:"Repeats a refinement step up to a set number of iterations.",description:"A single refinement step repeats against its own output, stopping once a condition is met or the iteration limit is reached.",example:"A code-review agent repeatedly critiques and rewrites a function until it passes all checks or hits the iteration limit.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("Refine",{lead:!0})}${s("forward")}${t("Check")}
        </div>
        <div class="flex items-center gap-xxsmall rounded-md border border-dashed border-outline px-xsmall py-xxsmall">
          ${s("sync")}${a("repeats until it passes, up to the iteration limit")}
        </div>
      </div>`},{id:"aggregator",name:"Aggregator",icon:"call_merge",useWhen:"One agent synthesizes outputs from other selected agents.",description:"Several member agents work independently in parallel, and one aggregator agent combines their outputs into a single result.",example:"Three analyst agents each produce an estimate, and an aggregator agent combines them into one final figure.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("Analyst A")}${t("Analyst B")}${t("Analyst C")}
        </div>
        <div class="flex items-center gap-large">
          ${s("arrow_bottom_right")}${s("arrow_down")}${s("arrow_bottom_left")}
        </div>
        ${t("Aggregator",{lead:!0})}
        ${a("One agent merges every output")}
      </div>`},{id:"orchestrator-subagent",name:"Orchestrator-subagent",icon:"device_hub",tag:"Experimental",useWhen:"An orchestrator spins up isolated, tool-scoped workers at request time and synthesizes their reports.",description:"An orchestrator creates disposable, tool-scoped worker agents on demand for a request, then synthesizes their reports into one response.",example:"An orchestrator spins up a search worker and a summarization worker for a single query, then merges their findings.",diagram:`
      <div class="flex flex-col items-center gap-xsmall">
        ${t("Orchestrator",{lead:!0})}
        <div class="flex items-center gap-xsmall">
          ${s("arrow_bottom_left")}${a("spawns tool-scoped workers per request")}${s("arrow_bottom_right")}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-xsmall">
          ${t("Search",{dashed:!0})}${t("Fetch",{dashed:!0})}${t("Summarize",{dashed:!0})}
        </div>
        <div class="flex items-center gap-xxsmall">
          ${s("arrow_up")}${a("reports synthesized, workers discarded")}
        </div>
      </div>`}],i=document.getElementById("pattern-list"),l=document.getElementById("pattern-detail"),o=document.getElementById("pattern-detail-summary");let c=null;const m=e=>e.tag?`<forge-badge theme="tertiary">${e.tag}</forge-badge>`:"",f=()=>{i.innerHTML=d.map(e=>`
      <forge-option value="${e.id}" two-line>
        <forge-icon slot="start" name="${e.icon}"></forge-icon>
        <span class="flex items-center gap-xsmall">${e.name}${m(e)}</span>
        <span slot="secondary">${e.useWhen}</span>
      </forge-option>`).join("")},p=()=>{const e=d.find(r=>r.id===c);if(!e){l.innerHTML=`
      <div class="flex flex-col items-center justify-center gap-small h-full p-medium text-medium text-center">
        <forge-icon name="sitemap" style="font-size: 40px;"></forge-icon>
        <p class="text-body1 mb-0">Select a pattern to see its details</p>
      </div>`,o.textContent="No orchestration pattern selected.";return}l.innerHTML=`
    <div class="flex items-center gap-small px-medium pt-medium pb-0">
      <forge-icon name="${e.icon}" style="font-size: 24px;" class="text-primary"></forge-icon>
      <h3 class="text-heading3 m-0">${e.name}</h3>
      ${m(e)}
    </div>

    <div class="flex flex-col gap-medium px-medium pb-medium pt-small">
      <p class="text-body1 m-0">${e.description}</p>

      <div class="flex items-center justify-center p-medium bg-surface-dim rounded-md">
        ${e.diagram}
      </div>

      <forge-label-value>
        <span slot="label">Use when</span>
        <span slot="value">${e.useWhen}</span>
      </forge-label-value>

      <forge-label-value>
        <span slot="label">Example</span>
        <span slot="value">${e.example}</span>
      </forge-label-value>
    </div>`,o.textContent=`${e.name}: ${e.description}`};i.addEventListener("change",()=>{c=i.value||null,p()});f();p();const n=document.getElementById("new-team-dialog"),x=document.getElementById("open-dialog-btn"),h=document.getElementById("close-dialog-btn"),v=document.getElementById("cancel-btn"),b=document.getElementById("create-btn");x.addEventListener("click",()=>{n.open=!0});h.addEventListener("click",()=>{n.open=!1});v.addEventListener("click",()=>{n.open=!1});b.addEventListener("click",()=>{n.open=!1});

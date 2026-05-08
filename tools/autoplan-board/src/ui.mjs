/*
Who uses this: one technical operator running web-workflow-master locally on a laptop, checking dense workflow state while moving between code, terminal, and browser.
Direction: industrial operations console with compact rails, hard status hierarchy, and muted instrument-panel color.
Memorable element: every work card carries an evidence rail that exposes proof files, verdicts, blockers, jobs, and audit state instead of hiding them in prose.
Rejected alternative 1: centered SaaS analytics dashboard, because it would look polished but would not act like a workflow control surface.
Rejected alternative 2: clone of agent-board, because agent-board is only a bridge here and the board needs repo evidence as the source of truth.
*/

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCard(card) {
  const evidence = card.evidence?.length ? card.evidence : ["No evidence attached yet"];
  const blockers = card.blockers?.length ? card.blockers : ["No blockers"];
  const detailId = `detail-${escapeHtml(card.id).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  return `
    <article class="work-card" data-card-id="${escapeHtml(card.id)}">
      <div class="card-main">
        <div>
          <p class="card-kicker">${escapeHtml(card.type ?? card.mode ?? "work item")}</p>
          <h3>${escapeHtml(card.name)}</h3>
        </div>
        <span class="status-chip">${escapeHtml(card.confidence ?? card.risk ?? "tracked")}</span>
      </div>
      <dl class="card-meta">
        <div><dt>Stage</dt><dd>${escapeHtml(card.stage)}</dd></div>
        <div><dt>Path</dt><dd>${escapeHtml(card.manifestPath ?? "slice-roadmap")}</dd></div>
      </dl>
      <ul class="evidence-rail" aria-label="Evidence rail">
        ${evidence.map((item) => `<li class="rail-item proof">${escapeHtml(item)}</li>`).join("")}
        ${blockers.map((item) => `<li class="rail-item blocker">${escapeHtml(item)}</li>`).join("")}
      </ul>
      <button class="card-toggle" type="button" aria-expanded="false" aria-controls="${detailId}">Open detail</button>
      <div class="card-detail" id="${detailId}" hidden>
        <p><strong>Evidence rail:</strong> ${evidence.map(escapeHtml).join(", ")}</p>
        <p><strong>Blockers:</strong> ${blockers.map(escapeHtml).join(", ")}</p>
      </div>
    </article>
  `;
}

function renderColumn(column) {
  return `
    <section class="board-column" aria-label="${escapeHtml(column.label)} column">
      <header>
        <h2>${escapeHtml(column.label)}</h2>
        <span>${column.cards.length}</span>
      </header>
      <div class="column-stack">
        ${column.cards.map(renderCard).join("") || '<p class="empty">No cards in this stage.</p>'}
      </div>
    </section>
  `;
}

export function renderHtml(snapshot, { sessionToken = "" } = {}) {
  const privacyClass = snapshot.privacy.ok ? "ok" : "blocked";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="autoplan-token" content="${escapeHtml(sessionToken)}">
  <title>Autoplan Board</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="skip-link" href="#pipeline">Skip to pipeline</a>
  <main>
    <header class="topbar">
      <div>
        <p class="eyebrow">web-workflow-master</p>
        <h1>Autoplan Board</h1>
      </div>
      <nav aria-label="Board views">
        <a href="#pipeline">Pipeline</a>
        <a href="#autoplan">Autoplan</a>
        <a href="#operations">Operations</a>
      </nav>
      <div class="system-strip" aria-label="System status">
        <span class="${privacyClass}">Privacy: ${escapeHtml(snapshot.privacy.reason)}</span>
        <span>${snapshot.gates.implementedSlices}/${snapshot.gates.totalSlices} slices</span>
        <span>Broker: ${snapshot.gates.brokerActions.length} actions</span>
      </div>
    </header>

    <section class="summary-grid" aria-label="Workflow master health">
      <div><span>Verify</span><strong>${snapshot.boards.workflowMaster.hasVerify ? "wired" : "missing"}</strong></div>
      <div><span>Dashboard verify</span><strong>${snapshot.boards.workflowMaster.hasDashboardVerify ? "wired" : "pending"}</strong></div>
      <div><span>GitHub mode</span><strong>${escapeHtml(snapshot.boards.workflowMaster.githubMode)}</strong></div>
      <div><span>Protection</span><strong>${escapeHtml(snapshot.boards.workflowMaster.branchProtection)}</strong></div>
    </section>

    <section id="pipeline" class="board-shell" data-board="prospect-pipeline" aria-label="Prospect pipeline">
      <div class="section-heading">
        <p class="eyebrow">live board</p>
        <h2>Prospect Pipeline</h2>
      </div>
      <div class="kanban">
        ${snapshot.boards.prospectPipeline.map(renderColumn).join("")}
      </div>
    </section>

    <section id="autoplan" class="board-shell" aria-label="Autoplan review">
      <div class="section-heading">
        <p class="eyebrow">controller</p>
        <h2>Autoplan Review</h2>
      </div>
      <div class="slice-grid">
        ${snapshot.slices
          .map(
            (slice) => `
          <article class="slice-row">
            <span>${escapeHtml(slice.id)}</span>
            <strong>${escapeHtml(slice.title)}</strong>
            <em>${escapeHtml(slice.risk)} / ${escapeHtml(slice.mode)}</em>
            <small>${slice.reviewRequired ? "review required" : "standard gate"}</small>
          </article>`
          )
          .join("")}
      </div>
    </section>

    <section id="operations" class="ops-panel" aria-label="Operations">
      <h2>Operations</h2>
      <p>Typed broker actions only: ${snapshot.gates.brokerActions.map(escapeHtml).join(", ")}.</p>
      <p>Telegram control is allowlist-only and mirrored to audit events.</p>
      <div class="action-bar" aria-label="Broker actions">
        <button type="button" class="broker-action" data-broker-action="refreshBoard">Refresh board</button>
        <button type="button" class="broker-action" data-broker-action="verify">Run verify</button>
        <button type="button" class="broker-action" data-broker-action="shipGate">Run ship gate</button>
      </div>
      <output class="broker-output" aria-live="polite">No broker action running.</output>
      <div class="ops-grid">
        <div>
          <span>Fixture chain</span>
          <strong>${escapeHtml(snapshot.boards.fixtureChain.status)}</strong>
          <small>${escapeHtml(snapshot.boards.fixtureChain.currentStage)}</small>
        </div>
        <div>
          <span>Agent-board bridge</span>
          <strong>${escapeHtml(snapshot.boards.agentBoard.status)}</strong>
          <small>${escapeHtml(snapshot.boards.agentBoard.mode)}</small>
        </div>
        <div>
          <span>Broker jobs</span>
          <strong>${snapshot.boards.operations.succeeded.length + snapshot.boards.operations.failed.length}</strong>
          <small>${snapshot.boards.operations.auditTrail.length} audit events</small>
        </div>
      </div>
      <ul class="chain-evidence" aria-label="Fixture chain evidence">
        ${snapshot.boards.fixtureChain.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  </main>
  <script src="/app.js" type="module"></script>
</body>
</html>`;
}

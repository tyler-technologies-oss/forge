import { chromium } from 'playwright';

const URL = 'http://localhost:5173/patterns/agent-instruction-builder/agent-instruction-builder.html';
const results = [];
const check = (name, pass, extra = '') => results.push(`${pass ? 'PASS' : 'FAIL'}  ${name}${extra ? ` -> ${extra}` : ''}`);
const report = () => {
  console.log(results.join('\n'));
  console.log(`\n${results.filter(r => r.startsWith('PASS')).length}/${results.length} passed`);
};
const bail = err => {
  console.log(`THREW: ${String(err?.message ?? err).split('\n')[0]}`);
  report();
  process.exit(1);
};
process.on('uncaughtException', bail);
process.on('unhandledRejection', bail);

const browser = await chromium.launch({ executablePath: '/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on('console', m => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', e => consoleErrors.push(`pageerror: ${e.message}`));

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForFunction(() => customElements.get('forge-structured-card') && document.querySelectorAll('.instruction-card').length === 3);
await page.waitForTimeout(500);

const titles = () => page.$$eval('.instruction-card [data-title-text]', els => els.map(e => e.textContent.trim()));
const card = n => page.locator('.instruction-card').nth(n);

check('empty state hidden while cards exist', !(await page.locator('#empty-state').isVisible()));
check('"hidden" wins over "flex" (used to toggle stack/empty state/keyword group)', await page.evaluate(() => {
  const probe = document.createElement('div');
  probe.className = 'hidden flex flex-col';
  document.body.appendChild(probe);
  const hidden = getComputedStyle(probe).display === 'none';
  probe.remove();
  return hidden;
}));

// --- collapsed card geometry -------------------------------------------------
const heights = await page.$$eval('.instruction-card', els => els.map(e => Math.round(e.getBoundingClientRect().height)));
check('collapsed cards are header-height only (no empty footer strip)', heights[1] <= 56 && heights[2] <= 56, `heights=${heights}`);
check('expanded card is taller than collapsed', heights[0] > 200, `heights=${heights}`);

// --- collapse / expand by click ---------------------------------------------
await card(1).locator('[data-title-trigger]').click();
await page.waitForTimeout(450);
check('click title expands card', await card(1).locator('[data-panel]').getAttribute('open') !== null);
check('aria-expanded true after expand', (await card(1).locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'true');
check('panel content visible after expand', await card(1).locator('[data-instruction-input]').isVisible());
check('aria-controls points at panel content', await card(1).evaluate(c => {
  const id = c.querySelector('[data-title-trigger]').getAttribute('aria-controls');
  return !!id && c.querySelector('[data-panel-content]').id === id;
}));

// --- keyboard toggle ---------------------------------------------------------
await card(1).locator('[data-title-trigger]').focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(450);
check('Enter on title collapses card', (await card(1).locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'false');
await page.keyboard.press('Space');
await page.waitForTimeout(450);
check('Space on title expands card', (await card(1).locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'true');

// --- reorder buttons ---------------------------------------------------------
const before = await titles();
check('first card move-up disabled', await card(0).locator('[data-move-up]').evaluate(el => el.disabled));
check('last card move-down disabled', await card(2).locator('[data-move-down]').evaluate(el => el.disabled));

await card(0).locator('[data-move-down]').click();
await page.waitForTimeout(200);
const after = await titles();
check('move down reorders the stack', after[0] === before[1] && after[1] === before[0], `${before} -> ${after}`);
check('summary count intact', (await page.textContent('#stack-summary')).startsWith('3 sections'));
check('announcer reports the move', (await page.textContent('#stack-announcer')).includes('moved to position 2 of 3'));

// THE regression check: the moved card's collapse toggle must still work after the DOM move.
const movedIdx = after.indexOf(before[0]);
const movedExpandedBefore = await card(movedIdx).locator('[data-title-trigger]').getAttribute('aria-expanded');
await card(movedIdx).locator('[data-title-trigger]').click();
await page.waitForTimeout(450);
const movedExpandedAfter = await card(movedIdx).locator('[data-title-trigger]').getAttribute('aria-expanded');
check('collapse still works after a DOM move', movedExpandedBefore !== movedExpandedAfter, `${movedExpandedBefore} -> ${movedExpandedAfter}`);

check('textarea value survives the move', (await card(movedIdx).locator('[data-instruction-input]').inputValue()).includes('municipal utility'));

// --- keyword chips -----------------------------------------------------------
const kwCard = card(0);
await kwCard.locator('[data-title-trigger]').click();
await page.waitForTimeout(450);
if ((await kwCard.locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'false') {
  await kwCard.locator('[data-title-trigger]').click();
  await page.waitForTimeout(450);
}
check('add button disabled while keyword input empty', await kwCard.locator('[data-keyword-add]').evaluate(el => el.disabled));
await kwCard.locator('[data-keyword-input]').fill('refund');
await page.waitForTimeout(100);
check('add button enabled once keyword typed', await kwCard.locator('[data-keyword-add]').evaluate(el => !el.disabled));
const chipCount0 = await kwCard.locator('forge-chip').count();
await kwCard.locator('[data-keyword-add]').click();
await page.waitForTimeout(200);
const chipCount1 = await kwCard.locator('forge-chip').count();
check('add button appends a chip', chipCount1 === chipCount0 + 1, `${chipCount0} -> ${chipCount1}`);
check('keyword input cleared after add', (await kwCard.locator('[data-keyword-input]').inputValue()) === '');

await kwCard.locator('[data-keyword-input]').fill('refund');
await kwCard.locator('[data-keyword-input]').press('Enter');
await page.waitForTimeout(200);
check('duplicate keyword ignored', (await kwCard.locator('forge-chip').count()) === chipCount1);

await kwCard.locator('[data-keyword-input]').fill('Escalate');
await kwCard.locator('[data-case-sensitive]').click();
await kwCard.locator('[data-keyword-input]').press('Enter');
await page.waitForTimeout(200);
check('Enter submits a new keyword', (await kwCard.locator('forge-chip').count()) === chipCount1 + 1);
check('case sensitive chip carries the marker icon', await kwCard.locator('forge-chip[value="Escalate"] forge-icon[name="case_sensitive_alt"]').count() === 1);
check('case sensitive checkbox resets', await kwCard.locator('[data-case-sensitive]').evaluate(el => !el.checked));

const chipsBeforeDelete = await kwCard.locator('forge-chip').count();
check('dynamic chip renders a remove button', (await kwCard.locator('forge-chip[value="refund"] forge-icon-button').count()) === 1);
await kwCard.locator('forge-chip[value="refund"] forge-icon-button').click();
await page.waitForTimeout(250);
check('chip delete removes the chip', (await kwCard.locator('forge-chip').count()) === chipsBeforeDelete - 1);

// --- disable switch ----------------------------------------------------------
await kwCard.locator('[data-enabled-switch]').click();
await page.waitForTimeout(250);
check('card marked disabled', await kwCard.evaluate(c => c.hasAttribute('data-disabled')));
check('instruction textarea disabled', await kwCard.locator('[data-instruction-input]').isDisabled());
check('keyword input disabled', await kwCard.locator('[data-keyword-input]').isDisabled());
check('chips disabled', await kwCard.locator('forge-chip').first().evaluate(c => c.disabled));
await kwCard.locator('[data-title-trigger]').click();
await page.waitForTimeout(450);
check('disabled card still collapses', (await kwCard.locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'false');
check('disabled card can still be reordered', await kwCard.locator('[data-move-down]').evaluate(el => !el.disabled));
await kwCard.locator('[data-enabled-switch]').click();
await page.waitForTimeout(250);
check('re-enabling restores the textarea', await kwCard.locator('[data-instruction-input]').isEnabled());
check('re-enabling leaves add button disabled while input empty', await kwCard.locator('[data-keyword-add]').evaluate(el => el.disabled));

// --- drag and drop -----------------------------------------------------------
const dragBefore = await titles();
await card(2).locator('[data-drag-handle]').dragTo(card(0).locator('[data-title-trigger]'));
await page.waitForTimeout(400);
const dragAfter = await titles();
check('drag and drop reorders the stack', dragAfter[0] === dragBefore[2], `${dragBefore} -> ${dragAfter}`);
check('drag leaves no lingering draggable attribute', await page.$$eval('.instruction-card', els => els.every(e => !e.hasAttribute('draggable'))));
check('drag leaves no lingering dragging class', await page.$$eval('.instruction-card', els => els.every(e => !e.classList.contains('dragging'))));

// --- add instruction ---------------------------------------------------------
await page.click('#add-instruction');
await page.waitForTimeout(400);
check('add instruction appends a card', (await page.locator('.instruction-card').count()) === 4);
check('summary updated to 4', (await page.textContent('#stack-summary')).startsWith('4 sections'));
const newCard = card(3);
check('new card title is unique', (await newCard.locator('[data-title-text]').textContent()).trim() === 'Instruction 4');
check('new card delete button labelled', (await newCard.locator('[data-delete]').getAttribute('aria-label')) === 'Delete Instruction 4');
check('new card label/input wired', await newCard.evaluate(c => {
  const l = c.querySelector('[data-instruction-label]');
  const i = c.querySelector('[data-instruction-input]');
  return !!i.id && l.htmlFor === i.id;
}));
await newCard.locator('[data-title-trigger]').click();
await page.waitForTimeout(450);
check('new card collapses', (await newCard.locator('[data-title-trigger]').getAttribute('aria-expanded')) === 'false');
await newCard.locator('[data-move-up]').click();
await page.waitForTimeout(200);
check('new card reorders', (await titles())[2] === 'Instruction 4');

await page.screenshot({ path: 'verify-agent-block.png', fullPage: true });

// --- delete down to empty ----------------------------------------------------
for (let i = 0; i < 4; i++) {
  await page.locator('.instruction-card [data-delete]').first().click();
  await page.waitForTimeout(150);
}
check('all cards deleted', (await page.locator('.instruction-card').count()) === 0);
check('empty state visible', await page.locator('#empty-state').isVisible());
check('stack hidden when empty', !(await page.locator('#instruction-stack').isVisible()));
check('summary shows 0 sections', (await page.textContent('#stack-summary')).startsWith('0 sections'));
check('focus moved to add button after last delete', await page.evaluate(() => document.activeElement?.id === 'add-instruction'));

await page.click('#add-instruction');
await page.waitForTimeout(300);
check('can add after emptying', (await page.locator('.instruction-card').count()) === 1 && (await page.locator('#empty-state').isVisible()) === false);
check('single card reads "1 section"', (await page.textContent('#stack-summary')).startsWith('1 section '));

check('no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));

report();
await browser.close();

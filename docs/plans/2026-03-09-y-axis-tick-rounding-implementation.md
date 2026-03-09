# Y-Axis Tick Rounding Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Y-axis tick spacing deterministic with rounded steps and hard tick-count limits (desktop 5 including 0, mobile 4 including 0).

**Architecture:** Keep chart rendering flow intact in `init-place-chart.js`, but replace dynamic fractional step logic with a reusable "nice step" selector based on a fixed ladder. Compute `stepSize` first, recompute `maxY` from that step, and generate custom label values from config instead of relying on Chart.js auto ticks.

**Tech Stack:** Vanilla JavaScript (ES modules), Chart.js + chartjs-plugin-datalabels, Vite.

---

### Task 1: Add test harness for pure Y-axis calculation helpers

**Files:**

- Create: `tests/y-axis-config.test.js`
- Modify: `package.json`

**Step 1: Write the failing test**

```js
import { describe, expect, it } from 'vitest';
import { selectNiceStep } from '../src/js/init-place-chart.js';

describe('selectNiceStep', () => {
  it('rounds to 500 for small range', () => {
    expect(selectNiceStep(1200, 5)).toBe(500);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: FAIL because test script or export is missing.

**Step 3: Write minimal implementation**

```js
export function selectNiceStep(targetMax, tickLimit) {
  return 500;
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: PASS for the initial case.

**Step 5: Commit**

```bash
git add package.json tests/y-axis-config.test.js src/js/init-place-chart.js
git commit -m "test: add baseline y-axis step rounding coverage"
```

### Task 2: Implement ladder-based step calculation and maxY recomputation

**Files:**

- Modify: `src/js/init-place-chart.js`
- Test: `tests/y-axis-config.test.js`

**Step 1: Write the failing test**

```js
it('matches agreed examples', () => {
  expect(selectNiceStep(1200, 5)).toBe(500);
  expect(selectNiceStep(3200, 5)).toBe(1000);
  expect(selectNiceStep(18000, 5)).toBe(5000);
});

it('builds desktop config with max 5 ticks including zero', () => {
  const cfg = buildYAxisConfig({ maxBarHeight: 17253, isMobile: false });
  expect(cfg.stepSize).toBe(5000);
  expect(cfg.maxY).toBe(25000);
  expect(cfg.tickLimit).toBe(5);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: FAIL for missing/new logic.

**Step 3: Write minimal implementation**

```js
const STEP_LADDER = [500, 1000, 2000, 5000, 10000, 20000];

export function selectNiceStep(targetMax, tickLimit) {
  const raw = targetMax / (tickLimit - 1);
  return (
    STEP_LADDER.find((step) => step >= raw) ??
    Math.pow(10, Math.ceil(Math.log10(raw)))
  );
}

export function buildYAxisConfig({ maxBarHeight, isMobile }) {
  const tickLimit = isMobile ? 4 : 5;
  const targetMax = maxBarHeight * 1.2;
  const stepSize = selectNiceStep(targetMax, tickLimit);
  const maxY = Math.ceil(targetMax / stepSize) * stepSize;
  return { maxY, stepSize, tickLimit };
}
```

**Step 4: Run test to verify it passes**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: PASS for agreed example values and config shape.

**Step 5: Commit**

```bash
git add src/js/init-place-chart.js tests/y-axis-config.test.js
git commit -m "fix: use ladder-rounded y-axis step and deterministic max"
```

### Task 3: Enforce label count by rendering from computed values

**Files:**

- Modify: `src/js/init-place-chart.js`
- Test: `tests/y-axis-config.test.js`

**Step 1: Write the failing test**

```js
it('generates desktop tick values with limit 5 including zero', () => {
  expect(buildTickValues({ maxY: 25000, stepSize: 5000 })).toEqual([
    0, 5000, 10000, 15000, 20000, 25000,
  ]);
});

it('supports mobile with limit 4 including zero after config', () => {
  const cfg = buildYAxisConfig({ maxBarHeight: 6000, isMobile: true });
  const ticks = buildTickValues(cfg);
  expect(ticks.length).toBeLessThanOrEqual(4);
  expect(ticks[0]).toBe(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: FAIL for missing tick-value helper.

**Step 3: Write minimal implementation**

```js
export function buildTickValues({ maxY, stepSize }) {
  const values = [];
  for (let v = 0; v <= maxY; v += stepSize) values.push(v);
  return values;
}
```

Then update custom Y label plugin to iterate `buildTickValues(yAxisConfig)` and continue skipping `0` label text.

**Step 4: Run test to verify it passes**

Run: `npm run test -- tests/y-axis-config.test.js`
Expected: PASS and deterministic count behavior.

**Step 5: Commit**

```bash
git add src/js/init-place-chart.js tests/y-axis-config.test.js
git commit -m "fix: render y-axis labels from deterministic tick values"
```

### Task 4: Project-level verification

**Files:**

- Modify: `package.json` (if test script not yet added)

**Step 1: Add/confirm scripts**

```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

**Step 2: Run full checks**

Run: `npm run test`
Expected: PASS

Run: `npm run build`
Expected: PASS and production bundle builds.

**Step 3: Manual chart verification**

Run: `npm run dev`
Expected: chart Y labels show no more than 4 visible labels desktop (0 hidden) and no more than 3 visible labels mobile (0 hidden), with rounded step values.

**Step 4: Commit**

```bash
git add package.json package-lock.json src/js/init-place-chart.js tests/y-axis-config.test.js
git commit -m "chore: add automated checks for y-axis tick behavior"
```

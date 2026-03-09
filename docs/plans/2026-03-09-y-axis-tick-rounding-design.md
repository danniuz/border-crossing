## Goal

Make Y-axis tick spacing stable and readable so labels do not become too dense on production data.

## Agreed Requirements

- Desktop tick limit is `5` including `0`.
- Mobile tick limit is `4` including `0`.
- Tick step must use a "nice" rounded ladder.
- Example expectations:
  - max around `1200` -> step `500`
  - max around `3200` -> step `1000`
  - max around `18000` -> step `5000`

## Proposed Calculation

1. Compute stacked maximum bar height as today.
2. Keep top padding as today: `targetMax = maxBarHeight * 1.2`.
3. Set `tickLimit` by viewport:
   - mobile: `4`
   - desktop: `5`
4. Compute raw step:
   - `rawStep = targetMax / (tickLimit - 1)`
5. Round step upward to nearest allowed value from:
   - `STEP_LADDER = [500, 1000, 2000, 5000, 10000, 20000]`
6. Recompute Y max by rounded step:
   - `maxY = ceil(targetMax / stepSize) * stepSize`

## Tick Rendering Strategy

- Do not depend on Chart.js auto-generated `yScale.ticks` for custom text labels.
- Generate tick values manually from config:
  - `0, stepSize, 2*stepSize, ... <= maxY`
- Keep hiding `0` text label in custom drawing.
- This guarantees maximum visible labels:
  - desktop: up to `4` visible labels (because `0` is hidden)
  - mobile: up to `3` visible labels (because `0` is hidden)

## Why This Fix Works

- Eliminates non-deterministic extra ticks caused by fractional or auto-adjusted steps.
- Makes axis behavior consistent between environments.
- Matches business-friendly rounded intervals.

## Edge Cases

- If `rawStep` exceeds the largest ladder value, use a power-of-10 continuation or append larger ladder values.
- If future data ranges grow, extend `STEP_LADDER` without changing core logic.

## Validation Plan

- Test with representative ranges to confirm expected steps (`500`, `1000`, `5000`).
- Verify desktop never exceeds 5 ticks including `0`.
- Verify mobile never exceeds 4 ticks including `0`.
- Confirm custom labels align with grid lines after layout.

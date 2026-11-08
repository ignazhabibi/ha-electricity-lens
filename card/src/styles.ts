// Styles the cards share: category colors, the header, and the tables.

import { css, type CSSResultGroup } from "lit";

import { explanationStyles } from "./explain";

const baseStyles = css`
  :host {
    --electricity-lens-pv-color: var(--energy-solar-color, #ff9800);
    --electricity-lens-heat-pump-color: var(--graph-color-30, var(--color-30, #bf3947));
    --electricity-lens-wallbox-color: var(--energy-non-fossil-color, #0f9d58);
  }
  ha-card {
    height: 100%;
    overflow: hidden;
  }
  /* The header of Home Assistant's energy cards. */
  .header {
    display: flex;
    align-items: flex-start;
    gap: var(--ha-space-2, 8px);
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px) 0;
  }
  .title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: 32px;
    letter-spacing: -0.012em;
    color: var(--ha-card-header-color, var(--primary-text-color));
  }
  /* The total, as hui-energy-graph-chip. */
  .chip {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: var(--ha-line-height-normal, 20px);
    padding: var(--ha-space-1, 4px) var(--ha-space-2, 8px);
    border-radius: var(--ha-border-radius-md, 8px);
    border: 1px solid var(--divider-color);
    white-space: nowrap;
    color: var(--primary-text-color);
  }
  .summary {
    margin: 0;
    padding: 12px 16px 8px;
    color: var(--secondary-text-color);
  }
  .summary:empty {
    display: none;
  }
`;

export const cardStyles: CSSResultGroup = [baseStyles, explanationStyles];

/* The tables of all cards: a color swatch, a name, numbers at the end, and
 * the total in the footer. On a phone the swatches give their room to the
 * names, as in Home Assistant's totals card; in half a column on a desktop,
 * about 400 px wide, they stay and tie the rows to the charts' colors. */
export const tableStyles = css`
  ha-card {
    container-type: inline-size;
  }
  table {
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
    font-size: var(--ha-font-size-m, 14px);
    line-height: var(--ha-line-height-normal, 20px);
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
  }
  th,
  td {
    padding: 12px 8px;
    font-weight: var(--ha-font-weight-normal, 400);
    text-align: end;
    white-space: nowrap;
    border-bottom: 1px solid var(--divider-color);
  }
  th:first-child,
  td:first-child {
    padding-inline-start: 16px;
  }
  th:last-child,
  td:last-child {
    padding-inline-end: 16px;
  }
  thead th {
    padding-block: 8px;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--secondary-text-color);
  }
  .name {
    width: 100%;
    text-align: start;
    white-space: normal;
  }
  .swatch-cell {
    width: 32px;
    line-height: 0;
  }
  .swatch {
    display: inline-block;
    width: 32px;
    height: 16px;
    border-radius: var(--ha-border-radius-sm, 4px);
    border: 1px solid var(--color);
    background: color-mix(in srgb, var(--color) 50%, transparent);
    box-sizing: border-box;
  }
  tfoot th,
  tfoot td {
    border-bottom: none;
    font-weight: var(--ha-font-weight-medium, 500);
  }
  tbody tr:last-child th,
  tbody tr:last-child td {
    border-bottom: none;
  }
  tfoot tr:first-child th,
  tfoot tr:first-child td {
    border-top: 1px solid var(--divider-color);
  }
  .quiet th,
  .quiet td {
    padding-block-start: 0;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }
  /* A part of the row above: indented and quieter, as its share. */
  .part .name,
  .part td {
    color: var(--secondary-text-color);
  }
  .part .name {
    padding-inline-start: 16px;
  }
  /* A row that opens its entity's dialog. */
  tr.clickable {
    cursor: pointer;
  }
  tr.clickable:hover {
    background-color: rgba(var(--rgb-primary-text-color), 0.04);
  }
  /* Reaches the row by keyboard and for screen readers; the row takes the click. */
  tr.clickable button {
    all: unset;
    cursor: pointer;
  }
  tr.clickable button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @container (max-width: 360px) {
    .swatch-cell {
      display: none;
    }
    .swatch-cell + .name {
      padding-inline-start: 16px;
    }
  }
`;

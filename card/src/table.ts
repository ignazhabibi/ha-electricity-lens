// The tables of the cards, drawn alike: a color swatch, the name as the row's
// header, the figures at the end, and the sums in the footer. A row with an
// entity opens its dialog, by mouse, keyboard, and screen reader alike.

import { html, nothing, type TemplateResult } from "lit";

/** A cell after the name; a class can hide it in narrow cards. */
export type Cell = string | { text: string; class?: string };

export interface TableRow {
  name: string;
  cells: Cell[];
  /** The swatch's color; a row without one leaves its swatch cell empty. */
  color?: string;
  /** The entity whose dialog the row opens. */
  entity?: string;
  /** A part of the row above, indented and quieter; or a quiet note under the sums. */
  kind?: "part" | "quiet";
}

export interface Table {
  /** The column headers: the name's, then one per cell. Without them, no header row. */
  head?: Cell[];
  rows: TableRow[];
  foot?: TableRow[];
  /** Whether the table has a swatch column. */
  swatches?: boolean;
}

const text = (cell: Cell): string => (typeof cell === "string" ? cell : cell.text);
const cls = (cell: Cell): string | typeof nothing => (typeof cell === "string" ? nothing : (cell.class ?? nothing));

/** Asks Home Assistant to open an entity's dialog. */
export function openMoreInfo(from: HTMLElement, entityId: string): void {
  from.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
}

function row(table: Table, item: TableRow, host: HTMLElement): TemplateResult {
  const classes = [item.kind, item.entity ? "clickable" : undefined].filter(Boolean).join(" ");
  const entity = item.entity;
  return html`<tr
    class=${classes || nothing}
    style=${item.color ? `--color: ${item.color}` : nothing}
    @click=${entity ? () => openMoreInfo(host, entity) : nothing}
  >
    ${table.swatches
      ? html`<td class="swatch-cell">
          ${item.color ? html`<span class="swatch" aria-hidden="true"></span>` : nothing}
        </td>`
      : nothing}
    <th class="name" scope="row">
      ${entity ? html`<button type="button">${item.name}</button>` : item.name}
    </th>
    ${item.cells.map((cell) => html`<td class=${cls(cell)}>${text(cell)}</td>`)}
  </tr>`;
}

/** The table; host is the card, which sends the dialog's event. */
export function lensTable(table: Table, host: HTMLElement): TemplateResult {
  const [name, ...columns] = table.head ?? [];
  return html`<table>
    ${table.head
      ? html`<thead>
          <tr>
            ${table.swatches ? html`<th class="swatch-cell"></th>` : nothing}
            <th scope="col" class="name">${name ? text(name) : nothing}</th>
            ${columns.map((cell) => html`<th scope="col" class=${cls(cell)}>${text(cell)}</th>`)}
          </tr>
        </thead>`
      : nothing}
    <tbody>
      ${table.rows.map((item) => row(table, item, host))}
    </tbody>
    ${table.foot?.length ? html`<tfoot>${table.foot.map((item) => row(table, item, host))}</tfoot>` : nothing}
  </table>`;
}

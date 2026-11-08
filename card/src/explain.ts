// The info icon next to a card's title and its explanation, as Home Assistant's
// self-sufficiency gauge has one: a pointer shows it while over the icon, a tap
// or a key keeps it open until the next tap, Escape, or a tap elsewhere. The
// explanation lies above the page, so a card's rounded corners do not cut it.

import { mdiInformationOutline } from "@mdi/js";
import { css, html, nothing, type TemplateResult } from "lit";

/** One paragraph: a sentence, or a term and what it means. */
export type Explanation = Array<string | [term: string, text: string]>;

const GAP = 8;

/** Whether the browser has popovers; older ones get a class instead. */
const popovers = typeof HTMLElement !== "undefined" && "showPopover" in HTMLElement.prototype;

const popoverOf = (button: HTMLElement): HTMLElement | null =>
  (button.getRootNode() as ParentNode).querySelector<HTMLElement>(".explanation");

const isOpen = (popover: HTMLElement): boolean =>
  popovers ? popover.matches(":popover-open") : popover.classList.contains("open");

/** Below the icon, its right edge at the icon's, inside the window; above the
 * icon where there is no room below. */
function place(button: HTMLElement, popover: HTMLElement): void {
  const icon = button.getBoundingClientRect();
  const width = popover.offsetWidth;
  const height = popover.offsetHeight;
  const left = Math.min(Math.max(icon.right - width, GAP), window.innerWidth - width - GAP);
  const below = icon.bottom + GAP;
  const top = below + height > window.innerHeight - GAP ? Math.max(icon.top - GAP - height, GAP) : below;
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function show(button: HTMLElement, popover: HTMLElement): void {
  if (isOpen(popover)) return;
  if (popovers) popover.showPopover();
  else popover.classList.add("open");
  place(button, popover);
  button.setAttribute("aria-expanded", "true");
  // It stays where it was put; scrolling would leave it behind.
  const close = () => hide(button, popover);
  window.addEventListener("scroll", close, { capture: true, once: true, passive: true });
}

function hide(button: HTMLElement, popover: HTMLElement): void {
  delete button.dataset.pinned;
  if (!isOpen(popover)) return;
  if (popovers) popover.hidePopover();
  else popover.classList.remove("open");
  button.setAttribute("aria-expanded", "false");
}

function onEnter(event: PointerEvent): void {
  if (event.pointerType !== "mouse") return;
  const button = event.currentTarget as HTMLElement;
  const popover = popoverOf(button);
  if (popover) show(button, popover);
}

function onLeave(event: PointerEvent): void {
  if (event.pointerType !== "mouse") return;
  const button = event.currentTarget as HTMLElement;
  const popover = popoverOf(button);
  if (popover && !button.dataset.pinned) hide(button, popover);
}

function onClick(event: Event): void {
  // The card behind it may open a dialog on a tap.
  event.stopPropagation();
  const button = event.currentTarget as HTMLElement;
  const popover = popoverOf(button);
  if (!popover) return;
  if (button.dataset.pinned) {
    hide(button, popover);
    return;
  }
  button.dataset.pinned = "true";
  show(button, popover);
}

/** Light dismiss and Escape close it; the icon then forgets it was pinned. */
function onToggle(event: Event): void {
  const popover = event.currentTarget as HTMLElement;
  if ((event as ToggleEvent).newState !== "closed") return;
  const button = (popover.getRootNode() as ParentNode).querySelector<HTMLElement>("button.info");
  if (!button) return;
  delete button.dataset.pinned;
  button.setAttribute("aria-expanded", "false");
}

/** The icon and its explanation, for the card's header; nothing without one. */
export function explanation(label: string, paragraphs: Explanation): TemplateResult | typeof nothing {
  if (!paragraphs.length) return nothing;
  return html`<button
      type="button"
      class="info"
      aria-label=${label}
      aria-expanded="false"
      @pointerenter=${onEnter}
      @pointerleave=${onLeave}
      @click=${onClick}
      @keydown=${(event: KeyboardEvent) => event.stopPropagation()}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiInformationOutline}></path></svg>
    </button>
    <div class="explanation" popover="auto" role="note" @toggle=${onToggle}>
      ${paragraphs.map((paragraph) =>
        typeof paragraph === "string"
          ? html`<p>${paragraph}</p>`
          : html`<p><strong>${paragraph[0]}:</strong> ${paragraph[1]}</p>`
      )}
    </div>`;
}

export const explanationStyles = css`
  button.info {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 0 calc(-1 * var(--ha-space-1, 4px));
    padding: 0;
    border: none;
    border-radius: var(--ha-border-radius-circle, 50%);
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  button.info:hover {
    background-color: rgba(var(--rgb-primary-text-color), 0.04);
  }
  button.info:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button.info svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
  .explanation {
    position: fixed;
    inset: auto;
    margin: 0;
    box-sizing: border-box;
    width: max-content;
    max-width: min(320px, calc(100vw - 16px));
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-border-radius-lg, 12px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: var(--ha-box-shadow-l, 0 4px 16px rgba(0, 0, 0, 0.2));
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-normal, 400);
    line-height: var(--ha-line-height-normal, 20px);
    text-align: start;
    white-space: normal;
    z-index: 10;
  }
  /* Browsers without popovers show it the same way, by a class. */
  @supports not selector(:popover-open) {
    .explanation:not(.open) {
      display: none;
    }
  }
  .explanation p {
    margin: 0;
  }
  .explanation p + p {
    margin-top: var(--ha-space-2, 8px);
  }
  .explanation strong {
    font-weight: var(--ha-font-weight-medium, 500);
  }
`;

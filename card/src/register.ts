// Registers the cards and their card picker entries.

const REREGISTER_EVERY_MS = 100;
const REREGISTER_FOR_MS = 60_000;
const DOCUMENTATION_URL = "https://github.com/ignazhabibi/ha-energy-payback";

export interface CardEntry {
  tag: string;
  card: CustomElementConstructor;
  name: string;
  description: string;
  /** The card's editor, if it has its own. */
  editor?: { tag: string; element: CustomElementConstructor };
  /** Earlier tags of the card, so existing dashboards keep working. */
  aliases?: string[];
}

const define = (tag: string, card: CustomElementConstructor): void => {
  if (customElements.get(tag)) return;
  try {
    customElements.define(tag, card);
  } catch {
    // The browser's own registry already holds this class.
    customElements.define(tag, class extends card {});
  }
};

export interface StrategyEntry {
  /** Used as `custom:<type>` in the dashboard's strategy. */
  type: string;
  element: CustomElementConstructor;
  name: string;
  description: string;
}

export function registerCards(cards: CardEntry[], strategies: StrategyEntry[] = []): void {
  const defineAll = () => {
    cards.forEach(({ tag, card, editor, aliases }) => {
      define(tag, card);
      if (editor) define(editor.tag, editor.element);
      aliases?.forEach((alias) => define(alias, class extends card {}));
    });
    strategies.forEach(({ type, element }) =>
      define(`ll-strategy-dashboard-${type}`, element)
    );
  };
  defineAll();

  // Home Assistant's app replaces the custom element registry with a scoped
  // one when it starts. A card loaded before that is unknown to the new
  // registry, and the dashboard shows a configuration error. Define the cards
  // again once the registry has been replaced; Home Assistant then rebuilds
  // them.
  const initialRegistry = window.customElements;
  const startedAt = Date.now();
  const watcher = window.setInterval(() => {
    const replaced = window.customElements !== initialRegistry;
    if (replaced) defineAll();
    if (replaced || Date.now() - startedAt > REREGISTER_FOR_MS) {
      window.clearInterval(watcher);
    }
  }, REREGISTER_EVERY_MS);

  const registry = window as unknown as {
    customCards?: Array<Record<string, unknown>>;
    customStrategies?: Array<Record<string, unknown>>;
  };
  // Offered under "Community dashboards" when adding a dashboard.
  registry.customStrategies = registry.customStrategies ?? [];
  for (const { type, name, description } of strategies) {
    if (registry.customStrategies.some((entry) => entry.type === type)) continue;
    registry.customStrategies.push({
      type,
      strategyType: "dashboard",
      name,
      description,
      documentationURL: DOCUMENTATION_URL,
    });
  }
  registry.customCards = registry.customCards ?? [];
  for (const { tag, name, description } of cards) {
    if (registry.customCards.some((card) => card.type === tag)) continue;
    registry.customCards.push({
      type: tag,
      name,
      description,
      preview: true,
      documentationURL: DOCUMENTATION_URL,
    });
  }
}

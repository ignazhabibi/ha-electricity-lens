// Node has no DOM. Modules that define a custom element only need its base
// class to exist; import this before them.

globalThis.HTMLElement ??= class {} as unknown as typeof HTMLElement;

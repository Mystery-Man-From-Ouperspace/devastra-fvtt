import { Macros } from "./macros.js";

export function registerHooks() {
  Hooks.once("setup", function () {
    // Localize CONFIG objects once up-front
    const toLocalize = ["saves", "attributes"];
    // Exclude some from sorting where the default order matters
    const noSort = ["saves", "attributes"];

    // Localize and sort CONFIG objects
    for (let o of toLocalize) {
      const localized = Object.entries(CONFIG.DEVASTRA[o]).map((e) => {
        return [e[0], game.i18n.localize(e[1])];
      });
      if (!noSort.includes(o)) localized.sort((a, b) => a[1].localeCompare(b[1]));
      CONFIG.DEVASTRA[o] = localized.reduce((obj, e) => {
        obj[e[0]] = e[1];
        return obj;
      }, {});
    }
  });

  /**
   * Create a macro when dropping an entity on the hotbar
   * Item      - open roll dialog
   * Actor     - open actor sheet
   * Journal   - open journal sheet
   */
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if (["Actor", "Item", "JournalEntry"].includes(data.type)) {
      Macros.createDevastraMacro(data, slot);
      return false;
    }
  });

}

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class DEVASTRADharmaSheet extends ItemSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet"],
      template: "systems/devastra/templates/item/dharma-sheet.html",
      width: 450,
      height: 520,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description-technique" }],
      scrollY: [".description-technique", ".description-narratif", ".data", ".notes"],
    });
  }

  
   /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = this.item.system;
    context.techniqueHTML = await TextEditor.enrichHTML(this.item.system.technique, {
      secrets: this.document.isOwner,
      async: true,
    });
    context.narratifHTML = await TextEditor.enrichHTML(this.item.system.narratif, {
      secrets: this.document.isOwner,
      async: true,
    });
    context.notesHTML = await TextEditor.enrichHTML(this.item.system.notes, {
      secrets: this.document.isOwner,
      async: true,
    });

    context.playersEditItems = game.settings.get("devastra", "playersEditItems");

    context.isGM = game.user.isGM;
    // context.isGM = false;

    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;
  }
}

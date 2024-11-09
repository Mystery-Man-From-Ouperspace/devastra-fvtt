/**
 * @extends {ActorSheet}
 */
export class DEVASTRAActorSheet extends ActorSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet", "actor"],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
      width: 920,
      height: 750
    });
  }

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.systemData = this.actor.system;
    context.locked = await this.actor.system.locked;

    context.descriptionHTML = await TextEditor.enrichHTML(this.actor.system.description, {
      secrets: this.document.isOwner,
      async: true,
    });
    /*
    context.effetHTML = await TextEditor.enrichHTML(this.actor.system.enseignement.effet, {
      secrets: this.document.isOwner,
      async: true,
    });
    */
    return context;
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Item Controls
    html.find(".item-control").click(this._onItemControl.bind(this));
    // html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
  }

  /**
   * Handle click events for Item, Aspect, Anomaly, Attribute control buttons within the Actor Sheet
   * @param event
   * @private
   */
  async _onItemControl(event) {
    event.preventDefault();

    // Obtain event data
    const button = event.currentTarget;
    const action = button.dataset.action;
    const type = button.dataset.type;
    const li = button.closest(".item");
    let item;

    // Handle different actions
    switch (action) {
      case "create":
        const cls = getDocumentClass("Item");
        let name = "";
        let imgPath = "";
        if (type === "item") {
          name = game.i18n.localize("DEVASTRA.ItemNew");
          imgPath = "systems/devastra/images/icons/item.png";
        }
        else if (type === "enseignement") {
          name = game.i18n.localize("DEVASTRA.EnseignementNew");
          imgPath = "systems/devastra/images/icons/enseignement.png";
        }
        else if (type === "devastra") {
          name = game.i18n.localize("DEVASTRA.DevastraNew");
          imgPath = "systems/devastra/images/icons/devastra.png";
        }
        else if (type === "pouvoir") {
          name = game.i18n.localize("DEVASTRA.PouvoirNew");
          imgPath = "systems/devastra/images/icons/pouvoir.png";
        }
        else if (type === "magie") {
          name = game.i18n.localize("DEVASTRA.MagieNew");
          imgPath = "systems/devastra/images/icons/magie.png";
        }
        else if (type === "dharma") {
          name = game.i18n.localize("DEVASTRA.DharmaNew");
          imgPath = "systems/devastra/images/icons/dharma.png";
        }
        else if (type === "karma") {
          name = game.i18n.localize("DEVASTRA.KarmaNew");
          imgPath = "systems/devastra/images/icons/karma.png";
        }
        else if (type === "note") {
          name = game.i18n.localize("DEVASTRA.NoteNew");
          imgPath = "systems/devastra/images/icons/note.png";
        }
        else if (type === "blessureoustatut") {
          name = game.i18n.localize("DEVASTRA.BlessureNew");
          imgPath = "systems/devastra/images/icons/blessure.png";
        }

        await cls.create({ name: name, type: type }, { parent: this.actor });

        const myType = type;
        const myActor = this.actor;
        switch (myType) {
          case "item":
            for (let item of myActor.items.filter(item => item.type === 'item')) {
              if (item.img == "icons/svg/item-bag.svg") item.update({ "img": imgPath });
            }
          break;
          case "enseignement":
            for (let enseignement of myActor.items.filter(item => item.type === 'enseignement')) {
              if (enseignement.img == "icons/svg/item-bag.svg") enseignement.update({ "img": imgPath });
            }
          break;
          case "devastra":
            for (let devastra of myActor.items.filter(item => item.type === 'devastra')) {
              if (devastra.img == "icons/svg/item-bag.svg") devastra.update({ "img": imgPath });
            }
          break;
          case "pouvoir":
            for (let pouvoir of myActor.items.filter(item => item.type === 'pouvoir')) {
              if (pouvoir.img == "icons/svg/item-bag.svg") pouvoir.update({ "img": imgPath });
            }
          break;
          case "magie":
            for (let magie of myActor.items.filter(item => item.type === 'magie')) {
              if (magie.img == "icons/svg/item-bag.svg") magie.update({ "img": imgPath });
            }
          break;
          case "dharma":
            for (let dharma of myActor.items.filter(item => item.type === 'dharma')) {
              if (dharma.img == "icons/svg/item-bag.svg") dharma.update({ "img": imgPath });
            }
          break;
          case "karma":
            for (let karma of myActor.items.filter(item => item.type === 'karma')) {
              if (karma.img == "icons/svg/item-bag.svg") karma.update({ "img": imgPath });
            }
          case "note":
            for (let note of myActor.items.filter(item => item.type === 'note')) {
              if (note.img == "icons/svg/item-bag.svg") note.update({ "img": imgPath });
            }
          break;
          case "blessureoustatut":
            for (let blessureoustatut of myActor.items.filter(item => item.type === 'blessureoustatut')) {
              if (blessureoustatut.img == "icons/svg/item-bag.svg") blessureoustatut.update({ "img": imgPath });
            }
          break;
        }
        return;

      case "read":
        item = this.actor.items.get(li?.dataset.itemId);
        return item.sheet.render(true);
      case "edit":
        item = this.actor.items.get(li?.dataset.itemId);
        return item.sheet.render(true);
      case "delete":
        item = this.actor.items.get(li?.dataset.itemId);
        return item.delete();
    }
  }

  /**
   * Listen for roll buttons on items.
   * @param {MouseEvent} event    The originating left click event
   *
  _onItemRoll(event) {
    let button = $(event.currentTarget);
    const li = button.parents(".item");
    const item = this.actor.items.get(li.data("itemId"));
    let r = new Roll(button.data("roll"), this.actor.getRollData());
    return r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<h2>${item.name}</h2><h3>${button.text()}</h3>`,
    });
  }
  */
}
import { DEVASTRAActorSheet } from "./actor-sheet.js";
import { DEVASTRA } from "../config.js";
/**
 * @extends {DEVASTRAActorSheet}
 */
export class DEVASTRAMonsterSheet extends DEVASTRAActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet", "actor", "monster"],
      template: "systems/devastra/templates/actor/monster-sheet.html",
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".description", ".statistiques", ".magiesenseignementsnotes"],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }



  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);
    context.equipments = context.items.filter(item => item.type === "item");
    context.enseignements = context.items.filter(item => item.type === "enseignement");
    context.devastras = context.items.filter(item => item.type === "devastra");
    context.pouvoirs = context.items.filter(item => item.type === "pouvoir");
    context.magies = context.items.filter(item => item.type === "magie");
    context.dharmas = context.items.filter(item => item.type === "dharma");
    context.karmas = context.items.filter(item => item.type === "karma");
    context.notes = context.items.filter(item => item.type === "note");

    context.mandala1 = await this.actor.system.mandala.un.selected;
    context.mandala2 = await this.actor.system.mandala.deux.selected;
    context.mandala3 = await this.actor.system.mandala.trois.selected;
    context.mandala4 = await this.actor.system.mandala.quatre.selected;
    context.mandala5 = await this.actor.system.mandala.cinq.selected;
    context.mandala6 = await this.actor.system.mandala.six.selected;
    context.mandala7 = await this.actor.system.mandala.sept.selected;

    context.viseur1 = await game.settings.get("devastra", "viseur1");
    context.viseur2 = await game.settings.get("devastra", "viseur2");
    context.viseur3 = await game.settings.get("devastra", "viseur3");
    context.viseur4 = await game.settings.get("devastra", "viseur4");
    context.viseur5 = await game.settings.get("devastra", "viseur5");
    context.viseur6 = await game.settings.get("devastra", "viseur6");
    context.viseur7 = await game.settings.get("devastra", "viseur7");

    context.monstertype = await this.actor.system.monsterType;

    context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = await game.settings.get("devastra", "sonorizedMandalaInterface");

  
    /*
    context.usePromptsForAutomatization = game.settings.get("devastra", "usePromptsForAutomatization");

    context.autoWoundsNPC = game.settings.get("devastra", "autoWoundsNPC");
    */
   
    context.isGM = game.user.isGM;
    // context.isGM = false; // Pour tester la fonction

    context.DEVASTRA = DEVASTRA;
    return context;
  }


  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".clickondie").click(this._onClickDieRoll.bind(this));
    html.find(".clickonlock").click(this._onClickLock.bind(this));
    html.find(".clickplutotjeton").click(this._onClickPlutotJeton.bind(this));
    html.find(".clickplutotprompt").click(this._onClickPlutotPrompt.bind(this));
    html.find(".clickonmandala").click(this._onClickMandalaCheck.bind(this));
    html.find(".clickdownaction").click(this._onClickDownAction.bind(this));


    const dragDropJetonAction = new DragDrop({
      dragSelector: ".actionColJeton",
      dropSelector: ".actionColJeton",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonAction.bind(this), drop: this._onDragDropJetonAction.bind(this) }
    });
    dragDropJetonAction.bind(html[0]);

    const dragDropJetonShakti = new DragDrop({
      dragSelector: ".shaktiJeton",
      dropSelector: ".shaktiJeton",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonShakti.bind(this), drop: this._onDragDropJetonShakti.bind(this) }
    });
    dragDropJetonShakti.bind(html[0]);

    const dragDropJetonInit = new DragDrop({
      dragSelector: ".depotInit",
      dropSelector: ".depotInit",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonInit.bind(this), drop: this._onDragDropJetonInit.bind(this) }
    });
    dragDropJetonInit.bind(html[0]);

    const dragDropJetonPoubelle = new DragDrop({
      dragSelector: ".depotPoubelle",
      dropSelector: ".depotPoubelle",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonPoubelle.bind(this), drop: this._onDragDropJetonPoubelle.bind(this) }
    });
    dragDropJetonPoubelle.bind(html[0]);

    const dragDropJetonDepot1 = new DragDrop({
      dragSelector: ".jetonDepot1",
      dropSelector: ".jetonDepot1",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot1.bind(this), drop: this._onDragDropJetonDepot1.bind(this) }
    });
    dragDropJetonDepot1.bind(html[0]);

    const dragDropJetonDepot2 = new DragDrop({
      dragSelector: ".jetonDepot2",
      dropSelector: ".jetonDepot2",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot2.bind(this), drop: this._onDragDropJetonDepot2.bind(this) }
    });
    dragDropJetonDepot2.bind(html[0]);

    const dragDropJetonDepot3 = new DragDrop({
      dragSelector: ".jetonDepot3",
      dropSelector: ".jetonDepot3",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot3.bind(this), drop: this._onDragDropJetonDepot3.bind(this) }
    });
    dragDropJetonDepot3.bind(html[0]);

    const dragDropJetonDepot4 = new DragDrop({
      dragSelector: ".jetonDepot4",
      dropSelector: ".jetonDepot4",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot4.bind(this), drop: this._onDragDropJetonDepot4.bind(this) }
    });
    dragDropJetonDepot4.bind(html[0]);

    const dragDropJetonDepot5 = new DragDrop({
      dragSelector: ".jetonDepot5",
      dropSelector: ".jetonDepot5",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot5.bind(this), drop: this._onDragDropJetonDepot5.bind(this) }
    });
    dragDropJetonDepot5.bind(html[0]);

    const dragDropJetonDepot6 = new DragDrop({
      dragSelector: ".jetonDepot6",
      dropSelector: ".jetonDepot6",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot6.bind(this), drop: this._onDragDropJetonDepot6.bind(this) }
    });
    dragDropJetonDepot6.bind(html[0]);

    const dragDropJetonDepot7 = new DragDrop({
      dragSelector: ".jetonDepot7",
      dropSelector: ".jetonDepot7",
      permissions: { dragstart: this._canDragStartJeton.bind(this), drop: this._canDragDropJeton.bind(this) },
      callbacks: { dragstart: this._onDragStartJetonDepot7.bind(this,), drop: this._onDragDropJetonDepot7.bind(this) }
    });
    dragDropJetonDepot7.bind(html[0]);
  }


  async _canDragStartJeton(selector) {
    return true
  }


  async _canDragDropJeton(selector) {
    return true
  }


  async _onDragStartJetonAction(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'actionColJeton' });
  }
  async _onDragStartJetonShakti(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'shaktiJeton' });
  }
  async _onDragStartJetonInit(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'depotInit' });
  }
  async _onDragStartJetonPoubelle(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'depotPoubelle' });
  }
  async _onDragStartJetonDepot1(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot1' });
  }
  async _onDragStartJetonDepot2(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot2' });
  }
  async _onDragStartJetonDepot3(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot3' });
  }
  async _onDragStartJetonDepot4(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot4' });
  }
  async _onDragStartJetonDepot5(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot5' });
  }
  async _onDragStartJetonDepot6(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot6' });
  }
  async _onDragStartJetonDepot7(event) {
    console.log("Je passe bien ici !");
    let myActor = this.actor;
    await myActor.update({ "system.srcJeton": 'jetonDepot7' });
  }


  async _onDragDropJetonAction(event) {
  let myActor = this.actor;
  let srcJeton = await myActor.system.srcJeton;
  if (!(myActor.system.action.piledejetons)) {
    switch (srcJeton) {
      case 'actionColJeton':
      // ça n'est pas censé arriver
      break;
      case 'shaktiJeton':
      // ça n'est pas censé arriver
      break;
      case 'depotInit':
      // ça n'est pas censé arriver
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus && myActor.system.mandala.un.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus && myActor.system.mandala.deux.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus && myActor.system.mandala.trois.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus && myActor.system.mandala.quatre.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus && myActor.system.mandala.cinq.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus && myActor.system.mandala.six.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus && myActor.system.mandala.sept.typejetonbonus == 1) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.action.piledejetons": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }
  }

  async _onDragDropJetonShakti(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;

    switch (srcJeton) {
      case 'actionColJeton':
      // ça n'est pas censé arriver
      break;
      case 'shaktiJeton':
      // ça n'est pas censé arriver
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus && myActor.system.mandala.un.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus && myActor.system.mandala.deux.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus && myActor.system.mandala.trois.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus && myActor.system.mandala.quatre.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus && myActor.system.mandala.cinq.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus && myActor.system.mandala.six.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus && myActor.system.mandala.sept.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons + 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }

  async _onDragDropJetonInit(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;

    switch (srcJeton) {
      case 'actionColJeton':
      // ça n'est pas censé arriver
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
        };
      break;
      case 'depotInit':
      // ça n'est pas censé arriver
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus && myActor.system.mandala.un.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus && myActor.system.mandala.deux.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus && myActor.system.mandala.trois.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus && myActor.system.mandala.quatre.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus && myActor.system.mandala.cinq.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus && myActor.system.mandala.six.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus && myActor.system.mandala.sept.typejetonbonus == 2) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus + 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }

  async _onDragDropJetonPoubelle(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    console.log("srcJeton", srcJeton);
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
    if (game.settings.get("devastra", "sonorizedMandalaInterface")) {
      var audio;
      audio = new Audio("systems/devastra/images/sounds/defausse_jeton.wav");
      audio.play();
    }
}
 


  async _onDragDropJetonDepot1(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.un.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.un.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.un.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.un.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.un.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }
  }

  async _onDragDropJetonDepot2(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.deux.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        }
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.deux.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }
  }
  
  async _onDragDropJetonDepot3(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.trois.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        }
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.trois.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
    }
  }

  async _onDragDropJetonDepot4(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.quatre.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.quatre.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
    }
  }

  async _onDragDropJetonDepot5(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.cinq.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot5':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.cinq.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
    }
  }

  async _onDragDropJetonDepot6(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
if (!(myActor.system.mandala.six.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.six.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.six.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.six.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };

      break;
      case 'jetonDepot6':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot7':
        if (myActor.system.mandala.sept.nbrjetonbonus) {
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.six.typejetonbonus": myActor.system.mandala.sept.typejetonbonus });
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 1 });
        };
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }
  }

  async _onDragDropJetonDepot7(event) {
    let myActor = this.actor;
    let srcJeton = await myActor.system.srcJeton;
    if (!(myActor.system.mandala.sept.nbrjetonbonus)) {
    switch (srcJeton) {
      case 'actionColJeton':
        if (myActor.system.action.piledejetons) {
          await myActor.update({ "system.action.piledejetons": myActor.system.action.piledejetons - 1 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": 1 });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'shaktiJeton':
        if (myActor.system.shakti.piledejetons) {
          await myActor.update({ "system.shakti.piledejetons": myActor.system.shakti.piledejetons - 1 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'depotInit':
        if (myActor.system.initiative.nbrjetonbonus) {
          await myActor.update({ "system.initiative.nbrjetonbonus": myActor.system.initiative.nbrjetonbonus - 1 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": 2 });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'depotPoubelle':
      // ça n'est pas censé arriver
      break;
      case 'jetonDepot1':
        if (myActor.system.mandala.un.nbrjetonbonus) {
          await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.un.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot2':
        if (myActor.system.mandala.deux.nbrjetonbonus) {
          await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.deux.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot3':
        if (myActor.system.mandala.trois.nbrjetonbonus) {
          await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.trois.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot4':
        if (myActor.system.mandala.quatre.nbrjetonbonus) {
          await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.quatre.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot5':
        if (myActor.system.mandala.cinq.nbrjetonbonus) {
          await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.cinq.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot6':
        if (myActor.system.mandala.six.nbrjetonbonus) {
          await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
          await myActor.update({ "system.mandala.sept.typejetonbonus": myActor.system.mandala.six.typejetonbonus });
          await myActor.update({ "system.mandala.sept.nbrjetonbonus": 1 });
        };
      break;
      case 'jetonDepot7':
      // ça n'est pas censé arriver
      break;
      default:
        console.log(`Sorry, that's an error.`);
    }
  }
  }
 

  /* -------------------------------------------- */

  /**
   * Listen for roll buttons Down Action.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickDownAction(event) {
    let myActor = this.actor;
    if (!(myActor.system.action.piledejetons)) {
      if (game.settings.get("devastra", "sonorizedMandalaInterface")) {
        var audio;
        audio = new Audio("systems/devastra/images/sounds/tire_jeton.wav");
        audio.play();
      }
      await myActor.update({ "system.action.piledejetons": 1 });
    };
  };

  /* -------------------------------------------- */

  /**
   * Listen for roll buttons on Jauge.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickMandalaCheck(event) {

    // console.log("J'entre dans _onClickMandalaCheck()");

    const element = event.currentTarget;                        // On récupère le clic
    const whatIsIt = element.dataset.libelId;                   // Va récupérer 'mandala-1' par exemple
    // console.log("whatIsIt = ", whatIsIt);
    const whatIsItTab = whatIsIt.split('-');
    const mandalaType = whatIsItTab[0];                           // Va récupérer 'mandala'
    const mandalaNumber = whatIsItTab[1];                         // Va récupérer '1'
    let whichCheckBox ="";
    let myActor = this.actor;
    switch (mandalaNumber) {
      case "1":
        if (myActor.system.mandala.un.selected) {
          myActor.update({ "system.mandala.un.selected": false });
        } else {
          myActor.update({ "system.mandala.un.selected": true });
        }
      break;
      case "2":
        if (myActor.system.mandala.deux.selected) {
          myActor.update({ "system.mandala.deux.selected": false });
        } else {
          myActor.update({ "system.mandala.deux.selected": true });
        }
        break;
      case "3":
        if (myActor.system.mandala.trois.selected) {
          myActor.update({ "system.mandala.trois.selected": false });
        } else {
          myActor.update({ "system.mandala.trois.selected": true });
        }
        break;
      case "4":
        if (myActor.system.mandala.quatre.selected) {
          myActor.update({ "system.mandala.quatre.selected": false });
        } else {
          myActor.update({ "system.mandala.quatre.selected": true });
        }
        break;
      case "5":
        if (myActor.system.mandala.cinq.selected) {
          myActor.update({ "system.mandala.cinq.selected": false });
        } else {
          myActor.update({ "system.mandala.cinq.selected": true });
        }
        break;
      case "6":
        if (myActor.system.mandala.six.selected) {
          myActor.update({ "system.mandala.six.selected": false });
        } else {
          myActor.update({ "system.mandala.six.selected": true });
        }
        break;
      case "7":
        if (myActor.system.mandala.sept.selected) {
          myActor.update({ "system.mandala.sept.selected": false });
        } else {
          myActor.update({ "system.mandala.sept.selected": true });
        }
        break;
      default:
        console.log("C'est bizarre !");
    };
  }

    /**
   * Listen for roll buttons on Plutot Jeton.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickPlutotJeton(event) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.PlutôtJeton"));
  }

  /**
  * Listen for roll buttons on Plutot Prompt.
  * @param {MouseEvent} event    The originating left click event
  */
  async _onClickPlutotPrompt(event) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.PlutôtPrompt"));
  }

  /**
   * Listen for roll buttons on Lock.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickLock(event) {
    let newlocked;
    if (this.actor.system.locked) {
      newlocked = false;
      ui.notifications.info(game.i18n.localize("DEVASTRA.FonctDeverrouillée"));
    } else {
      newlocked = true;
      ui.notifications.info(game.i18n.localize("DEVASTRA.FonctVerrouillée"));
    };
    await this.actor.update({ "system.locked": newlocked });
  }

  /**
   * Listen for roll buttons on Clickable d6.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickDieRoll(event) {

    const element = event.currentTarget;                        // On récupère le clic
    const whatIsIt = element.dataset.libelId;                   // Va récupérer 'dph-puredomain' ou 'dma-special' par exemple
    // console.log("whatIsIt = ", whatIsIt)
    const whatIsItTab = whatIsIt.split('-');
    const domainLibel = whatIsItTab[0];                         // Va récupérer 'dph' ou 'dma'…
    const pureDomOrSpeLibel = whatIsItTab[1];                   // Va récupérer 'puredomain' ou bien 'special'

    let myActor = this.actor;
    let myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
    let myDialogOptions = {
      classes: ["devastra", "sheet"]
    };
    let template = "";
    let myResultDialog =  await _skillDiceRollDialog(
      myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel
    );

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("CDE.Error0"));
      return;
      };
    //////////////////////////////////////////////////////////////////
    

    const myJetAutreFlag = myResultDialog.jetautreflag;
    const myJetAttaqueFlag = myResultDialog.jetattaqueflag;
    const mtJetDefenseFlag = myResultDialog.jetdefenseflag;
    const myND = myResultDialog.nd;
    const myNbrDeDomaine = myResultDialog.nbrdedomaine;
    const myBonusDomaineFlag = myResultDialog.bonusdomainecheck;
    const myNbrDeBonusDomaine = myResultDialog.nbrdebonusdomaine;
    const mySpecialiteFlag = myResultDialog.specialitecheck;
    const myNbrDeBonusSpecialite = myResultDialog.nbrdebonusspecialite;
    const myBonusApplique = myResultDialog.bonusapplique;
    const myPlusDeuxDesDAttaque = myResultDialog.plusdeuxdesdattaque;
    const myMalusApplique = myResultDialog.malususapplique;
    const myIgnoreMalus = myResultDialog.ignoremalus;
    const myMalusAIgnorer = myResultDialog.malususaignorer;
    const mySuccesAuto = myResultDialog.succesauto;
    const myPlusUnSuccesAuto = myResultDialog.plusunsuccesauto;
    let mySixExploFlag = myResultDialog.sixexplo;
    let myCinqExploFlag = myResultDialog.cinqexplo;
    const myDesNonExplo = myResultDialog.desnonexplo;
    const myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);

    let jetLibel;
    if (myJetAutreFlag) {
      jetLibel = "other";
    } else if (myJetAttaqueFlag) {
      jetLibel = "attck";
    } else {
      jetLibel = "defnc";
    };



    /***********************************************************************************
    * 
    * {N} : nombre de dés lancés
    * {S} : seuil à atteindre (Niveau de Difficulté)
    * {A} : nombre de réussites automatiques
    * 
    * /r {N}d6cs>={S} : roll N d6, count successes (>=S), no dice results are explosive
    * /r {N}d6x=6cs>={S} : roll N d6, count successes (>=S), only 6 are explosive
    * /r {N}d6x>=5cs>={S} : roll N d6, count successes (>=S), 5 and 6 are explosive
    * 
    * nombre de 1 = ?
    * nombre de 2 = ?
    * nombre de 3 = ?
    * nombre de 4 = ?
    * nombre de 5 = ?
    * nombre de 6 = ?
    * nombre de réussites automatiques = {A}
    * total nombre de réussites = roll.result+{A}
    * 
    ************************************************************************************/


    let d6_1 = 0;
    let d6_2 = 0;
    let d6_3 = 0;
    let d6_4 = 0;
    let d6_5 = 0;
    let d6_6 = 0;
    let d6_A = mySuccesAuto;

    let suite = "[";

    let total = myNbrDeDomaine;

    // console.log("myNbrDeBonusDomaine", myNbrDeBonusDomaine);
    if (myBonusDomaineFlag) {
      total += myNbrDeBonusDomaine;
      // console.log("myNbrDeBonusDomaine", "compabilisé");
    };

    // console.log("myNbrDeBonusSpecialite", myNbrDeBonusSpecialite);
    if (mySpecialiteFlag) {
      total += myNbrDeBonusSpecialite;
      // console.log("myNbrDeBonusSpecialite", "compabilisé");
    };

    /*
    Ici, on vérifie la validité de tous les bonus et on les applique ; et on soustrait les jetons en conséquence.
    */

    // Ici on traite le cas des dés non-explosifs
    if (myDesNonExplo == 2) {
      myCinqExploFlag = false;
      mySixExploFlag = false;
    } else if ((myDesNonExplo == 1) && myCinqExploFlag) {
      myCinqExploFlag = false;
    } else if ((myDesNonExplo == 1) && !(myCinqExploFlag)) {
      mySixExploFlag = false;
    };

    console.log("total = ", total);

    //////////////////////////////////////////////////////////////////
    if (total <= 0) {
      ui.notifications.warn(game.i18n.localize("CDE.Error1"));
      return;
      };
    //////////////////////////////////////////////////////////////////

     if (suite.length >= 2) {
      suite += "%";
      suite = suite.replace(', %', ']');
    } else {
      suite = "";
    };

    var n = {
      myReussite: 0,
      myND: myND,
      mySixExplo: mySixExploFlag,
      myCinqExplo: myCinqExploFlag,
      nbrRelance: total,
      d6_1: 0,
      d6_2: 0,
      d6_3: 0,
      d6_4: 0,
      d6_5: 0,
      d6_6: 0

    };

    var msg;

    let myRoll = "";

    do {
      let myRoll = "";
      myRoll +=  n.nbrRelance+"d6cs>="+n.myND;
      d6_1 = 0;
      d6_2 = 0;
      d6_3 = 0;
      d6_4 = 0;
      d6_5 = 0;
      d6_6 = 0;

      const r = new Roll(myRoll, this.actor.getRollData());
      await r.evaluate();
      console.log(r);
      let myRDice = r.dice;
      console.log(myRDice);
      console.log(myRDice[0]);
      for (let key in myRDice) {
        console.log(myRDice[key]);
        for (let i=0; i<myRDice[key].number; i++) {
          let myD = myRDice[key].results[i].result;
          console.log(myD);
          switch ( myD ) {
            case 1: d6_1++;
            break;
            case 2: d6_2++;
            break;
            case 3: d6_3++;
            break;
            case 4: d6_4++;
            break;
            case 5: d6_5++;
            break;
            case 6: d6_6++;
            break;
            default: console.log("C'est bizarre !");
          };
          n.nbrRelance = 0;
          if (n.mySixExplo) {
            n.nbrRelance += d6_6;
            if (n.myCinqExplo) {
              n.nbrRelance += d6_5;
            }
          }
        }
      };


      n.d6_1 += d6_1;
      n.d6_2 += d6_2;
      n.d6_3 += d6_3;
      n.d6_4 += d6_4;
      n.d6_5 += d6_5;
      n.d6_6 += d6_6;


      n.myReussite = parseInt(n.myReussite) + parseInt(r._total);

      // r._total = "0";

      const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
      console.log("myTypeOfThrow", myTypeOfThrow);

      msg = await r.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        rollMode: myTypeOfThrow
      });

      await new Promise(w => setTimeout(w, 2750));

    } while (n.nbrRelance);

    const rModif = new Roll("0[Total Réussites]", this.actor.getRollData());
    await rModif.evaluate();
    rModif._total  = parseInt(n.myReussite) + parseInt(mySuccesAuto); // On ajoute les succès automatiques

    const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer
    console.log("myTypeOfThrow", myTypeOfThrow);

    msg = await rModif.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rollMode: myTypeOfThrow
    });

      
    const d_successes  = parseInt(n.myReussite) + parseInt(mySuccesAuto); // On ajoute les succès automatiques

    // Smart Message
    const smartTemplate = 'systems/devastra/templates/form/dice-result.html';
    const smartData = {
      domaine: domainLibel,
      jet: jetLibel,
      succes: d_successes,
      d1: n.d6_1,
      d2: n.d6_2,
      d3: n.d6_3,
      d4: n.d6_4,
      d5: n.d6_5,
      d6: n.d6_6,
      dA: d6_A,
    }
    console.log("smartData avant retour func = ", smartData);
    const smartHtml = await renderTemplate(smartTemplate, smartData);
     
    ChatMessage.create({
      user: game.user.id,
      // speaker: ChatMessage.getSpeaker({ token: this.actor }),
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: smartHtml,
      rollMode: myTypeOfThrow
    });

  };

}

async function _skillDiceRollDialog(
  myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt.html';
  const myActorID = myActor;
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  let myDomaine = domainLibel;
  let myNbrDeDomaine = 0;
  let myNbrDeBonusDomaine = 0;
  const myNbrDeBonusSpecialite = 1;
  const myBonusDomaineCheck = true;
  const myDomainLibel = domainLibel;

  const mySpecialiteCheck = (pureDomOrSpeLibel === "special");
  const mySixExploFlag = (myActorID.system.prana.value <= myActorID.system.prana.tenace); // si Tenace ou moins
  const myPlus1SuccesAutoFlag = (myActorID.system.prana.value > myActorID.system.prana.tenace); // si Vaillant
  const myShaktiRestanteFlag = (myActorID.system.shakti.piledejetons); // s'il reste des jetons de Shakti
  const myconvictionRestanteFlag = (myActorID.system.conviction.piledejetons); // s'il reste des jetons de Conviction


  switch (myDomainLibel) {
    case "dph": 
      myNbrDeDomaine = myActorID.system.domains.dph.value;
      myNbrDeBonusDomaine = myActorID.system.domains.dph.bonusdice;
    break;
    case "dma": 
      myNbrDeDomaine = myActorID.system.domains.dma.value;
      myNbrDeBonusDomaine = myActorID.system.domains.dma.bonusdice;
    break;
    case "din": 
      myNbrDeDomaine = myActorID.system.domains.din.value;
      myNbrDeBonusDomaine = myActorID.system.domains.din.bonusdice;
    break;
    case "dso": 
      myNbrDeDomaine = myActorID.system.domains.dso.value;
      myNbrDeBonusDomaine = myActorID.system.domains.dso.bonusdice;
    break;
    case "dmy": 
      myNbrDeDomaine = myActorID.system.domains.dmy.value;
      myNbrDeBonusDomaine = myActorID.system.domains.dmy.bonusdice;
    break;
    default : console.log("Outch !");
  };
  var dialogData = {
    domaine: myDomaine,
    systemData: myActorID.system,
    nbrdedomaine: myNbrDeDomaine,
    nbrdebonusdomaine: myNbrDeBonusDomaine,
    bonusdomainecheck: myBonusDomaineCheck,
    nbrdebonusspecialite: myNbrDeBonusSpecialite,
    specialitecheck: mySpecialiteCheck,
    nd: 4,
    shaktirestanteflag: myShaktiRestanteFlag,
    convictionrestanteflag: myconvictionRestanteFlag,
    plus1succesautoflag : myPlus1SuccesAutoFlag,
    sixexplo: mySixExploFlag,
    cinqexplo: false,
    desnonexplo: 0,
    versiondebloquee: false
  };
  const html = await renderTemplate(template, dialogData);
  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActorID, dialogData, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve( null )
          }
        },
        default: 'validateBtn',
        close: () => resolve( null )
    },
    dialogOptions
    ).render(true, {
      width: 500,
      height: 745
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  async function _computeResult(myActor, myDialogData, myHtml) {
    const editedData = {
      jetautreflag: myHtml.find("input[value='autre']").is(':checked'),
      jetattaqueflag: myHtml.find("input[value='jetattaque']").is(':checked'),
      jetdefenseflag: myHtml.find("input[value='jetdefense']").is(':checked'),
      nd: myHtml.find("select[name='nd']").val(),
      nbrdedomaine: myDialogData.nbrdedomaine,
      nbrdebonusdomaine: myDialogData.nbrdebonusdomaine,
      bonusdomainecheck: myHtml.find("input[name='bonusdomainecheck']").is(':checked'),
      nbrdebonusspecialite: myDialogData.nbrdebonusspecialite,
      specialitecheck: myHtml.find("input[name='specialitecheck']").is(':checked'),
      bonusapplique: myHtml.find("select[name='bonusapplique']").val(),
      plusdeuxdesdattaque: myHtml.find("select[name='plusdeuxdesdattaque']").val(),
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      ignoremalus: myHtml.find("select[name='ignoremalus']").val(),
      malususaignorer: myHtml.find("select[name='malususaignorer']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
      plusunsuccesauto: myHtml.find("select[name='plusunsuccesauto']").val(),
      sixexplo: myHtml.find("input[name='sixexplo']").is(':checked'),
      cinqexplo: myHtml.find("input[name='cinqexplo']").is(':checked'),
      desnonexplo: myHtml.find("select[name='desnonexplo']").val(),
      versiondebloquee: myHtml.find("input[name='versiondebloquee']").is(':checked')
    };
    return editedData;
  }
  
}
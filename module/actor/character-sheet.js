import { DEVASTRAActorSheet } from "./actor-sheet.js";
import { DEVASTRA } from "../config.js";
import { ModifiedDialog } from "../modified-dialog.js";
/**
 * @extends {DEVASTRAActorSheet}
 */


export class DEVASTRACharacterSheet extends DEVASTRAActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet", "actor", "character"],
      template: "systems/devastra/templates/actor/character-sheet.html",
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".description", ".statistiques", ".mandalas", ".chakras", ".devastras", ".pouvoirs", ".magies", ".dharmas", ".karmas", "items"],
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
    context.blessuresoustatuts = context.items.filter(item => item.type === "blessureoustatut");

    context.playersEditItems = game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = game.settings.get("devastra", "sonorizedMandalaInterface");

    context.conviction = await this.actor.system.conviction.piledejetons;
    context.shakti = await this.actor.system.shakti.piledejetons;
    context.action = await this.actor.system.action.piledejetons;
    context.un = await this.actor.system.chakra.niveaux.un;
    context.deux = await this.actor.system.chakra.niveaux.deux;
    context.trois = await this.actor.system.chakra.niveaux.trois;
    context.quatre = await this.actor.system.chakra.niveaux.quatre;
    context.cinq = await this.actor.system.chakra.niveaux.cinq;
    context.six = await this.actor.system.chakra.niveaux.six;
    context.sept = await this.actor.system.chakra.niveaux.sept;
    context.bonusinit = await this.actor.system.initiative.nbrjetonbonus;
    context.mandala1 = await this.actor.system.mandala.un.nbrjetonbonus;
    context.mandala1type = await this.actor.system.mandala.un.typejetonbonus;
    context.mandala2 = await this.actor.system.mandala.deux.nbrjetonbonus;
    context.mandala2type = await this.actor.system.mandala.deux.typejetonbonus;
    context.mandala3 = await this.actor.system.mandala.trois.nbrjetonbonus;
    context.mandala3type = await this.actor.system.mandala.trois.typejetonbonus;
    context.mandala4 = await this.actor.system.mandala.quatre.nbrjetonbonus;
    context.mandala4type = await this.actor.system.mandala.quatre.typejetonbonus;
    context.mandala5 = await this.actor.system.mandala.cinq.nbrjetonbonus;
    context.mandala5type = await this.actor.system.mandala.cinq.typejetonbonus;
    context.mandala6 = await this.actor.system.mandala.six.nbrjetonbonus;
    context.mandala6type = await this.actor.system.mandala.six.typejetonbonus;
    context.mandala7 = await this.actor.system.mandala.sept.nbrjetonbonus;
    context.mandala7type = await this.actor.system.mandala.sept.typejetonbonus;
    /*
    context.usePromptsForAutomatization = game.settings.get("devastra", "usePromptsForAutomatization");

    context.autoWoundsNPC = game.settings.get("devastra", "autoWoundsNPC");
    */
    context.viseur0 = await game.settings.get("devastra", "viseur0");
    context.viseur1 = await game.settings.get("devastra", "viseur1");
    context.viseur2 = await game.settings.get("devastra", "viseur2");
    context.viseur3 = await game.settings.get("devastra", "viseur3");
    context.viseur4 = await game.settings.get("devastra", "viseur4");
    context.viseur5 = await game.settings.get("devastra", "viseur5");
    context.viseur6 = await game.settings.get("devastra", "viseur6");
    context.viseur7 = await game.settings.get("devastra", "viseur7");

    context.isGM = game.user.isGM;
    // context.isGM = false; // Pour tester la fonction

    context.DEVASTRA = DEVASTRA;
    return context;
  }

  /* -------------------------------------------- */


  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    // Listen to a socket event
    // All connected clients other than the emitting client will get an event broadcast of the same name
    // with the arguments from the emission.
    /*
    game.socket.on('system.devastra', (arg0) => {
      console.log(arg0);
      if (arg0 === 'viseurupdate') {
        context.viseur1 = game.settings.get("devastra", "viseur1");
        context.viseur2 = game.settings.get("devastra", "viseur2");
        context.viseur3 = game.settings.get("devastra", "viseur3");
        context.viseur4 = game.settings.get("devastra", "viseur4");
        context.viseur5 = game.settings.get("devastra", "viseur5");
        context.viseur6 = game.settings.get("devastra", "viseur6");
        context.viseur7 = game.settings.get("devastra", "viseur7");   
      }
    })
    */

    html.find(".clickondie").click(this._onClickDieRoll.bind(this));
    html.find(".clickonlock").click(this._onClickLock.bind(this));
    html.find(".clickplutotjeton").click(this._onClickPlutotJeton.bind(this));
    html.find(".clickplutotprompt").click(this._onClickPlutotPrompt.bind(this));
    html.find(".clickonchakra").click(this._onClickChakraJaugeCheck.bind(this));
    html.find(".clickdownaction").click(this._onClickDownAction.bind(this));
    html.find(".clickonarmure").click(this._onClickArmor.bind(this));
    html.find(".clickontrash").click(this._onClickTrash.bind(this));
    html.find(".clickondieconcentration").click(this._onClickDieConcentration.bind(this));
    html.find(".clickondieshakti").click(this._onClickDieShakti.bind(this));

    Hooks.on('updateSetting', async (setting, update, options, id) => this.onUpdateSetting(setting, update, options, id));
  
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

  /* -------------------------------------------- */


  /**
   * Listen for Settings Updates.
   *
   */
  async onUpdateSetting(setting, update, options, id) {
    // if (setting.key == '......') {
      let myActor = this.actor;
      myActor.render(false);
    // }
  }



  /**
   * Listen for click concentration.
   * @param {MouseEvent} event    The originating left click event
  */
  async _onClickDieConcentration (event) {
  
    let myActor = this.actor;
    let myTitle = game.i18n.localize("DEVASTRA.Alerte");
    let myMessage = game.i18n.localize("DEVASTRA.On tire la concentration");
    let myDialogOptions = {
    classes: ["devastra", "sheet"]
    };
    let template = "";
    var alertData = await _alertMessage (
    myActor, template, myTitle, myDialogOptions, myMessage
    );


    //////////////////////////////////////////////////////////////////
    if (!(alertData)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
    };
    //////////////////////////////////////////////////////////////////

    myTitle = game.i18n.localize("DEVASTRA.Tirage de jetons pour la Shakti");

    let domainLibel = "din";
    let pureDomOrSpeLibel;
    let myInitThrow = true;

    let myResultDialog =  await _skillDiceRollDialog(
      myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
    );


    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////


    let myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);
    if (myVersionDebloqueeFlag) {
      let myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
      myResultDialog = await _skillDiceRollDialogDeblocked (
        myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
      );
    }

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////
    


  }

/**
   * Listen for click shakti.
   * @param {MouseEvent} event    The originating left click event
  */
async _onClickDieShakti (event) {
  
  let myActor = this.actor;
  let myTitle = game.i18n.localize("DEVASTRA.Alerte");
  let myMessage = game.i18n.localize("DEVASTRA.On tire la shakti");
  let myDialogOptions = {
  classes: ["devastra", "sheet"]
  };
  let template = "";
  var alertData = await _alertMessage (
  myActor, template, myTitle, myDialogOptions, myMessage
  );


  //////////////////////////////////////////////////////////////////
  if (!(alertData)) {
  ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
  return;
  };
  //////////////////////////////////////////////////////////////////

  myTitle = game.i18n.localize("DEVASTRA.Tirage de jetons pour la Shakti");

  let domainLibel = "din";
  let pureDomOrSpeLibel;
  let myInitThrow = true;

  let myResultDialog =  await _skillDiceRollDialog(
    myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
  );


  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
    };
  //////////////////////////////////////////////////////////////////


  let myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);
  if (myVersionDebloqueeFlag) {
    let myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
    myResultDialog = await _skillDiceRollDialogDeblocked (
      myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
    );
  }

  //////////////////////////////////////////////////////////////////
  if (!(myResultDialog)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
    };
  //////////////////////////////////////////////////////////////////
    
    

  await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
  await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
  await myActor.update({ "system.initiative.nbrjetonbonus": 0 });
  await myActor.update({ "system.shakti.piledejetons": 0 });
  await myActor.update({ "system.action.piledejetons": 0 });

  // Lancer de dés
}


  /**
   * Listen for roll click poubelle.
   * @param {MouseEvent} event    The originating left click event
  */
  async _onClickTrash (event) {
  
    let myActor = this.actor;
    let myTitle = game.i18n.localize("DEVASTRA.Alerte");
    let myMessage = game.i18n.localize("DEVASTRA.On met à la poubelle");
    let myDialogOptions = {
    classes: ["devastra", "sheet"]
    };
    let template = "";
    var alertData = await _alertMessage (
    myActor, template, myTitle, myDialogOptions, myMessage
    );


    //////////////////////////////////////////////////////////////////
    if (!(alertData)) {
    // ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
    };
    //////////////////////////////////////////////////////////////////

    await myActor.update({ "system.mandala.sept.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.six.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.cinq.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.quatre.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.trois.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.deux.nbrjetonbonus": 0 });
    await myActor.update({ "system.mandala.un.nbrjetonbonus": 0 });
    await myActor.update({ "system.initiative.nbrjetonbonus": 0 });
  }

    

  /**
   * Listen for roll click armure.
   * @param {MouseEvent} event    The originating left click event
  */
  async _onClickArmor (event) {
   
    let myActor = this.actor;
    let myTitle = game.i18n.localize("DEVASTRA.Calcul Protection");
    let myDialogOptions = {
    classes: ["devastra", "sheet"]
    };
    let template = "";
    var myDefenceData = await _whichTypeOfDefence (
    myActor, template, myTitle, myDialogOptions
    );

    //////////////////////////////////////////////////////////////////
    if (!(myDefenceData)) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
    return;
    };
    //////////////////////////////////////////////////////////////////
  
  }


  /**
   * Concerns Drag'n'Drop Actions.
   *
   */

  async _canDragStartJeton(selector) {
    return true
  }


  async _canDragDropJeton(selector) {
    return true
  }


  /**
   * Listen for Drag'n'Drop Actions.
   *
   */

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
   * Listen for click button Down Action.
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
   * Listen for click buttons on Chakra.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickChakraJaugeCheck(event) {

    // console.log("J'entre dans _onClickJaugeCheck()");

    const element = event.currentTarget;                        // On récupère le clic
    const whatIsIt = element.dataset.libelId;                   // Va récupérer 'chakra-1' par exemple
    // console.log("whatIsIt = ", whatIsIt);
    const whatIsItTab = whatIsIt.split('-');
    const jaugeType = whatIsItTab[0];                           // Va récupérer 'chakra'
    // .log("jaugeType = ", jaugeType);
    const jaugeNumber = whatIsItTab[1];                         // Va récupérer '1'
    // console.log("jaugeNumber = ", jaugeNumber);
    let whichCheckBox ="";
    let whichLevel = 0;
    let myActor = this.actor;
    console.log("myActor", myActor);
    console.log("myActor.tokens", myActor.tokens);
    switch (jaugeNumber) {
      case "1":
        whichCheckBox = myActor.system.chakra.niveaux.un;
        break;
      case "2":
        whichCheckBox = myActor.system.chakra.niveaux.deux;
        break;
      case "3":
        whichCheckBox = myActor.system.chakra.niveaux.trois;
        break;
      case "4":
        whichCheckBox = myActor.system.chakra.niveaux.quatre;
        break;
      case "5":
        whichCheckBox = myActor.system.chakra.niveaux.cinq;
        break;
      case "6":
        whichCheckBox = myActor.system.chakra.niveaux.six;
        break;
      case "7":
        whichCheckBox = myActor.system.chakra.niveaux.sept;
        break;
      default:
        console.log("C'est bizarre !");
    }
    
    let oldLevelChakra = myActor.system.chakra.value;
    let newLevelChakra = parseInt(jaugeNumber);
    if (whichCheckBox) {
      newLevelChakra--;
    }
    myActor.update({ "system.chakra.value": newLevelChakra });

    if (newLevelChakra > oldLevelChakra) {
      if (newLevelChakra > 0) {
        myActor.update({ "system.chakra.niveaux.un": true });
      }
      if (newLevelChakra > 1) {
        myActor.update({ "system.chakra.niveaux.deux": true });
      }
      if (newLevelChakra > 2) {
        myActor.update({ "system.chakra.niveaux.trois": true });
      }
      if (newLevelChakra > 3) {
        myActor.update({ "system.chakra.niveaux.quatre": true });
      }
      if (newLevelChakra > 4) {
        myActor.update({ "system.chakra.niveaux.cinq": true });
      }
      if (newLevelChakra > 5) {
        myActor.update({ "system.chakra.niveaux.six": true });
      }
      if (newLevelChakra > 6) {
        myActor.update({ "system.chakra.niveaux.sept": true });
      }
    } else if (newLevelChakra < oldLevelChakra) {
      if (newLevelChakra > 0) {
        myActor.update({ "system.chakra.niveaux.un": true });
      }
      if (newLevelChakra > 1) {
        myActor.update({ "system.chakra.niveaux.deux": true });
      }
      if (newLevelChakra > 2) {
        myActor.update({ "system.chakra.niveaux.trois": true });
      }
      if (newLevelChakra > 3) {
        myActor.update({ "system.chakra.niveaux.quatre": true });
      }
      if (newLevelChakra > 4) {
        myActor.update({ "system.chakra.niveaux.cinq": true });
      }
      if (newLevelChakra > 5) {
        myActor.update({ "system.chakra.niveaux.six": true });
      }
      if (newLevelChakra > 6) {
        myActor.update({ "system.chakra.niveaux.sept": true });
      }
      if (newLevelChakra < 7) {
        myActor.update({ "system.chakra.niveaux.sept": false });
      }
      if (newLevelChakra < 6) {
        myActor.update({ "system.chakra.niveaux.six": false });
      }
      if (newLevelChakra < 5) {
        myActor.update({ "system.chakra.niveaux.cinq": false });
      }
      if (newLevelChakra < 4) {
        myActor.update({ "system.chakra.niveaux.quatre": false });
      }
      if (newLevelChakra < 3) {
        myActor.update({ "system.chakra.niveaux.trois": false });
      }
      if (newLevelChakra < 2) {
        myActor.update({ "system.chakra.niveaux.deux": false });
      }
      if (newLevelChakra < 1) {
        myActor.update({ "system.chakra.niveaux.un": false });
      }

    }
  }

    /**
   * Listen for click button on Plutot Jeton.
   * @param {MouseEvent} event    The originating left click event
   */
  async _onClickPlutotJeton(event) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.PlutôtJeton"));
  }

  /**
  * Listen for click on Plutot Prompt.
  * @param {MouseEvent} event    The originating left click event
  */
  async _onClickPlutotPrompt(event) {
    ui.notifications.warn(game.i18n.localize("DEVASTRA.PlutôtPrompt"));
  }

  /**
   * Listen for click button on Lock.
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
    let myInitThrow = false;

    /*
    Ici on fait remplir les paramètres de lancer de dés
    */
    let myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
    let myDialogOptions = {
      classes: ["devastra", "sheet"]
    };
    let template = "";
    let myResultDialog =  await _skillDiceRollDialog(
      myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
    );

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
      return;
      };
    //////////////////////////////////////////////////////////////////
    

    let myVersionDebloqueeFlag = (myResultDialog.versiondebloquee == 1);
    if (myVersionDebloqueeFlag) {
      let myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
      myResultDialog = await _skillDiceRollDialogDeblocked (
        myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
      );
    }

    //////////////////////////////////////////////////////////////////
    if (!(myResultDialog)) {
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
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
    const myDesNonExplo = myResultDialog.desnonexplo;
    const mySixExploFlag = myResultDialog.sixexplo;
    const myCinqExploFlag = myResultDialog.cinqexplo;

    let jetLibel;
    if (myJetAutreFlag) {
      jetLibel = "other";
    } else if (myJetAttaqueFlag) {
      jetLibel = "attck";
    } else {
      jetLibel = "defnc";
    };


    /*
    Ici on fait choisir l'opposant
    */
    myTitle = game.i18n.localize("DEVASTRA.WhichTarget");

    var opponentActor = null;
    if (jetLibel == "attck") {
      var myTarget = await _whichTarget (
        myActor, template, myTitle, myDialogOptions, domainLibel
      );

      if (myTarget == null) {return};

      if (game.user.targets.size != 0) {
        for (let targetedtoken of game.user.targets) {
          if (targetedtoken.id == myTarget.selectedtarget) {
            opponentActor = targetedtoken.actor;
          };
        };
      };
    };


    console.log("opponentActor = ", opponentActor);


    /*
    Ici on fait choisir l'arme
    */
    myTitle = game.i18n.localize("DEVASTRA.WhichWeapon");
    let isInventory;
    let myWeaponVal;
    let mySelectedInventory;
    let myArmorProtection;


    if (jetLibel == "attck") {
      var myDamageData = await _whichTypeOfDamage (myActor, template, myTitle, myDialogOptions, domainLibel);

      //////////////////////////////////////////////////////////////////
      if (!(myDamageData)) {
        ui.notifications.warn(game.i18n.localize("DEVASTRA.Error2"));
        return;
        };
      //////////////////////////////////////////////////////////////////


      isInventory = myDamageData.isinventory;
      myWeaponVal = parseInt(myDamageData.damage);
      mySelectedInventory = myDamageData.selectedinventory;
      myArmorProtection = myDamageData.selectedarmor;

      console.log("myDamageData = ", myDamageData);
      console.log("isInventory = ", isInventory);
    }

    
    
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
      ui.notifications.warn(game.i18n.localize("DEVASTRA.Error1"));
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



/* -------------------------------------------- */
/*  Dialogue de choix de type d'arme            */
/* -------------------------------------------- */

async function _whichTypeOfDamage (myActor, template, myTitle, myDialogOptions, domainLibel) {
  // Render modal dialog
  const myActorID = myActor;
  template = template || 'systems/devastra/templates/form/type-weapon-prompt.html';
  const title = myTitle;
  let dialogOptions = myDialogOptions;
  const myDomain = domainLibel;

  let myItemWeapon = {};
  let myItemDevastra = {};
  let myItemPower = {};
  let myItemMagic = {};

  function myObject(id, label)
  {
    this.id = id;
    this.label = label;
  };


  myItemWeapon["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  myItemWeapon["-1"] = new myObject("-1", game.i18n.localize("DEVASTRA.barehands"));
  for (let item of myActor.items.filter(item => item.type === 'item')) {
    if (item.system.subtype == "weapon") {
    myItemWeapon[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.damage_base.toString()+"+"+item.system.damage.toString()+"]");
    };
  };

  myItemDevastra["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  for (let item of myActor.items.filter(item => item.type === 'devastra')) {
    if (item.system.attack != "") {
    myItemDevastra[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.damage_base.toString()+"+"+item.system.damage.toString()+"]");
    };
  };

  myItemPower["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  for (let item of myActor.items.filter(item => item.type === 'pouvoir')) {
    if (item.system.attack != "") {
    myItemPower[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.damage_base.toString()+"+"+item.system.damage.toString()+"]");
    };
  };

  myItemMagic["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  for (let item of myActor.items.filter(item => item.type === 'magie')) {
    if (item.system.attack != "") {
    myItemMagic[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.damage_base.toString()+"+"+item.system.damage.toString()+"]");
    };
  };


  var dialogData = {
    domaine: myDomain,
    systemData: myActorID.system,
    isinventory: true,
    inventorychoices: myItemWeapon,
    inventorydevastrachoices: myItemDevastra,
    inventorypowerchoices: myItemPower,
    inventorymagicchoices: myItemMagic,
    // selectedinventory: myActor.system.prefs.lastweaponusedid,
    // damage: myActor.system.prefs.improviseddamage,
    // selectedarmor: myActor.system.prefs.lastarmorusedid,

  };
  // dialogData = null;

  // console.log(dialogData);
  const html = await renderTemplate(template, dialogData);

  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
    // new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActor, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve(null)
          }
        },
        default: 'validateBtn',
        close: () => resolve(null)
      },
      dialogOptions
    ).render(true, {
      width: 630,
      height: "auto"
    });
  });

  if (prompt == null) {
    return prompt
  } else {
  return dialogData;
  }
  
  
  async function _computeResult(myActor, myHtml) {
    // console.log("I'm in _computeResult(myActor, myHtml)");
    const editedData = {
      isinventory: myHtml.find("input[value='isinventory']").is(':checked'),
      selectedinventory: myHtml.find("select[name='inventory']").val(),
      selectedinventorydevastra: myHtml.find("select[name='inventorydevastra']").val(),
      selectedinventorypower: myHtml.find("select[name='inventorypower']").val(),
      selectedinventorymagic: myHtml.find("select[name='inventorymagic']").val(),
      damage: parseInt(myHtml.find("select[name='damage']").val()),

    };
    // myActor.update({ "system.prefs.lastweaponusedid": editedData.selectedinventory, "system.prefs.improviseddamage": editedData.damage.toString() });
    // console.log("myinventory = ", myinventory);
    return editedData;
  }
}






/* -------------------------------------------- */
/*  Dialogue de choix d'opposant                */
/* -------------------------------------------- */
async function _whichTarget (myActor, template, myTitle, myDialogOptions, domainLibel) {
  // Render modal dialog
  const myActorID = myActor;
  template = template || 'systems/devastra/templates/form/target-prompt.html';
  const title = myTitle;
  const dialogOptions = myDialogOptions;
  const myDomain = domainLibel;

  // On récupère tous les opposants potentiels (ceux ciblés)
  let myItemTarget = {};
  function myObject(id, label)
  {
    this.id = id;
    this.label = label;
  };
  myItemTarget["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  console.log('game.user.targets = ', game.user.targets);
  console.log('game.user.targets.size = ', game.user.targets.size);
  if (game.user.targets.size != 0) {
    for (let targetedtoken of game.user.targets) {
      myItemTarget[targetedtoken.id.toString()] = new myObject(targetedtoken.id.toString(), targetedtoken.name.toString());
    };
  };

  var dialogData = {
    domaine: myDomain,
    systemData: myActorID.system,
    you: myActor.name,
    youimg: myActor.img,
    targetchoices: myItemTarget,
    selectedtarget: "0",
    tokenimg: ""
  };
  const html = await renderTemplate(template, dialogData);

  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
    // new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActor, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve(null)
          }
        },
        default: 'validateBtn',
        close: () => resolve(null)
      },
      dialogOptions
    ).render(true, {
      width: 530,
      height: "auto"
    });
  });

  if (prompt == null) {
    return prompt
  } else {
  return dialogData;
  }

  ////////////////////////////////////////////////
  async function _computeResult(myActor, myHtml) {
    // console.log("I'm in _computeResult(myActor, myHtml)");
    const editedData = {
      you: "",
      youimg: "",
      targetchoices: {},
      selectedtarget: myHtml.find("select[name='target']").val(),
      tokenimg: ""
    };
    return editedData;
  }
}

/* -------------------------------------------- */
/*  Dialogue de lancer de dés                   */
/* -------------------------------------------- */
async function _skillDiceRollDialog(
  myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
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
    initthrow: myInitThrow,
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
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
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

/* -------------------------------------------- */
/*  Dialogue débridé de lancer de dés           */
/* -------------------------------------------- */
async function _skillDiceRollDialogDeblocked (
  myActor, template, myTitle, myDialogOptions, domainLibel, pureDomOrSpeLibel, myInitThrow
  ) {

  // Render modal dialog
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-debride.html';
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
    initthrow: myInitThrow,
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
      height: "auto"
    });
  });

  if (prompt == null) {
    dialogData = null;
  };

  return dialogData;

  //////////////////////////////////////////////////////////////
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

/* -------------------------------------------- */
/*  Dialogue de choix de type d'armure          */
/* -------------------------------------------- */

async function _whichTypeOfDefence (myActor, template, myTitle, myDialogOptions, domainLibel) {
  // Render modal dialog
  const myActorID = myActor;
  template = template || 'systems/devastra/templates/form/type-defence-prompt.html';
  const title = myTitle;
  let dialogOptions = myDialogOptions;
  const myDomain = domainLibel;

  let myItemArmor = {};
  let myItemArmorDevastra = {};

  function myObject(id, label)
  {
    this.id = id;
    this.label = label;
  };


  myItemArmor["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  for (let item of myActor.items.filter(item => item.type === 'item')) {
    if (item.system.subtype == "armor") {
      myItemArmor[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.protection.toString()+"]");
    };
  };

  myItemArmorDevastra["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
  for (let item of myActor.items.filter(item => item.type === 'devastra')) {
    if (item.system.protection != 0) {
      myItemArmorDevastra[item.id.toString()] = new myObject(item.id.toString(), item.name.toString()+" ["+item.system.protection.toString()+"]");
    };
  };


  var dialogData = {
    domaine: myDomain,
    systemData: myActorID.system,
    // selectedinventory: myActor.system.prefs.lastweaponusedid,
    // damage: myActor.system.prefs.improviseddamage,
    armorchoices: myItemArmor,
    armorshieldchoices: myItemArmor,
    armordevastrachoices: myItemArmorDevastra,
    // selectedarmor: myActor.system.prefs.lastarmorusedid,

  };

  // dialogData = null;

  // console.log(dialogData);
  const html = await renderTemplate(template, dialogData);

  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
    // new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActor, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve(null)
          }
        },
        default: 'validateBtn',
        close: () => resolve(null)
      },
      dialogOptions
    ).render(true, {
      width: 630,
      height: "auto"
    });
  });

  if (prompt == null) {
    return prompt
  } else {
  return dialogData;
  }

  async function _computeResult(myActor, myHtml) {
    // console.log("I'm in _computeResult(myActor, myHtml)");
    const editedData = {
      selectedarmor: myHtml.find("select[class='armor']").val(),
      selectedarmorshield: myHtml.find("select[class='shield']").val(),
      selectedarmordevastra: myHtml.find("class[name='armordevastra']").val(),
      // selectedarmordevastra: myHtml.find("select[name='armordevastra']").val(),

    };
    // myActor.update({ "system.prefs.lastweaponusedid": editedData.selectedinventory, "system.prefs.improviseddamage": editedData.damage.toString() });
    // console.log("myinventory = ", myinventory);
    return editedData;
  }
}

/* -------------------------------------------- */
/*  Dialogue générique d'alerte                 */
/* -------------------------------------------- */

async function _alertMessage (myActor, template, myTitle, myDialogOptions, myMessage) {
  // Render modal dialog
  const myActorID = myActor;
  const myNbrDeDomaine = myActorID.system.domains.din.value;
  const myNbrDeBonusDomaine = myActorID.system.domains.din.bonusdice;

  template = template || 'systems/devastra/templates/form/type-alert-prompt.html';
  const title = myTitle;
  let dialogOptions = myDialogOptions;

  var dialogData = {
    nbrdedomaine: myNbrDeDomaine,
    nbrdebonusdomain: myNbrDeBonusDomaine,
    messg: myMessage

  };

  const html = await renderTemplate(template, dialogData);

  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
    // new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve(true)
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve(null)
          }
        },
        default: 'cancelBtn',
        close: () => resolve(null)
      },
      dialogOptions
    ).render(true, {
      width: 350,
      height: "auto"
    });
  });

  if (prompt == null) {
    return prompt
  } else {
  return true;
  }

}

/* -------------------------------------------- */
/*  Dialogue d'alerte Inititiative              */
/* -------------------------------------------- */
/*
async function _alertInitiativeMessage (myActor, template, myTitle, myDialogOptions, myMessage) {
  // Render modal dialog
  const myActorID = myActor;
  template = template || 'systems/devastra/templates/form/type-alert-initiative-prompt.html';
  const title = myTitle;
  let dialogOptions = myDialogOptions;

  var dialogData = {
    systemData: myActorID.system,
    messg: myMessage
  };

  const html = await renderTemplate(template, dialogData);

  // Create the Dialog window
  let prompt = await new Promise((resolve) => {
    new ModifiedDialog(
    // new Dialog(
      {
        title: title,
        content: html,
        buttons: {
          validateBtn: {
            icon: `<div class="tooltip"><i class="fas fa-check"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Validate')}</span></div>`,
            callback: (html) => resolve( dialogData = _computeResult(myActor, html) )
          },
          cancelBtn: {
            icon: `<div class="tooltip"><i class="fas fa-cancel"></i>&nbsp;<span class="tooltiptextleft">${game.i18n.localize('DEVASTRA.Cancel')}</span></div>`,
            callback: (html) => resolve(null)
          }
        },
        default: 'cancelBtn',
        close: () => resolve(null)
      },
      dialogOptions
    ).render(true, {
      width: 350,
      height: "auto"
    });
  });

  if (prompt == null) {
    return prompt
  } else {
  return dialogData;
  }

  async function _computeResult(myActor, myHtml) {
    // console.log("I'm in _computeResult(myActor, myHtml)");
    const editedData = {
      initiativeSpecial: myHtml.find("select[name='initspecial']").val(),

    };
    return editedData;
  }


} */
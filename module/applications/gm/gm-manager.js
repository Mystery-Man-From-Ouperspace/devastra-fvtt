import { DEVASTRA } from "../../config.js";

export class GMManager extends Application {
  static GM_MANAGER = "gm-manager";
  static GM_MANAGER_TEMPLATE = "systems/devastra/templates/app/gm-manager.hbs";

  constructor() {
    super({ id: GMManager.GM_MANAGER });  
    Hooks.on("updateSetting", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    // Hooks.on("updateActor", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    // Hooks.on("renderPlayerList", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    Hooks.once("ready", () => this.onReady());
  }


  async updateManager(setting, update, options, id) {
    game.devastra.gmManager.render(false);
  }



  onReady() {
    if (game.user.isGM) {
      game.devastra.gmManager.render(true);
    }
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: GMManager.GM_MANAGER_TEMPLATE,
      classes: ["devastra", "gm-manager"],
      title: game.i18n.localize("DEVASTRA.GMMANAGER.Title"),
      top: 50,
      left: 120,
      width: 315,
      height: "auto",
      resizable: false,
    });
    
  };

  /** @inheritdoc */
  async getData() {
    const context = await super.getData();

    context.viseur0 = await game.settings.get("devastra", "viseur0");
    context.viseur1 = await game.settings.get("devastra", "viseur1");
    context.viseur2 = await game.settings.get("devastra", "viseur2");
    context.viseur3 = await game.settings.get("devastra", "viseur3");
    context.viseur4 = await game.settings.get("devastra", "viseur4");
    context.viseur5 = await game.settings.get("devastra", "viseur5");
    context.viseur6 = await game.settings.get("devastra", "viseur6");
    context.viseur7 = await game.settings.get("devastra", "viseur7");

    context.playersEditItems = true;
    // context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = await game.settings.get("devastra", "sonorizedMandalaInterface");

    context.isGM = game.user.isGM;
    // context.isGM = false; // Pour tester la fonction

    context.DEVASTRA = DEVASTRA;
    return context;

    // console.log("game.actors", game.actors);

  }


  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".clickonmandala").click(this._onClickMandalaCheck.bind(this));

  } 

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
      case "0":
        if (game.settings.get("devastra", "viseur0")) {
        } else {
          game.settings.set("devastra", "viseur0", true);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
      break;

      case "1":
        if (game.settings.get("devastra", "viseur1")) {
        } else {
          game.settings.set("devastra", "viseur1", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
      break;
      case "2":
        if (game.settings.get("devastra", "viseur2")) {
        } else {
          game.settings.set("devastra", "viseur2", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      case "3":
        if (game.settings.get("devastra", "viseur3")) {
        } else {
          game.settings.set("devastra", "viseur3", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      case "4":
        if (game.settings.get("devastra", "viseur4")) {
        } else {
          game.settings.set("devastra", "viseur4", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      case "5":
        if (game.settings.get("devastra", "viseur5")) {
        } else {
          game.settings.set("devastra", "viseur5", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur6", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      case "6":
        if (game.settings.get("devastra", "viseur6")) {
        } else {
          game.settings.set("devastra", "viseur6", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur7", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      case "7":
        if (game.settings.get("devastra", "viseur7")) {
        } else {
          game.settings.set("devastra", "viseur7", true);
          game.settings.set("devastra", "viseur0", false);
          game.settings.set("devastra", "viseur1", false);
          game.settings.set("devastra", "viseur2", false);
          game.settings.set("devastra", "viseur3", false);
          game.settings.set("devastra", "viseur4", false);
          game.settings.set("devastra", "viseur5", false);
          game.settings.set("devastra", "viseur6", false);
          game.socket.emit('system.devastra', 'viseurupdate');
        }
        break;
      default:
        // console.log("C'est bizarre !");
    };

    // let myGame = game;
    // let myCanvas = game.canvas;
    // console.log("myGame = ", myGame);
    // console.log("myCanvas = ", myCanvas);
    let myCombatArray = game.data.combats;
    let myCombatantArray;
    let myCombatant;
    let myCombatantId;
    let myCombatantTokenId;
    let myCombatantActorId;
    let thisActor;
    let thisTokens;
    let thisCombat;

    let myToken;
    let theActor;

    for (let theCombat in myCombatArray) {
      myCombatantArray = await myCombatArray[theCombat].combatants;

      for (let theCombatant in myCombatantArray) {
        myCombatant = await myCombatantArray[theCombatant];
        // console.log("myCombatant = ", myCombatant);
        myCombatantId = myCombatant._id;
        myCombatantTokenId = myCombatant.tokenId;
        myCombatantActorId = myCombatant.actorId;

        // console.log("foundry.documents.BaseToken = ", foundry.documents.BaseToken);

        thisCombat = await myCombatArray[theCombat];
        thisActor = await game.actors.get(myCombatantActorId);
        thisTokens = thisActor.getActiveTokens(false, false);

        for (let theToken in thisTokens) {
          myToken = thisTokens[theToken];

          // console.log("thisActor = ", thisActor);
          // console.log("thisActor.name = ", thisActor.name);


          theActor = myToken.actor;

          
          if (theActor.type === "character") {
            // console.log('Je passe bien ici !');
            switch (mandalaNumber) {
              case "0":
                await theActor.rollInitiative({
                  createCombatants: false,
                  rerollInitiative: true,
                  initiativeOptions: {formula: "0"}});
            break;
              case "1":
                if (await theActor.system.mandala.un.nbrjetonbonus) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "1"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "2":
                if (await theActor.system.mandala.deux.nbrjetonbonus) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "2"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
              break;
              case "3":
                if (await theActor.system.mandala.trois.nbrjetonbonus) {
                  // console.log("thisActor.system.mandala.trois.nbrjetonbonus = ", await thisActor.system.mandala.trois.nbrjetonbonus)
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "3"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "4":
                if (await thisActor.system.mandala.quatre.nbrjetonbonus) {
                  await thisActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "4"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "5":
                if (await theActor.system.mandala.cinq.nbrjetonbonus) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "5"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "6":
                if (await theActor.system.mandala.six.nbrjetonbonus) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "6"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "7":
                if (await theActor.system.mandala.sept.nbrjetonbonus) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "7"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              default:
                // console.log("C'est bizarre !");
            }

          }

          if (theActor.type === "npc" || theActor.type === "monster") {
            // console.log('Et là aussi !');
            switch (mandalaNumber) {
              case "0":
                await theActor.rollInitiative({
                  createCombatants: false,
                  rerollInitiative: true,
                  initiativeOptions: {formula: "0"}});
            break;
              case "1":
                if (await theActor.system.mandala.un.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "1"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "2":
                if (await theActor.system.mandala.deux.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "2"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
              break;
              case "3":
                if (await theActor.system.mandala.trois.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "3"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "4":
                if (await theActor.system.mandala.quatre.selected != false) {
                  // console.log("thisActor.system.mandala.quatre.selected = ", thisActor.system.mandala.quatre.selected)
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "4"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "5":
                if (await theActor.system.mandala.cinq.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "5"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "6":
                if (await theActor.system.mandala.six.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "6"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              case "7":
                if (await theActor.system.mandala.sept.selected != false) {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "7"}});
                } else {
                  await theActor.rollInitiative({
                    createCombatants: false,
                    rerollInitiative: true,
                    initiativeOptions: {formula: "0"}});
                  };
                break;
              default:
                // console.log("C'est bizarre !");
            }
          }

        }
      }
    }
  }

}
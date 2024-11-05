import { DEVASTRAActorSheet } from "./actor-sheet.js";
import { DEVASTRA } from "../config.js";
/**
 * @extends {DEVASTRAActorSheet}
 */
export class DEVASTRACmdMandalaSheet extends DEVASTRAActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet", "actor", "cmdmandala"],
      template: "systems/devastra/templates/actor/cmd-mandala-sheet.html",
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".description", ".statistiques", ".magiesenseignementsnotes"],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }



  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData(options) {
    const context = await super.getData(options);

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

    context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = await game.settings.get("devastra", "sonorizedMandalaInterface");

    context.isGM = game.user.isGM;
    // context.isGM = false; // Pour tester la fonction

    context.DEVASTRA = DEVASTRA;
    return context;
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
      case "1":
        if (myActor.system.mandala.un.selected) {
        } else {
          myActor.update({ "system.mandala.un.selected": true });
          game.settings.set("devastra", "viseur1", true);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);

        }
      break;
      case "2":
        if (myActor.system.mandala.deux.selected) {
        } else {
          myActor.update({ "system.mandala.deux.selected": true });
          game.settings.set("devastra", "viseur2", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);

        }
        break;
      case "3":
        if (myActor.system.mandala.trois.selected) {
        } else {
          myActor.update({ "system.mandala.trois.selected": true });
          game.settings.set("devastra", "viseur3", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);
        }
        break;
      case "4":
        if (myActor.system.mandala.quatre.selected) {
        } else {
          myActor.update({ "system.mandala.quatre.selected": true });
          game.settings.set("devastra", "viseur4", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);
        }
        break;
      case "5":
        if (myActor.system.mandala.cinq.selected) {
        } else {
          myActor.update({ "system.mandala.cinq.selected": true });
          game.settings.set("devastra", "viseur5", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);

        }
        break;
      case "6":
        if (myActor.system.mandala.six.selected) {
        } else {
          myActor.update({ "system.mandala.six.selected": true });
          game.settings.set("devastra", "viseur6", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.sept.selected": false });
          game.settings.set("devastra", "viseur7", false);

        }
        break;
      case "7":
        if (myActor.system.mandala.sept.selected) {
        } else {
          myActor.update({ "system.mandala.sept.selected": true });
          game.settings.set("devastra", "viseur7", true);
          myActor.update({ "system.mandala.un.selected": false });
          game.settings.set("devastra", "viseur1", false);
          myActor.update({ "system.mandala.deux.selected": false });
          game.settings.set("devastra", "viseur2", false);
          myActor.update({ "system.mandala.trois.selected": false });
          game.settings.set("devastra", "viseur3", false);
          myActor.update({ "system.mandala.quatre.selected": false });
          game.settings.set("devastra", "viseur4", false);
          myActor.update({ "system.mandala.cinq.selected": false });
          game.settings.set("devastra", "viseur5", false);
          myActor.update({ "system.mandala.six.selected": false });
          game.settings.set("devastra", "viseur6", false);
        }
        break;
      default:
        console.log("C'est bizarre !");
    };

  }

}
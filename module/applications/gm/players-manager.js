import { DEVASTRA } from "../../config.js";

import { registerHandlebarsHelpers } from "../../helpers.js";


export class PlayersManager extends Application {
  static PLAYERS_MANAGER = "players-manager";
  static PLAYERS_MANAGER_TEMPLATE = "systems/devastra/templates/app/players-manager.hbs";

  constructor() {
    super({ id: PlayersManager.playersManager_MANAGER });  
    Hooks.on("updateSetting", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    Hooks.on("updateActor", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    Hooks.on("renderPlayerList", async (setting, update, options, id) => this.updateManager(setting, update, options, id));
    Hooks.once("ready", () => this.onReady());
  }


  async updateManager(setting, update, options, id) {
    game.devastra.playersManager.render(false);
  }



  onReady() {
    if (game.user.isGM) {
      game.devastra.playersManager.render(true);
    }
  }

  static get defaultOptions() {

    return foundry.utils.mergeObject(super.defaultOptions, {
      template: PlayersManager.PLAYERS_MANAGER_TEMPLATE,
      classes: ["devastra", "players-manager"],
      title: game.i18n.localize("DEVASTRA.PLAYERSMANAGER.Title"),
      top: 50,
      left: 450,
      width: 740,
      height: 195,
      resizable: false,
    });
    
  };

  /** @inheritdoc */
  async getData() {
    const context = await super.getData();

/*
    let myuserId = html.find("select[class='users']").val();
    let myActor = game.user[myuserId].character;
    context.mandala1 = await myActor.system.mandala.un.nbrjetonbonus;
    context.mandala1type = await myActor.system.mandala.un.typejetonbonus;
    context.mandala2 = await myActor.system.mandala.deux.nbrjetonbonus;
    context.mandala2type = await myActor.system.mandala.deux.typejetonbonus;
    context.mandala3 = await myActor.system.mandala.trois.nbrjetonbonus;
    context.mandala3type = await myActor.system.mandala.trois.typejetonbonus;
    context.mandala4 = await myActor.system.mandala.quatre.nbrjetonbonus;
    context.mandala4type = await myActor.system.mandala.quatre.typejetonbonus;
    context.mandala5 = await myActor.system.mandala.cinq.nbrjetonbonus;
    context.mandala5type = await myActor.system.mandala.cinq.typejetonbonus;
    context.mandala6 = await myActor.system.mandala.six.nbrjetonbonus;
    context.mandala6type = await myActor.system.mandala.six.typejetonbonus;
    context.mandala7 = await myActor.system.mandala.sept.nbrjetonbonus;
    context.mandala7type = await myActor.system.mandala.sept.typejetonbonus;

*/
    context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = await game.settings.get("devastra", "sonorizedMandalaInterface");

    context.isGM = game.user.isGM;
    // context.isGM = false; // Pour tester la fonction

    let myUsers = {};
    function myObject(id, label)
    {
      this.id = id;
      this.label = label;
    };
  
    myUsers["0"] = new myObject("0", game.i18n.localize("DEVASTRA.opt.none"));
    for (let user of game.users._source) {
      if (user.role != 4) {
        myUsers[user._id.toString()] = new myObject(user._id.toString(), user.name.toString());
      };
    };

    context.users =
    { choices: myUsers,
      options: "0"
    };

    context.DEVASTRA = DEVASTRA;
    return context;
  }



  /** @inheritdoc */
  /*
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".menu").update(this._onUpdateUser.bind(this));
  }

 */
   /**
   * Listen for click concentration.
   * @param {MouseEvent} event    The originating left click event
  */
 /*
  async _onUpdateUser (event) {
    let myuserId = event.find("select[class='users']").val();
    let myActor = game.user[myuserId].character;
    context.mandala1 = await myActor.system.mandala.un.nbrjetonbonus;
    context.mandala1type = await myActor.system.mandala.un.typejetonbonus;
    context.mandala2 = await myActor.system.mandala.deux.nbrjetonbonus;
    context.mandala2type = await myActor.system.mandala.deux.typejetonbonus;
    context.mandala3 = await myActor.system.mandala.trois.nbrjetonbonus;
    context.mandala3type = await myActor.system.mandala.trois.typejetonbonus;
    context.mandala4 = await myActor.system.mandala.quatre.nbrjetonbonus;
    context.mandala4type = await myActor.system.mandala.quatre.typejetonbonus;
    context.mandala5 = await myActor.system.mandala.cinq.nbrjetonbonus;
    context.mandala5type = await myActor.system.mandala.cinq.typejetonbonus;
    context.mandala6 = await myActor.system.mandala.six.nbrjetonbonus;
    context.mandala6type = await myActor.system.mandala.six.typejetonbonus;
    context.mandala7 = await myActor.system.mandala.sept.nbrjetonbonus;
    context.mandala7type = await myActor.system.mandala.sept.typejetonbonus;
  }
    */

}
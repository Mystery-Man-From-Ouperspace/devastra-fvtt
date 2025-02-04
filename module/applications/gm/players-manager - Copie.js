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

    context.myUser = await game.settings.get("devastra", "myUser");

    context.mandala1 = (await game.settings.get("devastra", "mandala1")).toString();
    context.mandala2 = (await game.settings.get("devastra", "mandala2")).toString();
    context.mandala3 = (await game.settings.get("devastra", "mandala3")).toString();
    context.mandala4 = (await game.settings.get("devastra", "mandala4")).toString();
    context.mandala5 = (await game.settings.get("devastra", "mandala5")).toString();
    context.mandala6 = (await game.settings.get("devastra", "mandala6")).toString();
    context.mandala7 = (await game.settings.get("devastra", "mandala7")).toString();

    context.mandala1type = (await game.settings.get("devastra", "mandala1type")).toString();
    context.mandala2type = (await game.settings.get("devastra", "mandala2type")).toString();
    context.mandala3type = (await game.settings.get("devastra", "mandala3type")).toString();
    context.mandala4type = (await game.settings.get("devastra", "mandala4type")).toString();
    context.mandala5type = (await game.settings.get("devastra", "mandala5type")).toString();
    context.mandala6type = (await game.settings.get("devastra", "mandala6type")).toString();
    context.mandala7type = (await game.settings.get("devastra", "mandala7type")).toString();


    context.playersEditItems = true;
    // context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
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
      options: context.myUser
    };

    context.DEVASTRA = DEVASTRA;
    return context;
  }



  /** @inheritdoc */
  
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".menu").change(this._onUpdateUser.bind(this));
  }


   /**
   * Listen for click concentration.
   * @param {MouseEvent} event    The originating left click event
  */
  async _onUpdateUser (event) {
    // console.log("event", event)
    let myUserId = event.currentTarget.value;
    let myActorId;
    for (let user of game.users._source) {
      if (user._id == myUserId) {
        myActorId = user.character;
      }
    }
    // console.log("myActorId", myActorId);
    let myActor = game.actors.get(myActorId);
    // console.log("myActor", myActor);

    if (myActor) {

      await game.settings.set("devastra", "myUser", myUserId);

      await game.settings.set("devastra", "mandala1", (myActor.system.mandala.un.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala2", (myActor.system.mandala.deux.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala3", (myActor.system.mandala.trois.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala4", (myActor.system.mandala.quatre.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala5", (myActor.system.mandala.cinq.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala6", (myActor.system.mandala.six.nbrjetonbonus).toString());
      await game.settings.set("devastra", "mandala7", (myActor.system.mandala.sept.nbrjetonbonus).toString());
      if (await myActor.system.mandala.un.typejetonbonus) {
        await game.settings.set("devastra", "mandala1type", (myActor.system.mandala.un.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.deux.typejetonbonus) {
        await game.settings.set("devastra", "mandala2type", (myActor.system.mandala.deux.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.trois.typejetonbonus) {
        await game.settings.set("devastra", "mandala3type", (myActor.system.mandala.trois.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.quatre.typejetonbonus) {
        await game.settings.set("devastra", "mandala4type", (myActor.system.mandala.quatre.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.cinq.typejetonbonus) {
        await game.settings.set("devastra", "mandala5type", (myActor.system.mandala.cinq.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.six.typejetonbonus) {
        await game.settings.set("devastra", "mandala6type", (myActor.system.mandala.six.typejetonbonus).toString());
      }
      if (await myActor.system.mandala.sept.typejetonbonus) {
        await game.settings.set("devastra", "mandala7type", (myActor.system.mandala.sept.typejetonbonus).toString());
      }

    } else
    {
      game.settings.set("devastra", "mandala1", "0");
      game.settings.set("devastra", "mandala2", "0");
      game.settings.set("devastra", "mandala3", "0");
      game.settings.set("devastra", "mandala4", "0");
      game.settings.set("devastra", "mandala5", "0");
      game.settings.set("devastra", "mandala6", "0");
      game.settings.set("devastra", "mandala7", "0");
      game.settings.set("devastra", "mandala1type", "0");
      game.settings.set("devastra", "mandala2type", "0");
      game.settings.set("devastra", "mandala3type", "0");
      game.settings.set("devastra", "mandala4type", "0");
      game.settings.set("devastra", "mandala5type", "0");
      game.settings.set("devastra", "mandala6type", "0");
      game.settings.set("devastra", "mandala7type", "0");
    }

  }

}

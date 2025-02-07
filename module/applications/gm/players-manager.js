import { DEVASTRA } from "../../config.js"

import { registerHandlebarsHelpers } from "../../helpers.js"

export class PlayersManager extends Application {
  static PLAYERS_MANAGER = "players-manager"
  static PLAYERS_MANAGER_TEMPLATE = "systems/devastra/templates/app/players-manager.hbs"

  constructor(options) {
    super(options)
    this.userId = null
    this.characterId = null

    Hooks.on("updateSetting", async (setting, update, options, id) => this.updateManager(setting, update, options, id))
    Hooks.on("updateActor", async (setting, update, options, id) => this.updateManager(setting, update, options, id))
    Hooks.on("renderPlayerList", async (setting, update, options, id) => this.updateManager(setting, update, options, id))
    Hooks.on("updateUser", async (user, update, options, id) => {this._onUpdateUser(user.id, update.character)})
    Hooks.once("ready", () => this.onReady())
  }

  async updateManager(setting, update, options, id) {
    game.devastra.playersManager.render(false)
  }

  onReady() {
    if (game.user.isGM) {
      game.devastra.playersManager.render(true)
    }
  }

  async _onUpdateUser(userId, characterId) {
    this.userId = userId
    this.characterId = characterId
    game.devastra.playersManager.render(false)
  }

  static get defaultOptions() {
    
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: PlayersManager.PLAYERS_MANAGER_TEMPLATE,
      classes: ["devastra", "players-manager"],
      title: game.i18n.localize("DEVASTRA.PLAYERSMANAGER.Title"),
      top: window.innerHeight -220,
      left: window.innerWidth -1055,
      width: 750,
      height: 220,
      resizable: false,
    })
  }

  /** @inheritdoc */
  async getData() {
    const context = {}

    context.playersEditItems = true;
    // context.playersEditItems = await game.settings.get("devastra", "playersEditItems");
    context.sonorizedMandalaInterface = await game.settings.get("devastra", "sonorizedMandalaInterface")

    context.isGM = game.user.isGM

    const players = game.users.filter((user) => user.hasPlayerOwner && user.active)
    context.userChoices = players.map((user) => ({ key: user._id, label: user.name }))
    context.selectedUser = this.userId
    
    const character = game.actors.get(this.characterId)
    if (character) {
      const mandala = character.system.mandala
      context.mandala1 = mandala.un.nbrjetonbonus
      context.mandala1type = mandala.un.typejetonbonus
      context.mandala2 = mandala.deux.nbrjetonbonus
      context.mandala2type = mandala.deux.typejetonbonus
      context.mandala3 = mandala.trois.nbrjetonbonus
      context.mandala3type = mandala.trois.typejetonbonus
      context.mandala4 = mandala.quatre.nbrjetonbonus
      context.mandala4type = mandala.quatre.typejetonbonus
      context.mandala5 = mandala.cinq.nbrjetonbonus
      context.mandala5type = mandala.cinq.typejetonbonus
      context.mandala6 = mandala.six.nbrjetonbonus
      context.mandala6type = mandala.six.typejetonbonus
      context.mandala7 = mandala.sept.nbrjetonbonus
      context.mandala7type = mandala.sept.typejetonbonus
    }

    context.DEVASTRA = DEVASTRA
    return context
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html)
    html.find("select[name='users']").change(this._onChangeUser.bind(this))
  }

  /**
   * Listen for click concentration.
   * @param {MouseEvent} event    The originating left click event
   */

  async _onChangeUser(event) {
    event.preventDefault()
    let myuserId = event.currentTarget.value

    // Cas vide
    if (myuserId === "") {
      this.userId = null
      this.characterId = null
    } else {
      this.userId = myuserId
      let myActor = game.users.get(myuserId).character
      this.characterId = myActor._id
    }
    game.devastra.playersManager.render(false)
  }
}

import { DEVASTRAActor } from "./actor/actor.js";
import { DEVASTRAItem } from "./item/item.js";

import { DEVASTRACharacterSheet } from "./actor/character-sheet.js";
import { DEVASTRAPNJSheet } from "./actor/npc-sheet.js";
import { DEVASTRAMonsterSheet } from "./actor/monster-sheet.js";

import { DEVASTRAItemSheet } from "./item/item-sheet.js";
import { DEVASTRAEnseignementSheet } from "./item/enseignement-sheet.js";
import { DEVASTRADevastraSheet } from "./item/devastra-sheet.js";
import { DEVASTRAPouvoirSheet } from "./item/pouvoir-sheet.js";
import { DEVASTRAMagieSheet } from "./item/magie-sheet.js";
import { DEVASTRADharmaSheet } from "./item/dharma-sheet.js";
import { DEVASTRAKarmaSheet } from "./item/karma-sheet.js";
import { DEVASTRANoteSheet } from "./item/note-sheet.js";
import { DEVASTRABlessureOuStatutSheet } from "./item/blessureoustatut-sheet.js";

import { DEVASTRA } from "./config.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { registerHandlebarsHelpers } from "./helpers.js";


import { GMManager } from "./applications/gm/gm-manager.js";
import { PlayersManager } from "./applications/gm/players-manager.js";
import { Macros } from "./macros.js";
import { initControlButtons } from "./control-buttons.js";

globalThis.SYSTEM = DEVASTRA;

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function () {
  console.log(`DEVASTRA System | Initializing`);

  game.system.CONST = SYSTEM;
  
  game.devastra = {
    config: DEVASTRA,
    macros: Macros,
  };

  // Define socket
  /*
  game.socket.on("system.devastra", (data) => {
    DevastraUtils.performSocketMesssage(data);
  });
  */

  // CONFIG.DEVASTRA = DEVASTRA;

  /*
  // Define custom Entity classes
  CONFIG.Actor.documentClass = documents.CtHackActor;
  CONFIG.Actor.dataModels = {
    character: models.CtHackCharacter,
    opponent: models.CtHackOpponent
  }

  CONFIG.Item.documentClass = documents.CtHackItem;
  CONFIG.Item.dataModels = {
    ability: models.CtHackAbility,
    archetype: models.CtHackArchetype,
    attack: models.CtHackAttack,
    definition: models.CtHackDefinition,
    item: models.CtHackItem,
    magic: models.CtHackMagic,
    weapon: models.CtHackWeapon,
    opponentAbility: models.CtHackOpponentAbility
  };
  */

  // Game Settings
  function delayedReload() {window.setTimeout(() => location.reload(), 500)}
/*
  game.settings.register("devastra", "autoWoundsNPC", {
    name: game.i18n.localize("DEVASTRA.Tenir automatiquement le décompte des blessures"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option auto"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: delayedReload
  });

  */


  game.settings.register("devastra", "viseur0", {
    name: game.i18n.localize("DEVASTRA.Mandala 0 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 0"),
    scope: "world",
    config: false,
    default: true,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur1", {
    name: game.i18n.localize("DEVASTRA.Mandala 1 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 1"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur2", {
    name: game.i18n.localize("DEVASTRA.Mandala 2 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 2"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur3", {
    name: game.i18n.localize("DEVASTRA.Mandala 3 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 3"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur4", {
    name: game.i18n.localize("DEVASTRA.Mandala 4 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 4"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur5", {
    name: game.i18n.localize("DEVASTRA.Mandala 5 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 5"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur6", {
    name: game.i18n.localize("DEVASTRA.Mandala 6 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 6"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register("devastra", "viseur7", {
    name: game.i18n.localize("DEVASTRA.Mandala 7 sélectionné"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option activera le rang d'action 7"),
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
  });



  game.settings.register("devastra", "sonorizedMandalaInterface", {
    name: game.i18n.localize("DEVASTRA.Sonoriser l'interface du Mandala"),
    hint: game.i18n.localize("DEVASTRA.Décocher cette option rendra l'interface silencieuse"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: delayedReload
  });
  


  game.settings.register("devastra", "playersEditItems", {
    name: game.i18n.localize("DEVASTRA.Autoriser les joueuses à modifer les items"),
    hint: game.i18n.localize("DEVASTRA.Cocher cette option autorisera les joueuses"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: delayedReload
  });


   /**
	 * Set an initiative formula for the system
	 * @type {String}
	 */
  /*
	CONFIG.Combat.initiative = {
        formula: "@initiative",
        decimals: 0
      };
*/
  
  // Define custom Document classes
  CONFIG.Actor.documentClass = DEVASTRAActor;
  CONFIG.Item.documentClass = DEVASTRAItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("devastra", DEVASTRACharacterSheet, { types: ["character"], makeDefault: true }); // ligne modifiée selon directives de LeRatierBretonnien
  Actors.registerSheet("devastra", DEVASTRAPNJSheet, { types: ["npc"], makeDefault: true });
  Actors.registerSheet("devastra", DEVASTRAMonsterSheet, { types: ["monster"], makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("devastra", DEVASTRAItemSheet, { types: ["item"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAEnseignementSheet, { types: ["enseignement"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRADevastraSheet, { types: ["devastra"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAPouvoirSheet, { types: ["pouvoir"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAMagieSheet, { types: ["magie"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRADharmaSheet, { types: ["dharma"], makeDefault: true });
  Items.registerSheet("devastra", DEVASTRAKarmaSheet, { types: ["karma"], makeDefault: true });
  Items.registerSheet("note", DEVASTRANoteSheet, { types: ["note"], makeDefault: true });
  Items.registerSheet("blessureoustatut", DEVASTRABlessureOuStatutSheet, { types: ["blessureoustatut"], makeDefault: true });








  // Init new buttons for the system
  initControlButtons();
  






  // Preload template partials
  await preloadHandlebarsTemplates();

  // Register Handlebars Helpers
  registerHandlebarsHelpers();

  // Modify Runtime configuration settings / Added by MMFO  Items.registerSheet("devastra", DEVASTRAMagieSheet, { types: ["attribute"], makeDefault: true });

  await modifyConfigurationSettings();

  
  // Game Manager
  game.devastra.gmManager = new GMManager();

  game.devastra.playersManager = new PlayersManager();


  console.log(`DEVASTRA System | Initialized`);
});


async function modifyConfigurationSettings() {
  /**
   * Runtime configuration settings for Foundry VTT which exposes a large number of variables which determine how
   * aspects of the software behaves.
   *
   * Unlike the CONST analog which is frozen and immutable, the CONFIG object may be updated during the course of a
   * session or modified by system and module developers to adjust how the application behaves.
   *
   **/

  /**
   * Configuration for the Actor document
   */
  CONFIG.Actor.compendiumBanner = "/systems/devastra/images/banners/actor-banner.webp";

  /**
   * Configuration for the Adventure document
   */
  CONFIG.Adventure.compendiumBanner = "/systems/devastra/images/banners/adventure-banner.webp";

  /**
   * Configuration for the Cards primary Document type
   */
  CONFIG.Cards.compendiumBanner = "ui/banners/cards-banner.webp";

  /**
   * Configuration for Item document
   */
  CONFIG.Item.compendiumBanner = "/systems/devastra/images/banners/item-banner.webp";

  /**
   * Configuration for the JournalEntry document
   */
  CONFIG.JournalEntry.compendiumBanner = "/systems/devastra/images/banners/journalentry-banner.webp";

  /**
   * Configuration for the Macro document
   */
  CONFIG.Macro.compendiumBanner = "ui/banners/macro-banner.webp";

  /**
   * Configuration for the Playlist document
   */
  CONFIG.Playlist.compendiumBanner = "ui/banners/playlist-banner.webp";

  /**
   * Configuration for RollTable random draws
   */
  CONFIG.RollTable.compendiumBanner = "ui/banners/rolltable-banner.webp";

  /**
   * Configuration for the Scene document
   */
  CONFIG.Scene.compendiumBanner = "/systems/devastra/images/banners/scene-banner.webp";
}

Hooks.once("i18nInit", function () {
  // Prélocalisation des objets de configuration
  preLocalizeConfig();
});

function preLocalizeConfig() {
  const localizeConfigObject = (obj, keys) => {
    for (let o of Object.values(obj)) {
      for (let k of keys) {
        o[k] = game.i18n.localize(o[k]);
      }
    }
  };

  localizeConfigObject(DEVASTRA.ITEMSUBTYPES, ["label"]);
  localizeConfigObject(DEVASTRA.MAGIESUBTYPES, ["label"]);
}


/* -------------------------------------------- */
/*  Chat Message Hooks                          */
/* -------------------------------------------- */
// Hooks for Blue Buttons in Chat

Hooks.on("renderChatMessage", (app, html, data,) => {

  const defencecalculateButton = html[0].querySelector("[class='smart-blue-button defence-calculate-click']");
  const woundscalculateButton = html[0].querySelector("[class='smart-blue-button wounds-calculate-click']");
  // const woundsapplyButton = html[0].querySelector("[class='smart-blue-button wounds-apply-click']");




  if (defencecalculateButton != undefined && defencecalculateButton != null) {
    defencecalculateButton.addEventListener('click', () => {

    // La joueuse ou le PNJ calcule depuis le Tchat sa défense contre une attaque
    // On vérifie d'abord que c'est la bonne joueuse ou PNJ, sinon on ne fait rien

      console.log("Pas glop ! Pas glop !")
    })
  }

/*
  if (woundsapplyButton != undefined && woundsapplyButton != null) {
    woundsapplyButton.addEventListener('click', () => {

    // La joueuse applique depuis le Tchat les blessures infiligées à son PJ par le PNJ
    // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

    console.log('Je suis dans woundsapplytoPCButton')

    const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

    const youwin = html[0].querySelector("div[class='youwin']").textContent;
    const yourplayerid = html[0].querySelector("div[class='yourplayerid']").textContent;
    const youractorid = html[0].querySelector("div[class='youractorid']").textContent;
    const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
    const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
    const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
    const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
    const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
    const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

    const myUser = game.user;
    console.log("game.user.id = ", game.user.id);
    console.log("yourplayerid = ", yourplayerid);
    if (!(game.user.id == yourplayerid)) {console.log("TADAM !") ;return;}; // Pas le bon utilisateur !

    const myActor = game.actors.get(youractorid);

    let wounds = 0;
    if (myActor != null) {
      wounds = 1 + parseInt(youropponentdamage) - parseInt(yourprotection);
      if (wounds < 0) {
        wounds = 0;
      };
      _updateActorSheetWoundsJauge (myActor, wounds);

      let typeOfThrow = parseInt(typeofthrow);

      let smartTemplate = 'systems/devastra/templates/form/dice-result-apply-wounds.html';

      let smartData = {};

      _showCalculateWoundsInChat (myActor, typeOfThrow, smartTemplate, smartData);
    };
  
    })
  }
    */


/*
  if (woundsapplytoNPCButton != undefined && woundsapplytoNPCButton != null) {
    woundsapplytoNPCButton.addEventListener('click', () => {

    // Le MJ applique depuis le Tchat les blessures infligées à son PNJ par le PJ
    // On vérifie d'abord que c'est bien le MJ, sinon on ne fait rien

    console.log('Je suis dans woundsapplytoNPCButton')

    const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

    const youwin = html[0].querySelector("div[class='youwin']").textContent;
    const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
    const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
    const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
    const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
    const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
    const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

    if (!(game.user.isGM)) {console.log("TADAM !") ;return}; // Pas le bon utilisateur !


  const myActor = game.actors.get(youropponentid);

  let wounds = 0;
  if (myActor != null) {
    wounds = 1 + parseInt(yourdamage) - parseInt(youropponentprotection);
    if (wounds < 0) {
      wounds = 0;
    };
    _updateActorSheetWoundsJauge (myActor, wounds);

    let typeOfThrow = 3; // juste pour le MJ utilisateur

    let smartTemplate = 'systems/devastra/templates/form/dice-result-apply-wounds.html'

    let smartData = {};

    _showCalculateWoundsInChat (myActor, typeOfThrow, smartTemplate, smartData);

  };

  })
  }
  */
  

  if (woundscalculateButton != undefined && woundscalculateButton != null) {
    woundscalculateButton.addEventListener('click', () => {

    // La joueuse effectue depuis le Tchat le calcul des blessures infligées
    // On vérifie d'abord que c'est la bonne joueuse, sinon on ne fait rien

    console.log('Je suis dans woundscalculateButton')

    const typeofthrow = html[0].querySelector("div[class='typeofthrow']").textContent;

    const numberofdice = html[0].querySelector("div[class='numberofdice']").textContent;
    const skill = html[0].querySelector("div[class='skill']").textContent;
    const bonus = html[0].querySelector("div[class='bonus']").textContent;
    const rolldifficulty = html[0].querySelector("div[class='rolldifficulty']").textContent;

    const youwin = html[0].querySelector("div[class='youwin']").textContent;
    const yourplayerid = html[0].querySelector("div[class='yourplayerid']").textContent;
    const youractorid = html[0].querySelector("div[class='youractorid']").textContent;
    const yourdamage = html[0].querySelector("div[class='yourdamage']").textContent;
    const yourprotection = html[0].querySelector("div[class='yourprotection']").textContent;
    const youropponent = html[0].querySelector("div[class='youropponent']").textContent;
    const youropponentid = html[0].querySelector("div[class='youropponentid']").textContent;
    const youropponentdamage = html[0].querySelector("div[class='youropponentdamage']").textContent;
    const youropponentprotection = html[0].querySelector("div[class='youropponentprotection']").textContent;

    let NPCwoundedtotal = 1+parseInt(yourdamage)-parseInt(youropponentprotection);
    if (NPCwoundedtotal < 0) {NPCwoundedtotal = 0};
    let PCwoundedtotal = 1+parseInt(youropponentdamage)-parseInt(yourprotection);
    if (PCwoundedtotal < 0) {PCwoundedtotal = 0};
    let autoWoundsNPC = game.settings.get("devastra", "autoWoundsNPC");

    console.log("autoWoundsNPC = ", autoWoundsNPC);

    const myUser = game.user;
    console.log("game.user.id = ", game.user.id);
    console.log("yourplayerid = ", yourplayerid);
    if (!(game.user.id == yourplayerid)) {console.log("TADAM !") ;return;}; // Pas le bon utilisateur !

    const myActor = game.actors.get(youractorid);
    if (myActor == null) {console.log("TADAM !") ;return;};

    const myTypeOfThrow = parseInt(typeofthrow);

    // Smart Message
    const smartTemplate = 'systems/devastra/templates/form/dice-result-wounds.html';
    const smartData = 
    {
      typeofthrow: myTypeOfThrow,

      youwin: (youwin == 'true'),
      yourplayerid: yourplayerid,
      youractorid: youractorid,
      yourdamage: yourdamage,
      yourprotection: yourprotection,
      youropponent: youropponent,
      youropponentid: youropponentid,
      youropponentdamage: youropponentdamage,
      youropponentprotection: youropponentprotection,

      NPCwoundedtotal: NPCwoundedtotal,
      PCwoundedtotal: PCwoundedtotal,
      autoWoundsNPC: autoWoundsNPC
    };

    // console.log("smartData = ", smartData);

    _showCalculateWoundsInChat (myActor, myTypeOfThrow, smartTemplate, smartData);

  })
  }



  }


)


/* -------------------------------------------- */

async function _showCalculateWoundsInChat (myActor, myTypeOfThrow, smartTemplate, smartData) {
  
  const smartHtml = await renderTemplate(smartTemplate, smartData);

  switch ( myTypeOfThrow ) {
    case 0:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'roll'                          // Public Roll
      });

    break;
    case 1:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'gmroll'                        // Private Roll
      });

    break;
    case 2:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'blindroll'                       // Blind GM Roll
      });

    break;
    case 3:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'selfroll'                        // Self Roll
      });

    break;
    default: console.log("C'est bizarre !");
  };
}

/* -------------------------------------------- */

async function _showMessagesInChat (myActor, myTypeOfThrow, r, mySmartRTemplate, mySmartRData, mySmartTemplate, mySmartData) {

  let msg = "";

  const typeOfThrow = myTypeOfThrow;

  switch ( typeOfThrow ) {
    case 0: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'roll'                      // Public Roll
      });
    break;
    case 1: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'gmroll'                    // Private Roll
      });
    break;
    case 2: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'blindroll'                 // Blind GM Roll
    });
    break;
    case 3: msg = await r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: myActor }),
      rollMode: 'selfroll'                      // Self Roll
    });
    break;
    default: console.log("C'est bizarre !");


    if (game.modules.get("dice-so-nice")?.active) {
      await game.dice3d.waitFor3DAnimationByMessageID(msg.id);
    };

  }

  // Smart Message
  const smartTemplate = mySmartTemplate;
  const smartData = mySmartData;
  const smartHtml = await renderTemplate(smartTemplate, smartData);

  switch ( typeOfThrow ) {
    case 0:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'roll'                          // Public Roll
      });

    break;
    case 1:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'gmroll'                        // Private Roll
      });

    break;
    case 2:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'blindroll'                       // Blind GM Roll
      });

    break;
    case 3:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartHtml,
        rollMode: 'selfroll'                        // Self Roll
      });

    break;
    default: console.log("C'est bizarre !");
  };

  // SmartR Message
  const smartRTemplate = mySmartRTemplate;
  const smartRData = mySmartRData;
  const smartRHtml = await renderTemplate(smartRTemplate, smartRData);
 
  switch ( typeOfThrow ) {
    case 0:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'roll'                          // Public Roll
      });

    break;
    case 1:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'gmroll'                        // Private Roll
      });

    break;
    case 2:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'blindroll'                       // Blind GM Roll
      })

    break;
    case 3:
      ChatMessage.create({
        user: game.user.id,
        // speaker: ChatMessage.getSpeaker({ token: this.actor }),
        speaker: ChatMessage.getSpeaker({ actor: myActor }),
        content: smartRHtml,
        rollMode: 'selfroll'                        // Self Roll
      });

    break;
    default: console.log("C'est bizarre !");
  };

}

/* -------------------------------------------- */

async function _updateActorSheetWoundsJauge (myActor, wounds) {

  const oldLevelBlessures = await myActor.system.blessures.lvl;

  console.log("oldLevelBlessures = ", oldLevelBlessures);

  let newLevelBlessures = oldLevelBlessures + wounds;

  if (newLevelBlessures > 8) {
    newLevelBlessures = 8;
  };

  console.log("newLevelBlessures = ", newLevelBlessures);

  if (oldLevelBlessures < 1 && newLevelBlessures >= 1) {
    myActor.update({ "system.blessures.blessure_1.check": true });
  };
  if (oldLevelBlessures < 2 && newLevelBlessures >= 2) {
    myActor.update({ "system.blessures.blessure_2.check": true });
  };
  if (oldLevelBlessures < 3 && newLevelBlessures >= 3) {
    myActor.update({ "system.blessures.blessure_3.check": true });
  };
  if (oldLevelBlessures < 4 && newLevelBlessures >= 4) {
    myActor.update({ "system.blessures.blessure_4.check": true });
  };
  if (oldLevelBlessures < 5 && newLevelBlessures >= 5) {
    myActor.update({ "system.blessures.blessure_5.check": true });
  };
  if (oldLevelBlessures < 6 && newLevelBlessures >= 6) {
    myActor.update({ "system.blessures.blessure_6.check": true });
  };
  if (oldLevelBlessures < 7 && newLevelBlessures >= 7) {
    myActor.update({ "system.blessures.blessure_7.check": true });
  };
  if (oldLevelBlessures < 8 && newLevelBlessures >= 8) {
    myActor.update({ "system.blessures.blessure_8.check": true });
  };


  myActor.update({ "system.blessures.lvl": newLevelBlessures });

}
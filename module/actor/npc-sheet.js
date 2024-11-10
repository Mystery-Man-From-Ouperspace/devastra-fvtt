import { DEVASTRAActorSheet } from "./actor-sheet.js";
import { DEVASTRA } from "../config.js";
import { ModifiedDialog } from "../modified-dialog.js";
/**
 * @extends {DEVASTRAActorSheet}
 */
export class DEVASTRAPNJSheet extends DEVASTRAActorSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["devastra", "sheet", "actor", "npc"],
      template: "systems/devastra/templates/actor/npc-sheet.html",
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
    context.blessuresoustatuts = context.items.filter(item => item.type === "blessureoustatut");


    context.mandala1 = await this.actor.system.mandala.un.selected;
    context.mandala2 = await this.actor.system.mandala.deux.selected;
    context.mandala3 = await this.actor.system.mandala.trois.selected;
    context.mandala4 = await this.actor.system.mandala.quatre.selected;
    context.mandala5 = await this.actor.system.mandala.cinq.selected;
    context.mandala6 = await this.actor.system.mandala.six.selected;
    context.mandala7 = await this.actor.system.mandala.sept.selected;

    context.viseur0 = await game.settings.get("devastra", "viseur0");
    context.viseur1 = await game.settings.get("devastra", "viseur1");
    context.viseur2 = await game.settings.get("devastra", "viseur2");
    context.viseur3 = await game.settings.get("devastra", "viseur3");
    context.viseur4 = await game.settings.get("devastra", "viseur4");
    context.viseur5 = await game.settings.get("devastra", "viseur5");
    context.viseur6 = await game.settings.get("devastra", "viseur6");
    context.viseur7 = await game.settings.get("devastra", "viseur7");

    context.npctype = await this.actor.system.npcType;

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

    Hooks.on('updateSetting', async (setting, update, options, id) => this.onUpdateSetting(setting, update, options, id));
  
 
    html.find(".clickondie").click(this._onClickDieRoll.bind(this));
    html.find(".clickonmandala").click(this._onClickMandalaCheck.bind(this));
    html.find(".clickonarmure").click(this._onClickArmor.bind(this));
    html.find(".clickondieconcentration").click(this._onClickDieConcentration.bind(this));

  }


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
    let myMessage = game.i18n.localize("DEVASTRA.On tire la concentration-npc");
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
    
    // Lancer de dés

    let gain = 5;

    let myMessage2Chat = game.i18n.localize("DEVASTRA.Untel a tiré la concentration-npc").replace("^0", gain.toString());
    const myTypeOfThrow = game.settings.get("core", "rollMode"); // Type de Lancer

    ChatMessage.create({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: myMessage2Chat,
      rollMode: myTypeOfThrow
    });


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
   * Listen for roll buttons on Mandala.
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
      myTitle = game.i18n.localize("DEVASTRA.Jet de dés");
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
    const mySpecialiteFlag = myResultDialog.specialitecheck;
    const myNbrDeBonusSpecialite = myResultDialog.nbrdebonusspecialite;
    const myBonusApplique = myResultDialog.bonusapplique;
    const myMalusApplique = myResultDialog.malususapplique;
    const mySuccesAuto = myResultDialog.succesauto;
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
    tokenimg: "",
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
  template = template || 'systems/devastra/templates/form/skill-dice-prompt-npc.html';
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
  // const myShaktiRestanteFlag = (myActorID.system.shakti.piledejetons); // s'il reste des jetons de Shakti
  // const myconvictionRestanteFlag = (myActorID.system.conviction.piledejetons); // s'il reste des jetons de Conviction

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
    // shaktirestanteflag: myShaktiRestanteFlag,
    shaktirestanteflag: 0,
    // convictionrestanteflag: myconvictionRestanteFlag,
    convictionrestanteflag: 0,
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
      malususapplique: myHtml.find("select[name='malususapplique']").val(),
      succesauto: myHtml.find("select[name='succesauto']").val(),
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
    template = template || 'systems/devastra/templates/form/skill-dice-prompt-debride-npc.html';
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
    // const myShaktiRestanteFlag = (myActorID.system.shakti.piledejetons); // s'il reste des jetons de Shakti
    // const myconvictionRestanteFlag = (myActorID.system.conviction.piledejetons); // s'il reste des jetons de Conviction
  
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
      // shaktirestanteflag: myShaktiRestanteFlag,
      shaktirestanteflag: 0,
      // convictionrestanteflag: myconvictionRestanteFlag,
      convictionrestanteflag: 0,
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
        malususapplique: myHtml.find("select[name='malususapplique']").val(),
        succesauto: myHtml.find("select[name='succesauto']").val(),
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
      selectedarmor: myHtml.find("select[name='armor']").val(),
      selectedarmorshield: myHtml.find("select[class='shield']").val(),
      selectedarmordevastra: myHtml.find("select[name='armordevastra']").val(),

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
  template = template || 'systems/devastra/templates/form/type-alert-prompt.html';
  const title = myTitle;
  let dialogOptions = myDialogOptions;

  var dialogData = {
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
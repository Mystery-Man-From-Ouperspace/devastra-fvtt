/**
 * A Dialog subclass which allows...
 * @extends {Dialog}
 */
export class ModifiedDialog extends Dialog {

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // console.log("Listeners activés")
    html.find('input[value="isinventory"]').click(this._onInventoryClick.bind(this));
    html.find('input[value="isimprovised"]').click(this._onDamageClick.bind(this));

    // html.find('input[value="isinventoryopponent"]').click(this._onInventoryOpponentClick.bind(this));
    // html.find('input[value="isimprovisedopponent"]').click(this._onDamageOpponentClick.bind(this));


    html.find('input[value="knownopposition"]').click(this._onKnownOppositionClick.bind(this));
    html.find('input[value="blindopposition"]').click(this._onBlindOppositionClick.bind(this));
    html.find('input[value="simpletest"]').click(this._onSimpleTestClick.bind(this));


    html.find('select[name="target"]').change(this._onTargetSelect.bind(this));


    html.find('select[name="skill"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="bonusanomaly"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="anomaly"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="bonusaspect"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="aspect"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="bonusattribute"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="attribute"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="bonus"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="malus"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="armor"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="jaugewounds"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="jaugedestiny"]').change(this._onSkillDicePrompt.bind(this));
    html.find('select[name="jaugespleen"]').change(this._onSkillDicePrompt.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle changing the...
   * @param {Event} event   The input change event
   */

  _onKnownOppositionClick(event) {
    // console.log(1);
    let knownopposition = this.element.find('input[value="knownopposition"]');
    let blindopposition = this.element.find('input[value="blindopposition"]');
    let simpletest = this.element.find('input[value="simpletest"]');
    knownopposition.checked = true;
    blindopposition.checked = false;
    simpletest.checked = false;
    let opposition_value = this.element.find('span[class="value opposition-value"]');
    let seuil_value = this.element.find('span[class="value seuil-value"]');
    let opposition = this.element.find('select[name="opposition"]');
    opposition_value.show();
    seuil_value.hide();
    opposition.show();
  }

  _onBlindOppositionClick(event) {
    // console.log(2);
    let knownopposition = this.element.find('input[value="knownopposition"]');
    let blindopposition = this.element.find('input[value="blindopposition"]');
    let simpletest = this.element.find('input[value="simpletest"]');
    knownopposition.checked = false;
    blindopposition.checked = true;
    simpletest.checked = false;
    let opposition_value = this.element.find('span[class="value opposition-value"]');
    let seuil_value = this.element.find('span[class="value seuil-value"]');
    let opposition = this.element.find('select[name="opposition"]');
    opposition_value.hide();
    seuil_value.hide();
    opposition.hide();
  }

  _onSimpleTestClick(event) {
    // console.log(3);
    let knownopposition = this.element.find('input[value="knownopposition"]');
    let blindopposition = this.element.find('input[value="blindopposition"]');
    let simpletest = this.element.find('input[value="simpletest"]');
    knownopposition.checked = false;
    blindopposition.checked = false;
    simpletest.checked = true;
    let opposition_value = this.element.find('span[class="value opposition-value"]');
    let seuil_value = this.element.find('span[class="value seuil-value"]');
    let opposition = this.element.find('select[name="opposition"]');
    opposition_value.hide();
    seuil_value.show();
    opposition.show();
  }
  
  _onInventoryClick(event) {
    // console.log("J'exécute _onInventoryClick()")
    let checkbox = this.element.find('input[value="isinventory"]');
    let othercheckbox = this.element.find('input[value="isimprovised"]');
    let chooseinventory = this.element.find('td[class="chooseinventory"]');
    let choosedamage = this.element.find('td[class="choosedamage"]');

    checkbox.checked = true;
    othercheckbox.checked = false;
    // console.log("inventory is checked");
    chooseinventory.show();
    choosedamage.hide();
  }

  /*
  _onInventoryOpponentClick(event) {
    // console.log("J'exécute _onInventoryOpponentClick()")
    let checkbox = this.element.find('input[value="isinventoryoOpponent"]');
    let othercheckbox = this.element.find('input[value="isimprovisedopponent"]');
    let chooseinventory = this.element.find('td[class="chooseinventoryopponent"]');
    let choosedamage = this.element.find('td[class="choosedamageopponent"]');

    checkbox.checked = true;
    othercheckbox.checked = false;
    // console.log("inventory is checked");
    chooseinventory.show();
    choosedamage.hide();
  }
*/

  _onDamageClick(event) {
    // console.log("J'exécute _onDamageClick()")
    let checkbox = this.element.find('input[value="improvised"]');
    let othercheckbox = this.element.find('input[value="inventory"]');
    let chooseinventory = this.element.find('td[class="chooseinventory"]');
    let choosedamage = this.element.find('td[class="choosedamage"]');

    checkbox.checked = true;
    othercheckbox.checked = false;
    // console.log("improvised is checked");
    chooseinventory.hide();
    choosedamage.show();
  }

  /*
  _onDamageOpponentClick(event) {
    // console.log("J'exécute _onDamageClick()")
    let checkbox = this.element.find('input[value="improvisedopponent"]');
    let othercheckbox = this.element.find('input[value="inventoryopponent"]');
    let chooseinventory = this.element.find('td[name="chooseinventoryopponent"]');
    let choosedamage = this.element.find('td[name="choosedamageopponent"]');

    checkbox.checked = true;
    othercheckbox.checked = false;
    // console.log("improvised is checked");
    chooseinventory.hide();
    choosedamage.show();
  }
*/

  _onTargetSelect(event) {
    // console.log("Menu modifié Cible");
    let target = this.element.find('select[name="target"]').val();

    let versus = this.element.find('td[class="versus"]');
    let no_token = this.element.find('td[class="no-token"]');
    if (target == '0') {
      versus.hide();
      no_token.hide();
    } else {
      versus.show();
      no_token.show();
    };

    // console.log('target = ', target);
    let myImage = "";
    for (let targetedtoken of game.user.targets) {
      // console.log('targetedtoken = ', targetedtoken);
      // console.log('targetedtoken.id = ', targetedtoken.id);
      if (targetedtoken.id == target) {
        myImage = targetedtoken.actor.img;
      };
    };
    // console.log('myImage = ', myImage);
    let imageopponent = this.element.find('img[class="imageopponent"]');
    imageopponent.attr('src', myImage);
  }

  async _onSkillDicePrompt(event) {
    // console.log("Menu modifié");

    let skill = await this.element.find('select[name="skill"]').val();

    // console.log("skill = ", skill);

    let bonusanomaly = await this.element.find('select[name="bonusanomaly"]').val();
    let anomaly = await this.element.find('select[name="anomaly"]').val();
    let bonusaspect = await this.element.find('select[name="bonusaspect"]').val();
    let aspect = await this.element.find('select[name="aspect"]').val();
    let bonusattribute = await this.element.find('select[name="bonusattribute"]').val();
    let attribute = await this.element.find('select[name="attribute"]').val();
    let bonus = await this.element.find('select[name="bonus"]').val();
    let malus = await this.element.find('select[name="malus"]').val();
    let armor = await this.element.find('select[name="armor"]').val();
    let jaugewounds = await this.element.find('select[name="jaugewounds"]').val();
    let jaugedestiny = await this.element.find('select[name="jaugedestiny"]').val();
    let jaugespleen = await this.element.find('select[name="jaugespleen"]').val();
    let actorID = await this.element.find('td[class="actor"]').text();

    // console.log("actorID = ", actorID);

    let myActor = game.actors.get(actorID);

    // console.log("myActor = ", myActor);

    let totalscoresbonusmalus = 0;

    let skill_score = await _getSkillValueData (myActor, skill);
    totalscoresbonusmalus += skill_score;

    let bonusanomaly_score = parseInt(bonusanomaly) ? -1 : 1 ;
    let anomaly_score = 0;
    if (anomaly != 0) {
      anomaly_score = await _getAnomalyValueData (myActor, anomaly);
    };
    anomaly_score = anomaly_score * parseInt(bonusanomaly_score);
    totalscoresbonusmalus += anomaly_score;

    let bonusaspect_score = parseInt(bonusaspect) ? -1 : 1 ;
    let aspect_score = 0;
    if (aspect != 0) {
      aspect_score = await _getAspectValueData (myActor, aspect);
    };
    aspect_score = aspect_score * parseInt(bonusaspect_score);
    totalscoresbonusmalus += aspect_score;

    let bonusattribute_score = parseInt(bonusattribute) ? -1 : 1 ;
    let attribute_score = 0;
    if (attribute_score != 0) {
      attribute_score = await _getAttributeValueData (myActor, attribute);
    };
    attribute_score = attribute_score * parseInt(bonusattribute_score);
    totalscoresbonusmalus += attribute_score;

    totalscoresbonusmalus += (parseInt(bonus) + parseInt(malus));

    let armor_score = 0;
    if (armor != 0) {
      armor_score = await _getArmorValueData (myActor, armor);
    };
    totalscoresbonusmalus += -(armor_score);

    let jaugewounds_score = 0;
    jaugewounds_score = await _getJaugeWoundsValueData (myActor, jaugewounds);
    totalscoresbonusmalus += jaugewounds_score;
    let jaugedestiny_score = 0;
    jaugedestiny_score = await _getJaugeDestinyValueData (myActor, jaugedestiny);
    totalscoresbonusmalus += jaugedestiny_score
    let jaugespleen_score = 0;
    jaugespleen_score = await _getJaugeSpleenValueData (myActor, jaugespleen);
    totalscoresbonusmalus += jaugespleen_score;
  
  
    this.element.find('td[class="scorebonusmalus"]').text("[ "+totalscoresbonusmalus+" ]");
  
  
  }
}

/* -------------------------------------------- */

async function _getSkillValueData (myActor, mySkillNbr) {

  const mySkill = parseInt(mySkillNbr);
  let myStringVal;
  let myStringRES;

  let specialityLibel = await game.i18n.localize(myActor.system.skill.skilltypes[parseInt(mySkillNbr)]);
  let specialityTab = specialityLibel.split(' ');
  if (specialityTab[0] == "⌞") {
    specialityLibel = specialityLibel.substring(2);
  }

  switch (mySkill) {
    case 0:
      myStringVal = await myActor.system.skill.ame.res;
      myStringRES = myStringVal;
    break;
    case 1:
      myStringVal = await myActor.system.skill.ame.attraction.value;
      myStringRES = await myActor.system.skill.ame.res;
    break;
    case 2:
      myStringVal = await myActor.system.skill.ame.artifice.value;
      myStringRES = await myActor.system.skill.ame.res;
      break;
    case 3:
      myStringVal = await myActor.system.skill.ame.coercition.value;
      myStringRES = await myActor.system.skill.ame.res;
      break;
    case 4:
      myStringVal = await myActor.system.skill.ame.faveur.value;
      myStringRES = await myActor.system.skill.ame.res;
      break;

    case 5:
      myStringVal = await myActor.system.skill.corps.res;
      myStringRES = myStringVal;
    break;
    case 6:
      myStringVal = await myActor.system.skill.corps.echauffouree.value;
      myStringRES = await myActor.system.skill.corps.res;
    break;
    case 7: 
      myStringVal = await myActor.system.skill.corps.effacement.value;
      myStringRES = await myActor.system.skill.corps.res;
    break;
    case 8: 
      myStringVal = await myActor.system.skill.corps.prouesse.value;
      myStringRES = await myActor.system.skill.corps.res;
    break;
    case 9:
      myStringVal = await myActor.system.skill.corps.mobilite.value;
      myStringRES = await myActor.system.skill.corps.res;
    break;

    case 10:
      myStringVal = await myActor.system.skill.coeur.res;
      myStringRES = myStringVal;
    break;
    case 11:
      myStringVal = await myActor.system.skill.coeur.appreciation.value;
      myStringRES = await myActor.system.skill.coeur.res;
    break;
    case 12:
      myStringVal = await myActor.system.skill.coeur.arts.value;
      myStringRES = await myActor.system.skill.coeur.res;
    break;
    case 13:
      myStringVal = await myActor.system.skill.coeur.inspiration.value;
      myStringRES = await myActor.system.skill.coeur.res;
    break;
    case 14:
      myStringVal = await myActor.system.skill.coeur.traque.value;
      myStringRES = await myActor.system.skill.coeur.res;
    break;

    case 15:
      myStringVal = await myActor.system.skill.esprit.res;
      myStringRES = myStringVal;
    break;
    case 16:
      myStringVal = await myActor.system.skill.esprit.instruction.value;
      myStringRES = await myActor.system.skill.esprit.res;
    break;
    case 17:
      myStringVal = await myActor.system.skill.esprit.mtechnologique.value;
      myStringRES = await myActor.system.skill.esprit.res;
    break;
    case 18:
      myStringVal = await myActor.system.skill.esprit.raisonnement.value;
      myStringRES = await myActor.system.skill.esprit.res;
    break;
    case 19:
      myStringVal = await myActor.system.skill.esprit.traitement.value;
      myStringRES = await myActor.system.skill.esprit.res;
    break;
  };

  let myValue = parseInt(myStringVal);
  if (myStringVal == null) myValue = 0;
  let myRESValue = parseInt(myStringRES);
  if (myStringRES == null) myRESValue = 0;

  let myData = myValue;
  if (mySkill % 5) myData = myValue + myRESValue;

   // console.log("myData = ", myData);

  return myData;
}

async function _getAnomalyValueData (myActor, myAnomaly) {
  let myAnomalyVal = 0;
  for (let anomaly of myActor.items.filter(item => item.type === 'anomaly')) {
    if (anomaly.id === myAnomaly) {
      myAnomalyVal = anomaly.system.value;
    };
  };

  return myAnomalyVal;
}

async function _getAspectValueData (myActor, myAspect) {
  let myAspectVal = 0;
  for (let aspect of myActor.items.filter(item => item.type === 'aspect')) {
    if (aspect.id === myAspect) {
      myAspectVal = aspect.system.value;
    };
  };

  return myAspectVal;
}

async function _getAttributeValueData (myActor, myAttribute) {
  let myAttributeVal = 0;
  for (let attribute of myActor.items.filter(item => item.type === 'attribute')) {
    if (attribute.id === myAttribute) {
      myAttributeVal = attribute.system.value;
    };
  };

  return myAttributeVal;
}

async function _getArmorValueData (myActor, myArmor) {
  let myArmorVal = 0;
  for (let item of myActor.items.filter(item => item.type === 'item')) {
    // if (item.system.subtype == "armor") {
      if (item.id === myArmor) {
        myArmorVal = item.system.protection;
      };
    // };
  };

  return myArmorVal;
}

async function _getJaugeWoundsValueData (myActor, myjaugeWounds) {
  let myjaugeWoundsVal = 0;

  myjaugeWoundsVal = parseInt(await myActor.system.skill.woundsmalus[myjaugeWounds]);

  return myjaugeWoundsVal;
}

async function _getJaugeDestinyValueData (myActor, myjaugeDestiny) {
  let myjaugeDestinyVal = 0;

  return myjaugeDestinyVal;
}

async function _getJaugeSpleenValueData (myActor, myjaugeSpleen) {
  let myjaugeSpleenVal = 0;

  return myjaugeSpleenVal;
}







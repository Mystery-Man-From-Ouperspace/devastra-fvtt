/**
 * @extends {Item}
 */
export class DEVASTRAItem extends Item {
  get isWeapon() {
    return this.system.subtype === "weapon";
  }

  get isArmor() {
    return this.system.subtype === "armor";
  }

  get isAsurastra() {
    return this.system.subtype === "asurastra";
  }

  get isAryastra() {
    return this.system.subtype === "aryastra";
  }

  get isVehicle() {
    return this.system.subtype === "vehicle";
  }

  get isOther() {
    return this.system.subtype === "other";
  }
}

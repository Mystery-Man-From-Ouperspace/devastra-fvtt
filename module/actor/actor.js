/**
 * @extends {Actor}
 */
export class DEVASTRAActor extends Actor {

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /* -------------------------------------------- */
  /*  Roll Data Preparation                       */
  /* -------------------------------------------- */

  /** @inheritdoc */
  getRollData() {

    // Copy the actor's system data
    const data = this.toObject(false).system;
   
    return data;
  }


  prepareBaseData() {
    if (this.type === "character") {
      this.system.initiative.value = this.system.chakra.value;

      this.system.initiative.actionsmax = this.system.domains.dph.value;

      this.system.initiative_totale = this.system.initiative.value + this.system.initiative.nbrjetonbonus;

      this.system.prana.max = 10 * this.system.chakra.value;
      this.system.prana.max += this.system.domains.dph.value;
      this.system.prana.max += this.system.domains.dma.value;
      this.system.prana.max += this.system.domains.din.value;
      this.system.prana.max += this.system.domains.dso.value;
      this.system.prana.max += this.system.domains.dmy.value;

      this.system.prana.vaillant = this.system.prana.max;

      this.system.prana.tenace = Math.trunc((this.system.prana.max * 3) / 4);
      if ((this.system.prana.max * 3) % 4) {this.system.prana.tenace += 1;};

      this.system.prana.affaibli = Math.trunc(this.system.prana.max / 2);
      if (this.system.prana.max % 2) {this.system.prana.affaibli += 1;};

      this.system.prana.vulnerable = Math.trunc(this.system.prana.max / 4);
      if (this.system.prana.max % 4) {this.system.prana.vulnerable += 1;};

      this.system.conviction.value = 2 * this.system.chakra.value;

      this.system.atman.max = 5 * this.system.chakra.value;
      this.system.atman.max += this.system.domains.dmy.value;
      this.system.atman.max += this.system.atman.bonus;

      this.system.shakti.max = 2 * this.system.chakra.value;
      let theMaxD = this.system.domains.dph.value;
      if (this.system.domains.dma.value > theMaxD) {
        theMaxD = this.system.domains.dma.value;
      };
      if (this.system.domains.din.value > theMaxD) {
        theMaxD = this.system.domains.din.value;
      };
      if (this.system.domains.dso.value > theMaxD) {
        theMaxD = this.system.domains.dso.value;
      };
      if (this.system.domains.dma.value > theMaxD) {
        theMaxD = this.system.domains.dmy.value;
      };
      this.system.shakti.max += (2 * theMaxD);

      if (this.system.shakti.piledejetons > this.system.shakti.max) {
        this.system.shakti.piledejetons = this.system.shakti.max;
      };
      if (this.system.conviction.piledejetons > this.system.conviction.value) {
        this.system.conviction.piledejetons = this.system.conviction.value;
      };
      if (this.system.atman.value > this.system.atman.max) {
        this.system.atman.value = this.system.atman.max;
      };

    }

    if (this.type === "npc") {
      this.system.initiative_totale = this.system.initiative.value;
    }

    if (this.type === "monster") {
      this.system.initiative_totale = this.system.initiative.value;
    }


  }

}
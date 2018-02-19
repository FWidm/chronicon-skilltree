import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ChroniconSkill} from '../chronicon-skill';

@Component({
  selector: 'app-chronicon-skill',
  templateUrl: './chronicon-skill.component.html',
  styleUrls: ['./chronicon-skill.component.css']
})
export class ChroniconSkillComponent implements OnInit, OnChanges {

  @Input() skillSlot: ChroniconSkill;
  @Input() choosableSkills: [ChroniconSkill];
  rank = 0;
  hovered = false;
  chosen = false;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // either no choosable skills or just one => skill is chosen per default
    if (!this.choosableSkills || this.choosableSkills.length <= 1) {
      this.chosen = true;
    }
    // initialize multiskills
    if (this.choosableSkills && this.choosableSkills.length > 0 && this.skillSlot) {
      this.choosableSkills.push(this.skillSlot);
      this.skillSlot = null;
      console.log(this);
    }
  }

  isChroniconSkill() {
    return this.skillSlot instanceof ChroniconSkill;
  }

  levelUp(event) {
    let modifier = 1;
    if (event.ctrlKey) {
      modifier = 5;
    }
    // this.rank = Math.clamp
    if (event.shiftKey) {
      if (this.rank >= 0) {
        // if the skill is delevelled while being at rank 0 - show the choose skill again.
        if (this.rank === 0 && this.skillSlot.isActive()) {
          this.chosen = false;
        }
        this.rank = Math.max(0, this.rank - modifier);
      }
    } else {

      if (this.rank <= this.skillSlot.max_rank) {
        this.rank = Math.min(this.skillSlot.max_rank, this.rank + modifier);
      }
    }
  }

  selectSkill(skill) {
    this.skillSlot = skill;
    this.chosen = true;
    this.hovered = false;
  }
}

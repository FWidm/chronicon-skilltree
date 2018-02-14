import {Component, Input, OnInit} from '@angular/core';
import {ChroniconSkill} from '../chronicon-skill';

@Component({
  selector: 'app-chronicon-skill',
  templateUrl: './chronicon-skill.component.html',
  styleUrls: ['./chronicon-skill.component.css']
})
export class ChroniconSkillComponent implements OnInit {
  @Input() skillSlot: ChroniconSkill;
  @Input() choosableSkills: [ChroniconSkill];
  rank = 0;
  hovered = false;

  constructor() {
  }

  ngOnInit() {
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
    this.choosableSkills.length = 0;
    this.hovered = false;
  }
}

import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ChroniconSkill} from '../chronicon-skill';

@Component({
  selector: 'app-chronicon-skill',
  templateUrl: './chronicon-skill.component.html',
  styleUrls: ['./chronicon-skill.component.css']
})
export class ChroniconSkillComponent implements OnInit, OnChanges {

  @Input() skill: ChroniconSkill;
  @Input() level: number;
  @Input() choosableSkills: [ChroniconSkill];
  @Output() getSkillStatus = new EventEmitter<ChroniconSkill>();

  hovered = false;
  @Input() chosen = false;

  constructor() {
  }

  ngOnInit() {

  }

  findLevelledSkill() {
    for (const skill of this.choosableSkills) {
      if (skill.rank > 0) {
        return skill;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // either no choosable skills or just one => skill is chosen per default
    if (!this.choosableSkills || this.choosableSkills.length < 1) {
      this.chosen = true;
      return;
    }
    this.choosableSkills.push(this.skill);

    // initialize multiskills
    this.chosen = this.skill.chosen;
    console.log(this.skill.name, this.skill.chosen);
    const levelledSkill = this.findLevelledSkill();
    if (!this.chosen && this.skill && !levelledSkill) {
      this.skill = null;
    }

    if (levelledSkill) {
      this.selectSkill(levelledSkill);
    }
  }

  isChroniconSkill() {
    return this.skill instanceof ChroniconSkill;
  }

  /**
   * Level up a skill
   * @param event
   */
  levelUp(event) {
    let modifier = 1;
    if (event.ctrlKey) {
      modifier = 5;
    }
    // this.rank = Math.clamp
    if (event.shiftKey) {
      if (this.skill.rank >= 0) {
        // if the skill is delevelled while being at rank 0 - show the choose skill again.
        if (this.skill.rank === 0 && this.skill.isActive()) {
          this.chosen = false;
        }
        this.skill.rank = Math.max(0, this.skill.rank - modifier);
        this.getSkillStatus.emit(this.skill);
      }
    } else {
      if (this.level + modifier >= 100) {
        // set the modifier to the maximum possible modifier, then add it
        modifier = modifier - (this.level + modifier - 100);
        this.skill.rank = Math.min(this.skill.max_rank, this.skill.rank + modifier);
        this.getSkillStatus.emit(this.skill);
        return;
      }
      if (this.skill.rank <= this.skill.max_rank) {
        this.skill.rank = Math.min(this.skill.max_rank, this.skill.rank + modifier);
        this.getSkillStatus.emit(this.skill);

      }
    }
  }

  /**
   * Select a skill from a multi select
   * @param skill
   */
  selectSkill(skill) {
    this.skill = skill;
    this.chosen = true;
    this.hovered = false;
    console.log('skill=' + this.skill.name + ' | chosen=' + this.chosen + ' | hovered=' + this.hovered);
  }
}

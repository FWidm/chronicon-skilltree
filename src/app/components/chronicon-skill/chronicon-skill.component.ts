import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ChroniconSkill} from '../../models/chronicon-skill';
import {SkillLevelEvent} from '../../events/skill_level_event';

@Component({
  selector: 'app-chronicon-skill',
  templateUrl: './chronicon-skill.component.html',
  styleUrls: ['./chronicon-skill.component.css']
})
export class ChroniconSkillComponent implements OnInit, OnChanges {

  @Input() skill: ChroniconSkill;
  @Input() level: number;
  @Input() choosableSkills: [ChroniconSkill];
  @Output() getSkillStatus = new EventEmitter<SkillLevelEvent>();

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
        modifier = -1 * modifier;
        // if the skill is delevelled while being at rank 0 - show the choose skill again.
        if (this.skill.rank === 0 && this.skill.isActive()) {
          this.chosen = false;
        }
      }
    }
    const diff = this.skill.levelRank(modifier);
    this.getSkillStatus.emit(new SkillLevelEvent(this.skill, diff));
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

import {ChroniconSkill} from '../chronicon-skill';

export class SkillLevelEvent {
  public skill: ChroniconSkill;
  public modifier: number;

  constructor(skill: ChroniconSkill, modifier: number) {
    this.skill = skill;
    this.modifier = modifier;
  }
}

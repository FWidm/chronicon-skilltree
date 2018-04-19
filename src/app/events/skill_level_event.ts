import {ChroniconSkill} from '../models/chronicon-skill';

export class SkillLevelEvent {
  public skill: ChroniconSkill;
  public modifier: number;

  constructor(skill: ChroniconSkill, modifier: number) {
    this.skill = skill;
    this.modifier = modifier;
  }
}

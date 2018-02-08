import {Input} from '@angular/core';

/*
Number of attributes on the skills.
{'cooldown': 187,
 'cost1': 225,
 'cost100': 225,
 'damage': 622,
 'description': 639,
 'duration': 251,
 'effect': 312,
 'element': 639,
 'family': 639,
 'max_rank': 639,
 'min_level': 639,
 'name': 639,
 'proc': 82,
 'range': 216,
 'range2': 216,
 'skill_requirement': 639,
 'type': 639,
 'value': 114,
 'x': 639,
 'y': 639}
 */
export class ChroniconSkill {
  image: string;
  cooldown: string;
  cost1: string;
  cost100: string;
  damage: string;
  description: string;
  duration: string;
  effect: string;
  element: string;
  family: string;
  max_rank: string;
  min_level: string;
  name: string;
  proc: string;
  range: string;
  range2: string;
  skill_requirement: string;
  type: string;
  value: string;
  x: number;
  y: number;

  constructor(jsonObj: any, image = null) {
    this.name = jsonObj.name;
    this.x = jsonObj.x;
    this.y = jsonObj.y;
    this.image = image;
    this.max_rank = jsonObj.max_rank;
    this.effect = jsonObj.effect;
    this.skill_requirement = jsonObj.skill_requirement;
    this.damage = jsonObj.damage;
    this.family = jsonObj.family;
    this.min_level = jsonObj.min_level;
    this.element = jsonObj.element;
    this.type = jsonObj.type;
    this.description = jsonObj.description;
    this.cooldown = jsonObj.cooldown;
    this.cost1 = jsonObj.cost1;
    this.cost100 = jsonObj.cost100;
    this.duration = jsonObj.duration;
    this.proc = jsonObj.proc;
    this.range2 = jsonObj.range2;
    this.range = jsonObj.range;
    this.value = jsonObj.value;
  }

  public getTooltip(rank): string {
    let tooltip = this.description;
    // todo: make more efficient replacement of values.
    tooltip = tooltip.replace(/XDAM/g, '');
    tooltip = tooltip.replace(/DAMAGE%/g, this.getValue(this.damage, rank));
    tooltip = tooltip.replace(/RANGE2/g, this.getValue(this.range2, rank));
    tooltip = tooltip.replace(/RANGE/g, this.getValue(this.range, rank));
    tooltip = tooltip.replace(/VALUE/g, this.getValue(this.value, rank));
    tooltip = tooltip.replace(/DURATION/g, this.getValue(this.duration, rank));
    return tooltip;
  }

  getValue(attribute, rank): string {
    // rank 0 shows the same dmg as rank 1 - additionally make sure we cannot go out of bounds [0, max rank]
    return attribute.split(',')[Math.max(rank - 1, 0)];
  }
}

import {Input} from '@angular/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
  max_rank: number;
  min_level: number;
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

  /*
  {'DAMAGE%': 308,
 'DURATION': 247,
 'EFFECT%': 324,
 'PROC%': 77,
 'RANGE': 208,
 'RANGE2': 28,
 'REQUIRED': 144,
 'VALUE': 94, 'VALUE%': 1, x
 'XDAM': 214}
   */
  public getTooltip(rank): string {
    let tooltip = this.description;
    // todo: make more efficient replacement of values.
    // todo: implement coloring - '|' = green, '~' = red
    if (tooltip) {
      tooltip = tooltip.replace(/XDAM/g, '');
      tooltip = tooltip.replace(/DAMAGE%/g, this.getValue(this.damage, rank));
      tooltip = tooltip.replace(/PROC/g, this.getValue(this.proc, rank, 100));
      tooltip = tooltip.replace(/RANGE2/g, this.getValue(this.range2, rank));
      tooltip = tooltip.replace(/RANGE/g, this.getValue(this.range, rank));
      tooltip = tooltip.replace(/VALUE/g, this.getValue(this.value, rank));
      tooltip = tooltip.replace(/DURATION/g, this.getValue(this.duration, rank));
      tooltip = tooltip.replace(/COST100/g, this.getValue(this.cost100, rank));
      tooltip = tooltip.replace(/COST1/g, this.getValue(this.cost1, rank));
      tooltip = tooltip.replace(/REQUIRED/g, this.skill_requirement);
      tooltip = tooltip.replace(/EFFECT%/g, this.getValue(this.effect, rank));
    }
    return tooltip;
  }

  getValue(attribute, rank, divisor = null) {
    // rank 0 shows the same dmg as rank 1 - additionally make sure we cannot go out of bounds [0, max rank]
    if (attribute) {
      if (divisor) {
        return Number(attribute.split(',')[Math.max(rank - 1, 0)]) / divisor;

      } else {
        return attribute.split(',')[Math.max(rank - 1, 0)];
      }
    }
  }


  isActive(): boolean {
    return this.type.includes('Active');
  }
}
